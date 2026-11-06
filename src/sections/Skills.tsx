import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Network, Cpu, Cloud, Check } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { skillGroups } from '../data/skills';

export const Skills: React.FC = () => {
  const categoryIcons: Record<string, React.ReactNode> = {
    "Frameworks & Libraries": <Code2 className="w-5 h-5 text-cyan-400" />,
    "State Management": <Cpu className="w-5 h-5 text-emerald-400" />,
    "Languages": <Code2 className="w-5 h-5 text-indigo-400" />,
    "Styling & UI Systems": <Layout className="w-5 h-5 text-pink-400" />,
    "Real-time & APIs": <Network className="w-5 h-5 text-amber-400" />,
    "Backend Foundations": <Database className="w-5 h-5 text-teal-400" />,
    "Deployment & DevOps": <Cloud className="w-5 h-5 text-sky-400" />,
  };

  return (
    <section id="skills" className="py-20 lg:py-28 relative bg-zinc-100/50 dark:bg-zinc-950/40 border-y border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technical Stack"
          title="Grouped expertise for mission-critical web applications."
          subtitle="Curated toolchain mastered across 3+ years of production delivery. Organized by architectural domain rather than an unstructured wall of logos."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: groupIdx * 0.05 }}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm hover:border-cyan-500/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
                    {categoryIcons[group.category] || <Code2 className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display text-zinc-900 dark:text-white">
                      {group.category}
                    </h3>
                  </div>
                </div>

                {group.description && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">
                    {group.description}
                  </p>
                )}

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-200 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80" />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Production Proven</span>
                <span className="text-emerald-500 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Ready
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
