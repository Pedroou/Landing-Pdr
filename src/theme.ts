import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

// The inline script in each page's <head> applies a saved theme before first
// paint with the same key and attribute; keep them in sync.
const STORAGE_KEY = "theme";
const THEME_COLOR: Record<Theme, string> = {
  light: "#f9fafb",
  dark: "#0d1012",
};
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null; // Storage can be blocked; fall back to the OS setting.
  }
}

/** Point the browser UI colour at the chosen theme, or back at the OS one. */
function syncThemeColor(saved: Theme | null) {
  for (const meta of document.querySelectorAll<HTMLMetaElement>(
    'meta[name="theme-color"]',
  )) {
    const own: Theme = meta.media.includes("dark") ? "dark" : "light";
    meta.content = THEME_COLOR[saved ?? own];
  }
}

/**
 * Follows the OS until the visitor picks a theme; the pick is remembered.
 * The `data-theme` attribute pins `color-scheme`, which drives every colour.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => savedTheme() ?? (systemDark.matches ? "dark" : "light"),
  );

  useEffect(() => {
    syncThemeColor(savedTheme());
    const followSystem = () => {
      if (!savedTheme()) setTheme(systemDark.matches ? "dark" : "light");
    };
    systemDark.addEventListener("change", followSystem);
    return () => systemDark.removeEventListener("change", followSystem);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Still applies for this page view.
    }
    document.documentElement.dataset.theme = next;
    syncThemeColor(next);
    setTheme(next);
  };

  return { theme, toggle };
}
