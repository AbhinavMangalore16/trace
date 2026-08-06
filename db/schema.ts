import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import type { Edge, Node } from "@xyflow/react"
import type { StepDominoType } from "@/features/cascades/dominos/domino-registry"

export type CascadeGraph = {
  nodes: StepDominoType[]
  edges: Edge[]
}

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user_id
  email: text("email").notNull(),
  name: text("name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type User = typeof users.$inferSelect

export const cascades = pgTable("cascades", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: text("org_id").notNull(),
  name: text("name").notNull(),
  graph: jsonb("graph").$type<CascadeGraph>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Cascade = typeof cascades.$inferSelect
