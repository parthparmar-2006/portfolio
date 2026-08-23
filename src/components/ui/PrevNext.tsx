import Link from "next/link";
import { accentStyle, cn, type AccentName } from "@/lib/utils";

type Neighbour = { slug: string; title: string; accent: AccentName } | null;

/**
 * End-of-article navigation.
 *
 * The previous version always rendered a two-column grid, so the first and last
 * entry in a collection each showed one card beside an empty half. When there
 * is only one neighbour it now spans the full width instead — an empty box is
 * not a layout, it is a missing case.
 */
export function PrevNext({
  base,
  previous,
  next,
  labels = { previous: "Previous", next: "Next" },
  ariaLabel = "More in this collection",
}: {
  /** Route prefix, e.g. "/work". */
  base: string;
  previous: Neighbour;
  next: Neighbour;
  labels?: { previous: string; next: string };
  ariaLabel?: string;
}) {
  if (!previous && !next) return null;

  const both = Boolean(previous && next);

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border border-rule bg-rule",
        both && "sm:grid-cols-2",
      )}
    >
      {previous ? (
        <NeighbourCard base={base} item={previous} label={labels.previous} />
      ) : null}
      {next ? (
        <NeighbourCard base={base} item={next} label={labels.next} align="right" />
      ) : null}
    </nav>
  );
}

function NeighbourCard({
  base,
  item,
  label,
  align = "left",
}: {
  base: string;
  item: NonNullable<Neighbour>;
  label: string;
  align?: "left" | "right";
}) {
  return (
    <Link
      href={`${base}/${item.slug}`}
      style={accentStyle(item.accent)}
      aria-label={`${label}: ${item.title}`}
      className={cn(
        "bg-ground p-6 transition-colors hover:bg-accent-wash",
        align === "right" && "sm:text-right",
      )}
    >
      <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </span>
      <p className="mt-2 font-display text-lg leading-snug">{item.title}</p>
    </Link>
  );
}
