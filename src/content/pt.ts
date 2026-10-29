import type { Content } from "./types";

export const pt: Content = {
  locale: "pt-BR",
  ui: {
    home: "Início",
    cv: "Currículo",
    languageSwitch: "Idioma",
    print: "Imprimir",
    downloadPdf: "Baixar PDF",
    email: "E-mail",
    themeLight: "Mudar para o tema claro",
    themeDark: "Mudar para o tema escuro",
  },
  landing: {
    title: "Pedro Ourique",
    role: "Desenvolvedor de Software",
    about: [
      "Trabalho na NetComet, um provedor de internet no Rio Grande do Sul, onde passo a maior parte da semana reescrevendo um ERP em PHP de mais de dez anos como uma aplicação React com API REST.",
      "Também fui o único desenvolvedor de um produto de videomonitoramento que a empresa criou para condomínios, prédios comerciais e fábricas, baseado no Frigate NVR. Criei regras de automação que disparam alertas por push e MQTT, e descrições de eventos geradas por IA que levam em conta a planta de um prédio.",
      "Fora do trabalho, desenvolvi uma plataforma de transporte escolar que a rede municipal de ensino de uma cidade usa em piloto, com cerca de 1.500 alunos.",
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
    projectsTitle: "Projetos",
    projects: [
      {
        name: "Agent Session Manager",
        url: "https://github.com/Pedroou/agent-session-manager",
        description:
          "Widget do KDE Plasma que mostra quais sessões do Claude Code estão esperando por você. Disponível na KDE Store.",
      },
      {
        name: "Claude Acc-Manager",
        url: "https://github.com/Pedroou/Claude-Acc-Manager",
        description:
          "Ferramenta de linha de comando para usar várias contas do Claude Code na mesma máquina.",
      },
    ],
    avatarAlt: "Retrato de Pedro Ourique",
  },
  cv: {
    title: "Pedro Ourique - Currículo",
    headline: [
      "Desenvolvedor de Software",
      "React",
      "TypeScript",
      "Node.js",
      "Docker",
      "IA e Visão Computacional",
    ],
    location: [
      "Santo Antônio da Patrulha, RS",
      "Presencial, híbrido ou remoto",
    ],
    summary:
      "Desenvolvedor de software com 1,5 ano de experiência. Hoje reescrevo um ERP legado em React e, por fora, desenvolvo projetos próprios: ferramentas que uso no dia a dia, projetos open source e trabalhos freelance.",
    headings: {
      experience: "Experiência profissional",
      projects: "Projetos em destaque",
      skills: "Habilidades técnicas",
      education: "Formação acadêmica",
      courses: "Cursos",
      languages: "Idiomas",
    },
    experience: [
      {
        company: "NetComet",
        about: "Provedor de internet",
        roles: [
          { title: "Desenvolvedor de Software", period: "set. 2025 – atual" },
          {
            title: "Estagiário de Desenvolvimento",
            period: "maio 2025 – set. 2025",
          },
        ],
        work: [
          {
            name: "Reescrita do ERP",
            stack: ["React", "JavaScript", "PHP (Slim)", "MySQL", "Puppeteer"],
            highlights: [
              "Principal desenvolvedor da reescrita de um ERP multiempresa em PHP com mais de dez anos e 186 telas (vendas, financeiro, NF-e, rede de provedor) para React e API REST.",
              "Fluxos E2E com Puppeteer conferidos no banco e testes de integração PHP em Docker.",
            ],
          },
          {
            name: "Produto de videomonitoramento com IA",
            stack: ["Python", "FastAPI", "React", "TypeScript", "Frigate NVR"],
            highlights: [
              "Único desenvolvedor de um produto de videomonitoramento para condomínios, prédios e fábricas, baseado no Frigate NVR.",
              "Criei o motor de automações: rostos, cruzamento de linhas e buscas por IA disparam push, MQTT ou alarmes.",
              "Criei descrições de eventos por IA que usam a planta de um prédio, e um resumo diário de segurança.",
              "Adicionei à interface React gestão de câmeras sem reinício, mapas de calor e um painel de análises.",
              "Como estagiário, configurei câmeras, ajustei a detecção de objetos e corrigi bugs de interface.",
            ],
          },
        ],
      },
      {
        company: "Independente",
        about: "Freelance e projetos paralelos, meio período",
        roles: [
          { title: "Desenvolvedor Full-stack", period: "fev. 2026 – atual" },
        ],
        work: [
          {
            highlights: [
              "Desenvolvi uma plataforma de transporte escolar (React, Node.js, PostgreSQL) hoje em uso numa rede municipal: ~1.500 alunos em 19 escolas, com sugestão de rotas baseada no OSRM.",
              "Fiz a página de links de uma escola de dança e um painel para editá-la sem código (React, API do GitHub).",
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
          "Widget do KDE Plasma 6 (QML, JavaScript) que acompanha sessões de agentes de IA: status ao vivo, modelo, uso de contexto e branch do git, e um clique leva ao terminal da sessão. Disponível na KDE Store.",
      },
      {
        name: "Claude Acc-Manager",
        url: "https://github.com/Pedroou/Claude-Acc-Manager",
        year: "2026",
        description:
          "Ferramenta de linha de comando (fish) para usar várias contas do Claude Code na mesma máquina, com histórico, configurações e skills compartilhados.",
      },
    ],
    skills: [
      {
        label: "Linguagens",
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
        label: "Backend e dados",
        items: [
          "Node.js / Express",
          "FastAPI",
          "PHP (Slim)",
          "APIs REST",
          "PostgreSQL",
          "MySQL",
        ],
      },
      {
        label: "DevOps e IA",
        items: [
          "Docker / Compose",
          "Linux",
          "Git / GitHub Actions",
          "Vitest",
          "Puppeteer",
          "API Gemini",
          "MQTT",
        ],
      },
    ],
    education: [
      {
        degree: "Tecnologia em Análise e Desenvolvimento de Sistemas",
        institution:
          "Instituto Federal do Rio Grande do Sul (IFRS), Campus Osório",
        period: "Conclusão em 2027",
      },
    ],
    courses: [
      "py4e (University of Michigan)",
      "Banco de Dados I (IFRS)",
      "Trilha Técnico IoT 3.0: fibra óptica, redes TCP/IP e Wi-Fi (FiberSchool)",
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
