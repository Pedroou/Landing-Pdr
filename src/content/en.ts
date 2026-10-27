import type { Content } from "./types";

export const en: Content = {
  locale: "en",
  ui: {
    home: "Home",
    cv: "CV",
    languageSwitch: "Language",
    savePdf: "Save as PDF",
    email: "Email",
  },
  landing: {
    title: "Pedro Ourique",
    role: "Software Developer",
    about: [
      "Full-stack developer building AI video analytics and business software with TypeScript, React, Python and Docker.",
      "I like to learn, tinker, and share what I discover.",
    ],
    stack: [
      "TypeScript",
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Docker",
      "Tailwind",
    ],
    avatarAlt: "Portrait of Pedro Ourique",
  },
  cv: {
    title: "Pedro Ourique - Resume",
    role: "Software Developer · TypeScript · React · Python · Docker · AI & Computer Vision",
    location: "Santo Antônio da Patrulha, RS, Brazil · UTC−3 · Open to remote",
    summary:
      "Software developer with 1.5 years of experience building full-stack web products. Main developer of an ERP rewrite and sole developer of an AI video-surveillance platform at an internet provider in southern Brazil.",
    headings: {
      experience: "Experience",
      projects: "Selected projects",
      skills: "Technical skills",
      education: "Education",
      certifications: "Courses",
      languages: "Languages",
    },
    experience: [
      {
        company: "NetComet · Internet service provider",
        roles: [
          { title: "Software Developer", period: "Sep 2025 – Present" },
          {
            title: "Software Development Intern",
            period: "May 2025 – Sep 2025",
          },
        ],
        highlights: [
          "Main developer of a legacy ERP's PHP-to-React rewrite; 163 of 186 screens done and tested, not live yet.",
          "Sole developer of the company's customized Frigate NVR (Python, React), in production with 6 cameras.",
          "Built its automation engine: detections, zones and recognized faces trigger push, MQTT or alarm actions.",
          "Used Google Gemini to describe events with floor-plan context and write a daily security briefing.",
          "Configured cameras, tuned object detection and fixed dashboard UI bugs for a CCTV analytics system.",
        ],
      },
      {
        company: "Independent · Part-time",
        roles: [
          {
            title: "Full-stack Developer (freelance & side projects)",
            period: "Feb 2026 – Present",
          },
        ],
        highlights: [
          "Co-developed a school-transport platform (React, Node.js, PostgreSQL) piloted by a city for ~1,500 students.",
          "Built a link-in-bio site with an admin panel for a dance school; the client edits it without touching code.",
        ],
      },
    ],
    projects: [
      {
        name: "Agent Session Manager",
        url: "https://github.com/Pedroou/agent-session-manager",
        description:
          "Open-source KDE Plasma 6 widget (QML) showing what each Claude Code session is doing; on the KDE Store.",
      },
      {
        name: "MyNotes",
        url: "https://pedroou.github.io/MyNotes/",
        description:
          "Encrypted notes app (React) that syncs through a private GitHub repo, with QR device pairing. In daily use.",
      },
    ],
    skills: [
      {
        label: "Languages",
        items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL", "Shell"],
      },
      {
        label: "Frontend",
        items: ["React", "Vite", "Tailwind CSS", "Bootstrap", "PWAs"],
      },
      {
        label: "Backend & data",
        items: [
          "Node.js / Express",
          "PHP (Slim)",
          "REST APIs",
          "PostgreSQL",
          "MySQL",
        ],
      },
      {
        label: "AI & DevOps",
        items: [
          "Docker",
          "Linux",
          "GitHub Actions",
          "Vitest",
          "Frigate NVR",
          "Gemini API",
          "MQTT",
        ],
      },
    ],
    education: [
      {
        title:
          "Technologist degree in Systems Analysis and Development · expected 2027",
        institution:
          "Federal Institute of Rio Grande do Sul (IFRS), Osório Campus",
      },
    ],
    certifications: [
      {
        title: "Certificates",
        items: [
          "Programming for Everybody (py4e), University of Michigan",
          "Database Fundamentals, IFRS",
        ],
      },
    ],
    languages: [
      { name: "English", level: "Advanced, C1" },
      { name: "Portuguese", level: "Native" },
    ],
  },
};
