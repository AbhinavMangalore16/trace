import { memo } from "react"
import { Handle, Position, useNodes, type NodeProps } from "@xyflow/react"
import { HashLoader } from "react-spinners"
import { CheckCircle2, XCircle } from "lucide-react"

import {
    DominoRegistry,
    type StepDominoType,
} from "@/features/cascades/dominos/domino-registry"
import { formatTokensForDisplay } from "@/features/cascades/utils"
import { useLatestRunSteps } from "./cascade-runs-provider"
import { cn } from "@/lib/utils"

function DominoStoneComponent({ id, data, selected }: NodeProps<StepDominoType>) {
    const nodes = useNodes()
    const { steps, isLive } = useLatestRunSteps()
    const currentStep = steps.find((s) => s.id === id)

    const { type, kind, title, values } = data
    const rawStatus = currentStep?.status || ((data as any).status as string | undefined)

    const isRunning = Boolean(isLive && rawStatus === "running")
    const isFailed = rawStatus === "failed"
    const isDone = rawStatus === "done"

    const def = DominoRegistry[type]
    const Icon = def?.icon
    const accent = def?.accent ?? "bg-muted text-muted-foreground"
    const fields = def?.fields ?? []
    const hasTarget = kind !== "trigger"

    return (
        <div
            className={cn(
                "min-w-50 max-w-80 rounded-(--radius) border-2 bg-card text-card-foreground transition-colors",
                isRunning && "border-purple-500 shadow-sm shadow-purple-500/20",
                isFailed && "border-destructive",
                !isRunning && !isFailed && "border-border",
                selected && "ring-2 ring-ring ring-offset-2 ring-offset-background"
            )}
        >
            {hasTarget && (
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ transform: "translate(-100%, -50%)" }}
                    className="h-3.5! w-1.5! min-w-0! rounded-l-xs! rounded-r-none! border-0! bg-border!"
                />
            )}

            <div className="flex items-center justify-between gap-2.5 px-3 py-2.5">
                <div className="flex items-center gap-2.5 truncate">
                    <div
                        className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-md transition-colors",
                            isRunning ? "bg-purple-500/15 text-purple-500" : accent
                        )}
                    >
                        {isRunning ? (
                            <HashLoader size={14} color="#a855f7" />
                        ) : (
                            Icon && <Icon className="size-4" />
                        )}
                    </div>
                    <span className="text-sm font-semibold truncate">{title || def?.label || type}</span>
                </div>

                <div className="flex items-center shrink-0 ml-auto">
                    {isDone && <CheckCircle2 className="size-4 text-emerald-500" />}
                    {isFailed && <XCircle className="size-4 text-destructive" />}
                </div>
            </div>

            {fields.length > 0 && (
                <div className="border-t border-border px-3 py-2 flex flex-col gap-1.5 bg-muted/30">
                    {def.fields.map((field) => {
                        const val = values?.[field.key]
                        const rawText = val || field.placeholder || "Not configured"
                        const displayText = val ? formatTokensForDisplay(val, nodes) : rawText
                        const isShort = displayText.length <= 16

                        if (isShort) {
                            return (
                                <div key={field.key} className="flex items-center justify-between gap-2 text-xs">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
                                        {field.label}
                                        {field.required && <span className="text-destructive font-bold ml-0.5">*</span>}
                                    </span>
                                    <span
                                        className={cn(
                                            "font-mono text-xs text-right truncate max-w-[140px]",
                                            val ? "text-foreground font-medium" : "text-muted-foreground/60 italic"
                                        )}
                                    >
                                        {displayText}
                                    </span>
                                </div>
                            )
                        }

                        return (
                            <div key={field.key} className="flex flex-col gap-0.5 text-xs">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    {field.label}
                                    {field.required && <span className="text-destructive font-bold ml-0.5">*</span>}
                                </span>
                                <span
                                    className={cn(
                                        "font-mono text-xs truncate",
                                        val ? "text-foreground font-medium" : "text-muted-foreground/60 italic"
                                    )}
                                >
                                    {displayText}
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}

            <Handle
                type="source"
                position={Position.Right}
                style={{ transform: "translate(100%, -50%)" }}
                className="h-3.5! w-1.5! min-w-0! rounded-l-none! rounded-r-xs! border-0! bg-border!"
            />
        </div>
    )
}

export const DominoStone = memo(DominoStoneComponent)