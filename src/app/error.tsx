"use client";

import Link from "next/link";
import { Canvas, Zone } from "@/components/ui/Canvas";

/**
 * Route-level error boundary. Must be a client component — React needs to
 * catch the error during render on the client and offer a retry.
 *
 * `reset()` re-renders the segment without a full page reload, which recovers
 * from a transient failure without losing scroll position or app state.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Canvas className="py-28 sm:py-36">
      <Zone zone="wide">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent">
          Runtime error
        </p>
        <h1 className="mt-5 max-w-[18ch] font-display text-section">
          Something on this page threw
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
          Not your fault. Try again — and if it keeps happening, I would genuinely like to know.
        </p>

        {/* The digest is the only handle on a production error, since React
            strips the message in production builds. */}
        {error.digest ? (
          <p className="mt-4 font-mono text-[0.72rem] text-ink-faint">digest: {error.digest}</p>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-ink px-6 py-2.5 text-[0.95rem] text-ground transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <Link href="/" className="font-mono text-sm text-ink-muted link-draw">
            Back home
          </Link>
        </div>
      </Zone>
    </Canvas>
  );
}
