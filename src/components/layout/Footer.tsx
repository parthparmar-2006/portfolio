import Link from "next/link";
import { nav } from "@/data/nav";
import { profile, socials } from "@/data/profile";

/**
 * Three columns, not five. On a thirteen-route site the old footer was
 * visually heavier than several of the pages above it.
 */
const GROUPS = [
  { id: "work", title: "Work" },
  { id: "site", title: "Site" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-rule bg-panel">
      <div className="mx-auto w-full max-w-6xl px-[var(--gutter)] py-12 sm:py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl">{profile.name}</p>
            <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-ink-muted">
              {profile.tagline}
            </p>
            {/* Selectable text, never a form-only contact. */}
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-block font-mono text-sm text-ink-muted link-draw"
            >
              {profile.email}
            </a>
          </div>

          {GROUPS.map((group) => (
            <nav key={group.id} aria-label={group.title}>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-faint">
                {group.title}
              </p>
              <ul className="mt-1 lg:mt-3 lg:space-y-2">
                {nav
                  .filter((item) => item.group === group.id)
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex min-h-11 items-center text-sm text-ink-muted transition-colors hover:text-ink lg:min-h-0"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                {group.id === "work" ? (
                  <li>
                    <Link
                      href="/rss.xml"
                      className="flex min-h-11 items-center text-sm text-ink-muted transition-colors hover:text-ink lg:min-h-0"
                    >
                      RSS
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="-my-2 flex flex-wrap gap-x-5 lg:my-0 lg:gap-y-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="flex min-h-11 items-center font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-ink lg:min-h-0"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[0.68rem] text-ink-faint">
            © {year} {profile.name} · {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
