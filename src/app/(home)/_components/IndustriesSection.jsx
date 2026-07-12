// src/app/(home)/_components/IndustriesSection.jsx

import Image from "next/image";
import { H2, H3, H5, P } from "@/components/ui/Typography";

const industries = [
  {
    title: "Healthcare",
    category: "Industry",
    image: "/home/industries/healthcare.png",
    description:
      "HIPAA-ready healthcare platforms, telemedicine and patient management systems.",
  },
  {
    title: "FinTech",
    category: "Industry",
    image: "/home/industries/fintech.jpg",
    description:
      "Secure financial software, payment gateways and digital banking solutions.",
  },
  {
    title: "E-Commerce",
    category: "Industry",
    image: "/home/industries/ecommerce.jpg",
    description:
      "Scalable online stores, marketplaces and omnichannel commerce platforms.",
  },
  {
    title: "Education",
    category: "Industry",
    image: "/home/industries/education.png",
    description:
      "Learning management systems, e-learning platforms and educational apps.",
  },
  {
    title: "Real Estate",
    category: "Industry",
    image: "/home/industries/real-estate.jpg",
    description:
      "Property listing portals, CRM systems and real estate management solutions.",
  },
  {
    title: "Travel & Tourism",
    category: "Industry",
    image: "/home/industries/travel.png",
    description:
      "Booking engines, travel portals and tourism-focused digital experiences.",
  },
  {
    title: "Logistics",
    category: "Industry",
    image: "/home/industries/logistics.jpg",
    description:
      "Fleet management, shipment tracking and supply chain software solutions.",
  },
  {
    title: "SaaS Products",
    category: "Industry",
    image: "/home/industries/saas.png",
    description:
      "Multi-tenant SaaS applications designed for scale, growth and reliability.",
  },
  {
    title: "Gaming",
    category: "Industry",
    image: "/home/industries/gaming.png",
    description:
      "Game development, multiplayer systems and interactive entertainment platforms.",
  },
  {
    title: "AI & Automation",
    category: "Industry",
    image: "/home/industries/ai.jpg",
    description:
      "AI-powered applications, workflow automation and intelligent assistants.",
  },
  {
    title: "Media & Entertainment",
    category: "Industry",
    image: "/home/industries/media.png",
    description:
      "Streaming platforms, content delivery systems and engagement tools.",
  },
  {
    title: "Enterprise",
    category: "Industry",
    image: "/home/industries/enterprise.png",
    description:
      "Custom enterprise software, ERP systems and digital transformation projects.",
  },
];

export default function IndustriesSection() {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <H2 className="font-bold mb-8">Industries We Serve</H2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl"
            >
              {/* Background Image */}
              <Image
                src={industry.image}
                alt={industry.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/65 group-hover:bg-gradient-to-t group-hover:from-black/90 group-hover:via-black/60 group-hover:to-transparent transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-3 lg:p-5 flex flex-col text-white">
                <H5 className="text-white font-semibold">
                  {industry.category}
                </H5>

                <div className="mt-auto">
                  <H3 className="font-bold text-white mb-3">
                    {industry.title}
                  </H3>

                  <P className="hidden lg:block text-white/90 opacity-0 group-hover:opacity-100 transition duration-300">
                    {industry.description}
                  </P>

                  {/* <div className="flex justify-end mt-6">
                    <ArrowRight
                      size={32}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
