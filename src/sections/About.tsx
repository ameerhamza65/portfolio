import React from 'react';
import { motion } from 'framer-motion';
import { Globe2 } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { profileData } from '../data/profile';

export const About: React.FC = () => {
  const domainPills = [
    { name: "Government Municipality", desc: "7-portal civic systems & digital NOC workflows" },
    { name: "Enterprise Operations", desc: "ADNOC telemetry dashboards & role-based systems" },
    { name: "Real-Time Gaming & Social", desc: "Sub-50ms WebSocket quiz & audio discussions" },
    { name: "Conversational AI Interfaces", desc: "Streaming LLM assistant connecting SAP ERP" },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Profile Overview"
          title="Engineering resilient, accessible web experiences."
          subtitle="A dedicated frontend engineer blending design precision with high-scale architectural rigor."
        />

        {/* Top Grid: Bio Text (Left) & Domain Expertise (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Bio text (4 sentences max as requested) */}
          <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {profileData.bio.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Specialized Domains */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-cyan-500" />
              Proven Domain Expertise
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              {domainPills.map((domain, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center"
                >
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {domain.name}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {domain.desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4 Stats Cards: 4 equal columns on desktop, 2x2 on tablet & mobile, no empty gap */}
        <div id="stats-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {profileData.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="h-full p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex flex-col">
                <div className="h-12 sm:h-14 flex items-center font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-400 text-2xl sm:text-3xl xl:text-4xl tracking-tight">
                  {stat.fullValue ? (
                    <>
                      <span className="hidden 2xl:inline text-xl xl:text-2xl">{stat.fullValue}</span>
                      <span className="2xl:hidden">{stat.value}</span>
                    </>
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-2">
                  {stat.label}
                </div>
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 pt-3 flex-1 flex items-start">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
