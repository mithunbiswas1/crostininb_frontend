// src/app/(solutions)/enterprise-resource-planning/page.jsx

import SolutionBanner from "../_components/SolutionBanner";
import SolutionFAQSection from "../_components/SolutionFAQSection";
import SolutionIndustriesSection from "../_components/SolutionIndustriesSection";
import SolutionModulesSection from "../_components/SolutionModulesSection";
import SolutionOverviewSection from "../_components/SolutionOverviewSection";
import SolutionSDashboardSection from "../_components/SolutionSDashboardSection";

export default function EnterpriseResourcePlanningPage() {
  return (
    <main>
      <SolutionBanner
        title="Enterprise Resource Planning"
        description="For over 17 years, we've been building custom ERP solutions that integrate financials, operations, supply chain, and HR into one powerful platform."
        image="/solutions/erp/erp_banner.webp"
        buttonText="Start Your ERP Project"
        buttonLink="/contact"
      />

      <SolutionOverviewSection />
      <SolutionModulesSection />
      <SolutionSDashboardSection />
      <SolutionIndustriesSection/>
      <SolutionFAQSection />

      {/* More sections coming next */}
    </main>
  );
}
