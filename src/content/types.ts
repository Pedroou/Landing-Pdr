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
    /** Place, time zone, work arrangement; rendered with separators. */
    location: string[];
    summary: string;
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
    projects: Array<{
      name: string;
      url: string;
      /** Shown in the date column on screen; print shows the URL instead. */
      year: string;
      description: string;
    }>;
    skills: Array<{ label: string; items: string[] }>;
    education: Array<{ degree: string; institution: string; period: string }>;
    courses: string[];
    languages: Array<{ name: string; level: string }>;
  };
}
