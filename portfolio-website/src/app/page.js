import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import SocialLinks from './components/SocialLinks';

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />

      {/* Contact Section */}
      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8" id="contact">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-foreground/80 mb-8">
            I'm always open to new opportunities and collaborations.
            Feel free to reach out!
          </p>
          <SocialLinks />
        </div>
      </section>
    </main>
  );
} 