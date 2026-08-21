export type SkillCategory = 'soc' | 'pentest' | 'threat_intel' | 'network_forensics' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0 to 100
  iconName: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  description: string;
  verified: boolean;
  badgeType: 'ceh' | 'soc' | 'academic' | 'web' | 'comptia' | 'thm' | 'general';
  verifyUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'pentest' | 'soc_edr' | 'network' | 'tooling' | 'intel';
  shortDesc: string;
  longDesc: string;
  keyFindings: string[];
  techStack: string[];
  iconName: string;
  gradient: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Work' | 'Certification' | 'Education';
  description: string;
  achievements: string[];
  skills: string[];
}

export interface ThreatFeedItem {
  id: string;
  cveId: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  description: string;
  ioc: string;
  publishedAt: string;
  affectedSystems: string;
}

export interface IncidentAnalysis {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
  threatName: string;
  mitreTechniques: string[];
  executiveSummary: string;
  rootCauseAnalysis: string;
  containmentPlaybook: string[];
  detectionRuleDraft: string;
}

export interface CommandCheatsheet {
  id: string;
  tool: string;
  category: 'pentest' | 'soc' | 'forensics' | 'scripting';
  description: string;
  command: string;
  explanation: string;
}

export interface SecurityPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  capabilities: string[];
}
