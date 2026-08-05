"use client";

import { ReactNode } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ roomId, children }: { roomId: string, children: ReactNode }) {
    return (
        <LiveblocksProvider
            authEndpoint="/api/websockets/auth"
            throttle={20}
            resolveUsers={async ({ userIds }) => {
                try {
                    const response = await fetch("/api/websockets/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userIds }),
                    });
                    if (!response.ok) return undefined;
                    return await response.json();
                } catch {
                    return undefined;
                }
            }}
        >
            <RoomProvider id={roomId}>
                <ClientSideSuspense fallback={
                    <div className="flex min-h-svh items-center justify-center">
                        <ClimbingBoxLoader color="#8B5CF6" size={8} speedMultiplier={2} />
                    </div>
                }>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}