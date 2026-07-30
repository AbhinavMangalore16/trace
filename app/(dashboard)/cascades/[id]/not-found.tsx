import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-3rem)] w-full flex-col items-center justify-center p-6">
      <Empty className="max-w-md border-none p-0">
        <EmptyHeader className="max-w-sm gap-3">
          <EmptyMedia className="size-12 rounded-xl bg-secondary/80 text-foreground [&_svg]:size-6">
            <FileQuestion className="size-6" />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold tracking-wide">
            Cascade not found
          </EmptyTitle>
          <EmptyDescription className="max-w-[280px] text-center text-sm/relaxed text-muted-foreground">
            The cascade you are looking for does not exist or has been deleted.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-3">
          <Button asChild className="gap-2 font-medium">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
