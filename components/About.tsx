import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Trophy, BarChart3, Cpu } from 'lucide-react';
import { SKILL_CATEGORIES } from '../constants';

const beliefs = [
  {
    icon: BarChart3,
    label: 'Automation',
    title: 'Data Analyst',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    description: 'Transforming raw numbers into strategic business growth. I automate workflows and visualize complex data for clear decision making.'
  },
  {
    icon: Trophy,
    label: 'Community',
    title: 'Freelance Sports Analyst',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    description: 'A voice in sports analytics. My Quora community has over 17K followers where I break down tournaments with statistical depth.'
  },
  {
    icon: Brain,
    label: 'Intelligence',
    title: 'Aspiring Data Scientist',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    description: 'Pushing boundaries with Machine Learning. Building predictive models for bankruptcy detection and market forecasting.'
  }
];

// Color palette definitions for skill cards
const THEME_STYLES = {
  emerald: {
    border: 'border-emerald-500/20',
    shadow: 'shadow-[0_0_30px_rgba(16,185,129,0.05)]',
    icon: 'text-emerald-400',
    title: 'text-white', 
    header: 'text-emerald-500/80',
    tag: 'bg-emerald-950/30 border-emerald-500/20 text-emerald-100'
  },
  blue: {
    border: 'border-blue-500/20',
    shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.05)]',
    icon: 'text-blue-400',
    title: 'text-white',
    header: 'text-blue-500/80',
    tag: 'bg-blue-950/30 border-blue-500/20 text-blue-100'
  },
  violet: {
    border: 'border-violet-500/20',
    shadow: 'shadow-[0_0_30px_rgba(139,92,246,0.05)]',
    icon: 'text-violet-400',
    title: 'text-white',
    header: 'text-violet-500/80',
    tag: 'bg-violet-950/30 border-violet-500/20 text-violet-100'
  }
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="py-1 px-3 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-widest uppercase border border-emerald-500/20">
              The Vision
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display font-bold text-4xl md:text-5xl mb-6"
          >
            Data driven. <span className="text-slate-500">Future focused.</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ delay: 0.2, duration: 0.6 }}
             className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Dynamic Analytics & Automation Strategist with 2+ years of experience and a digital footprint of <strong>2.3M+ views</strong>.
          </motion.p>
        </div>

        {/* Identity Cards: Staggered grid (1 col mobile, 2 tablet, 3 PC) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {beliefs.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
              className={`glass-card p-8 rounded-2xl group hover:bg-white/5 transition-colors relative overflow-hidden flex flex-col items-center text-center md:items-start md:text-left ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className={`w-14 h-14 ${item.bgColor} rounded-xl flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={28} />
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{item.label}</div>
              <h3 className={`text-xl font-bold ${item.color} mb-4`}>{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Process Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-white/5 p-8 md:p-12 mb-24 relative overflow-hidden text-center md:text-left"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white shrink-0">
              <Cpu size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">The Soloist Methodology</h3>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                Leveraged Generative AI and Low-Code frameworks to rapidly prototype and deploy full-stack data applications, focusing on architectural logic and business ROI.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Technical Arsenal Grid */}
        <div className="space-y-12">
           <motion.h3 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-2xl font-display font-bold text-center mb-8"
           >
             Strategic Capabilities & Technology Stack
           </motion.h3>

           {/* Responsive Grid: 1 -> 2 -> 3 columns */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
             {SKILL_CATEGORIES.map((category, catIndex) => {
               const isHighlight = category.highlight;
               const colSpan = isHighlight ? "md:col-span-2 lg:col-span-3" : "lg:col-span-1";
               
               const theme = category.theme || 'emerald';
               const styles = THEME_STYLES[theme];
               const Icon = category.icon || Cpu;

               return (
                 <motion.div
                   key={category.title}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ delay: catIndex * 0.1, duration: 0.6 }}
                   className={`rounded-3xl p-8 border ${styles.border} ${isHighlight ? 'bg-[#0A0A0A]' : 'glass-card'} ${styles.shadow} ${colSpan} flex flex-col`}
                 >
                   <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                      <Icon className={styles.icon} size={24} />
                      <h4 className={`text-2xl font-bold ${styles.title}`}>
                        {category.title}
                      </h4>
                   </div>

                   <div className={`grid gap-6 ${isHighlight ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                      {category.groups.map((group) => (
                        <div key={group.name} className="relative text-center md:text-left">
                          <h5 className={`text-xs font-bold uppercase tracking-wider mb-3 ${styles.header}`}>
                            {group.name}
                          </h5>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {group.skills.map((skill) => (
                              <span 
                                key={skill} 
                                className={`text-sm px-3 py-1.5 rounded-md font-medium border ${styles.tag}`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                   </div>
                 </motion.div>
               );
             })}
           </div>
        </div>

      </div>
    </section>
  );
};

export default About;