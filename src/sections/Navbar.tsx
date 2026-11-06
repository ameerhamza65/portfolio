import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { Theme } from '../hooks/useTheme';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { Button } from '../components/common/Button';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const navLinks = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(['hero', 'about', 'skills', 'experience', 'projects', 'contact'], 120);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-[#05070c]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 shadow-md group-hover:shadow-glow-brand transition-shadow">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-extrabold text-xs bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  AH
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white tracking-tight group-hover:text-cyan-500 transition-colors">
                Ameer Hamza
              </span>
              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 -mt-0.5">
                Front-End Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/60 p-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-300 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle + "Hire me" CTA */}
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <div className="hidden sm:block">
              <Button
                variant="primary"
                size="sm"
                asLink
                href="#contact"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                Hire Me
              </Button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-[#05070c]/95 border-b border-zinc-200 dark:border-zinc-800 px-4 pt-3 pb-6 shadow-xl backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-cyan-500/10 text-cyan-500 font-semibold border border-cyan-500/20'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-850'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  asLink
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Hire Me / Get in Touch
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
