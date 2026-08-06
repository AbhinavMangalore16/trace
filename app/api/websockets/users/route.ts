import { auth, clerkClient } from "@clerk/nextjs/server"

export async function POST(request: Request) {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { userIds } = (await request.json()) as { userIds?: string[] }

  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return Response.json([])
  }

  const client = await clerkClient()
  const { data: memberships } = await client.organizations.getOrganizationMembershipList({
    organizationId: orgId,
    userId: userIds,
  })

  const userMap = new Map(
    memberships.map((m) => {
      const u = m.publicUserData
      const fullName = [u?.firstName, u?.lastName].filter(Boolean).join(" ")
      return [
        u?.userId ?? "",
        {
          name: fullName || u?.identifier || "Anonymous",
          avatar: u?.imageUrl ?? "",
        },
      ]
    })
  )

  const resolvedUsers = userIds.map((id) => userMap.get(id) ?? null)

  return Response.json(resolvedUsers)
}
