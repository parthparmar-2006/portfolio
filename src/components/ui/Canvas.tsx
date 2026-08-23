import { cn } from "@/lib/utils";

/**
 * The layout primitive for the whole site.
 *
 * One CSS grid with named lines. Children pick a zone with a single class
 * instead of each page inventing its own max-width:
 *
 *   bleed  |  wide  |  text  |  wide  |  bleed
 *   full     margin   68ch     margin   full
 *
 * That is what makes full-bleed figures, margin notes and the sticky case
 * study rail possible. Under 1024px the side tracks collapse to zero, so
 * everything falls back to a single column without any per-component
 * breakpoint logic.
 *
 * The grid definition lives in globals.css as `.canvas` — it needs named grid
 * lines, which Tailwind utilities cannot express.
 */
export function Canvas({
  children,
  className,
  as: Component = "div",
  style,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
  /** Usually `accentStyle(...)`, which re-tints the whole section. */
  style?: React.CSSProperties;
  id?: string;
}) {
  return (
    <Component id={id} style={style} className={cn("canvas", className)}>
      {children}
    </Component>
  );
}

/**
 * Places a child into one of the canvas zones.
 *
 * - `text`   68ch reading column — the default
 * - `wide`   text column plus both margins, for grids and card rows
 * - `bleed`  edge to edge, for accent bands and full-bleed imagery
 * - `margin` the right-hand margin only, for side notes; falls back to inline
 *            flow below 1024px
 * - `rail`   the left-hand margin, for marginalia that leads the text
 */
export function Zone({
  children,
  zone = "text",
  className,
  as: Component = "div",
  style,
}: {
  children: React.ReactNode;
  zone?: "text" | "wide" | "bleed" | "margin" | "rail";
  className?: string;
  as?: "div" | "section" | "article" | "header" | "aside" | "ol" | "ul" | "nav";
  style?: React.CSSProperties;
}) {
  return (
    <Component className={cn(`col-${zone}`, className)} style={style}>
      {children}
    </Component>
  );
}
