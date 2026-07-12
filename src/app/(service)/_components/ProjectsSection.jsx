// src/app/(service)/_components/ProjectsSection.jsx

import Image from "next/image";
import Link from "next/link";
import { H2, H3, P } from "@/components/ui/Typography";

function ProjectCard({ item, reverse }) {
  return (
    <div className="group grid lg:grid-cols-2 overflow-hidden bg-white">
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

export default function ProjectsSection({ projectsData }) {
  return (
    <section className="py-12 lg:py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 lg:mb-20">
          <H2 className="font-bold mb-4 lg:mb-6">{projectsData.heading}</H2>

          <P className="text-gray-600">{projectsData.description}</P>
        </div>

        {/* Projects */}
        <div className="space-y-px bg-gray-200 overflow-hidden">
          {projectsData.projects.map((item, index) => (
            <ProjectCard key={index} item={item} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
