"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="m-0 flex list-none flex-col gap-6 bg-transparent p-0 pb-6 transition-colors duration-300"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    boxShadow:
                      "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  whileFocus={{
                    scale: 1.03,
                    y: -8,
                    boxShadow:
                      "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  className="group w-full max-w-sm cursor-default select-none rounded-3xl border border-neutral-200 bg-white p-10 shadow-lg shadow-black/5 transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <blockquote className="m-0 p-0">
                    <p className="m-0 leading-relaxed font-normal text-neutral-600 transition-colors duration-300 dark:text-neutral-400">
                      {text}
                    </p>
                    <footer className="mt-6 flex items-center gap-3">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100 transition-all duration-300 ease-in-out group-hover:ring-primary/30 dark:ring-neutral-800"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic leading-5 tracking-tight text-neutral-900 transition-colors duration-300 dark:text-white">
                          {name}
                        </cite>
                        <span className="mt-0.5 text-sm leading-5 tracking-tight text-neutral-500 transition-colors duration-300 dark:text-neutral-500">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-transparent py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 },
        }}
        className="z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-center justify-center">
          <div className="flex justify-center">
            <div className="rounded-full border border-neutral-300 bg-neutral-100/50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600 transition-colors dark:border-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-400">
              Testimonials
            </div>
          </div>

          <h2
            id="testimonials-heading"
            className="mt-6 text-center text-4xl font-extrabold tracking-tight text-neutral-900 transition-colors dark:text-white md:text-5xl"
          >
            What our users say
          </h2>
          <p className="mt-5 max-w-xl text-center text-lg leading-relaxed text-neutral-500 transition-colors dark:text-neutral-400">
            Discover how thousands of teams streamline their operations with our platform.
          </p>
        </div>

        <div
          className="mt-10 flex max-h-185 justify-center gap-6 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default function TestimonialV2() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    return;
  }, [isDark]);

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-white text-neutral-900 transition-colors duration-300 selection:bg-primary selection:text-white dark:bg-neutral-950 dark:text-white ${isDark ? 'dark' : ''}`}
    >
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 z-50 rounded-full border border-neutral-200 bg-white p-3 text-neutral-800 shadow-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <TestimonialsSection />
    </div>
  );
}
