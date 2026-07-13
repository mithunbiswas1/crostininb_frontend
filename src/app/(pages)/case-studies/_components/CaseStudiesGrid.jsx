// src/app/(pages)/case-studies/_components/CaseStudiesGrid.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { H2, H3, P } from "@/components/ui/Typography";

const caseStudies = [
  {
    id: "goobr",
    title: "Social Networking Platform for Pet Owners",
    slug: "goobr",
    category: "Mobile App",
    client: "Goobr",
    duration: "6 months",
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
    image: "/solutions/erp/finance_dashboard.webp",
    description:
      "A feature-rich social networking platform that connects pet owners through communities, events, messaging, and content sharing.",
    challenge:
      "The client needed a platform that could handle real-time interactions, content sharing, and community management for pet owners worldwide.",
    solution:
      "We developed a scalable mobile app with real-time messaging, event management, and social features that increased user engagement by 150%.",
    results: [
      "150% increase in user engagement",
      "100K+ downloads in first 3 months",
      "4.8 star rating on app stores",
      "40% monthly active user growth",
    ],
  },
  {
    id: "tulsa-airport",
    title: "Airport Passenger Experience Platform",
    slug: "tulsa-airport",
    category: "Mobile App",
    client: "Tulsa Airport",
    duration: "8 months",
    technologies: ["Flutter", "Firebase", "AWS", "Google Maps API"],
    image: "/solutions/erp/operations_dashboard2.webp",
    description:
      "A modern mobile application for travelers offering real-time flight updates, airport navigation, and seamless access to airport services.",
    challenge:
      "Travelers needed a centralized solution for flight information, parking, navigation, and airport services.",
    solution:
      "We built a comprehensive platform with real-time updates, indoor navigation, and integrated parking management system.",
    results: [
      "60% reduction in passenger inquiries",
      "45% increase in parking revenue",
      "30K+ active monthly users",
      "Improved passenger satisfaction by 85%",
    ],
  },
  {
    id: "ecommerce-platform",
    title: "Enterprise E-commerce Solution",
    slug: "ecommerce-platform",
    category: "Web Development",
    client: "Fashion Retailer",
    duration: "10 months",
    technologies: ["Next.js", "Shopify", "Stripe", "PostgreSQL"],
    image: "/solutions/erp/sales_dashboard2.webp",
    description:
      "A scalable e-commerce platform with advanced inventory management and analytics for a retail enterprise.",
    challenge:
      "The client needed a robust e-commerce solution that could handle high traffic and complex inventory management.",
    solution:
      "We delivered a headless e-commerce platform with real-time inventory sync and advanced analytics dashboard.",
    results: [
      "200% increase in online sales",
      "50% faster page load times",
      "30% reduction in cart abandonment",
      "Seamless handling of 50K+ daily visitors",
    ],
  },
  {
    id: "healthcare-portal",
    title: "Healthcare Patient Portal",
    slug: "healthcare-portal",
    category: "Web Development",
    client: "MediCare Plus",
    duration: "12 months",
    technologies: ["React", "Node.js", "PostgreSQL", "Twilio"],
    image: "/solutions/erp/hr_dashboard2.webp",
    description:
      "A secure patient portal with appointment scheduling and telemedicine integration.",
    challenge:
      "Healthcare provider needed a HIPAA-compliant platform for patient management and virtual care.",
    solution:
      "We built a secure portal with video consultations, prescription management, and EHR integration.",
    results: [
      "75% reduction in no-show appointments",
      "90% patient satisfaction rate",
      "40% increase in patient engagement",
      "Streamlined operations for 50+ doctors",
    ],
  },
  {
    id: "analytics-dashboard",
    title: "AI-Powered Analytics Dashboard",
    slug: "analytics-dashboard",
    category: "Software Development",
    client: "DataTech Solutions",
    duration: "7 months",
    technologies: ["Python", "OpenAI", "Redis", "D3.js"],
    image: "/case-studies/case-studies-banner.webp",
    description:
      "An intelligent analytics platform with predictive insights and real-time data visualization.",
    challenge:
      "Business needed to transform raw data into actionable insights with AI predictions.",
    solution:
      "We created an AI-powered dashboard with predictive analytics and automated reporting.",
    results: [
      "3x faster decision making",
      "85% accuracy in predictions",
      "40% reduction in data analysis time",
      "Real-time insights for 1000+ users",
    ],
  },
  {
    id: "event-platform",
    title: "Event Discovery & Community Marketplace",
    slug: "event-platform",
    category: "Mobile App",
    client: "EventHub",
    duration: "9 months",
    technologies: ["Flutter", "NestJS", "MongoDB", "Stripe"],
    image: "/solutions/erp/hr_dashboard2.webp",
    description:
      "A scalable event discovery platform with ticketing and community features.",
    challenge:
      "Event organizers needed a platform to manage events, sell tickets, and engage communities.",
    solution:
      "We built a comprehensive marketplace with event discovery, ticketing, and social features.",
    results: [
      "500+ events hosted monthly",
      "100K+ tickets sold in first year",
      "4.9 star app rating",
      "60% month-over-month growth",
    ],
  },
];

function CaseStudyCard({ study }) {
  return (
    <Link href={`/case-studies/${study.slug}`} className="group block">
      <div className="bg-gray-50 rounded-sm border border-gray-200">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-gray-50 px-3 py-1 rounded-full text-sm font-semibold">
              {study.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-sm text-gray-500">{study.client}</span>
          </div>

          <H3 className="font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {study.title}
          </H3>

          <P className="text-gray-600 mb-4 line-clamp-3">{study.description}</P>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {study.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
            {study.technologies.length > 3 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                +{study.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
            Read Case Study →
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CaseStudiesGrid() {
  return (
    <section className="py-15 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 lg:px-20">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <H2 className="font-bold mb-4">Success Stories That Inspire</H2>
          <P className="text-lg text-gray-600">
            Explore our portfolio of successful projects and see how we've
            helped businesses across industries achieve their goals through
            innovative digital solutions.
          </P>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
