"use client";

import { useState } from "react";
import { H2, H3 } from "@/components/ui/Typography";

import {
  FaReact,
  FaNodeJs,
  FaLaravel,
  FaAws,
  FaDocker,
  FaFigma,
  FaWordpress,
  FaShopify,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFlutter,
  SiKotlin,
  SiSwift,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiOpenai,
  SiGoogleanalytics,
  SiGoogleads,
  SiMeta,
  SiWoocommerce,
  SiStrapi,
  SiNestjs,
  SiRedis,
  SiKubernetes,
  SiAndroid,
} from "react-icons/si";

const technologies = {
  "Mobile Apps": {
    sections: [
      {
        title: "iOS",
        items: [
          { name: "Swift", icon: SiSwift },
          { name: "Firebase", icon: SiFirebase },
          { name: "MVVM", icon: SiSwift },
        ],
      },
      {
        title: "Android",
        items: [
          { name: "Kotlin", icon: SiKotlin },
          { name: "Firebase", icon: SiFirebase },
          { name: "Jetpack", icon: SiAndroid },
        ],
      },
      {
        title: "Cross Platform",
        items: [
          { name: "Flutter", icon: SiFlutter },
          { name: "React Native", icon: FaReact },
        ],
      },
    ],
  },

  "Web Development": {
    sections: [
      {
        title: "Frontend",
        items: [
          { name: "React", icon: FaReact },
          { name: "Next.js", icon: SiNextdotjs },
          { name: "TypeScript", icon: SiTypescript },
          { name: "JavaScript", icon: SiJavascript },
          { name: "Tailwind CSS", icon: SiTailwindcss },
        ],
      },
      {
        title: "Backend",
        items: [
          { name: "Node.js", icon: FaNodeJs },
          { name: "NestJS", icon: SiNestjs },
          { name: "Laravel", icon: FaLaravel },
          { name: "Strapi", icon: SiStrapi },
        ],
      },
    ],
  },

  "Software Development": {
    sections: [
      {
        title: "Architecture & APIs",
        items: [
          { name: "Node.js", icon: FaNodeJs },
          { name: "NestJS", icon: SiNestjs },
          { name: "Laravel", icon: FaLaravel },
          { name: "REST API", icon: FaNodeJs },
          { name: "Microservices", icon: FaDocker },
        ],
      },
    ],
  },

  "UI/UX Design": {
    sections: [
      {
        title: "Design Tools",
        items: [
          { name: "Figma", icon: FaFigma },
          { name: "Design Systems", icon: FaFigma },
          { name: "Wireframing", icon: FaFigma },
          { name: "Prototyping", icon: FaFigma },
        ],
      },
    ],
  },

  "E-commerce Solutions": {
    sections: [
      {
        title: "Platforms",
        items: [
          { name: "Shopify", icon: FaShopify },
          { name: "WooCommerce", icon: SiWoocommerce },
          { name: "WordPress", icon: FaWordpress },
          { name: "Stripe", icon: FaShopify },
        ],
      },
    ],
  },

  "AI & Automation": {
    sections: [
      {
        title: "AI Stack",
        items: [
          { name: "OpenAI", icon: SiOpenai },
          { name: "ChatGPT", icon: SiOpenai },
          { name: "Automation", icon: SiOpenai },
          { name: "AI Agents", icon: SiOpenai },
        ],
      },
    ],
  },

  "SEO & Marketing": {
    sections: [
      {
        title: "Growth Tools",
        items: [
          { name: "Google Analytics", icon: SiGoogleanalytics },
          { name: "Google Ads", icon: SiGoogleads },
          { name: "Meta Ads", icon: SiMeta },
          { name: "SEO Optimization", icon: SiGoogleanalytics },
        ],
      },
    ],
  },

  "Cloud & DevOps": {
    sections: [
      {
        title: "Infrastructure",
        items: [
          { name: "AWS", icon: FaAws },
          { name: "Docker", icon: FaDocker },
          { name: "Kubernetes", icon: SiKubernetes },
          { name: "MongoDB", icon: SiMongodb },
          { name: "PostgreSQL", icon: SiPostgresql },
          { name: "MySQL", icon: SiMysql },
          { name: "Redis", icon: SiRedis },
        ],
      },
    ],
  },
};

export default function TechnologiesSection() {
  const tabs = Object.keys(technologies);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="py-10 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="px-4">
          <H2 className="font-bold mb-6 lg:mb-8">Technologies We Use</H2>
        </div>

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

            {/* Desktop Tabs */}
            <div className="hidden lg:block border-r border-gray-300">
              <div className="flex flex-col py-4">
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

            {/* Content */}
            <div className="p-4 sm:p-6 lg:p-12">
              {technologies[activeTab].sections.map((section) => (
                <div key={section.title} className="mb-8 lg:mb-6">
                  <H3 className="font-bold mb-4">{section.title}</H3>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    {section.items.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.name}
                          className="bg-gray-200 rounded-2xl lg:rounded-full px-3 lg:px-4 py-2 lg:py-3 flex items-center gap-2 lg:gap-4 hover:bg-gray-300 transition"
                        >
                          <Icon className="w-4 h-4 lg:w-7 lg:h-7 shrink-0" />

                          <span className="text-sm sm:text-base lg:text-lg font-medium">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
