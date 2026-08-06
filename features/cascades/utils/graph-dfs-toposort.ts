import toposort from "toposort"

import type { CascadeGraph } from "@/db/schema"

export function graphDFSToposort({ nodes, edges }: CascadeGraph): string[] {
    const problems: string[] = []
    const nodeIds = new Set(nodes.map((n) => n.id))

    const triggers = nodes.filter((n) => n.data?.kind === "trigger")
    if (triggers.length !== 1) {
        problems.push(`A workflow needs exactly one Start trigger (found ${triggers.length}).`)
    }

    // Check for dangling edges whose source or target node is missing from nodes
    const hasDanglingEdge = edges.some(
        (e) => !nodeIds.has(e.source) || !nodeIds.has(e.target)
    )
    if (hasDanglingEdge) {
        problems.push("Workflow contains edges pointing to missing or non-existent nodes.")
    }

    // The runner only executes nodes touching an edge, so with none Run is a no-op.
    if (edges.length === 0) {
        problems.push("Connect your nodes before running.")
    } else {
        try {
            // toposort throws on a cycle — the run would otherwise fail mid-sort.
            toposort(edges.map((e) => [e.source, e.target]))
        } catch {
            problems.push("Workflow has a cycle — remove the loop before running.")
        }
    }

    // Verify all nodes are reachable from the single Start trigger node
    if (triggers.length === 1 && !hasDanglingEdge && nodes.length > 0) {
        const startNodeId = triggers[0].id
        const adj = new Map<string, string[]>()
        for (const e of edges) {
            if (!adj.has(e.source)) adj.set(e.source, [])
            adj.get(e.source)!.push(e.target)
        }

        const visited = new Set<string>()
        const queue = [startNodeId]
        visited.add(startNodeId)

        while (queue.length > 0) {
            const current = queue.shift()!
            const neighbors = adj.get(current) ?? []
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor)
                    queue.push(neighbor)
                }
            }
        }

        if (visited.size < nodes.length) {
            problems.push("All nodes in the workflow must be reachable from the Start trigger.")
        }
    }

    return problems
}