import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-white dark:bg-[#05070c] border-t border-zinc-200 dark:border-zinc-850 text-zinc-600 dark:text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-base text-zinc-900 dark:text-white">
                Ameer Hamza
              </span>
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                Front-End Developer
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              React.js • Next.js • Angular • 3+ years engineering scale & performance
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-xl text-zinc-500 hover:text-cyan-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-xl text-zinc-500 hover:text-cyan-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.email}
              aria-label="Email"
              className="p-2 rounded-xl text-zinc-500 hover:text-cyan-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-cyan-500 dark:hover:text-cyan-400 border border-zinc-200 dark:border-zinc-800 transition-all hover:-translate-y-0.5 cursor-pointer text-xs font-mono"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-850/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {currentYear} Ameer Hamza. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with React 18, Vite, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
