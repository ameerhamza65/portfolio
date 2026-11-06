import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye, ChevronDown, ChevronUp, Lock, Globe } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { projectsData } from '../data/projects';
import { Project } from '../types';
import { Badge } from '../components/common/Badge';
import { ProjectModal } from '../components/modal/ProjectModal';
import { Button } from '../components/common/Button';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Government', 'Enterprise', 'Social', 'Real-time', 'AI & Web'];

  // Filter projects by active tab
  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const moreProjects = filteredProjects.filter((p) => !p.featured);

  const displayedProjects = showMore ? filteredProjects : featuredProjects;

  const getRoleBadge = (role: Project['role']) => {
    switch (role) {
      case 'Solo':
        return <Badge variant="role-solo" size="sm" dot>Solo</Badge>;
      case 'Team':
        return <Badge variant="role-team" size="sm" dot>Team</Badge>;
      case 'Led team':
        return <Badge variant="role-led" size="sm" dot>Led Team</Badge>;
    }
  };

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-zinc-100/40 dark:bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Portfolio & Proof of Work"
            title="Real shipped platforms with live previews."
            subtitle="Explore mission-critical municipal portals, real-time gaming apps, and enterprise systems. Click any card for the interactive browser preview."
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 self-start md:self-auto shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setShowMore(true); // Automatically expand if category selected
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-white dark:bg-zinc-800 text-cyan-600 dark:text-cyan-400 shadow-sm font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="group flex flex-col rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/90 dark:border-zinc-800/80 overflow-hidden shadow-sm hover:border-cyan-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card Work Preview Image Container */}
              <div
                onClick={() => setSelectedProject(project)}
                className="relative aspect-video w-full overflow-hidden bg-zinc-950 cursor-pointer"
              >
                <img
                  src={project.screenshots.desktop}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/30 opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5">
                    {getRoleBadge(project.role)}
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-zinc-900/80 text-zinc-300 backdrop-blur-md border border-zinc-700/60">
                      {project.category}
                    </span>
                  </div>

                  {project.liveUrl ? (
                    <Badge variant="live" size="sm" dot>
                      Live
                    </Badge>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                      <Lock className="w-2.5 h-2.5" /> NDA
                    </span>
                  )}
                </div>

                {/* Domain Pill Bottom Left */}
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-950/80 text-cyan-300 backdrop-blur-md border border-zinc-800">
                    <Globe className="w-3 h-3 text-cyan-400" />
                    {project.domain || (project.isPrivate ? 'adnoc.internal' : 'enterprise')}
                  </span>
                </div>

                {/* Hover Quick Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950/40 backdrop-blur-xs">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs shadow-lg transform group-hover:scale-105 transition-transform">
                    <Eye className="w-3.5 h-3.5" />
                    Open Live Preview
                  </span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-lg font-bold font-display text-zinc-900 dark:text-white group-hover:text-cyan-500 transition-colors cursor-pointer mb-2"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techTags.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techTags.length > 4 && (
                      <span className="px-2 py-0.5 text-[11px] font-mono text-zinc-400">
                        +{project.techTags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Bottom */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Case Details</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      title="Open external website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Projects Toggle */}
        {moreProjects.length > 0 && activeFilter === 'All' && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowMore(!showMore)}
              icon={showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            >
              {showMore ? "Show Fewer Projects" : `View More Shipped Work (${moreProjects.length} more)`}
            </Button>
          </div>
        )}

        {/* Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
