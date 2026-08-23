# 02 — Config Files

`tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `next-env.d.ts`,
and `.gitignore` — plus what TypeScript actually is and the CommonJS vs ES Modules split.

---

## 1. What TypeScript actually is

### The problem it solves

- JavaScript is **dynamically typed** — a variable can hold anything, and mistakes only surface
  *when the code runs*.
- `user.naem` doesn't error. It silently returns `undefined`, and you find out three screens later.
- TypeScript is **statically typed** — types are checked *before* the code ever runs.

### The critical thing to understand

- TypeScript **does not run anywhere.** No browser and no server understands it.
- It gets **compiled to plain JavaScript**, and during that step **all types are erased.**
- Types cost **exactly zero** at runtime. Shipped JS is the same size as if you'd never used TS.
- TypeScript is a **superset** of JavaScript — every valid `.js` file is already valid TypeScript.

### What you get

- Typos caught as you type, not in production.
- Real autocomplete — the editor knows what properties exist on an object.
- Safe refactoring — rename something and every usage updates or errors.
- The function signature *is* the documentation, and it can't go stale.

---

## 2. `tsconfig.json`, line by line

### Compilation targets

```json
"target": "ES2017",
```

- Which **JavaScript version** to compile down to. ES2017 is the spec where `async`/`await` became native.
- Newer syntax you write gets rewritten into ES2017-compatible equivalents.
- Lower target = works on older browsers, but produces more code.

```json
"lib": ["dom", "dom.iterable", "esnext"],
```

- Which **built-in type definitions** to load — TypeScript's knowledge of what already exists.
- `dom` — browser APIs: `document`, `window`, `fetch`, `HTMLElement`.
- `dom.iterable` — lets you `for...of` over DOM collections like `NodeList`.
- `esnext` — newest JS standard library types (`Array.at`, `Object.hasOwn`).

> **This explains the gotcha from note 01.** Because `dom` is included, TypeScript believes `window`
> exists *everywhere* — including in code that runs on the server during prerendering, where it does
> not. TypeScript will happily let you write `window.innerWidth` in a Server Component, and
> `next build` will crash on it. **Types cannot save you from this one.**

### Practical flags

```json
"allowJs": true,
"skipLibCheck": true,
```

- `allowJs` — plain `.js` files can live alongside `.ts` ones. Useful for gradual migration.
- `skipLibCheck` — **don't type-check inside `node_modules`.** Big speed win, and library type bugs
  aren't yours to fix. Leave it on.

```json
"strict": true,
```

**The single most important line in the file.** It switches on a family of flags:

- **`strictNullChecks`** — `null` and `undefined` are no longer assignable to everything. This alone
  eliminates the entire "cannot read property of undefined" category of bug.
- **`noImplicitAny`** — you must annotate parameters TypeScript can't infer.
- Plus `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `alwaysStrict`,
  `useUnknownInCatchVariables`.

> Keep it on. Turning strict **off** later is a one-line change. Turning it **on** later means fixing
> hundreds of errors at once. Start strict, stay strict.

```json
"noEmit": true,
```

- **TypeScript produces no output files at all.**
- **Turbopack does the actual compiling.** TypeScript here is purely a *checker* — it reads code,
  reports errors, and writes nothing.
- Two separate tools: one checks types, one produces JavaScript.

### Module system flags

```json
"esModuleInterop": true,
"module": "esnext",
"moduleResolution": "bundler",
"resolveJsonModule": true,
"isolatedModules": true,
```

- **`esModuleInterop`** — smooths over the CommonJS-vs-ESM mismatch (section 3), so
  `import React from "react"` works even though React ships as CommonJS.
- **`module: "esnext"`** — emit modern `import`/`export` syntax, let the bundler handle the rest.
- **`moduleResolution: "bundler"`** — *how to find the file an import refers to.* The modern mode
  matching what bundlers actually do: understands `package.json` `"exports"` maps, doesn't demand
  file extensions.
- **`resolveJsonModule`** — lets you `import data from "./data.json"` with types inferred.
- **`isolatedModules`** — every file must be compilable **on its own**, with no knowledge of other
  files. Required because Turbopack compiles files in parallel, independently. The practical
  consequence: type-only imports must be written `import type { Foo } from "./foo"`.

### JSX and performance

```json
"jsx": "react-jsx",
"incremental": true,
```

- **`jsx: "react-jsx"`** — the modern **automatic runtime**. This is why you never write
  `import React from "react"` at the top of component files. Old projects required it in every single
  file; `react-jsx` injects it for you.
- **`incremental`** — caches type-check results in `.tsbuildinfo` so re-checks are much faster.

### The last two

```json
"plugins": [{ "name": "next" }],
"paths": { "@/*": ["./src/*"] }
```

- **`plugins`** — a TypeScript *language-service* plugin from Next. **Editor-only**, affects nothing
  at build time. It's what warns you in VS Code about Server/Client Component mistakes.
- **`paths`** — the alias we asked for at scaffold time. `@/components/Header` →
  `./src/components/Header`.
  - Without it: `import Header from "../../../components/Header"` — which breaks the moment you move
    the file.
  - With it, the import is absolute and move-proof.

### `include` / `exclude`

```json
"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ...],
"exclude": ["node_modules"]
```

- `.next/types/**` is included because **Next generates types during the build** — that's the
  `✓ Types generated successfully` line in the build output. Those are what make route names type-safe.

---

## 3. CommonJS vs ES Modules — why `.mjs` exists

| | CommonJS (CJS) | ES Modules (ESM) |
|---|---|---|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Origin | Node's original system | The official JS standard |
| Loading | synchronous | static, analyzed ahead of time |
| Tree shaking | not possible | enabled |

- **Why ESM enables tree shaking:** imports are *static* — analyzable without running the code. A
  bundler can prove a function is never imported and delete it. With `require()`, which can be called
  conditionally at runtime, it can't prove anything.

**File extensions decide which system applies:**

- `.mjs` → always ESM
- `.cjs` → always CommonJS
- `.js` → depends on `"type"` in `package.json` (default: CommonJS)

Our config files use `.mjs` to be **unambiguous** — no dependence on a field in another file.

---

## 4. `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

- **Currently empty**, and that's fine — Next's defaults are good.
- **`import type`** — a type-only import. Erased entirely at compile time; imports zero runtime code.
  This is the `isolatedModules` requirement showing up in practice.
- **Why `.ts` and not `.js`** — annotating with `NextConfig` gives autocomplete for every option and
  errors on typos. Misspell a config key in a `.js` config and it's silently ignored forever.

**What we'll eventually add here:** image remote patterns, redirects, custom headers, and the MDX
plugin wiring for case studies and blog posts.

---

## 5. `postcss.config.mjs`

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

- Registers exactly one PostCSS plugin, with no options (`{}`).
- **This is the entire Tailwind v4 setup.**
- For contrast, Tailwind v3 needed: this file, **plus** a `tailwind.config.js` with theme and content
  paths, **plus** three `@tailwind` directives in your CSS.

---

## 6. `eslint.config.mjs`

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
```

- **Flat config** — an *array* of config objects, the format that replaced `.eslintrc.json`. Simpler
  because it's plain JavaScript with normal `import`s instead of a bespoke resolution system.
- **`defineConfig`** — a helper that exists purely to give types and autocomplete.
- **`...nextVitals`** — the spread operator. These presets each export an *array* of config objects,
  so spreading flattens them into ours rather than nesting arrays inside arrays.
- **`core-web-vitals`** — Next's rules plus performance rules tied to Google's Core Web Vitals. This
  is what warns you for using `<img>` instead of `next/image`, or a synchronous `<script>`.
- **`globalIgnores`** — never lint build output or generated files. Not your code, meaningless errors.

---

## 7. `next-env.d.ts`

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";
```

- **`.d.ts` = a declaration file.** Types only, zero runtime code. Describes shapes to TypeScript and
  compiles to nothing.
- **`/// <reference types="..." />`** — a *triple-slash directive*. An older TypeScript mechanism for
  pulling in ambient type packages. Looks like a comment; is actually an instruction.
- It's what makes importing an image file type-check, and what wires up Next's global types.
- **`// NOTE: This file should not be edited`** — literal. Next **regenerates it on every build**, so
  edits vanish. Also gitignored for that reason.

---

## 8. `.gitignore`

Files git must never track, grouped by why:

- **`/node_modules`** — regenerable from the lockfile, and enormous.
- **`/.next/`, `/out/`, `/build`** — build output, rebuilt every time.
- **`*.tsbuildinfo`** — the incremental type-check cache.
- **`next-env.d.ts`** — auto-regenerated.
- **`.vercel`** — local link to a Vercel project.
- **`.env*`** — **the important one.** Environment files hold API keys, database URLs, and secrets.
  Committing one publishes your credentials — and git history is **forever**, so deleting the file in
  a later commit does *not* remove it. Bots scan public GitHub for exactly this within minutes.

> **Still missing: `context/`.** That folder holds the resume PDF, which contains a phone number. If
> this repo ever goes public, that's permanently in the history. Decide before the first commit.

---

## Quick reference — which file does what

| File | Job | Will we edit it? |
|---|---|---|
| `package.json` | dependencies + scripts | yes, when adding packages |
| `tsconfig.json` | how TypeScript checks code | rarely |
| `next.config.ts` | Next.js behaviour | yes — images, MDX, redirects |
| `postcss.config.mjs` | registers Tailwind | almost never |
| `eslint.config.mjs` | lint rules | occasionally |
| `next-env.d.ts` | Next's ambient types | **never** — auto-generated |
| `.gitignore` | what git skips | yes — add `context/` |
