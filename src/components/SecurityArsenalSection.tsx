import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Terminal,
  Copy,
  Check,
  Code2,
  ShieldAlert,
  Target,
  SearchCheck,
  Cpu,
  Layers,
} from 'lucide-react';
import { COMMAND_CHEATSHEETS } from '../data/portfolioData';

export const SecurityArsenalSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pentest' | 'soc' | 'forensics' | 'scripting'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Cheatsheets', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'pentest', label: 'Penetration Testing', icon: <Target className="w-3.5 h-3.5" /> },
    { id: 'soc', label: 'SOC SIEM & YARA', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'forensics', label: 'RAM & Forensics', icon: <SearchCheck className="w-3.5 h-3.5" /> },
    { id: 'scripting', label: 'Python & Packet Scapy', icon: <Cpu className="w-3.5 h-3.5" /> },
  ];

  const filteredCommands =
    activeCategory === 'all'
      ? COMMAND_CHEATSHEETS
      : COMMAND_CHEATSHEETS.filter((c) => c.category === activeCategory);

  const handleCopy = (id: string, command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section id="arsenal" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
            HANDS-ON COMMAND CHEATSHEETS
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            SECURITY COMMAND ARSENAL
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
            Real-world CLI command flags, memory forensic queries, and SIEM search strings used during penetration audits and live SOC triage.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10 bg-zinc-950 p-1.5 border border-white/10 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Command Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCommands.map((cmd) => (
            <div
              key={cmd.id}
              className="bg-zinc-950 border border-white/10 hover:border-white/30 p-6 space-y-4 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400" />
                    <span className="text-xs font-mono font-black text-white uppercase tracking-wider">
                      {cmd.tool}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest bg-zinc-900 text-zinc-400 border border-white/10">
                    {cmd.category}
                  </span>
                </div>

                <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-zinc-200 transition-colors">
                  {cmd.description}
                </h3>

                {/* Command Snippet Block */}
                <div className="relative bg-[#050505] border border-white/15 p-3.5 font-mono text-xs text-emerald-400 rounded-none overflow-x-auto selection:bg-emerald-900">
                  <div className="flex items-start justify-between gap-2">
                    <code className="block pr-8 break-all font-bold select-all leading-relaxed">
                      $ {cmd.command}
                    </code>
                    <button
                      onClick={() => handleCopy(cmd.id, cmd.command)}
                      className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/20 transition-all flex-shrink-0"
                      title="Copy Command"
                    >
                      {copiedId === cmd.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {cmd.explanation}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase font-bold">
                <span>CLI COMMAND READY</span>
                <span className="text-zinc-300 group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <Terminal className="w-3 h-3" /> VERIFIED EXECUTION
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
