import { Content, Language } from "./types";
import avatar from "./images/teste.png";

export const AVATAR_URL = avatar;

export const translations: Record<Language, Content> = {
  en: {
    hero: {
      name: "Pedro Ourique",
      tagline: "Junior Developer",
      about:
        "Hi! I'm <b>Pedro Ourique</b>, a junior software developer passionate about clean code, open source, and building tools that empower others. I enjoy working with <b>JavaScript</b>, <b>HTML</b>, and <b>Docker</b>.<br /><br />I like to learn, tinker, and share what I discover.",
      avatarAlt: "Pedro Ourique Avatar",
    },
    navigation: {
      home: "Home",
      cv: "CV / Resume",
      contact: "Contact",
    },
    landing: {
      techStackTitle: "Tech Stack",
      linksTitle: "Links",
      socialTitle: "Social",
      links: {
        github: { title: "GitHub", desc: "Open source, projects, code." },
        linkedin: { title: "LinkedIn", desc: "CV & background" },
        cv: { title: "CV", desc: "View my CV" },
        email: { title: "Email", desc: "Let's get in touch" },
      },
    },
    cv: {
      identity: {
        location: "Santo Antônio da Patrulha, RS • Brasil",
        phone: "(+55) 51 98058-4781",
        email: "pedro.g.ourique@gmail.com",
        githubLabel: "GitHub: Pedroou",
        landingLabel: "Landing Page",
      },
      headings: {
        summary: "Summary",
        skills: "Technical Skills",
        experience: "Professional Experience",
        projects: "Selected Projects",
        education: "Education",
        certs: "Certifications & Courses",
        contact: "Contact",
      },
      summary:
        "Developer experienced in full-stack projects, specialized in Computer Vision and AI-integrated systems. Strong expertise in TypeScript/React for modern, high-performance web interfaces and Python + Docker for backend, model integration and deployment. Active open-source contributor — focused on UI/UX improvements, feature delivery, and performance optimization.",
      skills: {
        languagesTitle: "Languages",
        languages: [
          "TypeScript",
          "JavaScript (ES6+)",
          "Python",
          "HTML5",
          "CSS3",
          "Shell",
          "Ruby (familiar)",
          "C",
        ],
        frontendTitle: "Frontend",
        frontend: [
          "React",
          "Tailwind CSS",
          "Bootstrap",
          "Axios",
          "Animations & performance",
          "i18n",
        ],
        backendTitle: "Backend / ML / DevOps",
        backend: [
          "Docker & Compose",
          "Multi-stage Dockerfiles",
          "Nvidia Runtime (TensorRT)",
          "OpenVINO, ONNX, TFLite",
          "Jina/CLIP",
          "Makefiles",
        ],
        toolsTitle: "Tools & Practices",
        tools: [
          "Git / GitHub",
          "ESLint / Prettier",
          "npm",
          "CI-friendly builds",
          "Secrets via .env",
        ],
      },
      experience: [
        {
          role: "Developer Assistant",
          company: "NetComet",
          date: "Sep 2025 — Present",
          desc: [
            "Maintained and extended a TypeScript + React SPA for an NVR product (Frigate-based), creating modular components and enforcing strict typing & linting.",
            "Implemented streaming log ingestion (ReadableStream) and robust parsing for Frigate / go2rtc / nginx logs, improving reliability of the live logs UI.",
            "Authored multi-stage Dockerfiles that integrate OpenVINO/ONNX/TFLite models and support GPU (TensorRT) and CPU builds; automated model downloads (wget / Kaggle API).",
            "Improved UI/UX, accessibility and animation performance across the product (ripple effects, z-index issues, responsive layout fixes).",
            "Managed production configs with docker-compose and migrated sensitive keys to .env for safer deployments.",
          ],
        },
        {
          role: "Development Intern",
          company: "NetComet",
          date: "May 2025 — Sep 2025",
          desc: [
            "Worked on real-time image processing and AI pipelines for CCTV systems, contributed UI fixes and feature implementations for the monitoring dashboard.",
            "Collaborated in cross-functional tasks: camera configuration, detection tuning and integration testing on Proxmox-based environments.",
          ],
        },
      ],
      education: [
        {
          title:
            "Bachelor's in Systems Analysis and Development - (In Progress)",
          institution: "Federal Institute of Rio Grande do Sul - Osório Campus",
        },
        {
          title: "High School - (Completed — 2024)",
          institution: "Federal Institute of Rio Grande do Sul - Osório Campus",
        },
        {
          title:
            "Integrated Technical in Informatics - (Incomplete — 2021 - 2022)",
          institution: "Federal Institute of Rio Grande do Sul - Osório Campus",
        },
      ],
      certs: {
        section1Title: "Relevant Courses and Certifications",
        list1: [
          "Curso Avançado de Língua Inglesa Presencial (ENGLISH PLACE)",
          "py4e101x: Programming for Everybody (University of Michigan)",
          "Fundamentals of digital marketing (Google Digital Garage)",
          "Understand the basics of code (Google Digital Garage)",
          "Curso de Extensão de Banco de Dados 1: fundamentos (Instituto Federal RS)",
        ],
        section2Title: "FiberSchool",
        list2: [
          "Técnico IoT 3.0: Fibra Óptica",
          "Técnico IoT 3.0: Instalação Blindada",
          "Técnico IoT 3.0: Redes TCP/IP",
          "Técnico IoT 3.0: Wi-Fi Premium",
          "Técnico IoT 3.0: Dispositivos Inteligentes",
          "Trilha Técnico IoT 3.0",
          "Fibra Óptica do Zero",
          "Atendimento Encantador",
          "Cultura do Encantamento",
        ],
      },
      projects: [
        {
          title: "Frigate-Dev",
          link: "https://github.com/Pedroou/Frigate-Dev",
          desc: "TypeScript + React SPA for NVR/AI monitoring. Evidence: streaming logs parsing (web/src/utils/logUtil.ts), many UI/UX fixes and component refactors.",
        },
        {
          title: "Frigate-Config",
          link: "https://github.com/Pedroou/Frigate-Config",
          desc: "Production Frigate configs, docker-compose, secrets migration to .env and GPU/CPU build instructions.",
        },
        {
          title: "GPU Visualisation",
          link: "https://github.com/Pedroou/GPU-Video_Processing.Visualisation",
          desc: "Interactive GPU architecture visualization (NVDEC → CUDA → PCIe) built with HTML/CSS/JS and Tailwind utilities.",
        },
        {
          title: "Modern Site (template)",
          link: "https://github.com/Pedroou/html-ModernSite",
          desc: "Responsive marketing site template — Bootstrap + custom JS (animations, IntersectionObserver).",
        },
        {
          title: "Landing-Pdr",
          link: "https://github.com/Pedroou/Landing-Pdr",
          desc: "Personal landing page with language switcher, canvas background animation and contact links.",
        },
      ],
      actions: {
        print: "Print PDF",
        copied: "Copied to clipboard!",
        copyError: "Copy failed.",
      },
    },
  },
  pt: {
    hero: {
      name: "Pedro Ourique",
      tagline: "Desenvolvedor Júnior",
      about:
        "Olá! Eu sou <b>Pedro Ourique</b>, um desenvolvedor de software júnior apaixonado por código limpo, open source e construir ferramentas que ajudam outras pessoas. Gosto de trabalhar com <b>JavaScript</b>, <b>HTML</b> e <b>Docker</b>.<br /><br />Gosto de aprender, experimentar e compartilhar o que descubro.",
      avatarAlt: "Avatar Pedro Ourique",
    },
    navigation: {
      home: "Início",
      cv: "Currículo",
      contact: "Contato",
    },
    landing: {
      techStackTitle: "Linguagens",
      linksTitle: "Links",
      socialTitle: "Social",
      links: {
        github: { title: "GitHub", desc: "Open source, projetos, código." },
        linkedin: { title: "LinkedIn", desc: "CV & experiência" },
        cv: { title: "Currículo", desc: "Ver meu currículo" },
        email: { title: "Email", desc: "Vamos conversar" },
      },
    },
    cv: {
      identity: {
        location: "Santo Antônio da Patrulha, RS • Brasil",
        phone: "(+55) 51 98058-4781",
        email: "pedro.g.ourique@gmail.com",
        githubLabel: "GitHub: Pedroou",
        landingLabel: "Landing Page",
      },
      headings: {
        summary: "Resumo",
        skills: "Habilidades Técnicas",
        experience: "Experiência Profissional",
        projects: "Projetos em Destaque",
        education: "Formação",
        certs: "Certificações & Cursos",
        contact: "Contato",
      },
      summary:
        "Desenvolvedor com experiência em projetos Full-Stack, especializado em Visão Computacional e sistemas com IA. Forte domínio em TypeScript/React para interfaces web modernas e performáticas, e em Python + Docker para backend, integração de modelos e deploy. Contribuidor ativo em open-source — foco em UI/UX, entrega de funcionalidades e otimização de performance.",
      skills: {
        languagesTitle: "Linguagens",
        languages: [
          "TypeScript",
          "JavaScript (ES6+)",
          "Python",
          "HTML5",
          "CSS3",
          "Shell",
          "Ruby (familiar)",
          "C",
        ],
        frontendTitle: "Frontend",
        frontend: [
          "React",
          "Tailwind CSS",
          "Bootstrap",
          "Axios",
          "Animations & performance",
          "i18n",
        ],
        backendTitle: "Backend / ML / DevOps",
        backend: [
          "Docker & Compose",
          "Multi-stage Dockerfiles",
          "Nvidia Runtime (TensorRT)",
          "OpenVINO, ONNX, TFLite",
          "Jina/CLIP",
          "Makefiles",
        ],
        toolsTitle: "Tools & Practices",
        tools: [
          "Git / GitHub",
          "ESLint / Prettier",
          "npm",
          "CI-friendly builds",
          "Secrets via .env",
        ],
      },
      experience: [
        {
          role: "Assistente de Desenvolvedor",
          company: "NetComet",
          date: "Set 2025 — Presente",
          desc: [
            "Mantive e estendi um SPA TypeScript + React para um produto NVR (baseado em Frigate), criando componentes modulares e aplicando tipagem rigorosa e linting.",
            "Implementei ingestão de logs em streaming (ReadableStream) e parsing robusto para logs Frigate / go2rtc / nginx, melhorando a confiabilidade da UI de logs ao vivo.",
            "Escrevi Dockerfiles multi-estágio que integram modelos OpenVINO/ONNX/TFLite e suportam builds GPU (TensorRT) e CPU; automatizei downloads de modelos (wget / Kaggle API).",
            "Melhorei UI/UX, acessibilidade e performance de animações no produto (efeitos ripple, problemas de z-index, correções de layout responsivo).",
            "Gerenciei configurações de produção com docker-compose e migrei chaves sensíveis para .env para implantações mais seguras.",
          ],
        },
        {
          role: "Estagiário em Desenvolvimento",
          company: "NetComet",
          date: "Maio 2025 — Set 2025",
          desc: [
            "Trabalhei em processamento de imagem em tempo real e pipelines de IA para sistemas CCTV, contribuí com correções de UI e implementações de funcionalidades para o painel de monitoramento.",
            "Colaborei em tarefas multifuncionais: configuração de câmeras, ajuste de detecção e testes de integração em ambientes baseados em Proxmox.",
          ],
        },
      ],
      education: [
        {
          title:
            "Tecnologia em Análise e Desenvolvimento de Sistemas - (Cursando)",
          institution: "Instituto Federal do Rio Grande do Sul - Campus Osório",
        },
        {
          title: "Ensino Médio - (Concluído — 2024)",
          institution: "Instituto Federal do Rio Grande do Sul - Campus Osório",
        },
        {
          title:
            "Técnico em Informática Integrado - (Incompleto — 2021 - 2022)",
          institution: "Instituto Federal do Rio Grande do Sul - Campus Osório",
        },
      ],
      certs: {
        section1Title: "Cursos e Certificações Relevantes",
        list1: [
          "Curso Avançado de Língua Inglesa Presencial (ENGLISH PLACE)",
          "py4e101x: Programming for Everybody (University of Michigan)",
          "Fundamentals of digital marketing (Google Digital Garage)",
          "Understand the basics of code (Google Digital Garage)",
          "Curso de Extensão de Banco de Dados 1: fundamentos (Instituto Federal RS)",
        ],
        section2Title: "FiberSchool",
        list2: [
          "Técnico IoT 3.0: Fibra Óptica",
          "Técnico IoT 3.0: Instalação Blindada",
          "Técnico IoT 3.0: Redes TCP/IP",
          "Técnico IoT 3.0: Wi-Fi Premium",
          "Técnico IoT 3.0: Dispositivos Inteligentes",
          "Trilha Técnico IoT 3.0",
          "Fibra Óptica do Zero",
          "Atendimento Encantador",
          "Cultura do Encantamento",
        ],
      },
      projects: [
        {
          title: "Frigate-Dev",
          link: "https://github.com/Pedroou/Frigate-Dev",
          desc: "TypeScript + React SPA para NVR/monitoramento IA. Evidência: parsing de logs em streaming (web/src/utils/logUtil.ts), muitas correções de UI/UX e refatoração de componentes.",
        },
        {
          title: "Frigate-Config",
          link: "https://github.com/Pedroou/Frigate-Config",
          desc: "Configs de produção Frigate, docker-compose, migração de segredos para .env e instruções de build GPU/CPU.",
        },
        {
          title: "GPU Visualisation",
          link: "https://github.com/Pedroou/GPU-Video_Processing.Visualisation",
          desc: "Visualização interativa da arquitetura GPU (NVDEC → CUDA → PCIe) construída com HTML/CSS/JS e utilitários Tailwind.",
        },
        {
          title: "Modern Site (template)",
          link: "https://github.com/Pedroou/html-ModernSite",
          desc: "Template de site de marketing responsivo — Bootstrap + JS customizado (animações, IntersectionObserver).",
        },
        {
          title: "Landing-Pdr",
          link: "https://github.com/Pedroou/Landing-Pdr",
          desc: "Landing page pessoal com seletor de idiomas, animação de fundo em canvas e links de contato.",
        },
      ],
      actions: {
        print: "Imprimir PDF",
        copied: "Copiado para a área de transferência!",
        copyError: "Falha ao copiar.",
      },
    },
  },
};
