// src/app/(pages)/cookie-policy/page.jsx

import { H1, H2, H6, P } from "@/components/ui/Typography";

function CookieBanner() {
  return (
    <section className="relative bg-[#2A2D33] text-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <H1 className="text-gray-50 font-bold">Cookie Policy</H1>

        <H6 className="mt-6 text-gray-200 max-w-2xl mx-auto">
          This Cookie Policy explains how Logicraft IT uses cookies and similar
          technologies to improve your browsing experience and our services.
        </H6>
      </div>
    </section>
  );
}

export default function CookiePolicyPage() {
  return (
    <main className="bg-gray-50 text-black">
      {/* Banner */}
      <CookieBanner />

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-20 space-y-14">
        {/* Overview */}
        <div>
          <H2 className="font-bold mb-4">Overview</H2>
          <P>
            Logicraft IT uses cookies and similar tracking technologies to
            enhance user experience, analyze website traffic, and improve our
            services. By using our website, you consent to the use of cookies as
            described in this policy.
          </P>
        </div>

        {/* What are cookies */}
        <div>
          <H2 className="font-bold mb-4">1. What Are Cookies?</H2>
          <P>
            Cookies are small text files stored on your device when you visit a
            website. They help websites remember your preferences and activity
            to provide a better user experience.
          </P>
        </div>

        {/* Types of cookies */}
        <div>
          <H2 className="font-bold mb-4">2. Types of Cookies We Use</H2>

          <div className="space-y-6">
            <div>
              <H6 className="font-semibold">Essential Cookies</H6>
              <P>
                Required for the website to function properly. They enable core
                features such as security, navigation, and access to secure
                areas.
              </P>
            </div>

            <div>
              <H6 className="font-semibold">Analytics Cookies</H6>
              <P>
                Help us understand how visitors interact with our website by
                collecting anonymous usage data.
              </P>
            </div>

            <div>
              <H6 className="font-semibold">Functional Cookies</H6>
              <P>
                Allow the website to remember choices you make, such as language
                preferences or region.
              </P>
            </div>

            <div>
              <H6 className="font-semibold">Marketing Cookies</H6>
              <P>
                Used to deliver relevant advertisements and track campaign
                performance (only if applicable).
              </P>
            </div>
          </div>
        </div>

        {/* Why we use cookies */}
        <div>
          <H2 className="font-bold mb-4">3. Why We Use Cookies</H2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>To ensure website functionality</li>
            <li>To improve user experience</li>
            <li>To analyze traffic and performance</li>
            <li>To enhance security</li>
            <li>To personalize content</li>
          </ul>
        </div>

        {/* Third-party cookies */}
        <div>
          <H2 className="font-bold mb-4">4. Third-Party Cookies</H2>
          <P>
            We may use third-party services such as Google Analytics or similar
            tools. These providers may set cookies to collect anonymous usage
            data for analytics and performance tracking.
          </P>
        </div>

        {/* Cookie control */}
        <div>
          <H2 className="font-bold mb-4">5. How You Can Control Cookies</H2>
          <div className="space-y-4">
            <P>
              You can control or delete cookies through your browser settings at
              any time.
            </P>

            <P>
              Most browsers allow you to block or delete cookies, but doing so
              may affect the functionality of our website.
            </P>
          </div>
        </div>

        {/* Updates */}
        <div>
          <H2 className="font-bold mb-4">6. Updates to This Policy</H2>
          <P>
            We may update this Cookie Policy from time to time to reflect
            changes in technology, legislation, or our services. Updates will be
            posted on this page.
          </P>
        </div>

        {/* Contact */}
        <div className="border-t pt-10">
          <H2 className="font-bold mb-4">Contact Us</H2>
          <P>
            If you have any questions about our Cookie Policy, please contact us
            at:
          </P>
          <P className="font-medium mt-2">privacy@logicraftit.com</P>
        </div>
      </section>
    </main>
  );
}
