import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

/**
 * Local MDX content collections.
 *
 * The hard requirement from the plan: adding project #5, #6, #7 must be a
 * single MDX file plus assets. Nothing here enumerates projects — the file
 * system is the index, so dropping `src/content/work/foo.mdx` in place is the
 * entire operation. Route params, the /work list, the sitemap and the RSS feed
 * all derive from these functions.
 */

export const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export type Collection = "work" | "writing" | "playground";

/** Accent hue assigned per entry, so scrolling the site feels varied. */
export type Accent = "rust" | "blue" | "moss" | "amber";

type BaseMeta = {
  slug: string;
  title: string;
  summary: string;
  accent: Accent;
  draft?: boolean;
};

export type WorkMeta = BaseMeta & {
  /** Filter facet on /work. */
  lens: "Systems" | "AI" | "Data";
  year: string;
  /** Month-level span, e.g. "Feb 2026 — May 2026". Used on the résumé, where
   *  a bare year reads as vaguer than the dated rows around it. */
  period?: string;
  /** Résumé bullets. Deliberately separate from the case study's prose: one is
   *  scanned against a job description, the other is read. */
  highlights?: string[];
  /** Sort key — lower sorts first. The flagship is 1. */
  order: number;
  role: string;
  stack: string[];
  /** Headline numbers rendered as animated numerals on the case study. */
  metrics: { value: string; label: string }[];
  repo?: string;
  demo?: string;
  cover?: string;
  coverAlt?: string;
  /**
   * True when the project is under a publication restriction. Rendering uses
   * this to show the restriction notice and to suppress repo links even if one
   * were present in frontmatter.
   */
  restricted?: boolean;
  restrictionNote?: string;
};

export type WritingMeta = BaseMeta & {
  date: string;
  tags: string[];
  /** Minutes, computed from the body rather than declared. */
  readingTime: number;
};

export type PlaygroundMeta = BaseMeta & {
  /** Deployed URL — these are real projects, embedded live rather than
   *  reimplemented as components inside this repo. */
  demoUrl: string;
  repoUrl?: string;
  tags: string[];
};

export type MetaFor<C extends Collection> = C extends "work"
  ? WorkMeta
  : C extends "writing"
    ? WritingMeta
    : PlaygroundMeta;

export type Entry<C extends Collection> = {
  meta: MetaFor<C>;
  body: string;
};

function collectionDir(collection: Collection) {
  return path.join(CONTENT_ROOT, collection);
}

function readFilenames(collection: Collection): string[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

/** ~220 wpm on prose, floored at one minute. */
function estimateReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function parseFile<C extends Collection>(collection: C, filename: string): Entry<C> {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(collectionDir(collection), filename), "utf8");
  const { data, content } = matter(raw);

  const meta = {
    ...data,
    slug,
    ...(collection === "writing" ? { readingTime: estimateReadingTime(content) } : {}),
  } as MetaFor<C>;

  return { meta, body: content };
}

/** Drafts are visible in `next dev` and hidden in production builds. */
function isVisible(meta: BaseMeta): boolean {
  return !meta.draft || process.env.NODE_ENV === "development";
}

export function getEntries<C extends Collection>(collection: C): Entry<C>[] {
  const entries = readFilenames(collection)
    .map((f) => parseFile(collection, f))
    .filter((e) => isVisible(e.meta));

  if (collection === "writing") {
    entries.sort(
      (a, b) =>
        new Date((b.meta as WritingMeta).date).getTime() -
        new Date((a.meta as WritingMeta).date).getTime(),
    );
  } else if (collection === "work") {
    entries.sort((a, b) => (a.meta as WorkMeta).order - (b.meta as WorkMeta).order);
  } else {
    entries.sort((a, b) => a.meta.title.localeCompare(b.meta.title));
  }

  return entries;
}

export function getMeta<C extends Collection>(collection: C): MetaFor<C>[] {
  return getEntries(collection).map((e) => e.meta);
}

export function getEntry<C extends Collection>(
  collection: C,
  slug: string,
): Entry<C> | null {
  const file = `${slug}.mdx`;
  const full = path.join(collectionDir(collection), file);
  if (!fs.existsSync(full)) return null;
  const entry = parseFile(collection, file);
  return isVisible(entry.meta) ? entry : null;
}

/** Feeds `generateStaticParams` so every entry is statically rendered. */
export function getSlugs(collection: Collection): { slug: string }[] {
  return getEntries(collection).map((e) => ({ slug: e.meta.slug }));
}

export type Heading = { id: string; text: string; level: 2 | 3 };

/**
 * Pulls the heading outline out of an MDX body for the table of contents.
 *
 * The IDs have to match the ones `rehype-slug` puts on the rendered headings,
 * or every TOC link is dead. Using the same `github-slugger` it uses — with a
 * fresh instance per document, because the slugger dedupes statefully — is what
 * guarantees they agree.
 *
 * Fenced code blocks are skipped so a `# comment` inside a snippet never
 * becomes a heading.
 */
export function getHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let insideFence = false;

  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    // Strip inline markdown so the slug matches the rendered text content.
    const text = match[2].replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    headings.push({
      level: match[1].length as 2 | 3,
      text,
      id: slugger.slug(text),
    });
  }

  return headings;
}

/** Previous / next within a collection, for end-of-article navigation. */
export function getNeighbours<C extends Collection>(collection: C, slug: string) {
  const all = getEntries(collection);
  const index = all.findIndex((e) => e.meta.slug === slug);
  return {
    previous: index > 0 ? all[index - 1].meta : null,
    next: index >= 0 && index < all.length - 1 ? all[index + 1].meta : null,
  };
}
