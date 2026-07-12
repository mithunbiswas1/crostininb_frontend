// src/app/(home)/_components/Banner.jsx

"use client";

import { H1, H6 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <section className="max-w-5xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-8 md:pt-16">
      <div className="space-y-4 ">
        {/* Title */}
        <H1 className="text-primary">
          Unforgettable <br />
          <span className="text-gray-50">Flavor in Every</span> <br />
          Bite
        </H1>

        {/* Description */}
        <H6 className="text-gray-50/90 max-w-3xl">
          Crafted with the freshest ingredients and served with warmth, every
          meal is a celebration of flavor, quality, and unforgettable moments.
          Our award-winning chefs bring culinary excellence to your table.
        </H6>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center sm:flex-row gap-4 pt-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-green-600 border-2 border-primary text-gray-50 text-base font-semibold rounded-full transition-all"
          >
            Reserve a Table
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-gray-50 text-gray-50 hover:bg-gray-50/10 text-base font-semibold rounded-full backdrop-blur-sm transition-all"
          >
            View Our Menu
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
