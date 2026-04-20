export const PROFILE = {
  name: "Mochammad Robbitul Himam",
  role: "Backend / Fullstack Engineer",
  location: "Sidoarjo, Indonesia",
  timezone: "UTC+7",
  imageUrl: "",
  about:
    "Backend / Fullstack Engineer with 8+ years of experience building scalable microservices and high-performance APIs using Golang, PHP (Yii2), and PostgreSQL. Strong expertise in database optimization, financial systems (POS & accounting), and event-driven architecture (Kafka). Proven track record in improving system performance, ensuring data integrity, and handling high-volume transactional systems in production environments.",
  contact: {
    email: "roberthayden17@gmail.com",
    linkedin: "/in/robert-himam-378411109",
    twitter: "",
    phone: "+6287701004712",
  },
};

export const EXPERIENCE = [
  {
    id: "exp-1",
    title: "Back End Developer",
    company: "PT. BITS Miliartha",
    period: "Sep 2014–Present",
    description: null,
    bullets: [
      "Designed and maintained scalable backend architecture for POS and high-traffic web applications.",
      "Built and delivered RESTful microservices using Golang, supporting high-volume transactional systems.",
      "Optimized PostgreSQL queries and indexing, reducing API response time by up to 50–70% on critical endpoints.",
      "Designed normalized database schemas and business logic to ensure data integrity and maintainability.",
      "Diagnosed and resolved production incidents end-to-end, improving system reliability and reducing recurring issues.",
      "Implemented validation and safeguards, significantly improving financial data accuracy.",
      "Collaborated with accounting teams to reconcile transactional data and align system records.",
      "Conducted code reviews to improve code quality and maintain engineering standards.",
    ],
    logoUrl: "https://www.bee.id/wp-content/uploads/logo/Logo-Bee-Web.png",
    current: true,
  },
];

export const EDUCATION: {
  id: string;
  degree: string;
  school: string;
  period: string;
  description: string;
}[] = [];

export const CERTIFICATIONS: {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  url: string;
}[] = [];

export const PROJECTS = [
  {
    id: "proj-1",
    name: "Beecloud",
    type: "Cloud Accounting Platform",
    period: "Present",
    url: "https://app.bee.id",
    bullets: [
      "Built and maintained Golang-based microservices handling high-volume financial transactions.",
      "Optimized PostgreSQL performance on large datasets, improving query efficiency by 50%+.",
      "Designed robust schema constraints and validation mechanisms to ensure financial data integrity.",
      "Implemented event-driven architecture using Kafka for scalable transaction processing.",
      "Integrated Redis caching to reduce database load and improve response time.",
      "Generated structured financial reports using JasperReports.",
    ],
  },
  {
    id: "proj-2",
    name: "frimawan.com",
    type: "Digital Platform",
    period: "Feb 2025–Mar 2025",
    url: "https://frimawan.com",
    bullets: [
      "Developed responsive frontend using Vue 3 and Tailwind CSS.",
      "Built reusable UI components and integrated backend APIs.",
      "Delivered seamless purchase and digital download experience.",
    ],
  },
];

export const KEY_ACHIEVEMENTS = [
  "Improved backend performance significantly through query optimization and indexing strategies.",
  "Reduced production incidents by implementing validation layers and better error handling.",
  "Contributed to scalable architecture design for POS and financial systems.",
  "Successfully handled large-scale transactional data in production environments.",
];

export const SKILLS = [
  "Golang",
  "PHP",
  "PostgreSQL",
  "Microservices",
  "Kafka",
  "Redis",
  "Vue 3",
  "Yii2",
  "JavaScript",
  "Tailwind CSS",
  "jQuery",
  "Bootstrap",
  "POS Systems",
  "Event-Driven Architecture",
];

export const LANGUAGES = [
  { language: "Bahasa Indonesia", level: "Native" },
  { language: "English", level: "Professional" },
];
