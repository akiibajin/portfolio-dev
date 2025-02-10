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
    content: `<p class='modal-p'>
    My main experience is with <strong>ReactJs</strong>, 
   but I also have experience with <strong>Angular, svelte, 
   preact, jquery, vanilla and Astro</strong>. 
   I've worked with different libraries like 
   <strong>Redux, Mobx, Zustand, and others</strong></p>`,
    tableInfo: {
      tableHead: ["Framework", "-"],
      tableBody: [
        [
          '<img src="/react-icon.png" alt="ReactJs" class="modal-img" />',
          "<p>ReactJs</p>",
        ],
        [
          '<img src="/angular-icon.png" alt="Angular" class="modal-img" />',
          "<p>Angular</p>",
        ],
        [
          '<img src="/svelte-icon.png" alt="Svelte" class="modal-img" />',
          "<p>Svelte</p>",
        ],
        [
          '<img src="/preact-icon.png" alt="Preact" class="modal-img" />',
          "<p>Preact</p>",
        ],
        [
          '<img src="/astro-icon.jpeg" alt="Astro" class="modal-img" />',
          "<p>Astro</p>",
        ],
        [
          '<img src="/css-icon.webp" alt="CSS" class="modal-img" />',
          "<p>CSS</p>",
        ],
        [
          '<img src="/tailwindcss-icon.png" alt="TailwindCSS" class="modal-img" />',
          "<p>TailwindCSS</p>",
        ],
        [
          '<img src="/materialui-icon.png" alt="MaterialUi" class="modal-img" />',
          "<p>MaterialUi</p>",
        ],
      ],
    },
  },
  Backend: {
    title: "Backend",
    content: `<p class='modal-p'>Frameworks like <strong>ExpressJs, NestJs or .net with C#</strong>
       are frameworks which I developed different architectures like <strong>APIRest, or 
       Plugins</strong></p>`,
    tableInfo: {
      tableHead: ["Framework", "-"],
      tableBody: [
        [
          '<img src="/express-icon.png" alt="ExpressJs" class="modal-img" />',
          "<p>ExpressJs</p>",
        ],
        [
          '<img src="/nestjs-icon.png" alt="NestJs" class="modal-img" />',
          "<p>NestJs</p>",
        ],
        [
          "<img src='/tauri-icon.webp' alt='Tauri' class='modal-img' />",
          "<p>Tauri</p>",
        ],
        [
          '<img src="/csharp-icon.svg" alt=".Net" class="modal-img" />',
          "<p>.Net</p>",
        ],
        [
          '<img src="/rust-icon.png" alt="Rust" class="modal-img" />',
          "<p>Rust</p>",
        ],
        [
          '<img src="/mongodb-icon.png" alt="MongoDB" class="modal-img" />',
          "<p>MongoDB</p>",
        ],
        [
          '<img src="/postgresql-icon.png" alt="postgresql" class="modal-img" />',
          "<p>PostgreSql</p>",
        ],
        [
          '<img src="/supabase-icon.svg" alt="supabase" class="modal-img" />',
          "<p>SupaBase</p>",
        ],
        [
          '<img src="/firebase-icon.jpeg" alt="firebase" class="modal-img" />',
          "<p>Firebase</p>",
        ],
      ],
    },
  },
  DevOps: {
    title: "DevOps",
    content: `<p class='modal-p'>I've used platforms like <strong>AWS with EC2, DynamicDB</strong> 
      and others, also docker with kubernetes are tools that i'm able to set up</p>`,
    tableInfo: {
      tableHead: ["Platform", "-"],
      tableBody: [
        [
          '<img src="/aws-icon.png" alt="AWS" class="modal-img" />',
          "<p>AWS</p>",
        ],
        [
          '<img src="/docker-icon.jpeg" alt="Docker" class="modal-img" />',
          "<p>Docker</p>",
        ],
        [
          '<img src="/kubernetes-icon.jpeg" alt="Kubernetes" class="modal-img" />',
          "<p>Kubernetes</p>",
        ],
        [
          '<img src="/jenkins-icon.jpeg" alt="Jenkins" class="modal-img" />',
          "<p>Jenkins</p>",
        ],
        [
          '<img src="/github-icon.png" alt="Github" class="modal-img" />',
          "<p>Github</p>",
        ],
        [
          '<img src="/gitlab-icon.webp" alt="Gitlab" class="modal-img" />',
          "<p>Gitlab</p>",
        ],
      ],
    },
  },
  Methodologies: {
    title: "Methodologies",
    content: `<p class='modal-p'>I was in some projects that used <strong>SCRUM</strong> 
      as a core for the lifecycle of the project</p>`,
    tableInfo: {
      tableHead: ["Methodology", "-"],
      tableBody: [
        [
          '<img src="/scrum-icon.png" alt="Scrum" class="modal-img" />',
          "<p>Scrum</p>",
        ],
        [
          '<img src="/kanban-icon.jpg" alt="Kanban" class="modal-img" />',
          "<p>Kanban</p>",
        ],
      ],
    },
  },
};

export const experienceSection = {
  "Professional Experience": {
    title: "Professional Experience",
    content: `<p class='modal-p'>I've worked as a frontend developer, and  
       fullstack developer in projects with scrum or kanban the both 
       altered in each project, stablishing the best practices for 
      the team and dealing with the Customer</p>`,
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
    content: `<p class='modal-p'>I've worked in some projects that were developed by myself, 
    from the design to the deployment</p>`,
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
    content: `<p class='modal-p'>I've worked in some projects that were developed by me and others 
    developers, from the design to the deployment</p>`,
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
    content: `<p class='modal-p'>I have certifications in different areas, 
    like Software Development, languages, and others</p>`,
    tableInfo: {
      tableHead: ["Certification", "Academy", "Year"],
      tableBody: [
        ["FullStack Developer", "Henry Academy", "2021"],
        ["English", "ILSC Academy Australia", "2024"],
      ],
    },
  },
};
