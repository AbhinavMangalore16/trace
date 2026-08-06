import { auth as clerkAuth } from "@clerk/nextjs/server"
import { auth as triggerAuth } from "@trigger.dev/sdk"
import { notFound } from "next/navigation"

import { CascadeShell } from "@/features/cascades/components/cascade-shell"
import { CascadeRunsProvider } from "@/features/cascades/components/cascade-runs-provider"
import { Room } from "@/features/cascades/components/room"
import { getCascade } from "@/features/cascades/data"
import { liveblocks } from "@/lib/liveblocks"

interface CascadePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CascadePage({ params }: CascadePageProps) {
  const { id } = await params
  const { orgId } = await clerkAuth()

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

  const publicAccessToken = await triggerAuth.createPublicToken({
    scopes: {
      read: {
        tags: [`cascade:${id}`],
      },
    },
    expirationTime: "1h",
  })

  return (
    <Room roomId={id}>
      <CascadeRunsProvider cascadeId={id} publicAccessToken={publicAccessToken}>
        <CascadeShell cascadeId={id} />
      </CascadeRunsProvider>
    </Room>
  )
}

