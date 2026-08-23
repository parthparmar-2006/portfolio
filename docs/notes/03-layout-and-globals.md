# 03 — `layout.tsx` and `globals.css`

React components, JSX, the root layout, Server vs Client Components, `next/font`, the Metadata API,
CSS custom properties, and Tailwind v4's `@theme` block.

---

## 1. What a React component actually is

- **A component is a function that returns UI.** That's the entire idea.
- It must be named with a **capital letter**. Lowercase means "HTML element" to React, capital means
  "my component."
- You never call it yourself. You *use* it as `<Home />`, and React calls it.
- **`export default`** — Next requires `page.tsx` and `layout.tsx` to default-export a component.
  That's the contract that makes file-based routing work.

```tsx
export default function Home() {
  return <div>hello</div>;
}
```

---

## 2. JSX

**JSX looks like HTML but is not HTML.** It's syntax sugar that compiles to function calls:

```tsx
<div className="box">hi</div>
// compiles to →
jsx("div", { className: "box", children: "hi" })
```

### Where it differs from HTML — these will bite you

| HTML | JSX | Why |
|---|---|---|
| `class` | `className` | `class` is a reserved JavaScript keyword |
| `for` | `htmlFor` | same reason |
| `onclick` | `onClick` | JSX attributes are camelCase |
| `<img>` | `<img />` | self-closing tags are mandatory |

- **`{}` embeds JavaScript** — `{user.name}`, `{2 + 2}`, `{items.map(...)}`.
- **You must return exactly one root element.** For siblings, wrap in a Fragment: `<>...</>`.

### That weird `{" "}`

```tsx
edit the{" "}
<code>page.tsx</code>{" "}
file.
```

JSX strips whitespace at line breaks. Without `{" "}` you'd get `edit thepage.tsxfile.` — it's an
explicitly inserted space.

---

## 3. `layout.tsx` — the root layout

- `src/app/layout.tsx` is **special and required**. It's the root layout.
- **It's the only place you ever write `<html>` and `<body>`.**
- Every single page in the app gets wrapped by it.

```tsx
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={...}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

- **`children`** — the page content gets injected at that spot. React's composition model: the layout
  doesn't know or care which page it's wrapping.
- **The layout persists across navigation.** Move from `/work` to `/about` and the layout does *not*
  re-render. That's why the header, footer, and theme provider belong here — they keep their state,
  and there's no flicker.
- **`LayoutProps<"/">`** — a type Next **auto-generates per route** into `.next/types`. It's the
  `✓ Types generated successfully` build line doing real work. Older Next versions made you write
  `{ children: React.ReactNode }` by hand.
- **`lang="en"`** — not decoration. Screen readers use it to pick pronunciation, and it's a genuine
  accessibility requirement.

---

## 4. Server vs Client Components — the key concept

**This is what confuses everyone in modern Next. Worth reading twice.**

**In the App Router, every component is a Server Component by default.**

### Server Components

- Run **only** on the server — at build time for our static pages.
- **Their code is never sent to the browser.** Zero JavaScript shipped.
- Can read files, query a database, use secret API keys safely.
- **Cannot** use `useState`, `useEffect`, `onClick`, or touch `window`.

### Client Components

- Marked with **`"use client"`** as the very first line of the file.
- Code **is** shipped to the browser and runs there.
- Can use state, effects, event handlers, and browser APIs.

### Why this exists

> Every Client Component adds JavaScript the visitor must download and execute. Server Components add
> **none**. This is the single biggest lever on how fast a site feels.

### What it means for this portfolio

- **Almost everything will be a Server Component** — case studies, work index, about, resume. All
  static content.
- Only two things genuinely need `"use client"`: the **theme toggle** (needs `onClick` and
  `localStorage`) and the **playground demos** (need interactivity).
- That's why Lighthouse ≥ 95 is realistic — we ship nearly no JavaScript.

### The rule that trips people up

A Client Component can still *render* Server Components — but only if they're passed in as
`children`, not imported directly inside it. This comes up when building the theme provider.

---

## 5. `next/font`

```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

**This does not link to Google at runtime.** It:

- **Downloads the font files at build time and self-hosts them.** No request ever leaves your domain.
  - **Privacy** — Google never sees visitors' IPs (a genuine GDPR issue with the old `<link>` approach).
  - **Speed** — no extra DNS lookup and TLS handshake to a third-party host.
- **`subsets: ["latin"]`** — embeds only Latin glyphs. A full font with Cyrillic, Greek, and
  Vietnamese can be several times larger.
- **Automatically prevents layout shift** by computing fallback font metrics — protects the CLS
  score, one of the three Core Web Vitals.

**`variable: "--font-geist-sans"`** — instead of a class that sets `font-family`, it creates a **CSS
custom property**. That's the bridge into Tailwind:

```css
--font-sans: var(--font-geist-sans);
```

We swap Geist for **Fraunces / Inter / JetBrains Mono** using this exact mechanism.

---

## 6. The Metadata API

```tsx
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
```

- Next reads this exported object and generates real `<title>` and `<meta>` tags **in the HTML**.
- Because it's in the server-rendered HTML, crawlers and link-preview bots see it — which loops back
  to why the SPA model fails.
- **This currently says "Create Next App."** That's what would show in browser tabs, Google results,
  and every link preview. Must be replaced.

---

## 7. CSS fundamentals

### The cascade

- When several rules target the same element, the winner is decided by **specificity** first, then
  **source order** (later wins).
- Specificity ranking: inline style → `#id` → `.class` → `element`.

### CSS custom properties (variables)

```css
:root { --background: #ffffff; }
body  { background: var(--background); }
```

- **`:root`** is a selector for the `<html>` element. Defining variables there makes them inherit
  everywhere.
- **The crucial property: they're live.** Unlike Sass variables, which are substituted at compile time
  and then gone, CSS variables exist in the browser and **can change at runtime** — via a media query,
  a class, or JavaScript.
- **This is the entire mechanism behind theming.** Change one variable, and every rule referencing it
  updates instantly.

---

## 8. `globals.css`, line by line

```css
@import "tailwindcss";
```

- Pulls in all of Tailwind: **Preflight** (its CSS reset, which normalizes browser defaults), utility
  class generation, and the default theme.
- One line replaces v3's three separate `@tailwind` directives.

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

- Ordinary CSS variables. At this point Tailwind knows nothing about them.

```css
@theme inline {
  --color-background: var(--background);
  --font-sans: var(--font-geist-sans);
}
```

**Tailwind v4's config block — the replacement for `tailwind.config.js`.** Anything declared here
becomes a real Tailwind utility:

- `--color-background` generates `bg-background`, `text-background`, `border-background`
- `--font-sans` generates `font-sans`

### What `inline` actually does

- **Without `inline`**, Tailwind *copies the value* at build time. `bg-background` would be hardcoded
  to `#ffffff`.
- **With `inline`**, Tailwind keeps `var(--background)` as a **live reference**.
- So when the dark-mode media query reassigns `--background`, every `bg-background` on the page
  follows automatically.

> **Without `inline`, dark mode silently would not work.** This is the least obvious line in the file
> and the one doing the most work.

```css
@media (prefers-color-scheme: dark) {
  :root { --background: #0a0a0a; }
}
```

- `prefers-color-scheme` reads the visitor's **operating system** theme setting.
- Reassigning the variables here is all it takes — nothing else in the stylesheet changes.
- **Note what's missing:** this only follows the OS. A visitor cannot override it on the site. Our
  plan calls for a manual toggle too, which needs a `[data-theme]` attribute layer on top.

```css
body {
  font-family: Arial, Helvetica, sans-serif;
}
```

- Boilerplate sloppiness — hardcodes Arial while the file *also* sets up `--font-sans` from Geist.
  The two contradict each other. Being removed.

---

## 9. The Tailwind classes in `layout.tsx`

```tsx
<html className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
<body className="min-h-full flex flex-col">
```

- **Backticks** = a template literal; `${}` interpolates a JavaScript value into the string.
- **`geistSans.variable`** is a generated class name like `__variable_a1b2c3` whose rule sets
  `--font-geist-sans`. Putting it on `<html>` makes that variable available to the entire document.

| Class | CSS | Why |
|---|---|---|
| `h-full` | `height: 100%` | let children measure against full height |
| `antialiased` | `-webkit-font-smoothing: antialiased` | smoother text rendering |
| `min-h-full` | `min-height: 100%` | body fills the viewport minimum |
| `flex flex-col` | `display:flex; flex-direction:column` | vertical stack |

Together these are the standard **sticky footer** setup: the body always fills at least the viewport,
so a footer sits at the bottom even on short pages.

---

## What we're changing next

| Currently | Becomes |
|---|---|
| Geist / Geist Mono | Fraunces (display), Inter (body), JetBrains Mono (code) |
| `#ffffff` / `#171717` | warm cream ground, warm near-black ink |
| no accent colours | 3–4 vivid accents, one per section/project |
| `font-family: Arial` on body | deleted — it contradicts the font setup |
| `title: "Create Next App"` | real metadata |
| OS-only dark mode | OS default **plus** a manual `[data-theme]` toggle |
