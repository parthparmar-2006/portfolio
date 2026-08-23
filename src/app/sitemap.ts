import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";
import { getMeta } from "@/lib/content";
import { nav } from "@/data/nav";

/**
 * Native App Router sitemap — no `next-sitemap` dependency needed. Content
 * routes are derived from the MDX collections, so a new case study appears in
 * the sitemap without anyone remembering to add it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl).toString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), priority: 1, changeFrequency: "monthly" },
    ...nav.map((item) => ({
      url: url(item.href),
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ];

  const work = getMeta("work").map((item) => ({
    url: url(`/work/${item.slug}`),
    priority: 0.9,
    changeFrequency: "yearly" as const,
  }));

  const writing = getMeta("writing").map((post) => ({
    url: url(`/writing/${post.slug}`),
    lastModified: new Date(post.date),
    priority: 0.7,
    changeFrequency: "yearly" as const,
  }));

  const playground = getMeta("playground").map((demo) => ({
    url: url(`/playground/${demo.slug}`),
    priority: 0.6,
    changeFrequency: "yearly" as const,
  }));

  return [...staticRoutes, ...work, ...writing, ...playground];
}
