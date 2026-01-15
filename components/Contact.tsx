import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface ContactProps {
  onOpenHireModal: () => void;
}

const Contact: React.FC<ContactProps> = ({ onOpenHireModal }) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
    <footer id="contact" className="bg-[#020202] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a 
              href="#home" 
              onClick={(e) => handleScrollTo(e, 'home')}
              className="text-2xl font-display font-bold text-white mb-6 block"
            >
              Mahesh U<span className="text-emerald-500">.</span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Transforming data into strategies. Open for freelance opportunities and full-time roles in Data Science and Analytics.
            </p>
            
            <div className="flex gap-3 mb-6">
              <div className="w-0.5 min-h-full bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full opacity-70"></div>
              <p className="text-slate-300 text-sm italic font-medium py-1 leading-relaxed">
                "If I don't know the answer, I know how to find one."
              </p>
            </div>

            <div className="flex gap-4">
              <a 
                href={CONTACT_INFO.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href={CONTACT_INFO.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"
              >
                <Github size={18} />
              </a>
              <a 
                href="#home" 
                onClick={(e) => handleScrollTo(e, 'home')}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links (Explore) - Keeps normal navigation behavior */}
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => handleScrollTo(e, 'home')}
                  className="hover:text-emerald-400 transition-colors block"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleScrollTo(e, 'about')}
                  className="hover:text-emerald-400 transition-colors block"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  onClick={(e) => handleScrollTo(e, 'projects')}
                  className="hover:text-emerald-400 transition-colors block"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  onClick={(e) => handleScrollTo(e, 'experience')}
                  className="hover:text-emerald-400 transition-colors block"
                >
                  Experience
                </a>
              </li>
            </ul>
          </div>

          {/* Services/Tags - Triggers Hire Modal */}
          <div>
            <h4 className="text-white font-bold mb-6">Expertise</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button onClick={onOpenHireModal} className="hover:text-emerald-400 transition-colors text-left">Data & Analytics</button>
              </li>
              <li>
                <button onClick={onOpenHireModal} className="hover:text-emerald-400 transition-colors text-left">AI tools</button>
              </li>
              <li>
                <button onClick={onOpenHireModal} className="hover:text-emerald-400 transition-colors text-left">Automation</button>
              </li>
              <li>
                <button onClick={onOpenHireModal} className="hover:text-emerald-400 transition-colors text-left">Rapid Prototyping & "Vibe Coding"</button>
              </li>
            </ul>
          </div>

          {/* Contact Info - Triggers Hire Modal */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-emerald-500 mt-1" />
                <button onClick={onOpenHireModal} className="hover:text-white transition-colors text-left">{CONTACT_INFO.email}</button>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-emerald-500 mt-1" />
                <button onClick={onOpenHireModal} className="hover:text-white transition-colors text-left">{CONTACT_INFO.phone}</button>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-emerald-500 mt-1" />
                <button onClick={onOpenHireModal} className="hover:text-white transition-colors text-left">{CONTACT_INFO.location}</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Mahesh Ushir. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Contact;