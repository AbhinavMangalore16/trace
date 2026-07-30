"use client"

import React from "react"
import { motion } from "framer-motion"

interface Testimonial {
  text: string
  image: string
  name: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    text: "DominoFlow is the first automation tool that handles dynamic React apps seamlessly. Self-healing DOM targets saved us hundreds of maintenance hours.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sofia Martinez",
    role: "Lead QA Automation Engineer",
  },
  {
    text: "We replaced our brittle Playwright scripts with DominoFlow Cascades. Zero-code setup and sub-second latency for our AI agent pipeline.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Daniel Kim",
    role: "AI Agent Lead",
  },
  {
    text: "The pop-up resolution engine is incredible. Cookie banners and promo modals get handled automatically without writing custom logic.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Emily Carter",
    role: "Data Operations Manager",
  },
  {
    text: "We tested every web scraper on the market — DominoFlow's stealth browser sessions easily bypass detection and keep state across logins.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Luca Rossi",
    role: "SaaS Founder",
  },
  {
    text: "Neon Postgres integration means all our workflow graphs and DOM snapshots persist instantly with zero database maintenance.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Amina Hassan",
    role: "Backend Architect",
  },
  {
    text: "Clerk organization RBAC allowed us to onboard enterprise clients with strict multi-tenant workspace isolation out of the box.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar El-Sayed",
    role: "Head of Product",
  },
  {
    text: "Building custom web scrapers used to take days. With DominoFlow's visual canvas, our team launches new cascades in under 10 minutes.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "James Walker",
    role: "Full Stack Engineer",
  },
  {
    text: "Webhook triggers let us launch complex browser actions directly from our GitHub Actions CI pipeline on every deployment.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Isabella Ferreira",
    role: "DevOps Engineer",
  },
  {
    text: "The reliability is unmatched. Even when target websites update their class names, DominoFlow's self-healing DOM keeps running.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Noah Thompson",
    role: "Growth Operations Lead",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

function TestimonialsColumn(props: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}) {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration ?? 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
        className="m-0 flex list-none flex-col gap-6 bg-transparent p-0 pb-6 transition-colors duration-300"
      >
        {new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? "true" : "false"}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="group w-full max-w-xs cursor-default select-none rounded-3xl border border-white/10 bg-[#0c1020] p-8 shadow-xl hover:border-blue-500/40 transition-all duration-300"
              >
                <blockquote className="m-0 p-0">
                  <p className="m-0 leading-relaxed font-normal text-slate-300 text-sm">
                    "{text}"
                  </p>
                  <footer className="mt-6 flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={`Avatar of ${name}`}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-blue-400 transition-all duration-300"
                    />
                    <div className="flex flex-col">
                      <cite className="not-italic leading-5 font-semibold text-white text-sm font-cal">
                        {name}
                      </cite>
                      <span className="mt-0.5 text-xs leading-5 text-slate-400">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-slate-950 py-24 text-slate-100"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.0,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="container z-10 mx-auto px-4"
      >
        <div className="mx-auto mb-14 flex flex-col items-center justify-center text-center">

          <h2
            id="testimonials-heading"
            className="mt-4 text-center text-4xl font-extrabold tracking-wide text-white font-cal sm:text-5xl"
          >
            What our users say
          </h2>
          <p className="mt-4 max-w-lg text-center text-base text-slate-400 leading-relaxed font-normal">
            Discover how thousands of teams streamline web automation and agent workflows with DominoFlow.
          </p>
        </div>

        <div
          className="mt-8 flex max-h-[640px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={16} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={20} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={18} />
        </div>
      </motion.div>
    </section>
  )
}
