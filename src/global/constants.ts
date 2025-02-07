export interface IDefs {
  Frontend: string;
  Backend: string;
  DevOps: string;
  Methodologies: string;
  "Professional Experience": string;
  "Personal Experience": string;
  "Freelance Experience": string;
  Certifications: string;
}

export const defs: IDefs = {
  Frontend:
    "Using frameworks like React, Preact, Svelte, Astro, Angular to build up Client side Projects",
  Backend:
    "Frameworks like ExpressJs, NestJs or .net with C# are frameworks which I developed different architectures like APIRest, or Plugins",
  DevOps:
    "I've used platforms like AWS with EC2, DynamicDB and others, also docker with kubernetes are tools that i'm able to set up",
  Methodologies:
    "I was in some projects that used SCRUM as a core for the lifecycle of the project",
  "Professional Experience":
    "I've worked in some projects that were developed with a team of developers, designers and project managers",
  "Personal Experience":
    "I've worked in some projects that were developed by myself, from the design to the deployment",
  "Freelance Experience":
    "I've worked in some projects that were developed by myself, from the design to the deployment",
  Certifications:
    "I have certifications in different areas, like Software Development, languages, and others",
};

export const knowledgeSection = {
  Frontend: {
    title: "Frontend",
    content: `<p class='p-3 text-pretty font-light tracking-tighter'>
    My main experience is with <strong>ReactJs</strong>, 
   but I also have experience with <strong>Angular, svelte, 
   preact, jquery, vanilla and Astro</strong>. 
   I've worked with different libraries like 
   <strong>Redux, Mobx, Zustand, and others</strong></p>
   <div class="flex flex-wrap justify-center">`,
    tableInfo: {
      tableHead: ["Framework", "-"],
      tableBody: [
        [
          '<img src="/react-icon.png" alt="ReactJs" class="h-6 mx-auto" />',
          "<p>ReactJs</p>",
        ],
        [
          '<img src="/angular-icon.png" alt="Angular" class="h-6 mx-auto" />',
          "<p>Angular</p>",
        ],
        [
          '<img src="/svelte-icon.png" alt="Svelte" class="h-6 mx-auto" />',
          "<p>Svelte</p>",
        ],
        [
          '<img src="/preact-icon.png" alt="Preact" class="h-6 mx-auto" />',
          "<p>Preact</p>",
        ],
        [
          '<img src="/astro-icon.jpeg" alt="Astro" class="h-6 mx-auto" />',
          "<p>Astro</p>",
        ],
        [
          '<img src="/css-icon.webp" alt="CSS" class="h-6 mx-auto" />',
          "<p>CSS</p>",
        ],
        [
          '<img src="/tailwindcss-icon.png" alt="TailwindCSS" class="h-6 mx-auto" />',
          "<p>TailwindCSS</p>",
        ],
        [
          '<img src="/materialui-icon.png" alt="MaterialUi" class="h-6 mx-auto" />',
          "<p>MaterialUi</p>",
        ],
      ],
    },
  },
  Backend: {
    title: "Backend",
    content:
      "Frameworks like ExpressJs, NestJs or .net with C# are frameworks which I developed different architectures like APIRest, or Plugins",
    tableInfo: {
      tableHead: ["Framework", "-"],
      tableBody: [
        [
          '<img src="/express-icon.png" alt="ExpressJs" class="h-6 mx-auto" />',
          "<p>ExpressJs</p>",
        ],
        [
          '<img src="/nestjs-icon.png" alt="NestJs" class="h-6 mx-auto" />',
          "<p>NestJs</p>",
        ],
        [
          "<img src='/tauri-icon.webp' alt='Tauri' class='h-6 mx-auto' />",
          "<p>Tauri</p>",
        ],
        [
          '<img src="/csharp-icon.svg" alt=".Net" class="h-6 mx-auto" />',
          "<p>.Net</p>",
        ],
        [
          '<img src="/rust-icon.png" alt="Rust" class="h-6 mx-auto" />',
          "<p>Rust</p>",
        ],
        [
          '<img src="/mongodb-icon.png" alt="MongoDB" class="h-6 mx-auto" />',
          "<p>MongoDB</p>",
        ],
        [
          '<img src="/postgresql-icon.png" alt="postgresql" class="h-6 mx-auto" />',
          "<p>PostgreSql</p>",
        ],
        [
          '<img src="/supabase-icon.svg" alt="supabase" class="h-6 mx-auto" />',
          "<p>SupaBase</p>",
        ],
        [
          '<img src="/firebase-icon.jpeg" alt="firebase" class="h-6 mx-auto" />',
          "<p>Firebase</p>",
        ],
      ],
    },
  },
  DevOps: {
    title: "DevOps",
    content:
      "I've used platforms like AWS with EC2, DynamicDB and others, also docker with kubernetes are tools that i'm able to set up",
    tableInfo: {
      tableHead: ["Platform", "-"],
      tableBody: [
        [
          '<img src="/aws-icon.png" alt="AWS" class="h-6 mx-auto" />',
          "<p>AWS</p>",
        ],
        [
          '<img src="/docker-icon.jpeg" alt="Docker" class="h-6 mx-auto" />',
          "<p>Docker</p>",
        ],
        [
          '<img src="/kubernetes-icon.jpeg" alt="Kubernetes" class="h-6 mx-auto" />',
          "<p>Kubernetes</p>",
        ],
        [
          '<img src="/jenkins-icon.jpeg" alt="Jenkins" class="h-6 mx-auto" />',
          "<p>Jenkins</p>",
        ],
        [
          '<img src="/github-icon.png" alt="Github" class="h-6 mx-auto" />',
          "<p>Github</p>",
        ],
        [
          '<img src="/gitlab-icon.webp" alt="Gitlab" class="h-6 mx-auto" />',
          "<p>Gitlab</p>",
        ],
      ],
    },
  },
  Methodologies: {
    title: "Methodologies",
    content:
      "I was in some projects that used SCRUM as a core for the lifecycle of the project",
    tableInfo: {
      tableHead: ["Methodology", "-"],
      tableBody: [
        [
          '<img src="/scrum-icon.png" alt="Scrum" class="h-6 mx-auto" />',
          "<p>Scrum</p>",
        ],
        [
          '<img src="/kanban-icon.jpg" alt="Kanban" class="h-6 mx-auto" />',
          "<p>Kanban</p>",
        ],
      ],
    },
  },
};

export const experienceSection = {
  "Professional Experience": {
    title: "Professional Experience",
    content: `I've worked as a frontend developer, and   fullstack developer in projects
       with scrum or kanban the both altered in each project, stablishing 
       the best practices for the team and dealing with the Customer`,
    tableInfo: {
      tableHead: ["Project", "Role", "Duration", "year"],
      tableBody: [
        ["Tu360 Movilidad", "Frontend Developer", "2 years, 6 months", "2022"],
        ["FireBase", "FullStack Developer", "6 months", "2021"],
      ],
    },
  },
  "Personal Experience": {
    title: "Personal Experience",
    content: `I've worked in some projects that were developed by myself, 
    from the design to the deployment`,
    tableInfo: {
      tableHead: ["Project", "Role", "Duration", "year"],
      tableBody: [
        ["Portfolio", "FullStack Developer", "1 month", "2025"],
        [
          "Countries's flags Mario world Thematic",
          "FullStack Developer",
          "2 months",
          "2021",
        ],
        ["Motorcycles E-commerce", "Teach Lead - mentor", "3 months", "2024"],
      ],
    },
  },
  "Freelance Experience": {
    title: "Freelance Experience",
    content: `I've worked in some projects that were developed by me and others 
    developers, from the design to the deployment`,
    tableInfo: {
      tableHead: ["Project", "Role", "Duration", "year"],
      tableBody: [
        ["CRM desktop app", "FullStack Developer", "4 month", "2024"],
        [
          "Employee's laboratory web app",
          "FullStack Developer",
          "2 months",
          "2024",
        ],
      ],
    },
  },
  Certifications: {
    title: "Certifications",
    content: `I have certifications in different areas, like Software Development, languages, and others`,
    tableInfo: {
      tableHead: ["Certification", "Academy", "Year"],
      tableBody: [
        ["FullStack Developer", "Henry Academy", "2021"],
        ["English", "ILSC Academy Australia", "2024"],
      ],
    },
  },
};
