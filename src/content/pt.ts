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
      "Trabalho na NetComet, um provedor de internet no Rio Grande do Sul, onde passo a maior parte da semana reescrevendo um ERP em PHP de mais de dez anos como uma aplicação React com API REST. Escrevo com agentes de IA, reviso cada mudança eu mesmo e só dou uma tela como pronta quando um teste no navegador confirma os dados no banco.",
      "Também fui o único desenvolvedor de um produto de videomonitoramento que a empresa criou para condomínios, prédios comerciais e fábricas, baseado no Frigate NVR. Criei regras de automação que disparam alertas por push e MQTT, e descrições de eventos geradas por IA que levam em conta a planta de um prédio.",
      "Fora do trabalho, codesenvolvi uma plataforma de transporte escolar que a prefeitura de Imbé (RS) usa para gerir o transporte de cerca de 4.000 alunos.",
      "Curso Análise e Desenvolvimento de Sistemas no IFRS, com conclusão prevista para dezembro de 2027.",
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
        name: "GeoRota",
        url: "https://lab2solutions.com.br/",
        description:
          "Plataforma de transporte escolar que codesenvolvi (React, Node.js, PostgreSQL). A prefeitura de Imbé (RS) gere com ela o transporte de cerca de 4.000 alunos.",
      },
      {
        name: "Agent Session Manager",
        url: "https://github.com/Pedroou/agent-session-manager",
        description:
          "Widget do KDE Plasma que mostra quais sessões do Claude Code estão esperando por você. Disponível na KDE Store.",
      },
      {
        name: "Claude Profiles",
        url: "https://github.com/Pedroou/claude-profiles",
        description:
          "Ferramenta de linha de comando para manter logins separados do Claude Code, como trabalho e pessoal, com configurações, skills e histórico compartilhados. Funciona em bash, zsh e fish.",
      },
      {
        name: "Oficina de Dança Renata Guimarães",
        url: "https://odreguimaraes.github.io/Bio/",
        description:
          "Página de links de uma escola de dança, com um painel em que a dona edita tudo sem código. Trabalho freelance.",
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
      "PHP",
      "Python",
      "Docker",
    ],
    location: [
      "Santo Antônio da Patrulha, RS",
      "Presencial, híbrido ou remoto",
    ],
    summary: (years) =>
      `Desenvolvedor de software com ${String(years).replace(".", ",")} ${years < 2 ? "ano" : "anos"} de experiência e estudante de Análise e Desenvolvimento de Sistemas no IFRS. Principal desenvolvedor da reescrita de um ERP de 187 telas em React, único desenvolvedor de um produto de videomonitoramento com IA e codesenvolvedor de uma plataforma de transporte escolar usada pela prefeitura de Imbé. Desenvolvo com agentes de IA e reviso e testo cada mudança.`,
    headings: {
      experience: "Experiência profissional",
      projects: "Projetos",
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
              "Reescrevo, como principal desenvolvedor, um ERP multiempresa em PHP com mais de dez anos e 187 telas (vendas, financeiro, NF-e, rede de provedor) para React e API REST em PHP.",
              "Desenvolvo a maior parte das telas com agentes de IA e reviso cada mudança eu mesmo; uma tela só conta como pronta quando o fluxo no Puppeteer passa e os dados gravados conferem no banco (175 de 187 até agora).",
              "Escrevi testes de integração da API em PHP com Docker e uma verificação pré-push que roda as duas suítes.",
            ],
          },
          {
            name: "Produto de videomonitoramento com IA",
            stack: ["Python", "FastAPI", "React", "TypeScript", "Frigate NVR"],
            highlights: [
              "Construí o produto sozinho, sobre o Frigate NVR, para condomínios, prédios comerciais e fábricas.",
              "Escrevi o motor de automações: rostos, linhas cruzadas e buscas por IA disparam push, MQTT ou alarmes.",
              "Criei descrições de eventos por IA usando a planta do prédio, e um resumo diário de segurança.",
              "Ampliei a interface React com gestão de câmeras sem reinício, mapas de calor e um painel de análises.",
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
              "Codesenvolvi uma plataforma de transporte escolar (React, Node.js, PostgreSQL) em uso pela prefeitura de Imbé (RS) nas secretarias de Educação e de Transportes (~4.000 alunos); fiz a sugestão de rotas com o OSRM.",
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
          "Widget do KDE Plasma que acompanha sessões de agentes de IA: status, modelo, contexto e branch do git. Na KDE Store.",
      },
      {
        name: "Claude Profiles",
        url: "https://github.com/Pedroou/claude-profiles",
        year: "2026",
        description:
          "Ferramenta de linha de comando (bash, zsh, fish) para logins separados do Claude Code, com configurações, skills e histórico compartilhados.",
      },
      {
        name: "Site da Lab2",
        url: "https://lab2solutions.com.br/",
        year: "2026",
        description:
          "Site da Lab2, a empresa por trás do GeoRota (React, GSAP, Motion).",
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
          "MQTT",
        ],
      },
      {
        label: "Testes e DevOps",
        items: [
          "Puppeteer",
          "Vitest",
          "Docker / Compose",
          "Git / GitHub Actions",
          "Linux",
        ],
      },
      {
        label: "IA",
        items: [
          "Agentes de IA para código (Claude Code)",
          "API Gemini",
          "Visão computacional (Frigate NVR)",
        ],
      },
    ],
    education: [
      {
        degree:
          "Tecnologia em Análise e Desenvolvimento de Sistemas (em andamento)",
        institution:
          "Instituto Federal do Rio Grande do Sul (IFRS), Campus Osório",
        period: "jan. 2025 – dez. 2027",
        grade: "Média geral 8,6/10",
        coursework: {
          label: "Disciplinas relevantes",
          items: [
            "Estruturas de Dados",
            "Programação Orientada a Objetos",
            "Banco de Dados I e II",
            "Sistemas Operacionais",
            "Análise e Projeto de Sistemas",
            "Redes de Computadores",
          ],
        },
      },
    ],
    courses: [
      { name: "Programming for Everybody", issuer: "University of Michigan" },
      { name: "Banco de Dados I: fundamentos (extensão)", issuer: "IFRS" },
      { name: "Trilha Técnico IoT 3.0", issuer: "FiberSchool" },
      { name: "Inglês avançado (presencial)", issuer: "English Place" },
    ],
    languages: [
      { name: "Português", level: "Nativo" },
      { name: "Inglês", level: "Avançado (C1)" },
    ],
  },
};
