"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { useRealtimeRun } from "@trigger.dev/react-hooks"
import { Play, Loader2, CheckCircle2, XCircle, Clock, Sparkles, Sun, Moon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { runCascadeAction } from "@/features/cascades/actions"
import type { helloWorldTask } from "@/trigger/example"
import { cn } from "@/lib/utils"

interface RightSidebarProps {
  cascadeId?: string
}

export function RightSidebar({ cascadeId }: RightSidebarProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const [isPending, startTransition] = React.useTransition()
  const [activeRun, setActiveRun] = React.useState<{
    runId: string
    publicAccessToken: string
  } | null>(null)

  const { run, error: realtimeError } = useRealtimeRun<typeof helloWorldTask>(
    activeRun?.runId ?? "",
    {
      accessToken: activeRun?.publicAccessToken ?? "",
      enabled: !!activeRun?.runId && !!activeRun?.publicAccessToken,
    }
  )

  const handleRunCascade = () => {
    if (!cascadeId) {
      toast.error("No active cascade ID found")
      return
    }

    startTransition(async () => {
      try {
        const res = await runCascadeAction(cascadeId)
        setActiveRun({
          runId: res.runId,
          publicAccessToken: res.publicAccessToken,
        })
        toast.success("Cascade run triggered!", {
          description: `Run ID: ${res.runId}`,
        })
      } catch (err: any) {
        toast.error(err?.message || "Failed to trigger cascade run")
      }
    })
  }

  // Color configurations based on realtime task run status
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
    <div className="flex size-full flex-col justify-between overflow-y-auto bg-background text-foreground dark:bg-[#0B0813] p-3 sm:p-4 select-none gap-4">
      {/* Top Header / Trigger & Theme Toggle Actions */}
      <div className="flex w-full flex-col items-center gap-3">
        {/* Run Cascade Primary Button */}
        <Button
          disabled={isPending}
          onClick={handleRunCascade}
          className="w-full gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Play className="size-4 fill-current" />
          )}
          <span>{isPending ? "Starting..." : "Run Cascade"}</span>
        </Button>

        {/* Theme Toggle Button with 'Press D to toggle' prompt */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="w-full justify-between gap-2 border-border/60 bg-muted/30 hover:bg-accent text-xs transition-all"
          title="Toggle light/dark theme (or press 'D' on keyboard)"
        >
          <div className="flex items-center gap-2">
            {resolvedTheme === "dark" ? (
              <Sun className="size-3.5 text-amber-400" />
            ) : (
              <Moon className="size-3.5 text-purple-600" />
            )}
            <span>{resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </div>
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground shadow-xs">
            D
          </kbd>
        </Button>
      </div>

      {/* Realtime Task Feedback Container */}
      {activeRun && (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-border bg-card dark:border-white/10 dark:bg-white/[0.03] p-3 backdrop-blur-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-slate-400">
              Run Status
            </span>
            {statusConfig ? (
              <div
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all",
                  statusConfig.badgeClass
                )}
              >
                {statusConfig.icon}
                <span>{statusConfig.label}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Loader2 className="size-3 animate-spin text-purple-500" />
                <span>Connecting...</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground dark:text-slate-400">
            <div className="flex justify-between">
              <span className="text-muted-foreground/70 dark:text-slate-500">Run ID:</span>
              <span className="font-mono text-foreground dark:text-slate-300 truncate max-w-[130px]" title={activeRun.runId}>
                {activeRun.runId}
              </span>
            </div>
            {run?.durationMs && (
              <div className="flex justify-between">
                <span className="text-muted-foreground/70 dark:text-slate-500">Duration:</span>
                <span className="font-mono text-foreground dark:text-slate-300">
                  {(run.durationMs / 1000).toFixed(2)}s
                </span>
              </div>
            )}
          </div>

          {/* Realtime Output Feedback (Green Container) */}
          {run?.output && (
            <div className="mt-1 flex flex-col gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-500/5 p-2 text-xs">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Output</span>
              <pre className="whitespace-pre-wrap font-mono text-[11px] text-emerald-800 dark:text-emerald-200 overflow-x-auto">
                {JSON.stringify(run.output, null, 2)}
              </pre>
            </div>
          )}

          {/* Realtime Error Feedback (Red Container) */}
          {(realtimeError || run?.error) && (
            <div className="mt-1 flex flex-col gap-1 rounded-lg border border-rose-500/20 bg-rose-500/10 dark:bg-rose-500/5 p-2 text-xs">
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
