import { TraceFlow } from "@/modules/traces/components/trace-flow";

export default async function TracePage({
  params,
}: {
  params: Promise<{ traceId: string }>;
}) {
  const { traceId } = await params;

  return (
    <div className="flex-1 w-full relative">
      <TraceFlow traceId={traceId} />
    </div>
  );
}