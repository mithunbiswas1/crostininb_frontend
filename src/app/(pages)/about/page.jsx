// src/app/(pages)/about/page.jsx
import PageBanner from "@/components/shared/PageBanner";
import ChairmanSection from "./_components/ChairmanSection";

export default function AboutPage() {
  return (
    <main className="bg-black">
      <PageBanner
        title="About Our Restaurant"
        subtitle="Discover our passion for exceptional food, warm hospitality, and unforgettable dining experiences crafted with the freshest ingredients."
        backgroundImage="/about/a_banner.jpg"
      />

      <ChairmanSection />

      {/*  <MissionVisionSection />
      <CoreValuesSection />
      <WhyChooseUsSection />
      <CTASection /> */}
    </main>
  );
}
