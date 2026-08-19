// src/data.js
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

// --- EXPERIENCE DATA (oldest first — the timeline reads left to right) ---
export const experience = [
  {
    year: "Jul 2019 - Jul 2023",
    role: "B.Tech. Electronics & Comm.",
    company: "Manipal Institute of Technology",
  },
  {
    year: "Jan 2023 - Jun 2023",
    role: "Software Engineer Intern",
    company: "UBS",
  },
  {
    year: "Aug 2023 - Aug 2024",
    role: "Software Engineer",
    company: "UBS",
  },
  {
    year: "Aug 2024 - May 2026",
    role: "M.S. Computer Science",
    company: "Arizona State University",
  },
];

// --- PROJECTS DATA ---
export const projects = [
  {
    title: "Scout: Corrective RAG Agent",
    desc: "An agentic system using a cyclic state machine to route between vector context and live web search based on real-time relevance scoring, with a Hallucination Grader node that verifies answer grounding.",
    tech: ["LangGraph", "Groq", "ChromaDB", "Python"],
    role: "Solo Developer",
    link: "#",
  },
  {
    title: "Graph Streaming Pipeline",
    desc: "A distributed pipeline on Kubernetes streaming NYC Taxi data into a Neo4j graph database, orchestrated with custom Docker images and Helm charts. Ran PageRank and BFS for node significance analysis.",
    tech: ["Kubernetes", "Kafka", "Neo4j", "Helm", "Docker"],
    role: "Solo Developer",
    link: "#",
  },
  {
    title: "EC2 Auto-Scaling Face Rec.",
    desc: "A cost-efficient distributed system that triggers EC2 auto-scaling off CloudWatch metrics and SQS queue depth, serving FaceNet models at sub-1.2s latency for 1,000 concurrent requests.",
    tech: ["AWS EC2", "AWS SQS", "Lambda", "Docker", "Python"],
    role: "Solo Developer",
    link: "#",
  },
];

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