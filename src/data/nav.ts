/**
 * Navigation.
 *
 * Five top-level destinations. /about was removed: it repeated the timeline,
 * education, skills and awards that /resume already carries, and what was
 * genuinely its own — the bio and the lateral-entry story — moved to the home
 * page.
 *
 * The desktop nav switches on at `lg`, not `md`: below 1024px the wordmark,
 * the items and the two buttons do not fit on one row, which is what used to
 * make them wrap.
 */

export type NavItem = {
  href: string;
  label: string;
  /** Shown in the header, not just the footer. */
  primary?: boolean;
  /** Footer grouping. */
  group: "work" | "site";
};

export const nav: NavItem[] = [
  { href: "/work", label: "Work", primary: true, group: "work" },
  { href: "/writing", label: "Writing", primary: true, group: "work" },
  { href: "/playground", label: "Playground", primary: true, group: "work" },
  { href: "/resume", label: "Résumé", primary: true, group: "site" },
  { href: "/contact", label: "Contact", primary: true, group: "site" },
  { href: "/now", label: "Now", group: "site" },
  { href: "/stack", label: "Stack", group: "site" },
  { href: "/links", label: "Links", group: "site" },
];

export const primaryNav = nav.filter((item) => item.primary);
