import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 origin-left z-50 pointer-events-none shadow-[0_0_10px_rgba(6,182,212,0.5)]"
      aria-hidden="true"
    />
  );
};

