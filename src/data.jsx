// src/data.js
import { 
  Github, Linkedin, Mail, FileText, ExternalLink, Calendar, 
  Users, Mic, Brain, Terminal 
} from "lucide-react";
import { 
  SiReact, SiJavascript, SiNodedotjs, SiTailwindcss, 
  SiFigma, SiGit, SiJira, SiNextdotjs, SiTypescript 
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
export const experience = [
  { 
    year: "2024 - Present", 
    role: "Senior Frontend Engineer", 
    company: "TechFlow Systems", 
    desc: "Leading the migration to Next.js 14, improving site performance by 40%. Mentoring 3 junior developers." 
  },
  { 
    year: "2022 - 2024", 
    role: "Full Stack Developer", 
    company: "Creative Pulse Agency", 
    desc: "Built award-winning marketing sites using WebGL and GSAP. Managed backend architecture on Supabase." 
  },
  { 
    year: "2020 - 2022", 
    role: "UI/UX Designer & Dev", 
    company: "Freelance", 
    desc: "Delivered 15+ custom Shopify and React websites for diverse clients. Focused on accessibility and micro-interactions." 
  },
  { 
    year: "2018 - 2020", 
    role: "Junior Developer", 
    company: "StartUp Inc", 
    desc: "Assisted in building the core MVP and handling bug fixes for the React Native mobile app." 
  },
  { 
    year: "2017 - 2018", 
    role: "Frontend Intern", 
    company: "Digital Dreams Studio", 
    desc: "Converted PSD designs into responsive HTML/CSS. Learned the fundamentals of JavaScript and DOM manipulation." 
  },
  { 
    year: "2016 - 2017", 
    role: "Hackathon Organizer", 
    company: "University Tech Club", 
    desc: "Organized regional coding events. Built the event registration portal using vanilla JS and PHP." 
  },
  { 
    year: "2013 - 2017", 
    role: "B.S. Computer Science", 
    company: "State University", 
    desc: "Graduated with Honors. Specialized in Human-Computer Interaction (HCI) and Web Technologies." 
  },
];

// --- PROJECTS DATA ---
export const projects = [
  { title: "E-Commerce Dashboard", desc: "A high-performance analytics dashboard.", tech: ["React", "Tailwind", "Node.js"], role: "Lead Frontend", link: "#" },
  { title: "Health Tracker App", desc: "Accessible mobile-first web app for tracking daily vitals.", tech: ["TypeScript", "Next.js", "Supabase"], role: "Full Stack Developer", link: "#" },
  { title: "Creative Agency Portfolio", desc: "Award-winning design implementation with complex animations.", tech: ["React", "GSAP", "WebGL"], role: "Creative Developer", link: "#" },
];

// --- SKILLS DATA ---
export const skillCategories = [
  {
    title: "Core Stack",
    items: [
      { name: "React", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
    ],
  },
  {
    title: "Backend & Tools",
    items: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Git/GitHub", icon: <SiGit /> },
      { name: "Figma", icon: <SiFigma /> },
      { name: "Terminal", icon: <Terminal /> },
      { name: "Jira", icon: <SiJira /> },
    ],
  },
  {
    title: "Soft Skills",
    items: [
      { name: "Leadership", icon: <Users /> },
      { name: "Public Speaking", icon: <Mic /> },
      { name: "Prob. Solving", icon: <Brain /> },
      { name: "Mentorship", icon: <Users /> },
    ],
  },
];