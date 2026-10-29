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
      "I work at NetComet, an internet provider in southern Brazil, where most of my week goes into rewriting a decade-old PHP ERP as a React app with a REST API.",
      "I was also the only developer of a video-surveillance product the company built for condominiums, office buildings and factories, based on Frigate NVR. I added automation rules that send push and MQTT alerts, and AI event descriptions that take a building's floor plan into account.",
      "Outside work, I developed a school-transport platform that a city's school network is piloting with about 1,500 students.",
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
      {
        name: "Claude Acc-Manager",
        url: "https://github.com/Pedroou/Claude-Acc-Manager",
        description:
          "Command-line tool for running several Claude Code accounts on one machine.",
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
      "Docker",
      "AI & Computer Vision",
    ],
    location: [
      "Santo Antônio da Patrulha, RS, Brazil",
      "UTC−3",
      "Open to remote",
    ],
    summary:
      "Software developer with 1.5 years of experience. I'm currently rewriting a legacy ERP in React, and on the side I build projects of my own: tools I use daily, open-source releases and freelance work.",
    headings: {
      experience: "Experience",
      projects: "Selected projects",
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
              "Main developer of the rewrite of a decade-old, 186-screen multi-tenant PHP ERP into React and a PHP REST API, covering sales, finance, Brazilian e-invoicing and ISP network management.",
              "Puppeteer end-to-end flows checked against the database, and Dockerized PHP integration tests.",
            ],
          },
          {
            name: "AI video-surveillance product",
            stack: ["Python", "FastAPI", "React", "TypeScript", "Frigate NVR"],
            highlights: [
              "Sole developer of a video-surveillance product for condominiums, buildings and factories, built on Frigate NVR.",
              "Built its automation engine: face recognition, line crossings and plain-language AI searches trigger push, MQTT or on-screen alarms.",
              "Added AI event descriptions that use a building's floor plan, plus a daily security briefing.",
              "Added camera management without restarts, activity heatmaps and an analytics dashboard to its React UI.",
              "As an intern, configured cameras, tuned object detection and fixed dashboard UI bugs.",
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
              "Developed a school-transport platform (React, Node.js, PostgreSQL) now in use by a municipal school network: ~1,500 students across 19 schools, with route suggestions built on OSRM.",
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
          "KDE Plasma 6 panel widget (QML, JavaScript) that tracks running AI coding-agent sessions: live status, model, context use and git branch, with one click to jump to a session's terminal. Available on the KDE Store.",
      },
      {
        name: "Claude Acc-Manager",
        url: "https://github.com/Pedroou/Claude-Acc-Manager",
        year: "2026",
        description:
          "Command-line tool (fish) for running several Claude Code accounts on one machine with one shared set of history, settings and skills.",
      },
    ],
    skills: [
      {
        label: "Languages",
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
        ],
      },
      {
        label: "DevOps & AI",
        items: [
          "Docker / Compose",
          "Linux",
          "Git / GitHub Actions",
          "Vitest",
          "Puppeteer",
          "Gemini API",
          "MQTT",
        ],
      },
    ],
    education: [
      {
        degree: "Technologist degree in Systems Analysis and Development",
        institution:
          "Federal Institute of Rio Grande do Sul (IFRS), Osório Campus",
        period: "Expected 2027",
      },
    ],
    courses: [
      "Programming for Everybody (py4e), University of Michigan",
      "Database Fundamentals, IFRS",
    ],
    languages: [
      { name: "English", level: "Advanced, C1" },
      { name: "Portuguese", level: "Native" },
    ],
  },
};
