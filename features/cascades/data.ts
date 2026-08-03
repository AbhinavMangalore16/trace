import { db } from "@/db"
import { cascades, type Cascade } from "@/db/schema"
import { and, desc, eq } from "drizzle-orm"

export function listCascades(orgId: string) {
  return db
    .select()
    .from(cascades)
    .where(eq(cascades.orgId, orgId))
    .orderBy(desc(cascades.createdAt))
}

export async function getCascadeById({
  id,
  orgId,
}: {
  id: string
  orgId: string
}) {
  const [cascade] = await db
    .select()
    .from(cascades)
    .where(and(eq(cascades.id, id), eq(cascades.orgId, orgId)))

  return cascade ?? null
}

export const getCascade = getCascadeById

export async function createCascade({
  orgId,
  name,
}: {
  orgId: string
  name: string
}) {
  const [created] = await db
    .insert(cascades)
    .values({
      orgId,
      name,
    })
    .returning()

  return created
}

export async function updateCascade({
  id,
  orgId,
  data,
}: {
  id: string
  orgId: string
  data: Partial<Pick<Cascade, "name" | "graph">>
}) {
  const [updated] = await db
    .update(cascades)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(cascades.id, id), eq(cascades.orgId, orgId)))
    .returning()

  return updated ?? null
}

export async function deleteCascade({
  id,
  orgId,
}: {
  id: string
  orgId: string
}) {
  const [deleted] = await db
    .delete(cascades)
    .where(and(eq(cascades.id, id), eq(cascades.orgId, orgId)))
    .returning()

  return deleted ?? null
}