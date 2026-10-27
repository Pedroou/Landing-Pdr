export const LANGUAGES = ["en", "pt"] as const;
export type Language = (typeof LANGUAGES)[number];

export interface Content {
  /** BCP 47 tag for `<html lang>`. */
  locale: string;
  ui: {
    home: string;
    cv: string;
    languageSwitch: string;
    savePdf: string;
    email: string;
  };
  landing: {
    title: string;
    role: string;
    about: string[];
    stack: string[];
    avatarAlt: string;
  };
  cv: {
    /** Also the default file name when the page is saved as PDF. */
    title: string;
    role: string;
    location: string;
    summary: string;
    headings: {
      experience: string;
      projects: string;
      skills: string;
      education: string;
      certifications: string;
      languages: string;
    };
    experience: Array<{
      company: string;
      /** Newest first. Several roles at one company read as a promotion. */
      roles: Array<{ title: string; period: string }>;
      highlights: string[];
    }>;
    projects: Array<{
      name: string;
      url: string;
      description: string;
    }>;
    skills: Array<{ label: string; items: string[] }>;
    education: Array<{ title: string; institution: string }>;
    certifications: Array<{ title: string; items: string[] }>;
    languages: Array<{ name: string; level: string }>;
  };
}
