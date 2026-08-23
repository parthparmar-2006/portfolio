import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { accentStyle } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Now",
  description: "What I am building, learning and writing at the moment. Coming soon.",
  path: "/now",
});

/**
 * Placeholder.
 *
 * A /now page is only worth anything if it is current, and a stale one is worse
 * than none — it is dated in public. So this says plainly that it is not
 * written yet and points at the things that are, rather than shipping filler
 * that would immediately start rotting.
 *
 * The content lives in `src/data/now.ts`, still populated, ready for whenever
 * this page goes live.
 */
export default function NowPage() {
  return (
    <Canvas style={accentStyle("blue")} className="pb-28 pt-20 sm:pt-28">
      <Zone zone="wide">
        <div className="max-w-2xl overflow-hidden rounded-xl border border-rule">
          <div className="flex items-center justify-between gap-4 bg-accent-wash px-6 py-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">
              Now
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
              Not yet written
            </span>
          </div>

          <div className="bg-panel px-6 py-8 sm:px-8">
            <h1 className="max-w-[18ch] font-display text-utility">Coming soon</h1>
            <p className="mt-4 max-w-[54ch] leading-relaxed text-ink-muted">
              A <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent link-draw"
              >
                /now page
              </a>{" "}
              is only useful if it is actually current, and a stale one is worse than none at all. I
              would rather leave this empty than date it in public. It will be here when there is
              something true to put on it.
            </p>

            <p className="mt-6 max-w-[54ch] leading-relaxed text-ink-muted">
              In the meantime, the work is the honest answer to what I have been doing.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm text-ink-muted">
              {[
                { href: "/work", label: "Work" },
                { href: "/writing", label: "Writing" },
                { href: "/playground", label: "Playground" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Zone>
    </Canvas>
  );
}
