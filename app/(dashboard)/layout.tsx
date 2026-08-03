import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex h-svh w-full flex-col overflow-hidden">
        <header className="flex h-12 shrink-0 items-center justify-between border-b border-border px-3 md:hidden">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <span className="text-sm font-semibold tracking-tight text-foreground">
              DominoFlow
            </span>
          </div>
        </header>
        <div className="flex-1 overflow-hidden min-h-0 size-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
