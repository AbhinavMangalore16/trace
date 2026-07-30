"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="relative flex min-h-[calc(100vh-3rem)] w-full flex-col items-center justify-center p-6">
      <Empty className="max-w-md border-none p-0">
        <EmptyHeader className="max-w-sm gap-3">
          <EmptyMedia className="size-12 rounded-xl bg-destructive/10 text-destructive [&_svg]:size-6">
            <AlertTriangle className="size-6" />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold tracking-wide">
            Something went wrong
          </EmptyTitle>
          <EmptyDescription className="max-w-[280px] text-center text-sm/relaxed text-muted-foreground">
            An unexpected error occurred while loading this cascade.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-3">
          <Button onClick={() => reset()} className="gap-2 font-medium">
            Try again
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
