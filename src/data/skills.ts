import { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    category: "Frameworks & Libraries",
    description: "Core frontend engines for modern SPA and SSR production applications",
    skills: [
      { name: "React.js", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "Angular", level: "Proficient" },
    ],
  },
  {
    category: "State Management",
    description: "Predictable, scalable global state architectures for complex data flows",
    skills: [
      { name: "Redux / Redux Toolkit", level: "Advanced" },
      { name: "Redux-Saga", level: "Advanced" },
      { name: "MobX", level: "Proficient" },
      { name: "Context API", level: "Advanced" },
    ],
  },
  {
    category: "Languages",
    description: "Type-safe, modern web standards powering readable, maintainable code",
    skills: [
      { name: "TypeScript", level: "Advanced" },
      { name: "JavaScript (ES6+)", level: "Advanced" },
    ],
  },
  {
    category: "Styling & UI Systems",
    description: "Responsive, accessible, pixel-perfect design system implementations",
    skills: [
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Material-UI (MUI)", level: "Advanced" },
      { name: "Ant Design", level: "Proficient" },
      { name: "Bootstrap", level: "Advanced" },
      { name: "Sass / SCSS", level: "Advanced" },
    ],
  },
  {
    category: "Real-time & APIs",
    description: "Low-latency networking, WebSocket streams, and robust REST integrations",
    skills: [
      { name: "WebSocket", level: "Advanced" },
      { name: "Socket.io", level: "Advanced" },
      { name: "Axios", level: "Advanced" },
      { name: "Fetch API", level: "Advanced" },
    ],
  },
  {
    category: "Backend Foundations",
    description: "Server-side fundamentals, API design, and document/NoSQL persistence",
    skills: [
      { name: "Node.js", level: "Proficient" },
      { name: "MongoDB", level: "Proficient" },
      { name: "Firebase (Firestore & Auth)", level: "Advanced" },
    ],
  },
  {
    category: "Deployment & DevOps",
    description: "Continuous integration, edge hosting, cloud infrastructure, and CDN deployment",
    skills: [
      { name: "Vercel", level: "Advanced" },
      { name: "Netlify", level: "Advanced" },
      { name: "Heroku", level: "Proficient" },
    ],
  },
];

