import Link from "next/link";
import type { WritingMeta } from "@/lib/content";
import { GlowSurface } from "@/components/ui/PointerGlow";
import { accentStyle, cn, formatDate } from "@/lib/utils";

/**
 * Cards for the writing index.
 *
 * The cover is typographic rather than an image: an accent-tinted panel with
 * the entry's index numeral set enormous. Posts do not have artwork and are not
 * going to get any, so the alternative was another list of grey text rows —
 * which is exactly what this index used to be. Same device as the `Flow`
 * numerals, at a size where it becomes the illustration.
 */
export function PostCard({
  post,
  index,
  featured = false,
}: {
  post: WritingMeta;
  index: number;
  featured?: boolean;
}) {
  const numeral = String(index + 1).padStart(2, "0");

  return (
    <article style={accentStyle(post.accent)} className="h-full">
      <GlowSurface className="card-glow relative h-full rounded-xl">
        <Link
          href={`/writing/${post.slug}`}
          aria-label={`${post.title} — ${post.readingTime} minute read`}
          className={cn(
            "relative z-[2] flex h-full overflow-hidden rounded-xl border border-rule bg-panel transition-colors hover:border-accent",
            featured ? "flex-col lg:flex-row" : "flex-col",
          )}
        >
          <div
            className={cn(
              "relative flex shrink-0 items-end overflow-hidden bg-accent-wash",
              featured ? "h-40 lg:h-auto lg:w-[38%]" : "h-28",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "font-display leading-[0.78] text-accent",
                featured
                  ? "px-6 pb-4 text-[7rem] lg:text-[9rem]"
                  : "px-5 pb-2 text-[4.5rem]",
              )}
            >
              {numeral}
            </span>
            {/* Hairline grid, so the panel reads as a designed ground rather
                than as flat colour behind a number. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--accent) 1px, transparent 1px), linear-gradient(to bottom, var(--accent) 1px, transparent 1px)",
                backgroundSize: "3rem 3rem",
                maskImage: "linear-gradient(to bottom right, black, transparent 70%)",
              }}
            />
          </div>

          <div className={cn("flex flex-1 flex-col", featured ? "p-7 sm:p-9" : "p-6")}>
            <p className="flex flex-wrap items-center gap-x-3 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-faint">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime} min</span>
            </p>

            <h2
              className={cn(
                "mt-3 font-display leading-tight",
                featured ? "text-[clamp(1.7rem,2.6vw,2.4rem)]" : "text-xl",
              )}
            >
              <span className="link-draw">{post.title}</span>
            </h2>

            <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{post.summary}</p>

            <ul className="mt-5 flex flex-wrap gap-2 border-t border-rule pt-4">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-rule px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-faint"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </Link>
      </GlowSurface>
    </article>
  );
}
