import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldCheck,
  Menu,
  X,
  Terminal,
  Cpu,
  Mail,
  FileText,
  Activity,
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'arsenal', label: 'Arsenal' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'projects', label: 'Projects' },
    { id: 'insights', label: 'Insights' },
    { id: 'experience', label: 'Timeline' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-[#0A0A0A]/80 backdrop-blur-sm border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Status */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white text-black flex items-center justify-center font-black group-hover:scale-105 transition-transform flex-shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 fill-black" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-base sm:text-xl font-black tracking-tighter text-white uppercase group-hover:text-zinc-300 transition-colors truncate">
                  Ujjwal Tamang
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="hidden xs:inline">SOC </span>ACTIVE
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono tracking-widest uppercase block truncate">
                CEH // SOC ANALYST
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-950 p-1 border border-white/10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-black shadow-md font-black'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('arsenal')}
              className="flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 text-xs font-black uppercase tracking-wider transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-300" />
              <span>Arsenal</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-wider transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 bg-zinc-900 text-white border border-white/10"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-white/10 px-4 pt-3 pb-6 mt-3 space-y-2">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-white text-black'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <ShieldCheck className="w-4 h-4 text-black" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
            <button
              onClick={() => scrollToSection('arsenal')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-zinc-900 text-white border border-white/20 text-xs font-black uppercase tracking-wider"
            >
              <Terminal className="w-4 h-4" />
              <span>Arsenal</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider"
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
