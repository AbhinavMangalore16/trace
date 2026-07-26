"use client"

import * as React from "react"
import Link from "next/link"
import { useAuth, UserButton } from "@clerk/nextjs"
import {
  Laptop,
  Sparkles,
  Zap,
  Wand2,
  MessageSquare,
  RefreshCw,
  ChevronDown,
  Square,
  Command,
  CornerDownLeft,
  ShieldCheck,
  ArrowRight,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CluelyLandingPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const [activeTab, setActiveTab] = React.useState<"assist" | "say" | "questions">("say")
  const [inputText, setInputText] = React.useState("")

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600/30 selection:text-blue-400 font-sans transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-md shadow-blue-500/20">
                <Zap className="size-4 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                DominoFlow <span className="text-xs font-normal text-blue-400 font-mono">Cluely AI</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 text-sm font-medium text-slate-300 md:flex">
              <a href="#undetectability" className="rounded-lg px-3 py-1.5 hover:bg-white/5 transition-colors">
                Undetectability
              </a>
              <a href="#features" className="rounded-lg px-3 py-1.5 hover:bg-white/5 transition-colors">
                Features
              </a>
              <a href="#pricing" className="rounded-lg px-3 py-1.5 hover:bg-white/5 transition-colors">
                Pricing
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Auth Actions */}
            {isLoaded && !isSignedIn && (
              <>
                <Button asChild variant="ghost" size="sm" className="text-xs font-medium text-slate-300 hover:text-white">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(30,130,224,0.4),inset_0_-2px_4px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02]"
                >
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}

            {isLoaded && isSignedIn && (
              <>
                <Button asChild variant="ghost" size="sm" className="text-xs font-medium text-slate-300 hover:text-white">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <UserButton />
              </>
            )}

            <Button
              asChild
              className="hidden sm:flex relative overflow-hidden rounded-xl border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/15"
            >
              <a href="https://api.v2.cluely.com/desktop-download/win/latest.exe" className="flex items-center gap-1.5">
                <Laptop className="size-3.5" />
                <span>Get Desktop App</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        {/* Radial Hero Background Overlay */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(87.76% 87.72% at 50% 9.2%, rgba(30, 130, 224, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          }}
        />

        {/* HERO SECTION */}
        <section className="flex flex-col items-center px-4 pt-16 pb-12 text-center lg:pt-24 lg:pb-16">
          <div className="flex max-w-4xl flex-col items-center gap-6">
            {/* Cluely Garamond Headline */}
            <h1
              className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]"
              style={{ fontFamily: "var(--font-eb-garamond), serif" }}
            >
              <span className="inline-block animate-bounce text-blue-400">#1</span>{" "}
              <span>Undetectable</span> <span>AI</span> <span>for</span> <span>Meetings & Automation</span>
            </h1>

            {/* Glowing Gradient Line */}
            <hr className="h-0.5 w-48 border-0 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent my-2" />

            {/* Subtitle */}
            <h2 className="max-w-2xl text-base text-slate-300 sm:text-lg lg:text-xl font-normal leading-relaxed drop-shadow">
              DominoFlow Cluely takes perfect meeting notes and gives real-time answers, all while remaining completely undetectable on your screen.
            </h2>

            {/* Main CTAs */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              {isLoaded && !isSignedIn && (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="group relative rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-base font-bold text-white shadow-[0_10px_25px_rgba(30,130,224,0.5),inset_0_-2px_4px_rgba(255,255,255,0.4)] transition-all hover:scale-[1.02]"
                  >
                    <Link href="/sign-up" className="flex items-center gap-3">
                      <span>Get Started Free</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-xl border-white/20 bg-white/5 px-6 py-6 text-base font-medium text-white hover:bg-white/10"
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </>
              )}

              {isLoaded && isSignedIn && (
                <Button
                  asChild
                  size="lg"
                  className="group relative rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-base font-bold text-white shadow-[0_10px_25px_rgba(30,130,224,0.5),inset_0_-2px_4px_rgba(255,255,255,0.4)] transition-all hover:scale-[1.02]"
                >
                  <Link href="/dashboard" className="flex items-center gap-3">
                    <span>Go to Dashboard</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-white/20 bg-white/5 px-6 py-6 text-base font-medium text-white hover:bg-white/10"
              >
                <a href="https://api.v2.cluely.com/desktop-download/win/latest.exe" className="flex items-center gap-2">
                  <Laptop className="size-4" />
                  <span>Get Desktop App</span>
                </a>
              </Button>
            </div>

            <p className="font-mono text-xs text-slate-400">
              Windows & macOS Supported • Undetectable Overlay Technology
            </p>
          </div>

          {/* APP WINDOW & FLOATING WIDGET MOCKUP */}
          <div className="relative mt-12 w-full max-w-5xl px-2 sm:px-6">
            <div className="relative rounded-2xl border border-white/15 bg-slate-950 p-2 shadow-2xl overflow-hidden">
              {/* Fake Window Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-red-500/80" />
                  <span className="size-3 rounded-full bg-yellow-500/80" />
                  <span className="size-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-slate-300">Cluely Meeting Copilot v2.4</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Stealth Mode: Active</span>
                </div>
              </div>

              {/* Fake Video Call Screen */}
              <div className="relative aspect-video w-full overflow-hidden rounded-b-xl bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6 flex flex-col justify-between">
                {/* Meeting Overlay Video Content */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-md">
                    <span className="size-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-mono text-white">Live Executive Strategy Call</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-md font-mono text-slate-300">
                    00:24:18
                  </div>
                </div>

                {/* SIMULATED FLOATING CLUELY OVERLAY WIDGET */}
                <div className="mx-auto w-full max-w-lg rounded-2xl border border-white/20 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-xl transition-all">
                  {/* Widget Control Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-full bg-blue-600/30 text-blue-400 ring-1 ring-blue-500/40">
                        <Zap className="size-3.5 fill-current" />
                      </div>
                      <span className="text-xs font-semibold text-white">Smart Assistant</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-7 rounded-full bg-white/10 px-3 text-[11px] font-medium text-white hover:bg-white/20">
                        <ChevronDown className="size-3 text-slate-400" />
                        <span>Hide</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="size-7 rounded-full bg-white/10 text-white hover:bg-white/20">
                        <Square className="size-3 fill-white text-white" />
                      </Button>
                    </div>
                  </div>

                  {/* Widget Content Box */}
                  <div className="space-y-3">
                    {/* User Question Bubble */}
                    <div className="flex justify-end">
                      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-3 py-1.5 text-xs text-white shadow-md">
                        {activeTab === "say" && "What should I say?"}
                        {activeTab === "assist" && "Analyze this slide"}
                        {activeTab === "questions" && "Suggest follow-up questions"}
                      </div>
                    </div>

                    {/* AI Live Response */}
                    <div className="rounded-xl bg-slate-950/80 p-3 text-xs leading-relaxed text-slate-200 border border-white/10">
                      <p>
                        “A <strong className="text-blue-400 font-semibold">Discounted Cash Flow (DCF)</strong> model calculates a company&apos;s intrinsic value by projecting future free cash flows and discounting them to present value using the Weighted Average Cost of Capital (WACC).”
                      </p>
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <button
                        onClick={() => setActiveTab("assist")}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] transition-all ${
                          activeTab === "assist"
                            ? "bg-blue-600 text-white font-medium"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <Sparkles className="size-3 text-blue-400" />
                        <span>Assist</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("say")}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] transition-all ${
                          activeTab === "say"
                            ? "bg-blue-600 text-white font-medium"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <Wand2 className="size-3 text-blue-400" />
                        <span>What should I say?</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("questions")}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] transition-all ${
                          activeTab === "questions"
                            ? "bg-blue-600 text-white font-medium"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <MessageSquare className="size-3 text-blue-400" />
                        <span>Follow-up questions</span>
                      </button>
                    </div>

                    {/* Interactive Input Command Box */}
                    <div className="relative mt-2 rounded-xl border border-white/15 bg-slate-950 p-2">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ask about your screen or conversation..."
                        className="w-full bg-transparent px-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                      <div className="mt-2 flex items-center justify-between px-1">
                        <div className="flex items-center gap-1">
                          <span className="flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-slate-300">
                            <Command className="size-2.5" />
                            <CornerDownLeft className="size-2.5" />
                          </span>
                          <span className="text-[10px] text-slate-400">for Assist</span>
                        </div>

                        <Button size="icon" className="size-6 rounded-lg bg-blue-600 text-white hover:bg-blue-500">
                          <ArrowRight className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UNDETECTABILITY & FEATURES SECTION */}
        <section id="undetectability" className="border-t border-white/10 bg-slate-950/60 py-20 px-6">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono text-blue-400 mb-6">
              <ShieldCheck className="size-3.5" />
              <span>Zero Screen-Share Detection</span>
            </div>

            <h2
              className="text-3xl font-extrabold text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-eb-garamond), serif" }}
            >
              100% Undetectable by Zoom, Teams & Meet
            </h2>

            <p className="mt-4 mx-auto max-w-2xl text-slate-400 text-sm sm:text-base">
              Cluely uses OS-level graphics hardware hooks to render its overlay directly on your display without appearing in window capture or screen sharing feeds.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-left shadow-lg">
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Stealth Overlay</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Renders outside of standard window capture hooks. Participants in your meeting only see your video camera.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-left shadow-lg">
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  <Zap className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Sub-Second Answers</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Real-time audio processing delivers context-aware talking points in less than 800 milliseconds.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-left shadow-lg">
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  <RefreshCw className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Automated Recaps</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Instant meeting summaries, action items, and follow-ups synced directly into your DominoFlow workspace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-24 px-6 border-t border-white/10">
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className="text-3xl font-extrabold text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-eb-garamond), serif" }}
            >
              Get Started with Cluely Desktop
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Download for Windows & macOS today. Free 14-day full feature trial included.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
              {isLoaded && !isSignedIn && (
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-base font-bold text-white shadow-xl hover:scale-[1.02]"
                >
                  <Link href="/sign-up" className="flex items-center gap-2">
                    <span>Sign Up Free Now</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-white/20 bg-white/5 px-8 py-6 text-base font-bold text-white hover:bg-white/10"
              >
                <a href="https://api.v2.cluely.com/desktop-download/win/latest.exe" className="flex items-center gap-2">
                  <Download className="size-5" />
                  <span>Download for Windows (.exe)</span>
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 bg-black text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded bg-blue-600 text-white font-bold">
              <Zap className="size-3.5 fill-current" />
            </div>
            <span className="font-bold text-white font-display">Cluely AI</span>
            <span>by DominoFlow</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/sign-in" className="hover:text-white">Sign In</Link>
            <span>•</span>
            <Link href="/sign-up" className="hover:text-white">Sign Up</Link>
            <span>•</span>
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          </div>

          <p>&copy; {new Date().getFullYear()} DominoFlow Cluely Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
