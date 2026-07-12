// src/app/(pages)/about/page.jsx
import PageBanner from "@/components/shared/PageBanner";
import OurStorySection from "./_components/OurStorySection";

export default function AboutPage() {
  return (
    <main className="bg-black">
      <PageBanner
        title="About Our Restaurant"
        subtitle="Discover our passion for exceptional food, warm hospitality, and unforgettable dining experiences crafted with the freshest ingredients."
        backgroundImage="/about/a_banner.jpg"
      />

      <OurStorySection />

      {/* <ChairmanSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <WhyChooseUsSection />
      <CTASection /> */}
    </main>
  );
}
