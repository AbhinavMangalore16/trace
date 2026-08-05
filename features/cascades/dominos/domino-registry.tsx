import type { Node } from "@xyflow/react"
import {
    Play, Globe, Wand2, LayoutGrid, Eye, Bot, Mail,
    GitFork, Repeat, Camera, ArrowDown, ShieldCheck, Code2,
    Table, MessageSquare, Database, Download,
    type LucideIcon
} from "lucide-react"

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
    // --- TRIGGERS ---
    "start": {
        type: "start",
        kind: "trigger",
        label: "Start",
        icon: Play,
        accent: "bg-purple-500 text-white",
        fields: [],
    },

    // --- BROWSER / AI PRIMITIVES ---
    "open-url": {

        type: "open-url",

        kind: "action",

        label: "Open URL",

        icon: Globe,

        accent: "bg-blue-600 text-white",

        fields: [

            { key: "url", label: "URL", placeholder: "https://youtube.com", required: true },

            { key: "method", label: "Method", placeholder: "GET" },

            { key: "body", label: "Request Body", placeholder: '{\n  "key": "value"\n}', multiline: true }

        ],

    },
    "act": {
        type: "act",
        kind: "action",
        label: "Act",
        icon: Wand2,
        accent: "bg-purple-500 text-white",
        fields: [
            { key: "instruction", label: "Instruction", placeholder: "e.g., 'Click the login button'", multiline: true, required: true },
        ],
    },
    "extract": {
        type: "extract",
        kind: "action",
        label: "Extract",
        icon: LayoutGrid,
        accent: "bg-amber-500 text-white",
        fields: [
            { key: "instruction", label: "Instruction", placeholder: "e.g., 'Extract all pricing tiers'", multiline: true, required: true },
            { key: "schema", label: "JSON Schema (Optional)", placeholder: '{\n  "type": "object",\n  "properties": {...}\n}', multiline: true },
        ],
    },
    "observe": {
        type: "observe",
        kind: "action",
        label: "Observe",
        icon: Eye,
        accent: "bg-sky-500 text-white",
        fields: [
            { key: "instruction", label: "Instruction", placeholder: "e.g., 'Find all interactive elements'", multiline: true, required: true },
        ],
    },
    "agent": {
        type: "agent",
        kind: "action",
        label: "Agent",
        icon: Bot,
        accent: "bg-rose-500 text-white",
        fields: [
            { key: "instruction", label: "Autonomous Task", placeholder: "e.g., 'Find the cheapest flight to Tokyo'", multiline: true, required: true },
        ],
    },
    "scroll": {
        type: "scroll",
        kind: "action",
        label: "Scroll Page",
        icon: ArrowDown,
        accent: "bg-teal-500 text-white",
        fields: [
            { key: "direction", label: "Direction", placeholder: "down / up / bottom" },
            { key: "amount", label: "Pixels / Pages", placeholder: "e.g., '3 full pages' or '1000px'" }
        ],
    },
    "solve-captcha": {
        type: "solve-captcha",
        kind: "action",
        label: "Solve Captcha",
        icon: ShieldCheck,
        accent: "bg-red-500 text-white",
        fields: [
            { key: "provider", label: "Service / Model", placeholder: "browserbase-native / 2captcha" }
        ],
    },
    "screenshot": {
        type: "screenshot",
        kind: "action",
        label: "Take Screenshot",
        icon: Camera,
        accent: "bg-indigo-500 text-white",
        fields: [
            { key: "fullPage", label: "Full Page?", placeholder: "true/false" },
            { key: "storeAs", label: "Output Variable Name", placeholder: "page_snapshot" }
        ],
    },

    // --- CONTROL FLOW & LOGIC ---
    "if-condition": {
        type: "if-condition",
        kind: "action",
        label: "If / Condition",
        icon: GitFork,
        accent: "bg-yellow-500 text-white",
        fields: [
            { key: "condition", label: "Condition Expression", placeholder: "e.g., {{extract.items.length}} > 0", required: true }
        ],
    },
    "loop-items": {
        type: "loop-items",
        kind: "action",
        label: "Loop Items",
        icon: Repeat,
        accent: "bg-cyan-500 text-white",
        fields: [
            { key: "items", label: "Array Variable", placeholder: "{{extract.products}}", required: true }
        ],
    },
    "code-transform": {
        type: "code-transform",
        kind: "action",
        label: "Code JS",
        icon: Code2,
        accent: "bg-slate-700 text-white",
        fields: [
            { key: "code", label: "JavaScript Transformation", placeholder: "return data.map(item => item.price * 1.1);", multiline: true, required: true }
        ],
    },

    // --- DATA SINKS & INTEGRATIONS ---
    "google-sheets": {
        type: "google-sheets",
        kind: "action",
        label: "Google Sheets",
        icon: Table,
        accent: "bg-green-600 text-white",
        fields: [
            { key: "spreadsheetId", label: "Spreadsheet ID / URL", required: true },
            { key: "range", label: "Sheet Range", placeholder: "Sheet1!A1" },
            { key: "data", label: "Row Data (JSON)", placeholder: "{{extract.data}}", multiline: true, required: true }
        ],
    },
    "slack-notify": {
        type: "slack-notify",
        kind: "action",
        label: "Slack Message",
        icon: MessageSquare,
        accent: "bg-fuchsia-600 text-white",
        fields: [
            { key: "channel", label: "Channel ID / Webhook", required: true },
            { key: "message", label: "Message Text", placeholder: "Workflow extracted {{extract.count}} new leads!", multiline: true, required: true }
        ],
    },
    "webhook-out": {
        type: "webhook-out",
        kind: "action",
        label: "HTTP Request",
        icon: Database,
        accent: "bg-violet-600 text-white",
        fields: [
            { key: "url", label: "Endpoint URL", placeholder: "https://api.yourserver.com/v1/hook", required: true },
            { key: "method", label: "Method", placeholder: "POST" },
            { key: "body", label: "JSON Payload", placeholder: "{\n  \"data\": {{extract.result}}\n}", multiline: true }
        ],
    },
    "send-email": {
        type: "send-email",
        kind: "action",
        label: "Send Email",
        icon: Mail,
        accent: "bg-orange-500 text-white",
        fields: [
            { key: "to", label: "To", placeholder: "recipient@example.com", required: true },
            { key: "subject", label: "Subject", placeholder: "Workflow Completed", required: true },
            { key: "body", label: "Body", placeholder: "Email body content here...", multiline: true, required: true }
        ],
    },
    "download-file": {
        type: "download-file",
        kind: "action",
        label: "Download File",
        icon: Download,
        accent: "bg-blue-600 text-white",
        fields: [
            { key: "fileUrl", label: "File URL / Selector", placeholder: "e.g., 'a.pdf-download-link'", required: true },
            { key: "destination", label: "Storage Bucket / Path", placeholder: "s3://my-bucket/reports/" }
        ],
    }
} satisfies Record<string, DominoDefinition>

export type DominoType = keyof typeof DominoRegistry

export type StepDominoData = {
    type: DominoType
    kind: StepDominoKind
    title: string
    values: Record<string, string>
}

export type StepDominoType = Node<StepDominoData, "step">