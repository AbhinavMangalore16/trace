"use server"

import { auth as clerkAuth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth as triggerAuth, tasks, runs } from "@trigger.dev/sdk"

import type { CascadeGraph } from "@/db/schema"
import { createCascade, deleteCascade, getCascade, persistCascadeGraph } from "@/features/cascades/data"
import { liveblocks } from "@/lib/liveblocks"
import { runCascadeDomino } from "./tasks/run-cascade"

export async function createCascadeAction(input: string | { name: string }) {
  const name = typeof input === "string" ? input : input?.name

  const { orgId } = await clerkAuth()

  if (!orgId) {
    throw new Error("Unauthorized: Active organization required")
  }

  if (!name || typeof name !== "string") {
    throw new Error("Invalid name: Name is required")
  }

  const created = await createCascade({ orgId, name })

  revalidatePath("/cascades", "layout")
  redirect(`/cascades/${created.id}`)
}

export async function deleteCascadeAction(cascadeId: string) {
  const { orgId } = await clerkAuth()

  if (!orgId) {
    throw new Error("Unauthorized: Active organization required")
  }

  if (!cascadeId) {
    throw new Error("Invalid cascadeId: Cascade ID is required")
  }

  try {
    await liveblocks.deleteRoom(cascadeId)
  } catch (error) {
    console.error("Failed to delete Liveblocks room:", error)
  }

  await deleteCascade({ id: cascadeId, orgId })

  revalidatePath("/cascades", "layout")
  redirect("/")
}

export async function runCascadeAction(cascadeId: string, inputGraph?: CascadeGraph) {
  const { orgId } = await clerkAuth()

  if (!orgId) {
    throw new Error("Unauthorized: Active organization required")
  }

  if (!cascadeId) {
    throw new Error("Invalid cascadeId: Cascade ID is required")
  }

  let graph = inputGraph

  if (inputGraph === undefined) {
    try {
      const storage = await liveblocks.getStorageDocument(cascadeId)
      const data = storage.data as { nodes?: unknown[]; edges?: unknown[] } | undefined
      const nodes = Array.isArray(data?.nodes) ? data.nodes : []
      const edges = Array.isArray(data?.edges) ? data.edges : []
      graph = { nodes: nodes as any, edges: edges as any }
    } catch (err) {
      console.error("Failed to fetch Liveblocks storage document:", err)
    }
  }

  if (!graph || !Array.isArray(graph.nodes) || graph.nodes.length === 0) {
    throw new Error("Cannot run cascade: Graph is empty or contains no nodes")
  }

  await persistCascadeGraph({
    id: cascadeId,
    orgId,
    graph,
  })

  const handle = await tasks.trigger<typeof runCascadeDomino>(
    "run-cascade-domino",
    { cascadeId, orgId },
    { tags: [`workflow:${cascadeId}`] }
  )

  const publicAccessToken = await triggerAuth.createPublicToken({
    scopes: { read: { runs: [handle.id] } },
  })

  return {
    runId: handle.id,
    publicAccessToken,
  }
}

export async function cancelCascadeRunAction(runId: string) {
  const { orgId } = await clerkAuth()

  if (!orgId) {
    throw new Error("Unauthorized: Active organization required")
  }

  if (!runId) {
    throw new Error("Invalid runId: Run ID is required")
  }

  const run = await runs.retrieve(runId)
  const payloadOrgId = (run?.payload as { orgId?: string } | undefined)?.orgId
  const cascadeId = (run?.payload as { cascadeId?: string } | undefined)?.cascadeId

  if (payloadOrgId && payloadOrgId !== orgId) {
    throw new Error("Unauthorized: Run does not belong to the active organization")
  }

  if (cascadeId) {
    const cascade = await getCascade({ id: cascadeId, orgId })
    if (!cascade) {
      throw new Error("Unauthorized: Cascade does not belong to the active organization")
    }
  }

  await runs.cancel(runId)
}
