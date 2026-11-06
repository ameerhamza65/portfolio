import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { testimonialsData } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  // If testimonials array is empty, completely hide this section as requested
  if (!testimonialsData || testimonialsData.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Recommendations"
          title="What team leads and founders say."
          subtitle="Feedback from engineering managers, technical leads, and collaborators across production projects."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between hover:border-cyan-500/40 transition-colors relative"
            >
              <div>
                <Quote className="w-8 h-8 text-cyan-500/30 mb-4" />

                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center font-bold text-xs text-zinc-950 shrink-0">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white">
                    {item.name}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {item.role} • {item.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

