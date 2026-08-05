import { db } from "@/db"
import { cascades, type Cascade, type CascadeGraph } from "@/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { graphDFSToposort } from "./utils/graph-dfs-toposort"

export function listCascades(orgId: string) {
  return db
    .select()
    .from(cascades)
    .where(eq(cascades.orgId, orgId))
    .orderBy(desc(cascades.createdAt))
}

export async function getCascade(
  opts: { id: string; orgId: string }
): Promise<Cascade | null>
export async function getCascade(
  id: string,
  orgId: string
): Promise<Cascade | null>
export async function getCascade(
  idOrOpts: string | { id: string; orgId: string },
  orgIdParam?: string
): Promise<Cascade | null> {
  const id = typeof idOrOpts === "string" ? idOrOpts : idOrOpts.id
  const orgId = typeof idOrOpts === "string" ? orgIdParam! : idOrOpts.orgId

  const [cascade] = await db
    .select()
    .from(cascades)
    .where(and(eq(cascades.id, id), eq(cascades.orgId, orgId)))

  return cascade ?? null
}

export const getCascadeById = getCascade

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

export async function persistCascadeGraph({
  id, orgId, graph
}: {
  id: string, orgId: string, graph: CascadeGraph
}) {
  const issues = graphDFSToposort(graph);
  if (issues.length > 0)
    throw new Error("Solve these errors: " + issues.join(", "))
  await db.update(cascades)
    .set({ graph, updatedAt: new Date() })
    .where(and(eq(cascades.id, id), eq(cascades.orgId, orgId)))
}