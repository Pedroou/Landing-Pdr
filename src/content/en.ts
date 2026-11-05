import type { Content } from "./types";

export const en: Content = {
  locale: "en",
  ui: {
    home: "Home",
    cv: "CV",
    languageSwitch: "Language",
    print: "Print",
    downloadPdf: "Download PDF",
    email: "Email",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
  },
  landing: {
    title: "Pedro Ourique",
    role: "Software Developer",
    about: [
      "I work at NetComet, an internet provider in southern Brazil, where most of my week goes into rewriting a decade-old PHP ERP as a React app with a REST API. I write it with AI coding agents, review every change myself, and only call a screen done when a browser test confirms its data in the database.",
      "I was also the only developer of a video-surveillance product the company built for condominiums, office buildings and factories, based on Frigate NVR. I added automation rules that send push and MQTT alerts, and AI event descriptions that take a building's floor plan into account.",
      "Outside work, I co-developed a school-transport platform that the municipality of Imbé, RS, uses to run school transport for about 1,500 students.",
      "I'm studying Systems Analysis and Development at IFRS and expect to graduate in December 2027.",
    ],
    stack: [
      "TypeScript",
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "PHP",
      "PostgreSQL",
      "Docker",
    ],
    projectsTitle: "Projects",
    projects: [
      {
        name: "Agent Session Manager",
        url: "https://github.com/Pedroou/agent-session-manager",
        description:
          "KDE Plasma widget that shows which Claude Code sessions are waiting on you. Available on the KDE Store.",
      },
    ],
    avatarAlt: "Portrait of Pedro Ourique",
  },
  cv: {
    title: "Pedro Ourique - Resume",
    headline: [
      "Software Developer",
      "React",
      "TypeScript",
      "Node.js",
      "PHP",
      "Python",
      "Docker",
    ],
    location: [
      "Santo Antônio da Patrulha, RS, Brazil",
      "On-site, hybrid or remote",
    ],
    summary: (years) =>
      `Software developer with ${years} years of experience and a Systems Analysis and Development student at IFRS. Main developer of a 186-screen ERP rewrite in React, sole developer of an AI video-surveillance product and co-developer of a school-transport platform used by the city of Imbé. I build with AI agents, then review and test every change.`,
    headings: {
      experience: "Experience",
      projects: "Projects",
      skills: "Technical skills",
      education: "Education",
      courses: "Courses",
      languages: "Languages",
    },
    experience: [
      {
        company: "NetComet",
        about: "Internet service provider",
        roles: [
          { title: "Software Developer", period: "Sep 2025 – Present" },
          {
            title: "Software Development Intern",
            period: "May 2025 – Sep 2025",
          },
        ],
        work: [
          {
            name: "ERP rewrite",
            stack: ["React", "JavaScript", "PHP (Slim)", "MySQL", "Puppeteer"],
            highlights: [
              "Rewrite, as main developer, a decade-old, 186-screen multi-tenant PHP ERP (sales, finance, Brazilian e-invoicing, ISP network management) as a React app on a PHP REST API.",
              "Build most screens with AI coding agents and review every change myself; a screen counts as done only when its Puppeteer flow passes and the saved rows match the database (163 of 186 so far).",
              "Wrote Dockerized PHP integration tests for the API and a pre-push check that runs both test suites.",
            ],
          },
          {
            name: "AI video-surveillance product",
            stack: ["Python", "FastAPI", "React", "TypeScript", "Frigate NVR"],
            highlights: [
              "Built it alone on Frigate NVR, for condominiums, office buildings and factories.",
              "Wrote its automation engine: faces, line crossings and AI searches trigger push, MQTT or on-screen alarms.",
              "Added Gemini event descriptions that use the building's floor plan as context, plus a daily security briefing.",
              "Extended its React UI with camera management without restarts, activity heatmaps and an analytics dashboard.",
            ],
          },
        ],
      },
      {
        company: "Independent",
        about: "Freelance & side projects, part-time",
        roles: [
          { title: "Full-stack Developer", period: "Feb 2026 – Present" },
        ],
        work: [
          {
            highlights: [
              "Co-developed a school-transport platform (React, Node.js, PostgreSQL) in use by the municipality of Imbé, RS, in its education and transport departments (~1,500 students); built its OSRM route suggestions.",
              "Built a dance school's links page and an admin panel to edit it without code (React, GitHub API).",
            ],
          },
        ],
      },
    ],
    projects: [
      {
        name: "Agent Session Manager",
        url: "https://github.com/Pedroou/agent-session-manager",
        year: "2026",
        description:
          "KDE Plasma widget that tracks AI coding-agent sessions: status, model, context and git branch. On the KDE Store.",
      },
    ],
    skills: [
      {
        label: "Programming",
        items: [
          "TypeScript",
          "JavaScript",
          "Python",
          "PHP",
          "SQL",
          "Shell",
          "HTML/CSS",
        ],
      },
      {
        label: "Frontend",
        items: ["React", "Vite", "Tailwind CSS", "Bootstrap", "PWAs"],
      },
      {
        label: "Backend & data",
        items: [
          "Node.js / Express",
          "FastAPI",
          "PHP (Slim)",
          "REST APIs",
          "PostgreSQL",
          "MySQL",
          "MQTT",
        ],
      },
      {
        label: "Testing & DevOps",
        items: [
          "Puppeteer",
          "Vitest",
          "Docker / Compose",
          "Git / GitHub Actions",
          "Linux",
        ],
      },
      {
        label: "AI",
        items: [
          "AI coding agents (Claude Code)",
          "Gemini API",
          "Computer vision (Frigate NVR)",
        ],
      },
    ],
    education: [
      {
        degree:
          "Technologist degree in Systems Analysis and Development (in progress)",
        institution:
          "Federal Institute of Rio Grande do Sul (IFRS), Osório Campus",
        period: "Feb 2025 – Dec 2027",
      },
    ],
    courses: [
      { name: "Programming for Everybody", issuer: "University of Michigan" },
      { name: "Database Fundamentals (extension)", issuer: "IFRS" },
      { name: "IoT 3.0 Technician track", issuer: "FiberSchool" },
      { name: "Advanced English (in person)", issuer: "English Place" },
    ],
    languages: [
      { name: "English", level: "Advanced (C1)" },
      { name: "Portuguese", level: "Native" },
    ],
  },
};
