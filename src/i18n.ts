import { useEffect, useState } from "react";
import { content, LANGUAGES, type Language } from "./content";

export type Page = "landing" | "cv";

// The URL is the only language state: links stay shareable, and internal
// links carry it from page to page (see `pageHref`).
const PARAM = "lang";

const isLanguage = (value: unknown): value is Language =>
  LANGUAGES.includes(value as Language);

/** An explicit `?lang=` wins; otherwise the browser's preferred language. */
function initialLanguage(): Language {
  const fromUrl = new URLSearchParams(window.location.search).get(PARAM);
  if (isLanguage(fromUrl)) return fromUrl;

  const preferred = navigator.languages
    .map((tag) => tag.slice(0, 2).toLowerCase())
    .find(isLanguage);
  return preferred ?? "en";
}

/** Link to one of the site's pages, keeping the current language. */
export const pageHref = (page: Page, lang: Language) =>
  `${import.meta.env.BASE_URL}${page === "cv" ? "cv/" : ""}?${PARAM}=${lang}`;

/** Current language for a page; keeps `<html lang>` and the title in sync. */
export function useLanguage(page: Page) {
  const [lang, setLang] = useState(initialLanguage);
  const t = content[lang];

  useEffect(() => {
    document.documentElement.lang = t.locale;
    document.title = t[page].title;
  }, [t, page]);

  // An instant swap: cross-fading two languages overlaps text of different
  // lengths, which reads as a glitch rather than a transition.
  const switchTo = (next: Language) => {
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, next);
    history.replaceState(history.state, "", url);
    setLang(next);
  };

  return { lang, t, switchTo };
}
