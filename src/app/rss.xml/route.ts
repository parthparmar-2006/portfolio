import { getEntries } from "@/lib/content";
import { profile, siteUrl } from "@/data/profile";

/**
 * RSS 2.0 feed for /writing.
 *
 * A route handler rather than a library: the feed is a dozen lines of XML and
 * every feed generator on npm is a dependency plus a config file for the same
 * output. `force-static` means it is generated once at build time and served
 * as a file.
 */
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getEntries("writing");
  const feedUrl = new URL("/rss.xml", siteUrl).toString();

  const items = posts
    .map((post) => {
      const url = new URL(`/writing/${post.meta.slug}`, siteUrl).toString();
      return `    <item>
      <title>${escapeXml(post.meta.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.meta.summary)}</description>
      ${post.meta.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(profile.name)} — Writing</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(profile.bioShort)}</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
