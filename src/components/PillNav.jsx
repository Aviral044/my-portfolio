// PillNav.js
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const PillNav = ({
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  
  // Refs
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const navItemsRef = useRef(null);

  useEffect(() => {
    // 1. Layout Logic (Calculates circle geometry)
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        
        // If width is 0 (hidden), skip calculation to avoid broken math
        if (w === 0 || h === 0) return;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        // Re-create timeline with new dimensions
        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }
        tlRefs.current[index] = tl;
      });
    };

    // Run layout immediately
    layout();
    
    // Run layout again after a short delay to ensure fonts/styles settled
    const timeout = setTimeout(layout, 100);

    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    if (document.fonts?.ready) document.fonts.ready.then(layout).catch(() => {});

    // 2. Initial Animation
    if (initialLoadAnimation) {
      const navItems = navItemsRef.current;
      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, { 
          width: 'auto', 
          duration: 0.6, 
          ease,
          onComplete: () => {
             gsap.set(navItems, { overflow: 'visible' });
             // CRITICAL FIX: Recalculate layout once fully expanded
             layout(); 
          }
        });
      }
    }

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timeout);
    };
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (tl) {
      activeTweenRefs.current[i]?.kill();
      activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: 'auto' });
    }
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (tl) {
      activeTweenRefs.current[i]?.kill();
      activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: 'auto' });
    }
  };

  const isExternalLink = href =>
    href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('#');

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--pill-gap']: '3px'
  };

  return (
    <div className={`relative w-full flex justify-center ${className}`}>
      {/* Responsive Styles */}
      <style>{`
        .pill-nav-root {
          --nav-h: 34px; 
          --pill-pad-x: 10px;
          --pill-font-sz: 12px;
        }
        @media (min-width: 768px) {
          .pill-nav-root {
            --nav-h: 42px;
            --pill-pad-x: 18px;
            --pill-font-sz: 16px;
          }
        }
      `}</style>

      <nav
        className="pill-nav-root flex items-center justify-center box-border px-2 md:px-0 max-w-full"
        style={cssVars}
      >
        <div
          ref={navItemsRef}
          className="relative flex items-center rounded-full overflow-hidden"
          style={{ 
            height: 'var(--nav-h)', 
            background: 'var(--base, #000)',
            maxWidth: '100%'
          }}
        >
          <ul
            className="list-none flex items-stretch m-0 p-[3px] h-full"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;
              const pillStyle = { 
                background: 'var(--pill-bg, #fff)', 
                color: 'var(--pill-text, var(--base, #000))', 
                paddingLeft: 'var(--pill-pad-x)', 
                paddingRight: 'var(--pill-pad-x)' 
              };

              const PillContent = (
                <>
                  <span className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none" style={{ background: 'var(--base, #000)' }} ref={el => { circleRefs.current[i] = el; }} />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span className="pill-label relative z-[2] inline-block">{item.label}</span>
                    <span className="pill-label-hover absolute left-0 top-0 z-[3] inline-block" style={{ color: 'var(--hover-text, #fff)' }}>{item.label}</span>
                  </span>
                  {isActive && <span className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]" style={{ background: 'var(--base, #000)' }} />}
                </>
              );

              const linkProps = {
                className: 'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full font-semibold uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer',
                style: { ...pillStyle, fontSize: 'var(--pill-font-sz)' },
                onMouseEnter: () => handleEnter(i),
                onMouseLeave: () => handleLeave(i)
              };

              return (
                /* Changed shrink-1 to shrink-0 so items don't collapse during animation */
                <li key={item.href} className="flex h-full shrink-0">
                  {isExternalLink(item.href) ? (
                    <a href={item.href} {...linkProps}>{PillContent}</a>
                  ) : (
                    <Link to={item.href} {...linkProps}>{PillContent}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default PillNav;