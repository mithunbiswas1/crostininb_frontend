// src/app/(service)/_components/IndustriesSection.jsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { H2, H4, P } from "@/components/ui/Typography";

function IndustryCard({ industry }) {
  return (
    <div className="group border border-gray-200 bg-gray-50 p-4 lg:p-6 transition hover:border-gray-300">
      <H4 className="font-bold mb-4">{industry.title}</H4>

      <P className="text-gray-600 mb-8">{industry.description}</P>

      <div className="hidden lg:flex justify-end">
        <ArrowRight size={18} />
      </div>
    </div>
  );
}

export default function IndustriesSection({ industriesData }) {
  return (
    <section className="py-15 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <div>
            <H2 className="font-bold">{industriesData.heading}</H2>
          </div>

          <div>
            <P className="text-gray-600">{industriesData.description}</P>
          </div>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {industriesData.industries.map((industry) => (
            <IndustryCard key={industry.title} industry={industry} />
          ))}

          {/* CTA Card */}
          <div className="bg-black text-gray-50 p-4 flex flex-col justify-center items-center text-center min-h-[240px]">
            <H4 className="text-gray-50 font-bold mb-6">
              {industriesData.ctaText}
            </H4>

            <Link
              href={industriesData.ctaButtonLink}
              className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 rounded-full bg-green-500 text-black font-medium"
            >
              {industriesData.ctaButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
