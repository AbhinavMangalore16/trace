"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  type Edge,
  type ColorMode,
  ConnectionLineType,
  type NodeTypes,
  Panel,
} from "@xyflow/react"
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow"

import { DominoStone } from "./domino-stones"
import type { StepDominoType } from "../dominos/domino-registry"
import { AvatarStack } from "@liveblocks/react-ui"
import "@xyflow/react/dist/style.css"
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-flow/styles.css"

const emptySubscribe = () => () => { }

// Register 'step' and 'domino' node types to match StepDominoType (where type is 'step')
const dominoTypes: NodeTypes = {
  step: DominoStone,
  domino: DominoStone,
}

function useHasMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

const initDomino: StepDominoType[] = [
  {
    id: "start",
    type: "step",
    position: { x: 100, y: 100 },
    data: {
      type: "start",
      kind: "trigger",
      title: "Start",
      values: {},
    },
  },
]

const initialEdges: Edge[] = []

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const mounted = useHasMounted()

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDelete,
  } = useLiveblocksFlow({
    nodes: {
      initial: initDomino,
    },
    edges: {
      initial: initialEdges,
    },
  })

  // Use "dark" during SSR & initial hydration to ensure server & client output match,
  // only switching to resolvedTheme once mounted.
  const colorMode: ColorMode = mounted
    ? resolvedTheme === "light"
      ? "light"
      : "dark"
    : "dark"

  const isDark = colorMode === "dark"

  return (
    <div className="relative size-full bg-background dark:bg-[#14111E]">
      <ReactFlow
        nodeTypes={dominoTypes}
        nodes={nodes ?? undefined}
        edges={edges ?? undefined}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        colorMode={colorMode}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: "#8B5CF6", strokeWidth: 2 }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "#8B5CF6", strokeWidth: 2 },
        }}
      >
        <Controls className="rounded-lg border border-border bg-card p-1 text-foreground shadow-md dark:border-white/10 dark:bg-[#161224] dark:text-slate-200 dark:fill-slate-200" />
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color={isDark ? "#3A3052" : "#CBD5E1"}
        />
        <Cursors />
        <Panel position="top-right">
          <AvatarStack />
        </Panel>
      </ReactFlow>
    </div>
  )
}
