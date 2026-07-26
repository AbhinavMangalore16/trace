"use client"

import { Plus, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"

export default function DashboardPage() {
  const handleNewCascade = () => {
    toast.info("Click the + button next to Cascades in the sidebar to create a new cascade!")
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3rem)] w-full flex-col items-center justify-center p-6">
      <Empty className="max-w-md border-none p-0">
        <EmptyHeader className="max-w-sm gap-3">
          <EmptyMedia className="size-12 rounded-xl bg-secondary/80 text-foreground [&_svg]:size-6">
            <Layers className="size-6" />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold tracking-wide">
            No cascade selected
          </EmptyTitle>
          <EmptyDescription className="max-w-[280px] text-center text-sm/relaxed text-muted-foreground">
            Select a cascade from the sidebar or create a new one to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-3">
          <Button onClick={handleNewCascade} className="gap-2 font-medium">
            <Plus className="size-4" />
            New cascade
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
