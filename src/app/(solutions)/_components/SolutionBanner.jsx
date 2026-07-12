// src/app/(solutions)/enterprise-resource-planning/_components/SolutionBanner.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { H1, P } from "@/components/ui/Typography";

export default function SolutionBanner({
  title,
  description,
  image,
  buttonText,
  buttonLink,
}) {
  return (
    <section className="relative min-h-screen overflow-hidden text-gray-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill priority className="object-cover" />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/30 to-black/10 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 min-h-screen flex items-center pt-16">
        <div className="max-w-3xl">
          <H1 className="text-gray-50 font-bold mb-6">{title}</H1>

          <P className="text-gray-200 mb-10 leading-8">{description}</P>

          <Link
            href={buttonLink}
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 transition-all duration-300 text-black font-semibold px-8 py-4 rounded-full"
          >
            {buttonText}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
