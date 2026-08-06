import { logger, task } from "@trigger.dev/sdk"
import toposort from "toposort"
import { getCascade } from "../data"
export const runCascadeDomino = task({
    id: "run-cascade-domino",
    run: async ({ cascadeId, orgId }: { cascadeId: string, orgId: string }, { ctx }) => {
        const workflow = await getCascade({ id: cascadeId, orgId })
        if (!workflow?.graph) throw new Error(`Cascade ${cascadeId} has no graph data.`)
        const { nodes, edges } = workflow.graph
        const arr = new Map(nodes.map((n) => [n.id, n]))
        const conn = new Set(edges.flatMap((e) => [e.source, e.target]))
        const order = toposort.array(nodes.map((n) => n.id), edges.map((e) => [e.source, e.target]))
            .filter((id) => conn.has(id))

        const runId = ctx.run.id
        logger.log(`Running cascade: ${cascadeId} (Run: ${runId}), Order: ${order.join(" -> ")}`, { steps: order.length })

        const executedStepKeys = new Set<string>()

        for (const id of order) {
            const node = arr.get(id);
            const stepKey = `${runId}:${id}`

            if (executedStepKeys.has(stepKey)) {
                logger.log(`Skipping previously executed step: ${stepKey} (${node?.data?.title || id})`)
                continue
            }

            logger.log(`Executing step ${stepKey}: ${node?.data?.title || node?.id}`)
            executedStepKeys.add(stepKey)
        }
        return { steps: order.length, runId }
    }
})