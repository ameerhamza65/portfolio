import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the outer ring trailing smoothly
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover / is a pointer device (not touch)
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track hovered interactive elements to scale up ring
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor-hover]');
      setIsHovered(Boolean(interactive));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        aria-hidden="true"
      />

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/60 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-colors duration-150"
        style={{
          x: ringX,
          y: ringY,
          width: isHovered ? 48 : 30,
          height: isHovered ? 48 : 30,
          backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
          borderColor: isHovered ? 'rgba(16, 185, 129, 0.8)' : 'rgba(6, 182, 212, 0.5)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        aria-hidden="true"
      />
    </>
  );
};

