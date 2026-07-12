// src/app/(solutions)/_components/SolutionIndustriesSection.jsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { H2, H4, P } from "@/components/ui/Typography";

const industries = [
  {
    title: "Healthcare",
    description:
      "HIPAA-compliant healthcare solutions, telemedicine platforms, patient engagement apps, and remote care systems.",
  },
  {
    title: "Fintech",
    description:
      "Digital banking, payment gateways, investment platforms, e-wallets, and secure financial management applications.",
  },
  {
    title: "E-Commerce",
    description:
      "Marketplace platforms, mobile shopping experiences, inventory management, and personalized customer journeys.",
  },
  {
    title: "Logistics & Transportation",
    description:
      "Fleet management, route optimization, shipment tracking, and real-time logistics monitoring solutions.",
  },
  {
    title: "Education",
    description:
      "E-learning platforms, virtual classrooms, student engagement apps, and learning management systems.",
  },
  {
    title: "Real Estate",
    description:
      "Property listing platforms, virtual property tours, CRM integrations, and lead generation applications.",
  },
  {
    title: "Travel & Hospitality",
    description:
      "Booking platforms, itinerary management, loyalty programs, and personalized travel experiences.",
  },
  {
    title: "Food & Restaurant",
    description:
      "Food delivery solutions, restaurant management systems, online ordering, and customer loyalty apps.",
  },
  {
    title: "Fitness & Wellness",
    description:
      "Workout tracking, wearable integrations, nutrition planning, and health monitoring applications.",
  },
  {
    title: "Agriculture",
    description:
      "Smart farming solutions, crop monitoring, supply chain visibility, and agricultural data analytics.",
  },
  {
    title: "Enterprise Solutions",
    description:
      "Custom enterprise applications, workflow automation, internal tools, and operational management systems.",
  },
];

function IndustryCard({ industry }) {
  return (
    <div className="group border border-gray-200 bg-white p-4 lg:p-6 transition hover:border-gray-300">
      <H4 className="font-bold mb-4">{industry.title}</H4>

      <P className="text-gray-600 mb-8">{industry.description}</P>

      <div className="hidden lg:flex justify-end">
        <ArrowRight
          size={18}
          // className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </div>
  );
}

export default function SolutionIndustriesSection() {
  return (
    <section className="py-15 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <div>
            <H2 className="font-bold">
              Specialized Dashboard Solutions for Every Industry
            </H2>
          </div>

          <div>
            <P className="text-gray-600">
              We build industry-focused Dashboardlications that solve
              real-world challenges. Our expertise spans diverse sectors,
              enabling businesses to accelerate growth through innovative
              digital products.
            </P>
          </div>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry) => (
            <IndustryCard key={industry.title} industry={industry} />
          ))}

          {/* CTA Card */}
          <div className="bg-black text-white p-4 flex flex-col justify-center items-center text-center min-h-[240px]">
            <H4 className="text-white font-bold mb-6">
              Let's Turn Your Vision Into a Market-Leading Dashboard
            </H4>

            <Link
              href="/contact"
              className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 rounded-full bg-green-500 text-black font-medium"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
