import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, MapPin, Briefcase } from 'lucide-react';
import { profileData } from '../data/profile';
import { Button } from '../components/common/Button';
import { ProjectTiltStack } from '../components/hero/ProjectTiltStack';
import { InteractiveBackground } from '../components/hero/InteractiveBackground';
import { Magnetic } from '../components/common/Magnetic';

export const Hero: React.FC = () => {
  const nameLetters = Array.from(profileData.name);

  return (
    <section id="hero" className="relative min-h-[94vh] flex items-center pt-28 pb-16 lg:py-36 overflow-hidden">
      {/* 1. Canvas-based Interactive Dot Grid & Aurora Gradient Background */}
      <InteractiveBackground color="#06b6d4" density={34} intensity={0.8} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Prop & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Availability & Location Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Freelance & Contract</span>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
                <MapPin className="w-3 h-3 text-emerald-500" />
                Pakistan (Global Remote)
              </span>
            </motion.div>

            {/* Main Headline with Letter-by-Letter Reveal */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent inline-flex flex-wrap">
                  {nameLetters.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.08 + i * 0.035,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      }}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-2xl font-bold font-display text-zinc-800 dark:text-zinc-200"
              >
                Front-End Developer{' '}
                <span className="text-cyan-600 dark:text-cyan-400 font-normal">
                  (React.js | Next.js | Angular)
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed pt-1"
              >
                Specialized in architecting high-performance enterprise platforms and consumer web apps.
                With <span className="font-semibold text-zinc-900 dark:text-zinc-200">3+ years</span> of production experience delivering 7-portal government municipality systems, real-time gaming, and AI interfaces.
              </motion.p>
            </div>

            {/* CTAs: 1 row on desktop/tablet, stacked on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2"
            >
              {/* Magnetic effect on primary CTA button */}
              <Magnetic strength={0.3}>
                <Button
                  variant="primary"
                  size="lg"
                  asLink
                  href="#contact"
                  icon={<Briefcase className="w-4 h-4" />}
                  className="w-full sm:w-auto shadow-md hover:shadow-cyan-500/25"
                >
                  Hire Me / Get in Touch
                </Button>
              </Magnetic>

              <Button
                variant="secondary"
                size="lg"
                asLink
                href="#projects"
                icon={<ArrowDown className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                View Shipped Work
              </Button>

              <Button
                variant="outline"
                size="lg"
                asLink
                href={profileData.resumePath}
                download="Ameer_Hamza_Frontend_Resume.pdf"
                icon={<Download className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Download Resume
              </Button>
            </motion.div>

            {/* Social Links & Direct Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                Connect:
              </span>

              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl hover:text-cyan-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700/60"
                aria-label="Ameer Hamza LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl hover:text-cyan-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700/60"
                aria-label="Ameer Hamza GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={profileData.socials.email}
                className="p-2.5 rounded-xl hover:text-cyan-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700/60"
                aria-label="Direct Email Ameer Hamza"
              >
                <Mail className="w-4 h-4" />
              </a>

              <span className="text-xs font-mono text-zinc-500 hidden sm:inline ml-auto">
                hamxa9403@gmail.com • +92-301-2941139
              </span>
            </motion.div>
          </div>

          {/* Right Column: Tilt-Card Project Stack (5 cols desktop, below text on mobile) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center pt-4 lg:pt-0">
            <ProjectTiltStack />
          </div>
        </div>
      </div>
    </section>
  );
};
