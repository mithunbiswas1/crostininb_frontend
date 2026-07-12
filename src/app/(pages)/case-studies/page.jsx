// src/app/(pages)/case-studies/page.jsx

import PageBanner from "@/components/shared/PageBanner";
import CaseStudiesGrid from "./_components/CaseStudiesGrid";
import CTASection from "./_components/CTASection";

export default function CaseStudiesPage() {
  return (
    <main>
      <PageBanner
        title="Case Studies"
        subtitle="Discover how we've helped businesses transform their ideas into successful digital products through innovation and expertise."
        backgroundImage="/case-studies/case-studies-banner.webp"
      />

      <CaseStudiesGrid />
      <CTASection />
    </main>
  );
}
