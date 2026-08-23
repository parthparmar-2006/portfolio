"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Fade-and-rise on scroll into view.
 *
 * `useReducedMotion` is read at runtime rather than relying only on the CSS
 * media query, because these transforms are driven by JavaScript and CSS
 * cannot cancel them. When the user prefers reduced motion the element simply
 * renders in place.
 *
 * `viewport={{ once: true }}` means it animates the first time only — content
 * that re-animates every time you scroll past is exhausting to read.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

/** Staggers direct children of a list. Each child should be a `Reveal`-less
 *  element; the delay is applied here by index. */
export function RevealGroup({
  children,
  className,
  step = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
}) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Reveal key={i} delay={i * step}>
              {child}
            </Reveal>
          ))
        : children}
    </div>
  );
}
