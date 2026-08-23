import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { WorkMeta } from "./content";

/**
 * Resolves a case study's cover image on the server.
 *
 * Same rule as `Figure` in the MDX components: the real file wins, the
 * hand-built SVG placeholder at the same path fills in, and nothing has to be
 * edited when the real asset arrives.
 *
 * With no `cover` in frontmatter it falls back to a path derived from the slug,
 * so a new case study gets artwork by dropping a file into
 * `public/media/covers/` — no frontmatter change, which keeps "adding a project
 * is one MDX file" true.
 *
 * This lives outside the card components because the work index filters on the
 * client, and `fs` cannot cross that boundary. The page resolves covers once
 * and passes the result down as data.
 */
export function resolveCover(meta: WorkMeta): string | null {
  const publicDir = path.join(process.cwd(), "public");
  const candidates = meta.cover
    ? [meta.cover, meta.cover.replace(/\.(png|jpg|jpeg|webp|avif)$/i, ".svg")]
    : [`/media/covers/${meta.slug}.png`, `/media/covers/${meta.slug}.svg`];

  return candidates.find((candidate) => fs.existsSync(path.join(publicDir, candidate))) ?? null;
}

/**
 * Resolves any asset by the same rule: the real file first, the `.svg`
 * placeholder next, then null.
 *
 * The portrait used to be hardcoded to `portrait.svg` in two components, which
 * quietly broke the "drop the real file in and it takes over" promise for the
 * one asset most likely to be replaced first.
 */
export function resolveAsset(basePath: string, extensions = ["jpg", "jpeg", "png", "webp"]): string | null {
  const publicDir = path.join(process.cwd(), "public");
  const candidates = [...extensions.map((ext) => `${basePath}.${ext}`), `${basePath}.svg`];
  return candidates.find((candidate) => fs.existsSync(path.join(publicDir, candidate))) ?? null;
}

/** Does this path exist under /public? Used to show a download only when the
 *  file is actually there, rather than shipping a link that 404s. */
export function publicFileExists(publicPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}

/**
 * Reads an image's real pixel dimensions from its header.
 *
 * `next/image` needs width and height to reserve space before the file loads.
 * Hardcoding a guess in MDX is how you get layout shift: the supplied
 * screenshots are ~1.9:1, and the 16:9 default would have reserved a box of the
 * wrong height and then jumped when the real image arrived.
 *
 * Only the header is parsed — a few dozen bytes, at build time, no decoding.
 */
export function imageSize(publicPath: string): { width: number; height: number } | null {
  const file = path.join(process.cwd(), "public", publicPath);
  if (!fs.existsSync(file)) return null;

  const buf = fs.readFileSync(file);

  // PNG: IHDR is always the first chunk, width/height at fixed offsets.
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG: walk the marker segments to the start-of-frame, which carries size.
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) {
        i += 1;
        continue;
      }
      const marker = buf[i + 1];
      const isStartOfFrame =
        marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isStartOfFrame) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
    return null;
  }

  // WebP: a RIFF container. The canvas size lives in whichever of the three
  // chunk types the encoder produced, each storing it differently.
  if (buf.length > 30 && buf.toString("latin1", 0, 4) === "RIFF" && buf.toString("latin1", 8, 12) === "WEBP") {
    const chunk = buf.toString("latin1", 12, 16);
    if (chunk === "VP8X") {
      return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
    }
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    return null;
  }

  // SVG: prefer the viewBox, since width/height are often percentages.
  const head = buf.subarray(0, 1024).toString("utf8");
  const viewBox = /viewBox=["']\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)/.exec(head);
  if (viewBox) {
    return { width: Math.round(Number(viewBox[1])), height: Math.round(Number(viewBox[2])) };
  }

  return null;
}

/** A case study plus its resolved cover, ready to cross to the client. */
export type WorkCardItem = WorkMeta & { coverSrc: string | null };

export function withCovers(items: WorkMeta[]): WorkCardItem[] {
  return items.map((item) => ({ ...item, coverSrc: resolveCover(item) }));
}
