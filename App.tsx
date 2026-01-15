import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import HireModal from './components/HireModal';

const App: React.FC = () => {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  return (
    <div className="font-sans antialiased text-slate-200 bg-background selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
      <Navbar onOpenHireModal={() => setIsHireModalOpen(true)} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
      </main>
      <Contact onOpenHireModal={() => setIsHireModalOpen(true)} />
      
      <HireModal 
        isOpen={isHireModalOpen} 
        onClose={() => setIsHireModalOpen(false)} 
      />
      
      {/* Mesh Gradient Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-emerald-900/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-violet-900/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Global Grain/Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[9999]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default App;