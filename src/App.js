import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

import Grailify from './assets/Grailify.jpg';
import CarShroom from './assets/CarShroom.jpg';
import Futbol from './assets/futbol.jpg';
import Muzik from './assets/Muzik.jpg';
import Planify from './assets/Planify.jpg';
import CoinLens from './assets/CoinLens.jpg';

const GitHubIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>);
const ExternalLinkIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>);
const MailIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const LinkedInIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const InstagramIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);

const FigmaIcon = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /></svg>);
const ReactIcon = ({ className }) => (<svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="0" cy="0" r="2.05" fill="currentColor" /><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg>);
const GoLangIcon = ({ className }) => (<svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M52.63 12.33a8.63 8.63 0 00-8.63 8.62v3.83H32.6a8.62 8.62 0 00-8.62 8.62V94.86a8.63 8.63 0 008.62 8.63h62.78a8.63 8.63 0 008.62-8.63V33.4a8.62 8.62 0 00-8.62-8.62H61.25V20.95a8.62 8.62 0 00-8.62-8.62z" fill="#00ADD8"/><path d="M48.25 51a3.83 3.83 0 000 7.65h31.5a3.83 3.83 0 000-7.65z" fill="#fff"/><path d="M48.25 66.33a3.82 3.82 0 100 7.64h31.5a3.82 3.82 0 100-7.64z" fill="#fff"/></svg>);
const NextIcon = ({ className }) => (<svg className={className} viewBox="0 0 128 128" fill="none"><path d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128Z" fill="black"/><path d="M101.962 103.81L42.2641 40H32V92H42.2641V52.812L90.7547 103.81C94.6792 106.623 100.245 106.132 101.962 103.81Z" fill="white"/><path d="M96 40H85.7358V92H96V40Z" fill="white"/></svg>);

const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let nodes = [];
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        const createNodes = () => {
            const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
            nodes = [];
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, radius: Math.random() * 1.5 + 1, pulse: Math.random() * Math.PI * 2 });
            }
        };
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const now = Date.now() / 300;
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                const pulseFactor = (Math.sin(node.pulse + now) + 1) / 2;
                const radius = node.radius + pulseFactor * 1.5;
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(150, 180, 255, ${0.4 + pulseFactor * 0.4})`;
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        const init = () => {
            resizeCanvas();
            createNodes();
            animate();
        };
        init();
        window.addEventListener('resize', init);
        return () => {
            window.removeEventListener('resize', init);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

const GlassPanel = ({ children, className = '' }) => (<div className={`bg-black/20 backdrop-blur-lg border border-neutral-800/80 rounded-2xl shadow-2xl shadow-black/40 ${className}`}>{children}</div>);

const AnimatedMenuButton = ({ isOpen, onClick }) => {
    const topVariants = {
        closed: { rotate: 0, translateY: 0 },
        open: { rotate: 45, translateY: 8 }
    };
    const middleVariants = {
        closed: { opacity: 1 },
        open: { opacity: 0 }
    };
    const bottomVariants = {
        closed: { rotate: 0, translateY: 0 },
        open: { rotate: -45, translateY: -8 }
    };

    return (
        <button onClick={onClick} className="w-6 h-6 relative z-50">
            <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.line x1="4" y1="6" x2="20" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" variants={topVariants} animate={isOpen ? "open" : "closed"} />
                <motion.line x1="4" y1="12" x2="20" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" variants={middleVariants} animate={isOpen ? "open" : "closed"} />
                <motion.line x1="4" y1="18" x2="20" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" variants={bottomVariants} animate={isOpen ? "open" : "closed"} />
            </motion.svg>
        </button>
    );
};

const Header = ({ setView }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = ['Home', 'Projects', 'Profile', 'Contact'];
    const handleNavClick = (view) => {
        setView(view);
        setIsMenuOpen(false);
    };

    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'tween',
                duration: 0.3,
                ease: 'easeOut',
                staggerChildren: 0.05
            }
        }
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { type: 'tween', ease: 'easeOut' } }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-4">
            <GlassPanel className="w-full max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
                <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-white tracking-widest cursor-pointer" onClick={() => handleNavClick('hero')}>DAB</motion.div>
                <nav className="hidden md:flex items-center gap-2">
                    {navItems.map(item => (
                        <motion.button key={item} onClick={() => handleNavClick(item.toLowerCase())} className="text-neutral-300 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg" whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300 }}>{item}</motion.button>
                    ))}
                </nav>
                <div className="md:hidden">
                    <AnimatedMenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </div>
            </GlassPanel>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial="hidden" animate="visible" exit="hidden" variants={menuVariants} className="md:hidden absolute top-20 left-4 right-4">
                        <div className="bg-neutral-950/90 backdrop-blur-sm border border-neutral-800/80 rounded-2xl p-4">
                            <nav className="flex flex-col items-center gap-2">
                                {navItems.map(item => (
                                    <motion.button key={item} onClick={() => handleNavClick(item.toLowerCase())} className="w-full py-3 text-lg font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white rounded-lg" variants={linkVariants}>{item}</motion.button>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

const HeroTechStack = () => {
    const skills = [
        { name: "React", icon: ReactIcon },
        { name: "Go", icon: GoLangIcon },
        { name: "Next.js", icon: NextIcon },
        { name: "Figma", icon: FigmaIcon },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring' } }
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md mx-auto mt-12 flex justify-center items-center gap-4 md:gap-8">
            {skills.map((skill) => (
                <motion.div key={skill.name} variants={itemVariants} className="flex flex-col items-center gap-2 text-neutral-300 cursor-pointer">
                    <motion.div whileHover={{ scale: 1.15, y: -5 }} transition={{ type: 'spring', stiffness: 300 }} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/5 border border-neutral-800 rounded-full">
                        <skill.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.div>
                    <p className="text-xs md:text-sm font-light">{skill.name}</p>
                </motion.div>
            ))}
        </motion.div>
    );
};

const HeroView = ({ setView }) => {
    const headlineVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delay: 0.2 } }
    };

    const lineVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center text-center p-4 pt-24">
            <motion.h1 variants={headlineVariants} initial="hidden" animate="visible" className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tighter leading-tight">
                <motion.span variants={lineVariants} className="block">Architecting Ideas</motion.span>
                <motion.span variants={lineVariants} className="block">Into Interactive Realities</motion.span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.6 }} className="mt-6 max-w-xl text-neutral-300">
                A full-stack developer blending elegant frontend design with powerful, scalable backend systems. Explore my work and see how I turn complex problems into beautiful, intuitive digital solutions.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.7 }} className="mt-8 flex gap-4">
                <motion.button onClick={() => setView('projects')} className="bg-white text-black font-semibold px-6 py-3 rounded-lg" whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.4)" }} transition={{ type: 'spring', stiffness: 300 }}>
                    Discover Projects
                </motion.button>
            </motion.div>
            <HeroTechStack />
        </div>
    );
};

const ProjectsView = ({ setSelectedProject }) => {
    const projects = [
        { id: 1, title: "Grailify", category: "Fullstack Web Development", image: Grailify, description: "Grailify is the premier online marketplace for authentic sneakers, apparel, and collectibles. Built with a powerful Go backend and a responsive Next.js frontend.", tech: ["Next.js", "Tailwind CSS", "Typescript", "MySQL", "GO", "JWT"], repoUrl: "https://github.com/DarrenAnthonyBeltham/Grailify" },
        { id: 2, title: "CarShroom", category: "Fullstack Web Development", image: CarShroom, description: "This project is a sophisticated web application for a high-end luxury and performance car dealership. It features a rich, interactive frontend for customers and a robust backend API to manage products and user interactions.", tech: ["PHP", "HTML5", "CSS3", "GO"], repoUrl: "https://github.com/DarrenAnthonyBeltham/CarShroom" },
        { id: 3, title: "Futbol", category: "Frontend Web Development", image: Futbol, description: "Futbol is a modern, web-based application designed for football fans, coaches, and analysts. It provides an intuitive and visually appealing platform to build team formations, explore detailed player stats, and bring tactical ideas to life.", tech: ["React.js", "Tailwind CSS"], repoUrl: "https://github.com/DarrenAnthonyBeltham/futbol", liveUrl: "https://futbol-dar.vercel.app/" },
        { id: 4, title: "Muzik", category: "Frontend Web Development", image: Muzik, description: "Muzik is a sleek and modern web application designed for music enthusiasts who want to dive deeper than the melody. It provides a clean, intuitive interface to search for any artist and explore their discography.", tech: ["React.js", "Typescript", "Tailwind CSS", "Genius API"], repoUrl: "https://github.com/DarrenAnthonyBeltham/muzik", liveUrl: "https://muzik-lyrics.vercel.app/" },
        { id: 5, title: "Planify", category: "Fullstack Web Development", image: Planify, description: "Planify is a simple yet powerful project management tool that helps teams and individuals stay organized. With Kanban boards, drag-and-drop tasks, user profiles, and smart collaboration features, Planify makes it easy to manage projects.", tech: ["Next.js", "Tailwind CSS", "Typescript", "MySQL", "GO", "JWT"], repoUrl: "https://github.com/DarrenAnthonyBeltham/planify" },
        { id: 6, title: "CoinLens", category: "Frontend Web Development", image: CoinLens, description: "CoinLens is a futuristic, all-in-one crypto dashboard where you can track live market data, analyze trends with interactive charts, and explore the world of digital assets through a personal watchlist, news feed, and powerful financial tools.", tech: ["Next.js", "Tailwind CSS", "Typescript"], repoUrl: "https://github.com/DarrenAnthonyBeltham/coinlens", liveUrl: "https://coinlens-phi.vercel.app/"},
    ];
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-screen flex flex-col justify-center items-center p-8">
            <div className="w-full max-w-6xl mx-auto pt-24">
                <h2 className="text-4xl font-bold text-center text-white mb-12">Projects Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map(p => (
                        <motion.div key={p.id} onClick={() => setSelectedProject(p)} className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden cursor-pointer group" whileHover={{ scale: 1.03, y:-5, transition: { duration: 0.2 } }}>
                            <div className="h-40 w-full overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></div>
                            <div className="p-4"><h3 className="text-lg font-bold text-white">{p.title}</h3><p className="text-sm text-neutral-400">{p.category}</p></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const SkillGauge = ({ skill, percentage, inView }) => {
    const controls = useAnimation();
    const strokeDasharray = 2 * Math.PI * 40;
    const strokeDashoffset = strokeDasharray * (1 - percentage / 100);
    useEffect(() => {
        if (inView) {
            controls.start({ strokeDashoffset: strokeDashoffset, transition: { duration: 1.5, ease: "circOut", delay: 0.2 } });
        }
    }, [inView, controls, strokeDashoffset]);
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="40" stroke="#2a2a2a" strokeWidth="8" fill="transparent" />
                     <motion.circle cx="50" cy="50" r="40" stroke="url(#gradient)" strokeWidth="8" fill="transparent" strokeLinecap="round" strokeDasharray={strokeDasharray} initial={{ strokeDashoffset: strokeDasharray }} animate={controls}/>
                     <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#cccccc" /><stop offset="100%" stopColor="#777777" /></linearGradient></defs>
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">{percentage}%</div>
            </div>
            <p className="mt-2 text-sm font-medium text-white">{skill}</p>
        </div>
    );
};

const ProfileView = () => {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setInView(true), 100);
        return () => clearTimeout(timer);
    }, []);
    const skills = [
        { name: "React & Tailwind", percentage: 95 }, { name: "HTML5", percentage: 95 },
        { name: "Javascript", percentage: 80 }, { name: "Figma", percentage: 85 },
        { name: "MySQL", percentage: 80 }, { name: "Go", percentage: 80 }, { name: "PHP", percentage: 85 }
    ];
    
    const textVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
    };

    return (
        <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="w-full min-h-screen flex justify-center items-center p-4 md:p-8">
            <GlassPanel className="p-8 max-w-5xl w-full mt-20">
                <motion.div variants={textVariants}>
                    <motion.h2 variants={textVariants} className="text-4xl font-bold text-white mb-2">PILOT PROFILE</motion.h2>
                    <motion.p variants={textVariants} className="text-lg text-neutral-300">System Check: Optimal</motion.p>
                </motion.div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-neutral-300 space-y-4 text-justify">
                        <p>I’m a sixth-semester Computer Science student who gets a real kick out of turning ideas into interactive experiences. Whether I’m prototyping a slick UI with React and Tailwind or crafting semantic, accessible layouts in HTML5, I love seeing code bloom into something you can click, scroll, and enjoy.</p>
                        <p>On the backend, I roll up my sleeves with Go to build fast, clean APIs and lean on MySQL to keep data organized and reliable. Every project is a chance to learn something new, and I’m happiest when I can blend creativity and logic into a product that people genuinely enjoy using.</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {skills.map(skill => <SkillGauge key={skill.name} skill={skill.name} percentage={skill.percentage} inView={inView} />)}
                    </div>
                </div>
            </GlassPanel>
        </motion.div>
    );
};

const ProjectView = ({ project, close }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={close}></div>
        <GlassPanel className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 border-b lg:border-b-0 lg:border-r border-neutral-800">
                    <p className="font-mono text-neutral-400 text-sm">SYSTEM ANALYSIS</p>
                    <h2 className="text-4xl font-bold text-white mt-1">{project.title}</h2>
                    <p className="text-lg text-neutral-300">{project.category}</p>
                    <div className="mt-6 aspect-video w-full overflow-hidden rounded-lg border border-neutral-800"><img src={project.image} alt={project.title} className="w-full h-full object-cover"/></div>
                </div>
                <div className="p-8">
                    <h3 className="font-mono text-neutral-400 text-sm">DESCRIPTION</h3><p className="text-neutral-300 mt-2">{project.description}</p>
                    <h3 className="font-mono text-neutral-400 text-sm mt-6">TECH STACK</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.tech.map(t => (<div key={t} className="bg-neutral-800 border border-neutral-700 text-neutral-200 px-3 py-1 rounded-full text-xs font-medium">{t}</div>))}
                    </div>
                    <h3 className="font-mono text-neutral-400 text-sm mt-6">ACCESS POINTS</h3>
                    <div className="flex items-center gap-4 mt-2">
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800/80 border border-neutral-700 rounded-lg text-white hover:bg-neutral-700/80 transition-colors"><GitHubIcon className="w-5 h-5" /><span>Source Code</span></a>
                        {project.liveUrl && (<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white hover:bg-neutral-600/50 transition-colors"><ExternalLinkIcon className="w-5 h-5" /><span>Live Site</span></a>)}
                    </div>
                </div>
            </motion.div>
        </GlassPanel>
        <motion.button onClick={close} className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}>
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
            </svg>
        </motion.button>
    </motion.div>
);

export default function App() {
    const [view, setView] = useState('hero');
    const [selectedProject, setSelectedProject] = useState(null);

    const renderView = () => {
        const socialLinks = [
            { href: "https://github.com/DarrenAnthonyBeltham/", Icon: GitHubIcon },
            { href: "https://www.linkedin.com/in/darrenanthonybeltham", Icon: LinkedInIcon },
            { href: "https://www.instagram.com/darrenab_/", Icon: InstagramIcon },
            { href: "mailto:darrenanthonybeltham@gmail.com", Icon: MailIcon },
        ];
        const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
        const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

        switch (view) {
            case 'hero': return <HeroView setView={setView} />;
            case 'projects': return <ProjectsView setSelectedProject={setSelectedProject} />;
            case 'profile': return <ProfileView />;
            case 'contact': return (
                <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="w-full min-h-screen flex items-center justify-center p-4">
                    <GlassPanel className="p-8 text-center max-w-lg mx-auto">
                        <h2 className="text-4xl font-bold text-white mb-2">Get In Touch</h2>
                        <p className="text-neutral-300 mb-8">Let's connect. Find me on these platforms.</p>
                        <motion.div className="flex justify-center gap-6" variants={containerVariants}>
                            {socialLinks.map(({ href, Icon }) => (
                                <motion.a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-sky-300" variants={itemVariants} whileHover={{ y: -5, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                                    <Icon className="w-8 h-8" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </GlassPanel>
                </motion.div>
            );
            default: return <HeroView setView={setView} />;
        }
    };

    return (
        <div className="w-full min-h-screen relative font-sans text-neutral-200 bg-black" style={{ background: 'radial-gradient(ellipse at center, #0a0e23 0%, #000000 70%)' }}>
            <AnimatedBackground />
            <Header setView={setView} />
            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div key={view} initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.5 }}>
                        {renderView()}
                    </motion.div>
                </AnimatePresence>
                <AnimatePresence>
                    {selectedProject && <ProjectView project={selectedProject} close={() => setSelectedProject(null)} />}
                </AnimatePresence>
            </main>
        </div>
    );
}