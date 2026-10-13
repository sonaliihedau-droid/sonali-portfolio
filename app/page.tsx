import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HomeScene from "./components/HomeScene";
import ProjectsSection from "./components/ProjectsSection";
import SketchbookSection from "./components/SketchbookSection";

export default function Home() {
  return (
    <main>
      <HomeScene />
      <ProjectsSection />
      <SketchbookSection />
      {/* Phones only; wider screens open About from the moon instead. */}
      <AboutSection />
      <ContactSection />
    </main>
  );
}
