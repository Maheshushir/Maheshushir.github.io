import React from 'react';
import { motion } from 'framer-motion';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-background relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px bg-white/10 flex-1"></div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-center">Education & Certifications</h2>
          <div className="h-px bg-white/10 flex-1"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl relative group overflow-hidden hover:border-emerald-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 -z-10 pointer-events-none bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-display text-xl">🎓</span>
              Academic Degrees
            </h4>
            <ul className="space-y-6">
              <li className="flex flex-col">
                <span className="text-white font-semibold text-lg">M.Sc. in Data Science</span>
                <span className="text-emerald-400 text-sm mt-1">Chandigarh University</span>
                <span className="text-slate-400 text-xs mt-1">Feb 2026 - 2028 (Ongoing)</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white font-semibold text-lg">B.Sc. in Physics</span>
                <span className="text-emerald-400 text-sm mt-1">Savitribai Phule Pune University</span>
                <span className="text-slate-400 text-xs mt-1">2018 - 2021 &bull; 78.78%</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl relative group overflow-hidden hover:border-blue-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 -z-10 pointer-events-none bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-display text-xl">🏆</span>
              Certifications
            </h4>
            <ul className="space-y-6">
              <li className="flex flex-col">
                <span className="text-white font-semibold text-lg">Data Analyst Professional Certification</span>
                <span className="text-blue-400 text-sm mt-1">IBM | NASSCOM</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white font-semibold text-lg">HackerRank SQL Certifications</span>
                <span className="text-blue-400 text-sm mt-1">Basic, Intermediate, Advanced</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
