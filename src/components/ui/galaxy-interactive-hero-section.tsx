"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { PlayCircle, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaProjectDiagram } from "react-icons/fa";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-linear-to-br from-slate-900 via-slate-800 to-black" />
  ),
});

function HeroSplineBackground() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Spline
        className="h-screen w-full"
        scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.84),transparent_30%,transparent_70%,rgba(0,0,0,0.84)),linear-gradient(to_bottom,transparent_45%,rgba(0,0,0,0.93))]" />
    </div>
  );
}

function ScreenshotSection({
  screenshotRef,
}: {
  screenshotRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <section className="relative z-10 mt-10 w-full md:mt-14">
      <div
        ref={screenshotRef}
        className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-slate-500/30 bg-slate-900 px-4 shadow-2xl sm:px-6 lg:px-8"
      >
        <img
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2400&q=80"
          alt="Product dashboard preview"
          className="block h-auto min-h-80 w-full object-cover md:min-h-140"
        />
      </div>
    </section>
  );
}

function HeroContent() {
  return (
    <div className="w-full max-w-3xl px-4 pt-20 text-left text-white sm:px-6 sm:pt-28 md:pt-32 lg:px-8">
      <h1 className="mb-4 text-3xl font-bold leading-tight tracking-wide sm:text-5xl md:text-7xl">
        Elevate your creative workflow
        <br />
        to an art form.
      </h1>
      <p className="mb-8 max-w-xl text-base opacity-85 sm:text-lg md:text-xl">
        Manage all your media and assets on a single secure surface to create
        and deliver high-quality content faster.
      </p>
      <div className="pointer-events-auto flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <SignInButton mode="modal">
          <Button className="h-11 rounded-full border border-[#322D36] bg-[#8200DB29] px-7 text-white hover:bg-black/50 sm:h-12">
            <Sparkles className="mr-2 size-4" />
            Start Free Trial
          </Button>
        </SignInButton>
        <Button
          variant="outline"
          className="h-11 rounded-full border-slate-500/70 bg-black/60 px-7 text-slate-100 hover:bg-black/80 hover:text-white sm:h-12"
        >
          <PlayCircle className="mr-2 size-4" />
          Watch the Video
        </Button>
      </div>
    </div>
  );
}

function HeroTopBar() {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);

  const navLinkClass = (itemName: string) => {
    const isCurrentItemHovered = hoveredNavItem === itemName;
    const isAnotherItemHovered =
      hoveredNavItem !== null && !isCurrentItemHovered;

    if (isCurrentItemHovered) return "text-foreground";
    if (isAnotherItemHovered) return "text-muted-foreground/70";
    return "text-muted-foreground";
  };

  return (
    <header className="absolute top-0 z-50 w-full border-b border-border/40 bg-black backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="rounded border border-primary/20 bg-primary/10 p-1 transition-colors group-hover:bg-primary/20">
            <FaProjectDiagram className="size-5 text-primary" />
          </div>
          <span className="text-base font-semibold tracking-tight text-foreground">
            Trace.ai
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {["Platform", "Compare", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase() === "platform" ? "problem" : item.toLowerCase()}`}
              onMouseEnter={() => setHoveredNavItem(item)}
              onMouseLeave={() => setHoveredNavItem(null)}
              className={`transition-colors ${navLinkClass(item)}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <SignInButton mode="modal">
            <Button
              variant="ghost"
              size="sm"
              className="hidden text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignInButton mode="modal">
            <Button size="sm" className="h-8 rounded-md px-4 font-medium shadow-sm">
              Launch Workspace
            </Button>
          </SignInButton>
        </div>
      </div>
    </header>
  );
}

export function GalaxyInteractiveHeroSection() {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const screenshotEl = screenshotRef.current;
    const heroContentEl = heroContentRef.current;

    if (!screenshotEl || !heroContentEl) return;

    screenshotEl.style.willChange = "transform";
    heroContentEl.style.willChange = "opacity";

    const handleScroll = () => {
      if (!screenshotEl || !heroContentEl) return;
      if (tickingRef.current) return;

      tickingRef.current = true;
      requestAnimationFrame(() => {
        const scrollPosition = window.pageYOffset;
        screenshotEl.style.transform = `translate3d(0, -${scrollPosition * 0.25}px, 0)`;

        const maxScroll = 420;
        const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
        heroContentEl.style.opacity = opacity.toString();
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      screenshotEl.style.willChange = "auto";
      heroContentEl.style.willChange = "auto";
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-black">
      <HeroTopBar />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <HeroSplineBackground />
        </div>

        <div
          ref={heroContentRef}
          className="pointer-events-none absolute left-0 top-0 z-10 flex h-screen w-full items-center justify-start"
        >
          <div className="mx-auto w-full max-w-7xl">
            <HeroContent />
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-[10vh] bg-black pb-14 md:pb-20">
        <ScreenshotSection screenshotRef={screenshotRef} />
      </div>
    </section>
  );
}
