// src/app/(pages)/projects/_components/ProjectsShowcaseSection.jsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { H2, H3, P } from "@/components/ui/Typography";

const projectsData = {
  "All Projects": [
    {
      title: "Airport Passenger Experience Platform",
      description:
        "Designed and built a modern mobile application for travelers, offering real-time flight updates, airport navigation, parking information, and seamless access to airport services through a user-friendly interface.",
      image: "/services/app-development/airport_passenger.webp",
      category: "Mobile App",
      technologies: ["Flutter", "Firebase", "AWS"],
      link: "/case-studies/tulsa-airport",
    },
    {
      title: "Social Networking Platform for Pet Owners",
      description:
        "Developed a feature-rich social networking platform that connects pet owners through communities, events, messaging, and content sharing. The solution helped increase engagement and foster meaningful connections among pet lovers worldwide.",
      image: "/services/app-development/social_networking.webp",
      category: "Mobile App",
      technologies: ["React Native", "Node.js", "MongoDB"],
      link: "/case-studies/goobr",
    },
    {
      title: "Enterprise E-commerce Solution",
      description:
        "Built a scalable e-commerce platform with advanced inventory management, payment integration, and analytics dashboard for a retail enterprise.",
      image: "/services/web-development/enterprise-ecommerce.webp",
      category: "Web Development",
      technologies: ["Next.js", "Shopify", "Stripe"],
      link: "/case-studies/ecommerce-platform",
    },
    {
      title: "Healthcare Patient Portal",
      description:
        "Developed a secure patient portal with appointment scheduling, telemedicine integration, and electronic health records management.",
      image: "/services/web-development/healthcare.webp",
      category: "Web Development",
      technologies: ["React", "Node.js", "PostgreSQL"],
      link: "/case-studies/healthcare-portal",
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "Created an intelligent analytics platform with predictive insights, real-time data visualization, and automated reporting features.",
      image: "/services/software-development/inventory_management.webp",
      category: "Software Development",
      technologies: ["Python", "OpenAI", "Redis"],
      link: "/case-studies/analytics-dashboard",
    },
    {
      title: "Event Discovery Marketplace",
      description:
        "Built a scalable event discovery platform enabling users to explore events, purchase tickets, and engage with local communities.",
      image: "/services/app-development/event_discovery.webp",
      category: "Mobile App",
      technologies: ["Flutter", "NestJS", "MongoDB"],
      link: "/case-studies/event-platform",
    },
  ],
  "Mobile App": [
    {
      title: "Social Networking Platform for Pet Owners",
      description:
        "Developed a feature-rich social networking platform that connects pet owners through communities, events, messaging, and content sharing. The solution helped increase engagement and foster meaningful connections among pet lovers worldwide.",
      image: "/services/app-development/social_networking.webp",
      category: "Mobile App",
      technologies: ["React Native", "Node.js", "MongoDB"],
      link: "/case-studies/goobr",
    },
    {
      title: "Airport Passenger Experience Platform",
      description:
        "Designed and built a modern mobile application for travelers, offering real-time flight updates, airport navigation, parking information, and seamless access to airport services through a user-friendly interface.",
      image: "/services/app-development/airport_passenger.webp",
      category: "Mobile App",
      technologies: ["Flutter", "Firebase", "AWS"],
      link: "/case-studies/tulsa-airport",
    },
    {
      title: "Event Discovery Marketplace",
      description:
        "Built a scalable event discovery platform enabling users to explore events, purchase tickets, and engage with local communities.",
      image: "/services/app-development/event_discovery.webp",
      category: "Mobile App",
      technologies: ["Flutter", "NestJS", "MongoDB"],
      link: "/case-studies/event-platform",
    },
  ],
  "Web Development": [
    {
      title: "Enterprise E-commerce Solution",
      description:
        "Built a scalable e-commerce platform with advanced inventory management, payment integration, and analytics dashboard for a retail enterprise.",
      image: "/services/web-development/enterprise-ecommerce.webp",
      category: "Web Development",
      technologies: ["Next.js", "Shopify", "Stripe"],
      link: "/case-studies/ecommerce-platform",
    },
    {
      title: "Healthcare Patient Portal",
      description:
        "Developed a secure patient portal with appointment scheduling, telemedicine integration, and electronic health records management.",
      image: "/services/web-development/healthcare.webp",
      category: "Web Development",
      technologies: ["React", "Node.js", "PostgreSQL"],
      link: "/case-studies/healthcare-portal",
    },
  ],
  "Software Development": [
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "Created an intelligent analytics platform with predictive insights, real-time data visualization, and automated reporting features.",
      image: "/services/software-development/inventory_management.webp",
      category: "Software Development",
      technologies: ["Python", "OpenAI", "Redis"],
      link: "/case-studies/analytics-dashboard",
    },
  ],
};

const tabs = Object.keys(projectsData);

function ProjectCard({ item, reverse }) {
  return (
    <div className="group grid lg:grid-cols-2 overflow-hidden bg-white">
      {/* Image */}
      <div
        className={`relative h-[240px] sm:h-[300px] lg:h-auto lg:min-h-[500px] ${
          reverse ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div
        className={`bg-gray-100 flex flex-col justify-center p-6 sm:p-8 lg:p-16 ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        {/* Category */}
        <span className="text-sm font-semibold text-primary mb-3">
          {item.category}
        </span>

        {/* Title */}
        <H3 className="font-bold mb-4 leading-tight">{item.title}</H3>

        {/* Description */}
        <P className="text-gray-600 mb-6 leading-7">
          {item.description}
        </P>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="rounded-full bg-white px-3 py-1 text-xs font-medium border border-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Button */}
        <div>
          <Link
            href={item.link}
            className="inline-flex items-center gap-2 font-medium transition-all duration-300 hover:gap-3"
          >
            View Case Study →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsShowcaseSection() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <H2 className="font-bold mb-6">Our Success Stories</H2>

          <P className="text-gray-600">
            With 1,300+ successful projects delivered worldwide, we help
            startups, enterprises, and growing businesses transform ideas into
            impactful digital products that drive measurable results.
          </P>
        </div>

        {/* Tab System - Same as Technologies Section */}
        <div className="lg:border-t lg:border-gray-300">
          <div className="lg:grid lg:grid-cols-[320px_1fr]">
            {/* Mobile Tabs */}
            <div className="lg:hidden sticky top-10 bg-white z-20 border-b border-gray-300">
              <div className="overflow-x-auto">
                <div className="flex w-max gap-2 px-4 py-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all
                        ${
                          activeTab === tab
                            ? "bg-primary text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Tabs - Sticky */}
            <div className="hidden lg:block border-r border-gray-300">
              <div className="sticky top-16 flex flex-col py-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`mx-3 my-1 px-4 py-3 text-left text-lg rounded-full transition-all
                      ${
                        activeTab === tab
                          ? "bg-primary text-white font-semibold"
                          : "hover:bg-gray-200"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects with alternating layout */}
            <div className="space-y-px bg-gray-200">
              {projectsData[activeTab].map((item, index) => (
                <ProjectCard
                  key={index}
                  item={item}
                  reverse={index % 2 !== 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
