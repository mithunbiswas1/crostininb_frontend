import { Check } from "lucide-react";
import { H1, H2, P } from "@/components/ui/Typography";
import Link from "next/link";

const packages = [
  {
    id: 1,
    name: "Starter",
    price: "$299",
    billing: "One-time consultation",
    description: "Perfect for startups and personal projects",
    buttonText: "Get Started",
    theme: "light",
    features: [
      "Free project consultation",
      "Basic requirement analysis",
      "1 website concept",
      "Email support",
      "Up to 3 revisions",
    ],
  },
  {
    id: 2,
    name: "Professional",
    price: "$499",
    billing: "Per project",
    description: "Ideal for growing businesses",
    buttonText: "Choose Professional",
    badge: "Most Popular",
    theme: "light",
    features: [
      "Custom website development",
      "Responsive design",
      "Admin dashboard",
      "SEO optimization",
      "3 months free support",
      "Source code included",
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    billing: "Tailored pricing",
    description: "Best for large-scale software solutions",
    buttonText: "Contact Sales",
    theme: "dark",
    features: [
      "Everything in Professional",
      "Custom web application",
      "API integration",
      "Cloud deployment",
      "Dedicated project manager",
      "Priority support",
      "Unlimited scalability",
    ],
  },
];

function PricingCard({ plan }) {
  const isDark = plan.theme === "dark";

  return (
    <div
      className={`rounded-3xl border p-8 h-full flex flex-col ${
        isDark ? "bg-black text-white border-black" : "bg-white border-gray-200"
      }`}
    >
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold">{plan.name}</h3>

          {plan.badge && (
            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white">
              🔥 {plan.badge}
            </span>
          )}
        </div>

        <h2 className="mt-6 text-5xl font-bold">{plan.price}</h2>

        <p
          className={`mt-2 text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {plan.billing}
        </p>

        <p className={`mt-10 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {plan.description}
        </p>
      </div>

      <ul className="mt-8 space-y-4 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check size={18} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link href="/contact">
        <button
          className={`mt-10 h-14 w-full rounded-full font-medium transition ${
            isDark
              ? "bg-white text-black hover:bg-gray-100"
              : "bg-black text-white hover:opacity-90"
          }`}
        >
          {plan.buttonText}
        </button>
      </Link>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="max-w-4xl mb-10">
          <H2 className="font-bold mb-6">Top Challenges We’ve Solved</H2>

          <P className="text-gray-600">
            Mobile app growth comes with unique challenges, and we're here to
            solve them. From streamlining user experiences to optimizing
            performance and scalability, we tackle the complexities that hold
            your app back.
          </P>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {packages.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
