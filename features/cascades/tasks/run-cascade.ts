import { logger, task } from "@trigger.dev/sdk"
import toposort from "toposort"
import { getCascade } from "../data"
export const runCascadeDomino = task({
    id: "run-cascade-domino",
    run: async ({ cascadeId, orgId }: { cascadeId: string, orgId: string }) => {
        const workflow = await getCascade({ id: cascadeId, orgId })
        if (!workflow?.graph) throw new Error(`Cascade ${cascadeId} has no graph data.`)
        const { nodes, edges } = workflow.graph
        const arr = new Map(nodes.map((n) => [n.id, n]))
        const conn = new Set(edges.flatMap((e) => [e.source, e.target]))
        const order = toposort.array(nodes.map((n) => n.id), edges.map((e) => [e.source, e.target]))
            .filter((id) => conn.has(id))
        logger.log(`Running cascade: ${cascadeId}, Order: ${order.join(" -> ")}`, { steps: order.length })
        for (const id of order) {
            const node = arr.get(id);
            logger.log(`Executing: ${node?.data?.title || node?.id}`);
        }
        return { steps: order.length }
    }
})