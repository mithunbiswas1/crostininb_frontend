// src/app/(solutions)/human-resource-management/page.jsx

import SolutionBanner from "../_components/SolutionBanner";
import SolutionFAQSection from "../_components/SolutionFAQSection";
import SolutionIndustriesSection from "../_components/SolutionIndustriesSection";
import SolutionModulesSection from "../_components/SolutionModulesSection";
import SolutionOverviewSection from "../_components/SolutionOverviewSection";
import SolutionSDashboardSection from "../_components/SolutionSDashboardSection";

export default function HumanResourceManagementPage() {
  return (
    <main>
      <SolutionBanner
        title="Human Resource Management"
        description="Streamline your workforce management with a comprehensive HRM solution that automates recruitment, employee records, payroll, attendance, leave management, performance evaluation, and compliance—all from a single centralized platform."
        image="/solutions/hrm/hrm_banner.webp"
        buttonText="Start Your HRM Project"
        buttonLink="/contact"
      />

      <SolutionOverviewSection />
      <SolutionModulesSection />
      <SolutionSDashboardSection />
      <SolutionIndustriesSection />
      <SolutionFAQSection />

      {/* More sections coming next */}
    </main>
  );
}
