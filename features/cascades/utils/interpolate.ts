/**
 * Resolves a dot/bracket notation path on an object.
 * e.g., "someNodeId.title" or "someNodeId.items[0].name"
 */
export function getByPath(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== "object") {
    return undefined
  }

  const normalizedPath = path.trim().replace(/\[\s*['"]?(.*?)['"]?\s*\]/g, ".$1")
  const keys = normalizedPath.split(".").filter((key) => key.length > 0)

  let current: any = obj
  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined
    }
    current = current[key]
  }

  return current
}

/**
 * Replaces {{ nodeId.path }} placeholders in a text template using node outputs keyed by node ID.
 *
 * - If a placeholder resolves to undefined or null, it is replaced with an empty string.
 * - If it resolves to an object or array, it drops in the JSON representation.
 * - Resolves nested paths like {{ node1.title }} or {{ node1.items[0].name }}.
 */
export function interpolate(
  text: string,
  outputs: Record<string, unknown>
): string {
  if (!text || typeof text !== "string") {
    return text ?? ""
  }

  return text.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, rawPath) => {
    const path = rawPath.trim()
    if (!path) return ""

    const val = getByPath(outputs, path)

    if (val === undefined || val === null) {
      return ""
    }

    if (typeof val === "object") {
      try {
        return JSON.stringify(val)
      } catch {
        return ""
      }
    }

    return String(val)
  })
}
