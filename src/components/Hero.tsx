import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ArrowRight,
  Terminal,
  Award,
  CheckCircle2,
  Lock,
  Flame,
  Bug,
  Activity,
  MapPin,
  Download,
  Cpu,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTagline = PROFILE_DATA.taglines[taglineIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentTagline.substring(0, displayedText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setTaglineIndex((prev) => (prev + 1) % PROFILE_DATA.taglines.length);
      }
    } else {
      if (displayedText.length < currentTagline.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentTagline.substring(0, displayedText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, taglineIndex]);

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#0A0A0A]">
      {/* Background Cyber Grid Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Operations Center Eyebrow */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
                OPERATIONS CENTER // SOC LEAD
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-white/10 text-xs font-mono font-bold text-zinc-300">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>CEH v12 CERTIFIED</span>
                <span className="text-zinc-600">//</span>
                <span className="text-white flex items-center gap-1 font-mono">
                  <MapPin className="w-3 h-3 text-emerald-400" /> {PROFILE_DATA.location}
                </span>
              </div>
            </div>

            {/* Massive Bold Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.95] sm:leading-[0.9]">
                UJJWAL<br />
                <span className="text-zinc-400">TAMANG.</span>
              </h1>
              <div className="text-base sm:text-2xl font-black font-mono text-emerald-400 min-h-[2.5rem] flex items-center gap-2 uppercase tracking-tight flex-wrap">
                <span>{displayedText}</span>
                <span className="inline-block w-2 sm:w-2.5 h-5 sm:h-6 bg-emerald-400 animate-pulse flex-shrink-0" />
              </div>
            </div>

            {/* Concise Bio Description */}
            <p className="text-sm sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal border-l-2 border-white/20 pl-3.5 sm:pl-4">
              Proactive cybersecurity specialist, ethical hacker, and SOC telemetry analyst. Dedicated to securing infrastructure perimeters and executing real-time threat incident responses.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={() => onNavigate('arsenal')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-widest transition-all shadow-xl"
              >
                <Terminal className="w-4 h-4" />
                <span>Command Arsenal</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 font-black text-xs uppercase tracking-widest transition-all"
              >
                <Cpu className="w-4 h-4 text-zinc-400" />
                <span>Security Projects</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-white/10 font-bold text-xs uppercase tracking-widest transition-all"
              >
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>Contact</span>
              </button>
            </div>

            {/* Quick Metrics Bar - Bold Numbered Blocks */}
            <div className="pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
              {PROFILE_DATA.stats.map((stat, idx) => (
                <div key={idx} className="p-3 sm:p-4 bg-zinc-950 border border-white/10 hover:border-white/30 transition-colors">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-500 font-bold block mb-1 truncate">
                    0{idx + 1} // {stat.label}
                  </span>
                  <span className="block text-2xl sm:text-4xl font-black text-white font-mono tracking-tight">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Visual Column - Bold High-Contrast Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Card Container */}
              <div className="relative bg-zinc-950 border-2 border-white/20 p-6 shadow-2xl">
                {/* Header status bar inside card */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      TELEMETRY_ONLINE
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-white bg-zinc-900 px-2 py-1 border border-white/10">
                    UT-SOC #8941
                  </span>
                </div>

                {/* Avatar Frame */}
                <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60 overflow-hidden border-2 border-white/30 shadow-2xl group">
                  <img
                    src={PROFILE_DATA.avatarUrl}
                    alt={PROFILE_DATA.name}
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '../image.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/90 px-3 py-2 border border-white/20 text-xs">
                    <span className="font-bold text-white uppercase text-[10px] tracking-wider">CEH v12 CERTIFIED</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                {/* Critical Callout Box (as seen in Bold Typography theme) */}
                <div className="mt-6 p-4 bg-white text-black">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-black mb-1">
                    ACTIVE DEFENSE STATUS
                  </div>
                  <p className="text-xs font-bold leading-relaxed">
                    CrowdStrike EDR & Burp Suite Pro active across 100% of tested network segments. Zero unmitigated critical exploits.
                  </p>
                </div>

                {/* Bottom Verification Note */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                  <span>SYSTEM: SECURE</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <Lock className="w-3 h-3" /> VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
