import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  ShieldCheck,
  Activity,
  Network,
  SearchCheck,
  Radar,
  ExternalLink,
  Github,
  X,
  CheckCircle2,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'pentest', label: 'Penetration Testing' },
    { id: 'soc_edr', label: 'SOC & EDR' },
    { id: 'network', label: 'Network Security' },
    { id: 'tooling', label: 'Security Tools' },
    { id: 'intel', label: 'Threat Intel' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative">
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
            CASE STUDIES & AUDITS
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            FEATURED PROJECTS
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
            Production-tested security solutions, exploit research, automated SOC telemetry pipelines, and vulnerability assessment suites.
          </p>

          {/* Category Filters */}
          <div className="pt-4 flex overflow-x-auto no-scrollbar sm:flex-wrap justify-start sm:justify-center gap-1.5 font-mono pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-zinc-950 border border-white/10 hover:border-white/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-24 bg-zinc-900 border-b border-white/10 p-4 flex items-center justify-between relative overflow-hidden">
                  <div className="p-3 bg-white text-black font-black">
                    {project.iconName === 'ShieldCheck' && <ShieldCheck className="w-6 h-6" />}
                    {project.iconName === 'Activity' && <Activity className="w-6 h-6" />}
                    {project.iconName === 'Network' && <Network className="w-6 h-6" />}
                    {project.iconName === 'Terminal' && <Terminal className="w-6 h-6" />}
                    {project.iconName === 'SearchCheck' && <SearchCheck className="w-6 h-6" />}
                    {project.iconName === 'Radar' && <Radar className="w-6 h-6" />}
                  </div>

                  {project.featured && (
                    <span className="px-2.5 py-1 text-[9px] font-black bg-white text-black font-mono tracking-widest uppercase">
                      FEATURED
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-zinc-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                    {project.shortDesc}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-zinc-900 border border-white/10 text-zinc-300 text-[10px] font-mono font-bold uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-1 bg-zinc-900 text-zinc-500 text-[10px] font-mono font-bold">
                        +{project.techStack.length - 4} MORE
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-white/10 flex items-center justify-between mt-4">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-bold font-mono text-white hover:underline flex items-center gap-1 transition-colors uppercase tracking-wider"
                >
                  <span>CASE STUDY</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal Popup */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-zinc-950 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">
                    CASE STUDY DETAILS
                  </span>
                  <h3 className="text-3xl font-black text-white uppercase">{selectedProject.title}</h3>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {selectedProject.longDesc}
                </p>

                {/* Key Findings */}
                <div className="space-y-3 p-4 bg-zinc-900 border border-white/10">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">
                    KEY AUDIT FINDINGS & DELIVERABLES:
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.keyFindings.map((finding, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Tech Stack */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 font-mono uppercase tracking-widest">
                    TECHNOLOGY & TOOL STACK:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-zinc-900 border border-white/10 text-white font-mono text-xs font-bold uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 font-mono">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 uppercase"
                  >
                    Close
                  </button>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Repository</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
