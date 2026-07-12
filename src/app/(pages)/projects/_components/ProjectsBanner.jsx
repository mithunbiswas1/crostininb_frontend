// src/app/(pages)/projects/_components/ProjectsBanner.jsx

import { H1, H6 } from "@/components/ui/Typography";

export default function ProjectsBanner() {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(/projects/projects_banner.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 text-center max-w-4xl mt-10 px-4">
        <H1 className="text-gray-50">Our Projects</H1>

        <H6 className="text-gray-50 mt-2">
          We deliver world-class digital solutions across industries.
        </H6>
      </div>
    </section>
  );
}
