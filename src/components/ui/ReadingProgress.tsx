"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/**
 * A hairline progress bar pinned under the sticky header.
 *
 * `useScroll` gives a 0–1 motion value that is written straight to `scaleX`,
 * so the bar never triggers a React re-render while scrolling — it is a style
 * update on the compositor. Rendering nothing under reduced motion is
 * deliberate: a bar that tracks scroll *is* the motion, so there is no static
 * version worth keeping.
 */
export function ReadingProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      // Sits exactly under the sticky header; the height comes from the same
      // `--header-h` the header uses, so the two cannot drift apart.
      style={{ scaleX, top: "var(--header-h)" }}
      className="fixed left-0 right-0 z-30 h-[2px] origin-left bg-accent"
    />
  );
}
