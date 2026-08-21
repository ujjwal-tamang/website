import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SecurityArsenalSection } from './components/SecurityArsenalSection';
import { MethodologySection } from './components/MethodologySection';
import { ProjectsSection } from './components/ProjectsSection';
import { CybersecurityInsightsSection } from './components/CybersecurityInsightsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Intersection Observer for scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'arsenal', 'methodology', 'projects', 'insights', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={navigateToSection} />

      {/* Main Content Sections */}
      <main>
        <Hero onNavigate={navigateToSection} />
        <AboutSection />
        <SecurityArsenalSection />
        <MethodologySection />
        <ProjectsSection />
        <CybersecurityInsightsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateToSection} />
    </div>
  );
}
