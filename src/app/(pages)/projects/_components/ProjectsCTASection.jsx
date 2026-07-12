// src/app/(pages)/projects/_components/ProjectsCTASection.jsx

import Link from "next/link";
import { H2, P } from "@/components/ui/Typography";

export default function ProjectsCTASection() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <H2>Have a Project in Mind?</H2>

        <P className="mt-6 text-gray-600">
          Let’s turn your idea into a powerful digital product together.
        </P>

        <Link
          href="/contact"
          className="inline-block mt-8 px-8 py-4 bg-primary text-white rounded-xl"
        >
          Start Your Project
        </Link>
      </div>
    </section>
  );
}
