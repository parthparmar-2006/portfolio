"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const CHANGE_EVENT = "themechange";

/**
 * The <html data-theme> attribute is the source of truth, not React state.
 *
 * `useSyncExternalStore` subscribes to it rather than mirroring it in an
 * effect, which means there is exactly one place the current theme lives and
 * no window where React's idea of the theme disagrees with the DOM's.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : "system";
}

/** The server cannot know the visitor's choice, so it renders the neutral
 *  state and React swaps it on hydration. */
function getServerSnapshot(): Theme {
  return "system";
}

/**
 * Theme control.
 *
 * The palette itself is CSS-only: every token uses `light-dark()`, so all this
 * has to do is set `data-theme` on <html>, which flips `color-scheme`.
 * "System" removes the attribute and hands control back to the OS preference.
 *
 * The stored choice is applied by the blocking script in `ThemeScript` before
 * first paint, so there is no flash of the wrong theme. This component only
 * renders the control and keeps it in sync.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function apply(next: Theme) {
    const root = document.documentElement;
    if (next === "system") {
      root.removeAttribute("data-theme");
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Private mode or blocked storage: the theme still applies for this
        // page view, it just will not be remembered.
      }
    } else {
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Same as above.
      }
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  function cycle() {
    apply(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  }

  const label =
    theme === "system" ? "Theme: system" : theme === "dark" ? "Theme: dark" : "Theme: light";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${label}. Activate to change.`}
      title={label}
      className="grid size-9 place-items-center rounded-md border border-rule text-ink-muted transition-colors hover:border-rule-strong hover:text-ink"
    >
      <span aria-hidden className="text-[0.95rem] leading-none">
        {theme === "dark" ? "◑" : theme === "light" ? "◐" : "◒"}
      </span>
    </button>
  );
}

/**
 * Runs before first paint. Reads the stored preference and stamps `data-theme`
 * on <html>, so a user who chose dark never sees a cream flash on load.
 */
export function ThemeScript() {
  const script = `try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
