import { CascadeShell } from "@/features/cascades/components/cascade-shell"
import { Room } from "@/features/cascades/components/room"
import { getCascade } from "@/features/cascades/data"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { liveblocks } from "@/lib/liveblocks"

interface CascadePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CascadePage({ params }: CascadePageProps) {
  const { id } = await params
  const { orgId } = await auth()

  if (!orgId) notFound()

  const cascade = await getCascade(id, orgId)
  if (!cascade) notFound()

  await liveblocks.getOrCreateRoom(id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: {
      [orgId]: ["room:write"],
    },
    metadata: {
      title: cascade.name,
      date: cascade.updatedAt.toISOString()
    }
  })

  return (
    <Room roomId={id}>
      <CascadeShell cascadeId={id} />
    </Room>
  )
}
