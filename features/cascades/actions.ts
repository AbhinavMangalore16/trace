"use server"

import { auth as clerkAuth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth as triggerAuth, tasks, runs } from "@trigger.dev/sdk"

import type { CascadeGraph } from "@/db/schema"
import { createCascade, deleteCascade, persistCascadeGraph } from "@/features/cascades/data"
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

  if (!graph || !graph.nodes || graph.nodes.length === 0) {
    try {
      const storage = await liveblocks.getStorageDocument(cascadeId)
      const nodes = (storage.data?.nodes ?? []) as any
      const edges = (storage.data?.edges ?? []) as any
      graph = { nodes, edges }
    } catch (err) {
      console.error("Failed to fetch Liveblocks storage document:", err)
    }
  }

  if (graph && graph.nodes && graph.nodes.length > 0) {
    await persistCascadeGraph({
      id: cascadeId,
      orgId,
      graph,
    })
  }

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

  await runs.cancel(runId)
}
