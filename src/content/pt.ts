import type { Content } from "./types";

export const pt: Content = {
  locale: "pt-BR",
  ui: {
    home: "Início",
    cv: "Currículo",
    languageSwitch: "Idioma",
    savePdf: "Salvar como PDF",
    email: "E-mail",
  },
  landing: {
    title: "Pedro Ourique",
    role: "Desenvolvedor de Software",
    about: [
      "Desenvolvedor full-stack criando software de videoanálise com IA e sistemas de gestão com TypeScript, React, Python e Docker.",
      "Gosto de aprender, experimentar e compartilhar o que descubro.",
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
    avatarAlt: "Retrato de Pedro Ourique",
  },
  cv: {
    title: "Pedro Ourique - Currículo",
    role: "Desenvolvedor de Software · TypeScript · React · Python · Docker · IA e Visão Computacional",
    location: "Santo Antônio da Patrulha, RS · Presencial, híbrido ou remoto",
    summary:
      "Desenvolvedor de software com 1,5 ano de experiência em produtos web full-stack. Principal desenvolvedor da reescrita de um ERP e único desenvolvedor de uma plataforma de videomonitoramento com IA.",
    headings: {
      experience: "Experiência profissional",
      projects: "Projetos em destaque",
      skills: "Habilidades técnicas",
      education: "Formação acadêmica",
      certifications: "Cursos",
      languages: "Idiomas",
    },
    experience: [
      {
        company: "NetComet · Provedor de internet",
        roles: [
          { title: "Desenvolvedor de Software", period: "set. 2025 – atual" },
          {
            title: "Estagiário de Desenvolvimento",
            period: "maio 2025 – set. 2025",
          },
        ],
        highlights: [
          "Conduzo a migração de um ERP de PHP para React; 163 de 186 telas prontas, ainda fora de produção.",
          "Único desenvolvedor do Frigate NVR customizado da empresa (Python, React), em produção com 6 câmeras.",
          "Criei o motor de automações: detecções, zonas e rostos reconhecidos disparam push, MQTT ou alarmes.",
          "Usei o Google Gemini para descrever eventos com base na planta do local e gerar um resumo diário.",
          "Configurei câmeras, ajustei a detecção de objetos e corrigi bugs de interface em um sistema de CFTV.",
        ],
      },
      {
        company: "Independente · Meio período",
        roles: [
          {
            title: "Desenvolvedor Full-stack (freelance e projetos paralelos)",
            period: "fev. 2026 – atual",
          },
        ],
        highlights: [
          "Codesenvolvi um sistema de transporte escolar (React, Node.js, PostgreSQL) em piloto com ~1.500 alunos.",
          "Criei um site link-in-bio com painel admin para uma escola de dança; a cliente o edita sem mexer em código.",
        ],
      },
    ],
    projects: [
      {
        name: "Agent Session Manager",
        url: "https://github.com/Pedroou/agent-session-manager",
        description:
          "Widget open source do KDE Plasma 6 (QML) que mostra o que cada sessão do Claude Code está fazendo.",
      },
      {
        name: "MyNotes",
        url: "https://pedroou.github.io/MyNotes/",
        description:
          "App de notas criptografadas (React) sincronizado por um repositório privado do GitHub. Em uso diário.",
      },
    ],
    skills: [
      {
        label: "Linguagens",
        items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL", "Shell"],
      },
      {
        label: "Frontend",
        items: ["React", "Vite", "Tailwind CSS", "Bootstrap", "PWAs"],
      },
      {
        label: "Backend e dados",
        items: [
          "Node.js / Express",
          "PHP (Slim)",
          "APIs REST",
          "PostgreSQL",
          "MySQL",
        ],
      },
      {
        label: "IA e DevOps",
        items: [
          "Docker",
          "Linux",
          "GitHub Actions",
          "Vitest",
          "Frigate NVR",
          "API Gemini",
          "MQTT",
        ],
      },
    ],
    education: [
      {
        title:
          "Tecnologia em Análise e Desenvolvimento de Sistemas · conclusão em 2027",
        institution:
          "Instituto Federal do Rio Grande do Sul (IFRS), Campus Osório",
      },
    ],
    certifications: [
      {
        title: "Certificados",
        items: [
          "py4e (University of Michigan)",
          "Banco de Dados I (IFRS)",
          "Trilha Técnico IoT 3.0 (FiberSchool)",
        ],
      },
    ],
    languages: [
      { name: "Português", level: "Nativo" },
      {
        name: "Inglês",
        level: "Avançado, C1, curso presencial na English Place",
      },
    ],
  },
};
