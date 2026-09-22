// src/data.jsx
import projectsData from "./data/projects.json";
import experienceData from "./data/experience.json";
import { Users, Brain, Terminal, GitBranch } from "lucide-react";
import {
  SiOpenjdk, SiPython, SiSpringboot, SiDotnet, SiReact, SiNodedotjs,
  SiAmazonwebservices, SiDocker, SiKubernetes, SiApachekafka, SiNeo4J,
  SiPostgresql, SiLangchain, SiGit, SiJira,
} from "react-icons/si";

// --- NAV ITEMS ---
export const items = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

// --- EXPERIENCE DATA ---
// Oldest first — the horizontal timeline reads left to right, past to present.
// Content lives in src/data/experience.json; see src/data/types.js for the shape.
/** @type {import("./data/types.js").Experience[]} */
export const experience = [...experienceData].sort((a, b) =>
  a.startDate.localeCompare(b.startDate)
);

// --- PROJECTS DATA ---
// Featured projects render first; the rest keep their file order (newest added first).
/** @type {import("./data/types.js").Project[]} */
export const projects = [...projectsData].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
);

// --- SKILLS DATA ---
export const skillCategories = [
  {
    title: "Languages & Frameworks",
    items: [
      { name: "Java", icon: <SiOpenjdk /> },
      { name: "Spring Boot", icon: <SiSpringboot /> },
      { name: "Python", icon: <SiPython /> },
      { name: ".NET / C#", icon: <SiDotnet /> },
      { name: "React", icon: <SiReact /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
    ],
  },
  {
    title: "Cloud & Data",
    items: [
      { name: "AWS", icon: <SiAmazonwebservices /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Kubernetes", icon: <SiKubernetes /> },
      { name: "Kafka", icon: <SiApachekafka /> },
      { name: "Neo4j", icon: <SiNeo4J /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
  },
  {
    title: "AI & Workflow",
    items: [
      { name: "LangChain", icon: <SiLangchain /> },
      { name: "LangGraph", icon: <Brain /> },
      { name: "Git/GitHub", icon: <SiGit /> },
      { name: "CI/CD", icon: <GitBranch /> },
      { name: "Jira", icon: <SiJira /> },
      { name: "Agile/Scrum", icon: <Users /> },
    ],
  },
];