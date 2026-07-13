// src/app/(solutions)/_components/SolutionOverviewSection.jsx

import { H2, H3, P } from "@/components/ui/Typography";

const overviewPoints = [
  {
    title: "Unified Business System",
    description:
      "Integrate finance, HR, inventory, sales, and operations into a single ERP ecosystem for better control and visibility.",
  },
  {
    title: "Real-Time Data Insights",
    description:
      "Make faster decisions with real-time dashboards, analytics, and reporting across all business units.",
  },
  {
    title: "Scalable Architecture",
    description:
      "Built to scale with your business growth, from small enterprises to large multinational organizations.",
  },
];

export default function SolutionOverviewSection() {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 lg:px-20">
        {/* Header */}
        <div className="max-w-4xl mb-10">
          <H2 className="font-bold mb-6">
            ERP That Connects Every Part of Your Business
          </H2>

          <P className="text-gray-600">
            Our ERP solutions eliminate silos and bring all your business
            operations into one intelligent system designed for efficiency,
            automation, and growth.
          </P>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3">
          {overviewPoints.map((item, index) => (
            <div
              key={index}
              className={`py-4 ${
                index !== 0 ? "md:border-l border-gray-300 px-6" : ""
              }`}
            >
              <H3 className="font-bold mb-5">{item.title}</H3>

              <P className="text-gray-600 leading-relaxed">
                {item.description}
              </P>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
