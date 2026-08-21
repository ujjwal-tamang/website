import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  Linkedin,
  Github,
  Facebook,
  Twitter,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Security Audit / SOC Consulting',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Security Audit / SOC Consulting',
        message: '',
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] border-t border-white/10 relative">
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
            ENGAGEMENT & ESCALATION
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            INITIATE CONTACT
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
            Ready to collaborate on SOC operations, penetration audits, or security architecture? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-950 border border-white/10 p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-white" />
                <span>DIRECT CONTACT INFO</span>
              </h3>

              <div className="space-y-3 font-mono">
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="p-4 bg-zinc-900 hover:bg-zinc-800 border border-white/10 flex items-center gap-4 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold block uppercase">PRIMARY EMAIL</span>
                    <span className="text-xs font-bold text-white group-hover:underline">
                      {PROFILE_DATA.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${PROFILE_DATA.phone}`}
                  className="p-4 bg-zinc-900 hover:bg-zinc-800 border border-white/10 flex items-center gap-4 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold block uppercase">PHONE / WHATSAPP</span>
                    <span className="text-xs font-bold text-white group-hover:underline">
                      {PROFILE_DATA.phone}
                    </span>
                  </div>
                </a>

                <div className="p-4 bg-zinc-900 border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold block uppercase">LOCATION</span>
                    <span className="text-xs font-bold text-white">
                      {PROFILE_DATA.location}
                    </span>
                  </div>
                </div>

                <a
                  href={`https://${PROFILE_DATA.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-zinc-900 hover:bg-zinc-800 border border-white/10 flex items-center gap-4 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold block uppercase">PERSONAL DOMAIN</span>
                    <span className="text-xs font-bold text-white group-hover:underline">
                      {PROFILE_DATA.website}
                    </span>
                  </div>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] font-bold text-zinc-400 font-mono uppercase tracking-widest block mb-3">
                  PROFESSIONAL NETWORKS:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <a
                    href={PROFILE_DATA.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-900 hover:bg-white hover:text-black text-white border border-white/10 flex items-center justify-center transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={PROFILE_DATA.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-900 hover:bg-white hover:text-black text-white border border-white/10 flex items-center justify-center transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={PROFILE_DATA.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-900 hover:bg-white hover:text-black text-white border border-white/10 flex items-center justify-center transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={PROFILE_DATA.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-900 hover:bg-white hover:text-black text-white border border-white/10 flex items-center justify-center transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Form */}
          <div className="lg:col-span-7 bg-zinc-950 border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-black text-white uppercase">SEND TRANSMISSION</h3>
                <span className="text-xs text-zinc-400 font-mono">Encrypted inquiry channel</span>
              </div>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 font-bold">
                <Clock className="w-3.5 h-3.5" /> &lt;2 HR RESPONSE
              </span>
            </div>

            {isSubmitted ? (
              <div className="p-8 bg-white text-black text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto font-black">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-xl font-black uppercase">MESSAGE TRANSMITTED</h4>
                <p className="text-xs font-bold max-w-sm mx-auto text-zinc-700">
                  Thank you for reaching out! Your message has been routed to Ujjwal Tamang.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Full Name:</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Alex Mercer"
                      className="w-full bg-[#0A0A0A] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Email Address:</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@enterprise.com"
                      className="w-full bg-[#0A0A0A] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Subject Category:</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-white/40 font-mono uppercase"
                  >
                    <option value="Security Audit / SOC Consulting">Security Audit / SOC Consulting</option>
                    <option value="Penetration Testing Engagement">Penetration Testing Engagement</option>
                    <option value="Career Opportunity / Interview">Career Opportunity / Interview</option>
                    <option value="General Technical Inquiry">General Technical Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Your Message:</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your security requirements, engagement scope, or inquiry..."
                    className="w-full bg-[#0A0A0A] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-white/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 px-4 bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
