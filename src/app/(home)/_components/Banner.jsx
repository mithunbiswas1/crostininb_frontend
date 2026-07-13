// src/app/(home)/_components/Banner.jsx

"use client";

import { H1, H6 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-20 pt-8 md:pt-16 relative z-10 min-h-screen flex flex-col justify-center">
      <div className="space-y-4 ">
        {/* Title */}
        <H1 className="text-primary leading-tight">
          Unforgettable <br />
          <span className="text-amber-400/80">Flavor in Every</span> Bite
        </H1>

        {/* Description */}
        <H6 className="text-gray-50/90 max-w-5xl">
          Crafted with the freshest ingredients and served with warmth, every
          meal is a celebration of flavor, quality, and unforgettable moments.
          Our award-winning chefs bring culinary excellence to your table.
        </H6>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center sm:flex-row gap-4 pt-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-green-600 border-2 border-amber-400/40 text-gray-50 text-base font-semibold rounded-xl transition-all"
          >
            Reserve a Table
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Link href="/menu">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-amber-400/40 text-gray-50 hover:bg-gray-50/10 text-base font-semibold rounded-xl backdrop-blur-sm transition-all"
            >
              View Our Menu
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
