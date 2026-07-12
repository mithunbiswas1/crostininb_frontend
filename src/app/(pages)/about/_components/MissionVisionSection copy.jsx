// src/app/(pages)/about/_components/MissionVisionSection.jsx

import { Target, Eye } from "lucide-react";
import { H2, H3, P } from "@/components/ui/Typography";

export default function MissionVisionSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <H2 className="text-center mb-12">Mission & Vision</H2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 rounded-2xl">
            <Target size={50} />

            <H3 className="mt-4">Our Mission</H3>

            <P className="mt-4">
              To help businesses transform ideas into scalable digital products
              through innovative technology and exceptional service.
            </P>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <Eye size={50} />

            <H3 className="mt-4">Our Vision</H3>

            <P className="mt-4">
              To become a globally trusted technology partner known for
              innovation, quality, and long-term value.
            </P>
          </div>
        </div>
      </div>
    </section>
  );
}
