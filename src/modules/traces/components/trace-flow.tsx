"use client";

import { ReactFlow, Background, Controls, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useEffect, useCallback } from 'react';
import { applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';
import type { Edge, EdgeChange, Node, NodeChange, MiniMap, Connection } from '@xyflow/react';
import type { DragEvent as ReactDragEvent } from 'react';

type WorkflowNodeData = {
  label: string;
  type: "http" | "ai" | "function";
  config?: {
    url?: string;
    method?: string;
    prompt?: string;
    code?: string;
    [key: string]: any;
  };
  status?: "idle" | "running" | "success" | "error";
  output?: any;
  retryCount?: number;        // Number of retries on failure
  retryDelay?: number;        // Delay between retries in ms
  failureStrategy?: "stop" | "continue";  // stop (default) or continue
};

// Execution Context System
interface ExecutionLog {
  timestamp: number;
  nodeId?: string;
  level: "info" | "warn" | "error" | "success";
  message: string;
  data?: any;
}

interface ExecutionContext {
  executionId: string;
  startTime: number;
  logs: ExecutionLog[];
  nodeResults: Record<string, any>;
}

// Logger helper function
const log = (
  context: ExecutionContext,
  nodeId: string | null,
  level: "info" | "warn" | "error" | "success",
  message: string,
  data?: any
) => {
  const logEntry: ExecutionLog = {
    timestamp: Date.now(),
    nodeId: nodeId || undefined,
    level,
    message,
    data,
  };

  context.logs.push(logEntry);

  // Also log to console
  const prefix = nodeId ? `[${nodeId}]` : "[WORKFLOW]";
  const emoji =
    level === "success" ? "✅" : level === "error" ? "❌" : level === "warn" ? "⚠️" : "ℹ️";

  console.log(`${emoji} ${prefix} ${message}`, data ? data : "");
};

// Pluggable Node Execution System
interface NodeExecutor {
  execute: (input: any, config?: any) => Promise<any>;
}

// Node Registry - Extensible executor registry
const nodeRegistry: Record<string, NodeExecutor> = {
  http: {
    execute: async (input: any, config?: any) => {
      // Simulate HTTP request
      await new Promise((r) => setTimeout(r, 600));
      
      const mockResponse = {
        status: 200,
        data: {
          message: `HTTP ${config?.method || 'GET'} to ${config?.url || '/api/endpoint'}`,
          receivedInput: input,
          timestamp: new Date().toISOString(),
        },
      };
      
      return mockResponse;
    },
  },

  ai: {
    execute: async (input: any, config?: any) => {
      // Simulate LLM response
      await new Promise((r) => setTimeout(r, 800));
      
      const aiResponse = {
        model: "gpt-4-simulation",
        prompt: config?.prompt || "Process the input",
        response: `AI generated output based on: ${JSON.stringify(input)}`,
        usage: {
          inputTokens: 50,
          outputTokens: 100,
        },
      };
      
      return aiResponse;
    },
  },

  function: {
    execute: async (input: any, config?: any) => {
      // Execute custom function from config
      try {
        if (!config?.code) {
          throw new Error("No code provided in function config");
        }

        // ⚠️ WARNING: new Function() executes arbitrary code - use with caution!
        // This is a security risk in production. For demonstration only.
        const fn = new Function("input", config.code);
        const result = await fn(input);
        
        return {
          success: true,
          result,
          executedCode: config.code.substring(0, 100) + "...",
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message,
          code: config?.code,
        };
      }
    },
  },
};

const initialNodes: Node<WorkflowNodeData>[] = [
  {
    id: 'n1',
    position: { x: 0, y: 0 },
    data: {
      label: 'Start',
      type: 'http',
      config: {
        url: '/api/start',
        method: 'GET',
      },
      status: 'idle',
      retryCount: 2,
      retryDelay: 500,
      failureStrategy: 'stop'
    },
    type: 'customNode',
  },
  {
    id: 'n2',
    position: { x: 200, y: 150 },
    data: {
      label: 'AI Node',
      type: 'ai',
      config: {
        prompt: 'Process the input',
      },
      status: 'idle',
      retryCount: 2,
      retryDelay: 500,
      failureStrategy: 'stop'
    },
    type: 'customNode',
  },
    {
    id: 'n3',
    position: { x: 100, y: 400 },
    data: {
      label: 'Start',
      type: 'http',
      config: {
        url: '/api/start-2',
        method: 'GET',
      },
      status: 'idle',
      retryCount: 2,
      retryDelay: 500,
      failureStrategy: 'stop'
    },
    type: 'customNode',
  },
];

const nodeTypes = {
  customNode: ({ data }: any) => {
    let borderColor = "#555";

    if (data.status === "running") borderColor = "yellow";
    if (data.status === "success") borderColor = "green";
    if (data.status === "error") borderColor = "red";

    return (
      <div
        style={{
          padding: 12,
          border: `2px solid ${borderColor}`,
          borderRadius: 8,
          background: "#1e1e1e",
          color: "white",
          minWidth: 150,
          textAlign: "center",
          position: 'relative'
        }}
      >
        <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
        
        <div style={{ fontWeight: "bold" }}>{data.label}</div>
        <div style={{ fontSize: 10, opacity: 0.6 }}>{data.type}</div>
        <div style={{ fontSize: 9, opacity: 0.5, marginTop: 8 }}>
          Status: {data.status}
        </div>
        {data.retryCount !== undefined && (
          <div style={{ fontSize: 8, opacity: 0.6, marginTop: 4 }}>
            Retries: {data.retryCount} | Strategy: {data.failureStrategy || 'stop'}
          </div>
        )}
        {data.output && (
          <div
            style={{
              fontSize: 8,
              opacity: 0.7,
              marginTop: 8,
              padding: 6,
              background: "#0a0a0a",
              borderRadius: 4,
              maxHeight: 60,
              overflow: "auto"
            }}
          >
            <div style={{ fontSize: 9, fontWeight: "bold", marginBottom: 4 }}
            >Output:</div>
            <div>{JSON.stringify(data.output.result || data.output).substring(0, 50)}</div>
          </div>
        )}
        
        <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
      </div>
    );
  }
};
const initialEdges: Edge[] = [
  {
    id: 'n1-n2',
    source: 'n1',
    target: 'n2',
    label: 'data flow',
  },
];

export const TraceFlow = ({ traceId }: { traceId: string }) => {
  const [nodes, setNodes] = useState<Node<WorkflowNodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [nodeOutputs, setNodeOutputs] = useState<Record<string, any>>({});
  const [sourceNode, setSourceNode] = useState<string>('');
  const [targetNode, setTargetNode] = useState<string>('');
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);
  const [nextNodeId, setNextNodeId] = useState<number>(4); // Start after n3
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) || null;

  const onNodesChange = useCallback(
    (changes: NodeChange<Node<WorkflowNodeData>>[]) =>
      setNodes((nodesSnapshot) =>
        applyNodeChanges(changes, nodesSnapshot) as Node<WorkflowNodeData>[]
      ),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((edgesSnapshot) =>
        applyEdgeChanges(changes, edgesSnapshot) as Edge[]
      ),
    [],
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = useCallback((_: ReactDragEvent | any, node: Node<WorkflowNodeData>) => {
    setSelectedNodeId(node.id);
  }, []);

  const updateSelectedNodeConfig = useCallback(
    (patch: Record<string, any>) => {
      if (!selectedNodeId) return;

      setNodes((currentNodes) =>
        currentNodes.map((node) =>
          node.id === selectedNodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  config: {
                    ...(node.data.config || {}),
                    ...patch,
                  },
                },
              }
            : node
        )
      );
    },
    [selectedNodeId]
  );

  // Handle drag start from sidebar
  const onDragStartSidebar = useCallback((e: ReactDragEvent, nodeType: string) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({ nodeType }));
  }, []);

  // Handle drag over React Flow canvas
  const onDragOver = useCallback((e: ReactDragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop on React Flow canvas
  const onDropCanvas = useCallback((e: ReactDragEvent) => {
    e.preventDefault();

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const nodeType = data.nodeType;

      if (!nodeType) return;

      // Get canvas position from event
      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const x = e.clientX - reactFlowBounds.left - 75; // Offset for node width
      const y = e.clientY - reactFlowBounds.top - 30; // Offset for node height

      // Generate new node ID
      const newNodeId = `n${nextNodeId}`;
      setNextNodeId((prev) => prev + 1);

      // Create new node with default config
      const newNode: Node<WorkflowNodeData> = {
        id: newNodeId,
        position: { x, y },
        data: {
          label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node`,
          type: nodeType as "http" | "ai" | "function",
          config:
            nodeType === 'http'
              ? { url: '/api/endpoint', method: 'GET' }
              : nodeType === 'ai'
                ? { prompt: 'Process the input' }
                : { code: 'return input;' },
          status: 'idle',
          retryCount: 2,
          retryDelay: 500,
          failureStrategy: 'stop',
        },
        type: 'customNode',
      };

      setNodes((nds) => [...nds, newNode]);
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  }, [nextNodeId]);

  // Add edge programmatically
  const addEdgeHandler = useCallback(() => {
    if (!sourceNode || !targetNode) {
      alert('Please select both source and target nodes');
      return;
    }

    if (sourceNode === targetNode) {
      alert('Source and target cannot be the same node');
      return;
    }

    // Check if edge already exists
    const edgeExists = edges.some(
      (e) => e.source === sourceNode && e.target === targetNode
    );

    if (edgeExists) {
      alert('Edge already exists between these nodes');
      return;
    }

    const newEdge: Edge = {
      id: `${sourceNode}-${targetNode}`,
      source: sourceNode,
      target: targetNode,
      label: 'data flow',
    };

    setEdges((eds) => [...eds, newEdge]);
    setSourceNode('');
    setTargetNode('');
  }, [sourceNode, targetNode, edges]);

  // Remove edge by ID
  const removeEdgeHandler = useCallback((edgeId: string) => {
    setEdges((eds) => eds.filter((e) => e.id !== edgeId));
  }, []);

  // Check if all parent nodes have completed execution
  const areDependenciesSatisfied = useCallback(
    (nodeId: string, completedNodes: Set<string>): boolean => {
      const incomingEdges = edges.filter((e) => e.target === nodeId);

      if (incomingEdges.length === 0) {
        return true; // Start node has no dependencies
      }

      // All parent nodes must be in completed set
      return incomingEdges.every((edge) => completedNodes.has(edge.source));
    },
    [edges]
  );

  // Compute in-degree (number of incoming edges) for each node
  const computeInDegrees = useCallback(() => {
    const inDegrees = new Map<string, number>();

    // Initialize all nodes with in-degree 0
    nodes.forEach((node) => {
      inDegrees.set(node.id, 0);
    });

    // Count incoming edges for each node
    edges.forEach((edge) => {
      inDegrees.set(edge.target, (inDegrees.get(edge.target) || 0) + 1);
    });

    return inDegrees;
  }, [nodes, edges]);

  // Get input for a node from its parent nodes (via incoming edges)
  const getInputForNode = useCallback(
    (nodeId: string): any => {
      const incomingEdges = edges.filter((e) => e.target === nodeId);

      if (incomingEdges.length === 0) {
        return null; // Start node has no input
      }

      if (incomingEdges.length === 1) {
        return nodeOutputs[incomingEdges[0].source];
      }

      // Multiple inputs from parent nodes, return as array
      return incomingEdges.map((edge) => nodeOutputs[edge.source]);
    },
    [edges, nodeOutputs]
  );

  // Get nodes with no incoming edges (workflow start points)
  const getStartNodes = useCallback(() => {
    const nodesWithIncoming = new Set(edges.map((e) => e.target));
    return nodes.filter((node) => !nodesWithIncoming.has(node.id));
  }, [nodes, edges]);

  // Get next nodes for a given node based on edges
  const getNextNodes = useCallback(
    (nodeId: string): Node<WorkflowNodeData>[] => {
      return edges
        .filter((edge) => edge.source === nodeId)
        .map((edge) => nodes.find((n) => n.id === edge.target))
        .filter((node): node is Node<WorkflowNodeData> => node !== undefined);
    },
    [nodes, edges]
  );

  // Check if graph has no edges (isolated workflow)
  const isGraphEmpty = useCallback(() => edges.length === 0, [edges]);

  // Get all nodes reachable from start nodes via edges (DFS traversal)
  const getReachableNodes = useCallback(() => {
    const reachable = new Set<string>();
    const startNodesList = getStartNodes();

    const dfsReachable = (nodeId: string) => {
      if (reachable.has(nodeId)) return;
      reachable.add(nodeId);

      const nextNodes = getNextNodes(nodeId);
      for (const nextNode of nextNodes) {
        dfsReachable(nextNode.id);
      }
    };

    for (const startNode of startNodesList) {
      dfsReachable(startNode.id);
    }

    return reachable;
  }, [getStartNodes, getNextNodes]);

  // Detect disconnected nodes (not reachable from any start node)
  const getDisconnectedNodes = useCallback(() => {
    if (isGraphEmpty()) return [];

    const reachable = getReachableNodes();
    return nodes.filter((node) => !reachable.has(node.id));
  }, [nodes, isGraphEmpty, getReachableNodes]);

  // Validate graph structure before execution
  const validateGraphStructure = useCallback(() => {
    if (isGraphEmpty()) {
      console.warn(
        "⚠️  No edges defined. Workflow has no pipeline structure. " +
        "Connect nodes with edges to create a valid workflow."
      );
      return false;
    }

    const disconnected = getDisconnectedNodes();
    if (disconnected.length > 0) {
      console.warn(
        `⚠️  Detected ${disconnected.length} disconnected node(s) not reachable from start nodes:`,
        disconnected.map((n) => n.id)
      );
      console.warn("These nodes will not be executed.");
    }

    return true;
  }, [isGraphEmpty, getDisconnectedNodes]);

  // Execute a single node with retry logic using the pluggable node registry
  const executeNode = useCallback(
    async (nodeId: string, context: ExecutionContext): Promise<boolean> => {
      return new Promise((resolve) => {
        // Get input from parent nodes (via incoming edges)
        const input = getInputForNode(nodeId);

        // Get node definition
        const node = nodes.find((n) => n.id === nodeId);
        if (!node) {
          log(context, nodeId, "error", "Node not found");
          resolve(false);
          return;
        }

        // Get retry configuration with defaults
        const retryCount = node.data.retryCount ?? 2;
        const retryDelay = node.data.retryDelay ?? 500;

        log(context, nodeId, "info", `Starting execution`, { 
          nodeType: node.data.type,
          retryCount,
          retryDelay,
          failureStrategy: node.data.failureStrategy || 'stop'
        });
        log(context, nodeId, "info", "Input received", input);

        // Set status to running
        setNodes((nds) =>
          nds.map((n) =>
            n.id === nodeId
              ? { ...n, data: { ...n.data, status: 'running' as const } }
              : n
          )
        );

        // Retry logic: attempt execution with retries
        let attempt = 0;
        const attemptExecution = () => {
          attempt++;
          setTimeout(async () => {
            try {
              // Look up executor from registry
              const executor = nodeRegistry[node.data.type];

              if (!executor) {
                throw new Error(`No executor found for node type: ${node.data.type}`);
              }

              log(context, nodeId, "info", `Executing via ${node.data.type} executor`, { attempt });

              // Execute using the pluggable executor
              const executionResult = await executor.execute(input, node.data.config);

              // Determine success/failure (simplified for demo)
              const isError = Math.random() < 0.2;

              // If error and retries remain, retry
              if (isError && attempt < retryCount) {
                log(context, nodeId, "warn", `Execution failed (attempt ${attempt}/${retryCount}), retrying in ${retryDelay}ms...`);
                // Schedule next attempt
                setTimeout(attemptExecution, retryDelay);
                return;
              }

              // Generate output object
              const output = {
                nodeId,
                nodeType: node.data.type,
                timestamp: Date.now(),
                input,
                executionResult,
                result: isError ? null : executionResult,
                success: !isError,
                attempt,
              };

              log(
                context,
                nodeId,
                isError ? "error" : "success",
                `Execution ${isError ? "failed after all retries" : "completed"}`,
                { result: executionResult, totalAttempts: attempt }
              );

              // Store in execution context
              context.nodeResults[nodeId] = output;

              // Store output for downstream nodes to consume
              setNodeOutputs((prev) => ({
                ...prev,
                [nodeId]: output,
              }));

              // Update node with output data and final status
              setNodes((nds) =>
                nds.map((n) =>
                  n.id === nodeId
                    ? {
                        ...n,
                        data: {
                          ...n.data,
                          status: isError ? ('error' as const) : ('success' as const),
                          output: output,
                        },
                      }
                    : n
                )
              );

              // Update execution logs
              setExecutionLogs([...context.logs]);

              resolve(!isError);
            } catch (error: any) {
              // If error and retries remain, retry
              if (attempt < retryCount) {
                log(context, nodeId, "warn", `Execution error (attempt ${attempt}/${retryCount}): ${error.message}, retrying in ${retryDelay}ms...`);
                setTimeout(attemptExecution, retryDelay);
                return;
              }

              log(context, nodeId, "error", `Execution error after ${attempt} attempt(s): ${error.message}`, error);

              const output = {
                nodeId,
                timestamp: Date.now(),
                input,
                error: error.message,
                success: false,
                attempt,
              };

              context.nodeResults[nodeId] = output;

              setNodeOutputs((prev) => ({
                ...prev,
                [nodeId]: output,
              }));

              setNodes((nds) =>
                nds.map((n) =>
                  n.id === nodeId
                    ? {
                        ...n,
                        data: {
                          ...n.data,
                          status: 'error' as const,
                          output: output,
                        },
                      }
                    : n
                )
              );

              // Update execution logs
              setExecutionLogs([...context.logs]);

              resolve(false);
            }
          }, attempt === 1 ? 800 : retryDelay);
        };

        // Start first attempt
        attemptExecution();
      });
    },
    [nodes, getInputForNode]
  );

  // Execute workflow using topological sort (Kahn's Algorithm) - no recursion, level-by-level execution
  const runWorkflow = useCallback(async () => {
    // Create execution context
    const context: ExecutionContext = {
      executionId: `exec-${Date.now()}`,
      startTime: Date.now(),
      logs: [],
      nodeResults: {},
    };

    log(context, null, "info", "🚀 Starting workflow execution (Topological Sort)");
    log(context, null, "info", "Graph statistics", {
      totalNodes: nodes.length,
      totalEdges: edges.length,
    });

    // Validate graph structure before proceeding
    if (!validateGraphStructure()) {
      log(context, null, "error", "❌ Workflow validation failed. Execution blocked.");
      setExecutionLogs([...context.logs]);
      return;
    }

    // Step 1: Compute in-degrees for all nodes
    const inDegrees = computeInDegrees();
    log(context, null, "info", "📊 Computed in-degrees for all nodes", {
      inDegrees: Object.fromEntries(inDegrees),
    });

    // Step 2: Initialize queue with nodes that have in-degree 0 (start nodes)
    const queue: string[] = [];
    inDegrees.forEach((degree, nodeId) => {
      if (degree === 0) {
        queue.push(nodeId);
      }
    });

    if (queue.length === 0) {
      log(context, null, "error", "❌ No start nodes found (all nodes have incoming edges - cycle detected)");
      setExecutionLogs(context.logs);
      return;
    }

    log(context, null, "info", `📋 Start nodes (in-degree 0): ${queue.join(", ")}`);

    // Step 3: Execute nodes level by level using topological sort (Kahn's Algorithm)
    const completedNodes = new Set<string>();
    const workingInDegrees = new Map(inDegrees);
    let levelCount = 0;

    while (queue.length > 0) {
      levelCount++;
      const currentLevel = queue.splice(0, queue.length); // Get all ready nodes

      log(context, null, "info", `⚡ Level ${levelCount}: Executing ${currentLevel.length} node(s) in parallel: ${currentLevel.join(", ")}`);

      // Execute all nodes at this level in parallel
      const levelResults = await Promise.all(
        currentLevel.map(async (nodeId) => {
          const success = await executeNode(nodeId, context);
          if (success) {
            completedNodes.add(nodeId);
          }
          return success;
        })
      );

      // Check if all nodes at this level succeeded or have continue strategy
      const failedNodes = currentLevel.filter((nodeId, idx) => !levelResults[idx]);
      const nodesWithContinue = currentLevel.filter((nodeId) => {
        const node = nodes.find((n) => n.id === nodeId);
        return node?.data.failureStrategy === 'continue';
      });

      const criticalFailures = failedNodes.filter((nodeId) => !nodesWithContinue.includes(nodeId));

      if (criticalFailures.length > 0) {
        log(context, null, "error", `⛔ Critical failure(s) at level ${levelCount}: ${criticalFailures.join(", ")}. Stopping execution.`);
        break;
      }

      if (failedNodes.length > 0) {
        const continuingNodes = failedNodes.filter((nodeId) => nodesWithContinue.includes(nodeId));
        log(context, null, "warn", `⚠️  Nodes failed but continuing (failureStrategy=continue): ${continuingNodes.join(", ")}`);
      }

      // Step 4: Reduce in-degree of child nodes and add ready nodes to queue
      currentLevel.forEach((nodeId) => {
        const outgoingEdges = edges.filter((e) => e.source === nodeId);

        outgoingEdges.forEach((edge) => {
          const childId = edge.target;
          const newDegree = (workingInDegrees.get(childId) || 0) - 1;
          workingInDegrees.set(childId, newDegree);

          // If child node now has all dependencies satisfied (in-degree = 0), add to queue
          if (newDegree === 0) {
            queue.push(childId);
            log(context, null, "info", `✅ Node ${childId} ready (all parents completed), adding to queue`);
          }
        });
      });
    }

    // Step 5: Verify all nodes were executed
    const duration = Date.now() - context.startTime;
    if (completedNodes.size === nodes.length) {
      log(context, null, "success", `✨ Workflow completed successfully! Executed ${nodes.length} nodes in ${levelCount} level(s)`, {
        duration: `${duration}ms`,
        executionId: context.executionId,
        totalLogs: context.logs.length,
      });
    } else {
      const unexecutedNodes = nodes.filter((n) => !completedNodes.has(n.id));
      log(context, null, "warn", `⚠️  Workflow incomplete. Unexecuted nodes: ${unexecutedNodes.map((n) => n.id).join(", ")}`, {
        duration: `${duration}ms`,
        executionId: context.executionId,
      });
    }

    // Final update of execution logs
    setExecutionLogs([...context.logs]);
  }, [nodes, edges, executeNode, validateGraphStructure, computeInDegrees]);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      {/* Sidebar with draggable node types */}
      <div style={{
        width: '200px',
        background: 'rgba(0, 0, 0, 0.9)',
        borderRight: '1px solid #333',
        padding: '16px',
        overflowY: 'auto',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '12px',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>
          📦 Node Types
        </div>
        
        {[
          { type: 'http', label: '🌐 HTTP', color: '#2196F3' },
          { type: 'ai', label: '🤖 AI', color: '#9C27B0' },
          { type: 'function', label: '⚙️ Function', color: '#FF9800' },
        ].map(({ type, label, color }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => onDragStartSidebar(e, type)}
            style={{
              padding: '10px',
              marginBottom: '8px',
              background: color,
              borderRadius: '6px',
              cursor: 'grab',
              textAlign: 'center',
              fontWeight: 'bold',
              opacity: 0.9,
              transition: 'opacity 0.2s',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.9';
            }}
          >
            {label}
          </div>
        ))}
        
        <div style={{ 
          fontSize: '11px', 
          opacity: 0.7, 
          marginTop: '16px',
          padding: '8px',
          background: '#111',
          borderRadius: '4px',
          lineHeight: '1.6'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>💡 Tip:</div>
          Drag a node type onto the canvas to create a new node
        </div>
      </div>

      {/* React Flow Canvas */}
      <div 
        style={{ flex: 1, position: 'relative' }}
        onDragOver={onDragOver}
        onDrop={onDropCanvas}
      >
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 20,
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '16px',
          borderRadius: '8px',
          color: 'white',
          fontFamily: 'monospace',
          fontSize: '12px',
          maxWidth: '300px'
        }}>
          <button
            onClick={runWorkflow}
            style={{
              padding: '8px 12px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              marginBottom: '12px',
              width: '100%',
              fontWeight: 'bold'
            }}
          >
            ▶️ Run Workflow
          </button>

          <button
            onClick={() => {
              setNodeOutputs({});
              setExecutionLogs([]);
              setSelectedNodeId(null);
              setNodes((nds) => nds.map((n) => ({
                ...n,
                data: { ...n.data, status: 'idle' as const, output: undefined }
              })));
            }}
            style={{
              padding: '8px 12px',
              background: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              marginBottom: '12px',
              width: '100%',
            }}
          >
            🔄 Reset Workflow
          </button>

          <div style={{ borderTop: '1px solid #555', paddingTop: '12px', marginTop: '12px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>📍 How to Add Edges:</div>
            <div style={{ fontSize: '11px', lineHeight: '1.6', opacity: 0.9 }}>
              1. <strong>Drag from node</strong><br/>
              2. <strong>Release on target</strong><br/>
              3. Edge connects nodes<br/>
              <br/>
              Nodes: {nodes.length}<br/>
              Edges: {edges.length}<br/>
              <span style={{ color: edges.length === 0 ? '#ff6b6b' : '#4CAF50' }}>
                {edges.length === 0 ? '⚠️ No edges' : '✅ Connected'}
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #555', paddingTop: '12px', marginTop: '12px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🔗 Add Edge:</div>
            
            <select
              value={sourceNode}
              onChange={(e) => setSourceNode(e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                marginBottom: '6px',
                background: '#222',
                color: 'white',
                border: '1px solid #555',
                borderRadius: '4px',
                fontSize: '11px'
              }}
            >
              <option value="">Select Source</option>
              {nodes.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.data.label} ({n.id})
                </option>
              ))}
            </select>

            <select
              value={targetNode}
              onChange={(e) => setTargetNode(e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                marginBottom: '8px',
                background: '#222',
                color: 'white',
                border: '1px solid #555',
                borderRadius: '4px',
                fontSize: '11px'
              }}
            >
              <option value="">Select Target</option>
              {nodes.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.data.label} ({n.id})
                </option>
              ))}
            </select>

            <button
              onClick={addEdgeHandler}
              style={{
                width: '100%',
                padding: '6px',
                background: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 'bold'
              }}
            >
              ➕ Add Edge
            </button>
          </div>

          {edges.length > 0 && (
            <div style={{ borderTop: '1px solid #555', paddingTop: '12px', marginTop: '12px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>
                ✂️ Edges:
              </div>
              <div style={{ fontSize: '10px', maxHeight: '120px', overflow: 'auto' }}>
                {edges.map((edge) => (
                  <div
                    key={edge.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '6px',
                      background: '#222',
                      marginBottom: '4px',
                      borderRadius: '4px',
                      opacity: 0.8
                    }}
                  >
                    <span>{edge.source} → {edge.target}</span>
                    <button
                      onClick={() => removeEdgeHandler(edge.id)}
                      style={{
                        background: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        padding: '2px 6px',
                        cursor: 'pointer',
                        fontSize: '9px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {executionLogs.length > 0 && (
            <div style={{ borderTop: '1px solid #555', paddingTop: '12px', marginTop: '12px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>
                📋 Execution Logs ({executionLogs.length}):
              </div>
              <div style={{ fontSize: '9px', maxHeight: '150px', overflow: 'auto', fontFamily: 'monospace' }}>
                {executionLogs.map((logEntry, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '4px',
                      marginBottom: '2px',
                      background: '#111',
                      borderLeft: `3px solid ${
                        logEntry.level === 'error' ? '#f44336' :
                        logEntry.level === 'success' ? '#4CAF50' :
                        logEntry.level === 'warn' ? '#FF9800' : '#2196F3'
                      }`,
                      borderRadius: '2px'
                    }}
                  >
                    <div style={{ opacity: 0.7 }}>
                      {logEntry.nodeId ? `[${logEntry.nodeId}]` : '[WORKFLOW]'} {logEntry.message}
                    </div>
                    {logEntry.data && (
                      <div style={{ fontSize: '8px', opacity: 0.5, marginTop: '2px' }}>
                        {JSON.stringify(logEntry.data).substring(0, 80)}...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
      </ReactFlow>
      </div>

      {/* Right-side config panel */}
      <div style={{
        width: '320px',
        background: 'rgba(0, 0, 0, 0.9)',
        borderLeft: '1px solid #333',
        padding: '16px',
        overflowY: 'auto',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '12px',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>
          ⚙️ Node Config
        </div>

        {!selectedNode ? (
          <div style={{ opacity: 0.7, lineHeight: '1.6' }}>
            Click a node to edit its configuration.
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '12px', padding: '8px', background: '#111', borderRadius: '4px' }}>
              <div style={{ fontWeight: 'bold' }}>{selectedNode.data.label}</div>
              <div style={{ opacity: 0.7 }}>{selectedNode.data.type}</div>
            </div>

            {selectedNode.data.type === 'http' && (
              <>
                <label style={{ display: 'block', marginBottom: '6px' }}>URL</label>
                <input
                  value={selectedNode.data.config?.url || ''}
                  onChange={(e) => updateSelectedNodeConfig({ url: e.target.value })}
                  style={{ width: '100%', marginBottom: '12px', padding: '8px', background: '#222', color: 'white', border: '1px solid #555', borderRadius: '4px' }}
                />

                <label style={{ display: 'block', marginBottom: '6px' }}>Method</label>
                <select
                  value={selectedNode.data.config?.method || 'GET'}
                  onChange={(e) => updateSelectedNodeConfig({ method: e.target.value })}
                  style={{ width: '100%', marginBottom: '12px', padding: '8px', background: '#222', color: 'white', border: '1px solid #555', borderRadius: '4px' }}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </>
            )}

            {selectedNode.data.type === 'ai' && (
              <>
                <label style={{ display: 'block', marginBottom: '6px' }}>Prompt</label>
                <textarea
                  value={selectedNode.data.config?.prompt || ''}
                  onChange={(e) => updateSelectedNodeConfig({ prompt: e.target.value })}
                  rows={8}
                  style={{ width: '100%', marginBottom: '12px', padding: '8px', background: '#222', color: 'white', border: '1px solid #555', borderRadius: '4px', resize: 'vertical' }}
                />
              </>
            )}

            {selectedNode.data.type === 'function' && (
              <>
                <label style={{ display: 'block', marginBottom: '6px' }}>Code</label>
                <textarea
                  value={selectedNode.data.config?.code || ''}
                  onChange={(e) => updateSelectedNodeConfig({ code: e.target.value })}
                  rows={10}
                  style={{ width: '100%', marginBottom: '12px', padding: '8px', background: '#222', color: 'white', border: '1px solid #555', borderRadius: '4px', resize: 'vertical', fontFamily: 'monospace' }}
                />
              </>
            )}

            <div style={{ borderTop: '1px solid #555', paddingTop: '12px', marginTop: '12px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🧩 Node Settings</div>
              <label style={{ display: 'block', marginBottom: '6px' }}>Retry Count</label>
              <input
                type="number"
                value={selectedNode.data.retryCount ?? 2}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setNodes((currentNodes) =>
                    currentNodes.map((node) =>
                      node.id === selectedNode.id
                        ? { ...node, data: { ...node.data, retryCount: value } }
                        : node
                    )
                  );
                }}
                style={{ width: '100%', marginBottom: '12px', padding: '8px', background: '#222', color: 'white', border: '1px solid #555', borderRadius: '4px' }}
              />

              <label style={{ display: 'block', marginBottom: '6px' }}>Retry Delay (ms)</label>
              <input
                type="number"
                value={selectedNode.data.retryDelay ?? 500}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setNodes((currentNodes) =>
                    currentNodes.map((node) =>
                      node.id === selectedNode.id
                        ? { ...node, data: { ...node.data, retryDelay: value } }
                        : node
                    )
                  );
                }}
                style={{ width: '100%', marginBottom: '12px', padding: '8px', background: '#222', color: 'white', border: '1px solid #555', borderRadius: '4px' }}
              />

              <label style={{ display: 'block', marginBottom: '6px' }}>Failure Strategy</label>
              <select
                value={selectedNode.data.failureStrategy || 'stop'}
                onChange={(e) => {
                  const value = e.target.value as 'stop' | 'continue';
                  setNodes((currentNodes) =>
                    currentNodes.map((node) =>
                      node.id === selectedNode.id
                        ? { ...node, data: { ...node.data, failureStrategy: value } }
                        : node
                    )
                  );
                }}
                style={{ width: '100%', marginBottom: '12px', padding: '8px', background: '#222', color: 'white', border: '1px solid #555', borderRadius: '4px' }}
              >
                <option value="stop">stop</option>
                <option value="continue">continue</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
