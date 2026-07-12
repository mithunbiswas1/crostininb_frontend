// src/app/(home)/_components/SuccessStoriesSection.jsx

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { H2, H4, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";

const successStories = [
  {
    image: "/home_success_stories/1.webp",
    title: "A Social Networking for Pets and Pet Owners",
    description:
      "Goobr is a trailblazing social networking app dedicated to pets and their owners.",
    link: "/case-studies/goobr",
  },
  {
    image: "/home_success_stories/2.webp",
    title: "Official Website and App for Tulsa Airport",
    description:
      "Tulsa Airport, a prominent name in aviation, sought expertise to enhance its digital presence.",
    link: "/case-studies/tulsa-airport",
  },
  {
    image: "/home_success_stories/5.webp",
    title: "Event Discovery & Community Platform",
    description:
      "Helping users discover events, build communities, and create memorable experiences.",
    link: "/case-studies/goobr",
  },
  {
    image: "/home_success_stories/6.webp",
    title: "Immersive Gaming Experience",
    description:
      "A cutting-edge gaming platform built with performance, engagement, and scalability in mind.",
    link: "/case-studies/tulsa-airport",
  },
];

export default function SuccessStoriesSection() {
  const leftColumn = successStories.filter((_, index) => index % 2 === 0);
  const rightColumn = successStories.filter((_, index) => index % 2 === 1);

  return (
    <section className="py-15 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <H2 className="font-bold">Our Success Stories</H2>

          <Link
            href="/case-studies"
            className="hidden md:flex items-center gap-2 font-medium hover:gap-3 transition-all"
          >
            More case studies
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {/* Left Column */}
          <div className="space-y-12">
            {leftColumn.map((story, index) => (
              <Link key={index} href={story.link} className="block group">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={story.image}
                    alt={story.title}
                    width={700}
                    height={700}
                    className="w-full aspect-8/9 object-cover transition duration-700 hover:scale-102"
                  />
                </div>

                <div className="mt-6">
                  <H4 className="font-bold mb-2 group-hover:underline">
                    {story.title}
                  </H4>
                  <P>{story.description}</P>
                </div>
              </Link>
            ))}

            <Link
              href="/case-studies"
              className="hidden lg:inline-flex items-center gap-3 bg-primary hover:bg-green-600 transition-colors text-white font-semibold px-8 py-4 rounded-full"
            >
              More case studies
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right Column */}
          <div className="space-y-12 lg:pt-24">
            {rightColumn.map((story, index) => (
              <Link key={index} href={story.link} className="block group">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={story.image}
                    alt={story.title}
                    width={700}
                    height={700}
                    className="w-full aspect-8/9 object-cover transition duration-700 hover:scale-102"
                  />
                </div>

                <div className="mt-6">
                  <H4 className="font-bold mb-2 group-hover:underline">
                    {story.title}
                  </H4>
                  <P>{story.description}</P>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Link */}
        <div className="mt-12 md:hidden">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 font-medium"
          >
            More case studies
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
