import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import { imageSize, resolveAsset } from "@/lib/covers";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

/**
 * Components available inside every MDX file.
 *
 * Two kinds live here: overrides for plain markdown elements (so an `<a>` in
 * prose becomes a `next/link` and an image gets the Image optimiser), and
 * custom block components a case study can reach for by name.
 *
 * Blocks can opt into a canvas zone — `wide` or `bleed` — because the prose
 * container is itself a canvas grid. That is what lets a figure break out of
 * the reading measure without leaving the flow of the article.
 */

type Zone = "text" | "wide" | "bleed";

const zoneClass: Record<Zone, string> = {
  text: "col-text",
  wide: "col-wide",
  bleed: "col-bleed",
};

/** Internal links prefetch; external links open in a new tab, safely. */
function Anchor({ href = "", children, ...rest }: React.ComponentProps<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

/** A pulled-out aside. `tone="restricted"` is the confidentiality notice. */
export function Callout({
  tone = "note",
  title,
  children,
}: {
  tone?: "note" | "restricted" | "warning";
  title?: string;
  children: React.ReactNode;
}) {
  const label =
    title ?? (tone === "restricted" ? "Publication limits" : tone === "warning" ? "Caveat" : "Note");

  return (
    <aside
      className={cn(
        "col-text my-8 rounded-lg border p-5 text-[0.95rem] leading-relaxed",
        tone === "restricted" ? "border-rule-strong bg-panel" : "border-rule bg-accent-wash",
      )}
    >
      <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </p>
      <div className="[&>*+*]:mt-3 text-ink-muted">{children}</div>
    </aside>
  );
}

/**
 * A side note. Sits in the right-hand margin on desktop and falls back into
 * the flow of the article below 1024px — the `col-margin` class handles that,
 * so this component needs no breakpoint of its own.
 */
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <aside className="col-margin mt-2 border-l-2 border-accent pl-4 text-[0.85rem] leading-relaxed text-ink-muted lg:pl-5">
      {children}
    </aside>
  );
}

/**
 * A figure with a caption.
 *
 * Asset resolution: the real path first, then the same path with an `.svg`
 * extension, which is where the hand-built placeholders live. MDX therefore
 * never has to change — dropping the real `trajectories.png` into
 * `public/media/drone/` silently takes over from the placeholder.
 */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  zone = "text",
  frame = true,
}: {
  src: string;
  alt: string;
  caption?: string;
  /** Only needed to override the real file dimensions. */
  width?: number;
  height?: number;
  priority?: boolean;
  zone?: Zone;
  /** Bleed images usually look better without a border. */
  frame?: boolean;
}) {
  // The extension in MDX is a hint, not a requirement: the base path is what
  // matters, and any real image extension at that path wins over the `.svg`
  // placeholder. Otherwise writing `.png` in MDX would reject a real `.jpg`
  // sitting right next to it, which is exactly what happened.
  const base = src.replace(/\.[a-z0-9]+$/i, "");
  const found = resolveAsset(base);
  const resolved = found ? { src: found, isPlaceholder: found.endsWith(".svg") } : null;

  // Measured from the file, so the reserved box matches what actually loads.
  const measured = resolved ? imageSize(resolved.src) : null;
  const w = width ?? measured?.width ?? 1600;
  const h = height ?? measured?.height ?? 900;

  return (
    <figure className={cn(zoneClass[zone], "my-10")}>
      <div
        className={cn("relative overflow-hidden bg-panel", frame && "rounded-lg border border-rule")}
      >
        {resolved ? (
          <>
            <Image
              src={resolved.src}
              alt={alt}
              width={w}
              height={h}
              priority={priority}
              className="h-auto w-full"
              sizes={zone === "text" ? "(min-width: 1024px) 680px, 100vw" : "100vw"}
            />
            {resolved.isPlaceholder ? (
              <span className="absolute right-3 top-3 rounded-full bg-ground/85 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint backdrop-blur-sm">
                Placeholder
              </span>
            ) : null}
          </>
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="flex aspect-[16/9] flex-col items-center justify-center gap-2 p-6 text-center"
          >
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
              Image pending
            </span>
            <span className="max-w-[46ch] text-sm leading-relaxed text-ink-muted">{alt}</span>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 font-mono text-[0.72rem] leading-relaxed text-ink-faint">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Splits "95%+" into an animated 95 plus a static "%+", so metrics count up
 * wherever they appear rather than only on the home page. Values with no
 * leading number ("Solo", "5 states") render as plain text.
 */
function MetricValue({ value }: { value: string }) {
  // Grouped digits are matched too, so "278,205" counts up as one number
  // instead of animating 278 and pasting ",205" on the end.
  const match = /^([\d,]+(?:\.\d+)?)(.*)$/.exec(value.trim());
  if (!match) return <>{value}</>;
  const numeric = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(numeric)) return <>{value}</>;
  return <AnimatedNumber value={numeric} suffix={match[2]} group={match[1].includes(",")} />;
}

/** Inline row of headline numbers inside a case study. */
export function Metrics({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="col-wide my-12 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="bg-ground p-6">
          <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
            {item.label}
          </dt>
          <dd className="mt-2 font-display text-[2.1rem] leading-none text-accent">
            <MetricValue value={item.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The tradeoff block. Every case study has one — it is the section that
 * separates a project write-up from a portfolio entry.
 */
export function Tradeoff({
  chose,
  over,
  children,
}: {
  chose: string;
  over: string;
  children: React.ReactNode;
}) {
  return (
    <div className="col-wide my-12 overflow-hidden rounded-xl border border-rule">
      <div className="bg-accent-wash px-7 py-6">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
          The decision
        </p>
        <p className="mt-3 font-display text-2xl leading-snug sm:text-[1.7rem]">
          <span className="text-accent">{chose}</span>
          <span className="text-ink-faint"> over </span>
          <span>{over}</span>
        </p>
      </div>
      <div className="bg-panel px-7 py-6 text-ink-muted [&>*+*]:mt-3">{children}</div>
    </div>
  );
}

/**
 * A labelled step diagram. Built from DOM rather than an image export, so it
 * stays sharp, themable, and readable to a screen reader.
 */
export function Flow({ steps }: { steps: { label: string; detail?: string }[] }) {
  return (
    <ol className="col-wide my-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li
          key={step.label}
          className="relative overflow-hidden rounded-lg border border-rule bg-panel p-5"
        >
          <span
            aria-hidden
            className="absolute -right-2 -top-4 font-display text-6xl leading-none text-accent opacity-[0.13]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[0.68rem] tracking-[0.1em] text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-1 font-medium leading-snug">{step.label}</p>
          {step.detail ? (
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.detail}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export const mdxComponents: MDXComponents = {
  a: Anchor,
  img: (props) => (
    // MDX image syntax; sized generously and never blocking.
    <Image
      {...(props as React.ComponentProps<typeof Image>)}
      width={1600}
      height={900}
      className="h-auto w-full rounded-lg border border-rule"
      alt={props.alt ?? ""}
    />
  ),
  Callout,
  Note,
  Figure,
  Metrics,
  Tradeoff,
  Flow,
};
