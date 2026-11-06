import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, UserCheck, Users, Crown, Layers, ShieldCheck } from 'lucide-react';
import { Project } from '../../types';
import { BrowserWindow } from './BrowserWindow';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const roleConfig = {
    'Solo': { icon: UserCheck, variant: 'role-solo' as const, label: 'Solo Developer' },
    'Team': { icon: Users, variant: 'role-team' as const, label: 'Team Contributor' },
    'Led team': { icon: Crown, variant: 'role-led' as const, label: 'Frontend Lead' },
  }[project.role];

  const RoleIcon = roleConfig.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0c1017] border border-zinc-200 dark:border-zinc-800 shadow-2xl z-10 text-zinc-900 dark:text-zinc-100 flex flex-col"
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#0c1017]/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <Badge variant={roleConfig.variant} size="md">
                <RoleIcon className="w-3.5 h-3.5 mr-1 inline" />
                {roleConfig.label}
              </Badge>
              <Badge variant="cyan" size="md">
                {project.category}
              </Badge>
              {project.isPrivate && (
                <Badge variant="amber" size="md">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 inline" />
                  Enterprise NDA
                </Badge>
              )}
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Title & One-line Summary */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-white mb-3">
                {project.title}
              </h3>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Live Interactive Browser Frame / Preview */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  Live Work Preview
                </h4>
                {project.liveUrl && (
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Active Deployment
                  </span>
                )}
              </div>
              <BrowserWindow project={project} />
            </div>

            {/* Project Deep Dive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Left Column: Description & Role Details */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h4 className="text-sm font-bold font-display uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-500" />
                    Architecture & Overview
                  </h4>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.roleDetails && (
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1.5">
                      My Role & Contribution
                    </h5>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {project.roleDetails}
                    </p>
                  </div>
                )}

                {/* Key Outcomes & Metrics */}
                {project.keyOutcomes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold font-display uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
                      Key Engineering Outcomes
                    </h4>
                    <ul className="space-y-2.5">
                      {project.keyOutcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Tech Stack & Actions */}
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techTags.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent border border-cyan-500/20 space-y-3">
                  <h4 className="text-sm font-bold font-display text-zinc-900 dark:text-white">
                    Need a similar solution?
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Ameer is available for frontend contract architecture, performance audits, and high-growth MVPs.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    asLink
                    href="#contact"
                    onClick={onClose}
                  >
                    Hire Ameer for your project
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#0c1017]/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800/80">
            <div className="text-xs font-mono text-zinc-500">
              {project.domain || (project.isPrivate ? 'Confidential' : 'Proprietary')}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" onClick={onClose}>
                Close
              </Button>
              {project.liveUrl && (
                <Button
                  variant="primary"
                  size="sm"
                  asLink
                  href={project.liveUrl}
                  target="_blank"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  Visit Live Site
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

