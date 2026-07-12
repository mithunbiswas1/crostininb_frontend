// src/app/(pages)/package/page.jsx

import PageBanner from "@/components/shared/PageBanner";
import PricingSection from "./_components/PricingSection";
import PackageFAQSection from "./_components/PackageFAQSection";

export default function PackagesPage() {
  return (
    <main>
      <PageBanner
        title="Packages"
        subtitle="Flexible pricing plans designed for startups, businesses, and enterprises."
        backgroundImage="/packages/packages_banner.webp"
      />

      <PricingSection />
      <PackageFAQSection />
    </main>
  );
}
