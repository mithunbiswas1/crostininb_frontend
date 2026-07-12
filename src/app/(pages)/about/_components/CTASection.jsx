// src/app/(pages)/about/_components/CTASection.jsx

import Link from "next/link";
import { H2, P } from "@/components/ui/Typography";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <H2>Let's Build Something Amazing Together</H2>

        <P className="mt-6">
          Whether you're a startup or an enterprise, we're ready to help bring
          your vision to life.
        </P>

        <Link
          href="/contact"
          className="inline-block mt-8 px-8 py-4 bg-primary text-white rounded-xl"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
