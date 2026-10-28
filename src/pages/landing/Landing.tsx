import avatar from "../../assets/avatar.webp";
import { SiteHeader } from "../../components/SiteHeader";
import { profile } from "../../content";
import { useLanguage } from "../../i18n";
import styles from "./Landing.module.css";

export function Landing() {
  const { lang, t, switchTo } = useLanguage("landing");

  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: t.ui.email, href: `mailto:${profile.email}` },
  ];

  return (
    <>
      <SiteHeader page="landing" lang={lang} t={t} onLanguage={switchTo} />

      <main className={styles.hero}>
        <figure className={styles.portrait}>
          <img
            src={avatar}
            alt={t.landing.avatarAlt}
            width={160}
            height={160}
          />
          {/* A nod to the day job: an NVR detection with face recognition. */}
          <span className={styles.detection} aria-hidden="true">
            <span className={styles.label}>pedro 98%</span>
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

        <section className={styles.projects}>
          <h2 className={styles.projectsTitle}>{t.landing.projectsTitle}</h2>
          <ul>
            {t.landing.projects.map((project) => (
              <li key={project.url}>
                <a href={project.url} className="hover-underline">
                  {project.name}
                </a>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <ul className={styles.links}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="hover-underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
