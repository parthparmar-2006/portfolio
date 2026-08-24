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

/**
 * The same list, collapsed, for widths where the sticky rail is hidden.
 *
 * A ten-section case study had no in-page navigation at all on a phone — the
 * rail is `hidden lg:block` and there was no fallback. `<details>` rather than
 * a state-driven panel because it costs nothing, works before hydration, and
 * is already the right semantics for "disclosure".
 */
export function MobileTableOfContents({ headings }: { headings: Heading[] }) {
  const sections = headings.filter((heading) => heading.level === 2);
  if (sections.length < 3) return null;

  return (
    <details className="group mb-10 rounded-xl border border-rule bg-panel lg:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-muted [&::-webkit-details-marker]:hidden">
        On this page
        <span aria-hidden className="text-ink-faint transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <ol className="border-t border-rule px-4 pb-2">
        {sections.map((heading, index) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(event) => {
                scrollToHeading(event, heading.id);
                // Collapse behind the reader rather than leaving the list
                // covering the section they just jumped to.
                event.currentTarget.closest("details")?.removeAttribute("open");
              }}
              className="flex min-h-11 items-center gap-3 text-[0.85rem] leading-snug text-ink-muted"
            >
              <span className="font-mono text-[0.65rem] tabular-nums text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{heading.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
