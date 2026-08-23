"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Section list for long-form pages, with the current section marked.
 *
 * Uses one `IntersectionObserver` over the real headings rather than scroll
 * maths. The `rootMargin` pulls the detection band up near the top of the
 * viewport, so a section becomes "current" as its heading reaches the top —
 * which is what a reader perceives — instead of when it first appears at the
 * bottom.
 *
 * IDs come from `getHeadings`, which shares its slugger with `rehype-slug`, so
 * these anchors always resolve.
 *
 * The smooth scroll is done here rather than with `scroll-behavior: smooth` on
 * `html`. A global smooth scroller also applies to the router's scroll-to-top
 * on every route change, which made navigating home from halfway down a page
 * land in the wrong place. Scoping it to these clicks keeps the nicety without
 * the side effect.
 */
function scrollToHeading(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return; // Let the browser handle it the normal way.

  event.preventDefault();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // `scroll-padding-top` on <html> applies to scrollIntoView too, so the
  // heading still clears the sticky header.
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  // Keep the URL shareable without letting the browser jump as well.
  history.pushState(null, "", `#${id}`);
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="On this page">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
        On this page
      </p>
      <ol className="mt-3 space-y-1.5 border-l border-rule">
        {headings
          .filter((heading) => heading.level === 2)
          .map((heading, index) => {
            const active = activeId === heading.id;
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(event) => scrollToHeading(event, heading.id)}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "-ml-px flex gap-2 border-l-2 py-0.5 pl-3 text-[0.8rem] leading-snug transition-colors",
                    active
                      ? "border-accent text-ink"
                      : "border-transparent text-ink-faint hover:text-ink-muted",
                  )}
                >
                  <span className="font-mono text-[0.65rem] pt-0.5 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{heading.text}</span>
                </a>
              </li>
            );
          })}
      </ol>
    </nav>
  );
}
