"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth, UserButton } from "@clerk/nextjs"
import { Dice5 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DitherBackground } from "@/components/ui/dither-background"
import { BouncyCardsFeatures } from "@/components/ui/bouncy-cards-features"
import { SeamlessIntegrationSection } from "@/components/ui/seamless-integration"
import { IntegrationsGridSection } from "@/components/ui/integrations-grid"
import { PricingSection } from "@/components/ui/pricing-section"
import { TestimonialsSection } from "@/components/ui/testimonials-section"
import { ContactSection } from "@/components/ui/contact-section"
import Footer from "@/components/ui/footer"

const CAROUSEL_LOGOS = [
  { name: "Netflix", src: "/carousel/Logonetflix.png" },
  { name: "Spotify", src: "/carousel/Logospotify.svg" },
  { name: "OpenAI", src: "/carousel/Logoopenai.svg" },
  { name: "Twitch", src: "/carousel/Logotwitch.svg" },
]

export default function AceternityDitherHeroPage() {
  const { isSignedIn, isLoaded } = useAuth()

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <DitherBackground src="/images/rural-anime.jpg" className="min-h-screen">
        {/* HEADER NAVIGATION */}
        <header className="w-full">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
            {/* Logo with Cal Sans */}
            <Link href="/" className="flex items-center gap-2 text-white font-cal text-xl tracking-normal">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                <Dice5 className="size-4" />
              </div>
              <span>DominoFlow</span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
              <a href="#features" className="transition-colors hover:text-white">
                Features
              </a>
              <a href="#integrations" className="transition-colors hover:text-white">
                Integrations
              </a>
              <a href="#pricing" className="transition-colors hover:text-white">
                Pricing
              </a>
              <a href="#testimonials" className="transition-colors hover:text-white">
                Testimonials
              </a>
              <a href="#contact" className="transition-colors hover:text-white">
                Contact
              </a>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-white/25 bg-white/10 px-5 py-2 text-xs font-medium text-white hover:bg-white/20"
              >
                <Link href="/sign-in">Docs</Link>
              </Button>

              {isLoaded && !isSignedIn && (
                <Button
                  asChild
                  size="sm"
                  className="rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-lg transition-all hover:bg-blue-500 hover:scale-[1.02]"
                >
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              )}

              {isLoaded && isSignedIn && (
                <>
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-lg transition-all hover:bg-blue-500 hover:scale-[1.02]"
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <UserButton />
                </>
              )}
            </div>
          </div>
        </header>

        {/* HERO MAIN CONTENT WITH CAL SANS TYPOGRAPHY */}
        <main className="mx-auto flex flex-col items-center px-6 pt-16 pb-12 text-center lg:pt-24">
          <div className="flex max-w-4xl flex-col items-center">
            {/* Main Headline in Cal Sans */}
            <h1 className="font-cal text-4xl font-extrabold tracking-normal text-white sm:text-6xl md:text-7xl leading-[1.1]">
              Go from idea to <br className="hidden sm:inline" />
              production with AI.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg md:text-xl font-normal leading-relaxed">
              DominoFlow AI helps you get your idea from your mind infront of your customers in minutes.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {isLoaded && !isSignedIn && (
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-blue-600 px-7 py-6 text-sm font-semibold text-white shadow-xl transition-all hover:bg-blue-500 hover:scale-[1.02]"
                >
                  <Link href="/sign-up">Start building for free</Link>
                </Button>
              )}

              {isLoaded && isSignedIn && (
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-blue-600 px-7 py-6 text-sm font-semibold text-white shadow-xl transition-all hover:bg-blue-500 hover:scale-[1.02]"
                >
                  <Link href="/dashboard">Go to App Dashboard</Link>
                </Button>
              )}

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/30 bg-white/10 px-7 py-6 text-sm font-medium text-white hover:bg-white/20"
              >
                <Link href="/sign-in">Read documentation</Link>
              </Button>
            </div>

            {/* Trust Strip with Infinite Image Carousel */}
            <div className="mt-14 flex flex-col items-center gap-6 w-full max-w-4xl overflow-hidden">
              <p className="text-xs font-medium text-slate-400">
                Trusted by <span className="font-semibold text-white">69,420+</span> users worldwide.
              </p>

              {/* Infinite Image Carousel Container */}
              <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
                <div className="flex w-max animate-infinite-scroll items-center gap-16 text-sm font-bold">
                  {[...CAROUSEL_LOGOS, ...CAROUSEL_LOGOS, ...CAROUSEL_LOGOS].map((item, index) => (
                    <div key={index} className="flex shrink-0 items-center justify-center h-8">
                      <Image
                        src={item.src}
                        alt={item.name}
                        width={120}
                        height={36}
                        className="h-7 w-auto object-contain brightness-0 invert opacity-75 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED COMPUTER MONITOR SHOWCASE MOCKUP WITH CUSTOM IMAGE */}
          <div className="mt-16 w-full max-w-5xl px-2 sm:px-6">
            <div className="rounded-2xl border border-white/20 bg-slate-900/90 p-2.5 sm:p-3 shadow-2xl backdrop-blur-xl">
              {/* Fake Window Controls */}
              <div className="flex items-center gap-2 border-b border-white/10 px-3 pb-2.5 text-xs text-slate-400">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-yellow-500/80" />
                <span className="size-3 rounded-full bg-green-500/80" />
              </div>

              {/* Application Screen Image */}
              <div className="mt-2 relative w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-inner">
                <Image
                  src="/images/image.png"
                  alt="DominoFlow Application Interface"
                  width={1400}
                  height={850}
                  priority
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </main>
      </DitherBackground>

      {/* BOUNCY CARDS FEATURES SECTION */}
      <div id="features">
        <BouncyCardsFeatures />
      </div>

      {/* SEAMLESS INTEGRATION SECTION */}
      <div id="integrations">
        <SeamlessIntegrationSection />
        <IntegrationsGridSection />
      </div>

      {/* PRICING SECTION */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* TESTIMONIALS SECTION */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* CONTACT SECTION */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* FOOTER SECTION */}
      <Footer />
    </div>
  )
}
