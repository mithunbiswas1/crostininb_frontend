// src/app/(pages)/projects/page.jsx

import ProjectsBanner from "./_components/ProjectsBanner";
import ProjectsHighlightsSection from "./_components/ProjectsHighlightsSection";
import ProjectsCTASection from "./_components/ProjectsCTASection";
import ProjectsShowcaseSection from "./_components/ProjectsShowcaseSection";

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsBanner />
      <ProjectsHighlightsSection />
      <ProjectsShowcaseSection />
      {/* <ProjectsCTASection /> */}
    </main>
  );
}
