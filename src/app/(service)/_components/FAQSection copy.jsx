// src/app/(service)/_components/FAQSection.jsx

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
    question: "Why should I choose Soft Industry Alliance for app development?",
    answer:
      "We combine strategy, design, development, testing, and post-launch support under one roof, delivering scalable mobile applications tailored to your business goals.",
  },
  {
    question: "How much does it cost to build a mobile application?",
    answer:
      "The cost depends on app complexity, features, integrations, platforms, and timeline. We provide tailored estimates after understanding your requirements.",
  },
  {
    question: "How long does it take to develop a mobile app?",
    answer:
      "A typical MVP takes 8–16 weeks, while larger enterprise applications can take several months depending on scope and complexity.",
  },
  {
    question: "How do you ensure app quality and security?",
    answer:
      "We follow rigorous QA processes, automated testing, code reviews, security audits, and performance optimization throughout the development lifecycle.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer:
      "Yes. We regularly integrate mobile applications with CRMs, ERPs, payment gateways, analytics platforms, and third-party APIs.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Absolutely. We offer maintenance, monitoring, bug fixes, feature enhancements, security updates, and long-term technical support.",
  },
  {
    question: "Can you build both Android and iOS apps?",
    answer:
      "Yes. We develop native Android and iOS apps as well as cross-platform solutions using Flutter and React Native.",
  },
  {
    question: "Do you sign NDAs before starting a project?",
    answer:
      "Yes. We are happy to sign an NDA to protect your intellectual property and business information before discussing project details.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 ">
          {/* Sticky Left Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <H2 className="font-bold mb-8">Frequently Asked Questions</H2>

            <div className="bg-gray-50 p-4 lg:p-8 rounded-sm">
              <H3 className="mb-5">
                Mobile app services that accelerate growth
              </H3>

              <P className="text-gray-600 mb-8">
                From product strategy and UI/UX design to development,
                deployment, and maintenance, we help businesses launch
                high-performing mobile applications that deliver measurable
                results.
              </P>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-4 bg-black text-gray-50 rounded-full font-medium hover:opacity-90 transition"
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
                  className="bg-gray-50 border-0 px-4 lg:px-6"
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
