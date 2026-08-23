"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Route transition.
 *
 * `template.tsx` rather than `layout.tsx` because a template remounts on every
 * navigation — which is exactly what makes the enter animation re-run. A layout
 * persists, so the same markup there would animate once and never again.
 *
 * Opacity only: no translate, no scale. Anything that moves layout during a
 * route change risks shifting content under the reader and shows up as CLS.
 * 120ms is short enough that it reads as a settle rather than a transition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
