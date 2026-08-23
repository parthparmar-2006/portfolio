"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
} from "motion/react";

/**
 * Counts a metric up when it scrolls into view.
 *
 * The number is rendered as text on the server first, so it is present for
 * search engines and for anyone with JavaScript off — the animation only
 * replaces the value once it is on screen. With reduced motion, it never
 * animates at all.
 */
export function AnimatedNumber({
  value,
  suffix = "",
  decimals,
  group = false,
  className,
}: {
  value: number;
  suffix?: string;
  /** Defaults to however many decimals the target value has. */
  decimals?: number;
  /** Thousands separators, for counts large enough to need them. */
  group?: boolean;
  className?: string;
}) {
  const places = decimals ?? (String(value).split(".")[1]?.length ?? 0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {group
        ? display.toLocaleString("en-GB", {
            minimumFractionDigits: places,
            maximumFractionDigits: places,
          })
        : display.toFixed(places)}
      {suffix}
    </span>
  );
}
