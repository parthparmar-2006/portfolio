"use client";

import { useReducedMotion } from "motion/react";

/**
 * Load-time headline reveal: each line rises into place behind a clip edge, so
 * the motion reads as typesetting rather than a fade-in.
 *
 * The text is split on explicit line breaks the caller supplies rather than on
 * measured wrapping — splitting by rendered line would need a layout pass, and
 * getting it wrong mid-word is far worse than a slightly coarser animation.
 *
 * Every line is present in the server HTML; the animation only moves what is
 * already there, so nothing depends on JavaScript to be readable.
 */
export function RevealText({
  lines,
  className,
  stagger = 0.09,
}: {
  lines: string[];
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <span className={className}>
      {lines.map((line, index) => (
        // overflow-hidden is the clip edge the line rises into.
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <span
            className={reduced ? "inline-block" : "text-rise"}
            style={reduced ? undefined : { animationDelay: `${0.12 + index * stagger}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
