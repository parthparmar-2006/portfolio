import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntry, getSlugs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Mdx } from "@/components/mdx/Mdx";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { LiveDemo } from "@/components/playground/LiveDemo";
import { accentStyle } from "@/lib/utils";

export function generateStaticParams() {
  return getSlugs("playground");
}

export async function generateMetadata({ params }: PageProps<"/playground/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("playground", slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.meta.title,
    description: entry.meta.summary,
    path: `/playground/${slug}`,
    tags: entry.meta.tags,
  });
}

export default async function DemoPage({ params }: PageProps<"/playground/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("playground", slug);
  if (!entry) notFound();

  const { meta, body } = entry;

  return (
    <article style={accentStyle(meta.accent)}>
      <Canvas as="header" className="bg-accent-wash pb-12 pt-10 sm:pt-14">
        <Zone zone="wide">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint"
          >
            <Link href="/playground" className="link-draw">
              Playground
            </Link>
            <span aria-hidden> / </span>
            <span className="text-accent">{meta.tags.join(" · ")}</span>
          </nav>

          <h1 className="mt-7 max-w-[20ch] font-display text-section">{meta.title}</h1>
          <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-ink-muted">{meta.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={meta.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-rule-strong px-5 py-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
            >
              Open full screen ↗
            </a>
            {meta.repoUrl ? (
              <a
                href={meta.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-rule-strong px-5 py-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
              >
                Source ↗
              </a>
            ) : null}
          </div>
        </Zone>
      </Canvas>

      {/* The real deployed project, running. Interactive here — this is the
          page you came to in order to use it. */}
      <Canvas className="bg-accent-wash pb-14">
        <Zone zone="wide">
          <div className="overflow-hidden rounded-2xl border border-rule bg-white shadow-sm">
            <LiveDemo src={meta.demoUrl} title={meta.title} className="h-[36rem] w-full" />
          </div>
          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint">
            Running live from GitHub Pages · use it here or open it full screen
          </p>
        </Zone>
      </Canvas>

      <Canvas className="prose-editorial py-14">
        <Mdx source={body} />
      </Canvas>

      <Canvas className="pb-24">
        <Zone zone="wide">
          <Link href="/playground" className="font-mono text-sm text-ink-muted link-draw">
            ← All experiments
          </Link>
        </Zone>
      </Canvas>
    </article>
  );
}
