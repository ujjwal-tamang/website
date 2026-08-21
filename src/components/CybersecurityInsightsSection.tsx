import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Newspaper,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Terminal,
  Search,
  CheckCircle2,
  Globe,
  Sparkles,
  AlertTriangle,
  BookmarkPlus,
  Share2,
} from 'lucide-react';

interface InsightArticle {
  id: string;
  title: string;
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  publishedDate: string;
  sourceTitle: string;
  sourceUrl?: string;
  summary: string;
  keyTakeaways: string[];
  analystCommentary: string;
}

interface GroundingSource {
  title: string;
  url: string;
}

export const CybersecurityInsightsSection: React.FC = () => {
  const [insights, setInsights] = useState<InsightArticle[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTopic, setActiveTopic] = useState<string>('all');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isFallback, setIsFallback] = useState<boolean>(false);

  const topicQueries: Record<string, string> = {
    all: 'recent critical zero day vulnerabilities SOC threat hunting ransomware cybersecurity news 2026',
    zeroday: 'latest zero day vulnerability CVE advisories CISA critical infrastructure',
    soc: 'SOC telemetry SIEM log correlation threat hunting incident response techniques',
    cloud: 'cloud security breaches AWS Azure IAM privilege escalation vulnerabilities',
    ransomware: 'ransomware threat actor group attacks malware analysis campaign',
  };

  const topics = [
    { id: 'all', label: 'All Industry Insights' },
    { id: 'zeroday', label: 'Zero-Day CVEs' },
    { id: 'soc', label: 'SOC & Telemetry' },
    { id: 'cloud', label: 'Cloud Security' },
    { id: 'ransomware', label: 'Ransomware & Malware' },
  ];

  const fetchInsights = async (topicKey: string) => {
    setIsLoading(true);
    try {
      const queryParam = encodeURIComponent(topicQueries[topicKey] || topicQueries.all);
      const res = await fetch(`/api/cybersecurity-insights?topic=${queryParam}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.insights)) {
        setInsights(data.insights);
        setSources(data.sources || []);
        setIsFallback(Boolean(data.isFallback));
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.error('Failed to load cybersecurity insights:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights(activeTopic);
  }, [activeTopic]);

  return (
    <section id="insights" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-[10px] uppercase tracking-[0.3em] font-mono text-emerald-400 font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>REAL-TIME SEARCH GROUNDING</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            CYBERSECURITY INSIGHTS
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
            Live threat intelligence digest and zero-day advisories compiled via Google Search Grounding with Ujjwal Tamang's expert SOC analyst commentary.
          </p>
        </div>

        {/* Topic Tabs & Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-zinc-950 p-2 border border-white/10">
          <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t.id)}
                className={`px-3.5 py-2 text-xs font-mono font-black uppercase tracking-wider transition-all ${
                  activeTopic === t.id
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/10 pt-2 md:pt-0">
            {lastUpdated && (
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                UPDATED {lastUpdated}
              </span>
            )}
            <button
              onClick={() => fetchInsights(activeTopic)}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 text-xs font-mono font-black uppercase tracking-wider transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
              <span>{isLoading ? 'SEARCHING WEB...' : 'REFRESH LIVE FEED'}</span>
            </button>
          </div>
        </div>

        {/* Live Search Status Banner */}
        <div className="mb-8 p-3 bg-zinc-900/80 border border-white/10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300 font-bold">
              {isFallback ? 'SOC INTELLIGENCE ARCHIVE' : 'LIVE GEMINI SEARCH GROUNDED INTELLIGENCE'}
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 uppercase font-mono">
            UJJWAL TAMANG // THREAT ANALYST NOTE
          </span>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-zinc-950 border border-white/10 p-6 space-y-4 animate-pulse">
                <div className="h-4 bg-zinc-800 w-1/3" />
                <div className="h-6 bg-zinc-800 w-3/4" />
                <div className="h-16 bg-zinc-900 w-full" />
                <div className="h-20 bg-zinc-900 w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Insights Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {insights.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-zinc-950 border border-white/10 hover:border-white/30 p-6 sm:p-8 space-y-6 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Badges & Category Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest border ${
                          item.severity === 'CRITICAL'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : item.severity === 'HIGH'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {item.severity} SEVERITY
                      </span>
                      <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest bg-zinc-900 text-zinc-300 border border-white/10">
                        {item.category}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">
                      {item.publishedDate}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-zinc-200 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Source Badge */}
                  {item.sourceTitle && (
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <Globe className="w-3.5 h-3.5 text-zinc-500" />
                      <span>SOURCE: <strong className="text-white">{item.sourceTitle}</strong></span>
                      {item.sourceUrl && (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline flex items-center gap-1 ml-auto"
                        >
                          <span>READ SOURCE</span> <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Executive Summary */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans border-l-2 border-white/20 pl-3 py-1">
                    {item.summary}
                  </p>

                  {/* Key Takeaways */}
                  {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-widest block">
                        SOC TAKEAWAYS & IMPACT:
                      </span>
                      <ul className="space-y-1.5 font-sans text-xs text-zinc-300">
                        {item.keyTakeaways.map((takeaway, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Ujjwal Tamang's Analyst Commentary */}
                  <div className="p-4 bg-zinc-900 border border-white/15 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-emerald-400">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>UJJWAL TAMANG // SOC ANALYST PERSPECTIVE</span>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500">CEH v12</span>
                    </div>
                    <p className="text-xs text-zinc-300 italic leading-relaxed">
                      "{item.analystCommentary}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase">
                  <span>SEARCH GROUNDED INTELLIGENCE</span>
                  <span className="text-zinc-400 flex items-center gap-1 font-bold">
                    <ShieldAlert className="w-3 h-3 text-emerald-400" /> ACTIVE DEFENSE
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Web Grounding Sources & Citations */}
        {sources && sources.length > 0 && (
          <div className="p-6 bg-zinc-950 border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>VERIFIED GOOGLE SEARCH GROUNDING SOURCES:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {sources.map((src, sIdx) => (
                <a
                  key={sIdx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span className="truncate max-w-xs">{src.title}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};
