export const LANGUAGES = ["en", "pt"] as const;
export type Language = (typeof LANGUAGES)[number];

export interface Content {
  /** BCP 47 tag for `<html lang>`. */
  locale: string;
  ui: {
    home: string;
    cv: string;
    languageSwitch: string;
    print: string;
    downloadPdf: string;
    email: string;
    themeLight: string;
    themeDark: string;
  };
  landing: {
    title: string;
    role: string;
    about: string[];
    stack: string[];
    projectsTitle: string;
    /** Only things a visitor can open and use. */
    projects: Array<{ name: string; url: string; description: string }>;
    avatarAlt: string;
  };
  cv: {
    /** Also the default file name when the page is saved as PDF. */
    title: string;
    /** Role first, then the stack. */
    headline: string[];
    /** Place and work arrangement; rendered with separators. */
    location: string[];
    /** Takes the years of experience, already rounded (see `profile.ts`). */
    summary: (years: number) => string;
    headings: {
      experience: string;
      projects: string;
      skills: string;
      education: string;
      courses: string;
      languages: string;
    };
    experience: Array<{
      company: string;
      /** What the company does, or the terms of the work. */
      about: string;
      /** Newest first. Several roles at one company read as a promotion. */
      roles: Array<{ title: string; period: string }>;
      /**
       * One group per product worked on, so a job with two products reads as
       * two short stories. A job with one product can leave the name out.
       */
      work: Array<{ name?: string; stack?: string[]; highlights: string[] }>;
    }>;
    /**
     * Best first, at most 3. All show on screen; paper keeps as many as fit
     * on one page, counted at build time by scripts/cv-pdf.ts.
     */
    projects: Array<{
      name: string;
      url: string;
      /** Shown in the date column on screen; print shows the URL instead. */
      year: string;
      description: string;
    }>;
    skills: Array<{ label: string; items: string[] }>;
    education: Array<{
      degree: string;
      institution: string;
      period: string;
      /** Average grade from the transcript; update each semester. */
      grade: string;
      /** Shown on screen only: the printed CV has no room for it. */
      coursework: { label: string; items: string[] };
    }>;
    courses: Array<{ name: string; issuer: string }>;
    languages: Array<{ name: string; level: string }>;
  };
}
