/**
 * A single selectable entry of a section: a technology, a project or a role.
 * This is the canonical shape consumed by the character-select screen.
 */
/** Identity and contact details, shared by the header, home page and contact page. */
export const profile = {
  name: "Hector Robayo",
  fullName: "Hector Julian Robayo Barreto",
  title: "Senior Full Stack Developer",
  location: "Bogota, Colombia",
  email: "julianrobayo8000@gmail.com",
  phone: "+57 319 568 2917",
  whatsapp: "https://wa.me/573195682917",
  linkedin: "https://www.linkedin.com/in/hec-rob-dev/",
  github: "https://github.com/akiibajin",
  languages: "Spanish (native) · English (advanced)",
  /** Served from public/ — see the file at the repository root. */
  cv: "/HECTOR%20CV%202026.pdf",
} as const;

/** Headline technologies shown on the home page. */
export const coreStack = ["React", "Next.js", "TypeScript", "Node.js"] as const;

export interface ICharacterItem {
  /** Main title shown on the detail card and under the portrait. */
  label: string;
  /** Optional icon. When absent the card falls back to a styled monogram. */
  portrait?: string;
  /** Short category, e.g. "Full-stack framework" or "FullStack Developer". */
  role?: string;
  /** Company or organisation, when it differs from the label. */
  employer?: string;
  /** Short facts rendered as chips, e.g. dates or institution. */
  meta?: Array<string>;
  /** Responsibilities, architecture and technical decisions. */
  description?: string;
  /** Tech actually used on this specific item. */
  technologies?: Array<string>;
  /** Measurable result — only filled when the source content states one. */
  impact?: string;
}

export interface ISection {
  title: string;
  /** One-paragraph overview of the whole category. */
  intro: string;
  tableHead: Array<string>;
  items: Array<ICharacterItem>;
}

export interface IDefs {
  Frontend: string;
  Backend: string;
  Databases: string;
  "Architecture & DevOps": string;
  Methodologies: string;
  "Professional Experience": string;
  "Personal Experience": string;
  "Freelance Experience": string;
  Certifications: string;
  Education: string;
}

/** Short summaries played in the bottom marquee when a tab is highlighted. */
export const defs: IDefs = {
  Frontend:
    "React, Next.js, Astro and Svelte, with TypeScript, Tailwind CSS and a strong focus on accessible, responsive interfaces.",
  Backend:
    "REST APIs built with Node.js, Express and NestJS, plus C# services, following layered and modular architecture.",
  Databases:
    "PostgreSQL, MongoDB, Supabase and Firebase — relational and document data modelled for real products.",
  "Architecture & DevOps":
    "AWS, Docker and Kubernetes, with CI/CD pipelines running on GitHub, GitLab and Jenkins.",
  Methodologies:
    "Agile delivery with Scrum and Kanban, working side by side with design and product teams.",
  "Professional Experience":
    "Production software for banking, fintech and SaaS teams — from focused frontend features to full-stack ownership.",
  "Personal Experience":
    "Self-directed projects taken from architecture to deployment, including this portfolio.",
  "Freelance Experience":
    "Client work delivered end to end: scoping, development, review and release.",
  Certifications:
    "Full-stack certification from Henry Academy, plus advanced English from ILSC Academy Australia.",
  Education:
    "Systems Engineering at Libreuniversity of Colombia, Bogota.",
};

export const knowledgeSection: Record<
  "Frontend" | "Backend" | "Databases" | "Architecture & DevOps" | "Methodologies",
  ISection
> = {
  Frontend: {
    title: "Frontend",
    intro:
      "My strongest area. I build client applications with React and Next.js, backed by TypeScript and Tailwind CSS, and I care about accessibility and responsiveness from the first component.",
    tableHead: ["Technology", "Focus"],
    items: [
      {
        label: "React",
        portrait: "/react-icon.png",
        role: "UI library",
        description:
          "Primary library for production work: component architecture, hooks, state lifting and reusable design-system pieces shared across products.",
        technologies: ["React", "TypeScript", "Tailwind CSS"],
      },
      {
        label: "Next.js",
        portrait: "/nextjs-icon.png",
        role: "Full-stack framework",
        description:
          "App Router projects with server rendering, route handlers for the API layer, and data fetching kept close to the component that needs it.",
        technologies: ["Next.js", "React", "TypeScript"],
      },
      {
        label: "Astro",
        portrait: "/astro-icon.jpeg",
        role: "Web framework",
        description:
          "Content-driven sites where I lean on islands architecture to ship zero JavaScript by default and hydrate only the interactive pieces.",
        technologies: ["Astro", "Svelte", "Tailwind CSS"],
      },
      {
        label: "Svelte",
        portrait: "/svelte-icon.png",
        role: "UI framework",
        description:
          "Fine-grained reactivity for interactive interfaces, with a small runtime and scoped styles that keep components self-contained.",
        technologies: ["Svelte", "TypeScript"],
      },
      {
        label: "Angular",
        portrait: "/angular-icon.png",
        role: "UI framework",
        description:
          "Enterprise work with standalone components, signals and structured state management.",
        technologies: ["Angular", "TypeScript"],
      },
      {
        label: "Preact",
        portrait: "/preact-icon.png",
        role: "Performance UI",
        description:
          "Drop-in replacement used to keep bundle size down inside micro-frontend shells, where React and Preact components have to coexist.",
        technologies: ["Preact", "TypeScript"],
      },
      {
        label: "TypeScript",
        portrait: "/typescript-icon.webp",
        role: "Language",
        description:
          "Default for anything non-trivial: discriminated unions for API payloads, strict compiler settings and typed boundaries between layers.",
        technologies: ["TypeScript"],
      },
      {
        label: "Tailwind CSS",
        portrait: "/tailwindcss-icon.png",
        role: "Styling",
        description:
          "Utility-first styling with a shared design-token theme, so spacing, colour and typography stay consistent across teams.",
        technologies: ["Tailwind CSS"],
      },
      {
        label: "Sass / SCSS",
        portrait: "/css-icon.webp",
        role: "Styling",
        description:
          "Preprocessor workflows for large existing stylesheets, including variables, mixins and theming on legacy codebases.",
        technologies: ["Sass", "SCSS"],
      },
      {
        label: "Material UI",
        portrait: "/materialui-icon.png",
        role: "Component library",
        description:
          "Battle-tested accessible primitives, themed to match a product design system rather than used out of the box.",
        technologies: ["Material UI", "React"],
      },
      {
        label: "Zustand",
        portrait: "/zustand-icon.ico",
        role: "State management",
        description:
          "Small, slice-based client store. Preferred over a heavier solution when state is mostly local to a feature.",
        technologies: ["Zustand", "React"],
      },
      {
        label: "Radix UI",
        portrait: "/radix-ui-icon.png",
        role: "Accessible primitives",
        description:
          "Unstyled, accessible primitives for dialogs, menus and popovers, so interaction behaviour is never re-implemented by hand.",
        technologies: ["Radix UI", "React"],
      },
    ],
  },

  Backend: {
    title: "Backend",
    intro:
      "I build REST services with Node.js, Express and NestJS, plus C# services, keeping architecture layered so controllers, services and data access stay separable and testable.",
    tableHead: ["Technology", "Focus"],
    items: [
      {
        label: "Node.js",
        role: "Runtime",
        description:
          "Default runtime for services and BFF layers, with async I/O kept explicit and long-running work moved off the request path.",
        technologies: ["Node.js", "TypeScript"],
      },
      {
        label: "Express",
        portrait: "/express-icon.png",
        role: "Web framework",
        description:
          "REST endpoints with middleware organised by concern: validation, auth, error handling and rate limiting as composable layers.",
        technologies: ["Express", "Node.js"],
      },
      {
        label: "NestJS",
        portrait: "/nestjs-icon.png",
        role: "Application framework",
        description:
          "Structured services with modules, dependency injection and DTO validation — the choice when a codebase needs conventions that survive team growth.",
        technologies: ["NestJS", "TypeScript"],
      },
      {
        label: "C# / .NET",
        portrait: "/csharp-icon.svg",
        role: "Application framework",
        description:
          "Enterprise services and plugin architectures, including integration work with existing .NET platforms.",
        technologies: ["C#", ".NET"],
      },
      {
        label: "REST APIs",
        role: "Architecture",
        description:
          "Resource-oriented contracts with consistent versioning, error envelopes and validation at the boundary, so consumers can integrate without guesswork.",
        technologies: ["REST", "OpenAPI"],
      },
      {
        label: "Tauri",
        portrait: "/tauri-icon.webp",
        role: "Desktop apps",
        description:
          "Lightweight desktop shells that reuse web UI and keep a much smaller binary than an Electron equivalent.",
        technologies: ["Tauri", "Rust", "Svelte"],
      },
      {
        label: "Rust",
        portrait: "/rust-icon.png",
        role: "Systems",
        description:
          "Command-line tools and system-level crates, mainly for performance-critical work and native desktop backends.",
        technologies: ["Rust"],
      },
    ],
  },

  Databases: {
    title: "Databases",
    intro:
      "Relational and document data, modelled around the access patterns the product actually has rather than around the ORM.",
    tableHead: ["Technology", "Focus"],
    items: [
      {
        label: "PostgreSQL",
        portrait: "/postgresql-icon.png",
        role: "Relational",
        description:
          "Primary datastore for transactional systems: normalised schemas, indexed queries and migrations that are safe to roll forward.",
        technologies: ["PostgreSQL", "SQL"],
      },
      {
        label: "MongoDB",
        portrait: "/mongodb-icon.png",
        role: "Document",
        description:
          "Flexible schemas for catalogue-style data where documents evolve quickly and read patterns favour aggregation over joins.",
        technologies: ["MongoDB"],
      },
      {
        label: "Supabase",
        portrait: "/supabase-icon.svg",
        role: "Backend as a service",
        description:
          "Postgres-backed platform used to ship auth, storage and realtime features without standing up separate infrastructure.",
        technologies: ["Supabase", "PostgreSQL"],
      },
      {
        label: "Firebase",
        portrait: "/firebase-icon.jpeg",
        role: "Backend as a service",
        description:
          "Realtime data, authentication and cloud storage for fast-moving product work, with security rules reviewed before shipping.",
        technologies: ["Firebase"],
      },
    ],
  },

  "Architecture & DevOps": {
    title: "Architecture & DevOps",
    intro:
      "Shipping is part of the job. I set up the infrastructure the code runs on and the pipelines that get it to production without ceremony.",
    tableHead: ["Technology", "Focus"],
    items: [
      {
        label: "AWS",
        portrait: "/aws-icon.png",
        role: "Cloud",
        description:
          "EC2 instances, managed data stores and service configuration set up so environments are reproducible instead of hand-tuned.",
        technologies: ["AWS", "EC2"],
      },
      {
        label: "Docker",
        portrait: "/docker-icon.jpeg",
        role: "Containers",
        description:
          "Containerised builds for local development and CI, keeping the runtime consistent between a laptop and production.",
        technologies: ["Docker"],
      },
      {
        label: "Kubernetes",
        portrait: "/kubernetes-icon.jpeg",
        role: "Orchestration",
        description:
          "Workload definitions, deployments and rollbacks for services that need scaling and availability guarantees.",
        technologies: ["Kubernetes"],
      },
      {
        label: "Jenkins",
        portrait: "/jenkins-icon.jpeg",
        role: "CI/CD",
        description:
          "Pipeline jobs for build, test and release stages on existing infrastructure.",
        technologies: ["Jenkins", "CI/CD"],
      },
      {
        label: "GitHub",
        portrait: "/github-icon.png",
        role: "CI/CD",
        description:
          "GitHub Flow with pull-request review, required checks and short-lived branches.",
        technologies: ["GitHub Actions", "GitHub Flow"],
      },
      {
        label: "GitLab",
        portrait: "/gitlab-icon.webp",
        role: "CI/CD",
        description:
          "GitLab pipelines for merge-request-driven delivery and environment promotion.",
        technologies: ["GitLab CI"],
      },
    ],
  },

  Methodologies: {
    title: "Methodologies",
    intro:
      "Agile delivery with Scrum and Kanban, working closely with design, product and project management so requirements stay clear through delivery.",
    tableHead: ["Methodology", "Focus"],
    items: [
      {
        label: "Scrum",
        portrait: "/scrum-icon.png",
        role: "Sprint-based delivery",
        description:
          "Short iterations with planning, review and retrospective, adapting the ceremony to what the team actually needed.",
        technologies: ["Scrum", "Agile"],
      },
      {
        label: "Kanban",
        portrait: "/kanban-icon.jpg",
        role: "Flow-based delivery",
        description:
          "Continuous flow with explicit work-in-progress limits, so bottlenecks are visible and throughput stays predictable.",
        technologies: ["Kanban"],
      },
    ],
  },
};

export const experienceSection: Record<
  | "Professional Experience"
  | "Personal Experience"
  | "Freelance Experience"
  | "Certifications"
  | "Education",
  ISection
> = {
  "Professional Experience": {
    title: "Professional Experience",
    intro:
      "Client and product teams building banking, fintech and SaaS platforms. Work has ranged from owning a frontend feature end to end to shipping full-stack changes with backend and infrastructure included.",
    tableHead: ["Experience", "Role", "Period"],
    items: [
      {
        label: "Melt Studio",
        role: "FullStack Developer",
        meta: ["Sep 2025 – Aug 2026"],
        description:
          "Worked across multiple React projects, in both Next.js applications and standalone React apps. Implemented responsive, accessible interfaces with Tailwind CSS and styled components, and set shared UI patterns so different products stayed visually consistent.",
        technologies: ["React", "Next.js", "Tailwind CSS", "Styled Components"],
      },
      {
        label: "Evaluar.com",
        role: "Frontend Developer",
        meta: ["Apr 2025 – Sep 2025"],
        description:
          "Candidate assessment platform: timed tests, result charts and feedback flows, with AI acting as a copilot throughout the process. Delivered the interface and the release pipeline using GitHub Flow.",
        technologies: ["Next.js", "Tailwind CSS", "Zustand", "Radix UI", "GitHub Flow"],
      },
      {
        label: "Tu360 Movilidad",
        role: "Frontend Developer",
        employer: "IT Globers",
        meta: ["May 2022 – Jun 2024"],
        description:
          "E-commerce vehicle marketplace for Bancolombia covering cars, bikes and motorcycles, including a seller admin app for scheduling vehicle display and handling the purchase flow. Built on a micro-frontend architecture where React, TypeScript and Preact components had to coexist with a SaaS VTEX legacy platform.",
        technologies: ["React", "TypeScript", "Preact", "Sass", "Material UI", "VTEX"],
      },
      {
        label: "FireBase",
        role: "FullStack Developer",
        meta: ["2021 – 6 months"],
      },
    ],
  },

  "Personal Experience": {
    title: "Personal Experience",
    intro:
      "Projects I designed, built and deployed myself, which is where most of my architecture judgement comes from. Nothing here was scoped or reviewed for me.",
    tableHead: ["Experience", "Role", "Period"],
    items: [
      {
        label: "Portfolio",
        role: "FullStack Developer",
        meta: ["2025 – 1 month"],
        description:
          "This site: a Tekken 8 inspired character-select interface built as a portfolio. Astro renders every route statically, Svelte islands handle the interactive screens, Nanostores carries selection state and Swiper drives the background carousel.",
        technologies: ["Astro", "Svelte", "TypeScript", "Tailwind CSS", "Nanostores"],
      },
      {
        label: "World Flags — Mario Thematic",
        role: "FullStack Developer",
        meta: ["2021 – 2 months"],
        description:
          "Self-designed and self-built flag quiz game with a Super Mario Bros. visual theme, including progression and scoring.",
      },
      {
        label: "Motorcycles E-commerce",
        role: "Tech Lead / Mentor",
        meta: ["2024 – 3 months"],
        description:
          "Led the technical direction of a motorcycle storefront and mentored the developers working on it, covering architecture decisions and code review.",
      },
    ],
  },

  "Freelance Experience": {
    title: "Freelance Experience",
    intro:
      "Client projects delivered end to end — requirements, architecture, implementation and deployment — often working directly with the people who commissioned them.",
    tableHead: ["Experience", "Role", "Period"],
    items: [
      {
        label: "Textiles CRM",
        role: "FullStack Developer",
        meta: ["2025 – 6 months"],
        description:
          "Internal CRM for a textiles business, covering client records, order tracking and staff-facing workflows.",
      },
      {
        label: "CRM Desktop App",
        role: "FullStack Developer",
        meta: ["2024 – 4 months"],
        description:
          "Desktop CRM application used by sales staff to manage contacts and activity outside the browser.",
      },
      {
        label: "Employee Laboratory Web App",
        role: "FullStack Developer",
        meta: ["2024 – 2 months"],
        description:
          "Web application for a laboratory, used by employees to record and query sample and test data.",
      },
    ],
  },

  Certifications: {
    title: "Certifications",
    intro:
      "Formal training behind the day-to-day work, plus a certification for working in English as a second language.",
    tableHead: ["Certification", "Institution", "Year"],
    items: [
      {
        label: "FullStack Web Developer",
        role: "Henry Academy",
        meta: ["2021"],
        description:
          "Full-stack web development program covering JavaScript, React, Node.js and databases.",
      },
      {
        label: "English (Advanced)",
        role: "ILSC Academy Australia",
        meta: ["2024"],
        description:
          "Advanced English certification covering professional and technical communication.",
      },
    ],
  },

  Education: {
    title: "Education",
    intro:
      "Undergraduate study in systems engineering, which is where the computer-science fundamentals came from.",
    tableHead: ["Program", "Institution", "Period"],
    items: [
      {
        label: "Systems Engineer",
        role: "Libreuniversity of Colombia",
        meta: ["2020 – 2026"],
        description:
          "Systems engineering programme in Bogota, D.C. — coursework completed.",
      },
    ],
  },
};

export type TLearningKeys = "Rust" | "Angular" | "Qwik" | "Tauri";

export const learningSection: Record<TLearningKeys, ISection> = {
  Rust: {
    title: "Rust",
    intro:
      "Learning Rust to build fast, safe tools — from command-line applications to system-level crates and native desktop backends.",
    tableHead: ["Tool", "Focus"],
    items: [
      {
        label: "Rust",
        portrait: "/rust-icon.png",
        role: "Systems programming",
        description:
          "Ownership, lifetimes and zero-cost abstractions, applied to small tools and desktop backends rather than to theory.",
        technologies: ["Rust", "Tauri"],
      },
    ],
  },
  Angular: {
    title: "Angular",
    intro:
      "Deepening Angular with signals, standalone components and structured state management for enterprise-scale applications.",
    tableHead: ["Tool", "Focus"],
    items: [
      {
        label: "Angular",
        portrait: "/angular-icon.png",
        role: "Enterprise UI",
        description:
          "Signals-based reactivity, standalone components and the built-in patterns that make large Angular codebases navigable.",
        technologies: ["Angular", "TypeScript"],
      },
    ],
  },
  Qwik: {
    title: "Qwik",
    intro:
      "Exploring Qwik to build interfaces that ship almost no JavaScript up front, and to prototype ideas quickly.",
    tableHead: ["Tool", "Focus"],
    items: [
      {
        label: "Qwik",
        role: "Rapid UI prototyping",
        description:
          "Resumability and lazy execution as a way to prototype interactions without paying the hydration cost.",
        technologies: ["Qwik"],
      },
    ],
  },
  Tauri: {
    title: "Tauri",
    intro:
      "Learning Tauri to ship lightweight desktop applications that reuse web technologies with a Rust core.",
    tableHead: ["Tool", "Focus"],
    items: [
      {
        label: "Tauri",
        portrait: "/tauri-icon.webp",
        role: "Desktop apps",
        description:
          "Rust commands behind a web frontend, with a much smaller binary than a comparable Electron build.",
        technologies: ["Tauri", "Rust"],
      },
    ],
  },
};

/** Every section in one lookup table, keyed by the same union used across the app. */
export const sections = {
  ...knowledgeSection,
  ...experienceSection,
  ...learningSection,
} as const;
