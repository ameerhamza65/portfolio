import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  asLink = false,
  href,
  download,
  target,
  rel,
  children,
  icon,
  className,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-bg disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2 font-semibold",
    lg: "px-7 py-3.5 text-base gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-cyan-500 to-emerald-500 text-zinc-950 font-bold hover:from-cyan-400 hover:to-emerald-400 shadow-md hover:shadow-glow-brand transition-shadow",
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700/60 shadow-sm",
    outline: "bg-transparent text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:border-cyan-500/80 dark:hover:border-cyan-400/80 hover:bg-cyan-500/5",
    ghost: "bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60",
  };

  const combinedClasses = twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className));

  if (asLink && href) {
    return (
      <motion.a
        href={href}
        download={download}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={combinedClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
};

