// src/app/(pages)/case-studies/_components/CTASection.jsx

import Link from "next/link";
import { H2, P } from "@/components/ui/Typography";

export default function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <H2>Ready to Create Your Success Story?</H2>

        <P className="mt-6">
          Let's discuss your project and see how we can help you achieve similar
          results for your business.
        </P>

        <Link
          href="/contact"
          className="inline-block mt-8 px-8 py-4 bg-primary text-white rounded-xl hover:opacity-90 transition"
        >
          Start Your Project
        </Link>
      </div>
    </section>
  );
}
