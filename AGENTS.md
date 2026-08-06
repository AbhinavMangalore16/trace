<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:reactflow-agent-rules -->
# React Flow API and Component Rules

Do NOT rely on training data for React Flow (`@xyflow/react` / `reactflow`) APIs, components, hooks, types, or usage. Always fetch and read the live reference documentation from https://reactflow.dev/llms.txt before writing or modifying any React Flow code.
<!-- END:reactflow-agent-rules -->

# Database types

Derive database types from the Drizzle schema — never hand-write custom or partial shapes for table rows. Export typeof table.$inferSelect (and $inferInsert when needed) from lib/schema.ts and import it. When a consumer needs only some columns, narrow with Pick<Row, ...> / Omit<Row, ...> rather than redeclaring a literal type. Don't add an insert type where db.insert(...).values() already enforces the shape.
