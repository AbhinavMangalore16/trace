"use client"

import * as React from "react"
import { useRealtimeRunsWithTag } from "@trigger.dev/react-hooks"
import type { runCascadeDomino, RunStep } from "@/features/cascades/tasks/run-cascade"

export type LatestRunStepsResult = {
    steps: RunStep[]
    isLive: boolean
    runId?: string
    status?: string
}

const CascadeRunsContext = React.createContext<LatestRunStepsResult>({
    steps: [],
    isLive: false,
})

export type CascadeRunsProviderProps = {
    cascadeId: string
    publicAccessToken: string
    children: React.ReactNode
}

const playAudioSound = (soundName: "domino" | "error-domino" | "success-domino") => {
    try {
        const audio = new Audio(`/sounds/${soundName}.mp3`)
        audio.volume = 0.5
        audio.play().catch(() => {
            // Browser autoplay policy catch block
        })
    } catch {
        // Ignore audio errors
    }
}

/**
 * Realtime provider subscribing to a cascade's runs by tag (`cascade:<id>`).
 * Provides run steps and live status to child canvas and editor components.
 */
export function CascadeRunsProvider({
    cascadeId,
    publicAccessToken,
    children,
}: CascadeRunsProviderProps) {
    const { runs } = useRealtimeRunsWithTag<typeof runCascadeDomino>(
        `cascade:${cascadeId}`,
        {
            accessToken: publicAccessToken,
            enabled: Boolean(cascadeId && publicAccessToken),
        }
    )

    const latestRunState = React.useMemo<LatestRunStepsResult>(() => {
        if (!runs || runs.length === 0) {
            return { steps: [], isLive: false }
        }

        // Sort runs by createdAt descending to ensure we get the latest run
        const sortedRuns = [...runs].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        const latestRun = sortedRuns[0]
        const status = latestRun.status
        const isTerminal = ["COMPLETED", "FAILED", "CRASHED", "CANCELED", "SYSTEM_FAILURE", "TIMED_OUT"].includes(status)
        const isLive = Boolean(status && !isTerminal)

        // Prefer final output steps, fall back to live metadata steps
        const output = latestRun.output as { runSteps?: RunStep[]; steps?: RunStep[] } | undefined
        const metadataSteps = latestRun.metadata?.steps as RunStep[] | undefined

        const finalOutputSteps = output?.runSteps ?? (Array.isArray(output?.steps) ? output.steps : undefined)
        const steps = finalOutputSteps ?? metadataSteps ?? []

        return {
            steps,
            isLive,
            runId: latestRun.id,
            status,
        }
    }, [runs])

    const prevStatusesRef = React.useRef<Map<string, string>>(new Map())
    const prevRunStatusRef = React.useRef<string | undefined>(undefined)

    React.useEffect(() => {
        if (!latestRunState.steps || latestRunState.steps.length === 0) {
            return
        }

        const prevStatuses = prevStatusesRef.current
        const nextStatuses = new Map<string, string>()

        let soundToPlay: "domino" | "error-domino" | "success-domino" | null = null

        for (const step of latestRunState.steps) {
            const prevStatus = prevStatuses.get(step.id)
            nextStatuses.set(step.id, step.status)

            if (prevStatus !== step.status) {
                if (step.status === "running") {
                    soundToPlay = "domino"
                } else if (step.status === "failed") {
                    soundToPlay = "error-domino"
                } else if (step.status === "done" && soundToPlay !== "error-domino") {
                    soundToPlay = "success-domino"
                }
            }
        }

        const currentRunStatus = latestRunState.status
        const prevRunStatus = prevRunStatusRef.current

        if (prevRunStatus !== currentRunStatus) {
            if (currentRunStatus === "FAILED" || currentRunStatus === "CRASHED") {
                soundToPlay = "error-domino"
            } else if (currentRunStatus === "COMPLETED" && soundToPlay !== "error-domino") {
                soundToPlay = "success-domino"
            }
        }

        if (soundToPlay) {
            playAudioSound(soundToPlay)
        }

        prevStatusesRef.current = nextStatuses
        prevRunStatusRef.current = currentRunStatus
    }, [latestRunState.steps, latestRunState.status])

    return (
        <CascadeRunsContext.Provider value={latestRunState}>
            {children}
        </CascadeRunsContext.Provider>
    )
}

/**
 * Hook to consume the latest run steps and live execution status.
 */
export function useLatestRunSteps(): LatestRunStepsResult {
    return React.useContext(CascadeRunsContext)
}
