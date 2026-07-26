"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export function BouncyCardsFeatures() {
  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="mx-auto max-w-7xl text-slate-100">
        {/* Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/50">
              Platform Features
            </span>
            <h2 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-normal text-white md:text-5xl font-cal leading-tight">
              Engineered for modern web automation{" "}
              <span className="text-slate-400">that never breaks</span>
            </h2>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/sign-up"
              className="inline-block rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl transition-all hover:bg-blue-500"
            >
              Start building free
            </Link>
          </motion.div>
        </div>

        {/* Row 1 */}
        <div className="mb-6 grid grid-cols-12 gap-6">
          <BounceCard className="col-span-12 md:col-span-4" accentClassName="from-sky-500 to-cyan-500">
            <CardTitle
              title="Visual Cascade Builder"
              subtitle="Connect modular Dominos to construct complex web automation flows in minutes with zero code."
              stat="Visual Canvas"
            />
            <CardMedia
              alt="Visual Canvas"
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop"
            />
          </BounceCard>

          <BounceCard className="col-span-12 md:col-span-8" accentClassName="from-amber-400 to-orange-500">
            <CardTitle
              title="Self-Healing DOM Engine"
              subtitle="Adapts to UI updates, class name changes, and button shifts without crashing your Playwright or Selenium scripts."
              stat="Self-Healing"
            />
            <CardMedia
              alt="DOM Engine"
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop"
            />
          </BounceCard>
        </div>

        {/* Row 2 */}
        <div className="mb-6 grid grid-cols-12 gap-6">
          <BounceCard className="col-span-12 md:col-span-8" accentClassName="from-emerald-500 to-green-600">
            <CardTitle
              title="Autonomous Pop-up Resolution"
              subtitle="Cookie banners, promo overlays, and newsletter modals are detected and resolved automatically without code."
              stat="Sub-second execution"
            />
            <CardMedia
              alt="Pop-up Solver"
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop"
            />
          </BounceCard>

          <BounceCard className="col-span-12 md:col-span-4" accentClassName="from-rose-500 to-red-600">
            <CardTitle
              title="Neon Serverless Storage"
              subtitle="Workflow graphs are persisted atomically as JSONB in Neon Postgres with scale-to-zero compute."
              stat="Atomic JSONB"
            />
            <CardMedia
              alt="Neon Storage"
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop"
            />
          </BounceCard>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-12 gap-6">
          <BounceCard className="col-span-12 md:col-span-4" accentClassName="from-purple-500 to-indigo-600">
            <CardTitle
              title="Stealth Browser Sessions"
              subtitle="Execute multi-step logins, multi-factor auth, and complex web interactions with session state retention."
              stat="Persistent Session"
            />
            <CardMedia
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop"
              alt="Stealth Session"
            />
          </BounceCard>

          <BounceCard className="col-span-12 md:col-span-4" accentClassName="from-zinc-500 to-slate-700">
            <CardTitle
              title="Clerk Organization RBAC"
              subtitle="Multi-tenant workspace isolation, role-based access control, and team permission management."
              stat="Enterprise Security"
            />
            <CardMedia
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1400&auto=format&fit=crop"
              alt="Enterprise Security"
            />
          </BounceCard>

          <BounceCard className="col-span-12 md:col-span-4" accentClassName="from-blue-500 to-indigo-600">
            <CardTitle
              title="Webhook & API Triggers"
              subtitle="Trigger Cascades programmatically from external APIs, cron schedules, or webhooks seamlessly."
              stat="Instant API"
            />
            <CardMedia
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop"
              alt="API Triggers"
            />
          </BounceCard>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Internal Components ---------------- */

type BounceCardProps = {
  className: string
  children: ReactNode
  accentClassName: string
}

function BounceCard({ className, children, accentClassName }: BounceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 0.985, rotate: -0.5 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className={`group relative min-h-80 cursor-pointer overflow-hidden rounded-3xl border border-slate-800/80 bg-[#0c1229] p-7 pb-36 shadow-lg ${className}`}
    >
      {children}
      <div
        aria-hidden
        className={`absolute inset-x-4 bottom-0 top-36 z-0 translate-y-8 rounded-t-2xl bg-gradient-to-br ${accentClassName} p-2 transition-transform duration-300 group-hover:translate-y-3 group-hover:rotate-1`}
      >
        <div className="size-full rounded-xl bg-slate-950/70 ring-1 ring-white/10" />
      </div>
    </motion.div>
  )
}

type CardMediaProps = {
  src: string
  alt: string
}

function CardMedia({ src, alt }: CardMediaProps) {
  return (
    <div className="absolute inset-x-4 bottom-0 top-36 z-10 translate-y-8 rounded-t-2xl p-2 transition-transform duration-300 group-hover:translate-y-3 group-hover:rotate-1">
      <img
        src={src}
        alt={alt}
        className="size-full rounded-xl object-cover ring-1 ring-white/15 brightness-90 contrast-105"
        loading="lazy"
      />
    </div>
  )
}

type CardTitleProps = {
  title: string
  subtitle?: string
  stat?: string
}

function CardTitle({ title, subtitle, stat }: CardTitleProps) {
  return (
    <div className="relative z-20 space-y-2">
      {stat && (
        <div className="text-xs font-bold uppercase tracking-widest text-blue-400">
          {stat}
        </div>
      )}
      <h3 className="text-2xl font-bold tracking-normal text-white font-cal">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
          {subtitle}
        </p>
      )}
    </div>
  )
}
