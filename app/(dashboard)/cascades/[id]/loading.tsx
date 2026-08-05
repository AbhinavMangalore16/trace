
import { ClimbingBoxLoader } from "react-spinners"

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-3rem)] w-full items-center justify-center p-6">
      <ClimbingBoxLoader color="hsl(--primary)" size={8} speedMultiplier={2} />
    </div>
  )
}
