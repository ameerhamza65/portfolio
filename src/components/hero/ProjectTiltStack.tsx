import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lock, ArrowUpRight, Sparkles } from 'lucide-react';

interface ProjectCardData {
  id: string;
  title: string;
  domain: string;
  category: string;
  tech: string[];
  screenshot: string;
  baseRotate: number;
  baseX: number; // percentage offset
  baseY: number; // percentage offset
  baseScale: number;
  zIndex: number;
  parallaxFactor: number;
}

const stackProjects: ProjectCardData[] = [
  {
    id: 'mentority',
    title: 'Mentority',
    domain: 'mentority-web.vercel.app',
    category: 'Mentorship Network',
    tech: ['React', 'TypeScript', 'Tailwind'],
    screenshot: '/projects/mentority/desktop.webp',
    baseRotate: -5,
    baseX: 2,
    baseY: 0,
    baseScale: 0.88,
    zIndex: 10,
    parallaxFactor: 0.35,
  },
  {
    id: 'winwith-wits',
    title: 'WinWith Wits',
    domain: 'wits-tv.vercel.app',
    category: 'Real-time Trivia',
    tech: ['React', 'Socket.io', 'Firebase'],
    screenshot: '/projects/winwith-wits/desktop.webp',
    baseRotate: 4,
    baseX: 16,
    baseY: 10,
    baseScale: 0.92,
    zIndex: 20,
    parallaxFactor: 0.65,
  },
  {
    id: 'paaq',
    title: 'PAAQ',
    domain: 'paaq.app',
    category: 'Social Platform',
    tech: ['Next.js', 'Web Audio API', 'TypeScript'],
    screenshot: '/projects/paaq/desktop.webp',
    baseRotate: -2,
    baseX: 6,
    baseY: 22,
    baseScale: 0.96,
    zIndex: 30,
    parallaxFactor: 1.0,
  },
  {
    id: 'ajman-sewerage',
    title: 'Ajman Sewerage',
    domain: 'ajmansewerage.ae',
    category: 'UAE Govt Platform',
    tech: ['React', 'TypeScript', 'Redux'],
    screenshot: '/projects/ajman-sewerage/desktop.webp',
    baseRotate: 1.5,
    baseX: 18,
    baseY: 34,
    baseScale: 1.0,
    zIndex: 40,
    parallaxFactor: 1.35,
  },
];

export const ProjectTiltStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Tilt angles (perspective tilt)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredCardId(null);
  };

  const handleCardClick = (projectId: string) => {
    const targetSection = document.getElementById('projects');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto h-[440px] sm:h-[480px] lg:h-[500px] flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* 3D Tilting Frame */}
      <motion.div
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {stackProjects.map((project, index) => {
          const isHovered = hoveredCardId === project.id;
          const isAnotherHovered = hoveredCardId !== null && !isHovered;

          // Layer-specific parallax calculations
          const layerX = useTransform(smoothMouseX, [-0.5, 0.5], [
            -18 * project.parallaxFactor,
            18 * project.parallaxFactor,
          ]);
          const layerY = useTransform(smoothMouseY, [-0.5, 0.5], [
            -15 * project.parallaxFactor,
            15 * project.parallaxFactor,
          ]);

          return (
            <motion.div
              key={project.id}
              tabIndex={0}
              role="link"
              aria-label={`View ${project.title} live project in portfolio`}
              onClick={() => handleCardClick(project.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(project.id);
                }
              }}
              onMouseEnter={() => setHoveredCardId(project.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              onFocus={() => setHoveredCardId(project.id)}
              onBlur={() => setHoveredCardId(null)}
              style={{
                x: isTouchDevice ? 0 : layerX,
                y: isTouchDevice ? 0 : layerY,
                zIndex: isHovered ? 50 : project.zIndex,
                top: `${project.baseY}%`,
                left: `${project.baseX}%`,
              }}
              animate={
                isTouchDevice
                  ? {
                      y: [0, index % 2 === 0 ? -6 : 6, 0],
                      scale: project.baseScale,
                      rotate: project.baseRotate,
                      transition: {
                        y: {
                          repeat: Infinity,
                          duration: 4 + index * 0.5,
                          ease: 'easeInOut',
                        },
                      },
                    }
                  : {
                      scale: isHovered ? 1.05 : isAnotherHovered ? project.baseScale * 0.98 : project.baseScale,
                      rotate: isHovered ? 0 : project.baseRotate,
                      opacity: isAnotherHovered ? 0.55 : 1,
                      filter: isAnotherHovered ? 'brightness(0.85) blur(0.5px)' : 'brightness(1) blur(0px)',
                      translateZ: isHovered ? 45 : 0,
                    }
              }
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`absolute w-[82%] sm:w-[80%] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
                isHovered
                  ? 'border-2 border-cyan-400 shadow-[0_20px_50px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/50'
                  : 'border border-zinc-200/80 dark:border-zinc-700/70 shadow-2xl bg-zinc-950'
              }`}
            >
              {/* Mini Browser Window Top Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/95 border-b border-zinc-800 text-[11px] text-zinc-400">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>

                {/* Real Domain URL Pill */}
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono text-zinc-300 truncate max-w-[170px] sm:max-w-[210px]">
                  <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{project.domain}</span>
                </div>

                <div className="shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>

              {/* Real Project WebP Screenshot Viewport */}
              <div className="relative w-full h-[calc(100%-28px)] overflow-hidden bg-zinc-950">
                <img
                  src={project.screenshot}
                  alt={`${project.title} live application interface`}
                  className="w-full h-full object-cover object-top"
                  loading={index < 2 ? 'eager' : 'lazy'}
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Project Badge / Hover Detail Banner */}
                <div
                  className={`absolute bottom-2 left-2 right-2 p-2 rounded-xl backdrop-blur-md transition-all duration-300 flex items-center justify-between gap-2 ${
                    isHovered
                      ? 'bg-zinc-950/90 border border-cyan-500/40 opacity-100 translate-y-0'
                      : 'bg-zinc-950/70 border border-zinc-800/80 opacity-90'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs text-white truncate">
                        {project.title}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                        {project.category}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400 truncate">
                      {project.tech.join(' • ')}
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-cyan-400 shrink-0 flex items-center gap-0.5">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

