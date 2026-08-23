import { socials } from "@/data/profile";

/**
 * The "Elsewhere" list.
 *
 * One component, so every place that lists the profiles renders them the same
 * way rather than each page inventing its own treatment.
 *
 * Handles come from `profile.ts`, so correcting a username is a one-line change
 * that lands everywhere it appears.
 */
export function SocialList() {
  return (
    <ul className="border-t border-rule">
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer me"
            className="flex items-baseline justify-between gap-4 border-b border-rule py-4 transition-colors hover:text-accent"
          >
            <span className="text-lg">{social.label}</span>
            <span className="font-mono text-sm text-ink-faint">{social.handle}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
