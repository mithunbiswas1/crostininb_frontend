// src/app/(pages)/about/page.jsx

import PageBanner from "@/components/shared/PageBanner";

import ChairmanSection from "./_components/ChairmanSection";
import MissionVisionSection from "./_components/MissionVisionSection";
import CoreValuesSection from "./_components/CoreValuesSection";
import WhyChooseUsSection from "./_components/WhyChooseUsSection";
import CTASection from "./_components/CTASection";

export default function AboutPage() {
  return (
    <main>
      <PageBanner
        title="About Our Company"
        subtitle="Building innovative digital products that help businesses grow and succeed."
        backgroundImage="/about/banner.jpg"
      />

      <ChairmanSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <WhyChooseUsSection />
      <CTASection />
    </main>
  );
}
