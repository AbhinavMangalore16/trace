import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-3rem)] w-full items-center justify-center p-6">
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  )
}
