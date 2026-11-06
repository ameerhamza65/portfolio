import React, { useState } from 'react';
import { ExternalLink, Lock, Smartphone, Monitor, Copy, Check, ShieldAlert } from 'lucide-react';
import { Project } from '../../types';

interface BrowserWindowProps {
  project: Project;
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({ project }) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [iframeFailed, setIframeFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayUrl = project.liveUrl || (project.domain ? `https://${project.domain}` : 'https://enterprise.internal/restricted');
  const hasMobileScreenshot = Boolean(project.screenshots.mobile);

  const handleCopyUrl = () => {
    if (project.liveUrl) {
      navigator.clipboard.writeText(project.liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentScreenshot = deviceMode === 'mobile' && hasMobileScreenshot
    ? project.screenshots.mobile!
    : project.screenshots.desktop;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-2xl flex flex-col">
      {/* Chrome / Safari Browser Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400">
        {/* Left: Window Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* Device Viewport Switcher */}
          {hasMobileScreenshot && !project.isPrivate && (
            <div className="ml-3 hidden sm:flex items-center bg-zinc-800/90 rounded-lg p-0.5 border border-zinc-700/60">
              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  deviceMode === 'desktop'
                    ? 'bg-zinc-700 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Desktop View (1440px)"
              >
                <Monitor className="w-3 h-3" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  deviceMode === 'mobile'
                    ? 'bg-zinc-700 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-3 h-3" />
                <span>Mobile</span>
              </button>
            </div>
          )}
        </div>

        {/* Center: Address Bar */}
        <div className="flex-1 max-w-md mx-auto flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 truncate">
            {project.isPrivate ? (
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            )}
            <span className="truncate">{displayUrl}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {project.liveUrl && (
              <button
                type="button"
                onClick={handleCopyUrl}
                title="Copy live URL"
                className="p-1 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-medium transition-colors text-xs"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
              NDA Protected
            </span>
          )}
        </div>
      </div>

      {/* Browser Viewport Area */}
      <div className="relative w-full bg-zinc-950 flex items-center justify-center min-h-[340px] max-h-[540px] overflow-auto p-4 sm:p-6">
        {project.isPrivate ? (
          <div className="w-full flex flex-col items-center justify-center text-center p-8 bg-zinc-900/50 rounded-xl border border-zinc-800/80">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Confidential Enterprise Platform</h4>
            <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
              This system is deployed inside ADNOC's private intranet. Public web access and live iframe embedding are restricted by corporate security and non-disclosure governance.
            </p>
            <img
              src={currentScreenshot}
              alt={project.title}
              className="w-full max-w-xl rounded-lg border border-zinc-800 shadow-xl object-cover"
              loading="lazy"
            />
          </div>
        ) : project.allowIframe && !iframeFailed && project.liveUrl ? (
          <div className="w-full h-full min-h-[480px] relative rounded-lg overflow-hidden border border-zinc-800">
            <iframe
              src={project.liveUrl}
              title={`Live preview of ${project.title}`}
              className="w-full h-[480px] border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms"
              onError={() => setIframeFailed(true)}
              loading="lazy"
            />
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <button
                onClick={() => setIframeFailed(true)}
                className="px-2 py-1 bg-zinc-900/90 text-[11px] text-zinc-300 rounded border border-zinc-700/80 hover:bg-zinc-800 shadow backdrop-blur"
              >
                Switch to Screenshot View
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Fallback Notice */}
            <div className="w-full mb-3 flex items-center justify-between text-[11px] text-zinc-400 font-mono bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Verified production screenshot ({deviceMode === 'mobile' ? 'Mobile 375px' : 'Desktop 1440px'})
              </span>
              {project.liveUrl && (
                <span className="text-zinc-500">Live preview protected by CSP</span>
              )}
            </div>

            {/* Responsive Screenshot Container */}
            <div
              className={`transition-all duration-300 rounded-lg overflow-hidden border border-zinc-800 shadow-xl bg-zinc-900 ${
                deviceMode === 'mobile' ? 'w-[320px] sm:w-[360px] shadow-2xl ring-1 ring-zinc-700' : 'w-full'
              }`}
            >
              <img
                src={currentScreenshot}
                alt={`${project.title} live preview`}
                className="w-full h-auto max-h-[480px] object-top object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
