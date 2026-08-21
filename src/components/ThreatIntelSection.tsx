import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Radar,
  Search,
  AlertOctagon,
  AlertTriangle,
  Info,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import { THREAT_FEED } from '../data/portfolioData';

export const ThreatIntelSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [copiedIoc, setCopiedIoc] = useState<string | null>(null);

  const filteredFeed = THREAT_FEED.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cveId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ioc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity =
      selectedSeverity === 'all' || item.severity === selectedSeverity;

    return matchesSearch && matchesSeverity;
  });

  const handleCopyIoc = (ioc: string) => {
    navigator.clipboard.writeText(ioc);
    setCopiedIoc(ioc);
    setTimeout(() => setCopiedIoc(null), 2000);
  };

  return (
    <section id="threat-intel" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative">
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
            LIVE INTELLIGENCE FEED
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            THREAT RADAR & ADVISORIES
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
            Real-time simulated CVE advisories, zero-day threat telemetry, and actionable Indicators of Compromise (IOCs) monitored in SOC triage.
          </p>

          {/* Search & Filter Controls */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CVE ID, IOC hash..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 font-mono uppercase"
              />
            </div>

            <div className="w-full sm:w-auto flex justify-center gap-1 bg-zinc-950 p-1 border border-white/10 font-mono overflow-x-auto no-scrollbar">
              {['all', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  className={`flex-1 sm:flex-none px-3 py-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedSeverity === sev
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {sev.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Threat Feed List */}
        <div className="space-y-4">
          {filteredFeed.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-zinc-950 border border-white/10 hover:border-white/30 transition-all duration-200 space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-xs font-black uppercase tracking-wider border ${
                      item.severity === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : item.severity === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-zinc-800 text-zinc-200 border-zinc-700'
                    }`}
                  >
                    {item.severity}
                  </span>
                  <span className="text-sm font-bold text-white uppercase">
                    {item.cveId}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {item.publishedAt}
                  </span>
                </div>

                <span className="text-xs text-zinc-400 uppercase">
                  Target: <span className="text-white font-bold">{item.affectedSystems}</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* IOC Copy Strip */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0A0A0A] p-3 border border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2 overflow-x-auto text-zinc-300">
                  <span className="text-zinc-500 font-bold uppercase">IOC TELEMETRY:</span>
                  <span className="text-emerald-400 font-bold">{item.ioc}</span>
                </div>

                <button
                  onClick={() => handleCopyIoc(item.ioc)}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors self-end sm:self-auto"
                >
                  {copiedIoc === item.ioc ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy IOC</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

          {filteredFeed.length === 0 && (
            <div className="text-center py-12 text-zinc-500 font-mono text-xs uppercase font-bold">
              No threat advisories matching your search query.
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
