// src/app/(home)/_components/IndustriesSection.jsx

import {
  FaHeartbeat,
  FaUniversity,
  FaShoppingCart,
  FaGraduationCap,
  FaHome,
  FaPlane,
  FaTruck,
  FaLaptopCode,
  FaGamepad,
  FaRobot,
  FaPhotoVideo,
  FaBuilding,
} from "react-icons/fa";

import { H2, H4, P } from "@/components/ui/Typography";

const industries = [
  {
    title: "Healthcare",
    icon: FaHeartbeat,
    description:
      "HIPAA-ready healthcare platforms, telemedicine and patient management systems.",
  },
  {
    title: "FinTech",
    icon: FaUniversity,
    description:
      "Secure financial software, payment gateways and digital banking solutions.",
  },
  {
    title: "E-Commerce",
    icon: FaShoppingCart,
    description:
      "Scalable online stores, marketplaces and omnichannel commerce platforms.",
  },
  {
    title: "Education",
    icon: FaGraduationCap,
    description:
      "Learning management systems, e-learning platforms and educational apps.",
  },
  {
    title: "Real Estate",
    icon: FaHome,
    description:
      "Property listing portals, CRM systems and real estate management solutions.",
  },
  {
    title: "Travel & Tourism",
    icon: FaPlane,
    description:
      "Booking engines, travel portals and tourism-focused digital experiences.",
  },
  {
    title: "Logistics",
    icon: FaTruck,
    description:
      "Fleet management, shipment tracking and supply chain software solutions.",
  },
  {
    title: "SaaS Products",
    icon: FaLaptopCode,
    description:
      "Multi-tenant SaaS applications designed for scale, growth and reliability.",
  },
  {
    title: "Gaming",
    icon: FaGamepad,
    description:
      "Game development, multiplayer systems and interactive entertainment platforms.",
  },
  {
    title: "AI & Automation",
    icon: FaRobot,
    description:
      "AI-powered applications, workflow automation and intelligent assistants.",
  },
  {
    title: "Media & Entertainment",
    icon: FaPhotoVideo,
    description:
      "Streaming platforms, content delivery systems and engagement tools.",
  },
  {
    title: "Enterprise",
    icon: FaBuilding,
    description:
      "Custom enterprise software, ERP systems and digital transformation projects.",
  },
];

export default function IndustriesSection() {
  return (
    <section className="py-15 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <H2 className="font-bold mb-8">Industries We Serve</H2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <div
                key={industry.title}
                className="group bg-gray-100 rounded-2xl p-6 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Icon
                  size={34}
                  className="mb-5 transition-transform duration-300 group-hover:scale-110"
                />

                <H4 className="font-bold mb-3">{industry.title}</H4>
                <P className="opacity-80">{industry.description}</P>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
