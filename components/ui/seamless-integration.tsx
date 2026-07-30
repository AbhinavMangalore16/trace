"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

interface IntegrationLogo {
  id: string
  name: string
  icon: React.ReactNode
}

export function SeamlessIntegrationSection() {
  const logos: IntegrationLogo[] = [
    {
      id: "notion",
      name: "Notion",
      icon: (
        <svg className="size-8 fill-white" viewBox="0 0 24 24">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.434-.794c.28-.047.373-.233.28-.42-.14-.233-.513-.42-.886-.373L5.438 3.834c-.466.047-.793.187-.979.374zm1.538 4.292v11.758c0 .7.373 1.026 1.166.979l11.947-.746c.746-.047 1.073-.513 1.073-1.166V7.41c0-.606-.373-.886-.979-.84l-12.227.794c-.606.046-.98.373-.98.933zm11.387 1.353c.093.373.047.746-.28.84l-.84.28c-.42.14-.653.42-.653.886v7.324c0 .42.14.7.513.653l1.12-.233c.326-.047.466.186.373.513l-.326 1.026c-.093.326-.373.466-.746.513l-4.292.28c-.373.046-.606-.187-.513-.56l.326-1.026c.093-.326.373-.466.746-.513l1.026-.233c.373-.093.513-.373.513-.746v-3.731l-3.359 5.319c-.326.513-.7.653-1.166.7l-3.17.233c-.373.047-.56-.186-.466-.513l.326-1.026c.093-.326.373-.466.7-.513l.886-.14c.373-.047.513-.326.513-.746V10.21c0-.42-.14-.7-.513-.653l-.933.14c-.373.047-.56-.186-.466-.513l.326-1.026c.093-.326.373-.466.746-.513l3.545-.233c.466-.047.793.186.979.606l2.939 4.665V9.417c0-.42-.14-.7-.513-.653l-.933.14c-.373.047-.56-.187-.466-.513l.326-1.026c.093-.326.373-.466.746-.513l3.17-.233z" />
        </svg>
      ),
    },
    {
      id: "prisma",
      name: "Prisma",
      icon: (
        <svg className="size-8 fill-white" viewBox="0 0 24 24">
          <path d="M12 2L2 19.5h20L12 2zm0 4.5l6.5 11.5H5.5L12 6.5z" />
        </svg>
      ),
    },
    {
      id: "vercel",
      name: "Vercel",
      icon: (
        <svg className="size-8 fill-white" viewBox="0 0 24 24">
          <path d="M12 2L24 22H0L12 2Z" />
        </svg>
      ),
    },
    {
      id: "linear",
      name: "Linear",
      icon: (
        <svg className="size-8 text-white" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      id: "gmail",
      name: "Gmail",
      icon: (
        <svg className="size-8" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
          <path fill="#34A853" d="M22 6l-10 7L2 6v12h20V6z" />
          <path fill="#EA4335" d="M12 13L2 6v12h10V13z" />
          <path fill="#FBBC05" d="M22 6l-10 7V20h10V6z" />
        </svg>
      ),
    },
    {
      id: "supabase",
      name: "Supabase",
      icon: (
        <svg className="size-8" viewBox="0 0 24 24" fill="none">
          <path
            d="M13.35 21.65a.75.75 0 01-1.3.52L3.1 12.63a.75.75 0 01.54-1.28h6.95V2.35a.75.75 0 011.3-.52l8.95 9.54a.75.75 0 01-.54 1.28h-6.95v8.99z"
            fill="#3ECF8E"
          />
        </svg>
      ),
    },
    {
      id: "canva",
      name: "Canva",
      icon: (
        <div className="size-8 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
          C
        </div>
      ),
    },
    {
      id: "adobe",
      name: "Adobe",
      icon: (
        <svg className="size-8" viewBox="0 0 24 24" fill="#FF0000">
          <path d="M13.966 22H24V2h-5.462l-4.572 11.455L13.966 22zM0 22h10.034V2H0v20zm8.384-5.385H3.666L8.384 5.23v11.385z" />
        </svg>
      ),
    },
    {
      id: "openai",
      name: "OpenAI",
      icon: (
        <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2.2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10M7 12h10" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-28 px-6 bg-slate-950 relative overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Title & Description */}
        <ScrollReveal direction="left" className="space-y-6 max-w-xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wide leading-[1.1] font-cal">
            Integrate with your favorite tools!
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal tracking-wide">
            Integrate with over 100+ tools and platforms to streamline your web automation workflow and boost productivity effortlessly.
          </p>
        </ScrollReveal>

        {/* Right Column: Isometric Honeycomb Logo Grid */}
        <ScrollReveal direction="right" delay={0.2} className="relative flex justify-center items-center py-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-5 rotate-[-4deg] hover:rotate-0 transition-transform duration-500 ease-out">
            {/* Row 1 Empty spacer & tiles */}
            <div className="size-20 sm:size-24 rounded-2xl bg-zinc-950/40 border border-white/5 opacity-30" />
            {logos.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.1, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="size-20 sm:size-24 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-xl backdrop-blur-md flex items-center justify-center cursor-pointer group transition-colors hover:border-white/30"
              >
                <div className="transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
              </motion.div>
            ))}

            {/* Row 2 Tiles */}
            {logos.slice(3, 7).map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.1, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="size-20 sm:size-24 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-xl backdrop-blur-md flex items-center justify-center cursor-pointer group transition-colors hover:border-white/30"
              >
                <div className="transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
              </motion.div>
            ))}

            {/* Row 3 Tiles & Spacers */}
            <div className="size-20 sm:size-24 rounded-2xl bg-zinc-950/40 border border-white/5 opacity-30" />
            {logos.slice(7).map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.1, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="size-20 sm:size-24 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-xl backdrop-blur-md flex items-center justify-center cursor-pointer group transition-colors hover:border-white/30"
              >
                <div className="transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
              </motion.div>
            ))}
            <div className="size-20 sm:size-24 rounded-2xl bg-zinc-950/40 border border-white/5 opacity-30" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
