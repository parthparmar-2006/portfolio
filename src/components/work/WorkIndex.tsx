"use client";

import { useMemo, useState } from "react";
import type { WorkCardItem } from "@/lib/covers";
import { cn } from "@/lib/utils";
import { FeatureCard, WorkCard } from "./WorkCard";

/**
 * The work index.
 *
 * Facets are derived from the entries themselves, so a new case study with a
 * new lens adds its own filter button. Nothing about the project list is
 * hardcoded here — that is the requirement that lets project #5 be one MDX
 * file.
 *
 * The first entry by `order` gets the feature treatment; everything after it
 * goes into the grid, with the leading card taking a wider crop so the rows are
 * not a uniform tile field.
 */
export function WorkIndex({ items }: { items: WorkCardItem[] }) {
  const lenses = useMemo(() => {
    const seen = new Set(items.map((item) => item.lens));
    return ["All", ...Array.from(seen)];
  }, [items]);

  const [lens, setLens] = useState("All");
  const visible = lens === "All" ? items : items.filter((item) => item.lens === lens);

  // The flagship only leads the unfiltered view; inside a filter it would be
  // arbitrary which project got the large card.
  const showFeature = lens === "All" && visible.length > 1;
  const feature = showFeature ? visible[0] : null;
  const rest = showFeature ? visible.slice(1) : visible;

  return (
    <>
      {lenses.length > 2 ? (
        <div
          role="group"
          aria-label="Filter projects by discipline"
          className="col-wide mt-10 flex flex-wrap gap-2"
        >
          {lenses.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLens(option)}
              aria-pressed={lens === option}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-4 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] transition-colors lg:min-h-0",
                lens === option
                  ? "border-ink bg-ink text-ground"
                  : "border-rule text-ink-muted hover:border-rule-strong hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {feature ? (
        <div className="col-wide mt-8">
          <FeatureCard item={feature} />
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="col-wide mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((item, index) => (
            <WorkCard key={item.slug} item={item} wide={!showFeature && index === 0} />
          ))}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <p className="col-text mt-10 text-ink-muted">Nothing under that filter yet.</p>
      ) : null}
    </>
  );
}
