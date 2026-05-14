"use client";

import { type ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TimelineContentProps = ComponentPropsWithoutRef<typeof motion.div> & {
  as?: "div" | "p" | "section" | "span" | "article";
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
  customVariants?: Record<string, unknown>;
};

export function TimelineContent({
  as = "div",
  className,
  children,
  animationNum: _animationNum,
  timelineRef: _timelineRef,
  customVariants: _customVariants,
  ...props
}: TimelineContentProps) {
  const Component = as as keyof JSX.IntrinsicElements;

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...props}
    >
      <Component>{children}</Component>
    </motion.div>
  );
}
