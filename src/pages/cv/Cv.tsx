import type { ReactNode } from "react";
import { LanguageSwitch } from "../../components/LanguageSwitch";
import { type Content, displayUrl, profile } from "../../content";
import { localize, useLanguage } from "../../i18n";
import styles from "./Cv.module.css";

async function saveAsPdf() {
  // Printing before the web font arrives would bake the fallback into the PDF.
  await document.fonts.ready;
  window.print();
}

export function Cv() {
  const { lang, t, switchTo } = useLanguage("cv");
  const { cv } = t;

  const contacts = [
    { label: profile.email, href: `mailto:${profile.email}` },
    {
      label: profile.phone,
      href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
    },
    { label: displayUrl(profile.github), href: profile.github },
    { label: displayUrl(profile.linkedin), href: profile.linkedin },
    { label: displayUrl(profile.site), href: profile.site },
  ];

  return (
    <>
      <header className={styles.toolbar}>
        <a href={localize("../", lang)}>{t.ui.home}</a>
        <LanguageSwitch
          current={lang}
          label={t.ui.languageSwitch}
          onSwitch={switchTo}
        />
        <button type="button" className={styles.save} onClick={saveAsPdf}>
          {t.ui.savePdf}
        </button>
      </header>

      <main className={styles.sheet}>
        <header className={styles.header}>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.role}>{cv.role}</p>
          <ul className={styles.contacts}>
            <li>{cv.location}</li>
            {contacts.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </header>

        <p className={styles.summary}>{cv.summary}</p>

        {/* Skills first: recruiters scan for stack keywords before reading roles. */}
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

        <Section title={cv.headings.experience}>
          {cv.experience.map((job) => (
            <Job key={job.company} {...job} />
          ))}
        </Section>

        <Section title={cv.headings.projects}>
          {cv.projects.map((project) => (
            <article key={project.url} className={styles.entry}>
              <EntryHead
                title={project.name}
                aside={<a href={project.url}>{displayUrl(project.url)}</a>}
              />
              <p>{project.description}</p>
            </article>
          ))}
        </Section>

        <Section title={cv.headings.education}>
          {cv.education.map((item) => (
            <article key={item.title} className={styles.entry}>
              <h3 className={styles.entryTitle}>{item.title}</h3>
              <p className={styles.org}>{item.institution}</p>
            </article>
          ))}
        </Section>

        <Section title={cv.headings.certifications}>
          <dl className={styles.pairs}>
            {cv.certifications.map(({ title, items }) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{items.join("; ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title={cv.headings.languages}>
          <p>
            {cv.languages
              .map(({ name, level }) => `${name} (${level})`)
              .join(", ")}
          </p>
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

/** One role: "Title, Company" on one line. Several: company over stacked roles. */
function Job({
  company,
  roles,
  highlights,
}: Content["cv"]["experience"][number]) {
  const [only] = roles;
  return (
    <article className={styles.entry}>
      {roles.length === 1 && only ? (
        <EntryHead
          title={
            <>
              {only.title}, <span className={styles.org}>{company}</span>
            </>
          }
          aside={only.period}
        />
      ) : (
        <>
          <h3 className={styles.entryTitle}>{company}</h3>
          {roles.map((role) => (
            <EntryHead
              key={role.period}
              title={role.title}
              aside={role.period}
              heading={false}
            />
          ))}
        </>
      )}
      <ul className={styles.highlights}>
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function EntryHead({
  title,
  aside,
  heading = true,
}: {
  title: ReactNode;
  aside: ReactNode;
  heading?: boolean;
}) {
  const Title = heading ? "h3" : "p";
  return (
    <div className={styles.entryHead}>
      <Title className={heading ? styles.entryTitle : undefined}>{title}</Title>
      <span className={styles.aside}>{aside}</span>
    </div>
  );
}
