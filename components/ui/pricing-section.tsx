"use client"

import * as React from "react"
import { useState } from "react"
import { Check } from "lucide-react"

function DitherAnimeCardImage({
  src,
  alt,
  tintColor = "monochrome",
}: {
  src: string
  alt: string
  tintColor?: "monochrome" | "cyan" | "yellow"
}) {
  const tintStyles = {
    monochrome: "contrast-125 brightness-95 grayscale",
    cyan: "contrast-125 brightness-95 sepia hue-rotate-165 saturate-200",
    yellow: "contrast-125 brightness-95 sepia hue-rotate-10 saturate-250",
  }

  const ditherDotColors = {
    monochrome: "radial-gradient(circle, #000000 1.2px, transparent 1.2px), radial-gradient(circle, #ffffff 1.2px, transparent 1.2px)",
    cyan: "radial-gradient(circle, #002b36 1.2px, transparent 1.2px), radial-gradient(circle, #38bdf8 1.2px, transparent 1.2px)",
    yellow: "radial-gradient(circle, #3a2e00 1.2px, transparent 1.2px), radial-gradient(circle, #facc15 1.2px, transparent 1.2px)",
  }

  return (
    <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden my-5 border border-white/10 bg-slate-900">
      {/* Anime Base Image */}
      <img
        src={src}
        alt={alt}
        className={`size-full object-cover ${tintStyles[tintColor]}`}
      />

      {/* Halftone / Dither Dot Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-75 mix-blend-overlay"
        style={{
          backgroundImage: ditherDotColors[tintColor],
          backgroundSize: "3px 3px",
          backgroundPosition: "0 0, 1.5px 1.5px",
        }}
      />
    </div>
  )
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="py-24 px-6 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-normal font-cal">
              Our Pricing
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              For info, limits and rates, explore a{" "}
              <a href="#detailed-breakdown" className="underline underline-offset-4 hover:text-white transition-colors font-medium">
                detailed pricing breakdown ↗
              </a>
              .
            </p>
          </div>

          {/* Billing Switch */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className={!isAnnual ? "text-white" : "text-slate-400"}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? "bg-blue-600" : "bg-slate-800"
              }`}
            >
              <span
                className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={isAnnual ? "text-white" : "text-slate-400"}>
              Annually <span className="text-emerald-400 font-bold">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Hobby */}
          <div className="rounded-2xl border border-white/10 bg-[#0c1020] p-6 flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-2xl font-bold text-white font-cal">Hobby</h3>
              <div className="mt-2 text-sm font-normal text-slate-300">
                <span className="text-xl font-bold text-white">Free</span> · $10 Credits / mo
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed min-h-10">
                Everything you need to <span className="font-bold text-white">start</span> automating browsers.
              </p>

              {/* Action CTA */}
              <a
                href="/sign-up"
                className="mt-4 block w-full rounded-lg bg-slate-100 px-4 py-2.5 text-center text-xs font-bold text-slate-950 transition-colors hover:bg-white shadow"
              >
                Start For Free
              </a>

              {/* Dithered Anime Artwork */}
              <DitherAnimeCardImage
                src="/pricing/hobby.png"
                alt="Hobby Developer"
                tintColor="monochrome"
              />
            </div>

            {/* Included Items */}
            <div className="space-y-2.5 pt-2 text-xs font-semibold text-slate-300">
              <div className="text-[11px] text-slate-400 uppercase font-mono tracking-wider mb-2">Monthly:</div>
              <div className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-slate-800 text-white">
                  <Check className="size-2.5" />
                </div>
                <span>100 Browser Hours</span>
              </div>
            </div>
          </div>

          {/* Card 2: Developers */}
          <div className="rounded-2xl border border-cyan-500/30 bg-[#0c1020] p-6 flex flex-col justify-between shadow-lg relative">
            <div>
              <h3 className="text-2xl font-bold text-[#38bdf8] font-cal">Developers</h3>
              <div className="mt-2 text-sm font-normal text-slate-300">
                <span className="text-2xl font-bold text-white">{isAnnual ? "$79" : "$99"}</span> / mo
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed min-h-10">
                Everything you need to <span className="font-bold text-white">launch</span> your project.
              </p>

              {/* Action CTA */}
              <a
                href="/sign-up"
                className="mt-4 block w-full rounded-lg bg-[#38bdf8] px-4 py-2.5 text-center text-xs font-bold text-slate-950 transition-colors hover:bg-cyan-300 shadow-md"
              >
                Get Started
              </a>

              {/* Dithered Anime Artwork */}
              <DitherAnimeCardImage
                src="/pricing/developers.png"
                alt="Developers Team"
                tintColor="cyan"
              />
            </div>

            {/* Included Items */}
            <div className="space-y-2.5 pt-2 text-xs font-semibold text-slate-300">
              <div className="text-[11px] text-slate-400 uppercase font-mono tracking-wider mb-2">Monthly:</div>
              <div className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-cyan-950 text-cyan-400">
                  <Check className="size-2.5" />
                </div>
                <span>1,238 Browser Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-cyan-950 text-cyan-400">
                  <Check className="size-2.5" />
                </div>
                <span>12 GB Proxy Bandwidth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-cyan-950 text-cyan-400">
                  <Check className="size-2.5" />
                </div>
                <span>28k Captcha Solves</span>
              </div>
            </div>
          </div>

          {/* Card 3: Startups */}
          <div className="rounded-2xl border border-yellow-500/30 bg-[#0c1020] p-6 flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-2xl font-bold text-[#facc15] font-cal">Startups</h3>
              <div className="mt-2 text-sm font-normal text-slate-300">
                <span className="text-2xl font-bold text-white">{isAnnual ? "$399" : "$499"}</span> / mo
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed min-h-10">
                Everything you need to <span className="font-bold text-white">scale</span> your masterpiece.
              </p>

              {/* Action CTA */}
              <a
                href="/sign-up"
                className="mt-4 block w-full rounded-lg bg-[#facc15] px-4 py-2.5 text-center text-xs font-bold text-slate-950 transition-colors hover:bg-yellow-300 shadow-md"
              >
                Get Started
              </a>

              {/* Dithered Anime Artwork */}
              <DitherAnimeCardImage
                src="/pricing/startups.png"
                alt="Startups Scale"
                tintColor="yellow"
              />
            </div>

            {/* Included Items */}
            <div className="space-y-2.5 pt-2 text-xs font-semibold text-slate-300">
              <div className="text-[11px] text-slate-400 uppercase font-mono tracking-wider mb-2">Monthly:</div>
              <div className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-amber-950 text-amber-400">
                  <Check className="size-2.5" />
                </div>
                <span>9,980 Browser Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-amber-950 text-amber-400">
                  <Check className="size-2.5" />
                </div>
                <span>166 GB Proxy Bandwidth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-amber-950 text-amber-400">
                  <Check className="size-2.5" />
                </div>
                <span>166k Captcha Solves</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Bottom Banner */}
        <div className="rounded-2xl border border-white/10 bg-[#0c1020] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white font-cal">Enterprise</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Spin up <span className="font-bold text-white">thousands</span> of browser sessions on the cloud.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-block rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
              >
                Talk to the founders
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <div className="flex size-4 items-center justify-center rounded-full bg-slate-800 text-white">
                <Check className="size-2.5" />
              </div>
              <span>Custom Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex size-4 items-center justify-center rounded-full bg-slate-800 text-white">
                <Check className="size-2.5" />
              </div>
              <span>Dedicated Clusters & APIs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex size-4 items-center justify-center rounded-full bg-slate-800 text-white">
                <Check className="size-2.5" />
              </div>
              <span>Higher Limits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex size-4 items-center justify-center rounded-full bg-slate-800 text-white">
                <Check className="size-2.5" />
              </div>
              <span>Higher Session Concurrency</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex size-4 items-center justify-center rounded-full bg-slate-800 text-white">
                <Check className="size-2.5" />
              </div>
              <span>Discounted Rates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
