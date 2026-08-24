"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, primaryNav } from "@/data/nav";
import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

/** Everything the header's desktop row does not show. Without this, /now,
 *  /stack and /links were reachable on a phone only through the footer. */
const secondaryNav = nav.filter((item) => !item.primary);

export function Header() {
  const pathname = usePathname();
  // The menu stores *which route* it was opened on rather than a boolean.
  // Navigating changes `pathname`, so the menu closes itself — no effect, no
  // cascading render, and it cannot get stuck open over a new page.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  const panelRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Everything an open overlay owes the reader: the page behind it must not
  // scroll, Escape must close it, a tap outside must close it, and Tab must
  // not walk into the content underneath. None of this existed before.
  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    // Compensating for the scrollbar keeps the sticky header from jumping
    // sideways by its width the moment the menu opens.
    const previousPaddingRight = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const close = () => {
      setOpenPath(null);
      buttonRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      // Focus trap. The toggle button is deliberately part of the loop — it is
      // the control that closes the panel, so it belongs inside it.
      const focusables = [
        buttonRef.current,
        ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
      ].filter(Boolean) as HTMLElement[];
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return; // its own onClick toggles.
      setOpenPath(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ground/85 backdrop-blur-md">
      {/* The bar is the fixed height, not the header — the mobile menu expands
          below it and must not be clipped. */}
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-6xl items-center justify-between gap-4 px-[var(--gutter)] lg:px-8">
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

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpenPath(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            // 44px on touch, back to the desktop 36px at lg. `size-11 lg:size-9`
            // rather than `max-lg:size-11` so the order of the two utilities in
            // the generated stylesheet cannot decide the winner.
            className="grid size-11 place-items-center rounded-md border border-rule text-ink-muted lg:size-9 lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="text-lg leading-none">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          ref={panelRef}
          id="mobile-nav"
          aria-label="Primary"
          // Same translucent-plus-blur treatment as the bar above it. An opaque
          // bg-ground panel under a bg-ground/85 bar showed a visible tone seam
          // wherever the page behind was not the ground colour.
          className="max-h-[calc(100svh-var(--header-h))] overflow-y-auto overscroll-contain border-t border-rule bg-ground/95 backdrop-blur-md lg:hidden"
        >
          <ul className="mx-auto w-full max-w-6xl px-[var(--gutter)] py-2">
            {primaryNav.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center text-[0.95rem]",
                    isActive(item.href) ? "text-accent" : "text-ink-muted",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mx-auto w-full max-w-6xl px-[var(--gutter)] pb-4">
            <p className="pt-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-faint">
              Site
            </p>
            <ul className="flex flex-wrap gap-x-2">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center pr-4 text-[0.95rem]",
                      isActive(item.href) ? "text-accent" : "text-ink-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
