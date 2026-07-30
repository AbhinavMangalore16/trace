"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Database, MessageSquare, Code2, Globe, ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

interface PlatformCard {
  id: string
  title: string
  subtitle: string
  cta: string
  href: string
  icon: React.ReactNode
}

export function IntegrationsGridSection() {
  const cards: PlatformCard[] = [
    {
      id: "notion",
      title: "Notion Workspaces",
      subtitle: "Sync scraped web data directly into Notion databases and automated kanban boards.",
      cta: "Connect Notion",
      href: "/sign-in",
      icon: (
        <svg className="size-5 fill-white" viewBox="0 0 24 24">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.434-.794c.28-.047.373-.233.28-.42-.14-.233-.513-.42-.886-.373L5.438 3.834c-.466.047-.793.187-.979.374zm1.538 4.292v11.758c0 .7.373 1.026 1.166.979l11.947-.746c.746-.047 1.073-.513 1.073-1.166V7.41c0-.606-.373-.886-.979-.84l-12.227.794c-.606.046-.98.373-.98.933zm11.387 1.353c.093.373.047.746-.28.84l-.84.28c-.42.14-.653.42-.653.886v7.324c0 .42.14.7.513.653l1.12-.233c.326-.047.466.186.373.513l-.326 1.026c-.093.326-.373.466-.746.513l-4.292.28c-.373.046-.606-.187-.513-.56l.326-1.026c.093-.326.373-.466.746-.513l1.026-.233c.373-.093.513-.373.513-.746v-3.731l-3.359 5.319c-.326.513-.7.653-1.166.7l-3.17.233c-.373.047-.56-.186-.466-.513l.326-1.026c.093-.326.373-.466.7-.513l.886-.14c.373-.047.513-.326.513-.746V10.21c0-.42-.14-.7-.513-.653l-.933.14c-.373.047-.56-.186-.466-.513l.326-1.026c.093-.326.373-.466.746-.513l3.545-.233c.466-.047.793.186.979.606l2.939 4.665V9.417c0-.42-.14-.7-.513-.653l-.933.14c-.373.047-.56-.187-.466-.513l.326-1.026c.093-.326.373-.466.746-.513l3.17-.233z" />
        </svg>
      ),
    },
    {
      id: "slack",
      title: "Slack & Discord Bots",
      subtitle: "Receive real-time notifications, DOM change alerts, and execution reports instantly.",
      cta: "Setup Webhook",
      href: "/sign-in",
      icon: <MessageSquare className="size-5 text-emerald-400" />,
    },
    {
      id: "neon",
      title: "Neon & Drizzle DBs",
      subtitle: "Persist workflow execution logs, JSONB DOM snapshots, and automation state atomically.",
      cta: "Connect Database",
      href: "/sign-in",
      icon: <Database className="size-5 text-cyan-400" />,
    },
    {
      id: "github",
      title: "GitHub Actions CI",
      subtitle: "Trigger web automation Cascades automatically on pull requests, commits, or scheduled crons.",
      cta: "Explore Action",
      href: "/sign-in",
      icon: (
        <svg className="size-5 fill-white" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      id: "rest-api",
      title: "REST API & Webhooks",
      subtitle: "Trigger automation flows from any external web application, microservice, or serverless script.",
      cta: "View API Docs",
      href: "/sign-in",
      icon: <Code2 className="size-5 text-purple-400" />,
    },
    {
      id: "playwright",
      title: "Playwright Stealth Engine",
      subtitle: "Run headless chromium, firefox, and webkit sessions with automated captcha resolution.",
      cta: "Launch Engine",
      href: "/sign-in",
      icon: <Globe className="size-5 text-amber-400" />,
    },
  ]

  return (
    <section className="py-24 px-6 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <ScrollReveal direction="up" className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide font-cal max-w-3xl leading-[1.15]">
            Available on every device & platform you could possibly think about.
          </h2>
        </ScrollReveal>

        {/* 6 Cards Grid (2 rows x 3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <ScrollReveal key={card.id} direction="up" delay={0.08 * (index + 1)}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-2xl border border-white/10 bg-[#0c1020] p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:border-blue-500/40 transition-all group h-full"
              >
                <div>
                  {/* Icon Container */}
                  <div className="size-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-inner mb-5">
                    {card.icon}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white font-cal group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {card.subtitle}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-2">
                  <a
                    href={card.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors"
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
