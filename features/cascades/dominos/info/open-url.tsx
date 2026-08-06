import type { Stagehand } from "@browserbasehq/stagehand"

export async function openURL({ stagehand, url }: { stagehand: Stagehand, url: string }) {
    const page = stagehand.context.pages()[0];
    await page.goto(url, { waitUntil: "load", timeoutMs: 45000 })
    return { url: page.url(), title: await page.title() }
}