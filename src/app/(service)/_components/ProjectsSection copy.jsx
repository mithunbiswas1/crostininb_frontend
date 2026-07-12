// src/app/(service)/_components/ProjectsSection.jsx

import Image from "next/image";
import Link from "next/link";
import { H2, H3, P } from "@/components/ui/Typography";

const projects = [
  {
    title: "Social Networking Platform for Pet Owners",
    description:
      "Developed a feature-rich social networking platform that connects pet owners through communities, events, messaging, and content sharing. The solution helped increase engagement and foster meaningful connections among pet lovers worldwide.",
    image: "/services/app-development/app_banner.webp",
    link: "/case-studies/goobr",
  },
  {
    title: "Airport Passenger Experience Platform",
    description:
      "Designed and built a modern mobile application for travelers, offering real-time flight updates, airport navigation, parking information, and seamless access to airport services through a user-friendly interface.",
    image: "/services/app-development/app_banner.webp",
    link: "/case-studies/tulsa-airport",
  },
  {
    title: "Event Discovery & Community Marketplace",
    description:
      "Created a scalable event discovery platform that enables users to explore events, purchase tickets, connect with communities, and engage in local experiences through an intuitive mobile-first experience.",
    image: "/services/app-development/app_banner.webp",
    link: "/case-studies/event-platform",
  },
  {
    title: "Event Discovery & Community Marketplace",
    description:
      "Created a scalable event discovery platform that enables users to explore events, purchase tickets, connect with communities, and engage in local experiences through an intuitive mobile-first experience.",
    image: "/services/app-development/app_banner.webp",
    link: "/case-studies/event-platform",
  },
];

function ProjectCard({ item, reverse }) {
  return (
    <div className="group grid lg:grid-cols-2 overflow-hidden bg-gray-50">
      {/* Image */}
      <div
        className={`relative h-60 sm:h-72 md:h-80 lg:h-auto lg:min-h-[500px] ${
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
        className={`bg-gray-100 p-6 sm:p-8 lg:p-16 flex flex-col justify-center ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <H3 className="font-bold mb-4 lg:mb-5 max-w-lg">{item.title}</H3>

        <P className="text-gray-600 mb-6 lg:mb-8 max-w-xl lg:leading-7">
          {item.description}
        </P>

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

export default function ProjectsSection() {
  return (
    <section className="py-12 lg:py-15 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 lg:mb-20">
          <H2 className="font-bold mb-4 lg:mb-6">
            Delivering Success Stories Globally
          </H2>

          <P className="text-gray-600">
            With 1,300+ successful projects delivered worldwide, we help
            startups, enterprises, and growing businesses transform ideas into
            impactful digital products that drive measurable results.
          </P>
        </div>

        {/* Projects */}
        <div className="space-y-px bg-gray-200 overflow-hidden">
          {projects.map((item, index) => (
            <ProjectCard key={index} item={item} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
