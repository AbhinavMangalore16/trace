"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ roomId, children }: { roomId: string, children: ReactNode }) {
    return (
        <LiveblocksProvider throttle={20} publicApiKey={"pk_dev_VwRM1RUE_YJt5mk7WJRsOutQZ_jVIE3Y5hB3zb2mUGRQUdYTdCY2UDb1RF1m0qX2"}>
            <RoomProvider id={roomId}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}