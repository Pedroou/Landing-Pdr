import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { content, LANGUAGES, type Language } from "./content";

// The URL is the only language state: links stay shareable, and internal
// links carry it from page to page (see `localize`).
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

/** Internal link that keeps the current language. */
export const localize = (path: string, lang: Language) =>
  `${path}?${PARAM}=${lang}`;

/** Current language for a page; keeps `<html lang>` and the title in sync. */
export function useLanguage(page: "landing" | "cv") {
  const [lang, setLang] = useState(initialLanguage);
  const t = content[lang];

  useEffect(() => {
    document.documentElement.lang = t.locale;
    document.title = t[page].title;
  }, [t, page]);

  const switchTo = (next: Language) => {
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, next);
    history.replaceState(history.state, "", url);

    // Cross-fade the text swap where View Transitions are supported.
    if (document.startViewTransition) {
      document.startViewTransition(() => flushSync(() => setLang(next)));
    } else {
      setLang(next);
    }
  };

  return { lang, t, switchTo };
}
