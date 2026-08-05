"use server"

import { auth as clerkAuth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth as triggerAuth, tasks } from "@trigger.dev/sdk"

import { createCascade, deleteCascade } from "@/features/cascades/data"
import type { helloWorldTask } from "@/trigger/example"

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

  await deleteCascade({ id: cascadeId, orgId })

  revalidatePath("/cascades", "layout")
  redirect("/cascades")
}

export async function runCascadeAction(cascadeId: string) {
  const { orgId } = await clerkAuth()

  if (!orgId) {
    throw new Error("Unauthorized: Active organization required")
  }

  if (!cascadeId) {
    throw new Error("Invalid cascadeId: Cascade ID is required")
  }

  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    cascadeId,
  })

  const publicAccessToken = await triggerAuth.createPublicToken({
    scopes: { read: { runs: [handle.id] } },
  })

  return {
    runId: handle.id,
    publicAccessToken,
  }
}
