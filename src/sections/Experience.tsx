import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Award } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { experienceData } from '../data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Career Timeline"
          title="Track record of engineering and leadership."
          subtitle="3+ years delivering mission-critical applications, enterprise government portals, and mentoring frontend developers."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-cyan-500 via-emerald-500 to-zinc-700/30" />

          <div className="space-y-12">
            {experienceData.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-12 sm:pl-20 group"
              >
                {/* Timeline node bullet */}
                <div className="absolute left-1.5 sm:left-5.5 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-zinc-950 border-2 border-cyan-500 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-glow-brand transition-all">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                </div>

                {/* Experience Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm hover:border-cyan-500/40 hover:shadow-lg transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        {item.company}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-zinc-900 dark:text-white mt-0.5">
                        {item.role}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 px-3 py-1.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {item.highlight && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium mb-4">
                      <Award className="w-3.5 h-3.5" />
                      <span>{item.highlight}</span>
                    </div>
                  )}

                  {/* Bullet points */}
                  <ul className="space-y-2.5 mb-6 text-sm text-zinc-600 dark:text-zinc-300">
                    {item.description.map((desc, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
