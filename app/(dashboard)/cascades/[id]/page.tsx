import { CascadeShell } from "@/features/cascades/components/cascade-shell"

interface CascadePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CascadePage({ params }: CascadePageProps) {
  const { id } = await params

  return <CascadeShell cascadeId={id} />
}
