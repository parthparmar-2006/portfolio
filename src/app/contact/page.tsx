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
  return (
    <div style={accentStyle("rust")}>
      <Canvas className="bg-accent-wash pb-20 pt-16 sm:pt-24">
        <Zone zone="wide">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">
            Contact · the inbox is open
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-6 block break-all font-display text-[clamp(1.9rem,5.5vw,4rem)] leading-[1.05] text-ink transition-colors hover:text-accent"
          >
            {profile.email}
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

      <Canvas className="pb-24 pt-14">
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
