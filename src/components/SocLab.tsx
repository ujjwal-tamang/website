import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  Terminal,
  ShieldAlert,
  Zap,
  Copy,
  Check,
  AlertTriangle,
  Play,
  FileCode2,
  Lock,
  SearchCheck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Info,
} from 'lucide-react';
import { PREBUILT_LOG_TEMPLATES } from '../data/portfolioData';
import { IncidentAnalysis } from '../types';

export const SocLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai_analyzer' | 'security_tools'>('ai_analyzer');

  // Terminal View state
  const [terminalMode, setTerminalMode] = useState<boolean>(false);

  // AI Log Analyzer State
  const [rawLog, setRawLog] = useState<string>(PREBUILT_LOG_TEMPLATES[0].logContent);
  const [incidentType, setIncidentType] = useState<string>('Web Security Attack');
  const [contextNotes, setContextNotes] = useState<string>(PREBUILT_LOG_TEMPLATES[0].notes);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<IncidentAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedRule, setCopiedRule] = useState<boolean>(false);

  // Security Tool state: Password Entropy
  const [testPassword, setTestPassword] = useState<string>('');

  // Security Tool state: Header Auditor
  const [headerUrl, setHeaderUrl] = useState<string>('https://example.com');
  const [auditingHeaders, setAuditingHeaders] = useState<boolean>(false);
  const [headerScore, setHeaderScore] = useState<number | null>(null);

  // Function to load template
  const loadTemplate = (templateId: string) => {
    const tmpl = PREBUILT_LOG_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setRawLog(tmpl.logContent);
      setIncidentType(tmpl.category);
      setContextNotes(tmpl.notes);
      setAnalysisResult(null);
      setErrorMessage(null);
    }
  };

  // Run AI Incident Analysis
  const handleAnalyze = async () => {
    if (!rawLog.trim()) {
      setErrorMessage('Please paste or select a security log entry before analyzing.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-incident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawLog, incidentType, contextNotes }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate incident analysis.');
      }

      setAnalysisResult(data.analysis);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err?.message || 'Error communicating with AI Security Co-Pilot backend.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Copy Detection Rule
  const handleCopyRule = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRule(true);
    setTimeout(() => setCopiedRule(false), 2000);
  };

  // Calculate Password Entropy
  const calculateEntropy = (pwd: string) => {
    if (!pwd) return { bits: 0, label: 'None', time: 'Instant' };
    let poolSize = 0;
    if (/[a-z]/.test(pwd)) poolSize += 26;
    if (/[A-Z]/.test(pwd)) poolSize += 26;
    if (/[0-9]/.test(pwd)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 32;

    const bits = Math.round(pwd.length * Math.log2(poolSize || 1));
    let label = 'Weak';
    let time = 'Seconds';

    if (bits > 80) {
      label = 'Very Strong (Military Grade)';
      time = '100+ Centuries';
    } else if (bits > 60) {
      label = 'Strong';
      time = 'Several Years';
    } else if (bits > 40) {
      label = 'Moderate';
      time = 'A few Days';
    }

    return { bits, label, time };
  };

  const entropyData = calculateEntropy(testPassword);

  // Header Audit Simulator
  const handleHeaderAudit = () => {
    setAuditingHeaders(true);
    setTimeout(() => {
      setHeaderScore(85);
      setAuditingHeaders(false);
    }, 800);
  };

  return (
    <section id="soc-lab" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
            INTERACTIVE SECURITY LAB
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            AI SOC CO-PILOT & UTILITIES
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
            Real-time telemetry log analyzer powered by server-side Gemini 3.6 Flash AI, MITRE ATT&CK mapping, and cybersecurity calculation utilities.
          </p>

          {/* Tab Switcher & Terminal View Toggle */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="w-full sm:w-auto inline-flex bg-zinc-950 p-1 border border-white/10 font-mono">
              <button
                onClick={() => setActiveTab('ai_analyzer')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === 'ai_analyzer'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Log Analyzer</span>
              </button>

              <button
                onClick={() => setActiveTab('security_tools')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === 'security_tools'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Security Tools</span>
              </button>
            </div>

            <button
              onClick={() => setTerminalMode(!terminalMode)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider transition-all border ${
                terminalMode
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border-white/10'
              }`}
            >
              <Terminal className={`w-3.5 h-3.5 ${terminalMode ? 'text-emerald-400 animate-pulse' : ''}`} />
              <span>Terminal View: {terminalMode ? '[ON]' : '[OFF]'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: AI Incident Log Analyzer */}
        {activeTab === 'ai_analyzer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Input Controls & Preset Templates */}
            <div className={`lg:col-span-5 border p-4 sm:p-6 space-y-5 sm:space-y-6 transition-all ${
              terminalMode
                ? 'bg-[#030803] border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)] text-emerald-400 font-mono'
                : 'bg-zinc-950 border-white/10'
            }`}>
              {terminalMode && (
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/40 text-[10px] text-emerald-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="ml-2 font-bold text-emerald-300">tty1 — telemetry_ingest.sh</span>
                  </div>
                  <span className="text-emerald-500/80 font-bold hidden sm:inline">[CLI INPUT]</span>
                </div>
              )}

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-white font-black uppercase text-xs sm:text-sm tracking-wider">
                  <Terminal className={`w-4 h-4 sm:w-5 sm:h-5 ${terminalMode ? 'text-emerald-400' : 'text-zinc-300'}`} />
                  <span className={terminalMode ? 'text-emerald-400 font-mono' : ''}>Telemetry Input</span>
                </div>
                <span className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 border uppercase font-bold ${
                  terminalMode ? 'bg-black text-emerald-300 border-emerald-500/50' : 'text-emerald-400 bg-zinc-900 border-white/10'
                }`}>
                  GEMINI 3.6 READY
                </span>
              </div>

              {/* Template Buttons */}
              <div className="space-y-2">
                <label className={`text-[10px] uppercase tracking-widest font-bold block ${terminalMode ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  Select Scenario Template:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PREBUILT_LOG_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => loadTemplate(tmpl.id)}
                      className={`p-3 border text-left transition-all text-xs group ${
                        terminalMode
                          ? 'bg-black hover:bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-mono'
                          : 'bg-zinc-900 hover:bg-zinc-800 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className={`font-bold uppercase block truncate ${terminalMode ? 'text-emerald-300 group-hover:text-emerald-200' : 'text-white group-hover:text-zinc-200'}`}>
                        {tmpl.title}
                      </span>
                      <span className={`text-[10px] font-mono block uppercase ${terminalMode ? 'text-emerald-600' : 'text-zinc-500'}`}>
                        {tmpl.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input Log Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className={`text-[10px] uppercase tracking-widest font-bold ${terminalMode ? 'text-emerald-400' : 'text-zinc-400'}`}>
                    Raw Log / Request Header:
                  </label>
                  <button
                    onClick={() => {
                      setRawLog('');
                      setAnalysisResult(null);
                    }}
                    className={`text-[10px] flex items-center gap-1 font-mono uppercase font-bold ${
                      terminalMode ? 'text-emerald-500 hover:text-emerald-300' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    <RotateCcw className="w-3 h-3" /> Clear
                  </button>
                </div>
                <textarea
                  value={rawLog}
                  onChange={(e) => setRawLog(e.target.value)}
                  rows={8}
                  placeholder="Paste syslog entry, HTTP request headers, SQL query, or PowerShell execution string..."
                  className={`w-full p-3 text-xs font-mono transition-colors resize-none focus:outline-none ${
                    terminalMode
                      ? 'bg-black border-emerald-500 text-emerald-300 placeholder-emerald-700 shadow-[inset_0_0_8px_rgba(16,185,129,0.2)]'
                      : 'bg-[#0A0A0A] border-white/10 text-emerald-400 focus:border-white/40'
                  }`}
                />
              </div>

              {/* Context Notes */}
              <div className="space-y-2">
                <label className={`text-[10px] uppercase tracking-widest font-bold ${terminalMode ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  Analyst Context Notes:
                </label>
                <input
                  type="text"
                  value={contextNotes}
                  onChange={(e) => setContextNotes(e.target.value)}
                  placeholder="e.g., Flagged by perimeter firewall on web server node #4"
                  className={`w-full p-2.5 text-xs focus:outline-none ${
                    terminalMode
                      ? 'bg-black border border-emerald-500/50 text-emerald-300 font-mono placeholder-emerald-700'
                      : 'bg-[#0A0A0A] border border-white/10 text-white focus:border-white/40'
                  }`}
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className={`w-full py-4 px-4 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                  terminalMode
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'bg-white hover:bg-zinc-200 text-black'
                }`}
              >
                {isLoading ? (
                  <>
                    <span className={`w-4 h-4 rounded-full border-2 border-t-transparent animate-spin ${terminalMode ? 'border-black' : 'border-black'}`} />
                    <span>Analyzing Security Telemetry...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Run AI Incident Analysis</span>
                  </>
                )}
              </button>

              {errorMessage && (
                <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* AI Analysis Output Display */}
            <div className={`lg:col-span-7 border p-6 min-h-[500px] flex flex-col justify-between transition-all ${
              terminalMode
                ? 'bg-[#020702] border-emerald-500/60 text-emerald-300 font-mono shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                : 'bg-zinc-950 border-white/10'
            }`}>
              {terminalMode && (
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-emerald-500/40 text-[10px] text-emerald-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="ml-2 font-bold text-emerald-300">tty2 — ai_triage_output.log</span>
                  </div>
                  <span className="text-emerald-500/80 font-bold hidden sm:inline">[CLI LOG STREAM]</span>
                </div>
              )}

              {analysisResult ? (
                <div className="space-y-6">
                  {/* Analysis Result Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${terminalMode ? 'text-emerald-500' : 'text-zinc-500'}`}>
                        THREAT CLASSIFICATION
                      </span>
                      <h3 className={`text-2xl font-black uppercase mt-0.5 ${terminalMode ? 'text-emerald-300 font-mono' : 'text-white'}`}>
                        {analysisResult.threatName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-xs font-black uppercase tracking-wider border ${
                          analysisResult.severity === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                            : analysisResult.severity === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-zinc-800 text-zinc-200 border-zinc-700'
                        }`}
                      >
                        {analysisResult.severity} SEVERITY
                      </span>
                    </div>
                  </div>

                  {/* MITRE ATT&CK Mapping */}
                  <div className="space-y-2">
                    <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${terminalMode ? 'text-emerald-400' : 'text-zinc-400'}`}>
                      MITRE ATT&CK TTP MAPPING:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.mitreTechniques.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`px-2.5 py-1 border font-mono text-xs font-bold uppercase ${
                            terminalMode ? 'bg-black border-emerald-500/50 text-emerald-300' : 'bg-zinc-900 border-white/10 text-white'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Executive Summary */}
                  <div className={`p-4 space-y-1 ${
                    terminalMode
                      ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-200'
                      : 'bg-white text-black'
                  }`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest block ${
                      terminalMode ? 'text-emerald-400' : 'text-zinc-600'
                    }`}>
                      EXECUTIVE SUMMARY:
                    </span>
                    <p className="text-xs font-bold leading-relaxed">
                      {analysisResult.executiveSummary}
                    </p>
                  </div>

                  {/* Root Cause Analysis */}
                  <div className="space-y-1">
                    <span className={`text-[10px] font-bold uppercase tracking-widest block font-mono ${terminalMode ? 'text-emerald-400' : 'text-zinc-400'}`}>
                      TECHNICAL ROOT CAUSE & VECTOR:
                    </span>
                    <p className={`text-xs leading-relaxed p-3 border font-mono ${
                      terminalMode ? 'bg-black border-emerald-500/40 text-emerald-300' : 'bg-[#0A0A0A] border-white/10 text-zinc-300'
                    }`}>
                      {analysisResult.rootCauseAnalysis}
                    </p>
                  </div>

                  {/* Containment Playbook Checklist */}
                  <div className="space-y-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest block font-mono ${terminalMode ? 'text-emerald-300' : 'text-white'}`}>
                      CONTAINMENT STEPS:
                    </span>
                    <div className="space-y-1.5">
                      {analysisResult.containmentPlaybook.map((step, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2.5 p-2.5 border text-xs ${
                            terminalMode ? 'bg-black/90 border-emerald-500/40 text-emerald-300 font-mono' : 'bg-zinc-900 border-white/10 text-zinc-200'
                          }`}
                        >
                          <span className={`w-5 h-5 flex items-center justify-center font-mono text-[10px] flex-shrink-0 font-black ${
                            terminalMode ? 'bg-emerald-500 text-black' : 'bg-white text-black'
                          }`}>
                            0{idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detection Rule Draft */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between font-mono">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${terminalMode ? 'text-emerald-300' : 'text-white'}`}>
                        DRAFT DETECTION RULE:
                      </span>
                      <button
                        onClick={() => handleCopyRule(analysisResult.detectionRuleDraft)}
                        className={`text-xs hover:underline flex items-center gap-1 font-bold uppercase ${terminalMode ? 'text-emerald-400' : 'text-white'}`}
                      >
                        {copiedRule ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className={`p-3 border font-mono text-[11px] overflow-x-auto whitespace-pre-wrap ${
                      terminalMode ? 'bg-black border-emerald-500/50 text-emerald-300' : 'bg-[#0A0A0A] border-white/10 text-emerald-400'
                    }`}>
                      {analysisResult.detectionRuleDraft}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-zinc-400 space-y-4">
                  <div className={`w-16 h-16 flex items-center justify-center font-black ${terminalMode ? 'bg-emerald-500 text-black' : 'bg-white text-black'}`}>
                    <Sparkles className="w-8 h-8 fill-current" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-black uppercase tracking-tight ${terminalMode ? 'text-emerald-300 font-mono' : 'text-white'}`}>
                      AI SOC CO-PILOT READY
                    </h4>
                    <p className={`text-xs max-w-sm mt-1 ${terminalMode ? 'text-emerald-500 font-mono' : 'text-zinc-400'}`}>
                      Select a prebuilt attack log template on the left or paste your raw log, then click "Run AI Incident Analysis".
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Security Utilities & Auditing */}
        {activeTab === 'security_tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tool 1: Password Bit Entropy Calculator */}
            <div className={`border p-6 space-y-6 transition-all ${
              terminalMode
                ? 'bg-[#030803] border-emerald-500/60 text-emerald-300 font-mono shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                : 'bg-zinc-950 border-white/10'
            }`}>
              {terminalMode && (
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/40 text-[10px] text-emerald-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="ml-2 font-bold text-emerald-300">tty3 — pwd_entropy.py</span>
                  </div>
                  <span className="text-emerald-500/80 font-bold hidden sm:inline">[BIT CALCULATOR]</span>
                </div>
              )}

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-white font-black uppercase text-sm">
                  <Lock className={`w-5 h-5 ${terminalMode ? 'text-emerald-400' : 'text-amber-400'}`} />
                  <span className={terminalMode ? 'text-emerald-300 font-mono' : ''}>Password Bit Entropy Calculator</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-[10px] uppercase tracking-widest font-bold ${terminalMode ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  Secret String to Evaluate:
                </label>
                <input
                  type="text"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="Type a password to test entropy..."
                  className={`w-full p-3 text-sm font-mono focus:outline-none ${
                    terminalMode
                      ? 'bg-black border border-emerald-500 text-emerald-300 placeholder-emerald-700 shadow-[inset_0_0_8px_rgba(16,185,129,0.2)]'
                      : 'bg-[#0A0A0A] border border-white/10 text-white focus:border-white/40'
                  }`}
                />
              </div>

              {terminalMode && (
                <div className="p-3 bg-black border border-emerald-500/40 text-xs font-mono text-emerald-400 space-y-1">
                  <div className="text-[10px] uppercase text-emerald-500 font-bold">
                    CLI ASCII STRENGTH METER:
                  </div>
                  <div className="tracking-widest font-bold text-emerald-300">
                    [{'█'.repeat(Math.min(16, Math.floor(entropyData.bits / 5)))}{'░'.repeat(Math.max(0, 16 - Math.floor(entropyData.bits / 5)))}] {entropyData.bits} BITS
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div className={`p-3 border text-center ${
                  terminalMode ? 'bg-black border-emerald-500/40' : 'bg-zinc-900 border-white/10'
                }`}>
                  <span className={`text-[10px] font-mono block font-bold ${terminalMode ? 'text-emerald-500' : 'text-zinc-500'}`}>ENTROPY</span>
                  <span className={`text-xl font-black font-mono mt-1 block ${terminalMode ? 'text-emerald-300' : 'text-white'}`}>
                    {entropyData.bits} bits
                  </span>
                </div>
                <div className={`p-3 border text-center ${
                  terminalMode ? 'bg-black border-emerald-500/40' : 'bg-zinc-900 border-white/10'
                }`}>
                  <span className={`text-[10px] font-mono block font-bold ${terminalMode ? 'text-emerald-500' : 'text-zinc-500'}`}>RATING</span>
                  <span className={`text-xs font-black uppercase mt-1 block ${terminalMode ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {entropyData.label}
                  </span>
                </div>
                <div className={`p-3 border text-center ${
                  terminalMode ? 'bg-black border-emerald-500/40' : 'bg-zinc-900 border-white/10'
                }`}>
                  <span className={`text-[10px] font-mono block font-bold ${terminalMode ? 'text-emerald-500' : 'text-zinc-500'}`}>CRACK TIME</span>
                  <span className="text-xs font-black text-emerald-400 uppercase mt-1 block">
                    {entropyData.time}
                  </span>
                </div>
              </div>

              <div className={`text-xs leading-relaxed p-3 border ${
                terminalMode ? 'bg-black/80 border-emerald-500/40 text-emerald-400 font-mono' : 'bg-zinc-900 border-white/10 text-zinc-400'
              }`}>
                <Info className={`w-4 h-4 inline mr-1 ${terminalMode ? 'text-emerald-400' : 'text-amber-400'}`} />
                Entropy measures unpredictability in bits. Passwords with &gt;60 bits entropy withstand GPU dictionary attacks.
              </div>
            </div>

            {/* Tool 2: Security Header Auditor */}
            <div className={`border p-6 space-y-6 transition-all ${
              terminalMode
                ? 'bg-[#030803] border-emerald-500/60 text-emerald-300 font-mono shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                : 'bg-zinc-950 border-white/10'
            }`}>
              {terminalMode && (
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/40 text-[10px] text-emerald-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="ml-2 font-bold text-emerald-300">tty4 — header_audit.sh</span>
                  </div>
                  <span className="text-emerald-500/80 font-bold hidden sm:inline">[HTTP AUDITOR]</span>
                </div>
              )}

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-white font-black uppercase text-sm">
                  <SearchCheck className={`w-5 h-5 ${terminalMode ? 'text-emerald-400' : 'text-zinc-300'}`} />
                  <span className={terminalMode ? 'text-emerald-300 font-mono' : ''}>Security Header Auditor</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-[10px] uppercase tracking-widest font-bold ${terminalMode ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  Domain URL to Audit:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={headerUrl}
                    onChange={(e) => setHeaderUrl(e.target.value)}
                    className={`flex-1 p-3 text-xs focus:outline-none font-mono ${
                      terminalMode
                        ? 'bg-black border border-emerald-500 text-emerald-300 placeholder-emerald-700'
                        : 'bg-[#0A0A0A] border border-white/10 text-white'
                    }`}
                  />
                  <button
                    onClick={handleHeaderAudit}
                    disabled={auditingHeaders}
                    className={`px-5 py-3 font-black text-xs uppercase tracking-wider ${
                      terminalMode
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                        : 'bg-white text-black'
                    }`}
                  >
                    {auditingHeaders ? 'Auditing...' : 'Audit'}
                  </button>
                </div>
              </div>

              <div className="space-y-2 font-mono">
                {[
                  { name: 'Strict-Transport-Security (HSTS)', status: 'PASS', note: 'max-age=31536000' },
                  { name: 'Content-Security-Policy (CSP)', status: 'PASS', note: 'script-src self' },
                  { name: 'X-Frame-Options', status: 'PASS', note: 'DENY' },
                  { name: 'X-Content-Type-Options', status: 'PASS', note: 'nosniff' },
                  { name: 'Referrer-Policy', status: 'PASS', note: 'strict-origin-when-cross-origin' },
                ].map((hdr, idx) => (
                  <div
                    key={idx}
                    className={`p-3 border flex items-center justify-between text-xs ${
                      terminalMode ? 'bg-black border-emerald-500/40 text-emerald-300' : 'bg-zinc-900 border-white/10'
                    }`}
                  >
                    <div>
                      <span className={`font-bold uppercase block ${terminalMode ? 'text-emerald-300' : 'text-white'}`}>{hdr.name}</span>
                      <span className={`text-[10px] ${terminalMode ? 'text-emerald-500' : 'text-zinc-500'}`}>{hdr.note}</span>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {hdr.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};
