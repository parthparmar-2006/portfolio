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
 *
 * The `route-fade` class is a safety net, not decoration. `initial={{opacity:0}}`
 * is serialised into the SSR markup as `style="opacity:0"`, so if the motion
 * runtime never runs — no JS, a slow phone that is still hydrating, a script
 * error — the entire page stays invisible rather than merely unanimated. The
 * class runs the same fade in pure CSS, so the page is readable on its own and
 * motion only ever takes over something already safe.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      className="route-fade"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
