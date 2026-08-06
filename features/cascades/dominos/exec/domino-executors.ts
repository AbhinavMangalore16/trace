import type { Stagehand } from "@browserbasehq/stagehand"
import type { ActionDominoType } from "../domino-registry"
import { openURL } from "../info/open-url"

export type DominoContext = {
    values: Record<string, string>
    getStagehand: () => Promise<Stagehand>
}

export type DominoExecutor = (ctx: DominoContext) => Promise<unknown>

export const DominoExecutors: Partial<Record<ActionDominoType, DominoExecutor>> = {
    "open-url": async ({ values, getStagehand }) =>
        openURL({ stagehand: await getStagehand(), url: values.url ?? "" }),

    // "act": async ({ values, getStagehand }) => {
    //     const stagehand = await getStagehand()
    //     const result = await stagehand.act(values.instruction ?? "")
    //     return { success: true, result }
    // },

    // "extract": async ({ values, getStagehand }) => {
    //     const stagehand = await getStagehand()
    //     const instruction = values.instruction ?? ""
    //     if (values.schema) {
    //         try {
    //             const schemaObj = JSON.parse(values.schema)
    //             const data = await stagehand.extract(instruction, schemaObj)
    //             return { data }
    //         } catch {
    //             // Ignore parse errors, fallback to unstructured extraction
    //         }
    //     }
    //     const data = await stagehand.extract(instruction)
    //     return { data }
    // },

    // "observe": async ({ values, getStagehand }) => {
    //     const stagehand = await getStagehand()
    //     const elements = await stagehand.observe(values.instruction ?? "")
    //     return { elements }
    // },

    // "agent": async ({ values, getStagehand }) => {
    //     const stagehand = await getStagehand()
    //     const agent = stagehand.agent({
    //         model: "google/gemini-2.5-flash",
    //     })
    //     const result = await agent.execute({
    //         instruction: values.instruction ?? "",
    //         maxSteps: 15,
    //     })
    //     return { result: result.message }
    // },

    // "screenshot": async ({ values, getStagehand }) => {
    //     const stagehand = await getStagehand()
    //     const page = stagehand.context.pages()[0]
    //     const buffer = await page.screenshot({ fullPage: values.fullPage === "true" })
    //     return { url: `data:image/png;base64,${buffer.toString("base64")}` }
    // },
}