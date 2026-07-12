"use client";

import Link from "next/link";
import { H2, H3, P } from "@/components/ui/Typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

const faqs = [
  {
    question: "Which package is best for my business?",
    answer:
      "Our Starter package is ideal for small businesses and startups, while Growth and Enterprise packages are designed for scaling companies that require advanced features, dedicated support, and custom solutions.",
  },
  {
    question: "Can I upgrade my package later?",
    answer:
      "Yes. You can upgrade your package at any time as your business grows. We'll help ensure a smooth transition with no disruption to your services.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No. Our pricing is transparent, and all package inclusions are clearly outlined before the project begins.",
  },
  {
    question: "Do you offer custom packages?",
    answer:
      "Absolutely. If our standard packages don't fit your requirements, we can create a tailored solution based on your goals, timeline, and budget.",
  },
  {
    question: "What is included in ongoing support?",
    answer:
      "Support may include bug fixes, maintenance, performance monitoring, security updates, and technical assistance depending on the selected package.",
  },
  {
    question: "How does the payment process work?",
    answer:
      "Payments are typically divided into milestones. The exact structure depends on the project scope and package selected.",
  },
  {
    question: "How long does it take to get started?",
    answer:
      "Most projects can begin within a few business days after finalizing the package, requirements, and agreement.",
  },
  {
    question: "Can I switch to a custom enterprise solution later?",
    answer:
      "Yes. Many clients start with a standard package and later move to a fully customized enterprise engagement as their needs evolve.",
  },
];

export default function PackageFAQSection() {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Sticky Left Panel */}
          <div className="lg:sticky lg:top-20 h-fit">
            <H2 className="font-bold mb-8">Frequently Asked Questions</H2>

            <div className="bg-white p-4 lg:p-8 rounded-sm">
              <H3 className="mb-5">
                Flexible packages built for every stage of growth
              </H3>

              <P className="text-gray-600 mb-8">
                Whether you're launching a startup, scaling a business, or
                managing enterprise operations, our packages provide the
                flexibility, support, and expertise needed to achieve your
                goals.
              </P>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-4 bg-black text-white rounded-full font-medium hover:opacity-90 transition"
              >
                Talk to the Team
              </Link>
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border-0 px-4 lg:px-6"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold py-8 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-gray-600 pb-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
