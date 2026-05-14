import { Button } from "@/components/ui/button";
import { TracesList } from "./traces-list";
import { useCreateTrace } from "../hooks/useTrace";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Terminal, Workflow } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { FaGithub, FaProjectDiagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TracesCommandDialog } from "../ui/trace-command-dialog";
import { UserButton } from "@clerk/nextjs";

const font = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const TraceView = () => {
  const createTrace = useCreateTrace();
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);

  const handleCreateTrace = () => {
    const traceName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: "-",
      length: 3,
    });
    createTrace({ name: traceName });
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandDialogOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <TracesCommandDialog
        open={commandDialogOpen}
        onOpenChange={setCommandDialogOpen}
      />

      <div className="relative min-h-screen bg-background flex flex-col items-center pt-24 p-6 md:p-16 overflow-hidden selection:bg-primary/20">
        <div className="absolute right-6 top-6 md:right-8 md:top-8 z-20">
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Ambient Background Grid (Matches Landing Page) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col gap-12">
          {/* Header Section */}
          <div className="flex flex-col gap-4 w-full items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 w-full justify-center group/logo mb-2">
              <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 shadow-inner">
                <FaProjectDiagram className="size-5 text-primary" />
              </div>
              <h1
                className={cn(
                  "text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent",
                  font.className,
                )}
              >
                Trace.ai
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-xl">
              The agentic IDE built to orchestrate, code, and execute. Outpacing
              the industry standard.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
            <Button
              variant="outline"
              onClick={handleCreateTrace}
              className="h-auto items-start p-6 bg-background/80 backdrop-blur-sm hover:border-primary/50 hover:bg-accent/30 transition-all duration-300 border-2 flex flex-col gap-5 rounded-2xl shadow-sm hover:shadow-md group"
            >
              <div className="flex items-center justify-between w-full">
                <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Terminal className="size-5 text-primary" />
                </div>
                <Kbd className="bg-muted/50 text-muted-foreground border-none font-sans text-xs">
                  ⌘ + N
                </Kbd>
              </div>
              <div className="flex flex-col items-start gap-1.5">
                <span className="text-lg font-semibold tracking-tight">
                  Initialize AI Workspace
                </span>
                <span className="text-sm text-muted-foreground font-normal whitespace-normal text-left leading-relaxed">
                  Fire up the agentic engine. Multi-file editing, intelligent
                  code generation, and seamless workflow execution.
                </span>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={handleCreateTrace}
              className="h-auto items-start p-6 bg-background/80 backdrop-blur-sm hover:border-foreground/30 hover:bg-accent/30 transition-all duration-300 border-2 flex flex-col gap-5 rounded-2xl shadow-sm hover:shadow-md group"
            >
              <div className="flex items-center justify-between w-full">
                <div className="p-2.5 bg-secondary rounded-xl group-hover:bg-secondary/80 transition-colors border">
                  <FaGithub className="size-5" />
                </div>
                <Kbd className="bg-muted/50 text-muted-foreground border-none font-sans text-xs">
                  ⌘ + I
                </Kbd>
              </div>
              <div className="flex flex-col items-start gap-1.5">
                <span className="text-lg font-semibold tracking-tight">
                  Clone & Analyze Repo
                </span>
                <span className="text-sm text-muted-foreground font-normal whitespace-normal text-left leading-relaxed">
                  Import your codebase. Let the agents refactor, debug, and
                  execute across your entire architecture.
                </span>
              </div>
            </Button>
          </div>

          {/* Recent Workflows */}
          <div className="animate-in fade-in duration-1000 delay-300 fill-mode-both">
            <TracesList onViewAllTraces={() => setCommandDialogOpen(true)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TraceView;
