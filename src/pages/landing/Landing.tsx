import avatar from "../../assets/avatar.webp";
import { LanguageSwitch } from "../../components/LanguageSwitch";
import { profile } from "../../content";
import { localize, useLanguage } from "../../i18n";
import styles from "./Landing.module.css";

export function Landing() {
  const { lang, t, switchTo } = useLanguage("landing");

  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: t.ui.cv, href: localize("cv/", lang) },
    { label: t.ui.email, href: `mailto:${profile.email}` },
  ];

  return (
    <>
      <header className={styles.bar}>
        <LanguageSwitch
          current={lang}
          label={t.ui.languageSwitch}
          onSwitch={switchTo}
        />
      </header>

      <main className={styles.hero}>
        <figure className={styles.portrait}>
          <img
            src={avatar}
            alt={t.landing.avatarAlt}
            width={160}
            height={160}
          />
          {/* A nod to the day job: an NVR-style detection overlay. */}
          <span className={styles.detection} aria-hidden="true">
            <span className={styles.label}>person 98%</span>
          </span>
        </figure>

        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.role}>{t.landing.role}</p>

        <div className={styles.about}>
          {t.landing.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p className={styles.stack}>{t.landing.stack.join(", ")}</p>

        <ul className={styles.links}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
