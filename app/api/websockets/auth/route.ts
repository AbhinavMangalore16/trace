import { auth, currentUser } from "@clerk/nextjs/server"
import { liveblocks } from "@/lib/liveblocks"

export async function POST(request: Request) {
  const { userId, orgId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.id,
      groupIds: orgId ? [orgId] : [],
      organizationId: orgId
    },
    {
      userInfo: {
        name: user.fullName ?? user.firstName ?? "Anonymous",
        avatar: user.imageUrl,
      },
    }
  )

  return new Response(body, { status })
}
