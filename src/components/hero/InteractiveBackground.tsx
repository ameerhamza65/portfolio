import React, { useRef, useEffect } from 'react';

export interface InteractiveBackgroundProps {
  color?: string; // Accent color for glow/push (default: '#06b6d4')
  density?: number; // Grid spacing in px (default: 32)
  intensity?: number; // 0.1 to 1 (default: 0.8)
  className?: string;
}

interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  color = '#06b6d4',
  density = 32,
  intensity = 0.8,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check accessibility & device flags
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const isMobile = window.innerWidth < 768;

    // Adjust grid spacing based on screen size (wider spacing on mobile for 50%+ fewer dots)
    const gridSpacing = isMobile ? Math.max(density * 1.5, 44) : density;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: Dot[] = [];

    // Mouse coordinates relative to canvas
    let mouse = {
      x: -1000,
      y: -1000,
      radius: isMobile ? 80 : 120,
    };

    let isVisible = true;
    let animationFrameId: number | null = null;

    // Theme check helper
    const getIsDark = () => document.documentElement.classList.contains('dark');

    const initDots = () => {
      dots = [];
      const cols = Math.floor(width / gridSpacing);
      const rows = Math.floor(height / gridSpacing);

      const offsetX = (width - cols * gridSpacing) / 2;
      const offsetY = (height - rows * gridSpacing) / 2;

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const bx = offsetX + c * gridSpacing;
          const by = offsetY + r * gridSpacing;
          dots.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initDots();

      if (prefersReducedMotion) {
        renderStatic();
      }
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = getIsDark();
      ctx.fillStyle = isDark
        ? `rgba(148, 163, 184, ${0.16 * intensity})`
        : `rgba(100, 116, 139, ${0.2 * intensity})`;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.baseX, dot.baseY, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Physics parameters for spring response
    const springStiffness = 0.08;
    const damping = 0.85;
    const maxRepelDistance = isMobile ? 80 : 120;
    const repelForce = 22 * intensity;

    const animate = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const isDark = getIsDark();

      const defaultFill = isDark
        ? `rgba(148, 163, 184, ${0.16 * intensity})`
        : `rgba(100, 116, 139, ${0.2 * intensity})`;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Cursor repulsion physics (disabled on touch devices)
        if (!isTouch && mouse.x > 0 && mouse.y > 0) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxRepelDistance && dist > 0) {
            const force = (1 - dist / maxRepelDistance) * repelForce;
            const angle = Math.atan2(dy, dx);
            dot.vx += Math.cos(angle) * force;
            dot.vy += Math.sin(angle) * force;
          }
        }

        // Spring force returning to base position
        const returnDx = dot.baseX - dot.x;
        const returnDy = dot.baseY - dot.y;

        dot.vx += returnDx * springStiffness;
        dot.vy += returnDy * springStiffness;

        dot.vx *= damping;
        dot.vy *= damping;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Check if dot is actively perturbed by cursor to apply glow
        const distanceFromBase = Math.abs(dot.x - dot.baseX) + Math.abs(dot.y - dot.baseY);
        const isPerturbed = distanceFromBase > 0.4;

        ctx.beginPath();
        if (isPerturbed && !isTouch) {
          // const glowAlpha = Math.min(0.9, (distanceFromBase / 15) * intensity);
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 6;
          ctx.arc(dot.x, dot.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        } else {
          ctx.fillStyle = defaultFill;
          ctx.arc(dot.x, dot.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Pause animation when hero is off-screen using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting && !document.hidden;
        if (isVisible && !animationFrameId && !prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Pause on visibility change
    const handleVisibilityChange = () => {
      isVisible = !document.hidden && container.getBoundingClientRect().bottom > 0;
      if (isVisible && !animationFrameId && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Resize listener
    window.addEventListener('resize', resize, { passive: true });

    // Initial setup
    resize();

    if (!prefersReducedMotion) {
      if (!isTouch) {
        container.addEventListener('mousemove', handleMouseMove, { passive: true });
        container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      }
      animationFrameId = requestAnimationFrame(animate);
    } else {
      renderStatic();
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [color, density, intensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none ${className}`}
      style={{
        maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      {/* Slow-moving Aurora Gradient Layer (teal/emerald/cyan blur blobs) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Aurora Blob 1 (Teal/Cyan) */}
        <div
          className="absolute -top-[10%] left-[15%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-cyan-500/12 dark:bg-cyan-500/15 blur-[90px] animate-pulse-slow"
          style={{ animationDuration: '8s' }}
        />
        {/* Aurora Blob 2 (Emerald) */}
        <div
          className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/12 blur-[100px] animate-pulse-slow"
          style={{ animationDuration: '11s', animationDelay: '2s' }}
        />
        {/* Aurora Blob 3 (Teal ambient center) */}
        <div
          className="absolute -bottom-[5%] left-[35%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-teal-400/8 dark:bg-teal-400/10 blur-[80px]"
        />
      </div>

      {/* Canvas for Interactive Dot Grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

