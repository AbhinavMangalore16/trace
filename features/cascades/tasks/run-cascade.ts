import { logger, task, metadata } from "@trigger.dev/sdk"
import toposort from "toposort"
import { getCascade } from "../data"
import { Stagehand } from "@browserbasehq/stagehand"
import { DominoExecutors } from "../dominos/exec/domino-executors"
import type { ActionDominoType } from "../dominos/domino-registry"
import { interpolate } from "../utils/interpolate"

export type RunStep = {
    id: string
    status: "pending" | "running" | "done" | "failed"
}

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

        let stagehand: Stagehand | undefined
        const getStagehand = async () => {
            if (stagehand) return stagehand
            stagehand = new Stagehand({
                env: "BROWSERBASE",
                apiKey: process.env.SCRAPING_API_KEY!,
                model: "google/gemini-2.5-flash",
                disablePino: true
            })
            await stagehand.init()
            return stagehand
        }
        const executedStepKeys = new Set<string>()
        const nodeOutputs: Record<string, unknown> = {}

        const steps: RunStep[] = order.map((id) => ({ id, status: "pending" }))
        metadata.set("steps", steps)
        await metadata.flush()

        for (const id of order) {
            const node = arr.get(id);
            const stepKey = `${runId}:${id}`

            if (executedStepKeys.has(stepKey)) {
                logger.log(`Skipping previously executed step: ${stepKey} (${node?.data?.title || id})`)
                continue
            }

            const nodeType = node?.data?.type as ActionDominoType | undefined
            if (!nodeType) continue

            const step = steps.find((s) => s.id === id)
            if (step) {
                step.status = "running"
                metadata.set("steps", steps)
                await metadata.flush()
            }

            const rawValues: Record<string, string> = node?.data?.values ?? {}
            const interpolatedValues: Record<string, string> = {}
            for (const [key, val] of Object.entries(rawValues)) {
                interpolatedValues[key] = interpolate(val, nodeOutputs)
            }

            const executor = DominoExecutors[nodeType]
            if (executor) {
                try {
                    const result = await executor({ values: interpolatedValues, getStagehand })
                    nodeOutputs[id] = result
                    if (step) {
                        step.status = "done"
                        metadata.set("steps", steps)
                    }
                } catch (error) {
                    if (step) {
                        step.status = "failed"
                        metadata.set("steps", steps)
                        await metadata.flush()
                    }
                    await stagehand?.close()
                    throw error
                }
            } else {
                if (step) {
                    step.status = "done"
                    metadata.set("steps", steps)
                }
            }

            logger.log(`Executing step ${stepKey}: ${node?.data?.title || node?.id}`)
            executedStepKeys.add(stepKey)
        }
        await stagehand?.close()
        return { steps: order.length, runId, outputs: nodeOutputs, runSteps: steps }
    }
})
