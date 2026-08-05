import type { Node } from "@xyflow/react"
import { Globe, Play, type LucideIcon } from "lucide-react"

export type StepDominoKind = "trigger" | "action"

export type DominoField = {
    key: string
    label: string
    placeholder?: string
    multiline?: boolean
    required?: boolean
}


export type DominoDefinition = {
    type: string
    kind: StepDominoKind
    label: string
    icon: LucideIcon
    accent: string // Tailwind classes for the icon chip color
    fields: DominoField[]
}

export const DominoRegistry = {
    start: {
        type: "start",
        kind: "trigger",
        label: "Start",
        icon: Play,
        accent: "bg-purple-500 text-white",
        fields: [],
    },
    "open-url": {
        type: "open-url",
        kind: "action",
        label: "Open URL",
        icon: Globe,
        accent: "bg-blue-600 text-white",
        fields: [{ key: "url", label: "URL", placeholder: "https://youtube.com" }],
    },
} satisfies Record<string, DominoDefinition>

export type DominoType = keyof typeof DominoRegistry

export type StepDominoData = {
    type: DominoType
    kind: StepDominoKind
    title: string
    values: Record<string, string>
}

export type StepDominoType = Node<StepDominoData, "step">