import { accentStyle, cn, type AccentName } from "@/lib/utils";
import { Canvas, Zone } from "./Canvas";

/**
 * A page section with its own hue.
 *
 * `accent` sets `--accent` on the wrapper, which re-tints every accent utility
 * inside it — eyebrow, links, rules, hover states — without any child having
 * to know which section it is in.
 */
export function Section({
  eyebrow,
  title,
  lead,
  accent = "rust",
  wash = false,
  wide = false,
  id,
  children,
  className,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  accent?: AccentName;
  /** Fill the section band with the accent tint. */
  wash?: boolean;
  wide?: boolean;
  id?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Canvas
      as="section"
      id={id}
      style={accentStyle(accent)}
      className={cn("py-14 sm:py-28", wash && "bg-accent-wash", className)}
    >
      <Zone zone={wide ? "wide" : "text"}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        {title ? <h2 className="mt-4 font-display text-section">{title}</h2> : null}
        {lead ? (
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-muted">{lead}</p>
        ) : null}
        {children}
      </Zone>
    </Canvas>
  );
}

/** Mono, uppercase, accent-coloured label with a leading rule. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">
      <span aria-hidden className="h-px w-6 bg-accent" />
      {children}
    </p>
  );
}
