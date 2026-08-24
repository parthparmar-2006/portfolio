# Portfolio — Parth Parmar

Personal portfolio site. Full plan lives in `docs/PLAN.md`. Current state in `docs/PROGRESS.md`.
Biographical source of truth: `context/Resume-Jul-26.pdf` (authoritative) and `context/linkedin.txt`.

---

## HOW TO WORK ON THIS PROJECT — read this first

**Working mode changed on 2026-08-22.** The original teach-me-every-line loop (one small step,
explain in session, write a `docs/notes/NN-*.md` file, stop and wait) is **retired**. Parth asked to
drop it because it was too slow. Notes `01`–`05` in `docs/notes/` are kept as a record; do not add
new ones and do not write per-step explanations unless he asks.

Current mode: **build the thing, end to end, without stopping to explain.**

- Do not narrate code or teach concepts unless asked a direct question.
- Do not write notes files.
- **Do flag anything a future reader would be surprised by**, briefly and in plain terms:
  - a new dependency, and why it is there
  - an unusual or non-obvious technical choice (a different database, an odd library, a workaround
    for a framework default, anything that deviates from the plan in `docs/PLAN.md`)
  - anything touching the confidentiality rules below
- Comments in the code carry the "why" now. Keep them where the reasoning is non-obvious.
- Still prefer explicit over clever, and still update `docs/PROGRESS.md` so a lost session resumes cold.

---

## CONFIDENTIALITY — never violate these

**Mastercard (SWE Intern, May–Jul 2026) — FULLY LOCKED.**
He was explicitly instructed to share nothing, and will not risk that.
On the site, Mastercard may appear as **title, company, dates, location only**, optionally with a
neutral line such as *"Backend infrastructure work covered by confidentiality."*
NEVER publish anything beyond that: no technologies, no metrics, no architecture, no component or
system names, no domain. If a detail came from inside Mastercard, it does not go on the site. The
specifics of what is under embargo are deliberately NOT written down in this repo — this file is
public. They live in `context/`, which is gitignored.
The "Mastercard Global Internal Hackathon — Finalist" line is **title only**, no description.

**CricHeroes Impact Metric — RESTRICTED (softer, but real).**
The repo cannot be shared. Publish only: problem framing, why existing cricket stats miss match
pressure and recency, the dashboard screenshots, and the HACKaMINED 2026 win.
NEVER publish: repo link, the formula, implementation detail.

Before any deploy, run the confidentiality audit in `docs/PLAN.md` and have Parth sign off.

---

## Positioning

**Backend / systems engineer who also builds AI.**

The through-line is *algorithmic depth applied inside real systems*. ML/RL is a credible act two,
not the headline. Do NOT position him as a "MERN full-stack developer" (crowded, undifferentiated)
or as an "AI/ML engineer" (deployed-ML evidence is thinner than backend evidence).

## Resolved facts — resume wins over LinkedIn on conflicts

- CGPA **9.49** (LinkedIn's 9.46 is stale)
- **25+** REST APIs at Emerging Five (not 15+)
- Drone RL: **95%+** collision-free arrivals (NOT the "100% / eliminated all collisions" LinkedIn
  claim — keep the conservative number)
- B.Tech CSE, Nirma University, Jun 2024 – Jun 2027 (lateral entry from GTU diploma, CGPA 9.63)
- Contact email: `parthbparmar2006@gmail.com`
- `github.com/parthparmar-2006` · `leetcode.com/parthparmar_06` · `codeforces.com/parth-parmar`
  · `linkedin.com/in/parthparmar06` · X `@ParthParmar2006`
- Codeforces Pupil, LeetCode 1700+

## Tech stack

Next.js 15 (App Router, RSC) · TypeScript · Tailwind CSS v4 · MDX via `next-mdx-remote/rsc` +
`gray-matter` · `motion` for animation · deployed on Vercel.

Bio facts live in ONE place: `src/data/profile.ts`. Never duplicate them across pages.
`siteUrl` is a single constant there — domain is deferred, shipping on the Vercel subdomain.

## Design direction

Editorial structure, vivid personality. **Must feel refreshing, not dull.**

- Display **Fraunces** (variable serif, SOFT + WONK axes) · body **Inter** · mono **JetBrains Mono**
- Warm **cream** ground in light mode, warm charcoal in dark. Never pure white, never `#000`.
- **3–4 vivid accents**, each section and project assigned its own hue so scrolling feels varied
- Tinted panels, hairline rules, subtle grain overlay
- Motion present but never blocking: staggered reveals, hover lift-and-tint, animated metric
  numerals, one gradient-mesh hero flourish. All gated on `prefers-reduced-motion`.

**Banned:** skill percentage bars, preloaders, auto-rotating carousels, terminal/monospace-everything
aesthetic, dark-only builds, contact-form-only (email must be selectable text).

## Built to grow

Parth plans to ship many more projects soon — including a distributed-systems project on AWS built
end to end on IP he owns outright.

**Hard requirement:** adding project #5, #6, #7 must be *a single MDX file plus assets* — no
component changes, no redesign. Do not hardcode project lists, counts, or layouts anywhere.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
