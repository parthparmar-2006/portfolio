import Link from "next/link";
import { getMeta } from "@/lib/content";
import { withCovers } from "@/lib/covers";
import { profile, stats } from "@/data/profile";
import { experience } from "@/data/experience";
import { testimonials } from "@/data/testimonials";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { GradientMesh } from "@/components/home/GradientMesh";
import { HeroVisual } from "@/components/home/HeroVisual";
import { FeatureCard, WorkCard } from "@/components/work/WorkCard";
import { TileCard } from "@/components/ui/TileCard";
import { accentStyle, formatDate } from "@/lib/utils";

export default function HomePage() {
  const work = withCovers(getMeta("work"));
  const [flagship, ...others] = work;
  const posts = getMeta("writing").slice(0, 2);
  const demos = getMeta("playground");
  const current = experience[0];

  return (
    <>
      {/* ---- Hero -------------------------------------------------------
          Sized to fit one laptop screen with the stats band cresting below it.
          The previous version ran ~813px against ~662px of usable viewport, so
          the call to action — the whole point of the section — sat below the
          fold. */}
      <Canvas as="section" className="relative overflow-hidden pb-12 pt-10 sm:pt-14">
        <GradientMesh />
        <Zone zone="wide" className="relative">

          <div className="grid items-center gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
            <div>
              <p className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">
                <span aria-hidden className="size-1.5 rounded-full bg-moss" />
                {profile.location} · open to interesting problems
              </p>

              <h1 className="mt-5 font-display text-hero">
                {/* Lines are declared rather than measured — see RevealText. */}
                <RevealText
                  lines={["Backend and systems", "engineer who also", "builds AI."]}
                />
              </h1>

              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-muted">
                I like the problems where the answer is not in the framework docs — flying a drone
                that can only see one frame at a time, scoring a quarter of a million cricket
                deliveries by what each one was worth, running a stranger&rsquo;s code without
                trusting it.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/work"
                  className="rounded-full bg-ink px-6 py-2.5 text-[0.95rem] text-ground transition-opacity hover:opacity-90"
                >
                  See the work
                </Link>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-sm text-ink-muted link-draw"
                >
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[17rem] sm:max-w-[19rem] lg:max-w-none">
              <HeroVisual />
            </div>
          </div>
        </Zone>
      </Canvas>

      {/* ---- Stats band --------------------------------------------------- */}
      <Canvas className="border-y border-rule bg-panel">
        <Zone zone="wide">
          {/* One column on a phone, not two. `grid-cols-2` was the unconditional
              base, which at 375px gave each cell 151px to hold a text-4xl
              numeral plus a four-company detail line. Below sm the numeral sits
              on its own row beside the label instead of above it, which reads
              as a list rather than four cramped tiles. */}
          <dl className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 sm:gap-8 sm:py-10 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.06}>
                <div
                  className="flex items-baseline gap-4 sm:block"
                  style={accentStyle((["rust", "blue", "moss", "amber"] as const)[index % 4])}
                >
                  <dd className="w-[4.75rem] shrink-0 font-display text-4xl leading-none text-accent sm:w-auto">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <div className="min-w-0">
                    <dt className="text-sm font-medium sm:mt-2">{stat.label}</dt>
                    <p className="mt-0.5 text-sm leading-snug text-ink-muted">{stat.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
        </Zone>
      </Canvas>

      {/* ---- Selected work ------------------------------------------------ */}
      <Canvas as="section" style={accentStyle("rust")} className="py-14 sm:py-28">
        <Zone zone="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="mt-4 max-w-[20ch] font-display text-section">
                Four projects, and the decisions behind them
              </h2>
            </div>
            <p className="max-w-[38ch] text-ink-muted">
              Each one written the same way: the problem, the constraint that made it hard, the
              tradeoff I actually made, and what I would do differently.
            </p>
          </div>
        </Zone>

        <Zone zone="wide" className="mt-12">
          <Reveal>
            <FeatureCard item={flagship} />
          </Reveal>
        </Zone>

        <Zone zone="wide" className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.07}>
              <WorkCard item={item} />
            </Reveal>
          ))}
        </Zone>

        <Zone zone="wide" className="mt-10">
          <Link href="/work" className="font-mono text-sm text-ink-muted link-draw">
            All {work.length} projects →
          </Link>
        </Zone>
      </Canvas>

      {/* ---- Background ---------------------------------------------------- */}
      <Canvas as="section" style={accentStyle("blue")} className="bg-accent-wash py-14 sm:py-28">
        <Zone zone="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Eyebrow>Background</Eyebrow>
              <h2 className="mt-4 font-display text-section">
                I came in through the side door
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-ink-muted">
              <p>
                Most people reach engineering through two years of physics and chemistry. I did a
                three-year diploma in IT after class 10, then entered B.Tech at Nirma University
                directly into second year. It takes exactly as long — six years either way — but you
                spend three of them writing code instead of preparing to.
              </p>
              <p>
                That trade shows up in how I work. I am comfortable in a terminal and a debugger
                because I had three extra years of being in one. I also arrived with a maths gap I
                had to close deliberately, which is the part nobody warns you about and the reason I
                wrote it down.
              </p>
              <p>
                Since then: four internships, most recently a summer on backend infrastructure at{" "}
                {current.company}. That work is covered by confidentiality and does not appear here,
                which is precisely why everything on this site is something I own outright.
              </p>
              <p className="flex flex-wrap gap-x-6 gap-y-2 pt-1 font-mono text-sm">
                <Link
                  href="/writing/diploma-to-btech-lateral-entry"
                  className="text-accent link-draw"
                >
                  The lateral entry trade, in full →
                </Link>
                <Link href="/resume" className="text-accent link-draw">
                  Résumé →
                </Link>
              </p>
            </div>
          </div>
        </Zone>
      </Canvas>

      {/* ---- Playground ---------------------------------------------------- */}
      <Canvas as="section" style={accentStyle("moss")} className="py-14 sm:py-28">
        <Zone zone="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Playground</Eyebrow>
              <h2 className="mt-4 max-w-[20ch] font-display text-section">
                Things I built to understand something
              </h2>
            </div>
            <p className="max-w-[38ch] text-ink-muted">
              Usually a step that is easy to derive and hard to feel. Each one is deployed and
              running — you can open it and change the inputs.
            </p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {demos.map((demo) => (
              <li key={demo.slug} className="h-full">
                <TileCard
                  href={`/playground/${demo.slug}`}
                  panelText={demo.tags[0]}
                  eyebrow={demo.tags.join(" · ")}
                  title={demo.title}
                  summary={demo.summary}
                  footer="Open the live demo"
                  accent={demo.accent}
                />
              </li>
            ))}
          </ul>

          <Link
            href="/playground"
            className="mt-10 inline-block font-mono text-sm text-ink-muted link-draw"
          >
            All experiments →
          </Link>
        </Zone>
      </Canvas>

      {/* ---- Writing -------------------------------------------------------- */}
      <Canvas as="section" style={accentStyle("amber")} className="border-t border-rule py-14 sm:py-28">
        <Zone zone="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Writing</Eyebrow>
              <h2 className="mt-4 max-w-[20ch] font-display text-section">
                Notes from the things that broke
              </h2>
            </div>
            <p className="max-w-[38ch] text-ink-muted">
              Post-mortems, mostly. What I expected, what actually happened, and where the diagnosis
              turned out to be.
            </p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug} className="h-full">
                <TileCard
                  href={`/writing/${post.slug}`}
                  panelText={post.tags[0]}
                  eyebrow={post.tags.slice(0, 2).join(" · ")}
                  title={post.title}
                  summary={post.summary}
                  footer={`${formatDate(post.date)} · ${post.readingTime} min read`}
                  accent={post.accent}
                />
              </li>
            ))}
          </ul>

          <Link
            href="/writing"
            className="mt-10 inline-block font-mono text-sm text-ink-muted link-draw"
          >
            All writing →
          </Link>
        </Zone>
      </Canvas>

      {/* ---- Testimonials ----------------------------------------------------
          Renders nothing while the array is empty, so shipping without quotes
          is safe. This lived on /about before that page was removed. */}
      {testimonials.length > 0 ? (
        <Canvas as="section" style={accentStyle("blue")} className="bg-accent-wash py-14 sm:py-28">
          <Zone zone="wide">
            <Eyebrow>What people say</Eyebrow>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-2">
              {testimonials.map((item) => (
                <li key={item.name}>
                  <figure className="h-full bg-ground p-7">
                    <blockquote className="font-display text-lg leading-snug">
                      “{item.quote}”
                    </blockquote>
                    <figcaption className="mt-4 font-mono text-[0.72rem] text-ink-muted">
                      {item.name} — {item.role}
                      {item.source ? (
                        <span className="text-ink-faint"> · {item.source}</span>
                      ) : null}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Zone>
        </Canvas>
      ) : null}

      {/* ---- Contact --------------------------------------------------------- */}
      <Canvas as="section" style={accentStyle("rust")} className="border-t border-rule py-14 sm:py-28">
        <Zone zone="wide">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <Eyebrow>Contact</Eyebrow>
              <h2 className="mt-4 max-w-[18ch] font-display text-section">
                Working on something with a hard problem in it?
              </h2>
              <p className="mt-4 max-w-[46ch] text-ink-muted">
                Roles, freelance, consulting, research, or an argument about something on this site —
                all of it is welcome.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-lg text-accent link-draw sm:text-xl"
              >
                {profile.email}
              </a>
              <Link href="/contact" className="font-mono text-sm text-ink-muted link-draw">
                Everywhere else to find me →
              </Link>
            </div>
          </div>
        </Zone>
      </Canvas>
    </>
  );
}
