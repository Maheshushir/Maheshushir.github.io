import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const ROLES = [
  { 
    text: "Data Analyst", 
    color: "text-emerald-400",
    description: (
      <>
        A strategic Solution Engineer with <strong className="text-emerald-400 font-semibold">2+ years of experience</strong> transforming raw data into growth engines. I specialize in architecting automated BI dashboards and cloud-based workflows that have empowered <strong className="text-emerald-400 font-semibold">10+ jewelry brands</strong> and <strong className="text-emerald-400 font-semibold">35+ D2C businesses</strong> to scale operations. By leveraging an AI-native <strong className="text-emerald-400 font-semibold">'vibe coding'</strong> approach, I deploy complex analytical systems <strong className="text-emerald-400 font-semibold">10x faster</strong>, moving from founder vision to production-ready tools with extreme efficiency.
      </>
    )
  },
  { 
    text: "Freelance Sports Analyst", 
    color: "text-blue-400",
    description: (
      <>
        Scaled a sports analytics community to <strong className="text-blue-400 font-semibold">17K+ followers</strong> and <strong className="text-blue-400 font-semibold">2.3M+ content views</strong>. I have delivered <strong className="text-blue-400 font-semibold">715+ high-level match insights</strong> and statistical deep-dives for global sports media leaders, including <strong className="text-blue-400 font-semibold">Bleacher Report and 433</strong>. I specialize in processing real-time football data into structured reports and technical narratives that meet the rigorous standards of international sports coverage.
      </>
    )
  },
  { 
    text: "Aspiring Data Scientist", 
    color: "text-violet-400",
    description: (
      <>
        <strong className="text-violet-400 font-semibold">MSc Data Science</strong> candidate with a background in <strong className="text-violet-400 font-semibold">BSc Physics</strong>, specializing in high-accuracy predictive modeling and intelligence systems. I have developed machine learning solutions including <strong className="text-violet-400 font-semibold">bankruptcy detection (93% accuracy)</strong> and churn probability models grounded in statistical inference. I leverage <strong className="text-violet-400 font-semibold">AI-assisted prototyping</strong> to engineer scientifically sound algorithms into functional data applications at an accelerated pace.
      </>
    )
  }
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 8000); // Increased time to read longer text
    return () => clearInterval(interval);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* Main Container: Fluid Width with constraints */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* TEXT CONTENT - Side 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Open for work
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
            Hi, I'm <br />
            <span className="text-gradient">Mahesh Ushir</span>
          </h1>

          {/* Rotating Roles */}
          <div className="h-12 md:h-16 mb-6 flex items-center justify-center lg:justify-start w-full">
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`text-2xl md:text-3xl lg:text-4xl font-light ${ROLES[roleIndex].color}`}
              >
                {ROLES[roleIndex].text}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Fixed Height Description Area - Increased height for longer text */}
          <div className="min-h-[280px] md:min-h-[200px] lg:min-h-[180px] mb-8 relative w-full flex justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="text-lg text-slate-400 max-w-2xl leading-relaxed absolute top-0"
              >
                {ROLES[roleIndex].description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Action Buttons - Flex Wrap to avoid overlap */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 relative z-10 w-full">
            <a 
              href="#projects" 
              onClick={(e) => handleScrollToSection(e, 'projects')}
              className="group px-7 py-3.5 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:bg-slate-200 transition-colors"
            >
              View Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#home" className="px-7 py-3.5 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
              Download CV
              <Download size={18} />
            </a>
          </div>

        </motion.div>

        {/* IMAGE / VISUAL - Side 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-2/5 order-1 lg:order-2 relative flex justify-center lg:justify-end"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 aspect-[4/5] w-full max-w-md">
            <img 
              src="/mahesh.jpg" 
              onError={(e) => {
                e.currentTarget.src = "https://github.com/maheshushir.png"; // Fallback to GitHub
                e.currentTarget.onerror = null; // Prevent infinite loop
              }}
              alt="Mahesh Ushir" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full -z-10 animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full -z-10 animate-[spin_80s_linear_infinite_reverse]" />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;