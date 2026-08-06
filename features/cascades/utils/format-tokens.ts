import { DominoRegistry, type DominoType } from "../dominos/domino-registry"

/**
 * Replaces raw {{ nodeId.path }} placeholders with human-friendly {{ NodeTitle · OutputLabel }}
 * strings for UI display purposes.
 */
export function formatTokensForDisplay(
    text: string,
    nodes: Array<{ id: string; data?: any }>
): string {
    if (!text || typeof text !== "string") return text ?? ""

    const nodeMap = new Map<string, { title?: string; type?: string }>()
    for (const n of nodes) {
        if (n && n.id) {
            nodeMap.set(n.id, {
                title: n.data?.title,
                type: n.data?.type,
            })
        }
    }

    return text.replace(/\{\{\s*([^}\s]+)\s*\}\}/g, (match, rawPath) => {
        const parts = rawPath.split(".")
        const nodeId = parts[0]
        const path = parts.slice(1).join(".")

        const targetNode = nodeMap.get(nodeId)
        if (!targetNode) return match // Return original match if node ID not in graph

        const def = targetNode.type ? DominoRegistry[targetNode.type as DominoType] : undefined
        const nodeTitle = targetNode.title || def?.label || nodeId

        if (!path) return `{{ ${nodeTitle} }}`

        const outputDef = def?.outputs?.find((o) => o.path === path)
        const outputLabel = outputDef?.label || path

        return `{{ ${nodeTitle} · ${outputLabel} }}`
    })
}
