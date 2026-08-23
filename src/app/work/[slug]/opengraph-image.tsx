import { notFound } from "next/navigation";
import { getEntry, getSlugs } from "@/lib/content";
import { clamp, OG_CONTENT_TYPE, OG_SIZE, renderOgImage, type OgAccent } from "@/lib/og";

export const alt = "Case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** One card per case study, generated at build time alongside the page. */
export function generateStaticParams() {
  return getSlugs("work");
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry("work", slug);
  if (!entry) notFound();

  return renderOgImage({
    eyebrow: `${entry.meta.lens} · ${entry.meta.year}`,
    title: entry.meta.title,
    subtitle: clamp(entry.meta.summary),
    footer: entry.meta.stack.slice(0, 4).join(" · "),
    accent: entry.meta.accent as OgAccent,
  });
}
