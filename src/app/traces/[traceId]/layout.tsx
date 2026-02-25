import { TraceIdLayout } from "@/modules/traces/components/trace-id-layout";
import { Id } from "../../../../convex/_generated/dataModel";

const Layout = async ({
    children, params
}: {children: React.ReactNode, params: Promise<{traceId: Id<"traces">}>}) => {
    const { traceId } = await params;
    return (
        <TraceIdLayout traceId={traceId}>
            {children}
        </TraceIdLayout>
    )
}

export default Layout;