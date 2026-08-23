import Link from "next/link";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { accentStyle } from "@/lib/utils";

/**
 * Opening shape: a judge verdict card. The site's flagship project returns one
 * of five verdicts for every submission, so a 404 gets the sixth.
 */
export default function NotFound() {
  return (
    <Canvas style={accentStyle("rust")} className="pb-28 pt-20 sm:pt-28">
      <Zone zone="wide">
        <div className="max-w-2xl overflow-hidden rounded-xl border border-rule">
          <div className="flex items-center justify-between gap-4 bg-accent-wash px-6 py-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">
              Verdict
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
              404
            </span>
          </div>

          <div className="bg-panel px-6 py-8 sm:px-8">
            <h1 className="max-w-[16ch] font-display text-section">No such page</h1>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-muted">
              The route does not exist. Either it moved, or the link that brought you here was
              wrong. Nothing was executed.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm text-ink-muted">
              {[
                { href: "/", label: "Home" },
                { href: "/work", label: "Work" },
                { href: "/writing", label: "Writing" },
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
