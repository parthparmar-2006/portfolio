import { cn } from "@/lib/utils";

/**
 * Embeds a deployed demo in an iframe.
 *
 * These are real projects hosted on GitHub Pages rather than components living
 * in this repo, so the honest way to show them is to run the actual thing. It
 * also means they stay correct when the project is updated — nothing here has
 * to be kept in sync.
 *
 * `sandbox` grants scripts and same-origin so the demo works, and nothing
 * else: no top-level navigation, no popups, no form submission elsewhere.
 * `loading="lazy"` keeps the index from opening two connections before the
 * cards are near the viewport.
 *
 * Note there is deliberately no width or height in the base classes. `cn` only
 * concatenates — it does not resolve Tailwind conflicts — so a `w-full` here
 * silently beat the `w-[1280px]` a caller passed, and the preview rendered at
 * card width instead of a desktop viewport.
 */
export function LiveDemo({
  src,
  title,
  className,
  style,
  interactive = true,
}: {
  src: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
  /** Previews are display-only; the full page lets you use it. */
  interactive?: boolean;
}) {
  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
      referrerPolicy="no-referrer"
      style={style}
      tabIndex={interactive ? undefined : -1}
      aria-hidden={interactive ? undefined : true}
      className={cn("block border-0 bg-white", !interactive && "pointer-events-none", className)}
    />
  );
}

/** The viewport width previews are rendered at before being scaled down. */
export const PREVIEW_WIDTH = 1280;

/**
 * Renders the demo at a real desktop viewport, then scales it to whatever the
 * card is.
 *
 * The scale comes from `cqw` — container query units — so it stays correct at
 * every breakpoint without measuring anything in JavaScript. Squeezing the
 * iframe itself instead would make these pages render their narrow layout,
 * which is not what the project actually looks like.
 */
export function DemoPreview({ src, title }: { src: string; title: string }) {
  return (
    <div className="@container absolute inset-0 overflow-hidden bg-white">
      <LiveDemo
        src={src}
        title={title}
        interactive={false}
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: PREVIEW_WIDTH,
          height: 900,
          // Dividing by a unitless number yields a length, which scale()
          // rejects; dividing by a length yields the number it wants.
          transform: `scale(calc(100cqw / ${PREVIEW_WIDTH}px))`,
        }}
      />
    </div>
  );
}
