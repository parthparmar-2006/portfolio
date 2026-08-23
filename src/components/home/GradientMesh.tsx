/**
 * The hero flourish: blurred accent blobs drifting behind the portrait.
 *
 * Deliberately CSS-only — no motion library, no client component, no
 * JavaScript. It renders in the server payload, so it cannot delay LCP, and
 * the global `prefers-reduced-motion` rule in globals.css freezes it without
 * this file needing to know.
 *
 * It sits behind the *visual* column rather than the headline. Behind text it
 * had to be kept so faint it was invisible; here it can carry real colour.
 *
 * `aria-hidden` because it carries no information.
 */
export function GradientMesh() {
  return (
    <div
      aria-hidden
      // `col-bleed` is load-bearing, not decoration: for an absolutely
      // positioned child of a grid, the containing block is its *grid area*,
      // not the grid container's padding box. Without it, `inset-0` resolved to
      // the text column and the mesh stopped mid-hero with a visible seam.
      //
      // Below lg the hero stacks, so the mesh ends up behind the paragraph
      // instead of behind the portrait. Half strength there keeps the text
      // sitting on something close to flat ground.
      className="col-bleed pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-50 lg:opacity-100"
    >
      <div className="absolute -right-[8%] top-[-14%] size-[30rem] rounded-full bg-rust opacity-30 blur-[90px] mesh-drift-a" />
      <div className="absolute right-[22%] top-[24%] size-[24rem] rounded-full bg-blue opacity-25 blur-[90px] mesh-drift-b" />
      <div className="absolute -right-[4%] bottom-[-18%] size-[26rem] rounded-full bg-amber opacity-25 blur-[100px] mesh-drift-c" />
      {/* Fades the mesh into the page ground at the bottom edge. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--ground)]" />
    </div>
  );
}
