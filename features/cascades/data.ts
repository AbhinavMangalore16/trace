import { db } from "@/db"
import { cascades } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export function listCascades(orgId: string) {
  return db
    .select()
    .from(cascades)
    .where(eq(cascades.orgId, orgId))
    .orderBy(desc(cascades.createdAt))
}

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