"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

interface CascadeShellProps {
  cascadeId: string
}

export function CascadeShell({ cascadeId }: CascadeShellProps) {
  return (
    <div className="size-full bg-[#0B0813]">
      <ResizablePanelGroup orientation="horizontal" className="size-full">
        {/* Left Panel: Primary Column */}
        <ResizablePanel minSize="30rem">
          <ResizablePanelGroup orientation="vertical" className="size-full">
            {/* Top Panel: Canvas (#14111E) */}
            <ResizablePanel minSize="18rem">
              <div className="flex size-full items-center justify-center bg-[#14111E] p-4 text-sm font-medium text-slate-300 select-none">
                Canvas
              </div>
            </ResizablePanel>

            <ResizableHandle className="bg-[#2A243D] hover:bg-[#8B5CF6]/50 transition-colors" />

            {/* Bottom Panel: Logs (#09070F) */}
            <ResizablePanel defaultSize="8rem" minSize="6rem">
              <div className="flex size-full items-center justify-center bg-[#09070F] p-4 text-sm font-medium text-slate-400 select-none">
                Logs
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle className="bg-[#2A243D] hover:bg-[#8B5CF6]/50 transition-colors" />

        {/* Right Panel: Inspector (#0B0813) */}
        <ResizablePanel
          defaultSize="16rem"
          minSize="14rem"
          maxSize="36rem"
        >
          <div className="flex size-full items-center justify-center bg-[#0B0813] p-4 text-sm font-medium text-slate-300 select-none">
            Inspector
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
