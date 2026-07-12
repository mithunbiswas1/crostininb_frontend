// src/app/(service)/_components/DevelopmentProcessSection.jsx

import { H2, P } from "@/components/ui/Typography";

function ProcessCard({ step, dark }) {
  return (
    <div
      className={`p-8 lg:p-10 flex flex-col ${
        dark ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="text-6xl lg:text-7xl font-bold tracking-tight">
        {step.number}
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>

        <P className={dark ? "text-gray-300" : "text-gray-600"}>
          {step.description}
        </P>
      </div>
    </div>
  );
}

export default function DevelopmentProcessSection({developmentProcessData}) {
  return (
    <section className="py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mb-10">
          <H2 className="font-bold mb-8">{developmentProcessData.heading}</H2>

          <P className="text-gray-600">{developmentProcessData.description}</P>
        </div>

        {/* Process Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
          {developmentProcessData.processSteps.map((step, index) => (
            <ProcessCard key={step.number} step={step} dark={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}