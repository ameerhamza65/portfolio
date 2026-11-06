import React from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Testimonials } from './sections/Testimonials';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#05070c] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* 1. Navbar */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero */}
        <Hero />

        {/* 3. About */}
        <About />

        {/* 4. Skills */}
        <Skills />

        {/* 5. Experience */}
        <Experience />

        {/* 6. Projects */}
        <Projects />

        {/* 7. Testimonials (hidden if empty) */}
        <Testimonials />

        {/* 8. Contact */}
        <Contact />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
};

export default App;

