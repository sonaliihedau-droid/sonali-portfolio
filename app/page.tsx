import Footer from "./components/Footer";
import HomeScene from "./components/HomeScene";
import ProjectsSection from "./components/ProjectsSection";
import SketchbookSection from "./components/SketchbookSection";

// The footer belongs to the home page only; project pages end on their last piece.
export default function Home() {
  return (
    <>
      <main>
        <HomeScene />
        <ProjectsSection />
        <SketchbookSection />
      </main>
      <Footer />
    </>
  );
}
