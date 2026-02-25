export default async function TracePage({
  params,
}: {
  params: { traceId: string };
}) {
  return (
    <div>
      {params.traceId}
    </div>
  );
}