import { Canvas, Zone } from "@/components/ui/Canvas";

/**
 * Route-level loading state.
 *
 * Every page here is statically prerendered, so this is rarely on screen —
 * but without it a slow network shows a blank frame between navigations rather
 * than the page's shape. Skeleton blocks, not a spinner: a spinner tells you
 * nothing about what is coming.
 */
export default function Loading() {
  return (
    <Canvas className="py-20" aria-busy="true" aria-label="Loading">
      <Zone zone="wide" className="animate-pulse">
        <div className="h-3 w-24 rounded-full bg-rule" />
        <div className="mt-8 h-12 w-3/4 rounded-lg bg-rule" />
        <div className="mt-3 h-12 w-1/2 rounded-lg bg-rule" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full max-w-[46rem] rounded-full bg-rule opacity-70" />
          <div className="h-4 w-full max-w-[42rem] rounded-full bg-rule opacity-70" />
          <div className="h-4 w-full max-w-[38rem] rounded-full bg-rule opacity-70" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="aspect-[16/10] rounded-xl bg-rule opacity-60" />
          <div className="aspect-[16/10] rounded-xl bg-rule opacity-60" />
        </div>
      </Zone>
    </Canvas>
  );
}
