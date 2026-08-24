import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { stack } from "@/data/stack";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { accentStyle } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Stack",
  description:
    "The languages, frameworks, data tools and infrastructure I work with — each with a line on what it is actually for.",
  path: "/stack",
});

/**
 * Opening shape: a spec sheet. Mono labels, rules instead of cards, sticky
 * group headings. Deliberately the densest, least decorated page on the site —
 * a technologies list should read like a datasheet, not a portfolio.
 *
 * Every row carries a note. That is the whole design: a bare list of names is
 * a claim anyone can make, and the line underneath is what makes it checkable.
 */
export default function StackPage() {
  const total = stack.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <Canvas className="pb-16 pt-10 sm:pb-24 sm:pt-20">
      <Zone zone="wide">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint">
          {total} entries · {stack.length} groups
        </p>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b-2 border-ink pb-5">
          <h1 className="font-display text-utility">Stack</h1>
          <p className="max-w-[46ch] text-[0.95rem] leading-relaxed text-ink-muted">
            Nothing here is on the list because it is fashionable. Every row says what the thing is
            actually for — if a line reads like coursework, that is because it is.
          </p>
        </div>
      </Zone>

      {stack.map((group) => (
        <Zone key={group.title} zone="wide" style={accentStyle(group.accent)} className="mt-14">
          <div className="grid gap-x-10 gap-y-4 lg:grid-cols-[13rem_1fr]">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">
                {group.title}
              </h2>
              {/* Shown everywhere now. Hiding it below lg cost mobile readers
                  the one line that explains what each of the eight groups is
                  for, which is the only editorial content on the page. */}
              <p className="mt-2 max-w-[52ch] text-[0.85rem] leading-relaxed text-ink-faint">
                {group.blurb}
              </p>
            </div>

            <dl className="border-t border-rule">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="grid gap-x-8 gap-y-1 border-b border-rule py-4 sm:grid-cols-[12rem_1fr]"
                >
                  <dt className="font-medium">{item.name}</dt>
                  <dd className="text-[0.95rem] leading-relaxed text-ink-muted">{item.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Zone>
      ))}

      <Zone zone="wide" className="mt-16 border-t border-rule pt-6">
        <p className="max-w-[62ch] text-[0.95rem] leading-relaxed text-ink-faint">
          A list of names proves nothing on its own. If you want to see any of this actually used,{" "}
          <Link href="/work" className="text-accent link-draw">
            the case studies
          </Link>{" "}
          say which decisions each one was behind, and{" "}
          <Link href="/resume" className="text-accent link-draw">
            the résumé
          </Link>{" "}
          says where.
        </p>
      </Zone>
    </Canvas>
  );
}
