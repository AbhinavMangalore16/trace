"use client"

import { Id } from "../../../../convex/_generated/dataModel"
import { Navbar } from "./navbar"

export const TraceIdLayout = async ({
    children, traceId
}: {children: React.ReactNode, traceId: Id<"traces">}) => {
    return (
        <div className="w-full h-screen flex flex-col">
            <Navbar traceId={traceId}/>
            {children}
        </div>
    )
}