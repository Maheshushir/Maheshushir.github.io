import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BarChart2, Mail, Phone, Linkedin, Send, Copy, Check, ExternalLink } from 'lucide-react';
import { NAV_ITEMS, CONTACT_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple spy logic
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              M
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Mahesh<span className="text-emerald-500">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors relative group ${
                  activeSection === item.href.substring(1)
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => setActiveSection(item.href.substring(1))}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full ${
                   activeSection === item.href.substring(1) ? 'w-full' : ''
                }`}></span>
              </a>
            ))}
            <button
              onClick={() => setIsHireModalOpen(true)}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium backdrop-blur-sm border border-white/5 transition-all hover:scale-105"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-[#0a0a0a] z-50 border-l border-white/10 shadow-2xl p-8 md:hidden flex flex-col gap-8"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-display font-bold text-2xl">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xl font-medium text-slate-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsHireModalOpen(true);
                }}
                className="px-5 py-3 rounded-full bg-emerald-500 text-white font-bold text-center mt-4"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hire Me Modal */}
      <AnimatePresence>
        {isHireModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHireModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#0F0F0F] border border-white/10 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
            >
              {/* Modal Glow */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-[60px]" />
              
              <button 
                onClick={() => setIsHireModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="relative z-10">
                <div className="mb-6">
                  <span className="text-emerald-500 font-bold tracking-wider text-xs uppercase mb-2 block">Connect</span>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Let's Work Together</h3>
                  <p className="text-slate-400 text-sm">
                    Mahesh Ushir <br/>
                    <span className="opacity-70">Data Analyst & Automation Strategist</span>
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Email */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <Mail size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Email</div>
                        <div className="text-sm text-white font-medium">{CONTACT_INFO.email}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCopy(CONTACT_INFO.email, 'email')}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                      title="Copy Email"
                    >
                      {copiedField === 'email' ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Phone</div>
                        <div className="text-sm text-white font-medium">{CONTACT_INFO.phone}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCopy(CONTACT_INFO.phone, 'phone')}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                      title="Copy Phone"
                    >
                      {copiedField === 'phone' ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    </button>
                  </div>

                  {/* LinkedIn */}
                  <a 
                    href={CONTACT_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                        <Linkedin size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">LinkedIn</div>
                        <div className="text-sm text-white font-medium">Connect Professionally</div>
                      </div>
                    </div>
                    <ExternalLink size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                  </a>

                  {/* Telegram */}
                  <a 
                    href={CONTACT_INFO.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#0088cc]/10 flex items-center justify-center text-[#0088cc]">
                        <Send size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Telegram</div>
                        <div className="text-sm text-white font-medium">@Grimreaper47</div>
                      </div>
                    </div>
                    <ExternalLink size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-slate-500">
                    Typically responds within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;