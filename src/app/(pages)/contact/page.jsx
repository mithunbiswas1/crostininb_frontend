// src/app/(pages)/contact/page.jsx

import PageBanner from "@/components/shared/PageBanner";
import ContactSection from "./_components/ContactSection";
import OfficeLocationsSection from "./_components/OfficeLocationsSection";

export default function ContactPage() {
  return (
    <main>
      <PageBanner
        title="Contact Us"
        subtitle="Let's discuss your ideas and build innovative digital solutions together."
        backgroundImage="/contact/contact_banner.jpg"
      />

      <ContactSection />
      {/* <OfficeLocationsSection /> */}
    </main>
  );
}
