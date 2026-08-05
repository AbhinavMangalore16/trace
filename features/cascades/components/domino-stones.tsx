import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"

import {
    DominoRegistry,
    type StepDominoType,
} from "@/features/cascades/dominos/domino-registry"
import { cn } from "@/lib/utils"

function DominoStoneComponent({ data, selected }: NodeProps<StepDominoType>) {
    const { type, kind, title, values } = data
    const def = DominoRegistry[type]
    const Icon = def.icon
    const hasTarget = kind !== "trigger"

    return (
        <div
            className={cn(
                "min-w-50 max-w-80 rounded-(--radius) border-2 border-border bg-card text-card-foreground",
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

            <div className="flex items-center gap-2.5 px-3 py-2.5">
                <div
                    className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-md",
                        def.accent
                    )}
                >
                    <Icon className="size-4" />
                </div>
                <span className="text-sm font-semibold truncate">{title}</span>
            </div>

            {def.fields && def.fields.length > 0 && (
                <div className="border-t border-border px-3 py-2 flex flex-col gap-1.5 bg-muted/30">
                    {def.fields.map((field) => {
                        const val = values?.[field.key]
                        const displayText = val || field.placeholder || "Not configured"
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