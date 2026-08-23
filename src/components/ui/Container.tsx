import { Canvas, Zone } from "./Canvas";
import { cn } from "@/lib/utils";

/**
 * A single-zone canvas — the common case.
 *
 * `Container` used to be the whole layout system: two hardcoded max-widths,
 * both centred, which is why nothing on the site could break out full-bleed or
 * put anything in a margin. It is now a thin wrapper over `Canvas` so simple
 * pages keep a one-line call site, while anything that needs the margins or a
 * bleed uses `Canvas` + `Zone` directly.
 */
export function Container({
  children,
  wide = false,
  className,
}: {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <Canvas>
      <Zone zone={wide ? "wide" : "text"} className={cn(className)}>
        {children}
      </Zone>
    </Canvas>
  );
}
