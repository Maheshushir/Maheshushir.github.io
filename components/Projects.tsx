import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { PROJECTS, CONTACT_INFO } from '../constants';

const TABS = ['All', 'Data Analysis', 'Sports Analytics', 'Data Science'];

const getCategoryStyles = (category: string) => {
  switch (category) {
    case 'Data Analysis':
      return { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500' };
    case 'Sports Analytics':
      return { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500' };
    case 'Data Science':
      return { bg: 'bg-violet-500', text: 'text-violet-400', border: 'border-violet-500' };
    default:
      return { bg: 'bg-white', text: 'text-slate-400', border: 'border-white' };
  }
};

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const allSpotlight = PROJECTS.filter(p => p.spotlight);
  const allStandard = PROJECTS.filter(p => !p.spotlight);

  const filteredSpotlight = allSpotlight.filter(project => {
    if (activeTab === 'All') return true;
    return project.category === activeTab;
  });

  const filteredStandard = allStandard.filter(project => {
    if (activeTab === 'All') return true;
    return project.category === activeTab;
  });

  const showSpotlightSection = filteredSpotlight.length > 0;
  const standardProjects = filteredStandard;

  return (
    <section id="projects" className="py-24">
      {/* Container constraint to match Hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header & Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 text-center md:text-left"
        >
          <div className="flex flex-col items-center md:items-start w-full md:w-auto">
            <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-2 block">Portfolio</span>
            <h2 className="font-display font-bold text-4xl mb-6">Selected Work</h2>
            
            {/* Tabs */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {TABS.map((tab) => {
                 const styles = getCategoryStyles(tab);
                 const isActive = activeTab === tab;
                 
                 return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                      isActive
                        ? `${tab === 'All' ? 'bg-white text-black border-white' : `${styles.bg} text-white ${styles.border}`}`
                        : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                 );
              })}
            </div>
          </div>

          <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium group transition-colors self-center md:self-end mb-2">
            View Github
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Content Area */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              
              {/* --- FLAGSHIP DEPLOYMENTS (SPOTLIGHT) --- */}
              {showSpotlightSection && (
                <div className="mb-16">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-6 opacity-80">
                    <Sparkles size={16} className="text-yellow-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">Flagship Deployments</span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredSpotlight.map((project) => (
                      <motion.div
                        key={project.id}
                        layout
                        className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] flex flex-col"
                      >
                        {/* Image Area */}
                        <div className="h-64 overflow-hidden relative">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                          
                          <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
                            <span className={`px-2 py-1 ${getCategoryStyles(project.category).bg} text-white text-[10px] font-bold uppercase rounded shadow-lg`}>
                               Live App
                            </span>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-8 flex flex-col flex-grow relative text-center md:text-left">
                           <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none group-hover:border-white/20 transition-colors" />

                           <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 gap-2">
                             <h3 className="text-2xl font-display font-bold text-white group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                             <a href={project.link || '#'} className="text-slate-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                                <ExternalLink size={20} />
                             </a>
                           </div>
                           
                           <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                             {project.description}
                           </p>

                           <div className="mt-auto flex justify-center md:justify-start">
                              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {project.techStack.map(tech => (
                                  <span key={tech} className="text-[11px] font-medium text-slate-300 bg-white/5 px-3 py-1.5 rounded-md border border-white/5 hover:border-white/10 transition-colors">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                           </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- STANDARD GRID --- */}
              {standardProjects.length > 0 && (
                <div>
                   {showSpotlightSection && (
                     <div className="flex items-center justify-center md:justify-start gap-2 mb-6 mt-12 opacity-50">
                       <div className="h-px bg-white/20 w-8 hidden md:block"></div>
                       <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Other Work</span>
                       <div className="h-px bg-white/20 w-8 md:hidden"></div>
                     </div>
                   )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {standardProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        layout
                        className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full text-center md:text-left"
                      >
                        <div className="h-48 overflow-hidden relative flex-shrink-0">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />
                          <div className="absolute bottom-4 left-4">
                            <span className={`text-[10px] font-bold text-white ${getCategoryStyles(project.category).bg} backdrop-blur-md px-2 py-1 rounded`}>
                              {project.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
                          <p className="text-xs text-slate-400 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
                          <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                            <div className="flex gap-2">
                                {project.techStack.slice(0, 2).map(t => (
                                  <span key={t} className="text-[10px] uppercase text-slate-500 border border-slate-800 px-2 py-0.5 rounded">
                                    {t}
                                  </span>
                                ))}
                            </div>
                            <a href={project.link || '#home'} className="text-slate-300 hover:text-white transition-colors">
                              <ExternalLink size={16} />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;