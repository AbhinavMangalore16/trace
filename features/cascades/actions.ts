"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createCascade } from "@/features/cascades/data"

export async function createCascadeAction(input: string | { name: string }) {
  const name = typeof input === "string" ? input : input?.name

  const { orgId } = await auth()

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
