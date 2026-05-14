"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/clerk-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaProjectDiagram } from "react-icons/fa";
import { useTrace, useRenameTrace, useDeleteTrace } from "../hooks/useTrace";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, PencilLine, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const font = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const Navbar = ({ traceId }: { traceId: Id<"traces"> }) => {
    const traceName = useTrace(traceId);
    const renameTrace = useRenameTrace(traceId);
    const deleteTrace = useDeleteTrace();
    const router = useRouter();
    const [isRenaming, setIsRenaming] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [newName, setNewName] = useState("");
    
    const handleStartRenaming = () =>{
        if(!traceName) return;
        setNewName(traceName.name);
        setIsRenaming(true);
    }
  return (
    <nav className="flex justify-between items-center gap-x-2 p-2 bg-sidebar border-b">
      <div className="flex items-center gap-x-2">
        <Breadcrumb>
        <BreadcrumbList className="gap-0!">
          <BreadcrumbItem>
            <BreadcrumbLink
              className="flex items-center gap-1.5 group/logo"
              asChild
            >
              <Button variant="ghost" className="w-fit! p-1! h-7! ml-1">
                <Link href="/">
                <FaProjectDiagram className="size-5 text-primary" />
                <span className={cn("text-sm font-medium tracking-tight", font.className)}>Trace.ai</span>
                </Link>
              </Button>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="ml-0 mr-1"/>
          <BreadcrumbItem>
          {isRenaming? (
            <input autoFocus value={newName} onChange={(e) => setNewName(e.target.value)} 
            onFocus = {(e)=> e.currentTarget.select()} 
            onBlur={() => {
              if (newName.trim() !== "" && newName !== traceName?.name) {
                renameTrace({ traceId, newName: newName.trim() }).catch(()=>toast.error("Failed to rename"));
              }
              setIsRenaming(false);
            }} 
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                if (newName.trim() !== "" && newName !== traceName?.name) {
                  renameTrace({ traceId, newName: newName.trim() }).catch(()=>toast.error("Failed to rename"));
                }
                setIsRenaming(false);
              }
            }}
            className="text-sm bg-transparent text-foreground outline-none focus:ring-inset focus:ring-ring font-medium max-w-40 truncate"/>
          ): (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-x-1 cursor-pointer hover:bg-muted p-1 rounded-sm">
                  <BreadcrumbPage className="text-sm cursor-pointer hover:text-primary font-medium max-w-40 truncate">
                    {traceName?.name ?? "Loading.."}
                  </BreadcrumbPage>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={handleStartRenaming}>
                  <PencilLine className="mr-2 size-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onSelect={(e) => {
                    e.preventDefault();
                    setIsDeleteOpen(true);
                  }}
                >
                  <TrashIcon className="mr-2 size-4" />
                  Delete Trace
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the trace
                  "{traceName?.name}" and remove its data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => {
                    deleteTrace({ traceId }).then(() => {
                      toast.success("Trace deleted");
                      setIsDeleteOpen(false);
                      router.push("/");
                    }).catch((error) => {
                      toast.error("Failed to delete trace");
                    });
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-x-2">
        <UserButton/>
      </div>
    </nav>
  );
};
