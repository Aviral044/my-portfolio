import React, { useState, useEffect, useRef } from "react";
import RotatingText from "./components/RotatingText";
import ClickSpark from "./components/ClickSpark";
import PillNav from "./components/PillNav"; 
import { Github, Linkedin, Mail, FileText, ExternalLink, Calendar } from "lucide-react";

// --- HORIZONTAL SCROLL COMPONENT (DESKTOP) ---
const HorizontalScrollSection = ({ items, color1, color2, scrollContainerRef }) => {
  const sectionRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      const section = sectionRef.current;
      if (!container || !section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = container.clientHeight;
      const viewportWidth = container.clientWidth; 
      const scrollTop = container.scrollTop;

      const buffer = 300; 
      const start = sectionTop + buffer;
      const end = sectionTop + sectionHeight - viewportHeight - buffer;

      const contentWidth = items.length * 500;
      const leftPadding = viewportWidth * 0.2; 
      const rightBuffer = 200;
      const maxTranslate = (contentWidth + leftPadding) - viewportWidth + rightBuffer;
      const safeTranslate = Math.max(0, maxTranslate);

      if (scrollTop > start && scrollTop < end) {
        const progress = (scrollTop - start) / (end - start);
        setTranslateX(-progress * safeTranslate);
      } else if (scrollTop <= start) {
        setTranslateX(0); 
      } else if (scrollTop >= end) {
        setTranslateX(-safeTranslate); 
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); 
    }
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [items.length, scrollContainerRef]);

  return (
    <div ref={sectionRef} className="relative h-[900vh]"> 
      <div className="sticky top-0 h-screen overflow-hidden bg-[#F6EDE4]">
        <h2 
          className="absolute top-32 left-1/2 -translate-x-1/2 text-5xl z-30 whitespace-nowrap" 
          style={{ fontFamily: "EVA-Matisse_Classic", color: color2 }}
        >
          Journey So Far
        </h2>

        <div 
          className="absolute top-0 left-0 h-full flex items-center will-change-transform"
          style={{ 
            transform: `translateX(${translateX}px)`,
            paddingLeft: '20vw' 
          }}
        >
          {/* CENTER LINE */}
          <div 
            className="absolute left-0 h-0.5 z-0"
            style={{ 
              width: `${items.length * 500 + 1000}px`, 
              top: '60%', 
              backgroundColor: color1,
              opacity: 0.3
            }}
          ></div>

          {items.map((job, index) => {
              const isTop = index % 2 === 0;

              return (
                <div key={index} className="relative w-[500px] h-full flex-shrink-0">
                  <div 
                    className="absolute left-1/2 w-5 h-5 rounded-full border-4 z-20 bg-[#F6EDE4]"
                    style={{ 
                      top: '60%', 
                      transform: 'translate(-50%, -50%)',
                      borderColor: color2 
                    }}
                  ></div>

                  <div 
                    className="absolute left-0 w-full flex flex-col items-center"
                    style={{
                      ...(isTop ? { bottom: '40%' } : { top: '60%' })
                    }}
                  >
                      <div className={`w-0.5 h-12 opacity-40 ${isTop ? 'order-2' : 'order-1'}`} style={{ backgroundColor: color1 }}></div>
                      <div 
                        className={`
                          w-80 p-6 rounded-xl border bg-white bg-opacity-80 backdrop-blur-sm text-center shadow-sm hover:scale-105 transition-transform duration-300
                          ${isTop ? 'order-1 mb-0' : 'order-2 mt-0'} 
                        `}
                        style={{ borderColor: color1 }}
                      >
                          <div className="flex justify-center gap-2 mb-2 text-xs font-bold tracking-wider opacity-60 uppercase">
                            <Calendar size={12} /> {job.year}
                          </div>
                          <h3 className="text-xl font-bold mb-1" style={{ color: color1 }}>{job.role}</h3>
                          <h4 className="text-sm font-semibold mb-2 opacity-90" style={{ color: color2 }}>{job.company}</h4>
                          <p className="text-sm leading-relaxed opacity-80">{job.desc}</p>
                      </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

// --- TIMELINE COMPONENT ---
const TimelineSection = ({ items, color1, color2, scrollContainerRef }) => {
  return (
    <div id="about" className="relative w-full">
      {/* MOBILE VIEW */}
      <div className="md:hidden py-20 px-4">
         <h2 
            className="text-5xl mb-12 text-center" 
            style={{ fontFamily: "EVA-Matisse_Classic", color: color2 }}
         >
            Journey So Far
         </h2>
         
         <div className="relative ml-4 space-y-12">
            {items.map((job, index) => (
              <div key={index} className="relative pl-8">
                {index !== items.length - 1 && (
                  <div 
                    className="absolute w-0.5"
                    style={{ 
                      backgroundColor: color1,
                      left: '0px', 
                      top: '24px', 
                      bottom: '-72px', 
                      zIndex: 0
                    }}
                  ></div>
                )}
                <div 
                  className="absolute -left-[7px] top-6 w-4 h-4 rounded-full border-4 bg-[#F6EDE4] z-10" 
                  style={{ borderColor: color2 }}
                ></div>
                <div className="p-6 rounded-xl border bg-white bg-opacity-60 backdrop-blur-sm shadow-sm relative z-10" style={{ borderColor: color1 }}>
                   <div className="flex items-center gap-2 mb-2 text-xs font-bold tracking-wider opacity-60 uppercase">
                      <Calendar size={12} /> {job.year}
                   </div>
                   <h3 className="text-xl font-bold mb-1" style={{ color: color1 }}>{job.role}</h3>
                   <h4 className="text-sm font-semibold mb-2 opacity-90" style={{ color: color2 }}>{job.company}</h4>
                   <p className="text-sm leading-relaxed opacity-80">{job.desc}</p>
                </div>
              </div>
            ))}
         </div>
      </div>
      {/* DESKTOP VIEW */}
      <div className="hidden md:block">
        <HorizontalScrollSection 
           items={items} 
           color1={color1} 
           color2={color2} 
           scrollContainerRef={scrollContainerRef} 
        />
      </div>
    </div>
  );
};

// --- PRELOADER ---
const Preloader = ({ fadeOut }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#F6EDE4] transition-opacity duration-700 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="loader scale-150"></div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const scrollWrapperRef = useRef(null);

  const primaryBg = "#F6EDE4";
  const color1 = "#262D65"; 
  const color2 = "#E9364C";

  const experience = [
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

  const projects = [
    { title: "E-Commerce Dashboard", desc: "A high-performance analytics dashboard.", tech: ["React", "Tailwind", "Node.js"], role: "Lead Frontend", link: "#" },
    { title: "Health Tracker App", desc: "Accessible mobile-first web app for tracking daily vitals.", tech: ["TypeScript", "Next.js", "Supabase"], role: "Full Stack Developer", link: "#" },
    { title: "Creative Agency Portfolio", desc: "Award-winning design implementation with complex animations.", tech: ["React", "GSAP", "WebGL"], role: "Creative Developer", link: "#" },
  ];

  const items = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  const skills = {
    core: ["JavaScript (ES6+)", "React", "UX/UI Design", "Node.js"],
    tools: ["VS Code", "Figma", "Git/GitHub", "Jira"],
    soft: ["Agile Methodology", "Public Speaking", "Mentorship"],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 700); 
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Kept Scrollbar Hiding, removed Cursor hiding */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {(loading || fadeOut) && <Preloader fadeOut={fadeOut} />}
      
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] w-max max-w-[90vw] pointer-events-none md:top-8 md:bottom-auto transition-all duration-500">
        <div className="pointer-events-auto">
          <PillNav 
            items={items} 
            baseColor={color2} 
            pillColor={primaryBg} 
            hoveredPillTextColor={primaryBg} 
            pillTextColor={color1} 
          />
        </div>
      </div>

      <div 
        ref={scrollWrapperRef}
        className={`h-screen w-full overflow-y-scroll no-scrollbar transition-opacity duration-1000 ${loading && !fadeOut ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundColor: primaryBg }}
      >
        <ClickSpark sparkColor={color2} sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
          <div className="w-full relative" style={{ color: color1 }}>
            
            {/* HERO */}
            <div className="min-h-screen flex flex-col items-center justify-center relative">
              <h1 className="text-6xl md:text-8xl text-center px-4" style={{ color: color2, fontFamily: "EVA-Matisse_Classic" }}>
                Aviral Gupta
              </h1>
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
                <p className="text-lg text-gray-800" style={{ color: color1, fontFamily: "EVA-Matisse_Classic" }}>(I make cool)-</p>
                <RotatingText
                  texts={["Websites", "Designs", "Softwares", "Stories", "Systems"]}
                  mainClassName="px-2 sm:px-2 md:px-3 font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                  style={{ backgroundColor: color2, color: primaryBg, fontFamily: "EVA-Matisse_Classic" }}
                  staggerFrom={"last"} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-120%" }} staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }} rotationInterval={2000}
                />
              </div>
            </div>

            {/* TIMELINE */}
            <TimelineSection 
                items={experience} 
                color1={color1} 
                color2={color2} 
                scrollContainerRef={scrollWrapperRef}
            />

            {/* SKILLS */}
            <section id="skills" className="w-full py-20 px-6 md:px-20 bg-opacity-50">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl mb-12 text-center" style={{ fontFamily: "EVA-Matisse_Classic", color: color2 }}>Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 border rounded-xl" style={{ borderColor: color1 }}>
                    <h3 className="text-xl font-bold mb-6 uppercase tracking-widest">Core Stack</h3>
                    <ul className="space-y-3">{skills.core.map((s) => (<li key={s} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: color2 }}></span>{s}</li>))}</ul>
                  </div>
                  <div className="p-8 border rounded-xl" style={{ borderColor: color1 }}>
                    <h3 className="text-xl font-bold mb-6 uppercase tracking-widest">Tools</h3>
                    <ul className="space-y-3">{skills.tools.map((s) => (<li key={s} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: color2 }}></span>{s}</li>))}</ul>
                  </div>
                  <div className="p-8 border rounded-xl" style={{ borderColor: color1 }}>
                    <h3 className="text-xl font-bold mb-6 uppercase tracking-widest">Soft Skills</h3>
                    <ul className="space-y-3">{skills.soft.map((s) => (<li key={s} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: color2 }}></span>{s}</li>))}</ul>
                  </div>
                </div>
              </div>
            </section>

            {/* WORK */}
            <section id="work" className="w-full py-20 px-6 md:px-20">
              <h2 className="text-5xl mb-16" style={{ fontFamily: "EVA-Matisse_Classic", color: color2 }}>Selected Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {projects.map((project, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="w-full aspect-video rounded-lg mb-6 border-2 transition-transform duration-300 group-hover:-translate-y-2" style={{ borderColor: color1, backgroundColor: "#fff" }}>
                      <div className="w-full h-full flex items-center justify-center opacity-20 text-4xl font-bold">IMG</div>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <ExternalLink size={20} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="mb-4 opacity-80 leading-relaxed">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((t, i) => (<span key={i} className="px-3 py-1 text-sm rounded-full border" style={{ borderColor: color1 }}>{t}</span>))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="w-full py-32 px-6 text-center">
              <h2 className="text-6xl mb-8" style={{ fontFamily: "EVA-Matisse_Classic", color: color2 }}>Let's Connect</h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-20">
                <a href="mailto:hello@aviral.com" className="flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold transition-transform hover:scale-105" style={{ backgroundColor: color2 }}>
                  <Mail size={20} /> Say Hello
                </a>
                <a href="/resume.pdf" className="flex items-center gap-2 px-8 py-4 rounded-full border-2 font-bold transition-colors hover:bg-white hover:bg-opacity-50" style={{ borderColor: color1, color: color1 }}>
                  <FileText size={20} /> Resume
                </a>
              </div>
              <footer className="mt-20 opacity-40 text-sm">© {new Date().getFullYear()} Aviral Gupta. Built with React & lots of coffee.</footer>
            </section>
          </div>
        </ClickSpark>
      </div>
    </>
  );
}

export default App;