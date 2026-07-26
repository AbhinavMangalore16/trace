"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function ContactSection() {
  return (
    <section className="relative w-full min-h-[80vh] bg-slate-950 flex flex-col justify-center items-center overflow-hidden px-6 sm:px-10 lg:px-16 pt-24 pb-32 md:pb-40">
      {/* Blurred Project Grid Background */}
      <div className="absolute inset-0 z-0 scale-105">
        <Image
          src="/images/contact-bg.png"
          alt="Contact Background"
          fill
          className="object-cover opacity-50 brightness-90"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Side: Heading */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#00CBAE] bg-[#00CBAE]/10 px-3 py-1 rounded-full border border-[#00CBAE]/30">
            Get In Touch
          </span>
          <h2 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-normal leading-none font-cal">
            Got an Idea? <br />
          </h2>
          <p className="mt-6 text-white/70 text-lg sm:text-xl font-normal tracking-normal leading-relaxed max-w-xl">
            Let's Brew Something Together. Build your next web automation cascade with DominoFlow AI.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="space-y-10 w-full">
          <div className="space-y-8">
            <div className="group border-b border-white/20 pb-4 focus-within:border-[#00CBAE] transition-colors">
              <label className="block text-xs uppercase tracking-widest text-white/80 mb-2 font-medium">Your Name</label>
              <input
                type="text"
                placeholder="Alex Morgan"
                className="w-full bg-transparent text-white outline-none placeholder:text-white/20 text-base tracking-normal"
              />
            </div>
            <div className="group border-b border-white/20 pb-4 focus-within:border-[#00CBAE] transition-colors">
              <label className="block text-xs uppercase tracking-widest text-white/80 mb-2 font-medium">Your Email</label>
              <input
                type="email"
                placeholder="alex@company.com"
                className="w-full bg-transparent text-white outline-none placeholder:text-white/20 text-base tracking-normal"
              />
            </div>
            <div className="group border-b border-white/20 pb-4 focus-within:border-[#00CBAE] transition-colors">
              <label className="block text-xs uppercase tracking-widest text-white/80 mb-2 font-medium">Workflow Description</label>
              <textarea
                rows={2}
                placeholder="Describe the web browser actions or AI workflow you want to automate..."
                className="w-full bg-transparent text-white outline-none placeholder:text-white/20 resize-none text-base tracking-normal"
              />
            </div>
          </div>

          <button className="w-full py-4 bg-[#00CBAE] text-slate-950 rounded-full font-bold text-base hover:bg-[#00CBAE]/90 transition-all tracking-normal shadow-[0_0_25px_#00CBAE50] hover:scale-[1.01] active:scale-[0.99]">
            Send Now!
          </button>
        </div>
      </div>

      {/* Infinite Email Ticker */}
      <div className="absolute bottom-4 md:bottom-10 left-0 w-full z-20">
        <div
          className="relative w-full h-16 md:h-20 overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            {/* Original content */}
            <div className="flex">
              {[...Array(6)].map((_, idx) => (
                <div key={`a-${idx}`} className="flex items-center">
                  <a
                    href="mailto:hello@dominoflow.ai"
                    className="block px-10 text-3xl md:text-4xl font-bold text-white hover:text-[#00CBAE] transition-colors duration-300 cursor-pointer font-cal tracking-normal"
                  >
                    hello@dominoflow.ai
                  </a>
                  <span className="text-white/20 text-xl">●</span>
                </div>
              ))}
            </div>

            {/* Duplicate content */}
            <div className="flex">
              {[...Array(6)].map((_, idx) => (
                <div key={`b-${idx}`} className="flex items-center">
                  <a
                    href="mailto:hello@dominoflow.ai"
                    className="block px-10 text-3xl md:text-4xl font-bold text-white hover:text-[#00CBAE] transition-colors duration-300 cursor-pointer font-cal tracking-normal"
                  >
                    hello@dominoflow.ai
                  </a>
                  <span className="text-white/20 text-xl">●</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
