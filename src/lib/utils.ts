/** Join class names, dropping falsy values. Keeps conditional classes readable
 *  without pulling in clsx + tailwind-merge for a site this size. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const ACCENT_VARS = {
  rust: { accent: "var(--rust)", tint: "var(--rust-tint)" },
  blue: { accent: "var(--blue)", tint: "var(--blue-tint)" },
  moss: { accent: "var(--moss)", tint: "var(--moss-tint)" },
  amber: { accent: "var(--amber)", tint: "var(--amber-tint)" },
} as const;

export type AccentName = keyof typeof ACCENT_VARS;

/**
 * Returns the inline style that re-points `--accent` for a subtree.
 *
 * Every accent utility (`text-accent`, `bg-accent-tint`, the prose link colour,
 * the focus ring) reads through `--accent`, so setting it on a wrapper re-tints
 * everything inside without a single conditional class name. This is what lets
 * a new project pick a hue from frontmatter.
 */
export function accentStyle(accent: AccentName | undefined) {
  const chosen = ACCENT_VARS[accent ?? "rust"];
  return {
    "--accent": chosen.accent,
    "--accent-tint": chosen.tint,
  } as React.CSSProperties;
}

/** "2026-03-14" → "14 March 2026". Fixed locale so server and client agree. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}
