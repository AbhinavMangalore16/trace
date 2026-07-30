"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const [time, setTime] = useState("")

  useEffect(() => {
    let timer: NodeJS.Timeout
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      })
      setTime(formatted)
      const msToNextSecond = 1000 - now.getMilliseconds()
      timer = setTimeout(updateTime, msToNextSecond)
    }
    updateTime()
    return () => clearTimeout(timer)
  }, [])

  return (
    <footer className="relative w-full bg-slate-950 pt-20 pb-10 overflow-hidden">
      {/* Background with Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer-bg.png"
          alt="Footer background"
          fill
          className="object-cover opacity-50 brightness-90"
        />
        <div className="absolute inset-0 bg-slate-950/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-28">
          <div>
            <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-6 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-3 text-white text-base md:text-lg font-medium tracking-wide">
              <li>
                <a href="#features" className="relative group transition-colors duration-300 hover:text-[#53EAFD]">
                  Features
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FFFFFE] transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="relative group transition-colors duration-300 hover:text-[#53EAFD]">
                  Cascades
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FFFFFE] transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100" />
                </Link>
              </li>
              <li>
                <a href="#pricing" className="relative group transition-colors duration-300 hover:text-[#53EAFD]">
                  Pricing
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FFFFFE] transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </li>
              <li>
                <a href="#docs" className="relative group transition-colors duration-300 hover:text-[#53EAFD]">
                  Docs
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FFFFFE] transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </li>
              <li>
                <a href="#contact" className="relative group transition-colors duration-300 hover:text-[#53EAFD]">
                  Contact
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FFFFFE] transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-6 font-semibold">
              Social
            </h4>
            <ul className="space-y-3 text-white text-base md:text-lg font-medium tracking-wide">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="relative group transition-colors duration-300 hover:text-[#53EAFD]">
                  Twitter / X
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FFFFFE] transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="relative group transition-colors duration-300 hover:text-[#53EAFD]">
                  GitHub
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FFFFFE] transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </li>
              <li>
                <a href="https://discord.com" target="_blank" rel="noreferrer" className="relative group transition-colors duration-300 hover:text-[#53EAFD]">
                  Discord
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FFFFFE] transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="relative group transition-colors duration-300 hover:text-[#53EAFD]">
                  LinkedIn
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FFFFFE] transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-6 font-semibold">
              Legals
            </h4>
            <ul className="space-y-3 text-white text-base md:text-lg font-medium tracking-wide">
              <li>
                <a href="#" className="relative group transition-colors duration-300 hover:text-[#53EAFD]">
                  Privacy Policy
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FFFFFE] transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </li>
              <li>
                <a href="#" className="relative group transition-colors duration-300 hover:text-[#53EAFD]">
                  Terms of Service
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FFFFFE] transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-0 border-b border-white/10 pb-8 md:pb-10 mb-6 text-xs uppercase tracking-widest text-white/40 text-center md:text-left font-sans">
          <p>© 2026 DominoFlow. All rights reserved.</p>
          <p className="font-mono">New Delhi → {time || "12:00:00"}</p>
          <a href="#" className="text-gray-400 hover:text-[#53EAFD] transition-colors">Back to top ↑</a>
        </div>

        {/* Massive Brand Name in Cal Sans with tracking-wide */}
        <div className="relative w-full flex justify-center">
          <h1 className="w-full text-[8vw] md:text-[10.5vw] font-bold text-white tracking-wide leading-none text-center font-cal select-none opacity-90">
            DominoFlow
          </h1>
        </div>
      </div>
    </footer>
  )
}
