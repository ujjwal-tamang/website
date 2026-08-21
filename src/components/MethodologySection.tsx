import React from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Radar,
  Bug,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'PASSIVE RECON & OSINT',
      subtitle: 'Footprinting & Attack Surface Discovery',
      icon: <Search className="w-5 h-5 text-black" />,
      desc: 'Mapping target domain infrastructure, DNS records, public OSINT leaks, subdomains, and exposed technology stacks without triggering IDS alarms.',
      deliverables: ['Subdomain Mapping', 'DNS Enumerate', 'OSINT Credentials Audit'],
    },
    {
      num: '02',
      title: 'VULNERABILITY SCANNING',
      subtitle: 'Automated & Manual CVE Assessment',
      icon: <Radar className="w-5 h-5 text-black" />,
      desc: 'Running customized Nmap scripts, Nessus vulnerability scans, and OWASP ZAP API checks to identify missing patches and misconfigurations.',
      deliverables: ['CVE Identification', 'SSL/TLS Cipher Audit', 'Port Surface Assessment'],
    },
    {
      num: '03',
      title: 'CONTROLLED EXPLOITATION',
      subtitle: 'POC Exploits & Business Logic Audits',
      icon: <Bug className="w-5 h-5 text-black" />,
      desc: 'Authoring custom Python scripts and utilizing Burp Suite Pro to validate high-severity flaws like SQLi, BOLA, RCE, and broken auth controls.',
      deliverables: ['POC Payload Delivery', 'Privilege Escalation Proof', 'OWASP Top 10 Audit'],
    },
    {
      num: '04',
      title: 'TELEMETRY & EDR ISOLATION',
      subtitle: 'Active Incident Response & Triage',
      icon: <ShieldCheck className="w-5 h-5 text-black" />,
      desc: 'Correlating Sysmon and Windows Event logs in SIEM, triggering CrowdStrike Falcon RTR isolation scripts, and extracting RAM memory dumps.',
      deliverables: ['Sub-2 Min Containment', 'YARA Rule Deployment', 'RAM Forensic Triage'],
    },
    {
      num: '05',
      title: 'REMEDIATION & EXECUTIVE REPORTING',
      subtitle: 'Actionable Hardening Guidelines',
      icon: <FileSpreadsheet className="w-5 h-5 text-black" />,
      desc: 'Translating complex technical exploits into executive-level risk reports with clear remediation playbooks for dev & infrastructure teams.',
      deliverables: ['Executive Summary', 'Code Hardening Specs', 'Re-test Verification'],
    },
  ];

  return (
    <section id="methodology" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
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
            STANDARDIZED OPERATIONAL WORKFLOW
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            AUDIT & RESPONSE METHODOLOGY
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
            A structured 5-stage pipeline bridging offensive penetration testing with defensive SOC telemetry and executive remediation.
          </p>
        </div>

        {/* Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 border border-white/10 hover:border-white/40 p-5 space-y-4 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-white font-mono">{step.num}</span>
                  <div className="w-9 h-9 bg-white text-black flex items-center justify-center font-black">
                    {step.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-zinc-200 transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase block mt-0.5">
                    {step.subtitle}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-1 font-mono text-[10px]">
                <span className="text-zinc-500 font-bold uppercase tracking-widest block mb-1">
                  KEY DELIVERABLES:
                </span>
                {step.deliverables.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-1.5 text-zinc-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
