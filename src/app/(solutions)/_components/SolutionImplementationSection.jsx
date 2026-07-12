// src/app/(solutions)/_components/SolutionImplementationSection.jsx

import { H2, H3, P } from "@/components/ui/Typography";

const steps = [
  {
    number: "01",
    title: "Business Analysis",
    description:
      "We analyze your business processes, workflows, and requirements to design a tailored ERP roadmap.",
  },
  {
    number: "02",
    title: "System Design",
    description:
      "We define architecture, modules, integrations, and data structure aligned with your business goals.",
  },
  {
    number: "03",
    title: "Development & Customization",
    description:
      "We build and customize ERP modules using scalable and secure modern technologies.",
  },
  {
    number: "04",
    title: "Integration",
    description:
      "We integrate third-party systems like CRM, accounting tools, payment gateways, and APIs.",
  },
  {
    number: "05",
    title: "Testing & QA",
    description:
      "We perform rigorous testing to ensure performance, security, and accuracy across all modules.",
  },
  {
    number: "06",
    title: "Deployment",
    description:
      "We deploy your ERP system with proper configuration, migration, and environment setup.",
  },
  {
    number: "07",
    title: "Training & Onboarding",
    description:
      "We train your team to ensure smooth adoption and efficient usage of the ERP system.",
  },
  {
    number: "08",
    title: "Support & Optimization",
    description:
      "We provide ongoing support, updates, and performance optimization for long-term success.",
  },
];

function StepCard({ step, dark }) {
  return (
    <div
      className={`p-8 lg:p-10 flex flex-col ${
        dark ? "bg-black text-gray-50" : "bg-gray-100 text-black"
      }`}
    >
      {/* Step Number */}
      <div className="text-6xl lg:text-7xl font-bold tracking-tight">
        {step.number}
      </div>

      {/* Content */}
      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>

        <P className={dark ? "text-gray-300" : "text-gray-600"}>
          {step.description}
        </P>
      </div>
    </div>
  );
}

export default function SolutionImplementationSection() {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mb-12">
          <H2 className="font-bold mb-6">
            ERP Implementation Process That Ensures Success
          </H2>

          <P className="text-gray-600 leading-relaxed">
            Our structured ERP implementation approach ensures smooth
            deployment, minimal disruption, and maximum business efficiency from
            day one.
          </P>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} dark={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
