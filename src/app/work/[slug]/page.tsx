import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntry, getHeadings, getNeighbours, getSlugs } from "@/lib/content";
import { resolveCover } from "@/lib/covers";
import { buildMetadata } from "@/lib/seo";
import { Mdx } from "@/components/mdx/Mdx";
import { Metrics } from "@/components/mdx/mdx-components";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { PrevNext } from "@/components/ui/PrevNext";
import { accentStyle } from "@/lib/utils";

/** Every case study is rendered at build time. */
export function generateStaticParams() {
  return getSlugs("work");
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("work", slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.meta.title,
    description: entry.meta.summary,
    path: `/work/${slug}`,
    type: "article",
    tags: entry.meta.stack,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("work", slug);
  if (!entry) notFound();

  const { meta, body } = entry;
  const headings = getHeadings(body);
  const cover = resolveCover(meta);
  const { previous, next } = getNeighbours("work", slug);

  // Restricted projects never render outbound links, even if frontmatter
  // carries them. The guard lives here rather than in the MDX so a future case
  // study cannot forget it.
  const showLinks = !meta.restricted && (meta.repo || meta.demo);

  return (
    <div style={accentStyle(meta.accent)} className="ground-tinted">
      <ReadingProgress />

      {/* ---- Header ------------------------------------------------------ */}
      <Canvas as="header" className="bg-accent-wash pb-14 pt-10 sm:pt-14">
        <Zone zone="wide">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint"
          >
            <Link href="/work" className="link-draw">
              Work
            </Link>
            <span aria-hidden> / </span>
            <span className="text-accent">{meta.lens}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <h1 className="max-w-[16ch] font-display text-title">{meta.title}</h1>
              <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-ink-muted">
                {meta.summary}
              </p>
            </div>

            <dl className="grid gap-5 border-t border-rule-strong pt-6 sm:grid-cols-2 lg:border-t-0 lg:pt-0">
              <MetaItem label="Year" value={meta.year} />
              <MetaItem label="Discipline" value={meta.lens} />
              <div className="sm:col-span-2">
                <MetaItem label="Role" value={meta.role} />
              </div>
              <div className="sm:col-span-2">
                <MetaItem label="Stack" value={meta.stack.join(" · ")} />
              </div>
            </dl>
          </div>

          {showLinks ? (
            <div className="mt-9 flex flex-wrap gap-3">
              {meta.repo ? <OutboundLink href={meta.repo} label="Repository" /> : null}
              {meta.demo ? <OutboundLink href={meta.demo} label="Live demo" /> : null}
            </div>
          ) : null}

          {meta.restricted && meta.restrictionNote ? (
            <p className="mt-9 max-w-[62ch] border-l-2 border-accent pl-4 text-[0.95rem] leading-relaxed text-ink-muted">
              {meta.restrictionNote}
            </p>
          ) : null}
        </Zone>
      </Canvas>

      {/* ---- Cover ------------------------------------------------------- */}
      {cover ? (
        <Canvas className="bg-accent-wash">
          <Zone zone="wide">
            {/* Cropped to a letterbox rather than shown at its native 16:10.
                At full width the untouched aspect ratio was ~715px tall and
                pushed the entire article below a second scroll. */}
            <div className="overflow-hidden rounded-2xl border border-rule bg-panel">
              <Image
                src={cover}
                alt={meta.coverAlt ?? ""}
                width={1600}
                height={1000}
                priority
                sizes="(min-width: 1024px) 1096px, 100vw"
                className="aspect-[16/7] w-full object-cover"
              />
            </div>
          </Zone>
        </Canvas>
      ) : null}

      {/* ---- Metrics ------------------------------------------------------ */}
      {meta.metrics?.length ? (
        <Canvas className="bg-accent-wash pb-16 pt-4">
          <Metrics items={meta.metrics} />
        </Canvas>
      ) : null}

      {/* ---- Body + rail --------------------------------------------------- */}
      <Canvas className="py-16">
        <Zone zone="wide" className="lg:grid lg:grid-cols-[13rem_1fr] lg:gap-x-12">
          <aside className="sticky top-[calc(var(--header-h)+2rem)] hidden self-start lg:block">
            <TableOfContents headings={headings} />
          </aside>

          {/* The article is its own canvas, which is what lets a figure or a
              diagram inside the prose break out of the reading measure. */}
          <div className="canvas canvas-article prose-editorial prose-numbered">
            <Mdx source={body} />
          </div>
        </Zone>
      </Canvas>

      {/* ---- Prev / next ---------------------------------------------------- */}
      <Canvas className="border-t border-rule pb-24 pt-12">
        <Zone zone="wide">
          <PrevNext base="/work" previous={previous} next={next} ariaLabel="More work" />

          <Link href="/work" className="mt-8 inline-block font-mono text-sm text-ink-muted link-draw">
            ← All work
          </Link>
        </Zone>
      </Canvas>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </dt>
      <dd className="mt-1 text-[0.95rem] leading-snug">{value}</dd>
    </div>
  );
}

function OutboundLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-rule-strong px-5 py-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
    >
      {label} ↗
    </a>
  );
}
