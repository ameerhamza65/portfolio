import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';

export const HeroCodeSnippet: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'engineer' | 'impact'>('engineer');

  const engineerCode = `// ameers-profile.config.ts
import { FrontendEngineer } from '@core/architecture';

export const ameer: FrontendEngineer = {
  name: "Ameer Hamza",
  title: "Front-End Developer (React | Next | Angular)",
  experience: "3+ years", // production & scale
  location: "Pakistan (Open to Global Remote)",
  status: "🟢 Available for Contract & Freelance",
  coreCompetencies: [
    "7-Portal Government Systems",
    "Real-Time WebSockets & Streaming",
    "Enterprise RBAC & Security (ADNOC)",
    "Sub-second Core Web Vitals"
  ],
  readyToShip: true
};`;

  const impactCode = `// txlabz-deliverables.ts
export async function auditShippedMilestones() {
  return {
    ajmanGov: "Consolidated 7 municipality portals into 1",
    adnocEnterprise: "Real-time oil & gas telemetry dashboard",
    paaqSocial: "Infinite audio Q&A feed with sub-50ms sync",
    performance: "Consistently delivering 95+ Core Web Vitals",
    leadership: "Mentored frontend team & led code reviews"
  };
}`;

  const currentCode = activeTab === 'engineer' ? engineerCode : impactCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group w-full max-w-xl mx-auto lg:max-w-none">
      {/* Ambient gradient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/25 via-emerald-500/20 to-brand-600/25 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Code Card Shell */}
      <div className="relative rounded-2xl bg-zinc-950/90 dark:bg-[#090d16]/95 border border-zinc-800/80 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/70 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-80 transition-opacity inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-80 transition-opacity inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-80 transition-opacity inline-block" />
            <div className="ml-3 flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('engineer')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === 'engineer'
                    ? 'bg-zinc-800 text-cyan-400 font-semibold shadow-inner'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Profile.ts</span>
              </button>
              <button
                onClick={() => setActiveTab('impact')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === 'impact'
                    ? 'bg-zinc-800 text-emerald-400 font-semibold shadow-inner'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Impact.ts</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-zinc-400 hover:text-zinc-100 bg-zinc-800/60 hover:bg-zinc-800 rounded-lg border border-zinc-700/50 transition-colors"
            title="Copy snippet"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content Area */}
        <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto selection:bg-cyan-500/30">
          <pre className="text-zinc-300">
            <code>
              {activeTab === 'engineer' ? (
                <>
                  <span className="text-zinc-500">// ameers-profile.config.ts</span>
                  <br />
                  <span className="text-purple-400">import</span> &#123;{' '}
                  <span className="text-cyan-300">FrontendEngineer</span> &#125;{' '}
                  <span className="text-purple-400">from</span>{' '}
                  <span className="text-emerald-300">'@core/architecture'</span>;
                  <br />
                  <br />
                  <span className="text-purple-400">export const</span>{' '}
                  <span className="text-blue-400">ameer</span>:{' '}
                  <span className="text-cyan-300">FrontendEngineer</span> = &#123;
                  <br />
                  {'  '}<span className="text-zinc-400">name:</span>{' '}
                  <span className="text-emerald-300">"Ameer Hamza"</span>,
                  <br />
                  {'  '}<span className="text-zinc-400">title:</span>{' '}
                  <span className="text-emerald-300">"Front-End Developer (React | Next | Angular)"</span>,
                  <br />
                  {'  '}<span className="text-zinc-400">experience:</span>{' '}
                  <span className="text-amber-300 font-bold">"3+ years"</span>,{' '}
                  <span className="text-zinc-500">// enterprise & scale</span>
                  <br />
                  {'  '}<span className="text-zinc-400">location:</span>{' '}
                  <span className="text-emerald-300">"Pakistan (Open to Global Remote)"</span>,
                  <br />
                  {'  '}<span className="text-zinc-400">status:</span>{' '}
                  <span className="text-emerald-400 font-semibold">"🟢 Available for Contract & Freelance"</span>,
                  <br />
                  {'  '}<span className="text-zinc-400">coreCompetencies:</span> [
                  <br />
                  {'    '}<span className="text-emerald-300">"7-Portal Government Systems (UAE)"</span>,
                  <br />
                  {'    '}<span className="text-emerald-300">"Enterprise Security & Telemetry (ADNOC)"</span>,
                  <br />
                  {'    '}<span className="text-emerald-300">"Real-Time WebSockets & Streaming"</span>,
                  <br />
                  {'    '}<span className="text-emerald-300">"Sub-Second Core Web Vitals"</span>
                  <br />
                  {'  '}],
                  <br />
                  {'  '}<span className="text-zinc-400">readyToShip:</span>{' '}
                  <span className="text-cyan-400 font-bold">true</span>
                  <br />
                  &#125;;
                </>
              ) : (
                <>
                  <span className="text-zinc-500">// txlabz-deliverables.ts</span>
                  <br />
                  <span className="text-purple-400">export async function</span>{' '}
                  <span className="text-blue-400">auditShippedMilestones</span>() &#123;
                  <br />
                  {'  '}<span className="text-purple-400">return</span> &#123;
                  <br />
                  {'    '}<span className="text-zinc-400">ajmanGov:</span>{' '}
                  <span className="text-emerald-300">"Consolidated 7 municipality portals into 1"</span>,
                  <br />
                  {'    '}<span className="text-zinc-400">adnocEnterprise:</span>{' '}
                  <span className="text-emerald-300">"Real-time oil & gas telemetry dashboard"</span>,
                  <br />
                  {'    '}<span className="text-zinc-400">paaqSocial:</span>{' '}
                  <span className="text-emerald-300">"Infinite audio Q&A feed with sub-50ms sync"</span>,
                  <br />
                  {'    '}<span className="text-zinc-400">performance:</span>{' '}
                  <span className="text-emerald-300">"Consistently delivering 95+ Core Web Vitals"</span>,
                  <br />
                  {'    '}<span className="text-zinc-400">leadership:</span>{' '}
                  <span className="text-emerald-300">"Mentored frontend team & led code reviews"</span>
                  <br />
                  {'  '}&#125;;
                  <br />
                  &#125;
                </>
              )}
            </code>
          </pre>
        </div>

        {/* Live Status Footer Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>vite: ready in 142ms</span>
          </div>
          <div className="text-zinc-500">UTF-8 • TypeScript 5.6</div>
        </div>
      </div>
    </div>
  );
};
