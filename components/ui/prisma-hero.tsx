"use client"

import * as React from "react"
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PrismaHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-b from-sidebar via-background to-background p-8 md:p-12 shadow-2xl">
      {/* Dynamic Background Gradients */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold text-teal-400 backdrop-blur-md">
          <Sparkles className="size-3.5" />
          <span>DominoFlow Engine v1.0</span>
        </div>

        {/* Title */}
        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Visual Automation with{" "}
          <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Cascades
          </span>{" "}
          &{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Dominos
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
          Build, orchestrate, and execute complex workflows without writing glue code. Powered by Neon Serverless Postgres and Clerk multi-tenancy.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="h-12 px-6 font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400">
            <Link href="/dashboard" className="flex items-center gap-2">
              Launch App
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-6 font-semibold border-border/80">
            <Link href="/sign-in" className="flex items-center gap-2">
              <Play className="size-4 fill-current" />
              Sign In
            </Link>
          </Button>
        </div>

        {/* Key Highlights */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-teal-400" />
            <span>Neon Serverless Postgres</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-teal-400" />
            <span>Clerk Auth & Orgs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-teal-400" />
            <span>Drizzle ORM JSONB Graphs</span>
          </div>
        </div>
      </div>
    </div>
  )
}
