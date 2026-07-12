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

export default function FAQSection({faqData}) {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Sticky Left Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <H2 className="font-bold mb-8">{faqData.heading}</H2>

            <div className="bg-white p-4 lg:p-8 rounded-sm">
              <H3 className="mb-5">{faqData.sidebarTitle}</H3>

              <P className="text-gray-600 mb-8">
                {faqData.sidebarDescription}
              </P>

              <Link
                href={faqData.sidebarButtonLink}
                className="inline-flex items-center justify-center px-7 py-4 bg-black text-white rounded-full font-medium hover:opacity-90 transition"
              >
                {faqData.sidebarButtonText}
              </Link>
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.faqs.map((faq, index) => (
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
