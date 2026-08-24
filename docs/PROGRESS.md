# Progress

Resume-from-here file. Read `CLAUDE.md` first (working style + confidentiality rules), then
`docs/PLAN.md`.

---

## Status: structurally finished. Content passes in progress.

**Working mode changed 2026-08-22** — the teach-every-line / notes loop is retired. See `CLAUDE.md`.
Notes `docs/notes/01`–`05` are kept as a record; no new ones are being written.

`npm run build`, `npx tsc --noEmit` and `npx eslint src` are all clean. 32 routes prerendered.

---

## Content decisions (2026-08-23)

- **`/about` deleted.** It repeated the timeline, education, skills and awards
  that `/resume` carries. The bio and the lateral-entry story moved to a
  "Background" section on the home page; testimonials moved there too and still
  render only when the array is non-empty. Nav is five items now.
  `skillTiers` in `src/data/skills.ts` went with it — it existed only for that
  page. Git history has it if the evidence-tier grouping is wanted back.
- **`/resume` is the only place the facts live.** Skills grouped by category
  (Languages, Backend, Machine learning, Databases, Data, Frontend, Tools) — no
  ratings, no self-assessed tiers, no catch-all bucket. Bullets capped at three,
  enforced in the `Entry` component rather than trusted to the data. Projects
  carry month spans and their own `highlights` frontmatter, kept separate from
  the case-study prose.
- **Offer-status framing is gone** from every page. The site reads as
  open to roles, freelance, consulting and collaboration.
- **`public/resume.pdf` was published and then REMOVED.** Decoding the PDF's
  ToUnicode CMaps made its text readable, and it contains (a) a mobile number
  and (b) the full Mastercard description, which `CLAUDE.md` says must never
  be published. The download
  button reappears by itself once a redacted `public/resume.pdf` is added.
- **Playground rebuilt around real projects.** The two sample simulations were
  replaced with the Hamming Code Visualizer and Guaranteed Scheduling
  Simulation, embedded live from GitHub Pages rather than reimplemented.

---

## History

**Iteration 1 — content system.** Next.js 16 App Router · TypeScript · Tailwind v4 · MDX collections
where the filesystem is the index. All routes, four case studies, three posts, two playground
simulations, sitemap/robots/RSS, generated OG images. OKLCH palette written once with `light-dark()`.

**Iteration 2 — the layout system.** The canvas grid (`src/components/ui/Canvas.tsx` + `.canvas`),
with named zones `bleed | wide | text | margin`. Home, `/work` and the two detail templates rebuilt
on it. Eleven hand-built SVG placeholders. Git initialised.

**Iteration 3 — finishing it.** Iteration 2 moved four route files onto the grid and stopped; eight
were still on the old `Container` pattern, including `/writing` and `/playground`. This closes that.

---

## What iteration 3 changed

| Area | Change |
|---|---|
| Header | Six tabs restored. The wrap between 768–900px was caused by the desktop nav switching on at `md`, not by the item count — it now switches at `lg`, so all six fit and nothing had to be cut. |
| Home hero | Was ~813px against ~662px of usable viewport, so the CTA sat below the fold. Now ~575px against 718px, with the stats band cresting. Display scale 6.5rem → 4.25rem (three lines, not four), tighter rhythm. |
| Home proof | The stat chips over the portrait duplicated CGPA and LeetCode from the band 200px below. Chips deleted; the band is the single source. |
| `/playground` | Was two paragraphs of text describing interactive demos. Now renders the real components from `demoRegistry` as live, inert previews. |
| `/writing` | Was three grey text rows. Now a masthead opening, a featured card, and typographic covers — accent-tinted panels with the entry numeral at display size. No image assets required. |
| `/resume` | Sticky identity rail beside the document on screen; collapses to one column in print. |
| `/now` `/uses` `/links` `/contact` `/404` | Each rebuilt with its own opening shape — dated entry, spec sheet, link-in-bio, email-as-headline, verdict card. |
| `/about` | Timeline dates moved into `col-rail`. **Page since deleted — see Content decisions.** |
| Motion | Headline rise on load, 120ms route cross-fade (`template.tsx`), pointer-tracked accent glow on cards, animated numerals inside case studies. All behind `prefers-reduced-motion`. |
| Favicon | `src/app/icon.svg` — PP monogram, cream on rust, drawn as paths. `favicon.ico` deleted. |
| Polish | `--header-h` is one source of truth for the header, progress bar, scroll padding and sticky rails. `PrevNext` renders one full-width card when there is only one neighbour instead of an empty half. `aria-label` on whole-card links. The duplicated playground band removed from `/work`. |

### Two defects found by actually looking, not by building

- **The headline faded in from `opacity: 0`.** The home `h1` is the LCP element, so fading it meant
  the largest paint did not happen until the animation finished. `text-rise` is now transform-only —
  the glyphs are opaque from the first frame and only their position moves behind the clip edge.
- **The hero mesh stopped mid-hero with a visible seam.** For an absolutely positioned child of a
  grid, the containing block is its *grid area*, not the grid container's padding box — so `inset-0`
  resolved to the text column. Fixed by giving the mesh `col-bleed`. Worth remembering: any
  `absolute inset-0` overlay inside `.canvas` needs an explicit zone.

### Decisions worth knowing

| Decision | Why |
|---|---|
| `blockJS: false` on MDXRemote | next-mdx-remote v6 strips JS expressions from MDX by default (it assumes untrusted content). That silently dropped `steps={[...]}` props — components rendered `undefined` instead of erroring. Our MDX is first-party; `blockDangerousJS` stays on. |
| `github-slugger` declared explicitly | The TOC must produce the same IDs `rehype-slug` puts on headings or every anchor is dead. Sharing the slugger guarantees it. |
| Playground previews are `inert` + `aria-hidden` | A control you can focus but not see the result of is worse than no control, and a screen reader should get the card's title, not orphaned slider labels. |
| Pointer glow writes CSS variables, not state | A mousemove handler calling `setState` re-renders the card every frame. |
| `template.tsx` not `layout.tsx` for the route fade | A template remounts per navigation, which is what makes the enter animation re-run. |
| No `next-sitemap` | App Router has native `sitemap.ts` / `robots.ts`. |
| RSS hand-written in a route handler | ~40 lines of XML vs a feed library plus config. |

---

## BLOCKING BEFORE DEPLOY

1. **Check what is on `public/resume.pdf`.** It is a copy of the résumé from
   `context/` and is now publicly downloadable. Its text is CID-encoded, so it
   could not be extracted to verify automatically — open it and confirm it does
   not carry a phone number or anything else that should not be public.
2. **Two repo URLs in work frontmatter currently 404.**
   `algorithmic-arena` (not pushed to GitHub yet) and `Data-Analysis-Tool` (private or renamed).
   `drone-rl` now points at the real repo. `cricheroes-impact-metric` deliberately has none, and
   `restricted: true` suppresses links regardless — verified: that page renders zero repository
   buttons.
3. **Confidentiality audit** — re-run and eyeball:
   ```
   grep -roh "Mastercard[^<]\{0,110\}" .next/server/app --include=*.html | sort -u
   grep -roh "github.com[^\"< ]*"      .next/server/app --include=*.html | sort -u
   ```
   Last run: Mastercard appears only as title/company/dates/location, the one neutral sentence, and
   the finalist line with no description. Every "formula" hit on the CricHeroes page is the
   disclaimer stating the formulation is *not* published.
4. Parth signs off on all of it.

## Remaining work — content only

- **Real assets** replacing the SVG placeholders. Drop `.png`/`.jpg` at the same paths under
  `public/media/` (see `public/media/README.md`); `Figure` and `resolveCover` pick the real file over
  the placeholder automatically. No MDX or component edits.
- **Algorithmic Arena benchmark numbers** — submissions/sec, p95 submit-to-verdict, container
  spin-up. The case study says they are pending rather than inventing figures.
- **Testimonials** into `src/data/testimonials.ts` (the section hides itself while empty).
- Real repo/demo URLs (see blocking item 1).

## Mobile & tablet pass — done 2026-08-24

Desktop at >=1024px is unchanged by construction: every CSS change lives inside
`@media (width < 64rem)` (Tailwind's exact `lg:` complement) and every class change is
`base + lg:<today's value>`. Verified against a before/after capture at 1024/1280/1440.

- **Type scale.** `@theme inline` does *not* emit `--text-*` as custom properties — it inlines the
  declared value into the utility, so overriding them in a media query is a silent no-op. The four
  display sizes now read through `--fs-hero/title/section/utility` on `:root` (the same indirection
  `--accent` uses), which restores a real override point. The below-lg ramps share the intercept
  `1.28rem` so each one lands on today's desktop value at 1024px: the 1023->1024 crossing moves by
  <=0.03px. Home h1 at 375px went 41.6px -> 34.0px.
- **`--margin-col` below lg** no longer collapses to 0. It absorbs whatever the viewport has spare
  past `--measure`, so a 1023px tablet uses 983px of width instead of 694px with ~165px of dead
  margin each side. Phones are unaffected (there is no spare width to absorb).
- **`--gutter`** moved to `:root` so the header and footer pad by the same number as the page. They
  used to use `px-6`, putting the wordmark 4px inboard of every h1 beneath it.
- **Mobile nav** is complete: `/now`, `/stack` and `/links` were previously reachable on a phone
  only through the footer. Plus scroll lock, Escape, outside click, focus trap, 44px rows.
- **Mobile table of contents** (`<details>`) on both detail templates — a ten-section case study
  had no in-page navigation at all below lg.
- Touch targets >=44px below lg; home stats band redesigned to a real one-column baseline row;
  `/stack` group blurbs now shown on mobile; `/contact` address breaks at the `@`, not mid-word;
  playground previews use `aspect-[1280/900]` (a hardcoded `h-64` was clipping 39% at 640px and
  half at 768px); table scroll wrapper, `overscroll-behavior-x` on `<pre>`, `overflow-wrap` on
  inline code; corrected image `sizes`.

**Two real bugs found and fixed while measuring, both pre-existing:**

1. `TileCard`'s panel text is `whitespace-nowrap` by design (it bleeds off the right edge), but in
   flow it gave the card a ~443px min-content width. A grid item's default `min-width: auto`
   resolves to exactly that, so **the home page scrolled sideways on every phone** — 461px of
   content in a 375px viewport. The span is now absolutely positioned, so it contributes nothing to
   intrinsic sizing and `overflow-hidden` still clips it identically. Note `min-width: 0` does NOT
   fix this: it sets a floor on the contribution, not a cap.
2. `template.tsx` and `Reveal` serialise motion's `initial={{opacity:0}}` into the SSR HTML. If the
   motion runtime never runs, the page (or whole sections of it) stays **invisible**, not merely
   unanimated. `template.tsx` now carries a CSS `route-fade` animation that ends at opacity 1 — CSS
   animations outrank inline styles, so it wins on its own — and both carry a `@media (scripting:
   none)` fallback.

Verification: a same-origin harness sweeping **13 routes x 8 widths (320-1023px) = 104 pairs**
asserts `scrollWidth === clientWidth`. All 104 clean. Print layout re-rendered to PDF and unchanged.

> Measuring note for whoever picks this up: an iframe probe whose parent tab is backgrounded never
> finishes hydration, so it reports `loading.tsx`'s skeleton, not the page. Computed *font sizes*
> are still valid there (CSS resolves in `display:none` subtrees); box geometry is not. Headless
> Chromium on Windows also clamps its window to ~490 CSS px, so true phone widths need an iframe
> wrapper — and `Reveal` content does not render inside one.

## Not done

- Lighthouse run and an axe pass
- Domain (shipping on the Vercel subdomain; `siteUrl` in `src/data/profile.ts` is the one constant)
- Deploy

## Git

Branch `main`. `context/` is gitignored — it holds the resume PDF, which contains a phone number.
Three commits: content system, layout system, finishing pass.
