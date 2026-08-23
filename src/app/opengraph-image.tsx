import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Site-wide OG card. Every route without its own image falls back to this. */
export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: "Backend and systems engineer who also builds AI.",
    subtitle:
      "Sandboxed execution of untrusted code · control under partial observability · metrics with context.",
    footer: "parthparmar",
    accent: "rust",
  });
}
