// src/app/(pages)/cookie-policy/page.jsx

import { H1, H2, H6, P } from "@/components/ui/Typography";

function TermsBanner() {
  return (
    <section className="relative bg-[#2A2D33] text-white py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <H1 className="text-white font-bold">Terms & Conditions</H1>

        <H6 className="mt-6 text-gray-200 max-w-2xl mx-auto">
          These Terms & Conditions govern your use of Logicraft IT services,
          website, and products. Please read them carefully before using our
          services.
        </H6>
      </div>
    </section>
  );
}

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-gray-50 text-black">
      {/* Banner */}
      <TermsBanner />

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-20 space-y-14">
        {/* Overview */}
        <div>
          <H2 className="font-bold mb-4">Overview</H2>
          <P>
            By accessing or using Logicraft IT (“we”, “our”, “us”) website and
            services, you agree to be bound by these Terms & Conditions. If you
            do not agree, please do not use our services.
          </P>
        </div>

        {/* Services */}
        <div>
          <H2 className="font-bold mb-4">1. Services</H2>
          <P>
            Logicraft IT provides software development, web development, mobile
            applications, UI/UX design, cloud solutions, and digital marketing
            services. We reserve the right to modify or discontinue any service
            at any time without notice.
          </P>
        </div>

        {/* Use of website */}
        <div>
          <H2 className="font-bold mb-4">2. Use of Website</H2>
          <P>
            You agree to use our website only for lawful purposes. You must not
            attempt to gain unauthorized access, disrupt services, or misuse any
            content available on our website.
          </P>
        </div>

        {/* Intellectual property */}
        <div>
          <H2 className="font-bold mb-4">3. Intellectual Property</H2>
          <P>
            All content, including text, graphics, logos, designs, and software,
            belongs to Logicraft IT unless otherwise stated. Unauthorized use,
            reproduction, or distribution is strictly prohibited.
          </P>
        </div>

        {/* Project terms */}
        <div>
          <H2 className="font-bold mb-4">4. Project Terms</H2>
          <P>
            Each project will be governed by a separate agreement outlining
            scope, timeline, and deliverables. Any changes to scope may affect
            cost and delivery time.
          </P>
        </div>

        {/* Payments */}
        <div>
          <H2 className="font-bold mb-4">5. Payments</H2>
          <P>
            Payment terms are defined in individual project agreements. Delayed
            payments may result in suspension or delay of services.
          </P>
        </div>

        {/* Third-party services */}
        <div>
          <H2 className="font-bold mb-4">6. Third-Party Services</H2>
          <P>
            We may use third-party tools or services. Logicraft IT is not
            responsible for issues caused by third-party providers.
          </P>
        </div>

        {/* Limitation of liability */}
        <div>
          <H2 className="font-bold mb-4">7. Limitation of Liability</H2>
          <P>
            Logicraft IT shall not be liable for any indirect, incidental, or
            consequential damages arising from the use of our services or
            website.
          </P>
        </div>

        {/* No guarantees */}
        <div>
          <H2 className="font-bold mb-4">8. No Guarantees</H2>
          <P>
            While we strive to deliver high-quality services, we do not
            guarantee uninterrupted or error-free operation of our services.
          </P>
        </div>

        {/* Termination */}
        <div>
          <H2 className="font-bold mb-4">9. Termination</H2>
          <P>
            We reserve the right to suspend or terminate access to our services
            if users violate these Terms & Conditions.
          </P>
        </div>

        {/* Changes */}
        <div>
          <H2 className="font-bold mb-4">10. Changes to Terms</H2>
          <P>
            Logicraft IT may update these Terms & Conditions at any time.
            Updates will be posted on this page with a revised date.
          </P>
        </div>

        {/* Contact */}
        <div className="border-t pt-10">
          <H2 className="font-bold mb-4">Contact Us</H2>
          <P>
            If you have any questions about these Terms & Conditions, please
            contact us at:
          </P>
          <P className="font-medium mt-2">legal@logicraftit.com</P>
        </div>
      </section>
    </main>
  );
}
