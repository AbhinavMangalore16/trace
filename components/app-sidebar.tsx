import { auth } from "@clerk/nextjs/server"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { createCascadeAction } from "@/features/cascades/actions"
import { Navigator } from "@/features/cascades/components/navigator"
import { listCascades } from "@/features/cascades/data"

export async function AppSidebar() {
  const { orgId } = await auth()
  const cascades = orgId ? await listCascades(orgId) : []

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="flex flex-row items-center justify-between p-3 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center">
        <div className="group-data-[collapsible=icon]:hidden">
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/choose-organization"
            afterSelectOrganizationUrl="/"
            afterLeaveOrganizationUrl="/"
            hidePersonal
            appearance={{
              elements: {
                rootBox: "flex items-center",
                organizationSwitcherTrigger:
                  "flex items-center gap-2 px-2 py-1 text-sm font-medium bg-transparent hover:bg-sidebar-accent text-sidebar-foreground rounded-md transition-colors",
              },
            }}
          />
        </div>
        <SidebarTrigger className="text-sidebar-foreground -translate-x-2 -translate-y-0.5 group-data-[collapsible=icon]:translate-x-0 group-data-[collapsible=icon]:translate-y-0 hover:bg-sidebar-accent" />
      </SidebarHeader>

      <SidebarContent className="px-1">
        <Navigator
          cascades={cascades}
          createCascadeAction={createCascadeAction}
        />
      </SidebarContent>

      <SidebarFooter className="p-3 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center">
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  )
}
