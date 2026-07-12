// src/app/(service)/_components/DevelopmentProcessSection.jsx

import { H2, P } from "@/components/ui/Typography";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We analyze your business goals, target audience, competitors, and technical requirements to define a clear product vision.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Our team creates a roadmap, feature prioritization plan, and technology architecture aligned with your business objectives.",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "We craft intuitive user journeys, wireframes, and visually engaging interfaces focused on usability and conversion.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Using modern frameworks and best practices, we build scalable, secure, and high-performance mobile applications.",
  },
  {
    number: "05",
    title: "Testing",
    description:
      "Comprehensive QA testing ensures flawless performance, security, responsiveness, and cross-device compatibility.",
  },
  {
    number: "06",
    title: "Deployment",
    description:
      "We handle App Store and Google Play deployment, ensuring a smooth launch with proper compliance and optimization.",
  },
  {
    number: "07",
    title: "Growth & Optimization",
    description:
      "Post-launch, we monitor analytics, gather user feedback, and continuously improve engagement and performance.",
  },
  {
    number: "08",
    title: "Support & Maintenance",
    description:
      "Our dedicated team provides updates, bug fixes, security patches, and ongoing technical support for long-term success.",
  },
];

function ProcessCard({ step, dark }) {
  return (
    <div
      className={`p-8 lg:p-10 flex flex-col ${
        dark ? "bg-black text-gray-50" : "bg-gray-100 text-black"
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

export default function DevelopmentProcessSection() {
  return (
    <section className="py-15 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mb-10">
          <H2 className="font-bold mb-8">
            Our Structured Mobile App Development Approach
          </H2>

          <P className="text-gray-600">
            Excellence drives everything we build. From strategy and design to
            deployment and long-term support, our proven development lifecycle
            ensures scalable mobile solutions that exceed business expectations.
          </P>
        </div>

        {/* Process Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
          {processSteps.map((step, index) => (
            <ProcessCard key={step.number} step={step} dark={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
