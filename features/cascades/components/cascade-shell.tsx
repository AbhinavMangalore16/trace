"use client"

import * as React from "react"
import { LayoutGrid, Terminal, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { ReactFlowProvider } from "@xyflow/react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Canvas } from "@/features/cascades/components/canvas"
import { RightSidebar } from "@/features/cascades/components/right-sidebar"
import { Button } from "@/components/ui/button"

interface CascadeShellProps {
  cascadeId: string
}

export function CascadeShell({ cascadeId }: CascadeShellProps) {
  const isMobile = useIsMobile()
  const [mobileTab, setMobileTab] = React.useState<"canvas" | "logs" | "inspector">("canvas")

  return (
    <ReactFlowProvider>
      <div className="size-full flex flex-col bg-background text-foreground dark:bg-[#0B0813] overflow-hidden">
        {/* Mobile & Small Phone Workspace Layout (< 768px) */}
        {isMobile ? (
          <div className="flex size-full flex-col overflow-hidden">
            {/* Mobile Tab Navigation Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-card/50 p-2 dark:border-white/10 dark:bg-[#161224]/50">
              <div className="flex items-center gap-1 rounded-lg bg-muted p-1 dark:bg-white/5">
                <Button
                  variant={mobileTab === "canvas" ? "secondary" : "ghost"}
                  size="xs"
                  onClick={() => setMobileTab("canvas")}
                  className="gap-1 text-xs"
                >
                  <LayoutGrid className="size-3.5" />
                  <span>Canvas</span>
                </Button>
                <Button
                  variant={mobileTab === "logs" ? "secondary" : "ghost"}
                  size="xs"
                  onClick={() => setMobileTab("logs")}
                  className="gap-1 text-xs"
                >
                  <Terminal className="size-3.5" />
                  <span>Logs</span>
                </Button>
                <Button
                  variant={mobileTab === "inspector" ? "secondary" : "ghost"}
                  size="xs"
                  onClick={() => setMobileTab("inspector")}
                  className="gap-1 text-xs"
                >
                  <SlidersHorizontal className="size-3.5" />
                  <span>Inspector</span>
                </Button>
              </div>
            </div>

            {/* Active Mobile Panel View */}
            <div className="relative flex-1 overflow-hidden min-h-0 size-full">
              <div className={cn("size-full", mobileTab === "canvas" ? "block" : "hidden")}>
                <Canvas />
              </div>
              {mobileTab === "logs" && (
                <div className="flex size-full items-center justify-center bg-muted/30 p-4 text-sm font-medium text-muted-foreground select-none dark:bg-[#09070F] dark:text-slate-400">
                  Logs
                </div>
              )}
              <div className={cn("size-full", mobileTab === "inspector" ? "block" : "hidden")}>
                <RightSidebar cascadeId={cascadeId} />
              </div>
            </div>
          </div>
        ) : (
          /* Desktop & Laptop Resizable Split View (>= 768px) */
          <ResizablePanelGroup orientation="horizontal" className="size-full">
            {/* Left Panel: Primary Column */}
            <ResizablePanel minSize="20rem" defaultSize="70%">
              <ResizablePanelGroup orientation="vertical" className="size-full">
                {/* Top Panel: Canvas Component */}
                <ResizablePanel minSize="12rem" defaultSize="80%">
                  <Canvas />
                </ResizablePanel>

                <ResizableHandle className="bg-border hover:bg-primary/50 dark:bg-[#2A243D] dark:hover:bg-[#8B5CF6]/50 transition-colors" />

                {/* Bottom Panel: Logs */}
                <ResizablePanel defaultSize="20%" minSize="4rem">
                  <div className="flex size-full items-center justify-center bg-muted/30 text-muted-foreground dark:bg-[#09070F] dark:text-slate-400 p-4 text-sm font-medium select-none">
                    Logs
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle className="bg-border hover:bg-primary/50 dark:bg-[#2A243D] dark:hover:bg-[#8B5CF6]/50 transition-colors" />

            {/* Right Panel: RightSidebar / Inspector */}
            <ResizablePanel
              defaultSize="30%"
              minSize="12rem"
              maxSize="36rem"
            >
              <RightSidebar cascadeId={cascadeId} />
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </ReactFlowProvider>
  )
}
