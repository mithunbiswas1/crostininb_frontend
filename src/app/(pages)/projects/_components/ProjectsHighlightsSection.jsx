// src/app/(pages)/projects/_components/ProjectsHighlightsSection.jsx

import { H2, H3, P } from "@/components/ui/Typography";

const highlights = [
  {
    title: "End-to-End Delivery",
    description:
      "We handle everything from idea to deployment ensuring complete product success.",
  },
  {
    title: "Scalable Architecture",
    description:
      "Every project is built with scalability and long-term growth in mind.",
  },
  {
    title: "User-Centered Design",
    description: "We focus on clean UX that improves engagement and retention.",
  },
];

export default function ProjectsHighlightsSection() {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mb-10">
          <H2 className="font-bold mb-6">Why Our Projects Stand Out</H2>

          <P className="text-gray-600">
            We don’t just build software — we build scalable digital products
            that solve real business problems and deliver measurable impact.
          </P>
        </div>

        <div className="grid md:grid-cols-3">
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`
                py-4
                ${index !== 0 ? "md:border-l border-gray-300 px-6" : "pr-6"}
              `}
            >
              <H3 className="font-bold mb-5">{item.title}</H3>
              <P className="text-gray-600">{item.description}</P>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
