import Image from "next/image";
import Link from "next/link";
import type { WorkCardItem } from "@/lib/covers";
import { GlowSurface } from "@/components/ui/PointerGlow";
import { accentStyle, cn } from "@/lib/utils";

/**
 * Cards for the work index.
 *
 * Presentational only — covers are resolved on the server by `lib/covers.ts`
 * and arrive as data, because the index filters on the client and `fs` cannot
 * cross that boundary.
 */

/**
 * The flagship. Deliberately a different shape from every other card: the plan
 * says Algorithmic Arena is the flagship, and the previous layout made it row
 * 01 of four identical rows.
 *
 * Which project gets this is derived from `order`, never hardcoded, so it moves
 * with the content.
 */
export function FeatureCard({ item }: { item: WorkCardItem }) {
  return (
    <article style={accentStyle(item.accent)}>
      <GlowSurface className="card-glow relative rounded-2xl">
      <Link
        href={`/work/${item.slug}`}
        aria-label={`${item.title} — ${item.lens} case study, ${item.year}`}
        className="card-hover group relative z-[2] grid overflow-hidden rounded-2xl border border-rule bg-panel transition-colors hover:border-accent lg:grid-cols-[1.15fr_1fr]"
      >
        <div className="relative overflow-hidden bg-accent-wash">
          {item.coverSrc ? (
            <Image
              src={item.coverSrc}
              alt=""
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="card-media h-full w-full object-cover"
            />
          ) : (
            <div className="aspect-[16/10]" />
          )}
          <span className="absolute left-4 top-4 rounded-full bg-ground/90 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent backdrop-blur-sm">
            Flagship
          </span>
        </div>

        <div className="flex flex-col justify-between gap-6 p-7 sm:p-9">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
              {item.lens} · {item.year}
            </p>
            <h3 className="mt-3 font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.05]">
              <span className="link-draw">{item.title}</span>
            </h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{item.summary}</p>
          </div>

          <div>
            {item.metrics?.length ? (
              <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-5">
                {item.metrics.slice(0, 3).map((metric) => (
                  <div key={metric.label}>
                    <dd className="font-display text-lg leading-none text-accent">
                      {metric.value}
                    </dd>
                    <dt className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-faint">
                      {metric.label}
                    </dt>
                  </div>
                ))}
              </dl>
            ) : null}
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.68rem] text-ink-faint">
              {item.stack.slice(0, 6).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
      </GlowSurface>
    </article>
  );
}

/**
 * Standard card. `wide` gives the first one in a grid a broader crop, so the
 * row is not four equal rectangles — the symmetry was a big part of why the
 * old index read as a template.
 */
export function WorkCard({ item, wide = false }: { item: WorkCardItem; wide?: boolean }) {
  return (
    <article style={accentStyle(item.accent)} className={cn(wide && "sm:col-span-2")}>
      <GlowSurface className="card-glow relative h-full rounded-xl">
      <Link
        href={`/work/${item.slug}`}
        aria-label={`${item.title} — ${item.lens} case study, ${item.year}`}
        className="card-hover group relative z-[2] flex h-full flex-col overflow-hidden rounded-xl border border-rule bg-panel transition-colors hover:border-accent"
      >
        <div className="relative overflow-hidden bg-accent-wash">
          {item.coverSrc ? (
            <Image
              src={item.coverSrc}
              alt=""
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 540px, 100vw"
              className={cn(
                "card-media w-full object-cover",
                wide ? "aspect-[21/9]" : "aspect-[16/10]",
              )}
            />
          ) : (
            <div className="aspect-[16/10]" />
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent">
            {item.lens} · {item.year}
            {item.restricted ? " · Restricted" : ""}
          </p>
          <h3 className="mt-2.5 font-display text-2xl leading-tight">
            <span className="link-draw">{item.title}</span>
          </h3>
          <p className="mt-2 flex-1 leading-relaxed text-ink-muted">{item.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-rule pt-4 font-mono text-[0.66rem] text-ink-faint">
            {item.stack.slice(0, 4).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </Link>
      </GlowSurface>
    </article>
  );
}
