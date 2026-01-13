import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-surface/50 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px bg-white/10 flex-1"></div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-center">Professional Journey</h2>
          <div className="h-px bg-white/10 flex-1"></div>
        </motion.div>

        <div className="space-y-12 relative">
          {/* Vertical Line with Draw Animation */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500/50 to-transparent md:left-1/2 md:-translate-x-1/2 z-0 opacity-30" 
          />

          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot with Scale Animation */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.2, type: "spring", stiffness: 200 }}
                className="absolute left-7 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#0F0F0F] z-10 top-8 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              ></motion.div>

              {/* Content Card */}
              <div className="w-full pl-16 md:pl-0 md:w-1/2">
                <div className={`glass-card p-8 rounded-2xl relative hover:border-emerald-500/30 transition-colors duration-300 w-full ${
                    index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                }`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{exp.role}</h3>
                    <div className="flex items-center gap-3 shrink-0">
                       <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-slate-300 border border-white/5">
                        {exp.type}
                      </span>
                      <span className="text-xs text-emerald-400 font-mono font-medium whitespace-nowrap">{exp.period}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-6 font-medium border-b border-white/5 pb-4">
                    <Briefcase size={16} className="text-emerald-500" />
                    <span className="text-slate-300">{exp.company}</span>
                  </div>

                  <ul className="space-y-3">
                    {exp.description.map((point, i) => (
                      <li key={i} className="text-slate-400 text-sm md:text-base leading-relaxed flex items-start gap-3">
                        <span className="text-emerald-500 mt-1.5 min-w-[6px] h-1.5 rounded-full bg-emerald-500/50"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Empty space for the other side to maintain structure */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;