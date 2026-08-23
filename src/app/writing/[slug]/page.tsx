import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntry, getHeadings, getNeighbours, getSlugs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Mdx } from "@/components/mdx/Mdx";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { PrevNext } from "@/components/ui/PrevNext";
import { profile, siteUrl } from "@/data/profile";
import { accentStyle, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getSlugs("writing");
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.meta.title,
    description: entry.meta.summary,
    path: `/writing/${slug}`,
    type: "article",
    publishedTime: entry.meta.date,
    tags: entry.meta.tags,
  });
}

export default async function PostPage({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  if (!entry) notFound();

  const { meta, body } = entry;
  const headings = getHeadings(body);
  const { previous, next } = getNeighbours("writing", slug);

  // Structured data so the post is eligible for article rich results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
    mainEntityOfPage: `${siteUrl}/writing/${slug}`,
  };

  return (
    <div style={accentStyle(meta.accent)}>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Canvas as="header" className="bg-accent-wash pb-14 pt-10 sm:pt-14">
        <Zone zone="wide">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint"
          >
            <Link href="/writing" className="link-draw">
              Writing
            </Link>
            <span aria-hidden> / </span>
            <time dateTime={meta.date} className="text-accent">
              {formatDate(meta.date)}
            </time>
          </nav>

          <h1 className="mt-8 max-w-[20ch] font-display text-title">{meta.title}</h1>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-ink-muted">{meta.summary}</p>

          <p className="mt-6 flex flex-wrap items-center gap-x-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
            <span>{meta.readingTime} min read</span>
            <span className="text-accent">{meta.tags.join(" · ")}</span>
          </p>
        </Zone>
      </Canvas>

      <Canvas className="py-16">
        <Zone zone="wide" className="lg:grid lg:grid-cols-[13rem_1fr] lg:gap-x-12">
          <aside className="sticky top-[calc(var(--header-h)+2rem)] hidden self-start lg:block">
            <TableOfContents headings={headings} />
          </aside>

          <div className="canvas canvas-article prose-editorial prose-numbered">
            <Mdx source={body} />
          </div>
        </Zone>
      </Canvas>

      <Canvas className="border-t border-rule pb-24 pt-12">
        <Zone zone="wide">
          <PrevNext
            base="/writing"
            previous={previous}
            next={next}
            labels={{ previous: "Newer", next: "Older" }}
            ariaLabel="More writing"
          />

          <Link
            href="/writing"
            className="mt-8 inline-block font-mono text-sm text-ink-muted link-draw"
          >
            ← All writing
          </Link>
        </Zone>
      </Canvas>
    </div>
  );
}
