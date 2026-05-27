import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

import GrailifyImg from './assets/Grailify.jpg';
import CarShroomImg from './assets/CarShroom.jpg';
import FutbolImg from './assets/futbol.jpg';
import MuzikImg from './assets/Muzik.jpg';
import PlanifyImg from './assets/Planify.jpg';
import CoinLensImg from './assets/CoinLens.jpg';
import BoxQImg from './assets/BoxQ.jpeg';

import HashMicroSolutionImg from './assets/HashMicro-SolutionPage.jpeg';
import HashMicroProductImg from './assets/HashMicro-ProductPage.jpeg';
import HashMicroAiImg from './assets/HashMicro-AiAgentPage.jpeg';
import HashMicroHomeImg from './assets/HashMicro-Homepage.jpeg';
import TotalERPHomeImg from './assets/TotalERP-Homepage.jpeg';
import TotalERPProductImg from './assets/TotalERP-ProductPage.jpeg';
import EquipProductImg from './assets/EQUIP-ProductPage.jpeg';
import EquipIndustryImg from './assets/EQUIP-IndustryPage.jpeg';

const GitHubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const MagneticElement = ({ children, strength = 0.4, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

const ArrowRightIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ExternalLinkIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const useMousePosition = () => {
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  useEffect(() => {
    const update = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, [x, y]);
  return { x, y };
};

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const springCfg = { damping: 40, stiffness: 250, mass: 0.6 };
  const cx = useSpring(x, springCfg);
  const cy = useSpring(y, springCfg);

  useEffect(() => {
    const onOver = (e) => {
      setIsHovering(!!e.target.closest('a, button, [data-cursor]'));
    };
    document.addEventListener('mouseover', onOver);
    return () => document.removeEventListener('mouseover', onOver);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-[#1c1c1c] rounded-full pointer-events-none z-[9999]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-[#1c1c1c]/60"
        animate={{ width: isHovering ? 56 : 36, height: isHovering ? 56 : 36 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: cx, y: cy, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#1c1c1c] origin-left z-[9999]"
      style={{ scaleX }}
    />
  );
};

/* ─── BACKGROUND ─────────────────────────────────────────────────────────────
   Three subtle layers:
   1. Static fine grid (pure CSS, no Framer overhead)
   2. Two large soft blobs that drift on a very slow keyframe cycle
   3. A faint vignette edge to give depth
──────────────────────────────────────────────────────────────────────────── */
const BackgroundGrid = () => (
  <>
    <style>{`
      @keyframes blobA {
        0%,100% { transform: translate(0%, 0%) scale(1); }
        33%      { transform: translate(8%, 12%) scale(1.08); }
        66%      { transform: translate(-6%, 6%) scale(0.95); }
      }
      @keyframes blobB {
        0%,100% { transform: translate(0%, 0%) scale(1); }
        33%      { transform: translate(-10%, -8%) scale(1.05); }
        66%      { transform: translate(7%, -12%) scale(1.1); }
      }
      @keyframes gridDrift {
        0%   { background-position: 0px 0px; }
        100% { background-position: 40px 40px; }
      }
    `}</style>

    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right,rgba(28,28,28,0.055) 1px,transparent 1px),' +
            'linear-gradient(to bottom,rgba(28,28,28,0.055) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
          animation: 'gridDrift 22s linear infinite',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '-20%', left: '-15%',
          width: '70%', height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(28,28,28,0.07) 0%, transparent 70%)',
          animation: 'blobA 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-20%', right: '-15%',
          width: '65%', height: '65%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(28,28,28,0.055) 0%, transparent 70%)',
          animation: 'blobB 26s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(28,28,28,0.06) 100%)',
        }}
      />
    </div>
  </>
);

const NODE_DEFS = [
  { label: 'React',       cx: 0.22, cy: 0.20, dur: 9,  ax: 0.03, ay: 0.025 },
  { label: 'Design',      cx: 0.72, cy: 0.16, dur: 11, ax:-0.025,ay: 0.03  },
  { label: 'Go',          cx: 0.28, cy: 0.78, dur: 8,  ax: 0.028,ay:-0.025 },
  { label: 'Performance', cx: 0.76, cy: 0.74, dur: 13, ax:-0.03, ay:-0.02  },
  { label: 'Laravel',     cx: 0.10, cy: 0.50, dur: 10, ax: 0.025,ay: 0.03  },
  { label: 'WordPress',   cx: 0.90, cy: 0.46, dur: 12, ax:-0.028,ay: 0.025 },
];

const ConstellationNet = () => {
  const canvasRef = useRef(null);
  const nodesRef  = useRef([]);
  const rafRef    = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [size, setSize] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1000, h: typeof window !== 'undefined' ? window.innerHeight : 800 });

  useEffect(() => {
    nodesRef.current = NODE_DEFS.map((n, i) => ({
      ...n,
      phase: (i / NODE_DEFS.length) * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width  = size.w * dpr;
    canvas.height = size.h * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size.w / 2;
    const centerY = size.h / 2;

    const draw = (t) => {
      ctx.clearRect(0, 0, size.w, size.h);

      const positions = nodesRef.current.map((n) => ({
        x: n.cx * size.w + Math.sin(t * 0.001 / n.dur * 6.28 + n.phase) * n.ax * size.w,
        y: n.cy * size.h + Math.cos(t * 0.001 / n.dur * 6.28 + n.phase) * n.ay * size.h,
        label: n.label
      }));

      positions.forEach((p, i) => {
        const isHov = hoveredIdx === i;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = isHov ? 'rgba(28,28,28,0.35)' : 'rgba(28,28,28,0.13)';
        ctx.lineWidth   = isHov ? 1.4 : 0.7;
        ctx.stroke();
      });

      positions.forEach((a, i) => {
        positions.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > size.w * 0.42) return;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(28,28,28,0.07)';
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        });
      });

      positions.forEach((p, i) => {
        const isHov = hoveredIdx === i;
        ctx.font = isHov ? "bold 13px monospace" : "11px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = isHov ? 'rgba(28,28,28,0.95)' : 'rgba(28,28,28,0.55)';
        ctx.fillText(p.label.toUpperCase(), p.x, p.y);
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, hoveredIdx]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const t  = performance.now();

    let found = null;
    nodesRef.current.forEach((n, i) => {
      const px = n.cx * size.w + Math.sin(t * 0.001 / n.dur * 6.28 + n.phase) * n.ax * size.w;
      const py = n.cy * size.h + Math.cos(t * 0.001 / n.dur * 6.28 + n.phase) * n.ay * size.h;
      if (Math.hypot(mx - px, my - py) < 30) found = i;
    });
    setHoveredIdx(found);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 1, width: '100%', height: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIdx(null)}
      />
    </div>
  );
};

const MarqueeTicker = () => {
  const items = ['Full-Stack Development', 'React & Next.js', 'Go Backend', 'UI/UX Engineering', 'Performance Optimization', 'Laravel & PHP', 'TypeScript', 'System Design', 'Available to Work Together'];
  const tripled = [...items, ...items, ...items];
  return (
    <div className="w-full overflow-hidden border-t border-b border-[#1c1c1c]/10 py-3 bg-[#e4e2dd] relative z-10">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
        style={{ width: 'max-content' }}
      >
        {tripled.map((item, i) => (
          <span key={i} className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#1c1c1c]/45 flex items-center gap-12">
            {item}
            <span className="text-[#1c1c1c]/18 text-base leading-none">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const NavBar = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 p-4 md:p-6 mix-blend-difference text-[#e4e2dd]"
    >
      <div className="flex justify-between items-start font-mono text-xs uppercase tracking-widest">
        <div className="flex flex-col gap-1 cursor-pointer interactive" onClick={() => scrollTo('hero')}>
          <span className="font-bold text-sm tracking-tighter">DARREN.STUDIO</span>
          <span className="hidden sm:block opacity-70">Jakarta, ID</span>
        </div>
        <div className="hidden md:flex gap-6 lg:gap-8">
          {['services', 'projects', 'showcase', 'notes', 'profile'].map((item, i) => (
            <button key={item} onClick={() => scrollTo(item)} className="hover:line-through transition-all duration-200 opacity-80 hover:opacity-100 interactive">
              {`00${i + 1}/${item}`}
            </button>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <a href="https://github.com/DarrenAnthonyBeltham/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 interactive">
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/darrenanthonybeltham" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 interactive">
            <LinkedInIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

const FaviconAnimator = () => {
  useEffect(() => {
    let isPulse = false;
    const interval = setInterval(() => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/svg+xml';
      const size = isPulse ? '60' : '40';
      link.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="${size}" fill="%231c1c1c"/></svg>`;
      isPulse = !isPulse;
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return null;
};

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-[#1c1c1c] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[#e4e2dd] font-black text-4xl md:text-6xl tracking-tighter uppercase"
            >
              DARREN.STUDIO
            </motion.h1>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
            className="w-48 h-px bg-[#e4e2dd] mt-8 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HeroSection = () => {
  const { x, y } = useMousePosition();
  const [windowSize, setWindowSize] = useState({ w: 1000, h: 800 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const springCfg = { damping: 60, stiffness: 80, mass: 1.2 };
  const rawX = useTransform(x, [0, windowSize.w], [10, -10]);
  const rawY = useTransform(y, [0, windowSize.h], [10, -10]);
  const xOffset = useSpring(rawX, springCfg);
  const yOffset = useSpring(rawY, springCfg);

  return (
    <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center border-b border-[#1c1c1c]/10 overflow-hidden">
      {!isMobile && <ConstellationNet />}

      <motion.div
        style={{ x: isMobile ? 0 : xOffset, y: isMobile ? 0 : yOffset }}
        className="relative z-10 text-center flex flex-col items-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-[18vw] sm:text-[14vw] md:text-[12vw] leading-[0.9] font-black text-[#1c1c1c] tracking-tighter uppercase whitespace-nowrap">
          DARREN
        </h1>
        <h2 className="text-[18vw] sm:text-[14vw] md:text-[12vw] leading-[0.9] font-black text-[#1c1c1c] tracking-tighter uppercase whitespace-nowrap">
          A.B
        </h2>
        <motion.div
          className="mt-6 md:mt-10 flex gap-6 md:gap-12 font-mono text-[10px] md:text-xs tracking-widest text-[#1c1c1c]/55 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
        >
          <span>Full-Stack</span>
          <span className="opacity-30">·</span>
          <span>Engineering</span>
          <span className="opacity-30">·</span>
          <span>Design</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <motion.div
          className="w-px bg-[#1c1c1c]/25"
          animate={{ height: [16, 32, 16], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#1c1c1c]/35">Scroll</span>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-5 md:right-12 font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 text-[#1c1c1c]/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.span
          className="w-[5px] h-[5px] rounded-full bg-emerald-500 inline-block"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        Available to Work Together
      </motion.div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    {
      id: "01",
      title: "Performance Engineering",
      desc: "Deep optimization of Core Web Vitals (LCP, CLS, FID) to elevate Google rankings and ensure lightning-fast user retention across global deployments.",
    },
    {
      id: "02",
      title: "Custom Web Architecture",
      desc: "Building tailored, secure themes and plugins without relying on bloated page builders. Pristine, semantic code structured for massive scalability.",
    },
    {
      id: "03",
      title: "End-to-End Solutions",
      desc: "Full-stack development bridging robust Go/Laravel backend infrastructure with high-fidelity, interactive React and Vue.js frontends.",
    }
  ];

  return (
    <section id="services" className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-12 border-b border-[#1c1c1c]/10">
      <div className="max-w-7xl mx-auto">
        <SectionTitle className="text-3xl sm:text-4xl md:text-6xl mb-12 md:mb-20">How I Work</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
            >
              <TiltCard className="h-full bg-[#e4e2dd] border border-[#1c1c1c]/15 p-8 md:p-10 group rounded-none">
                <div className="font-mono text-xs text-[#1c1c1c]/40 mb-6">{service.id}</div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter mb-4 text-[#1c1c1c] group-hover:text-[#1c1c1c]/80 transition-colors flex items-center justify-between">
                  {service.title}
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-2 h-2 rounded-full bg-[#1c1c1c]/20"
                  />
                </h3>
                <div className="w-0 h-[2px] bg-[#1c1c1c] mb-6 group-hover:w-full transition-all duration-500 ease-out" />
                <p className="text-sm font-mono text-[#1c1c1c]/65 leading-relaxed">
                  {service.desc}
                </p>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#1c1c1c]/0 group-hover:border-[#1c1c1c]/40 m-4 transition-colors duration-300" />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { damping: 30, stiffness: 200 });
  const glareX = useTransform(x, [-100, 100], [0, 100]);
  const glareY = useTransform(y, [-100, 100], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className} interactive`}
    >
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-inherit z-10"
        style={{ background: glareBackground }}
      />
    </motion.div>
  );
};

const AnimatedText = ({ text }) => {
  if (typeof text !== 'string') return <>{text}</>;
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap gap-x-2 md:gap-x-4">
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

const SectionTitle = ({ children, className = '' }) => (
  <motion.h2
    className={`font-bold tracking-tighter text-[#1c1c1c] uppercase ${className}`}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.h2>
);

const ProjectsSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const projects = [
    { id: 7, title: 'BoxQ',      category: 'Fullstack / Procurement', image: BoxQImg,      pos: 'top',    description: 'End-to-end automated procurement platform. Features AI-powered OCR for intelligent invoice scanning, multi-tier approvals, and automated payment disbursements enforcing strict financial compliance.', tech: ['Vue.js','TypeScript','Laravel','MongoDB','Mindee AI','Xendit'], repoUrl: 'https://github.com/DarrenAnthonyBeltham/boxq' },
    { id: 1, title: 'Grailify',  category: 'Fullstack / E-Commerce',  image: GrailifyImg,  pos: 'top',    description: 'Premier online marketplace for authentic sneakers, apparel, and collectibles. Built with a powerful Go backend and a responsive Next.js frontend.', tech: ['Next.js','Tailwind','Typescript','MySQL','GO','JWT'], repoUrl: 'https://github.com/DarrenAnthonyBeltham/Grailify' },
    { id: 2, title: 'CarShroom', category: 'Fullstack / Automotive',  image: CarShroomImg, pos: 'top',    description: 'Sophisticated web application for a high-end luxury and performance car dealership. Features a rich interactive frontend and a robust backend API to manage products.', tech: ['PHP','HTML5','CSS3','GO'], repoUrl: 'https://github.com/DarrenAnthonyBeltham/CarShroom' },
    { id: 6, title: 'CoinLens',  category: 'Frontend / Crypto',       image: CoinLensImg,  pos: 'top',    description: 'Futuristic all-in-one crypto dashboard tracking live market data, analyzing trends with interactive charts, and exploring digital assets through personal watchlists.', tech: ['Next.js','Tailwind CSS','Typescript'], repoUrl: 'https://github.com/DarrenAnthonyBeltham/coinlens', liveUrl: 'https://coinlens-phi.vercel.app/' },
    { id: 3, title: 'Futbol',    category: 'Frontend / Sports',       image: FutbolImg,    pos: 'center', description: 'Modern web-based application designed for football fans, coaches, and analysts. Intuitive platform to build team formations and explore detailed player stats.', tech: ['React.js','Tailwind CSS'], repoUrl: 'https://github.com/DarrenAnthonyBeltham/futbol', liveUrl: 'https://futbol-dar.vercel.app/' },
    { id: 5, title: 'Planify',   category: 'Fullstack / SaaS',        image: PlanifyImg,   pos: 'top',    description: 'Simple yet powerful project management tool. Features Kanban boards, drag-and-drop tasks, user profiles, and smart collaboration features.', tech: ['Next.js','Tailwind','Typescript','MySQL','GO','JWT'], repoUrl: 'https://github.com/DarrenAnthonyBeltham/planify' },
    { id: 4, title: 'Muzik',     category: 'Frontend / Entertainment', image: MuzikImg,    pos: 'top',    description: 'Sleek modern web application for music enthusiasts. Clean interface to search for artists, explore discographies, and access direct lyrics.', tech: ['React.js','Typescript','Tailwind','Genius API'], repoUrl: 'https://github.com/DarrenAnthonyBeltham/muzik', liveUrl: 'https://muzik-lyrics.vercel.app/' },
  ];

  const rawX = useTransform(scrollYProgress, [0, 1], ['0%', `-${(projects.length - 1) * 100}vw`]);
  const x = useSpring(rawX, { damping: 40, stiffness: 120, mass: 0.8 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setActiveIndex(Math.min(projects.length - 1, Math.max(0, Math.round(v * (projects.length - 1)))));
    });
    return () => unsub();
  }, [scrollYProgress, projects.length]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[700vh] bg-[#e4e2dd] border-b border-[#1c1c1c]/10">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden pt-20 md:pt-24 pb-4 md:pb-8">
        <div className="px-4 sm:px-6 md:px-12 flex justify-between items-end mb-4 md:mb-6 z-10">
          <SectionTitle className="text-3xl sm:text-4xl md:text-6xl">Selected<br />Works</SectionTitle>
          <div className="font-mono text-xs tracking-widest uppercase opacity-40">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </div>
        </div>

        <div className="relative flex-1 flex items-center min-h-0">
          <motion.div style={{ x }} className="flex w-full absolute left-0 px-[5vw] sm:px-[8vw] md:px-[10vw]">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={project.id} className="w-[90vw] sm:w-[75vw] md:w-[62vw] flex-shrink-0 px-2 md:px-4 flex justify-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.88,
                      opacity: isActive ? 1 : 0.28,
                      filter: isActive ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.8)',
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full aspect-[4/3] overflow-hidden bg-[#dcd9ce] border border-[#1c1c1c]/15"
                  >
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: project.pos }}
                      animate={{ scale: isActive ? 1 : 1.06 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="px-4 sm:px-6 md:px-12 flex items-start md:items-center bg-[#e4e2dd] z-10 border-t border-[#1c1c1c]/10 pt-4 md:pt-0 mt-3 md:mt-6 min-h-[120px] md:h-44">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col sm:flex-row justify-between gap-4 md:gap-8"
            >
              <div className="sm:w-1/2 md:w-1/3">
                <div className="font-mono text-[9px] text-[#1c1c1c]/45 uppercase tracking-widest mb-1">// 01 Description</div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter mb-1">{projects[activeIndex].title}</h3>
                <p className="text-xs text-[#1c1c1c]/65 leading-relaxed font-mono line-clamp-3 md:line-clamp-none">{projects[activeIndex].description}</p>
              </div>
              <div className="hidden sm:block sm:w-1/4 md:w-1/3">
                <div className="font-mono text-[9px] text-[#1c1c1c]/45 uppercase tracking-widest mb-1">// 02 Specifications</div>
                <div className="flex flex-wrap gap-1.5">
                  {projects[activeIndex].tech.map(t => (
                    <span key={t} className="text-[10px] font-mono border border-[#1c1c1c]/18 px-2 py-0.5 uppercase">{t}</span>
                  ))}
                </div>
              </div>
              <div className="sm:w-1/4 md:w-1/3 flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-0">
                <div className="font-mono text-[9px] text-[#1c1c1c]/45 uppercase tracking-widest mb-0 sm:mb-2">// 03 Access</div>
                <div className="flex gap-3">
                  <a href={projects[activeIndex].repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold uppercase hover:underline">
                    <GitHubIcon className="w-3.5 h-3.5" /> Code
                  </a>
                  {projects[activeIndex].liveUrl && (
                    <a href={projects[activeIndex].liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold uppercase hover:underline">
                      <ExternalLinkIcon className="w-3.5 h-3.5" /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = () => (
  <section id="experience" className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-12 border-b border-[#1c1c1c]/10">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 md:gap-24">
        <div className="md:w-1/3">
          <SectionTitle className="text-3xl sm:text-4xl md:text-6xl md:sticky md:top-32">
            Service<br />Record
          </SectionTitle>
        </div>
        <div className="md:w-2/3 border-t border-[#1c1c1c]/10 pt-8 md:pt-12">
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tighter">
                Web Developer Intern
              </h3>
              <div className="font-mono text-xs text-[#1c1c1c]/55 uppercase tracking-widest mt-2">
                HashMicro & Associated Brands
              </div>
            </div>
            <div className="font-mono text-xs border border-[#1c1c1c]/20 px-2 md:px-3 py-1 uppercase shrink-0 ml-4">
              1 Year
            </div>
          </div>

          <div className="font-mono text-xs md:text-sm text-[#1c1c1c]/70 space-y-4">
            <div className="font-mono text-[10px] text-[#1c1c1c]/45 uppercase tracking-widest mb-2">
              // Impact & Contributions
            </div>

            <ul className="space-y-3 leading-relaxed">
              <li>• Optimized Core Web Vitals (LCP, CLS) across multiple high-traffic ERP pages, improving load performance and SEO rankings.</li>
              <li>• Managed and maintained web platforms across <strong>5 international markets</strong> (ID, SG, MY, PH, TH).</li>
              <li>• Built custom WordPress & PHP solutions to streamline workflows for SEO and content teams.</li>
              <li>• Redesigned and rebuilt landing pages with a focus on performance, responsiveness, and scalability.</li>
            </ul>
          </div>

          <div className="mt-8 border border-[#1c1c1c]/10 p-4 md:p-6">
            <div className="font-mono text-[10px] text-[#1c1c1c]/45 uppercase tracking-widest mb-3">
              // Performance Impact (Representative)
            </div>

            <div className="grid grid-cols-2 gap-6 text-xs font-mono">
              <div>
                <div className="mb-2 text-[#1c1c1c]/50">Before</div>
                <ul className="space-y-1">
                  <li>LCP: ~4.0s+</li>
                  <li>CLS: ~0.2+</li>
                  <li>PageSpeed: ~60–70</li>
                </ul>
              </div>

              <div>
                <div className="mb-2 text-[#1c1c1c]/50">After</div>
                <ul className="space-y-1">
                  <li>LCP: ~1.8s</li>
                  <li>CLS: &lt;0.05</li>
                  <li>PageSpeed: 90+</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12">
            <div className="font-mono text-[10px] text-[#1c1c1c]/45 uppercase tracking-widest mb-3">
              // Stack Deployed
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'WordPress',
                'PHP',
                'MySQL',
                'JavaScript',
                'HTML5',
                'CSS3',
                'PageSpeed',
                'SEO Ops'
              ].map(tech => (
                <span
                  key={tech}
                  className="font-mono text-[10px] bg-[#1c1c1c] text-[#e4e2dd] px-2 md:px-3 py-1 uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
);

const ShowcaseSection = () => {
  const categories = [
    { title: 'Moneysites (HashMicro)', images: [HashMicroHomeImg, HashMicroProductImg, HashMicroSolutionImg, HashMicroAiImg] },
    { title: 'WP Platforms', docsLink: 'https://docs.google.com/document/d/1GStjjdS5DLBruSzykAdbTUv-J3NPsT3w2HrOLNM2YUg/edit?usp=sharing', images: [TotalERPHomeImg, TotalERPProductImg, EquipProductImg, EquipIndustryImg] },
  ];
  return (
    <section id="showcase" className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-12 border-b border-[#1c1c1c]/10">
      <div className="max-w-7xl mx-auto">
        <SectionTitle className="text-3xl sm:text-4xl md:text-6xl mb-12 md:mb-24 text-center">Visual Archive</SectionTitle>
        {categories.map((cat, idx) => (
          <div key={idx} className="mb-16 md:mb-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 md:mb-12 border-b border-[#1c1c1c]/15 pb-4">
              <div>
                <div className="font-mono text-[9px] text-[#1c1c1c]/45 uppercase tracking-widest mb-2">// {String(idx + 1).padStart(2, '0')} Category</div>
                <h3 className="text-xl md:text-3xl font-bold uppercase tracking-tighter">{cat.title}</h3>
              </div>
              {cat.docsLink && (
                <a href={cat.docsLink} target="_blank" rel="noopener noreferrer" className="font-mono text-xs font-bold uppercase hover:underline flex items-center gap-2 mt-3 sm:mt-0">
                  Documentation <ExternalLinkIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1c1c1c]/15 border border-[#1c1c1c]/15">
              {cat.images.map((img, imgIdx) => (
                <motion.div
                  key={imgIdx}
                  initial={{ opacity: 0, filter: 'grayscale(100%)' }}
                  whileInView={{ opacity: 1, filter: 'grayscale(0%)' }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1.1, delay: (imgIdx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[4/3] bg-[#e4e2dd] relative group overflow-hidden"
                >
                  <motion.img
                    src={img}
                    alt={`Showcase ${imgIdx + 1}`}
                    className="w-full h-full object-cover object-top"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#1c1c1c]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <a href={img} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[#e4e2dd] border border-[#e4e2dd] px-3 md:px-4 py-1.5 uppercase hover:bg-[#e4e2dd] hover:text-[#1c1c1c] transition-colors duration-300">
                      View Full
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const TechNotesSection = () => {
  const notes = [
    { title: "Achieving a 99 PageSpeed Score on ERP Architecture", tags: ["Performance", "Core Web Vitals"], date: "SEP 24", excerpt: "An deep dive into asset deferral, CLS mitigation, and LCP tuning that brought our monolithic ERP platform to near-instant speeds." },
    { title: "Why I Chose Go over PHP for High-Concurrency Microservices", tags: ["Backend", "Architecture"], date: "OCT 24", excerpt: "Analyzing the bottleneck limitations of standard PHP execution models compared to Go's goroutines for heavy data ingestion." },
    { title: "The 3-Way Match: Automating Procurement via AI & OCR", tags: ["AI", "Vue.js", "Laravel"], date: "NOV 24", excerpt: "Integrating Mindee AI to scan vendor invoices and cross-reference them against internal PO data securely using a Laravel proxy." }
  ];

  const svgLineVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };

  return (
    <section id="notes" className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-12 border-b border-[#1c1c1c]/10 relative">
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <motion.svg className="w-full h-[2px]" preserveAspectRatio="none">
          <motion.line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(28,28,28,0.15)" strokeWidth="2" variants={svgLineVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} />
        </motion.svg>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <SectionTitle className="text-3xl sm:text-4xl md:text-6xl mb-12">Technical Notes</SectionTitle>
        <div className="flex flex-col gap-px bg-[#1c1c1c]/10 border border-[#1c1c1c]/10">
          {notes.map((note, i) => (
            <motion.div 
              key={i} 
              className="bg-[#e4e2dd] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group cursor-pointer interactive"
              initial={{ height: "auto" }}
              whileHover={{ backgroundColor: "rgba(28,28,28,0.02)" }}
            >
              <div className="flex-1">
                <div className="font-mono text-[9px] text-[#1c1c1c]/45 uppercase tracking-widest mb-3">{note.date}</div>
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter group-hover:underline decoration-[#1c1c1c]/30 underline-offset-4">{note.title}</h3>
                <div className="grid transition-all duration-500 ease-[0.16,1,0.3,1] grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <div className="relative pt-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1c1c1c]/5 to-transparent -translate-x-full animate-shimmer" />
                      <p className="text-sm font-mono text-[#1c1c1c]/60 max-w-2xl">
                        {note.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                <div className="flex gap-2">
                  {note.tags.map((tag, j) => (
                    <motion.span 
                      key={tag} 
                      className="font-mono text-[9px] border border-[#1c1c1c]/20 px-2 py-1 uppercase bg-[#e4e2dd]"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (j * 0.1), type: "spring", stiffness: 200 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase font-bold text-[#1c1c1c]/0 group-hover:text-[#1c1c1c] transition-colors">
                  Read Article <ArrowRightIcon className="w-3 h-3 translate-x-[-10px] group-hover:translate-x-0 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProfileSection = () => (
  <section id="profile" className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-12 relative pb-48">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
      
      <div className="md:col-span-5 flex flex-col justify-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02, rotate: 1 }}
          className="w-full aspect-square bg-[#dcd9ce] border border-[#1c1c1c]/20 p-2 shadow-sm relative group overflow-hidden"
        >
          <img 
            src="https://placehold.co/800x800/1c1c1c/e4e2dd?text=Profile" 
            alt="Darren Anthony Beltham" 
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
          />
        </motion.div>
      </div>

      <div className="md:col-span-7 flex flex-col justify-center">
        <SectionTitle className="text-3xl sm:text-4xl md:text-6xl mb-6 md:mb-8">Manifesto</SectionTitle>
        <div className="font-mono text-xs md:text-sm leading-relaxed text-[#1c1c1c]/70 space-y-5">
          <p>I'm a final-semester Computer Science student <strong className="text-[#1c1c1c]">(Current GPA: 3.62)</strong> awaiting graduation, with a genuine passion for building clean, user-centric web applications. I specialize in bridging the gap between design and engineering, transforming complex requirements into intuitive, highly interactive interfaces using React and Tailwind CSS.</p>
          <p>Beyond the frontend, I have hands-on experience architecting reliable backend systems and RESTful APIs using Go and MySQL. I approach every project with a problem-solving mindset, striving to write efficient, maintainable code. For me, development is about more than just making things work—it's about crafting seamless digital experiences that deliver real value.</p>
        </div>
        
        <div className="mt-8 mb-12">
          <MagneticElement strength={0.2}>
            <a href="/resume.pdf" target="_blank" className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest border-b-2 border-[#1c1c1c] pb-1 hover:text-sky-700 hover:border-sky-700 transition-colors interactive group">
              Download Curriculum Vitae <ExternalLinkIcon className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </MagneticElement>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8 content-start">
          {[
            { title: 'Frontend', skills: ['React','Next.js','Vue.js','Tailwind', 'Bootstrap', 'JavaScript','HTML5'] },
            { title: 'Backend',  skills: ['Go','PHP','Laravel','MySQL','Supabase', 'MongoDB'] },
            { title: 'Tools',    skills: ['WordPress','Figma','Git','PageSpeed'] },
          ].map((block, i) => (
            <motion.div
              key={i}
              className="border border-[#1c1c1c]/18 p-4 md:p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-mono text-[9px] text-[#1c1c1c]/45 uppercase tracking-widest mb-3">{"// " + block.title}</h3>
              <ul className="font-mono text-xs font-bold uppercase space-y-1.5">
                {block.skills.map(s => <li key={s}>{s}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    <footer className="mt-20 md:mt-32 border-t border-[#1c1c1c]/15 pt-8 flex flex-col sm:flex-row justify-between items-center font-mono text-[10px] uppercase tracking-widest text-[#1c1c1c]/45 gap-4">
      <div>© {new Date().getFullYear()} Darren Anthony Beltham</div>
      <div className="flex gap-6 md:gap-8">
        <a href="mailto:darrenanthonybeltham@gmail.com" className="hover:text-[#1c1c1c] transition-colors duration-200 interactive">Email</a>
        <a href="https://github.com/DarrenAnthonyBeltham/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1c1c1c] transition-colors duration-200 interactive">GitHub</a>
        <a href="https://www.linkedin.com/in/darrenanthonybeltham" target="_blank" rel="noopener noreferrer" className="hover:text-[#1c1c1c] transition-colors duration-200 interactive">LinkedIn</a>
      </div>
    </footer>
  </section>
);

const FloatingCTA = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
      <MagneticElement strength={0.25}>
        <motion.a
          href="mailto:darrenanthonybeltham@gmail.com"
          className="group relative flex items-center overflow-hidden interactive shadow-2xl rounded-full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.96 }}
        >
          <motion.div
            className="relative flex items-center gap-3 bg-[#1c1c1c] text-[#e4e2dd] px-5 py-3.5 md:px-6 md:py-4"
            animate={{ paddingRight: hovered ? 48 : 24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="w-[7px] h-[7px] rounded-full bg-emerald-400 flex-shrink-0"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap">
              Work With Me
            </span>
            <motion.div
              className="absolute right-5 flex items-center"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-[#e4e2dd]/8"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-emerald-400"
            animate={{ width: hovered ? '100%' : '28px' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.a>
      </MagneticElement>
    </div>
  );
};

const ScrollToTop = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setVisible(v > 800));
    return () => unsub();
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50 w-12 h-12 flex items-center justify-center bg-[#1c1c1c]/10 backdrop-blur-md border border-[#1c1c1c]/20 rounded-full text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-[#e4e2dd] transition-colors interactive"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="w-full relative font-sans bg-[#e4e2dd] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-[#e4e2dd] cursor-none">
      <FaviconAnimator />
      <Preloader />
      <BackgroundGrid />
      <CustomCursor />
      <ScrollProgress />
      <NavBar />
      <main className="relative z-10 w-full flex flex-col">
        <HeroSection />
        <ServicesSection />
        <MarqueeTicker />
        <ProjectsSection />
        <ExperienceSection />
        <ShowcaseSection />
        <TechNotesSection />
        <ProfileSection />
      </main>
      <FloatingCTA />
      <ScrollToTop />
    </div>
  );
}