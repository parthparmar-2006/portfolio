"use client";

import { useCallback } from "react";

/**
 * Tracks the pointer across a card and writes its position to CSS custom
 * properties, which `.card-glow` renders as an accent radial gradient.
 *
 * Deliberately not React state: a mousemove handler that calls `setState` would
 * re-render the card on every frame the pointer moves. Writing straight to the
 * node's inline style skips React entirely and stays on the compositor.
 *
 * No cleanup is needed — the listeners are React props on the element itself.
 */
export function usePointerGlow() {
  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    target.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  return { onPointerMove };
}

/**
 * Wrapper for cards that want the glow. Kept separate from the card components
 * so a server-rendered card only pulls in this small client boundary rather
 * than becoming a client component itself.
 */
export function GlowSurface({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const glow = usePointerGlow();
  return (
    <div className={className} {...glow}>
      {children}
    </div>
  );
}
