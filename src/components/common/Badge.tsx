import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'emerald' | 'purple' | 'amber' | 'neutral' | 'live' | 'role-solo' | 'role-team' | 'role-led';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  className,
  dot = false,
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 font-medium rounded-full transition-colors";

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs",
  };

  const variantStyles = {
    cyan: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20",
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20",
    neutral: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60",
    live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold tracking-wider uppercase text-[10px]",
    'role-solo': "bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20",
    'role-team': "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20",
    'role-led': "bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-semibold",
  };

  const dotColor = {
    cyan: "bg-cyan-500",
    emerald: "bg-emerald-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
    neutral: "bg-zinc-400",
    live: "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    'role-solo': "bg-sky-400",
    'role-team': "bg-indigo-400",
    'role-led': "bg-amber-400",
  };

  return (
    <span className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}>
      {dot && (
        <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0", dotColor[variant])} />
      )}
      {children}
    </span>
  );
};

