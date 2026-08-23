import type { Metadata } from "next";
import { profile, siteUrl } from "@/data/profile";

/**
 * One place that builds page metadata, so title format, OG tags, Twitter cards
 * and canonical URLs stay consistent across every route.
 *
 * OG images are generated per route by an `opengraph-image.tsx` file, which
 * Next picks up by convention — this helper only has to set the canonical URL
 * and let that convention fill in the image.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
  tags,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}): Metadata {
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: tags,
    openGraph: {
      title,
      description,
      url,
      siteName: profile.name,
      type,
      locale: "en_IN",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@ParthParmar2006",
    },
  };
}
