export type Language = 'en' | 'pt';

export interface Content {
  hero: {
    name: string;
    tagline: string;
    about: string;
    avatarAlt: string;
  };
  navigation: {
    home: string;
    cv: string;
    contact: string;
  };
  landing: {
    techStackTitle: string;
    linksTitle: string;
    socialTitle: string;
    links: {
      github: { title: string; desc: string };
      linkedin: { title: string; desc: string };
      cv: { title: string; desc: string };
      email: { title: string; desc: string };
    };
  };
  cv: {
    identity: {
      location: string;
      phone: string;
      email: string;
      githubLabel: string;
      landingLabel: string;
    };
    headings: {
      summary: string;
      skills: string;
      experience: string;
      projects: string;
      education: string;
      certs: string;
      contact: string;
    };
    summary: string;
    skills: {
      languagesTitle: string;
      languages: string[];
      frontendTitle: string;
      frontend: string[];
      backendTitle: string;
      backend: string[];
      toolsTitle: string;
      tools: string[];
    };
    experience: Array<{
      role: string;
      company: string; // Extracted from original content "NetComet"
      date: string;
      desc: string[];
    }>;
    education: Array<{
      title: string;
      institution: string;
    }>;
    certs: {
      section1Title: string;
      list1: string[];
      section2Title: string;
      list2: string[];
    };
    projects: Array<{
      title: string;
      link: string;
      desc: string;
      status?: string;
    }>;
    actions: {
      print: string;
      copied: string;
      copyError: string;
    };
  };
}
