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
import { useTrace } from "../hooks/useTrace";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";

const font = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const Navbar = ({ traceId }: { traceId: Id<"traces"> }) => {
    const traceName = useTrace(traceId);
    const renameTrace = useTrace(traceId);
    const [isRenaming, setIsRenaming] = useState(false);
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
            onBlur={() => setIsRenaming(false)} 
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                setIsRenaming(false);
              }
            }}
            className="text-sm bg-transparent text-foreground outline-none focus:ring-inset focus:ring-ring font-medium max-w-40 truncate"/>
          ): (          <BreadcrumbPage className="text-sm cursor-pointer hover:text-primary font-medium max-w-40 truncate">
          {traceName?.name ?? "Loading.."}
          </BreadcrumbPage>)}
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
