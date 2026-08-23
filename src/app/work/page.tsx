import { getMeta } from "@/lib/content";
import { withCovers } from "@/lib/covers";
import { buildMetadata } from "@/lib/seo";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { Eyebrow } from "@/components/ui/Section";
import { WorkIndex } from "@/components/work/WorkIndex";
import { accentStyle } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies: an online judge that runs untrusted code, a reinforcement-learning drone controller, a no-code analysis pipeline, and a pressure-weighted cricket impact metric.",
  path: "/work",
});

export default function WorkPage() {
  const items = withCovers(getMeta("work"));

  return (
    <Canvas style={accentStyle("rust")} className="pb-24 pt-16 sm:pt-20">
      <Zone zone="wide">
        <Eyebrow>Work</Eyebrow>
        <h1 className="mt-5 max-w-[18ch] font-display text-title">
          Projects, written up like engineering
        </h1>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink-muted">
          Every case study follows the same structure — problem, constraints,
          approach, the hard decision and what it cost, the outcome, and what I
          would do differently. The last section is the one worth reading.
        </p>
      </Zone>

      <WorkIndex items={items} />
    </Canvas>
  );
}
