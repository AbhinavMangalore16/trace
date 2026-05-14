"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FaGithub } from "react-icons/fa";
import { AlertCircleIcon, ArrowRightIcon, Globe2Icon, MoreVertical, PencilLine, TrashIcon } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useTraceLimits, useDeleteTrace, useRenameTrace } from "../hooks/useTrace";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Kbd } from "@/components/ui/kbd";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface TracesListProps {
  onViewAllTraces: () => void;
}

const formatTimeAgo = (timestamp: number) =>
  formatDistanceToNow(new Date(timestamp), { addSuffix: true });

const getTraceIcon = (trace: Doc<"traces">) => {
  if (trace.importStatus === "Importing")
    return <Spinner className="size-4 text-ring" />;
  if (trace.importStatus === "Success")
    return <FaGithub className="size-4 text-ring" />;
  if (trace.importStatus === "Failure")
    return <AlertCircleIcon className="size-4 text-red-500" />;

  return <Globe2Icon className="size-4 text-green-500" />;
};

const TraceActions = ({ trace }: { trace: Doc<"traces"> }) => {
  const deleteTrace = useDeleteTrace();
  const renameTrace = useRenameTrace(trace._id);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newName, setNewName] = useState(trace.name);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity aria-expanded:opacity-100">
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsRenameOpen(true)}>
            <PencilLine className="mr-2 h-4 w-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            onSelect={(e) => {
              e.preventDefault();
              setIsDeleteOpen(true);
            }}
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the workspace
              "{trace.name}" and remove all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto mt-2 sm:mt-0"
              onClick={() => {
                deleteTrace({ traceId: trace._id }).then(() => {
                  toast.success("Trace deleted");
                  setIsDeleteOpen(false);
                }).catch(() => toast.error("Failed to delete trace"));
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Trace</DialogTitle>
          </DialogHeader>
          <Input 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
            onKeyDown={(e) => {
               if (e.key === "Enter") {
                  renameTrace({ traceId: trace._id, newName }).then(() => {
                    setIsRenameOpen(false);
                    toast.success("Trace renamed");
                  }).catch(() => toast.error("Failed to rename"));
               }
            }}
          />
          <DialogFooter>
             <Button variant="outline" onClick={() => setIsRenameOpen(false)}>Cancel</Button>
             <Button onClick={() => {
                  renameTrace({ traceId: trace._id, newName }).then(() => {
                    setIsRenameOpen(false);
                    toast.success("Trace renamed");
                  }).catch(() => toast.error("Failed to rename"));
             }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const TraceItem = ({ trace }: { trace: Doc<"traces"> }) => (
  <div className="flex items-center justify-between p-2 pl-4 pr-3 rounded-lg border hover:bg-accent/50 transition-colors group">
    <Link
      href={`/traces/${trace._id}`}
      className="flex items-center gap-2 truncate flex-1 py-2"
    >
      {getTraceIcon(trace)}
      <span className="truncate font-medium">{trace.name}</span>
    </Link>

    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {formatTimeAgo(trace.updatedAt)}
      </span>
      <TraceActions trace={trace} />
    </div>
  </div>
);

const LastRecentTrace = ({ data }: { data: Doc<"traces"> }) => (
  <div className="flex flex-col gap-2">
    <span className="text-xs text-muted-foreground">Last Edited</span>

    <div className="flex items-center justify-between bg-background hover:border-primary/50 hover:bg-accent/50 transition-all border-2 rounded-xl shadow-sm group p-2 pl-6 pr-4">
      <Link
        href={`/traces/${data._id}`}
        className="flex items-center justify-between w-full flex-1 py-4 mr-4"
      >
        <div className="flex items-center gap-3 truncate">
          {getTraceIcon(data)}
          <span className="font-medium truncate">{data.name}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
          {formatTimeAgo(data.updatedAt)}
          <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
      <TraceActions trace={data} />
    </div>
  </div>
);

export const TracesList = ({ onViewAllTraces }: TracesListProps) => {
  const traces = useTraceLimits(5);

  if (!traces) return <Spinner className="size-8 text-ring" />;
  if (traces.length === 0)
    return (
      <div className="text-sm text-muted-foreground">
        No traces yet.
      </div>
    );

  const [mostRecent, ...rest] = traces;

  return (
    <div className="flex flex-col gap-6">
      <LastRecentTrace data={mostRecent} />

      {rest.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-semibold tracking-tight">
              Recent Workspaces
            </h2>

            <button
              onClick={onViewAllTraces}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View All
              <Kbd className="bg-muted/50 text-muted-foreground border-none font-sans text-xs ml-2">
                ⌘ + K
              </Kbd>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {rest.map((trace) => (
              <TraceItem key={trace._id} trace={trace} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};