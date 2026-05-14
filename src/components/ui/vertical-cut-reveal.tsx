"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VerticalCutRevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  reverse?: boolean;
  transition?: {
    type?: string;
    stiffness?: number;
    damping?: number;
    delay?: number;
  };
  splitBy?: "words" | "characters" | "lines" | string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  containerClassName?: string;
  wordLevelClassName?: string;
  elementLevelClassName?: string;
  autoStart?: boolean;
}

export function VerticalCutReveal({
  children,
  reverse = false,
  transition = {
    type: "spring",
    stiffness: 190,
    damping: 22,
  },
  splitBy = "words",
  staggerDuration = 0.2,
  staggerFrom = "first",
  containerClassName,
  wordLevelClassName,
  elementLevelClassName,
  className,
  ...props
}: VerticalCutRevealProps) {
  const text = typeof children === "string" ? children : React.Children.toArray(children).join(" ");
  const tokens = React.useMemo(() => {
    if (splitBy === "characters") {
      return Array.from(text);
    }

    if (splitBy === "lines") {
      return text.split(/\r?\n/);
    }

    return text.split(splitBy);
  }, [splitBy, text]);

  const getDelay = React.useCallback(
    (index: number) => {
      if (staggerFrom === "last") {
        return (tokens.length - 1 - index) * staggerDuration;
      }

      if (staggerFrom === "center") {
        const center = Math.floor(tokens.length / 2);
        return Math.abs(center - index) * staggerDuration;
      }

      if (typeof staggerFrom === "number") {
        return Math.abs(staggerFrom - index) * staggerDuration;
      }

      if (staggerFrom === "random") {
        return Math.abs(Math.floor(Math.random() * tokens.length) - index) * staggerDuration;
      }

      return index * staggerDuration;
    },
    [staggerDuration, staggerFrom, tokens.length],
  );

  return (
    <span
      className={cn("inline-flex flex-wrap whitespace-pre-wrap", containerClassName, className)}
      {...props}
    >
      <span className="sr-only">{text}</span>
      {tokens.map((token, index) => (
        <span key={`${token}-${index}`} aria-hidden="true" className={cn("inline-flex overflow-hidden", wordLevelClassName)}>
          <motion.span
            initial={{ y: reverse ? "-100%" : "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...transition, delay: getDelay(index) }}
            className={cn("whitespace-pre-wrap inline-block", elementLevelClassName)}
          >
            {token}
          </motion.span>
          {splitBy === "words" && index < tokens.length - 1 ? <span> </span> : null}
          {splitBy === "lines" && index < tokens.length - 1 ? <br /> : null}
        </span>
      ))}
    </span>
  );
}

export default VerticalCutReveal;
