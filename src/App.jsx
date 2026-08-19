import React, { useState, useEffect, useRef } from "react";
import RotatingText from "./components/RotatingText";
import ClickSpark from "./components/ClickSpark";
import PixelNav from "./components/PixelNav";
import { Mail, FileText, ExternalLink, Calendar } from "lucide-react";

// Import Data
import { experience, projects, items, skillCategories } from "./data";

// --- PALETTE (Sweetie-16 inspired) ---
const C = {
  bg: "#1a1c2c",
  bgDeep: "#0c0d16",
  panel: "#29366f",
  panelAlt: "#333c57",
  text: "#f4f4f4",
  muted: "#94b0c2",
  yellow: "#ffcd75",
  red: "#b13e53",
  orange: "#ef7d57",
  cyan: "#73eff7",
  green: "#a7f070",
};

// --- PIXEL HEART SPRITE ---
const PixelHeart = ({ size = 28, color = C.red, className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 13 11"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <g fill={color}>
      <rect x="2" y="0" width="3" height="1" />
      <rect x="8" y="0" width="3" height="1" />
      <rect x="1" y="1" width="5" height="1" />
      <rect x="7" y="1" width="5" height="1" />
      <rect x="0" y="2" width="13" height="2" />
      <rect x="1" y="4" width="11" height="1" />
      <rect x="2" y="5" width="9" height="1" />
      <rect x="3" y="6" width="7" height="1" />
      <rect x="4" y="7" width="5" height="1" />
      <rect x="5" y="8" width="3" height="1" />
      <rect x="6" y="9" width="1" height="1" />
    </g>
  </svg>
);

// --- PIXEL BONFIRE SPRITE (3-frame flicker, see .bf-f* in index.css) ---
const PixelBonfire = ({ size = 56, className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 14"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    {/* Flame frame 1 — tall center */}
    <g className="bf-f1">
      <g fill={C.red}>
        <rect x="5" y="8" width="6" height="3" />
        <rect x="6" y="6" width="4" height="2" />
        <rect x="7" y="4" width="2" height="2" />
        <rect x="7" y="3" width="1" height="1" />
      </g>
      <g fill={C.orange}>
        <rect x="6" y="8" width="4" height="3" />
        <rect x="7" y="6" width="2" height="2" />
      </g>
      <rect x="7" y="9" width="2" height="2" fill={C.yellow} />
    </g>

    {/* Flame frame 2 — leaning left, spark right */}
    <g className="bf-f2">
      <g fill={C.red}>
        <rect x="5" y="8" width="6" height="3" />
        <rect x="5" y="6" width="3" height="2" />
        <rect x="6" y="4" width="2" height="2" />
        <rect x="5" y="3" width="1" height="1" />
      </g>
      <g fill={C.orange}>
        <rect x="6" y="8" width="3" height="3" />
        <rect x="6" y="6" width="2" height="2" />
      </g>
      <rect x="6" y="9" width="2" height="2" fill={C.yellow} />
      <rect x="10" y="4" width="1" height="1" fill={C.yellow} />
    </g>

    {/* Flame frame 3 — leaning right, spark left */}
    <g className="bf-f3">
      <g fill={C.red}>
        <rect x="5" y="8" width="6" height="3" />
        <rect x="8" y="6" width="3" height="2" />
        <rect x="8" y="4" width="2" height="2" />
        <rect x="10" y="3" width="1" height="1" />
      </g>
      <g fill={C.orange}>
        <rect x="7" y="8" width="3" height="3" />
        <rect x="8" y="6" width="2" height="2" />
      </g>
      <rect x="8" y="9" width="2" height="2" fill={C.yellow} />
      <rect x="4" y="5" width="1" height="1" fill={C.orange} />
    </g>

    {/* Logs (static) */}
    <g fill="#5d275d">
      <rect x="4" y="11" width="8" height="1" />
      <rect x="2" y="12" width="12" height="1" />
    </g>
    <g fill={C.bgDeep}>
      <rect x="2" y="11" width="2" height="1" />
      <rect x="12" y="11" width="2" height="1" />
    </g>
  </svg>
);

// --- PIXEL COIN SPRITE (3-frame spin) ---
const PixelCoin = ({ size = 24, className = "", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className={className} style={style}>
    {/* facing */}
    <g className="bf-f1">
      <g fill={C.yellow}>
        <rect x="2" y="0" width="4" height="1" />
        <rect x="1" y="1" width="6" height="1" />
        <rect x="0" y="2" width="8" height="4" />
        <rect x="1" y="6" width="6" height="1" />
        <rect x="2" y="7" width="4" height="1" />
      </g>
      <rect x="2" y="2" width="1" height="2" fill={C.text} />
      <rect x="5" y="2" width="2" height="3" fill={C.orange} />
      <rect x="4" y="5" width="2" height="1" fill={C.orange} />
    </g>
    {/* edge-on */}
    <g className="bf-f2">
      <g fill={C.yellow}>
        <rect x="3" y="0" width="2" height="1" />
        <rect x="2" y="1" width="4" height="6" />
        <rect x="3" y="7" width="2" height="1" />
      </g>
      <rect x="4" y="1" width="2" height="6" fill={C.orange} />
    </g>
    {/* thin */}
    <g className="bf-f3">
      <rect x="3" y="0" width="2" height="8" fill={C.orange} />
      <rect x="3" y="1" width="1" height="6" fill={C.yellow} />
    </g>
  </svg>
);

// --- PIXEL TWINKLE SPRITE (2-frame star, recolorable) ---
const PixelTwinkle = ({ size = 20, color = C.cyan, className = "", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 7 7" shapeRendering="crispEdges" className={className} style={style}>
    <g className="px2-f1" fill={color}>
      <rect x="3" y="0" width="1" height="7" />
      <rect x="0" y="3" width="7" height="1" />
      <rect x="1" y="1" width="1" height="1" />
      <rect x="5" y="1" width="1" height="1" />
      <rect x="1" y="5" width="1" height="1" />
      <rect x="5" y="5" width="1" height="1" />
    </g>
    <g className="px2-f2" fill={color}>
      <rect x="3" y="2" width="1" height="3" />
      <rect x="2" y="3" width="3" height="1" />
    </g>
  </svg>
);

// --- PIXEL SLIME SPRITE (2-frame squash & stretch) ---
const PixelSlime = ({ size = 40, color = C.green, className = "", style = {} }) => (
  <svg width={size} height={(size * 7) / 10} viewBox="0 0 10 7" shapeRendering="crispEdges" className={className} style={style}>
    {/* tall */}
    <g className="px2-f1">
      <g fill={color}>
        <rect x="3" y="0" width="4" height="1" />
        <rect x="2" y="1" width="6" height="1" />
        <rect x="1" y="2" width="8" height="4" />
      </g>
      <rect x="3" y="3" width="1" height="2" fill={C.bgDeep} />
      <rect x="6" y="3" width="1" height="2" fill={C.bgDeep} />
    </g>
    {/* squashed */}
    <g className="px2-f2">
      <g fill={color}>
        <rect x="3" y="2" width="4" height="1" />
        <rect x="1" y="3" width="8" height="1" />
        <rect x="0" y="4" width="10" height="2" />
      </g>
      <rect x="3" y="4" width="1" height="1" fill={C.bgDeep} />
      <rect x="6" y="4" width="1" height="1" fill={C.bgDeep} />
    </g>
  </svg>
);

// --- PIXEL CLOUD SPRITE (static, pair with px-float) ---
const PixelCloud = ({ size = 70, className = "", style = {} }) => (
  <svg width={size} height={(size * 6) / 14} viewBox="0 0 14 6" shapeRendering="crispEdges" className={className} style={style}>
    <g fill={C.panelAlt}>
      <rect x="4" y="0" width="4" height="1" />
      <rect x="2" y="1" width="8" height="1" />
      <rect x="1" y="2" width="11" height="2" />
      <rect x="0" y="4" width="14" height="2" />
    </g>
    <rect x="4" y="1" width="2" height="1" fill={C.muted} opacity="0.4" />
  </svg>
);

// --- SECTION TITLE ---
const SectionTitle = ({ children, sub }) => (
  <div className="text-center mb-16">
    <h2
      className="font-pixel text-2xl md:text-4xl leading-relaxed"
      style={{ color: C.yellow, textShadow: `4px 4px 0 ${C.red}` }}
    >
      {children}
    </h2>
    {sub && (
      <p className="font-retro text-xl md:text-2xl mt-4" style={{ color: C.muted }}>
        {sub}
      </p>
    )}
  </div>
);

// --- TIMELINE CARD ---
const QuestCard = ({ job }) => (
  <div className="pixel-panel w-96 p-9 text-center" style={{ backgroundColor: C.panel }}>
    <div
      className="font-pixel text-[11px] flex justify-center items-center gap-2 mb-4 tracking-wider"
      style={{ color: C.yellow }}
    >
      <Calendar size={14} /> {job.year}
    </div>
    <h3 className="font-pixel text-base leading-relaxed mb-3" style={{ color: C.cyan }}>
      {job.role}
    </h3>
    <h4 className="font-retro text-2xl" style={{ color: C.orange }}>
      {job.company}
    </h4>
  </div>
);

// --- HORIZONTAL SCROLL COMPONENT (DESKTOP) ---
const HorizontalScrollSection = ({ items, scrollContainerRef }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let target = 0;
    let current = 0;
    let rafId;

    const computeTarget = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = container.clientHeight;
      const viewportWidth = container.clientWidth;
      const scrollTop = container.scrollTop;

      const startDelay = 700; // extra scroll before the cards start moving
      const endBuffer = 60; // keep small — anything left here is dead scrolling before the section unpins
      const start = sectionTop + startDelay;
      const end = sectionTop + sectionHeight - viewportHeight - endBuffer;

      const contentWidth = items.length * 500;
      const leftPadding = viewportWidth * 0.2;
      const rightBuffer = 80;
      const maxTranslate = (contentWidth + leftPadding) - viewportWidth + rightBuffer;
      const safeTranslate = Math.max(0, maxTranslate);

      const progress = Math.min(1, Math.max(0, (scrollTop - start) / (end - start)));
      target = -progress * safeTranslate;
    };

    // Ease the track toward the scroll target each frame instead of
    // snapping on every scroll event — this is what makes it smooth.
    const loop = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.5) current = target;
      track.style.transform = `translate3d(${current}px, 0, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    computeTarget();
    current = target; // start settled, no fly-in on mount
    container.addEventListener("scroll", computeTarget, { passive: true });
    window.addEventListener("resize", computeTarget);
    rafId = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener("scroll", computeTarget);
      window.removeEventListener("resize", computeTarget);
      cancelAnimationFrame(rafId);
    };
  }, [items.length, scrollContainerRef]);

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${Math.max(220, items.length * 70)}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: C.bg }}>
        <div className="quest-title absolute top-20 lg:top-24 left-1/2 -translate-x-1/2 z-30 text-center whitespace-nowrap">
          <h2
            className="font-pixel text-3xl md:text-4xl"
            style={{ color: C.yellow, textShadow: `4px 4px 0 ${C.red}` }}
          >
            QUEST LOG
          </h2>
          <p className="font-retro text-xl md:text-2xl mt-3" style={{ color: C.muted }}>
            &lt;&lt; the journey so far &gt;&gt;
          </p>
        </div>

        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center will-change-transform"
          style={{ paddingLeft: "20vw" }}
        >
          {/* CENTER LINE (dashed pixel track) */}
          <div
            className="absolute left-0 z-0"
            style={{
              width: `${items.length * 500 + 1000}px`,
              height: "4px",
              top: "60%",
              backgroundImage: `repeating-linear-gradient(90deg, ${C.panelAlt} 0 16px, transparent 16px 32px)`,
            }}
          ></div>

          {items.map((job, index) => {
            const isTop = index % 2 === 0;

            return (
              <div key={index} className="relative w-[500px] h-full flex-shrink-0">
                {/* Square waypoint marker */}
                <div
                  className="absolute left-1/2 w-5 h-5 z-20"
                  style={{
                    top: "60%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: C.yellow,
                    border: `4px solid ${C.bgDeep}`,
                  }}
                ></div>

                <div
                  className={`absolute left-0 w-full flex flex-col items-center ${
                    isTop ? "quest-col-top" : "quest-col-bottom"
                  }`}
                  style={{ ...(isTop ? { bottom: "40%" } : { top: "60%" }) }}
                >
                  <div
                    className={`w-1 h-12 ${isTop ? "order-2" : "order-1"}`}
                    style={{ backgroundColor: C.panelAlt }}
                  ></div>
                  <div className={isTop ? "order-1" : "order-2"}>
                    <QuestCard job={job} />
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
const TimelineSection = ({ items, scrollContainerRef }) => {
  return (
    <div id="about" className="relative w-full">
      {/* MOBILE VIEW */}
      <div className="md:hidden py-20 px-4">
        <SectionTitle sub="<< the journey so far >>">QUEST LOG</SectionTitle>

        <div className="relative ml-4 space-y-12">
          {items.map((job, index) => (
            <div key={index} className="relative pl-8">
              {index !== items.length - 1 && (
                <div
                  className="absolute"
                  style={{
                    width: "4px",
                    backgroundImage: `repeating-linear-gradient(180deg, ${C.panelAlt} 0 12px, transparent 12px 24px)`,
                    left: "0px",
                    top: "24px",
                    bottom: "-72px",
                    zIndex: 0,
                  }}
                ></div>
              )}
              <div
                className="absolute -left-[7px] top-6 w-4 h-4 z-10"
                style={{ backgroundColor: C.yellow, border: `3px solid ${C.bgDeep}` }}
              ></div>
              <div className="pixel-panel p-8 relative z-10" style={{ backgroundColor: C.panel }}>
                <div
                  className="font-pixel text-[10px] flex items-center gap-2 mb-3 tracking-wider"
                  style={{ color: C.yellow }}
                >
                  <Calendar size={13} /> {job.year}
                </div>
                <h3 className="font-pixel text-base leading-relaxed mb-2" style={{ color: C.cyan }}>
                  {job.role}
                </h3>
                <h4 className="font-retro text-2xl" style={{ color: C.orange }}>
                  {job.company}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* DESKTOP VIEW */}
      <div className="hidden md:block">
        <HorizontalScrollSection items={items} scrollContainerRef={scrollContainerRef} />
      </div>
    </div>
  );
};

// --- PRELOADER ---
const Preloader = ({ fadeOut }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-700 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: C.bg }}
    >
      <div className="loader scale-150"></div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 700);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {(loading || fadeOut) && <Preloader fadeOut={fadeOut} />}

      {/* CRT scanline overlay */}
      <div className="scanlines fixed inset-0 z-[900] pointer-events-none opacity-60"></div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] w-max max-w-[95vw] pointer-events-none md:top-6 md:bottom-auto transition-all duration-500">
        <div className="pointer-events-auto">
          <PixelNav items={items} />
        </div>
      </div>

      <ClickSpark sparkColor={C.yellow} sparkSize={10} sparkRadius={18} sparkCount={8} duration={400}>
        <div
          ref={scrollWrapperRef}
          className={`h-screen w-full overflow-y-scroll no-scrollbar transition-opacity duration-1000 ${
            loading && !fadeOut ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundColor: C.bg, scrollBehavior: "smooth" }}
        >
          <div className="w-full relative" style={{ color: C.text }}>

            {/* HERO */}
            <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 pt-24 pb-36 md:pt-28 md:pb-20">
              {/* Floating pixel sprites */}
              <PixelCloud size={90} className="px-float absolute top-[10%] left-[22%] opacity-50 hidden md:block" style={{ animationDelay: "0.6s" }} />
              <PixelCloud size={60} className="px-float absolute top-[22%] right-[30%] opacity-40 hidden md:block" style={{ animationDelay: "1.6s" }} />

              <PixelHeart
                size={26}
                className="px-float absolute top-[18%] left-[12%] opacity-70"
                style={{ animationDelay: "0s" }}
              />
              <PixelHeart
                size={18}
                color={C.orange}
                className="px-float absolute top-[30%] right-[15%] opacity-60"
                style={{ animationDelay: "0.8s" }}
              />

              <PixelCoin size={26} className="px-float absolute top-[14%] right-[10%] opacity-90" style={{ animationDelay: "0.3s" }} />
              <PixelCoin size={18} className="absolute top-[42%] left-[7%] opacity-80 hidden md:block" style={{ "--d": "0.25s" }} />
              <PixelCoin size={20} className="px-float absolute bottom-[34%] right-[8%] opacity-80 hidden md:block" style={{ animationDelay: "1s", "--d": "0.5s" }} />

              <PixelTwinkle size={20} className="absolute top-[60%] left-[18%] opacity-70" />
              <PixelTwinkle size={14} color={C.yellow} className="absolute top-[24%] left-[32%] opacity-60 hidden md:block" style={{ "--d": "0.4s" }} />
              <PixelTwinkle size={16} color={C.text} className="absolute top-[52%] right-[24%] opacity-50 hidden md:block" style={{ "--d": "0.2s" }} />
              <PixelTwinkle size={12} color={C.green} className="absolute bottom-[18%] left-[38%] opacity-60 hidden md:block" style={{ "--d": "0.6s" }} />

              <PixelSlime size={44} className="absolute bottom-[14%] right-[14%] opacity-90" style={{ "--d": "0.3s" }} />
              <PixelSlime size={26} color={C.cyan} className="absolute bottom-[24%] right-[26%] opacity-70 hidden lg:block" style={{ "--d": "0.7s" }} />

              <span
                className="px-float absolute top-[68%] right-[20%] font-pixel text-2xl opacity-50 hidden md:block"
                style={{ color: C.green, animationDelay: "1.2s" }}
              >
                +
              </span>

              <PixelBonfire
                size={90}
                className="absolute bottom-[13%] left-[8%] opacity-90 md:left-[12%]"
              />
              <PixelBonfire
                size={44}
                className="absolute top-[16%] right-[38%] opacity-60 hidden lg:block"
                style={{ "--d": "0.35s" }}
              />

              <p
                className="font-pixel text-[10px] md:text-sm mb-8 tracking-widest"
                style={{ color: C.cyan }}
              >
                ★ PLAYER 1 — READY ★
              </p>

              <h1
                className="font-pixel text-3xl md:text-6xl text-center leading-normal md:leading-relaxed"
                style={{ color: C.yellow, textShadow: `5px 5px 0 ${C.red}` }}
              >
                AVIRAL GUPTA
                <span className="blink" style={{ color: C.text }}>
                  _
                </span>
              </h1>

              <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
                <p className="font-retro text-2xl md:text-3xl" style={{ color: C.text }}>
                  I make cool
                </p>
                <RotatingText
                  texts={["Websites", "Designs", "Softwares", "Stories", "Systems"]}
                  mainClassName="font-retro text-2xl md:text-3xl px-3 py-1 overflow-hidden justify-center pixel-panel-sm"
                  style={{ backgroundColor: C.red, color: C.text }}
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>

              <div
                className="absolute bottom-24 md:bottom-10 font-pixel text-[9px] md:text-[11px] blink"
                style={{ color: C.muted }}
              >
                ▼ SCROLL TO START ▼
              </div>
            </div>

            {/* TIMELINE */}
            <TimelineSection items={experience} scrollContainerRef={scrollWrapperRef} />

            {/* SKILLS */}
            <section id="skills" className="w-full py-24 px-6 md:px-20">
              <div className="max-w-6xl mx-auto">
                <SectionTitle sub="<< abilities unlocked >>">STATS</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {skillCategories.map((category, idx) => (
                    <div key={idx} className="flex flex-col gap-6">
                      <h3
                        className="font-pixel text-xs md:text-sm leading-relaxed text-center md:text-left pb-4"
                        style={{ color: C.orange, borderBottom: `4px solid ${C.panelAlt}` }}
                      >
                        {category.title.toUpperCase()}
                      </h3>
                      <div className="grid grid-cols-2 gap-5">
                        {category.items.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            className="group pixel-panel-sm flex flex-col items-center justify-center p-4 transition-transform duration-100 hover:-translate-y-1 cursor-default"
                            style={{ backgroundColor: C.panel }}
                          >
                            <div
                              className="text-3xl mb-3 transition-colors duration-100 group-hover:text-[#ffcd75]"
                              style={{ color: C.cyan }}
                            >
                              {skill.icon}
                            </div>
                            <span className="font-retro text-lg" style={{ color: C.text }}>
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WORK */}
            <section id="work" className="w-full py-24 px-6 md:px-20">
              <div className="max-w-6xl mx-auto">
                <SectionTitle sub="<< choose your destination >>">SELECT STAGE</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {projects.map((project, index) => (
                    <a
                      key={index}
                      href={project.link}
                      className="group cursor-pointer pixel-panel p-4 block no-underline transition-transform duration-100 hover:-translate-y-2"
                      style={{ backgroundColor: C.panel }}
                    >
                      <div
                        className="font-pixel text-[8px] mb-3 flex justify-between items-center"
                        style={{ color: C.muted }}
                      >
                        <span>STAGE {String(index + 1).padStart(2, "0")}</span>
                        <ExternalLink
                          size={14}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: C.yellow }}
                        />
                      </div>

                      {/* "Screen" */}
                      <div
                        className="checkerboard w-full aspect-video mb-5 flex items-center justify-center relative"
                        style={{ border: `4px solid ${C.bgDeep}` }}
                      >
                        <span
                          className="font-pixel text-[10px] blink group-hover:hidden"
                          style={{ color: C.muted }}
                        >
                          INSERT COIN
                        </span>
                        <span
                          className="font-pixel text-sm hidden group-hover:block"
                          style={{ color: C.green }}
                        >
                          ▶ PLAY
                        </span>
                      </div>

                      <h3
                        className="font-pixel text-sm leading-relaxed mb-3"
                        style={{ color: C.yellow }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="font-retro text-lg leading-snug mb-4"
                        style={{ color: C.text, opacity: 0.85 }}
                      >
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                          <span
                            key={i}
                            className="font-pixel text-[8px] px-2 py-1.5"
                            style={{
                              backgroundColor: C.bgDeep,
                              color: C.cyan,
                              border: `2px solid ${C.panelAlt}`,
                            }}
                          >
                            {t.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="w-full py-32 px-6 text-center">
              <h2
                className="font-pixel text-3xl md:text-5xl mb-6 leading-relaxed"
                style={{ color: C.yellow, textShadow: `5px 5px 0 ${C.red}` }}
              >
                CONTINUE?
              </h2>
              <p className="font-retro text-2xl mb-14 blink" style={{ color: C.cyan }}>
                INSERT COIN TO CONNECT
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-20">
                <a
                  href="mailto:aviralgupta044@gmail.com"
                  className="pixel-btn font-pixel text-[10px] md:text-xs flex items-center gap-3 px-8 py-5 no-underline"
                  style={{ backgroundColor: C.red, color: C.text }}
                >
                  <Mail size={16} /> SAY HELLO
                </a>
                <a
                  href="/resume.pdf"
                  className="pixel-btn font-pixel text-[10px] md:text-xs flex items-center gap-3 px-8 py-5 no-underline"
                  style={{ backgroundColor: C.panel, color: C.yellow }}
                >
                  <FileText size={16} /> RESUME
                </a>
              </div>

              <footer
                className="font-retro text-lg flex items-center justify-center gap-2 flex-wrap"
                style={{ color: C.muted }}
              >
                © {new Date().getFullYear()} AVIRAL GUPTA — MADE WITH
                <PixelHeart size={14} /> AND COFFEE
              </footer>
            </section>
          </div>
        </div>
      </ClickSpark>
    </>
  );
}

export default App;
