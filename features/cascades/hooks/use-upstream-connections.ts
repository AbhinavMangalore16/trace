import { useMemo } from "react"
import { useNodes, useEdges, type Node } from "@xyflow/react"
import {
    DominoRegistry,
    type DominoType,
    type StepDominoData,
} from "@/features/cascades/dominos/domino-registry"

export type UpstreamOutput = {
    token: string
    label: string
    nodeType: string
    nodeId: string
    nodeTitle: string
    path: string
    outputLabel: string
}

/**
 * Custom hook to retrieve all available outputs from all upstream (ancestor) nodes
 * connected to the selected node in a cascade workflow graph.
 *
 * Re-computes automatically when nodes or edges are connected/disconnected.
 */
export function useUpstreamConnections(
    selectedNode: Node<StepDominoData> | string | null | undefined
): UpstreamOutput[] {
    const nodes = useNodes<Node<StepDominoData>>()
    const edges = useEdges()

    return useMemo(() => {
        if (!selectedNode) return []

        const targetNodeId = typeof selectedNode === "string" ? selectedNode : selectedNode.id
        if (!targetNodeId) return []

        // Map nodes by ID for O(1) lookup
        const nodeMap = new Map<string, Node<StepDominoData>>()
        for (const n of nodes) {
            nodeMap.set(n.id, n)
        }

        // Build adjacency map of incoming edges: targetId -> sourceId[]
        const incomingMap = new Map<string, string[]>()
        for (const edge of edges) {
            if (!edge.source || !edge.target) continue
            const sources = incomingMap.get(edge.target) ?? []
            sources.push(edge.source)
            incomingMap.set(edge.target, sources)
        }

        // Traverse all upstream ancestor node IDs (BFS)
        const visited = new Set<string>()
        const queue: string[] = [targetNodeId]

        while (queue.length > 0) {
            const currentId = queue.shift()!
            const parentIds = incomingMap.get(currentId) ?? []

            for (const parentId of parentIds) {
                if (!visited.has(parentId) && parentId !== targetNodeId) {
                    visited.add(parentId)
                    queue.push(parentId)
                }
            }
        }

        // Collect outputs declared by all upstream nodes
        const results: UpstreamOutput[] = []

        for (const ancestorId of visited) {
            const ancestorNode = nodeMap.get(ancestorId)
            if (!ancestorNode) continue

            const nodeType = ancestorNode.data?.type as DominoType | undefined
            if (!nodeType) continue

            const def = DominoRegistry[nodeType]
            if (!def || !def.outputs || def.outputs.length === 0) continue

            const nodeTitle = ancestorNode.data?.title || def.label || ancestorId

            for (const out of def.outputs) {
                results.push({
                    token: `{{ ${ancestorId}.${out.path} }}`,
                    label: `${nodeTitle} · ${out.label}`,
                    nodeType,
                    nodeId: ancestorId,
                    nodeTitle,
                    path: out.path,
                    outputLabel: out.label,
                })
            }
        }

        return results
    }, [selectedNode, nodes, edges])
}
