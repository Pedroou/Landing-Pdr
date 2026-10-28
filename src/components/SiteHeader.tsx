import { useEffect, useRef, useState } from "react";
import { type Content, type Language, profile } from "../content";
import { type Page, pageHref } from "../i18n";
import { useTheme } from "../theme";
import styles from "./SiteHeader.module.css";

/** Each language is named in itself, as people look for it. */
const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  pt: "Português",
};

interface Props {
  page: Page;
  lang: Language;
  t: Content;
  onLanguage: (lang: Language) => void;
}

export function SiteHeader({ page, lang, t, onLanguage }: Props) {
  const { theme, toggle } = useTheme();
  const scrolled = useScrolled();
  const otherLang: Language = lang === "en" ? "pt" : "en";
  const links = [
    { page: "landing", label: t.ui.home },
    { page: "cv", label: t.ui.cv },
  ] as const;

  return (
    <>
      <div ref={scrolled.sentinel} className={styles.sentinel} />
      <header
        className={styles.header}
        data-scrolled={scrolled.value || undefined}
      >
        <div className={styles.inner}>
          <a href={pageHref("landing", lang)} className={styles.wordmark}>
            {profile.name}
          </a>

          <nav className={styles.nav}>
            {links.map((link) => (
              <a
                key={link.page}
                href={pageHref(link.page, lang)}
                className="hover-underline"
                aria-current={link.page === page ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <span className={styles.divider} />

          <button
            type="button"
            className={styles.control}
            onClick={() => onLanguage(otherLang)}
          >
            <span className="visually-hidden">{t.ui.languageSwitch}: </span>
            <span lang={otherLang} className="label-long">
              {LANGUAGE_NAMES[otherLang]}
            </span>
            <span className="label-short" aria-hidden="true">
              {otherLang.toUpperCase()}
            </span>
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label={theme === "dark" ? t.ui.themeLight : t.ui.themeDark}
            onClick={toggle}
          >
            {/* Like the language switch, the icon shows where a click leads. */}
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>
    </>
  );
}

/**
 * True once the page has scrolled, so the bar can gain its background. An
 * observer on a 1px marker at the top of the page avoids per-scroll work.
 */
function useScrolled() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(false);

  useEffect(() => {
    const marker = sentinel.current;
    if (!marker) return;
    const observer = new IntersectionObserver(([entry]) =>
      setValue(entry ? !entry.isIntersecting : false),
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  return { sentinel, value };
}

const iconProps = {
  className: styles.icon,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
} as const;

function SunIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}
