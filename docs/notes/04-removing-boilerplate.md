# 04 — Removing the Boilerplate

## What changed

| File | Change |
|---|---|
| `public/*.svg` | deleted (5 Next/Vercel logos, referenced by nothing) |
| `src/app/page.tsx` | default template → placeholder |
| `src/app/globals.css` | 26 lines → `@import "tailwindcss";` |
| `src/app/layout.tsx` | real `metadata`; Geist fonts left alone, they go in step 2 |
| `src/app/favicon.ico` | kept |

Build still clean, both routes still `○ (Static)`.

---

## `public/` vs `src/app/` — why favicon survived

Two different mechanisms that both produce "static assets", and they're easy to confuse.

- **`public/`** is a dumb copy. Whatever is in there is served at the domain root, verbatim.
  `public/resume.pdf` → `yoursite.com/resume.pdf`. No import, no route, no auth, no obscurity.
  Anyone who guesses the URL gets the file.
- **`src/app/`** uses **file conventions** — certain *filenames* have behaviour attached. `page.tsx`
  becomes a route, `layout.tsx` wraps, `error.tsx` is an error boundary, `favicon.ico` /
  `opengraph-image.png` / `sitemap.ts` cause Next to *generate* the corresponding tags or files.

So `favicon.ico` isn't a file we serve — it's a file that makes Next emit `<link rel="icon">`. Deleting
it removes the tag. We'll use the same mechanism for OG images and the sitemap in step 12.

---

## Flexbox: the axes move

The thing that actually trips people up, and a standard interview question.

- A flex container has a **main axis** (direction items flow) and a **cross axis** (perpendicular).
- `justify-content` acts on **main**. `align-items` acts on **cross**.
- `flex-direction: column` **swaps which is which.** The properties don't change meaning — the axes
  rotate under them.

So `justify-center` centres horizontally in a row and *vertically* in a column. Nothing about the
property changed.

**`flex-1`** = `flex: 1 1 0%` — grow, shrink, basis zero. It only does anything because `<body>` is
`flex flex-col min-h-full`. That combination is the **sticky footer pattern**: `<main>` absorbs all
leftover vertical space, so a footer sits at the bottom even on a near-empty page. Drop `flex-col` from
the body and it breaks silently — no error, just wrong layout.

---

## Preflight and `box-sizing: border-box`

`@import "tailwindcss"` alone brings in Preflight, Tailwind's reset. Most of it is uncontroversial
(zero margins, unstyled headings — which is why `<h1>` needs `text-2xl` to look like a heading).

The one worth understanding is `box-sizing: border-box` applied globally.

- **`content-box`** (the CSS default): `width: 200px` + `padding: 20px` + `2px` border = **244px** on
  screen. Width means content width only.
- **`border-box`**: the same declaration renders **200px** total. Padding and border are subtracted
  from the inside.

Every layout system, framework and reset written in the last decade flips this. The default is widely
considered a design mistake in CSS. Worth being able to explain the difference — it comes up.

---

## `rem` vs `px`

Tailwind's spacing and type scales are in `rem`, deliberately.

- `rem` is relative to the **root** (`<html>`) font size — 16px unless the user changed it.
- A visitor who raises their browser's default font size for readability gets the entire layout scaling
  with them: text, padding, gaps. Hardcoded `px` ignores that setting completely, which is a real
  accessibility failure, not a preference.
- `em` is relative to the *parent*, so it compounds when nested. Almost always the wrong choice.

---

## Server Components ship zero JS

`page.tsx` has no `"use client"`, so it runs once at build time and sends only HTML — no React runtime
for that component, no hydration.

The build output line `○ (Static)` is the proof. Watch this line: the day a page unexpectedly flips
from `○` to `ƒ` (dynamic), something forced a server render — usually `cookies()`, `headers()`, or an
uncached fetch. That's a performance regression you want to catch at build time, not in production.

---

## Why metadata being in the HTML matters

```tsx
export const metadata: Metadata = { title, description };
```

Next turns this into real `<title>` / `<meta>` tags **in the served HTML**, before any JS runs.

That last part is the whole argument against a client-rendered SPA for a portfolio: **WhatsApp,
LinkedIn, Slack and Twitter fetch the HTML and never execute JavaScript.** Google will run JS, but
inconsistently and on a delay. So a CRA-style site pasted into LinkedIn shows a blank card. It's the
most concrete, least hand-wavy answer to "why SSR?" in an interview.

**Composition:** metadata from the root layout applies everywhere; a nested `layout.tsx` or `page.tsx`
exporting its own **merges over it field by field** — not wholesale replacement. That's why
`/work/[slug]` can set just `title` and `description` and still inherit icons, OG defaults and
`metadataBase`.

The description is the positioning statement on purpose. It's the sentence Google and link cards show.

---

## Step 2

Fonts (Fraunces / Inter / JetBrains Mono), the cream + charcoal palette, accents, and the
`[data-theme]` layer over `prefers-color-scheme`.

Concepts worth the space there: `@theme` vs `@theme inline` (why `inline` is load-bearing for dark
mode), OKLCH vs hex for building a palette, variable font axes, and the flash-of-wrong-theme problem.
