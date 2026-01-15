import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  onOpenHireModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenHireModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          // Improved ScrollSpy Logic with throttle
          const sections = NAV_ITEMS.map(item => item.href.substring(1));
          let currentSection = activeSection;

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              // Standard ScrollSpy logic with offset buffer
              if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = section;
                break;
              }
            }
          }
          
          if (currentSection !== activeSection) {
            setActiveSection(currentSection);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Navbar height buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setActiveSection(targetId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform-gpu ${
          isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a 
            href="#home" 
            className="flex items-center gap-2 group"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              M
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Mahesh U<span className="text-emerald-500">.</span>
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
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full ${
                   activeSection === item.href.substring(1) ? 'w-full' : ''
                }`}></span>
              </a>
            ))}
            <button
              onClick={onOpenHireModal}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium backdrop-blur-sm border border-white/5 transition-all hover:scale-105 active:scale-95"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
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
            className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-[#0a0a0a] z-50 border-l border-white/10 shadow-2xl p-8 md:hidden flex flex-col gap-8 will-change-transform"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-display font-bold text-2xl">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 p-2">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-xl font-medium transition-colors ${
                    activeSection === item.href.substring(1) 
                    ? 'text-emerald-500' 
                    : 'text-slate-300 hover:text-white'
                  }`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenHireModal();
                }}
                className="px-5 py-3 rounded-full bg-emerald-500 text-white font-bold text-center mt-4 active:scale-95 transition-transform"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;