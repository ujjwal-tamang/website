import React from 'react';
import { Shield, Lock, MapPin, ArrowUp } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white text-black flex items-center justify-center font-black">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-black text-white uppercase tracking-tight">Ujjwal Tamang</span>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Elite Cybersecurity Professional, CEH Certified Ethical Hacker & SOC Analyst based in Kathmandu, Nepal. Safeguarding digital perimeters and responding to complex threat vectors.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] font-bold uppercase">
              <span className="w-2 h-2 bg-emerald-400 animate-pulse" />
              <span>SOC MONITORING: ACTIVE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3 font-mono">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
              NAVIGATION INDEX
            </span>
            <div className="grid grid-cols-2 gap-2 text-zinc-300 font-bold text-xs uppercase">
              <button
                onClick={() => onNavigate('home')}
                className="text-left hover:text-white hover:underline transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-left hover:text-white hover:underline transition-colors"
              >
                About & Strategy
              </button>
              <button
                onClick={() => onNavigate('arsenal')}
                className="text-left hover:text-white hover:underline transition-colors"
              >
                Command Arsenal
              </button>
              <button
                onClick={() => onNavigate('methodology')}
                className="text-left hover:text-white hover:underline transition-colors"
              >
                Audit Methodology
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="text-left hover:text-white hover:underline transition-colors"
              >
                Security Projects
              </button>
              <button
                onClick={() => onNavigate('insights')}
                className="text-left hover:text-white hover:underline transition-colors"
              >
                Security Insights
              </button>
              <button
                onClick={() => onNavigate('experience')}
                className="text-left hover:text-white hover:underline transition-colors"
              >
                Experience Timeline
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left hover:text-white hover:underline transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Scroll To Top & Security Note */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end space-y-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-black font-black uppercase text-xs hover:bg-zinc-200 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>

            <div className="text-zinc-500 text-[11px] font-mono text-left md:text-right space-y-1 font-bold uppercase">
              <p>Kathmandu, Nepal 🇳🇵</p>
              <p className="flex items-center gap-1 md:justify-end">
                <Lock className="w-3 h-3 text-white" /> SSL / TLS Protected
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500 font-mono uppercase font-bold">
          <p>© {new Date().getFullYear()} UJJWAL TAMANG. ALL RIGHTS RESERVED.</p>
          <p>SECURING THE DIGITAL FRONTIER, ONE TELEMETRY EVENT AT A TIME.</p>
        </div>
      </div>
    </footer>
  );
};
