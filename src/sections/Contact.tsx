import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Clock, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { ContactForm } from '../components/contact/ContactForm';
import { profileData } from '../data/profile';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-zinc-100/50 dark:bg-zinc-950/40 border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's build something exceptional together."
          subtitle="Available for high-impact frontend contract engagements, new product launches, or joining your core team. A message directly reaches my personal inbox."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Channels Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-white mb-2">
                  Direct Contact
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Have a quick question or urgent project timeline? Connect with me directly on any channel:
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Email
                    </div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                      {profileData.email}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-zinc-400 group-hover:text-cyan-500 transition-colors shrink-0" />
                </a>

                <a
                  href={`tel:${profileData.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Phone / WhatsApp
                    </div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                      {profileData.phone}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-zinc-400 group-hover:text-emerald-500 transition-colors shrink-0" />
                </a>

                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      LinkedIn
                    </div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                      ameer-hamza-09032119a
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-zinc-400 group-hover:text-sky-500 transition-colors shrink-0" />
                </a>
              </div>

              {/* Status & Timezone Banner */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-500" />
                    Timezone:
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold">
                    PKT (UTC+5) • Flexible overlap
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    Location:
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold">
                    Pakistan (Remote worldwide)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
