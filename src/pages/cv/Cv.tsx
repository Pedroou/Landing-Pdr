import type { ReactNode } from "react";
import { SiteHeader } from "../../components/SiteHeader";
import {
  type Content,
  displayUrl,
  profile,
  yearsOfExperience,
} from "../../content";
import { useLanguage } from "../../i18n";
import styles from "./Cv.module.css";

type CvContent = Content["cv"];

async function printCv() {
  // Printing before the web font arrives would bake the fallback into the PDF.
  await document.fonts.ready;
  window.print();
}

export function Cv() {
  const { lang, t, switchTo } = useLanguage("cv");
  const { cv } = t;

  // Paper can't be clicked, so print spells out every address; the screen
  // names the profiles instead, and leaves out a link to the page itself.
  const direct: Contact[] = [
    { screen: profile.email, href: `mailto:${profile.email}` },
    {
      screen: profile.phone,
      href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
    },
  ];
  const links: Contact[] = [
    { screen: null, href: profile.site },
    { screen: "GitHub", href: profile.github },
    { screen: "LinkedIn", href: profile.linkedin },
  ];

  return (
    <>
      <SiteHeader page="cv" lang={lang} t={t} onLanguage={switchTo} />

      <main className={styles.cv}>
        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={printCv}>
            {t.ui.print}
          </button>
          {/* Printed at build time by scripts/cv-pdf.ts; missing under `npm run dev`. */}
          <a
            className={styles.primary}
            href={`pedro-ourique-cv-${lang}.pdf`}
            download={`${cv.title}.pdf`}
          >
            {t.ui.downloadPdf}
          </a>
        </div>

        <header className={styles.header}>
          <h1 className={styles.name}>{profile.name}</h1>
          <ul className={`${styles.dotted} ${styles.headline}`}>
            {cv.headline.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {/* Three lists, two lines. Screen: place, then contacts and links.
              Paper: place and contacts, then the spelled-out links. Each line
              is short enough not to wrap, so no line ends on a stray dot. */}
          <div className={styles.contactBlock}>
            <ul
              className={`${styles.dotted} ${styles.contacts} ${styles.place}`}
            >
              {cv.location.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Contacts list={direct} className={styles.direct} />
            <Contacts list={links} className={styles.links} />
          </div>
        </header>

        <p className={styles.summary}>{cv.summary(yearsOfExperience())}</p>

        <Section title={cv.headings.experience}>
          {cv.experience.map((job) => (
            <Job key={job.company} {...job} />
          ))}
        </Section>

        <Section title={cv.headings.projects}>
          {cv.projects.map((project) => (
            <Project key={project.url} {...project} />
          ))}
        </Section>

        <Section title={cv.headings.skills}>
          <dl className={styles.pairs}>
            {cv.skills.map(({ label, items }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title={cv.headings.education}>
          {cv.education.map(
            ({ degree, institution, period, grade, coursework }) => (
              <article key={degree} className={styles.entry}>
                <Dated date={period}>
                  <h3 className={styles.title}>{degree}</h3>
                </Dated>
                <p className={styles.meta}>
                  {institution}
                  <Sep />
                  {grade}
                </p>
                {/* Screen only: the one-page print has no room for it. */}
                <p className={styles.coursework}>
                  <span className={styles.courseworkLabel}>
                    {coursework.label}:
                  </span>{" "}
                  {coursework.items.join(", ")}
                </p>
              </article>
            ),
          )}
        </Section>

        <Section title={cv.headings.courses}>
          <div className={styles.entry}>
            <ul className={styles.courseList}>
              {cv.courses.map(({ name, issuer }) => (
                <li key={name}>
                  {name}
                  <Sep />
                  <span className={styles.issuer}>{issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section title={cv.headings.languages}>
          <dl className={`${styles.pairs} ${styles.languages}`}>
            {cv.languages.map(({ name, level }) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{level}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </main>
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      {children}
    </section>
  );
}

/** `screen: null` is print-only: the page linking to itself. */
type Contact = { screen: string | null; href: string };

function Contacts({
  list,
  className,
}: {
  list: Contact[];
  className?: string;
}) {
  return (
    <ul className={`${styles.dotted} ${styles.contacts} ${className}`}>
      {list.map(({ screen, href }) => (
        <li key={href} className={screen ? "" : styles.printOnly}>
          <a href={href}>
            <span className={styles.screenOnly}>{screen}</span>
            <span className={styles.printOnly}>
              {href.startsWith("http") ? displayUrl(href) : screen}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * A title with its date. The date comes second in the source, so extracted
 * text reads "Software Developer Sep 2025 – Present" on one line; the screen
 * layout moves it into the left column.
 */
function Dated({ date, children }: { date: ReactNode; children: ReactNode }) {
  return (
    <div className={styles.dated}>
      {children}
      <span className={styles.date}>{date}</span>
    </div>
  );
}

/** Company first, then its roles (newest first), then one block per product. */
function Job({ company, about, roles, work }: CvContent["experience"][number]) {
  return (
    <article className={styles.entry}>
      <h3 className={styles.company}>
        {company}
        <Sep />
        <span className={styles.about}>{about}</span>
      </h3>
      {roles.map((role) => (
        <Dated key={role.period} date={role.period}>
          <p className={styles.role}>{role.title}</p>
        </Dated>
      ))}
      {work.map(({ name, stack, highlights }) => (
        <div key={highlights[0]}>
          {name && (
            <p className={styles.product}>
              {name}
              {stack && (
                <>
                  <Sep />
                  <span className={styles.stack}>{stack.join(", ")}</span>
                </>
              )}
            </p>
          )}
          <ul className={styles.highlights}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
}

/* Real spacing around the dot; a plain " · " in this face sits too tight. */
const Sep = () => (
  <span className={styles.sep} aria-hidden="true">
    {" · "}
  </span>
);

/*
 * The whole row opens the project ("stretched link"): the name is the only
 * link, so screen readers announce just the name, and its ::after covers the
 * row.
 */
function Project({
  name,
  url,
  year,
  description,
}: CvContent["projects"][number]) {
  return (
    <article className={`${styles.entry} ${styles.project}`}>
      <Dated
        date={
          <>
            <span className={styles.screenOnly}>{year}</span>
            {/* Paper can't be clicked, so print spells the address out. */}
            <span className={styles.printOnly}>{displayUrl(url)}</span>
          </>
        }
      >
        <h3 className={styles.title}>
          <a href={url} className={styles.projectLink}>
            {name}
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </a>
        </h3>
      </Dated>
      <p>{description}</p>
    </article>
  );
}
