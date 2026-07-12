// src/app/(solutions)/_components/SolutionFAQSection.jsx

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
    question: "What is an ERP system and how does it help my business?",
    answer:
      "An ERP system integrates core business processes like finance, HR, inventory, and operations into a single platform, improving efficiency and decision-making.",
  },
  {
    question: "How long does it take to implement an ERP solution?",
    answer:
      "Implementation time depends on complexity, but typically ranges from a few weeks for basic setups to several months for enterprise-level systems.",
  },
  {
    question: "Can ERP be customized for my business needs?",
    answer:
      "Yes. Our ERP solutions are fully customizable to match your workflows, industry requirements, and operational structure.",
  },
  {
    question: "Is ERP suitable for small businesses?",
    answer:
      "Yes. ERP systems can be scaled for small, medium, and large enterprises depending on their operational needs and growth stage.",
  },
  {
    question: "Can ERP integrate with existing tools and software?",
    answer:
      "Absolutely. We integrate ERP systems with CRMs, accounting tools, payment gateways, and third-party APIs.",
  },
  {
    question: "Do you provide support after ERP deployment?",
    answer:
      "Yes. We offer continuous support, maintenance, updates, and optimization to ensure long-term system performance.",
  },
  {
    question: "Is ERP secure for sensitive business data?",
    answer:
      "Yes. We implement enterprise-grade security including encryption, role-based access control, and regular security audits.",
  },
  {
    question: "Can ERP grow with my business?",
    answer:
      "Yes. Our ERP systems are designed with scalability in mind, allowing you to add new modules and users as your business expands.",
  },
];

export default function SolutionFAQSection() {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Sticky Left Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <H2 className="font-bold mb-8">FAQ About ERP</H2>

            <div className="bg-gray-50 p-8 lg:p-10 rounded-sm">
              <H3 className="mb-5">
                Everything you need to know before starting ERP
              </H3>

              <P className="text-gray-600 mb-8">
                We help businesses design, build, and implement ERP systems that
                unify operations, improve efficiency, and support long-term
                growth.
              </P>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-4 bg-black text-gray-50 rounded-full font-medium hover:opacity-90 transition"
              >
                Talk to Experts
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
                  className="bg-gray-50 border-0 px-6 lg:px-8"
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
