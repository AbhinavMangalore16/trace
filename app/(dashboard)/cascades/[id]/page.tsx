import { CascadeShell } from "@/features/cascades/components/cascade-shell"
import { Room } from "@/features/cascades/components/room"

interface CascadePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CascadePage({ params }: CascadePageProps) {
  const { id } = await params

  return <Room roomId= {id}><CascadeShell cascadeId={id} /></Room>
}
