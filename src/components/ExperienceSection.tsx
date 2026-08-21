import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Award,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative">
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
            CAREER MILESTONES
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            EXPERIENCE & TIMELINE
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
            A chronological timeline of active SOC incident response roles, ethical hacking milestones, and vulnerability research projects.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l-2 border-white/20 ml-3 sm:ml-8 space-y-10 sm:space-y-12 pl-5 sm:pl-10 max-w-4xl mx-auto">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Icon Marker */}
              <div className="absolute -left-[21px] sm:-left-[47px] top-0 w-8 h-8 sm:w-10 sm:h-10 bg-white text-black flex items-center justify-center font-black shadow-lg">
                {exp.type === 'Work' && <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-black" />}
                {exp.type === 'Certification' && <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-black" />}
                {exp.type === 'Education' && <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-black" />}
              </div>

              {/* Card Container */}
              <div className="bg-zinc-950 border border-white/10 hover:border-white/40 p-4 sm:p-8 space-y-5 sm:space-y-6 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-zinc-300 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mt-0.5">
                      {exp.organization}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-3 py-1 bg-zinc-900 text-white border border-white/10 font-bold uppercase">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {exp.period}
                    </span>
                    <span className="text-zinc-400 flex items-center gap-1 uppercase font-bold">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements Bullet List */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-zinc-400 font-mono uppercase tracking-widest block">
                    KEY ACHIEVEMENTS & DELIVERABLES:
                  </span>
                  <div className="space-y-2">
                    {exp.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-zinc-900 border border-white/10 text-zinc-300 text-[10px] font-mono font-bold uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
