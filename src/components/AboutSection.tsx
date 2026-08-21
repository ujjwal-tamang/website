import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Target,
  Search,
  Network,
  Wrench,
  Terminal,
  Cpu,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { PROFILE_DATA, SECURITY_PILLARS, SKILLS } from '../data/portfolioData';
import { SkillCategory } from '../types';

export const AboutSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');

  const categoryLabels: { id: SkillCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Skills', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'soc', label: 'SOC & SIEM', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'pentest', label: 'Penetration Testing', icon: <Target className="w-3.5 h-3.5" /> },
    { id: 'threat_intel', label: 'Threat Intel', icon: <Search className="w-3.5 h-3.5" /> },
    { id: 'network_forensics', label: 'Network & Forensics', icon: <Network className="w-3.5 h-3.5" /> },
    { id: 'tools', label: 'Security Tools', icon: <Terminal className="w-3.5 h-3.5" /> },
  ];

  const filteredSkills =
    selectedCategory === 'all'
      ? SKILLS
      : SKILLS.filter((s) => s.category === selectedCategory);

  return (
    <section id="about" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
            EXPERT PROFILE & CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            ABOUT ME & SECURITY PILLARS
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
            CEH v12 certified ethical hacker, SOC telemetry analyst, and vulnerability researcher based in Kathmandu, Nepal.
          </p>
        </div>

        {/* Top Bio & Manifesto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7 bg-zinc-950 border border-white/10 p-6 sm:p-10 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[60px] sm:text-[80px] font-black leading-none block text-white">01</span>
                <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 block mt-1 font-bold">
                  DEFENSIVE PHILOSOPHY
                </label>
              </div>
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-xs font-mono font-bold text-emerald-400">
                ACTIVE DEFENSE
              </span>
            </div>

            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base font-normal">
              {PROFILE_DATA.bio}
            </p>

            {/* Stark White High-Contrast Callout Block */}
            <div className="p-6 bg-white text-black">
              <div className="text-[10px] uppercase tracking-[0.3em] font-black mb-2 text-zinc-600">
                CORE MANIFESTO
              </div>
              <p className="text-sm font-bold leading-relaxed italic">
                "Defensive posture requires offensive clarity. Understanding how adversaries exploit weakness is the key to engineering unbreachable telemetry."
              </p>
              <span className="block text-xs font-mono font-extrabold mt-3 uppercase text-zinc-800">
                — UJJWAL TAMANG // SOC ANALYST & CEH
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono">
              <div className="p-4 bg-zinc-900 border border-white/10 text-xs space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase tracking-widest block font-bold">PRIMARY SPECIALIZATION</span>
                <span className="font-bold text-white text-sm block">SOC Telemetry & Penetration Testing</span>
                <span className="text-zinc-400 block">Kathmandu, Nepal</span>
              </div>
              <div className="p-4 bg-zinc-900 border border-white/10 text-xs space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase tracking-widest block font-bold">PRODUCTION TOOLKIT</span>
                <span className="font-bold text-white text-sm block">CrowdStrike & Burp Suite Pro</span>
                <span className="text-emerald-400 block font-bold">CEH v12 Accredited</span>
              </div>
            </div>
          </div>

          {/* Production Tooling Box */}
          <div className="lg:col-span-5 bg-zinc-950 border border-white/10 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div>
              <span className="text-[60px] sm:text-[80px] font-black leading-none block text-white">02</span>
              <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 block mt-1 font-bold mb-6">
                PRODUCTION TOOLING ARSENAL
              </label>

              <div className="flex flex-wrap gap-2">
                {[
                  'CrowdStrike Falcon',
                  'Metasploit Pro',
                  'Burp Suite Pro',
                  'Nmap',
                  'Wireshark',
                  'SQLMap',
                  'Nessus',
                  'OWASP ZAP',
                  'Linux Hardening',
                  'YARA Rules',
                  'Sysmon',
                  'Snort NIDS',
                  'Volatility 3',
                  'Python Security',
                  'Bash & PowerShell',
                ].map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-zinc-900 border border-white/10 hover:border-white/40 text-zinc-200 text-xs font-mono font-bold transition-all cursor-default uppercase"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-zinc-900 border border-white/10 text-xs text-zinc-300 space-y-2 font-mono">
              <div className="flex items-center justify-between text-white font-bold">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400">SOC INCIDENT SLA</span>
                <span className="text-emerald-400">99.9% COMPLIANT</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Engineered RTR automation playbooks resulting in sub-2 minute containment of anomalous endpoint sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Security Pillars Cards */}
        <div className="mb-16 space-y-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-1">
              DOMAINS OF EXCELLENCE
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tight">
              CORE CYBERSECURITY PILLARS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SECURITY_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="group p-6 bg-zinc-950 border border-white/10 hover:border-white/40 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-white text-black flex items-center justify-center font-black">
                    {pillar.iconName === 'Target' && <Target className="w-6 h-6 text-black" />}
                    {pillar.iconName === 'ShieldAlert' && <ShieldAlert className="w-6 h-6 text-black" />}
                    {pillar.iconName === 'Terminal' && <Terminal className="w-6 h-6 text-black" />}
                  </div>

                  <div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-zinc-300 transition-colors">
                      {pillar.title}
                    </h4>
                    <span className="text-xs text-emerald-400 font-mono font-bold uppercase block mt-0.5">
                      {pillar.subtitle}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">
                    CAPABILITIES:
                  </span>
                  {pillar.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-[11px] font-medium">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Competencies Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-1">
                COMPETENCY BENCHMARKS
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                SECURITY SKILLS MATRIX
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center gap-1 bg-zinc-950 p-1 border border-white/10 pb-2 sm:pb-1">
              {categoryLabels.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 bg-zinc-950 border border-white/10 hover:border-white/30 transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono uppercase">
                  <span className="font-bold text-white">{skill.name}</span>
                  <span className="text-zinc-400 font-bold">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-zinc-900 h-2 overflow-hidden border border-white/10">
                  <div
                    className="bg-white h-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
