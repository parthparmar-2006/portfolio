# 01 — Scaffold & Tooling

Covers everything under `package.json`: what React and Next.js are, npm, versioning, dev vs
production, PostCSS, Tailwind v4, and ESLint.

---

## 1. React vs Next.js — and why not `create-react-app`

### What React actually is

- React is a **library**, not a framework. It does one thing: turn your data into UI, using components.
- That's genuinely all it does. React has no opinion about URLs, servers, data fetching, or bundling.
- Using React alone means assembling the rest yourself: a router, a bundler, a dev server, a build pipeline.

### What `create-react-app` (CRA) was

- The old official tool for scaffolding a React project. It pre-wired a bundler (webpack), a compiler
  (Babel), and a dev server so you didn't have to.
- CRA produced a **SPA — Single Page Application**:
  - The server sends an almost-empty HTML file: basically `<div id="root"></div>`.
  - Then it sends a large JavaScript bundle.
  - The browser runs that JS, and *only then* does anything appear on screen.
- **CRA was officially deprecated in early 2025.** The React team now points you to a framework instead.
  It is not a live option.

### Why the SPA model is wrong for a portfolio

- **Slow first paint** — the visitor stares at white while a big JS bundle downloads and executes.
  On a mid-range phone on mobile data, that's seconds.
- **SEO risk** — the raw HTML a crawler fetches is empty. Google executes JS now, but inconsistently,
  and many other crawlers don't at all.
- **Link previews break** — WhatsApp, LinkedIn, Twitter, and Slack read the HTML `<head>` and **never**
  run JavaScript. A CRA site pasted into LinkedIn shows a blank card. For a portfolio shared on exactly
  those platforms, this alone disqualifies it.

### What Next.js adds on top of React

- **File-based routing** — `src/app/about/page.tsx` automatically becomes `/about`. No router config.
- **Server rendering** — real HTML arrives from the server, already filled in.
- **Static generation** — pages built once at build time, served as plain files.
- **React Server Components** — components that run only on the server and never ship to the browser.
- Built-in image optimization, font optimization, and SEO metadata APIs.

> **Mental model:** React is an engine. Next.js is the car. CRA was a kit for bolting an engine to a
> chassis yourself, and the kit is no longer sold.

---

## 2. The four rendering models

The single most important concept in Next.js.

- **CSR — Client-Side Rendering.** Browser does all the work. This is CRA.
- **SSR — Server-Side Rendering.** Server builds the HTML fresh on every request. Good for
  personalized or constantly-changing pages.
- **SSG — Static Site Generation.** HTML built **once, at build time**, served as a plain file.
  Fastest possible, cacheable on a CDN worldwide.
- **ISR — Incremental Static Regeneration.** SSG, but pages can quietly rebuild themselves on a timer.

Our first build printed:

```
Route (app)
┌ ○ /
└ ○ /_not-found
○  (Static)  prerendered as static content
```

- `○` means **SSG**. Both pages are already finished HTML sitting on disk.
- This portfolio is almost entirely static content, so nearly every page will be `○`. That's why
  Lighthouse ≥ 95 is realistic — we serve pre-built files rather than computing anything per visitor.

---

## 3. npm, `node_modules`, and the lockfile

### npm is two separate things

- **A registry** — a giant public database of JavaScript packages at npmjs.com.
- **A CLI** — the `npm` command that downloads from it.

### `node_modules/`

- The actual source code of every package you depend on, unpacked onto disk.
- **Why 364 packages when `package.json` lists 12?** Dependencies have their own dependencies, which
  have their own. This is the *transitive dependency tree*. We asked for 12; those dragged in 352 more.
- **Still needed?** Yes — for `npm run dev` and `npm run build`. It is **not** deployed; Vercel runs
  `npm install` on its own machines.
- Gitignored: huge, regenerable, partly machine-specific.
- Safe to delete anytime. `rm -rf node_modules && npm install` rebuilds it, and fixes a surprising
  number of bizarre errors.

### `package-lock.json`

- Records the **exact** resolved version of all 364 packages, plus checksums.
- `package.json` says "I want Tailwind 4-point-something." The lockfile says "specifically 4.1.18,
  and here's its hash."
- **Commit this file.** It's what makes your machine, a teammate's machine, and Vercel's build server
  install byte-identical trees. Without it, "works on my machine" becomes a real problem.

---

## 4. Version numbers — semver

Format is `MAJOR.MINOR.PATCH`. So `16.3.1` is major 16, minor 3, patch 1.

- **MAJOR** (16 → 17) — **breaking changes.** Code may stop working. Requires a migration guide.
- **MINOR** (16.3 → 16.4) — new features, nothing breaks.
- **PATCH** (16.3.1 → 16.3.2) — bug fixes only.

### Range symbols

| Written | Accepts | Meaning |
|---|---|---|
| `16.3.1` | only `16.3.1` | exact pin |
| `^16.3.1` | `16.3.1` … `16.9.9` | caret — minor + patch OK, never major |
| `~16.3.1` | `16.3.1` … `16.3.9` | tilde — patch only |
| `^4` | `4.0.0` … `4.9.9` | any 4.x |

### Why some of ours are pinned exactly

- `next`, `react`, `react-dom`, `eslint-config-next` have **no caret**.
- `eslint-config-next` reads Next's internals — a version mismatch produces baffling rule errors.
- Next 16 is compiled against one specific React build.
- These four move as a unit, so they're locked as a unit.

---

## 5. `dependencies` vs `devDependencies`, and `npm publish`

### The split

- **`dependencies`** — needed for the app to *run*: `next`, `react`, `react-dom`.
- **`devDependencies`** — needed only to *build*. TypeScript compiles away to plain JS; ESLint never
  runs in production; type packages vanish entirely.
- `npm install --production` installs only the first group. Vercel installs both, because it must build.

### `@types/*`

- Packages like `react` are written in plain JavaScript and carry no type information.
- `@types/react` is a separate package containing **only** TypeScript type definitions describing what
  `react` exports.
- It's how TypeScript can autocomplete and type-check a JS library. Ships nothing to the browser.

### `npm publish` and `"private": true`

- `npm publish` uploads your package to the **public** npm registry so anyone can install it. It's for
  people shipping libraries.
- A portfolio is an application. It should never be published.
- `"private": true` makes npm **refuse** to publish, permanently.
- **Why it matters:** if you ever add an API key or a `.env` value, an accidental publish makes it
  public and permanently archived. This one line removes that entire class of accident.

---

## 6. `next dev` vs `next build` + `next start`

### `next dev` — development

- Compiles pages **on demand**, only when visited. Fast startup, slower per-page.
- **HMR (Hot Module Replacement)** — save a file and the browser updates in place *without reloading*,
  keeping scroll position and state.
- Full error overlay with exact file, line, and stack.
- Source maps, so the debugger shows *your* code instead of compiled output.
- Nothing is minified.

### `next build` — the production build

- **Minification** — strips whitespace, shortens variable names. Smaller downloads.
- **Tree shaking** — deletes code nothing actually imports.
- **Code splitting** — one bundle per route, so `/` doesn't download `/about`'s code.
- **Prerendering** — runs static pages and saves the resulting HTML.
- **TypeScript check** across the whole project.
- **Content hashing** — files become `main.a3f9c1.js` so browsers cache forever and bust on change.

### `next start` — serving production

- Serves what `build` already made. **It does not compile.**
- **Classic trap:** edit a file, run `next start`, see no change, get confused. `start` is serving stale
  output. Always `build` first.

### What actually differs at runtime

- `NODE_ENV=production` is set.
- React switches to production mode — dev warnings and validation stripped, meaningfully faster.
- The error overlay is gone; users get a generic error page instead of a stack trace.

> **The gotcha that bites everyone:** code can work perfectly in `dev` and explode in `build`. The usual
> cause is touching `window` or `document` in a component — those don't exist during prerendering,
> because there's no browser on the build server. This is why we run `npm run build` early and often.

---

## 7. The `.next/` folder

- Next's **build output and cache**. Created automatically, never edited by hand.
- Holds compiled pages, generated route types, server bundles, prerendered HTML.
- **Gitignored** — 100% regenerable from source.
- **Deleting it is a legitimate debugging move.** When dev behaves impossibly — stale styles, a route
  that won't update, phantom type errors — `rm -rf .next` and restart fixes it more often than it has
  any right to.

---

## 8. PostCSS, and Tailwind v3 vs v4

### What PostCSS is

- A tool that **transforms CSS using JavaScript plugins.** CSS goes in → plugins rewrite it → CSS comes out.
- The same idea as Babel, but for stylesheets instead of JS.
- Classic uses: adding vendor prefixes automatically, enabling nesting, minifying.
- `postcss.config.mjs` does nothing but list which plugins to run.

### Why Tailwind appears there

- **Tailwind v4 *is* a PostCSS plugin.** That's the whole reason `@tailwindcss/postcss` is in our
  `devDependencies`.
- Tailwind scans files for class names like `text-lg`, then generates only the CSS actually used.

### v3 vs v4 — a real architectural change

| | v3 | v4 |
|---|---|---|
| Config lives in | `tailwind.config.js` (a JS object) | **CSS**, in `@theme { }` blocks |
| Import | `@tailwind base;` etc. | `@import "tailwindcss";` |
| Finding your classes | you configure `content` paths | automatic |
| Engine | JavaScript | Rust — dramatically faster |
| Your theme values | JS-only | become **real CSS custom properties** |

### Why this shapes our design work

- There is no `tailwind.config.ts` in this project, and that's correct — it doesn't exist in v4.
- Our design tokens (cream ground, the vivid accents, Fraunces/Inter/JetBrains Mono) get written
  **in `globals.css`**, inside `@theme`.
- Because v4 emits them as genuine CSS variables, `var(--color-accent)` works everywhere — inline
  styles, plain CSS, media queries. In v3 those values were trapped inside JavaScript.
- That is precisely what makes light/dark theming clean: redefine the variables under
  `prefers-color-scheme` and every Tailwind utility follows automatically.

---

## 9. ESLint

- A **linter**: it reads code without running it and reports likely mistakes.
- Catches unused variables, missing React hook dependencies, accessibility problems, and Next-specific
  errors like using `<img>` where `next/image` belongs.
- **A linter is not a formatter.** ESLint judges *correctness*; Prettier handles *appearance* (quotes,
  spacing, line width). Separate tools, separate jobs.
- `eslint.config.mjs` uses **flat config**, the modern format that replaced `.eslintrc.json`.
- `eslint-config-next` is a ready-made bundle of rules the Next team maintains.

---

## `package.json` line by line

```json
"private": true,
```

Stops `npm publish` from ever working.

```json
"scripts": {
  "dev": "next dev",      // local dev server, hot reload, Turbopack
  "build": "next build",  // production build
  "start": "next start",  // serves the built output; needs build first
  "lint": "eslint"
}
```

`npm run dev` is where you'll live. `start` is not a dev command.

**Our versions:** Next 16.3.1 · React 19.2.8 · TypeScript ^5 · Tailwind ^4 · ESLint ^9.

We chose Next 16 over 15 deliberately — `create-next-app@latest` now resolves to 16, and pinning to a
previous major would mean starting on legacy for no benefit.
