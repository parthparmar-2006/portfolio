import Link from "next/link";
import { GlowSurface } from "@/components/ui/PointerGlow";
import { accentStyle, type AccentName } from "@/lib/utils";

/**
 * A card with a typographic panel instead of an image.
 *
 * Writing and playground entries have no artwork and are not going to get any,
 * so the alternative was rows of grey text — which is what the home page had.
 *
 * The panel used to carry a large "01"/"02". A sequence number tells a reader
 * nothing: it is not a rank, not a date, and not a subject. It is now the
 * entry's own subject set large and bled off the right edge, so the panel
 * carries meaning rather than decoration.
 *
 * Deliberately not the live iframe used on /playground itself. Two
 * cross-origin frames on the home page would cost real time on the one route
 * where load matters most.
 */
export function TileCard({
  href,
  panelText,
  eyebrow,
  title,
  summary,
  footer,
  accent,
}: {
  href: string;
  /** The subject, set large in the panel. Two or three words at most. */
  panelText: string;
  eyebrow: string;
  title: string;
  summary: string;
  footer?: string;
  accent: AccentName;
}) {
  return (
    <article style={accentStyle(accent)} className="h-full min-w-0">
      <GlowSurface className="card-glow relative h-full min-w-0 rounded-xl">
        <Link
          href={href}
          aria-label={title}
          className="relative z-[2] flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-rule bg-panel transition-colors hover:border-accent"
        >
          <div className="relative flex h-24 min-w-0 shrink-0 items-center overflow-hidden bg-accent-wash">
            {/* Absolutely positioned, not a flex child. The text is decorative and
                deliberately `whitespace-nowrap` so it bleeds off the right edge —
                but in flow that gave the card a ~443px min-content width, and a
                grid item's default `min-width: auto` resolves to exactly that, so
                the home page scrolled sideways on every phone (461px of content in
                a 375px viewport). Out of flow it contributes nothing to intrinsic
                sizing, and overflow-hidden above still clips it the same way. */}
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap pl-5 font-display text-[2.6rem] leading-none text-accent/70"
            >
              {panelText}
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--accent) 1px, transparent 1px), linear-gradient(to bottom, var(--accent) 1px, transparent 1px)",
                backgroundSize: "2.5rem 2.5rem",
                opacity: 0.28,
                maskImage: "linear-gradient(to bottom right, black, transparent 75%)",
              }}
            />
            {/* Fades the oversized text into the card edge so the bleed reads
                as deliberate rather than clipped. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[var(--accent-tint)]"
            />
          </div>

          <div className="flex flex-1 flex-col p-6">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-accent">
              {eyebrow}
            </p>
            <h3 className="mt-2.5 font-display text-xl leading-snug">
              <span className="link-draw">{title}</span>
            </h3>
            <p className="mt-2 flex-1 leading-relaxed text-ink-muted">{summary}</p>
            {footer ? (
              <p className="mt-4 border-t border-rule pt-3 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ink-faint">
                {footer}
              </p>
            ) : null}
          </div>
        </Link>
      </GlowSurface>
    </article>
  );
}
