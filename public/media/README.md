# Project media

Drop real assets here. **Nothing else needs editing** — every image on the site
resolves in this order:

1. the real file (`.jpg`, `.jpeg`, `.png`, `.webp`)
2. the hand-built `.svg` placeholder at the same path
3. a labelled "image pending" frame

So replacing a placeholder means putting a file next to it with the same
basename and a real extension. The `.svg` can stay; it will simply stop being
used. Delete it once you are happy.

## What is needed

| Path (any real extension) | Shows on | What it should be |
|---|---|---|
| `about/portrait` | home hero + `/about` | Portrait photo. **Portrait orientation, 4:5**, e.g. 1000×1250. Head and upper body; the hero crops from the top. |
| `covers/algorithmic-arena` | `/work` card + case-study header | Cover, **16:10**, e.g. 1600×1000. Cropped to 16:7 in the header, so keep the subject vertically centred. |
| `covers/drone-rl` | same | same |
| `covers/no-code-analysis-tool` | same | same |
| `covers/cricheroes-impact-metric` | same | same |
| `drone/trajectories` | drone case study, full-bleed | Unreal render: grey exploratory paths + the red converged path to the green target. The best visual asset you own — give it the highest resolution you have. |
| `no-code/column-selection` | no-code case study | Screenshot: column list with inferred type badges. |
| `no-code/multi-column` | no-code case study | Screenshot: multi-column analysis with charts + generated narrative. |
| `cricheroes/dashboard-overview` | CricHeroes case study | Dashboard hero screenshot. |
| `cricheroes/data-analysis` | CricHeroes case study | Match/season analysis screenshot. |
| `cricheroes/player-analysis` | CricHeroes case study | Per-player breakdown screenshot. |

## Guidelines

- **Minimum 1600px wide** for anything full-width; the drone render larger if possible.
- PNG for UI screenshots (sharp text), JPG for photographs and renders.
- Screenshots: capture at 2x / retina if you can, and crop out browser chrome.
- Covers are decorative (`alt=""`); the screenshots inside case studies already
  have written alt text in the MDX — no need to supply any.
