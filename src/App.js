import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Grailify from './assets/Grailify.jpg';
import CarShroom from './assets/CarShroom.jpg';
import Futbol from './assets/futbol.jpg';
import Muzik from './assets/Muzik.jpg';

const PowerIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>);
const UserIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const MailIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const ArrowLeftIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>);
const CloseIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>);
const GitHubIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>);
const LinkedInIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const InstagramIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const ExternalLinkIcon = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>);

const BlackholeBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];
        const numStars = 2000;
        let animationFrameId;

        const setup = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: (Math.random() - 0.5) * width * 2,
                    y: (Math.random() - 0.5) * height * 2,
                    z: Math.random() * width,
                    pz: Math.random() * width,
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = '#000005';
            ctx.fillRect(0, 0, width, height);
            ctx.save();
            ctx.translate(width / 2, height / 2);
            
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI * 2);
            ctx.fill();

            for (let i = 0; i < numStars; i++) {
                let star = stars[i];
                star.z -= 1.5;

                if (star.z <= 0) {
                    star.x = (Math.random() - 0.5) * width * 2;
                    star.y = (Math.random() - 0.5) * height * 2;
                    star.z = width;
                    star.pz = width;
                }

                let k = 128.0 / star.z;
                let px = star.x * k;
                let py = star.y * k;
                
                let pz = 128.0 / star.pz;
                let prev_px = star.x * pz;
                let prev_py = star.y * pz;

                let angle = Math.atan2(py, px);
                let dist = Math.sqrt(px*px + py*py);
                let pull = 1 / (dist * 0.01);
                px -= Math.cos(angle) * pull;
                py -= Math.sin(angle) * pull;

                let size = (1 - star.z / width) * 3;
                let shade = parseInt((1 - star.z / width) * 255);
                
                ctx.strokeStyle = `rgba(${shade},${shade},${shade}, 0.8)`;
                ctx.lineWidth = size;
                ctx.beginPath();
                ctx.moveTo(prev_px, prev_py);
                ctx.lineTo(px, py);
                ctx.stroke();

                star.pz = star.z;
            }
            ctx.restore();
            animationFrameId = requestAnimationFrame(draw);
        };
        
        setup();
        draw();

        window.addEventListener('resize', setup);
        return () => {
            window.removeEventListener('resize', setup);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0"></canvas>;
};

const GlassPanel = ({ children, className = '' }) => (
    <div className={`bg-[#0A0F1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 ${className}`}>
        <div className="relative">
            {children}
        </div>
    </div>
);

const SkillGauge = ({ skill, percentage, inView }) => {
    const controls = useAnimation();
    const strokeDasharray = 2 * Math.PI * 40;
    const strokeDashoffset = strokeDasharray * (1 - percentage / 100);

    useEffect(() => {
        if (inView) {
            controls.start({
                strokeDashoffset: strokeDashoffset,
                transition: { duration: 1.5, ease: "circOut", delay: 0.2 }
            });
        }
    }, [inView, controls, strokeDashoffset]);

    return (
        <div className="flex flex-col items-center">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                <motion.circle
                    cx="50" cy="50" r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={strokeDasharray}
                    initial={{ strokeDashoffset: strokeDasharray }}
                    animate={controls}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                </defs>
            </svg>
            <p className="mt-2 text-sm font-medium text-white">{skill}</p>
        </div>
    );
};

const ProjectDisplay = ({ project, onClick }) => (
    <motion.div
        onClick={onClick}
        className="relative border border-sky-900/50 bg-sky-900/10 p-4 rounded-lg cursor-pointer group hover:bg-sky-900/20 transition-all duration-300"
        whileHover={{ scale: 1.03 }}
    >
        <div className="flex items-center space-x-4">
            <div className="w-16 h-16 border-2 border-sky-500/50 rounded-md flex items-center justify-center bg-black/20">
                <p className="font-mono text-sky-400 text-2xl font-bold">{project.shortName}</p>
            </div>
            <div>
                <h3 className="font-semibold text-white leading-tight">{project.title}</h3>
                <p className="text-xs text-sky-300/80 leading-tight">{project.category}</p>
            </div>
        </div>
        <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-sky-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-sky-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-sky-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-sky-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
);

const CockpitView = ({ setView, setSelectedProject }) => {
    const projects = [
        { id: 1, title: "Grailify", category: "Fullstack Web Development", shortName: "GLY", image: Grailify, description: "Grailify is the premier online marketplace for authentic sneakers, apparel, and collectibles. Built with a powerful Go backend and a responsive Next.js frontend.", tech: ["Mext.js", "Tailwind CSS", "Typescript", "MySQL", "GO", "JWT"], repoUrl: "https://github.com/DarrenAnthonyBeltham/Grailify" },
        { id: 2, title: "CarShroom", category: "Fullstack Web Development", shortName: "CSM", image: CarShroom, description: "This project is a sophisticated web application for a high-end luxury and performance car dealership. It features a rich, interactive frontend for customers and a robust backend API to manage products and user interactions.", tech: ["PHP", "HTML5", "CSS3", "GO"], repoUrl: "https://github.com/DarrenAnthonyBeltham/CarShroom" },
        { id: 3, title: "Futbol", category: "Frontend Web Development", shortName: "FBL", image: Futbol, description: "Futbol is a modern, web-based application designed for football fans, coaches, and analysts. It provides an intuitive and visually appealing platform to build team formations, explore detailed player stats, and bring tactical ideas to life.", tech: ["React.js", "Tailwind CSS"], repoUrl: "https://github.com/DarrenAnthonyBeltham/futbol", liveUrl: "https://futbol-dar.vercel.app/" },
        { id: 4, title: "Muzik", category: "Frontend Web Development", shortName: "MZK", image: Muzik, description: "Muzik is a sleek and modern web application designed for music enthusiasts who want to dive deeper than the melody. It provides a clean, intuitive interface to search for any artist and explore their discography. Users can select a song to view more details, including a direct link to the full lyrics on Genius.", tech: ["React.js", "Typescript", "Tailwind CSS", "Genius API"], repoUrl: "https://github.com/DarrenAnthonyBeltham/muzik", liveUrl: "https://muzik-lyrics.vercel.app/" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
        >
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                    <GlassPanel className="p-8 h-full flex flex-col justify-between">
                        <div>
                            <h1 className="text-5xl md:text-5xl font-bold tracking-tighter text-white leading-none">
                                DARREN ANTHONY BELTHAM
                                <span className="block text-2xl text-sky-300 font-normal">Full-Stack Developer</span>
                            </h1>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-white mb-4">SYSTEMS / PROJECTS</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {projects.map(p => (
                                    <ProjectDisplay key={p.id} project={p} onClick={() => setSelectedProject(p)} />
                                ))}
                            </div>
                        </div>
                    </GlassPanel>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                    <GlassPanel className="p-6 text-center">
                        <p className="text-sm text-sky-400/70 mb-2">SYSTEM STATUS</p>
                        <motion.button 
                            onClick={() => setView('profile')}
                            className="w-28 h-28 rounded-full border-4 border-sky-400/20 bg-black/20 flex items-center justify-center text-sky-300 mx-auto group"
                            whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(56, 189, 248, 0.5)", transition: { duration: 0.3 } }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <PowerIcon className="w-12 h-12 group-hover:text-white transition-colors" />
                        </motion.button>
                        <p className="mt-2 text-lg font-medium text-white">PILOT PROFILE</p>
                    </GlassPanel>
                    <GlassPanel className="p-4 flex justify-around items-center">
                        <a href="https://github.com/DarrenAnthonyBeltham/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-300 transition-colors p-2">
                            <GitHubIcon className="w-8 h-8" />
                        </a>
                        <a href="https://www.linkedin.com/in/darrenanthonybeltham" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-300 transition-colors p-2">
                            <LinkedInIcon className="w-8 h-8" />
                        </a>
                        <a href="https://www.instagram.com/darrenab_/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-300 transition-colors p-2">
                            <InstagramIcon className="w-8 h-8" />
                        </a>
                        <a href="mailto:darrenanthonybeltham@gmail.com" className="text-gray-400 hover:text-sky-300 transition-colors p-2">
                            <MailIcon className="w-8 h-8" />
                        </a>
                    </GlassPanel>
                </div>
            </div>
        </motion.div>
    );
};

const ProfileView = ({ setView }) => {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setInView(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const skills = [
        { name: "React & Tailwind", percentage: 95 },
        { name: "HTML5", percentage: 95 },
        { name: "Javascript", percentage: 80 },
        { name: "Figma", percentage: 85 },
        { name: "MySQL", percentage: 80 },
        { name: "Go", percentage: 80 },
        { name: "PHP", percentage: 85 }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-5xl mx-auto p-4 md:p-8"
        >
            <GlassPanel className="p-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">PILOT PROFILE</h2>
                        <p className="text-lg text-sky-300">System Check: Optimal</p>
                    </div>
                    <button onClick={() => setView('cockpit')} className="flex items-center text-sky-300 hover:text-white transition-colors">
                        <ArrowLeftIcon className="w-5 h-5 mr-2"/> Cockpit
                    </button>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-gray-300 space-y-4 text-justify">
                        <p>I’m a sixth-semester Computer Science student who gets a real kick out of turning ideas into interactive experiences. Whether I’m prototyping a slick UI with React and Tailwind or crafting semantic, accessible layouts in HTML5, I love seeing code bloom into something you can click, scroll, and enjoy. JavaScript is my trusty sidekick for adding life to pages, and I’m always exploring new patterns to make interactions feel smooth and intuitive. I even dive into UI/UX principles so that every button, card, and form feels like it belongs exactly where it is.</p>
                        <p>On the backend, I roll up my sleeves with Go to build fast, clean APIs and lean on MySQL to keep data organized and reliable. I’ve deployed projects to cloud platforms, learning how to manage environments and dependencies, and I fine-tune queries until performance sings. More than just chasing benchmarks, I care about writing code that my future self and anyone else can read, test, and extend. Every project is a chance to learn something new, and I’m happiest when I can blend creativity and logic into a product that people genuinely enjoy using.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {skills.map(skill => <SkillGauge key={skill.name} skill={skill.name} percentage={skill.percentage} inView={inView} />)}
                    </div>
                </div>
            </GlassPanel>
        </motion.div>
    );
};

const ProjectView = ({ project, close }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4"
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={close}></div>
            <GlassPanel className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                        <motion.div variants={itemVariants}>
                            <p className="font-mono text-sky-400 text-sm">SYSTEM ANALYSIS</p>
                            <h2 className="text-4xl font-bold text-white mt-1">{project.title}</h2>
                            <p className="text-lg text-sky-300">{project.category}</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="mt-6 aspect-video w-full overflow-hidden rounded-lg border border-white/10">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover"/>
                        </motion.div>
                    </div>
                    <div className="p-8">
                        <motion.div variants={itemVariants}>
                            <h3 className="font-mono text-sky-400 text-sm">DESCRIPTION</h3>
                            <p className="text-gray-300 mt-2">{project.description}</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="mt-6">
                            <h3 className="font-mono text-sky-400 text-sm">TECHNICAL SPECIFICATIONS</h3>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {project.tech.map(t => (
                                    <div key={t} className="bg-sky-900/50 border border-sky-800 text-sky-300 px-3 py-1 rounded-full text-sm font-medium">
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                         <motion.div variants={itemVariants} className="mt-6">
                            <h3 className="font-mono text-sky-400 text-sm">STATUS</h3>
                            <p className="text-green-400 font-medium mt-1">ONLINE / OPERATIONAL</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="mt-6">
                            <h3 className="font-mono text-sky-400 text-sm mb-2">ACCESS POINTS</h3>
                            <div className="flex items-center gap-4">
                                <a 
                                    href={project.repoUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white hover:bg-slate-700/80 transition-colors duration-300"
                                >
                                    <GitHubIcon className="w-5 h-5" />
                                    <span>Source Code</span>
                                </a>
                                {project.liveUrl && (
                                    <a 
                                        href={project.liveUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-800/60 border border-sky-700 rounded-lg text-white hover:bg-sky-700/80 transition-colors duration-300"
                                    >
                                        <ExternalLinkIcon className="w-5 h-5" />
                                        <span>Live Site</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </GlassPanel>
             <motion.button
                onClick={close}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
            >
                <CloseIcon className="w-7 h-7" />
            </motion.button>
        </motion.div>
    );
};

export default function App() {
    const [view, setView] = useState('cockpit');
    const [selectedProject, setSelectedProject] = useState(null);

    const pageVariants = {
        initial: { opacity: 0, filter: "blur(4px)", scale: 0.98 },
        in: { opacity: 1, filter: "blur(0px)", scale: 1 },
        out: { opacity: 0, filter: "blur(4px)", scale: 0.98 },
    };

    return (
        <div className="w-full min-h-screen relative font-sans">
            <BlackholeBackground />
            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="w-full min-h-screen flex items-center justify-center"
                >
                    {view === 'cockpit' && <CockpitView setView={setView} setSelectedProject={setSelectedProject} />}
                    {view === 'profile' && <ProfileView setView={setView} />}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {selectedProject && <ProjectView project={selectedProject} close={() => setSelectedProject(null)} />}
            </AnimatePresence>
        </div>
    );
}