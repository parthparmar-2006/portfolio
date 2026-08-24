import Link from "next/link";
import { getMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { Eyebrow } from "@/components/ui/Section";
import { DemoPreview } from "@/components/playground/LiveDemo";
import { GlowSurface } from "@/components/ui/PointerGlow";
import { accentStyle } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Playground",
  description:
    "Interactive visualisers — Hamming code error correction and guaranteed CPU scheduling, both running live.",
  path: "/playground",
});

export default function PlaygroundPage() {
  const demos = getMeta("playground");

  return (
    <>
      {/* Opening shape: a full-bleed tinted band with the intent set wide and
          low, rather than the eyebrow/title/lead stack the other indexes use. */}
      <Canvas style={accentStyle("moss")} className="bg-accent-wash pb-16 pt-14 sm:pt-20">
        <Zone zone="wide">
          <Eyebrow>Playground</Eyebrow>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h1 className="max-w-[15ch] font-display text-title">
              Some things you have to watch happen
            </h1>
            <p className="max-w-[46ch] text-lg leading-relaxed text-ink-muted">
              Usually a step that is easy to derive and hard to feel, so I built the version you can
              poke at. Each one is running below: the deployed project itself, not a screenshot.
            </p>
          </div>
        </Zone>
      </Canvas>

      <Canvas className="pb-16 pt-8 sm:pb-24 sm:pt-12">
        <Zone zone="wide">
          <ul className="grid gap-8">
            {demos.map((demo) => (
              <li key={demo.slug} style={accentStyle(demo.accent)}>
                <GlowSurface className="card-glow relative h-full rounded-xl">
                  <article className="relative z-[2] grid h-full overflow-hidden rounded-xl border border-rule bg-panel transition-colors hover:border-accent lg:grid-cols-[1.45fr_1fr]">
                    {/* Display-only here: the card is a link target, and a
                        control you can focus but not see the result of is
                        worse than no control.

                        The iframe is given a real desktop viewport and scaled
                        down, rather than being squeezed — at card width these
                        pages render their narrow layout, which is not what the
                        project actually looks like. */}
                    {/* Ratio, not a fixed height. DemoPreview scales a 1280x900 iframe by
                        100cqw/1280, so the rendered height is always width/1.422 —
                        against a hardcoded h-64 that clipped the bottom 39% of the
                        preview at 640px and half of it at 768px. */}
                    <div className="relative aspect-[1280/900] overflow-hidden border-b border-rule bg-white lg:aspect-auto lg:h-auto lg:border-b-0 lg:border-r">
                      <DemoPreview src={demo.demoUrl} title={`${demo.title} — preview`} />
                      <span className="absolute right-3 top-3 rounded-full border border-rule bg-ground/85 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-muted backdrop-blur-sm">
                        Live
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-7 sm:p-8">
                      <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent">
                        {demo.tags.join(" · ")}
                      </p>
                      <h2 className="mt-3 font-display text-2xl leading-snug">
                        <Link href={`/playground/${demo.slug}`} className="link-draw">
                          {demo.title}
                        </Link>
                      </h2>
                      <p className="mt-2 flex-1 leading-relaxed text-ink-muted">{demo.summary}</p>

                      <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.1em]">
                        <Link href={`/playground/${demo.slug}`} className="text-accent link-draw">
                          Open it →
                        </Link>
                        {demo.repoUrl ? (
                          <a
                            href={demo.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink-faint link-draw"
                          >
                            Source ↗
                          </a>
                        ) : null}
                      </p>
                    </div>
                  </article>
                </GlowSurface>
              </li>
            ))}
          </ul>
        </Zone>
      </Canvas>
    </>
  );
}
