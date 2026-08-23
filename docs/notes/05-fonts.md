# 05 — Fonts

## What changed

| File | Change |
|---|---|
| `src/app/layout.tsx` | Geist ×2 → **Fraunces** (display), **Inter** (body), **JetBrains Mono** (code/metrics) |
| `src/app/globals.css` | `@theme inline` block mapping the next/font variables onto Tailwind's font tokens |
| `src/app/page.tsx` | temporary type specimen — two headings, same font, different axis settings |

Build downloads 16 `.woff2` files into `.next/static/media/`. Nothing is fetched from Google at runtime.

---

## Variable fonts and axes

A variable font is **one file containing a continuous design space**, not a family of separate weights.

Fraunces exposes four axes:

| Axis | Range | What it does |
|---|---|---|
| `wght` | 100–900 | weight — continuous, so `437` is a valid value |
| `opsz` | optical size | real typefaces are cut differently for headlines vs body: display cuts have tighter spacing and finer hairlines, text cuts open up and thicken. This axis does that per size. |
| `SOFT` | 0–100 | rounds the terminals |
| `WONK` | 0 or 1 | swaps in the quirky alternate glyphs — slanted `e`, curled `g` |

**Lowercase axis tags are registered in the OpenType spec** (`wght`, `wdth`, `ital`, `slnt`, `opsz`).
**Uppercase tags are custom to that typeface.** So `SOFT` and `WONK` exist only in Fraunces. That
casing rule is the actual convention, not a style choice.

Why it matters here: four static weights = four files. The variable file is one download and gives the
whole range *plus* the axes — which is how we get authority and playfulness out of a single face,
tunable per element.

Set them with `font-variation-settings`:

```tsx
style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
```

(Inline for now; becomes utility classes once the design settles.)

---

## `font-display` — FOIT vs FOUT

While a webfont downloads, the browser has to render *something*. `font-display` decides.

- **`block`** (roughly the default): hide the text up to ~3s → **FOIT**, flash of invisible text. The
  content is in the HTML and the user sees nothing.
- **`swap`** (what we set): render immediately in the fallback, swap when the real font arrives →
  **FOUT**, flash of unstyled text.

`swap` is correct for a content site — readable in the wrong font beats unreadable. It's also what
Lighthouse's "ensure text remains visible during webfont load" audit checks.

### The CLS objection, and why `next/font` is the answer

The obvious problem with `swap` is that the swap shifts layout, wrecking **CLS** (Cumulative Layout
Shift, one of the three Core Web Vitals).

`next/font` fixes this at build time: it reads the real font's metrics and emits a `@font-face` for the
*local fallback* with `size-adjust`, `ascent-override` and `descent-override` tuned so the fallback
occupies almost exactly the same space. The swap happens without the page jumping.

> **This is the real reason to use `next/font` over a `<link>` tag.** Self-hosting and the GDPR angle
> (no visitor IP ever reaches Google) are secondary benefits.

---

## The two naming layers in `@theme inline`

```css
@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-fraunces), ui-serif, Georgia, serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
}
```

Easy to muddle, so keep them straight:

- `--font-inter` — created by **next/font**, a raw pointer to the family.
- `--font-sans` — a **Tailwind theme token**; declaring it is what generates the `font-sans` utility.

Give them the same name and you get a variable referencing itself.

`inline` keeps `var(--font-inter)` as a **live reference** instead of copying the value at build time.
Same mechanism that makes the dark-mode toggle work later.

Every stack ends in real fallbacks. If a font fails to load the browser needs somewhere sane to land.

---

## The side effect nobody expects

There is **no `body { font-family: ... }` rule anywhere**, yet body text is Inter.

Tailwind's Preflight sets `html { font-family: var(--default-font-family, ...) }`, and
`--default-font-family` is itself defined as `var(--font-sans)`. So overriding `--font-sans` changes
the base font of the entire document as a side effect.

Confirmed in the generated CSS:

```
--default-font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif
```

Worth knowing because it's confusing in both directions: you override `--font-sans` expecting only the
`font-sans` utility to change and the whole page moves — or you spend an hour hunting a body font you
never declared.
