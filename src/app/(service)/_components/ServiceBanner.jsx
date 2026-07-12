// src/app/(service)/_components/ServiceBanner.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { H1, P } from "@/components/ui/Typography";

export default function ServiceBanner({ bannerData }) {
  return (
    <section className="relative min-h-screen bg-linear-to-r from-[#0B0C0A] via-[#0B0C0A] to-[#0B0C0A] text-gray-50 overflow-hidden">
      {/* Mobile Background Image */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src={bannerData?.image}
          alt={bannerData?.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 backdrop-blur-xs bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 min-h-screen flex items-center pt-16">
        <div className="max-w-3xl">
          <H1 className="text-gray-50 font-bold mb-6">{bannerData?.title}</H1>

          <P className="text-gray-300 text-lg mb-10">
            {bannerData?.description}
          </P>

          <Link
            href={bannerData?.buttonLink}
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 transition-colors text-black font-semibold px-8 py-4 rounded-full"
          >
            {bannerData?.buttonText}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Desktop Right Image */}
      <div className="hidden lg:block absolute top-0 right-0 h-full w-[45%]">
        <Image
          src={bannerData?.image}
          alt={bannerData?.title}
          fill
          priority
          className="object-cover object-right"
        />

        {/* Left Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0B0C0A] via-black/40 to-transparent" />

        {/* Top Gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/20 to-transparent" />
      </div>
    </section>
  );
}
