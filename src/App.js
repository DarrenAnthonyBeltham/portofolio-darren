import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

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
      {/* Fine grid — very faint, slow drift */}
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

      {/* Blob A — top-left warm tone */}
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

      {/* Blob B — bottom-right */}
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

      {/* Vignette */}
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

/* ─── CONSTELLATION NET ───────────────────────────────────────────────────────
   Canvas-based so lines always connect to actual node positions.
   Nodes float on independent sine cycles. On hover a node pulses.
──────────────────────────────────────────────────────────────────────────── */
const NODE_DEFS = [
  { label: 'React',       cx: 0.22, cy: 0.20, dur: 9,  ax: 0.03, ay: 0.025 },
  { label: 'Design',      cx: 0.72, cy: 0.16, dur: 11, ax:-0.025,ay: 0.03  },
  { label: 'Go',          cx: 0.28, cy: 0.78, dur: 8,  ax: 0.028,ay:-0.025 },
  { label: 'Performance', cx: 0.76, cy: 0.74, dur: 13, ax:-0.03, ay:-0.02  },
  { label: 'Laravel',     cx: 0.10, cy: 0.50, dur: 10, ax: 0.025,ay: 0.03  },
  { label: 'Typography',  cx: 0.90, cy: 0.46, dur: 12, ax:-0.028,ay: 0.025 },
];

const ConstellationNet = () => {
  const canvasRef = useRef(null);
  const nodesRef  = useRef([]);
  const rafRef    = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  /* init node state */
  useEffect(() => {
    nodesRef.current = NODE_DEFS.map((n, i) => ({
      ...n,
      phase: (i / NODE_DEFS.length) * Math.PI * 2,
    }));
  }, []);

  /* resize */
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* draw loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = size.w;
    canvas.height = size.h;

    const centerX = size.w / 2;
    const centerY = size.h / 2;

    const draw = (t) => {
      ctx.clearRect(0, 0, size.w, size.h);

      /* compute current node positions */
      const positions = nodesRef.current.map((n) => ({
        x: n.cx * size.w + Math.sin(t * 0.001 / n.dur * 6.28 + n.phase) * n.ax * size.w,
        y: n.cy * size.h + Math.cos(t * 0.001 / n.dur * 6.28 + n.phase) * n.ay * size.h,
      }));

      /* lines: each node → center */
      positions.forEach((p, i) => {
        const isHov = hoveredIdx === i;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = isHov ? 'rgba(28,28,28,0.35)' : 'rgba(28,28,28,0.13)';
        ctx.lineWidth   = isHov ? 1.4 : 0.7;
        ctx.stroke();
      });

      /* lines: nearby node pairs */
      positions.forEach((a, i) => {
        positions.slice(i + 1).forEach((b, j) => {
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

      /* center dot */
      ctx.beginPath();
      ctx.arc(centerX, centerY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(28,28,28,0.2)';
      ctx.fill();

      /* node dots */
      positions.forEach((p, i) => {
        const isHov = hoveredIdx === i;
        const r = isHov ? 5 : 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHov ? 'rgba(28,28,28,0.65)' : 'rgba(28,28,28,0.28)';
        ctx.fill();
        if (isHov) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 5, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(28,28,28,0.15)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, hoveredIdx]);

  /* hover detection */
  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const t  = performance.now();

    let found = null;
    nodesRef.current.forEach((n, i) => {
      const px = n.cx * size.w + Math.sin(t * 0.001 / n.dur * 6.28 + n.phase) * n.ax * size.w;
      const py = n.cy * size.h + Math.cos(t * 0.001 / n.dur * 6.28 + n.phase) * n.ay * size.h;
      if (Math.hypot(mx - px, my - py) < 18) found = i;
    });
    setHoveredIdx(found);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIdx(null)}
      />
      {/* floating labels — positioned from NODE_DEFS base positions, drift is visual-only via canvas */}
      {NODE_DEFS.map((n, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-[9px] uppercase tracking-widest select-none pointer-events-none"
          style={{ left: `${n.cx * 100}%`, top: `${n.cy * 100}%` }}
          animate={{
            x: [0, n.ax * size.w, -n.ax * size.w * 0.5, n.ax * size.w * 0.3, 0],
            y: [0, n.ay * size.h * 0.5, n.ay * size.h, -n.ay * size.h * 0.3, 0],
          }}
          transition={{ duration: n.dur, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
        >
          <span
            className="block -translate-x-1/2 mt-2"
            style={{ color: hoveredIdx === i ? 'rgba(28,28,28,0.85)' : 'rgba(28,28,28,0.42)' }}
          >
            {n.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const MarqueeTicker = () => {
  const items = ['Full-Stack Development', 'React & Next.js', 'Go Backend', 'UI/UX Engineering', 'Performance Optimization', 'Laravel & PHP', 'TypeScript', 'System Design', 'Available for Work'];
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
    <nav className="fixed top-0 w-full z-50 p-4 md:p-6 mix-blend-difference text-[#e4e2dd]">
      <div className="flex justify-between items-start font-mono text-xs uppercase tracking-widest">
        <div className="flex flex-col gap-1 cursor-pointer" onClick={() => scrollTo('hero')}>
          <span className="font-bold text-sm tracking-tighter">DARREN.STUDIO</span>
          <span className="hidden sm:block opacity-70">Jakarta, ID</span>
        </div>
        <div className="hidden md:flex gap-6 lg:gap-8">
          {['projects', 'experience', 'showcase', 'profile'].map((item, i) => (
            <button key={item} onClick={() => scrollTo(item)} className="hover:line-through transition-all duration-200 opacity-80 hover:opacity-100">
              {`00${i + 1}/${item}`}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/DarrenAnthonyBeltham/" target="_blank" rel="noopener noreferrer" className="hover:line-through transition-all duration-200">GH</a>
          <a href="https://www.linkedin.com/in/darrenanthonybeltham" target="_blank" rel="noopener noreferrer" className="hover:line-through transition-all duration-200">LI</a>
        </div>
      </div>
    </nav>
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
          BELTHAM
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

      {/* scroll indicator */}
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

      {/* availability badge */}
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
        Available for work
      </motion.div>
    </section>
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
          <SectionTitle className="text-3xl sm:text-4xl md:text-6xl md:sticky md:top-32">Service<br />Record</SectionTitle>
        </div>
        <div className="md:w-2/3 border-t border-[#1c1c1c]/10 pt-8 md:pt-12">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tighter">Web Developer Intern</h3>
              <div className="font-mono text-xs text-[#1c1c1c]/55 uppercase tracking-widest mt-2">HashMicro & Associated Brands</div>
            </div>
            <div className="font-mono text-xs border border-[#1c1c1c]/20 px-2 md:px-3 py-1 uppercase shrink-0 ml-4">1 Year</div>
          </div>
          <div className="font-mono text-xs md:text-sm leading-relaxed text-[#1c1c1c]/70 space-y-5">
            <p>During my one-year internship, I dove headfirst into real-world web development, focusing heavily on performance and user experience. I built, debugged, and redesigned web pages from the ground up, ensuring they were fully responsive and lightning-fast. A huge part of my day-to-day was tackling PageSpeed optimization—specifically fine-tuning Core Web Vitals like LCP to keep the sites ranking high and running smoothly.</p>
            <p>I also worked closely cross-departmentally, building custom WordPress and PHP snippets to make life easier for our Content Writers and SEO teams. Ultimately, I was trusted to manage and optimize HashMicro's main 'moneysites' and regional blogs across five different markets (Indonesia, Singapore, Malaysia, the Philippines, and Australia), as well as handling the web presence for their child brands like Total ERP and EQUIP.</p>
          </div>
          <div className="mt-8 md:mt-12">
            <div className="font-mono text-[10px] text-[#1c1c1c]/45 uppercase tracking-widest mb-3">// Stack Deployed</div>
            <div className="flex flex-wrap gap-2">
              {['WordPress','PHP','MySQL','JavaScript','HTML5','CSS3','PageSpeed','SEO Ops'].map(tech => (
                <span key={tech} className="font-mono text-[10px] bg-[#1c1c1c] text-[#e4e2dd] px-2 md:px-3 py-1 uppercase">{tech}</span>
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

const ProfileSection = () => (
  <section id="profile" className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-24">
      <div>
        <SectionTitle className="text-3xl sm:text-4xl md:text-6xl mb-6 md:mb-8">Manifesto</SectionTitle>
        <div className="font-mono text-xs md:text-sm leading-relaxed text-[#1c1c1c]/70 space-y-5">
          <p>I'm a final-semester Computer Science student <strong className="text-[#1c1c1c]">(Current GPA: 3.62)</strong> awaiting graduation, with a genuine passion for building clean, user-centric web applications. I specialize in bridging the gap between design and engineering, transforming complex requirements into intuitive, highly interactive interfaces using React and Tailwind CSS.</p>
          <p>Beyond the frontend, I have hands-on experience architecting reliable backend systems and RESTful APIs using Go and MySQL. I approach every project with a problem-solving mindset, striving to write efficient, maintainable code. For me, development is about more than just making things work—it's about crafting seamless digital experiences that deliver real value.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
        {[
          { title: 'Frontend', skills: ['React','Next.js','Vue.js','Tailwind','JavaScript','HTML5'] },
          { title: 'Backend',  skills: ['Go','PHP','Laravel','MySQL','Supabase'] },
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
            <h3 className="font-mono text-[9px] text-[#1c1c1c]/45 uppercase tracking-widest mb-3">// {block.title}</h3>
            <ul className="font-mono text-xs font-bold uppercase space-y-1.5">
              {block.skills.map(s => <li key={s}>{s}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>

    <footer className="mt-20 md:mt-32 border-t border-[#1c1c1c]/15 pt-8 flex flex-col sm:flex-row justify-between items-center font-mono text-[10px] uppercase tracking-widest text-[#1c1c1c]/45 gap-4">
      <div>© {new Date().getFullYear()} Darren Anthony Beltham</div>
      <div className="flex gap-6 md:gap-8">
        <a href="mailto:darrenanthonybeltham@gmail.com" className="hover:text-[#1c1c1c] transition-colors duration-200">Email</a>
        <a href="https://github.com/DarrenAnthonyBeltham/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1c1c1c] transition-colors duration-200">GitHub</a>
        <a href="https://www.linkedin.com/in/darrenanthonybeltham" target="_blank" rel="noopener noreferrer" className="hover:text-[#1c1c1c] transition-colors duration-200">LinkedIn</a>
      </div>
    </footer>
  </section>
);

export default function App() {
  return (
    <div className="w-full relative font-sans bg-[#e4e2dd] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-[#e4e2dd] cursor-none">
      <BackgroundGrid />
      <CustomCursor />
      <ScrollProgress />
      <NavBar />
      <main className="relative z-10 w-full flex flex-col">
        <HeroSection />
        <MarqueeTicker />
        <ProjectsSection />
        <ExperienceSection />
        <ShowcaseSection />
        <ProfileSection />
      </main>
    </div>
  );
}