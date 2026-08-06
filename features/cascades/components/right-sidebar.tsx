"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { useReactFlow, useStore } from "@xyflow/react"
import { useRealtimeRun } from "@trigger.dev/react-hooks"
import {
  MoreHorizontal,
  Play,
  Trash2,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Sun,
  Moon,
  Wrench,
  SlidersHorizontal,
  Square,
  X,
} from "lucide-react"
import { toast } from "sonner"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { runCascadeAction, deleteCascadeAction, cancelCascadeRunAction } from "@/features/cascades/actions"
import { graphDFSToposort } from "@/features/cascades/utils/graph-dfs-toposort"
import type { runCascadeDomino } from "@/features/cascades/tasks/run-cascade"
import {
  DominoRegistry,
  type DominoDefinition,
  type DominoField,
  type DominoType,
  type StepDominoKind,
  type StepDominoType,
} from "@/features/cascades/dominos/domino-registry"


// ---------------------------------------------------------------------------
// Shared pieces — used by both the Toolkit and the Editor.
// ---------------------------------------------------------------------------

// The accent-colored icon chip, mirroring the node on the canvas.
function NodeIcon({ type, className }: { type: DominoType; className?: string }) {
  const def = DominoRegistry[type]
  if (!def) return null
  const Icon = def.icon
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md",
        def.accent,
        className
      )}
    >
      <Icon className="size-3.5" />
    </span>
  )
}

// A titled, scrollable panel. Each tab renders its content inside one.
function Section({
  title,
  icon,
  children,
}: {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-2 border-y border-border bg-card px-3 py-2 text-xs font-semibold">
        {icon}
        {title}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Editor tab — edits the fields of the selected node.
// ---------------------------------------------------------------------------

function Field({
  field,
  value,
  onChange,
}: {
  field: DominoField
  value: string
  onChange: (value: string) => void
}) {
  if (field.multiline) {
    return (
      <Textarea
        id={field.key}
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs min-h-[80px] font-mono resize-y"
      />
    )
  }

  return (
    <Input
      id={field.key}
      value={value}
      placeholder={field.placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs h-8"
    />
  )
}

function Inspector({ node }: { node: StepDominoType | undefined }) {
  const { updateNodeData } = useReactFlow<StepDominoType>()

  if (!node) {
    return (
      <Section title="Editor" icon={<SlidersHorizontal className="size-3.5" />}>
        <p className="p-3 text-xs text-muted-foreground">No node selected</p>
      </Section>
    )
  }

  const { type, title, values } = node.data
  const def: DominoDefinition | undefined = DominoRegistry[type]

  if (!def) {
    return (
      <Section title="Editor" icon={<SlidersHorizontal className="size-3.5" />}>
        <p className="p-3 text-xs text-muted-foreground">Unknown node type</p>
      </Section>
    )
  }

  return (
    <Section title={title || def.label} icon={<NodeIcon type={type} />}>
      <div className="flex flex-col gap-3 p-3">
        {def.fields.length === 0 ? (
          <p className="text-xs text-muted-foreground">No configurable properties for this domino.</p>
        ) : (
          def.fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <Label htmlFor={field.key} className="text-xs">
                {field.label}
                {field.required && <span className="text-destructive">*</span>}
              </Label>
              <Field
                field={field}
                value={values[field.key] ?? ""}
                onChange={(value) => {
                  updateNodeData(node.id, {
                    values: { ...values, [field.key]: value },
                  })
                }}
              />
            </div>
          ))
        )}
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Toolkit tab — adds nodes to the canvas, grouped by kind.
// ---------------------------------------------------------------------------

const sections: { kind: StepDominoKind; label: string }[] = [
  { kind: "trigger", label: "Triggers" },
  { kind: "action", label: "Actions" },
]

const definitions = Object.values(DominoRegistry)

function Palette() {
  const { getNodes, getViewport, addNodes } = useReactFlow<StepDominoType>()
  const width = useStore((s) => s.width)
  const height = useStore((s) => s.height)

  const add = (type: DominoType) => {
    const def = DominoRegistry[type]
    if (!def) return

    const nodes = getNodes()

    if (def.kind === "trigger" && nodes.some((n) => n.data?.kind === "trigger")) {
      toast.error("A cascade can only have one trigger.")
      return
    }

    const count = nodes.filter((n) => n.data?.type === type).length
    const title = `${def.label} ${count + 1}`

    const { x, y, zoom } = getViewport()
    const position = {
      x: ((width || 800) / 2 - x) / (zoom || 1),
      y: ((height || 600) / 2 - y) / (zoom || 1),
    }

    addNodes({
      id: crypto.randomUUID(),
      type: "step",
      position,
      data: { type, kind: def.kind, title, values: {} },
    })

    toast.success(`Added ${title} domino`)
  }

  return (
    <Section title="Toolkit" icon={<Wrench className="size-3.5" />}>
      <Accordion
        type="multiple"
        defaultValue={sections.map((s) => s.kind)}
        className="px-3 py-2"
      >
        {sections.map((section) => (
          <AccordionItem
            key={section.kind}
            value={section.kind}
            className="not-last:border-b-0"
          >
            <AccordionTrigger className="py-2 text-xs font-medium text-muted-foreground hover:no-underline">
              {section.label}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              {definitions
                .filter((def) => def.kind === section.kind)
                .map((def) => (
                  <Button
                    key={def.type}
                    variant="ghost"
                    size="sm"
                    onClick={() => add(def.type as DominoType)}
                    className="justify-start gap-2.5 px-2 text-xs h-8 hover:bg-accent/60"
                  >
                    <NodeIcon type={def.type as DominoType} />
                    <span>{def.label}</span>
                  </Button>
                ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Header Actions
// ---------------------------------------------------------------------------

function ActionsMenu({ cascadeId }: { cascadeId?: string }) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="size-7">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-44">
        <DropdownMenuItem
          variant="destructive"
          disabled={isPending || !cascadeId}
          className="text-xs gap-2"
          onSelect={(e) => {
            if (!cascadeId) return
            e.preventDefault()
            startTransition(async () => {
              try {
                await deleteCascadeAction(cascadeId)
                toast.success("Cascade deleted")
              } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Failed to delete cascade"
                toast.error(message)
              }
            })
          }}
        >
          {isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
          <span>Delete cascade</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function RunButton({
  cascadeId,
  onRunTriggered,
}: {
  cascadeId?: string
  onRunTriggered: (run: { runId: string; publicAccessToken: string } | null) => void
}) {
  const [isPending, startTransition] = React.useTransition()
  const { getNodes, getEdges } = useReactFlow<StepDominoType>()

  const handleRunCascade = () => {
    if (!cascadeId) {
      toast.error("No active cascade ID found")
      return
    }

    const nodes = getNodes()
    const edges = getEdges()

    const problems = graphDFSToposort({ nodes, edges })
    if (problems.length > 0) {
      toast.error(problems[0])
      onRunTriggered(null)
      return
    }

    startTransition(async () => {
      try {
        const res = await runCascadeAction(cascadeId, { nodes, edges })
        onRunTriggered({
          runId: res.runId,
          publicAccessToken: res.publicAccessToken,
        })
        toast.success("Cascade run triggered!", {
          description: `Run ID: ${res.runId}`,
        })
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to trigger cascade run"
        toast.error(message)
      }
    })
  }

  return (
    <Button
      size="xs"
      disabled={isPending || !cascadeId}
      onClick={handleRunCascade}
      className="gap-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
    >
      {isPending ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Play className="size-3.5 fill-current" />
      )}
      <span>{isPending ? "Starting..." : "Run"}</span>
    </Button>
  )
}

// ---------------------------------------------------------------------------
// Main RightSidebar Component
// ---------------------------------------------------------------------------

interface RightSidebarProps {
  cascadeId?: string
}

export function RightSidebar({ cascadeId }: RightSidebarProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const [tab, setTab] = React.useState("toolkit")

  const [activeRun, setActiveRun] = React.useState<{
    runId: string
    publicAccessToken: string
  } | null>(null)

  const { run, error: realtimeError } = useRealtimeRun<typeof runCascadeDomino>(
    activeRun?.runId ?? "",
    {
      accessToken: activeRun?.publicAccessToken ?? "",
      enabled: !!activeRun?.runId && !!activeRun?.publicAccessToken,
    }
  )

  // Selected node tracking
  const selected = useStore((s) =>
    s.nodes.find((n) => n.selected)
  ) as StepDominoType | undefined

  const [prevSelectedId, setPrevSelectedId] = React.useState(selected?.id)
  if (selected && selected.id !== prevSelectedId) {
    setPrevSelectedId(selected.id)
    setTab("editor")
  }

  // Realtime Status badge configuration
  const getStatusBadgeConfig = (status?: string) => {
    if (!status) return null

    switch (status) {
      case "QUEUED":
        return {
          label: "Queued",
          badgeClass: "bg-amber-500/10 border-amber-500/30 text-amber-500 dark:text-amber-400",
          icon: <Clock className="size-3.5 animate-pulse text-amber-500 dark:text-amber-400" />,
        }
      case "EXECUTING":
      case "EXECUTING_WITH_RETRY":
      case "WAITING_ON_CONNECTIONS":
        return {
          label: "Executing",
          badgeClass: "bg-blue-500/10 border-blue-500/30 text-blue-500 dark:text-blue-400",
          icon: <Loader2 className="size-3.5 animate-spin text-blue-500 dark:text-blue-400" />,
        }
      case "COMPLETED":
        return {
          label: "Completed",
          badgeClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
          icon: <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />,
        }
      case "FAILED":
      case "CRASHED":
      case "SYSTEM_FAILURE":
      case "TIMED_OUT":
      case "CANCELED":
        return {
          label: status === "FAILED" ? "Failed" : status,
          badgeClass: "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400",
          icon: <XCircle className="size-3.5 text-rose-600 dark:text-rose-400" />,
        }
      default:
        return {
          label: status,
          badgeClass: "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400",
          icon: <Sparkles className="size-3.5 text-purple-600 dark:text-purple-400" />,
        }
    }
  }

  const statusConfig = getStatusBadgeConfig(run?.status)

  return (
    <div className="flex size-full flex-col bg-background text-foreground dark:bg-[#0B0813] select-none overflow-hidden">
      {/* Header Actions */}
      <div className="flex items-center justify-between border-b border-border p-2">
        <div className="flex items-center gap-1">
          <ActionsMenu cascadeId={cascadeId} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="size-7"
            title="Toggle theme (press 'D')"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-3.5 text-amber-400" />
            ) : (
              <Moon className="size-3.5 text-purple-600" />
            )}
          </Button>
        </div>
        <RunButton cascadeId={cascadeId} onRunTriggered={setActiveRun} />
      </div>

      {/* Tabs Layout */}
      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col gap-0">
        <TabsList className="m-2 w-fit bg-muted/50 p-1">
          <TabsTrigger
            value="toolkit"
            className="flex-none rounded-sm px-3 py-1 text-xs font-medium data-active:bg-background data-active:text-foreground data-active:shadow-xs"
          >
            Toolkit
          </TabsTrigger>
          <TabsTrigger
            value="editor"
            className="flex-none rounded-sm px-3 py-1 text-xs font-medium data-active:bg-background data-active:text-foreground data-active:shadow-xs"
          >
            Editor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="toolkit" className="flex min-h-0 flex-1 flex-col border-none p-0 mt-0">
          <Palette />
        </TabsContent>

        <TabsContent value="editor" className="flex min-h-0 flex-1 flex-col border-none p-0 mt-0">
          <Inspector node={selected} />
        </TabsContent>
      </Tabs>

      {/* Realtime Task Feedback Container */}
      {activeRun && (
        <div className="border-t border-border p-3 flex flex-col gap-2.5 bg-card/50 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Run Status
            </span>
            <div className="flex items-center gap-1.5">
              {statusConfig ? (
                <div
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
                    statusConfig.badgeClass
                  )}
                >
                  {statusConfig.icon}
                  <span>{statusConfig.label}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Loader2 className="size-3 animate-spin text-purple-500" />
                  <span>Connecting...</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                {run && (run.status === "EXECUTING" || run.status === "QUEUED") && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={async () => {
                      try {
                        await cancelCascadeRunAction(activeRun.runId)
                        toast.success("Cascade run cancellation requested")
                      } catch (err: unknown) {
                        const message = err instanceof Error ? err.message : "Failed to cancel run"
                        toast.error(message)
                      }
                    }}
                    className="h-5 gap-1 px-1.5 text-[10px] text-muted-foreground hover:text-destructive"
                    title="Cancel run"
                  >
                    <Square className="size-2.5 fill-current" />
                    <span>Cancel</span>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveRun(null)}
                  className="size-5 rounded-full text-muted-foreground hover:text-foreground"
                  title="Dismiss status"
                >
                  <X className="size-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-[11px] text-muted-foreground">
            <div className="flex justify-between">
              <span>Run ID:</span>
              <span className="font-mono text-foreground truncate max-w-[120px]" title={activeRun.runId}>
                {activeRun.runId}
              </span>
            </div>
            {run?.durationMs !== undefined && (
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-mono text-foreground">
                  {(run.durationMs / 1000).toFixed(2)}s
                </span>
              </div>
            )}
          </div>

          {/* Realtime Output Feedback (Green Container) */}
          {run?.output && (
            <div className="flex flex-col gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-500/5 p-2 text-xs">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Output</span>
              <pre className="whitespace-pre-wrap font-mono text-[11px] text-emerald-800 dark:text-emerald-200 overflow-x-auto max-h-32">
                {JSON.stringify(run.output, null, 2)}
              </pre>
            </div>
          )}

          {/* Realtime Error Feedback (Red Container) */}
          {(realtimeError || run?.error) && (
            <div className="flex flex-col gap-1 rounded-lg border border-rose-500/20 bg-rose-500/10 dark:bg-rose-500/5 p-2 text-xs">
              <span className="font-semibold text-rose-600 dark:text-rose-400">Error</span>
              <p className="font-mono text-[11px] text-rose-800 dark:text-rose-300">
                {realtimeError?.message || JSON.stringify(run?.error)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
