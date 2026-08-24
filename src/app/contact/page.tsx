import { buildMetadata } from "@/lib/seo";
import { profile } from "@/data/profile";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { SocialList } from "@/components/ui/SocialList";
import { accentStyle } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${profile.name} — email, GitHub, LinkedIn.`,
  path: "/contact",
});

/**
 * Opening shape: the email address *is* the headline. Everything else on the
 * page is subordinate to it, because the one thing this page has to do is make
 * the address impossible to miss — and selectable, never a form.
 */
export default function ContactPage() {
  // Split once, here, so the address can break at the @ rather than mid-word.
  const [local, domain] = profile.email.split("@");

  return (
    <div style={accentStyle("rust")}>
      <Canvas className="bg-accent-wash pb-14 pt-11 sm:pb-20 sm:pt-24">
        <Zone zone="wide">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">
            Contact · the inbox is open
          </p>

          {/* Two deliberate pieces here. The size reads through --fs-address so
              the below-lg ramp in globals.css can replace the desktop clamp,
              which sat pinned to its 1.9rem floor below 727px and so rendered
              the address at the same size on a phone as on a small laptop. And
              `break-all` snapped mid-word ("parthbparmar200 / 6@gmail.com"), so
              the split is placed at the @ with a break opportunity instead. */}
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 block font-display text-[length:var(--fs-address)] leading-[1.1] text-ink transition-colors hover:text-accent lg:leading-[1.05]"
          >
            {local}
            <wbr />
            {`@${domain}`}
          </a>

          <div className="mt-8 max-w-[54ch] space-y-5 text-lg leading-relaxed text-ink-muted">
            <p>
              I am open to more or less everything: full-time roles and internships, freelance and
              contract work, consulting on a system someone else is designing, research
              collaborations, open source, and the kind of side project that starts as a conversation
              and turns into something.
            </p>
            <p>
              I care much more about the problem than the format. If the hard part is real —
              something that has to survive load, or hostile input, or a decision nobody has a clean
              answer to — I want to hear about it, whatever stage it is at.
            </p>
          </div>
        </Zone>
      </Canvas>

      <Canvas className="pb-16 pt-10 sm:pb-24 sm:pt-14">
        <Zone zone="rail" className="mb-6 lg:mb-0 lg:pr-8 lg:text-right">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint">
            Elsewhere
          </p>
        </Zone>

        <Zone zone="text">
          <SocialList />
        </Zone>
      </Canvas>
    </div>
  );
}
