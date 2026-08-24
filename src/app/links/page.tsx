import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { profile, socials, competitive } from "@/data/profile";
import { getMeta } from "@/lib/content";
import { Canvas, Zone } from "@/components/ui/Canvas";
import { accentStyle } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Links",
  description: `Everywhere ${profile.name} is — profiles, work, writing, contact.`,
  path: "/links",
});

/**
 * Link-in-bio. Opening shape: a full-bleed accent ground with a centred stack
 * and the largest touch targets on the site — this is the one page that is
 * almost always opened on a phone, from a bio link.
 */
export default function LinksPage() {
  const flagship = getMeta("work")[0];

  const internal = [
    { href: "/work", label: "Work", detail: "Case studies", accent: "rust" as const },
    {
      href: `/work/${flagship.slug}`,
      label: flagship.title,
      detail: "The flagship",
      accent: "amber" as const,
    },
    { href: "/writing", label: "Writing", detail: "Post-mortems", accent: "blue" as const },
    { href: "/playground", label: "Playground", detail: "Live simulations", accent: "moss" as const },
    { href: "/resume", label: "Résumé", detail: "Printable", accent: "rust" as const },
  ];

  return (
    <div style={accentStyle("rust")}>
      <Canvas className="bg-accent-wash pb-14 pt-16">
        <Zone zone="text" className="mx-auto max-w-md text-center">
          <h1 className="font-display text-[2.6rem] leading-none">{profile.name}</h1>
          <p className="mt-3 text-ink-muted">{profile.tagline}</p>
          <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-faint">
            Codeforces {competitive.codeforces} · LeetCode {competitive.leetcode}
          </p>
        </Zone>
      </Canvas>

      <Canvas className="pb-16 pt-8 sm:pb-24 sm:pt-10">
        <Zone zone="text" className="mx-auto max-w-md">
          <ul className="space-y-3">
            {internal.map((item) => (
              <li key={item.href} style={accentStyle(item.accent)}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-4 rounded-xl border border-rule bg-panel px-6 py-5 transition-colors hover:border-accent hover:bg-accent-wash"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="font-mono text-[0.72rem] text-ink-faint">{item.detail}</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 border-t border-rule pt-6 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-faint">
            Profiles
          </p>

          <ul className="mt-4 space-y-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="flex items-center justify-between gap-4 rounded-xl border border-rule px-6 py-5 transition-colors hover:border-rule-strong"
                >
                  <span className="font-medium">{social.label}</span>
                  <span className="font-mono text-[0.72rem] text-ink-faint">{social.handle}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-rule px-6 py-5 transition-colors hover:border-rule-strong"
              >
                <span className="font-medium">Email</span>
                <span className="font-mono text-[0.72rem] text-ink-faint">{profile.email}</span>
              </a>
            </li>
          </ul>
        </Zone>
      </Canvas>
    </div>
  );
}
