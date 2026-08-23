import { ImageResponse } from "next/og";

/**
 * Shared Open Graph card renderer.
 *
 * `ImageResponse` renders a subset of flexbox to a PNG at build time. Two
 * constraints matter: every element needs an explicit `display: flex`, and CSS
 * custom properties do not resolve — so the palette is repeated here as literal
 * values rather than read from globals.css.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const PALETTE = {
  ground: "#F7F1E6",
  panel: "#EFE6D7",
  ink: "#2B2620",
  muted: "#6B6155",
  rust: "#9A4A1E",
  blue: "#31479E",
  moss: "#2F6B47",
  amber: "#8A5E13",
} as const;

export type OgAccent = keyof Pick<typeof PALETTE, "rust" | "blue" | "moss" | "amber">;

export function renderOgImage({
  eyebrow,
  title,
  subtitle,
  footer,
  accent = "rust",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  footer: string;
  accent?: OgAccent;
}) {
  const accentColor = PALETTE[accent];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PALETTE.ground,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Accent bar down the left edge — the card's only decoration. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 16,
            display: "flex",
            backgroundColor: accentColor,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: accentColor,
            }}
          >
            {eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: title.length > 46 ? 62 : 76,
              lineHeight: 1.06,
              color: PALETTE.ink,
              maxWidth: 940,
            }}
          >
            {title}
          </div>

          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: 28,
                lineHeight: 1.4,
                color: PALETTE.muted,
                maxWidth: 880,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${PALETTE.panel}`,
            paddingTop: 26,
            fontSize: 24,
            color: PALETTE.muted,
          }}
        >
          <div style={{ display: "flex" }}>{footer}</div>
          <div style={{ display: "flex", color: PALETTE.ink }}>Parth Parmar</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

/** Trim a summary so it cannot overflow the card. */
export function clamp(text: string, max = 130): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}
