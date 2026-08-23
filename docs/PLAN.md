# Portfolio Website — Parth Parmar

## Context

Parth is a final-year CSE undergrad at Nirma University (B.Tech, CGPA 9.49, graduating June 2027) who
reached college via a GTU diploma lateral entry, and completed a May–Jul 2026 SWE internship at
Mastercard.

He wants a portfolio site that represents him comprehensively. Two constraints shape everything:

1. **The Mastercard work is fully off-limits.** He has been explicitly instructed not to share it.
   His strongest piece of engineering to date came out of that internship and cannot appear on the
   site in any form — not the problem, not the approach, not the numbers. What it actually was is
   deliberately not recorded in this repo, which is public.
2. **CricHeroes is partly restricted.** The repo cannot be shared and the detail he can publish is
   limited — softer than the Mastercard rule, but it means that project cannot carry a full technical
   case study either.
3. **There is no job-hunt urgency.** The site does not need to optimize for a 30-second recruiter
   scan. It should optimize for long-term credibility, technical brand, and optionality — future roles,
   open source standing, grad school, freelance.

The outcome we want: a site that proves he can do *Mastercard-class systems work* using only material
he owns publicly.

## Positioning

**Backend / systems engineer who also builds AI.**

Chosen over "full-stack + AI generalist" (crowded, undifferentiated) and "AI/ML engineer" (his deployed-ML
evidence is thinner than his backend evidence — the RL work is simulation research, not production ML).

The through-line across his public work is **algorithmic depth applied inside real systems**: sandboxed
execution of untrusted code, control under partial observability, pressure-weighted metric design, plus
sustained CP practice (Codeforces Pupil, LeetCode 1700+). That is materially rarer than "MERN developer,"
which is what his current LinkedIn headline implies.

ML/RL is a credible, evidenced **act two** — not the headline.

## Source-of-truth facts

Resume (`context/Resume-Jul-26.pdf`) wins over LinkedIn (`context/linkedin.txt`) on conflicts:

- CGPA **9.49** (not 9.46)
- **25+** REST APIs at Emerging Five (not 15+)
- Drone: **95%+** collision-free arrivals (not "100% / eliminated all collisions") — keep the conservative
  number; an unfalsifiable 100% invites doubt
- Links: `github.com/parthparmar-2006`, `leetcode.com/parthparmar06`, `codeforces.com/parth-parmar`,
  `linkedin.com/in/parthparmar06`, X `@ParthParmar2006`
- Contact email: `parthbparmar2006@gmail.com` (confirmed — matches resume and LinkedIn)

## Sitemap

Launch all at once — no phased rollout, since there's no deadline pressure and a staggered launch would
mean shipping a thin site first.

```
/                     Home
/work                 Case study index, filter: All / Systems / AI
/work/[slug]          4 case studies
/playground           Experiments index
/playground/[slug]    Interactive demos
/writing              Blog index (launch with 3 posts minimum)
/writing/[slug]       MDX posts
/about                Story + timeline + testimonials (merged)
/resume               HTML + print stylesheet, PDF download
/now                  Current focus, updated monthly
/uses                 Tools, editor, hardware
/contact
/links                Link-in-bio
/404                  Custom
```

Timeline and testimonials are merged **into** `/about` rather than given their own pages — separately
they'd be thin; together they make About the strongest narrative page on the site.

## Content inventory

### Case studies

| # | Project | Lens | Status of assets |
|---|---------|------|------------------|
| 1 | **Algorithmic Arena — Online Judge API** *(flagship)* | Systems | Needs metrics + architecture diagram |
| 2 | **Autonomous Drone Navigation (RDDPG)** | AI | Has Unreal trajectory renders — best visual asset he owns |
| 3 | **CricHeroes Impact Metric** | AI / Data | **Restricted** — screenshots only, no repo, limited detail |
| 4 | **AI-Powered No-Code Data Analysis Tool** | Systems / AI | Has live demo + 3 screenshots |

**Algorithmic Arena is the flagship** and should be treated as such. It is the only public project that
demonstrates the same *class* of skill as the locked Mastercard work — untrusted code execution, Docker
isolation, resource limits, concurrency, verdict pipelines. Stack: Spring Boot, Docker, PostgreSQL, JWT.

Because both Mastercard and CricHeroes are restricted, the technical weight of the site rests on
**Algorithmic Arena and the Drone RL project**. Those two get the full case study treatment. CricHeroes is
presented as a **shorter outcome-and-approach piece** — the problem framing, why existing cricket stats
miss match pressure and recency, the dashboard screenshots, and the national-hackathon win — with no repo
link, no formula, and no implementation detail. That framing is honest and still carries the award.

Every case study uses one shared template so the set reads as a body of work:

> **Problem** → **Constraints** → **Approach** (+ architecture diagram) → **Hard decision & tradeoff** →
> **Outcome** (with a number) → **What I'd do differently**

The final section is non-negotiable — self-critique is the strongest seniority signal on the site.

### Experience (About / Timeline)

- **Mastercard** — SWE Intern, May–Jul 2026, Vadodara. **Title, company, dates only.** Recommended
  neutral line: *"Backend infrastructure work covered by confidentiality."* No technologies, no metrics,
  no domain detail. Parth's call whether even this appears.
- **Emerging Five** — SWE Intern, Jun–Jul 2025. 25+ secure REST APIs, Spring Boot, PostgreSQL, JWT.
- **Saath Charitable Trust** — Data Analyst Intern, May 2025. React/Plotly dashboard, DeepSeek AI
  integration, jsPDF + XLSX.js reporting, 60% reduction in manual analysis time.
- **InfoLabz** — Mobile App Dev Intern, Jul–Aug 2023. Flutter + Arduino IoT. Diploma-era; include in the
  timeline but visually de-emphasized.
- **ACES** — Executive Committee Member, 2025. Organized *Insignia* (multi-round DSA competition).
- **Mastercard Global Internal Hackathon** — Finalist. Recommend **title only**, no project description,
  consistent with the NDA stance.

### Education

- Nirma University — B.Tech CSE, CGPA 9.49, Jun 2024 – Jun 2027
- Government Polytechnic (GTU) — Diploma IT, CGPA 9.63, Jul 2021 – May 2024

### Skills — grouped by evidence tier, never percentage bars

- **Production-proven** (internships): Java, Spring Boot, PostgreSQL, REST APIs, JWT, React, Python, Git
- **Project-proven**: C++, TypeScript, Node.js, Express, MongoDB, Redis, Docker, RL (RDDPG), CNN/GRU,
  Gymnasium, Unreal Engine, NumPy, Pandas, Scikit-learn, TensorFlow
- **Competitive**: DSA in C++, Codeforces Pupil, LeetCode 1700+
- **Earlier**: Flutter, Arduino/IoT, jQuery, Bootstrap

Each skill links to the project that proves it.

### Playground candidates

Interactive CricHeroes impact-metric calculator · drone trajectory viewer (Unreal render data) ·
algorithm visualizers · a sandboxed mini-judge demo · CP progress dashboard.

### Writing seeds — launch requires 3 published

1. Sandboxing untrusted code: lessons from building an online judge
2. Why my RL drone kept crashing at high speed (PER + reward shaping)
3. Designing a cricket impact metric that accounts for match pressure
4. Diploma → B.Tech lateral entry (strong long-tail SEO for Indian students)

## Tech architecture

- **Next.js 15** (App Router, RSC) + **TypeScript** + **Tailwind CSS v4**
- **Content**: local MDX compiled with `next-mdx-remote/rsc`, frontmatter via `gray-matter`, typed
  collection helpers in `src/lib/content.ts`. (Avoid Contentlayer — effectively unmaintained.)
- **Deploy**: Vercel + custom domain (`parthparmar.dev` suggested)
- **SEO**: `next-sitemap`, RSS for `/writing`, per-page OG images via `next/og` `ImageResponse`
- **Motion**: `motion` (Framer Motion), used sparingly, all gated on `prefers-reduced-motion`
- **Diagrams**: Excalidraw exports or Mermaid for case-study architecture
- **Analytics**: Vercel Analytics (privacy-friendly, no cookie banner)
- **Resume**: HTML page with a dedicated print stylesheet + the static PDF as download

Proposed structure:

```
src/app/            routes (route groups per section)
src/components/     ui/ , sections/ , mdx/
src/content/        work/ , writing/ , playground/   (MDX)
src/lib/            content.ts, seo.ts, utils.ts
src/data/           profile.ts, experience.ts, skills.ts, links.ts
public/             resume.pdf, og/, project media
```

Single source of truth for bio facts in `src/data/profile.ts` so CGPA, links, and email are never
duplicated across pages.

## Design system — editorial structure, vivid personality

Editorial **bones** (strong typography, real whitespace, long-form readability) with **warmth and colour
on top**. Explicitly not the austere black-and-white broadsheet look — Parth's note is that the site must
feel refreshing, not dull. The terminal aesthetic stays off the table; it's the default in this niche and
avoiding it is itself differentiation.

**Type** (self-hosted via `next/font`, zero external requests):

- Display — **Fraunces**, a variable serif with `SOFT` and `WONK` axes. Chosen over a stiffer serif
  precisely because it can be dialled toward playful without losing authority.
- Body/UI — **Inter**, 17–18px base, `line-height: 1.7`, measure capped at **68ch**
- Mono — **JetBrains Mono**, for code, metrics, project numerals, and eyebrow labels

**Colour** — this is where the "refreshing" comes from, so it carries more weight than in a typical
editorial system:

- Light mode: warm **cream** ground (never clinical white), warm near-black ink
- Dark mode: warm charcoal (never `#000`), soft off-white ink — designed, not inverted
- A **palette of 3–4 vivid accents**, not one muted accent. Each major section and each project gets its
  own assigned hue, so scrolling feels varied rather than monotonous.
- Tinted panels (accent at very low alpha) as section grounds
- A subtle grain/noise overlay for texture — cheap, and it kills the flat-template feel

**Layout**

- Hairline rules and tinted panels as structural devices — soft shadows allowed, sparingly
- Numbered work entries (`01`, `02`, …) in mono, per the approved direction
- Asymmetric grid on desktop, single column under 768px
- Generous whitespace, but broken up by colour so it reads generous rather than empty

**Motion** — more present than a classic editorial site, still never blocking:

- Fade-and-rise scroll reveals, staggered
- Link underlines that draw in; work rows that lift and tint on hover
- Animated numerals for metrics (9.49, 1700+, 1315+)
- One tasteful hero flourish — an animated gradient mesh or drifting shapes behind the headline
- Smooth cross-fade on theme toggle
- All of it gated on `prefers-reduced-motion`, nothing above the fold that delays LCP

## Non-negotiables

- No skill percentage bars, no preloader animations, no auto-rotating carousels
- Email visible as selectable text, not form-only
- Lighthouse ≥ 95 all categories; LCP < 2s
- Full keyboard navigation, WCAG AA contrast in **both** themes
- Light and dark both explicitly designed — no unreadable dark-only build

## Verification

1. `npm run dev` — walk every route at 375px, 768px, 1440px
2. `npm run build` — zero type errors, zero build warnings
3. Lighthouse on `/`, `/work/algorithmic-arena`, `/writing/[post]` — confirm ≥ 95
4. axe DevTools clean; tab through the whole site without a mouse
5. `Ctrl+P` on `/resume` — must produce a clean, correctly paginated PDF
6. OG images verified in a social debugger for home, a case study, and a post
7. Toggle OS theme light/dark, plus in-app toggle, on every page
8. `prefers-reduced-motion: reduce` — confirm all animation stops
9. Link check across all external profiles
10. **Confidentiality audit**: grep the built output for `Mastercard` and confirm every hit is
    title/company/date only — no technologies, no metrics, no architecture. Then grep for `CricHeroes`
    and confirm no repo link, no formula, and no implementation detail. Parth reviews and signs off on
    both before the site goes public.

## Domain

Deferred. Ship on the Vercel subdomain; `siteUrl` lives as a single constant in `src/data/profile.ts`
and is consumed by metadata, sitemap, RSS, and OG image generation — so pointing a real domain at it
later is a one-line change plus a DNS record.

## How we work — this governs everything below

**Parth wants to understand every line of code on this site.** That is the primary constraint on
execution, and it outranks speed. Concretely:

- **One small step at a time.** A step is a single file or a single coherent piece of a file — never a
  batch of five files, never "here's the whole scaffold."
- **Explain before writing**, not after. What the file does, why it's structured that way, and what each
  non-obvious line is doing.
- **Stop after each step and wait.** Parth confirms he's understood it, or asks questions, before the
  next step. No running ahead even when the next step is obvious.
- **Prefer explicit over clever.** If a terse idiom and a readable version both work, write the readable
  one. This site is also a teaching artifact.
- **No unexplained dependencies.** Every package added gets a sentence on why it's there and what it
  would take to do without it.
- **Answer questions fully when asked**, even if it means pausing the build for a while. Understanding is
  the deliverable as much as the site is.

The build order below is a *map*, not a schedule. There is no deadline.

## Context persistence — do this immediately on approval

Sessions can be lost. Before any code is written, create these so any future session can resume cold:

1. **`PORTFOLIO/CLAUDE.md`** — project-level context loaded automatically every session. Must contain:
   the positioning statement, the confidentiality rules (Mastercard fully locked, CricHeroes restricted),
   the resolved facts (CGPA 9.49, 25+ APIs, 95%+ collision-free, contact email), the design direction,
   the tech stack, and — most importantly — **the teach-me-every-line working style above.**
2. **`PORTFOLIO/docs/PLAN.md`** — a copy of this plan, living in the repo rather than only in
   `~/.claude/plans/`, so it survives independently of Claude Code session state.
3. **`PORTFOLIO/docs/PROGRESS.md`** — updated at the end of each working step: what was built, what was
   explained, what's next. This is the resume-from-here file.
4. **Memory files** in the project memory directory, at minimum:
   - the teaching/incremental working preference (type: `feedback`)
   - the confidentiality constraints (type: `project`)
   - Parth's profile and positioning (type: `user`)

`context/` (resume PDF + LinkedIn export) stays in the repo as the source of truth for biographical facts.

## Build order

Each numbered item is several stop-and-explain steps, not one action.

0. Context persistence files above — before any code
1. Scaffold: Next.js 15 + TS + Tailwind v4, understood file by file
2. Design tokens: colour palette, the two themes, fonts wired via `next/font`
3. Layout shell: root layout, header, footer, theme toggle
4. `src/data/*` — profile, experience, education, skills, links as typed single-source-of-truth
5. MDX pipeline + `src/lib/content.ts`
6. `/work` index, then the case study template
7. Case studies, flagship first: Algorithmic Arena → Drone RL → No-Code Tool → CricHeroes (short form)
8. Home page, assembled from finished case studies — the hero needs real content to point at
9. `/about` (story + timeline + testimonials), `/resume` with print stylesheet, `/contact`
10. `/writing` + 3 posts, `/playground` + 2 demos
11. `/now`, `/uses`, `/links`, `/404`
12. SEO pass: metadata, OG generation, sitemap, RSS
13. Polish: motion, a11y audit, Lighthouse, the confidentiality audit

## Content Parth needs to supply

Blocking items I cannot derive from the resume or LinkedIn:

- **Algorithmic Arena**: repo link, real metrics (submissions/sec, p95 latency, container spin-up time),
  and how isolation/resource limits were actually enforced — this is the flagship and currently the
  thinnest on detail
- **Drone RL**: the Unreal trajectory renders at full resolution, ideally a short clip of the converged
  policy; baseline comparison numbers
- **CricHeroes**: the three dashboard screenshots, and confirmation of exactly how much about the
  approach he is comfortable publishing (no repo, no formula assumed by default)
- **No-Code Tool**: live demo URL, the three screenshots
- A photo for `/about`
- 2–3 testimonials (LinkedIn recommendations from Emerging Five / Saath / ACES)

## Open thread — worth considering separately

The NDA means his best technical achievement is invisible. With ~10 months of runway,
the highest-value move available is to **deepen Algorithmic Arena until it publicly demonstrates the same
class of skill** — add a distributed worker pool, a submission queue, observability, and published
benchmarks. That reconstructs the Mastercard signal on IP he fully owns, and it feeds directly into the
strongest blog post on the list. Out of scope for the site build, but it should shape what he builds next.
