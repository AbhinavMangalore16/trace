"use client"

import * as React from "react"

interface DitherBackgroundProps {
  src: string
  children?: React.ReactNode
  className?: string
}

export function DitherBackground({ src, children, className = "" }: DitherBackgroundProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-slate-950 ${className}`}>
      {/* Mountain Base Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-85 brightness-95"
        style={{ backgroundImage: `url('${src}')` }}
      />

      {/* Halftone / Dither Pixel Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-65 mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle, #000000 1.2px, transparent 1.2px),
            radial-gradient(circle, #ffffff 1.2px, transparent 1.2px)
          `,
          backgroundSize: "4px 4px",
          backgroundPosition: "0 0, 2px 2px",
        }}
      />

      {/* Top & Bottom Ambient Vignette Gradients */}
      <div className="pointer-events-none absolute inset-0 z-15 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-slate-950" />

      {/* Children Layer */}
      <div className="relative z-20 w-full">{children}</div>
    </div>
  )
}
