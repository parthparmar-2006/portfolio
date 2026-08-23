import { notFound } from "next/navigation";
import { getEntry, getSlugs } from "@/lib/content";
import { clamp, OG_CONTENT_TYPE, OG_SIZE, renderOgImage, type OgAccent } from "@/lib/og";
import { formatDate } from "@/lib/utils";

export const alt = "Article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getSlugs("writing");
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  if (!entry) notFound();

  return renderOgImage({
    eyebrow: "Writing",
    title: entry.meta.title,
    subtitle: clamp(entry.meta.summary),
    footer: `${formatDate(entry.meta.date)} · ${entry.meta.readingTime} min read`,
    accent: entry.meta.accent as OgAccent,
  });
}
