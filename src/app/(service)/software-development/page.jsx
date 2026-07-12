// src/app/(service)/ui-ux-design/page.jsx

import ChallengesSection from "../_components/ChallengesSection";
import DevelopmentProcessSection from "../_components/DevelopmentProcessSection";
import FAQSection from "../_components/FAQSection";
import IndustriesSection from "../_components/IndustriesSection";
import ProjectsSection from "../_components/ProjectsSection";
import ServiceBanner from "../_components/ServiceBanner";
import TechStackSection from "../_components/TechStackSection";

import {
  bannerData,
  challengesData,
  developmentProcessData,
  projectsData,
  industriesData,
  faqData,
  techStackData,
} from "@/data/solutions/software-development-data";

export default function SoftwareDevelopmentPage() {
  return (
    <main>
      <ServiceBanner bannerData={bannerData} />

      <ChallengesSection challengesData={challengesData} />
      <ProjectsSection projectsData={projectsData} />
      <DevelopmentProcessSection
        developmentProcessData={developmentProcessData}
      />
      <IndustriesSection industriesData={industriesData} />
      <TechStackSection techStackData={techStackData} />
      <FAQSection faqData={faqData} />
    </main>
  );
}
