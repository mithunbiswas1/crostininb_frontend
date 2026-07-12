// src/app/(pages)/about/_components/CoreValuesSection.jsx

import {
  Users,
  Lightbulb,
  ShieldCheck,
  Award,
  BookOpen,
  Handshake,
} from "lucide-react";

import { H2, H3, H4, P } from "@/components/ui/Typography";

const values = [
  {
    title: "Client First",
    icon: Users,
    description:
      "Every solution begins with understanding our clients' goals, challenges, and long-term vision.",
  },
  {
    title: "Innovation",
    icon: Lightbulb,
    description:
      "We embrace modern technologies and creative thinking to build future-ready digital products.",
  },
  {
    title: "Transparency",
    icon: ShieldCheck,
    description:
      "Open communication, honest feedback, and clear processes build trusted relationships.",
  },
  {
    title: "Excellence",
    icon: Award,
    description:
      "We are committed to delivering high-quality solutions that exceed expectations.",
  },
  {
    title: "Continuous Learning",
    icon: BookOpen,
    description:
      "Technology evolves rapidly, and we continuously improve our skills to stay ahead.",
  },
  {
    title: "Long-Term Partnership",
    icon: Handshake,
    description:
      "We focus on building enduring partnerships that support sustainable business growth.",
  },
];

export default function CoreValuesSection() {
  return (
    <section className="py-15 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <H2 className="text-center mb-10">Our Core Values</H2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-3 lg:p-6 transition-all duration-300 hover:-translate-y-0.3 hover:border-primary hover:shadow-xs"
              >
                {/* Gradient Accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="mb-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110">
                    <Icon size={28} />
                  </div>
                </div>

                <H4 className="mb-2">{value.title}</H4>

                <P className="text-gray-600 leading-relaxed">
                  {value.description}
                </P>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
