"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus, Layers, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { Cascade } from "@/db/schema"
import { generateCascadeSlug } from "@/features/cascades/utils"
import { cn } from "@/lib/utils"

interface NavigatorProps {
  cascades: Pick<Cascade, "id" | "name">[]
  createCascadeAction: (input: string | { name: string }) => Promise<void>
}

export function Navigator({ cascades, createCascadeAction }: NavigatorProps) {
  const [isPending, startTransition] = React.useTransition()
  const pathname = usePathname()

  const handleCreateCascade = () => {
    const name = generateCascadeSlug()
    startTransition(async () => {
      try {
        await createCascadeAction(name)
      } catch (err) {
        toast.error("Failed to create cascade")
      }
    })
  }

  return (
    <>
      {/* Collapsed Icon Mode */}
      <SidebarGroup className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2 transition-all duration-300 ease-in-out">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton
                    tooltip={`Cascades (${cascades.length})`}
                    className="flex flex-col items-center justify-center gap-0.5 h-10 w-9 rounded-md p-1 transition-all duration-300"
                  >
                    <Layers className="size-4 shrink-0" />
                    <span className="text-[10px] font-semibold leading-none text-sidebar-foreground/75 select-none">
                      {cascades.length}
                    </span>
                    <span className="sr-only">Cascades ({cascades.length})</span>
                  </SidebarMenuButton>
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  align="start"
                  sideOffset={8}
                  className="w-64 p-2 bg-sidebar border border-sidebar-border text-sidebar-foreground shadow-md"
                >
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      disabled={isPending}
                      onClick={handleCreateCascade}
                      className="justify-start gap-2 h-9 px-3 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      {isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Plus className="size-4" />
                      )}
                      <span>New cascade</span>
                    </Button>
                    <Separator className="my-1 bg-sidebar-border" />
                    <div className="flex flex-col gap-0.5 max-h-64 overflow-y-auto">
                      {cascades.map((item) => {
                        const isActive = pathname === `/cascades/${item.id}`
                        return (
                          <Button
                            key={item.id}
                            variant="ghost"
                            asChild
                            className={cn(
                              "justify-start h-9 px-3 text-sm truncate font-normal text-sidebar-foreground hover:bg-sidebar-accent/50",
                              isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            )}
                          >
                            <Link href={`/cascades/${item.id}`} className="truncate">
                              {item.name}
                            </Link>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Expanded Mode */}
      <SidebarGroup className="group-data-[collapsible=icon]:hidden transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between px-2 py-1.5 text-sm font-medium text-sidebar-foreground/70">
          <span>Cascades</span>
          <Button
            variant="ghost"
            size="icon-xs"
            disabled={isPending}
            onClick={handleCreateCascade}
            className="size-6 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 hover:scale-105"
            title="Create a new cascade"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plus className="size-4" />
            )}
            <span className="sr-only">Create a new cascade</span>
          </Button>
        </div>
        <SidebarGroupContent className="mt-1">
          <SidebarMenu>
            {cascades.map((item) => {
              const isActive = pathname === `/cascades/${item.id}`
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="h-9 rounded-md px-3 text-sm transition-all duration-200 font-normal text-sidebar-foreground hover:bg-sidebar-accent/50"
                  >
                    <Link href={`/cascades/${item.id}`} className="truncate">
                      {item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
