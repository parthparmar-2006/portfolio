"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNav } from "@/data/nav";
import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  // The menu stores *which route* it was opened on rather than a boolean.
  // Navigating changes `pathname`, so the menu closes itself — no effect, no
  // cascading render, and it cannot get stuck open over a new page.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ground/85 backdrop-blur-md">
      {/* The bar is the fixed height, not the header — the mobile menu expands
          below it and must not be clipped. */}
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-6xl items-center justify-between gap-4 px-6 sm:px-8">
        <Link
          href="/"
          className="font-display text-2xl leading-none tracking-tight"
          aria-label={`${profile.name} — home`}
        >
          {profile.name}
        </Link>

        {/* Switches at lg, not md: six items plus a wordmark and two buttons
            do not fit at 768px, which is what caused the wrap. */}
        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-2.5 py-1.5 text-[0.9rem] transition-colors",
                  active ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
                {/* Absolutely positioned so the underline cannot add height and
                    shift the row when the active route changes. */}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-2.5 bottom-0.5 h-px bg-accent"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpenPath(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-9 place-items-center rounded-md border border-rule text-ink-muted lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="text-base leading-none">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-rule bg-ground lg:hidden"
        >
          <ul className="mx-auto w-full max-w-6xl px-6 py-3 sm:px-8">
            {primaryNav.map((item) => (
              <li key={item.href} className="border-b border-rule last:border-0">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block py-3 text-[0.95rem]",
                    isActive(item.href) ? "text-accent" : "text-ink-muted",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
