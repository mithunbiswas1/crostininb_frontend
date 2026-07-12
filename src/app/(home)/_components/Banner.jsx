// src/app/(home)/_components/Banner.jsx

"use client";

import { H1, H6 } from "@/components/ui/Typography";

export default function Banner({ bannerContent }) {
  return (
    <section className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[70vh] lg:min-h-screen flex flex-col justify-center pt-8 md:pt-16">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Title */}
        <H1 className="text-white">Taste the Art of Fine Dining</H1>

        {/* Description */}
        <H6 className="mt-7 text-white">
          Crafted with the freshest ingredients and served with warmth, every
          meal is a celebration of flavor, quality, and unforgettable moments.
        </H6>
      </div>
    </section>
  );
}
