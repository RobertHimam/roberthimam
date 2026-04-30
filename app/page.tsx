import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection, LanguagesSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { Footer } from "@/components/layout/Footer";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <AchievementsSection />
      <ProjectsSection />
      <BlogSection />
      <SkillsSection />
      <LanguagesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
