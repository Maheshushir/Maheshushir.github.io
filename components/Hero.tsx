import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, BarChart2 } from 'lucide-react';
import { SOCIAL_STATS } from '../constants';

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
    }, 4000); // Increased to 4s to allow time to read descriptions
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for freelance projects
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.1] mb-6">
            Hi, I'm <br />
            <span className="text-gradient">Mahesh Ushir</span>
          </h1>

          <div className="h-12 md:h-16 mb-6 flex items-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`text-2xl md:text-4xl font-light ${ROLES[roleIndex].color}`}
              >
                {ROLES[roleIndex].text}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Dynamic Description Area */}
          <div className="min-h-[140px] md:min-h-[100px] mb-8 relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="text-lg text-slate-400 max-w-lg leading-relaxed absolute top-0 left-0"
              >
                {ROLES[roleIndex].description}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-4 mb-12 relative z-10">
            <a href="#projects" className="group px-7 py-3.5 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:bg-slate-200 transition-colors">
              View Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#home" className="px-7 py-3.5 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
              Download CV
              <Download size={18} />
            </a>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {SOCIAL_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <div className="flex items-center gap-2 text-white font-bold text-2xl md:text-3xl mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-500 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual / Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2 relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 aspect-[4/5] max-w-md mx-auto">
            <img 
              src="https://picsum.photos/seed/mahesh/800/1000" 
              alt="Mahesh Ushir" 
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700" 
            />
            
            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                <BarChart2 size={24} />
              </div>
              <div>
                <div className="text-white font-bold text-lg">Top Rated</div>
                <div className="text-slate-400 text-sm">Sports Analytics Voice</div>
              </div>
            </div>
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