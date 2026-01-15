import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Linkedin, Send, Check, Copy, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HireModal: React.FC<HireModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
              onClick={onClose}
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
  );
};

export default HireModal;