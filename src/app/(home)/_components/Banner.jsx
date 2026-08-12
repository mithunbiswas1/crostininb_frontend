// src/app/(home)/_components/Banner.jsx

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { H1, H6 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Banner({ banners }) {
  const bannerData = banners?.data?.banners || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (bannerData.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === bannerData.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // If no banners, show fallback
  if (!bannerData || bannerData.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 lg:px-20 pt-8 md:pt-16 relative z-10 min-h-screen flex flex-col justify-center">
        <div className="space-y-4">
          <H1 className="text-primary leading-tight">
            Unforgettable <br />
            <span className="text-amber-400/80">Flavor in Every</span> Bite
          </H1>
          <H6 className="text-gray-50/90 max-w-5xl">
            Crafted with the freshest ingredients and served with warmth, every
            meal is a celebration of flavor, quality, and unforgettable moments.
            Our award-winning chefs bring culinary excellence to your table.
          </H6>
          <div className="flex flex-col items-start sm:flex-row sm:items-center gap-4 pt-4">
            <Link href="/special">
              <Button
                size="lg"
                className="bg-primary hover:bg-green-600 border-2 border-amber-400/40 text-gray-50 text-base font-semibold rounded-xl transition-all"
              >
                Special Items
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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

  const currentBanner = bannerData[currentIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-20 pt-8 md:pt-16 relative z-10 min-h-screen flex flex-col justify-center">
      <div className="space-y-4">
        {/* Title with Framer Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <H1 className="text-primary leading-tight">
              {currentBanner?.first_title}
              {currentBanner?.middle_title && (
                <>
                  {" "}
                  <br />
                  <span className="text-amber-400/80">
                    {currentBanner.middle_title}
                  </span>
                </>
              )}
              {currentBanner?.last_title && <> {currentBanner.last_title}</>}
            </H1>
          </motion.div>
        </AnimatePresence>

        {/* Description with Framer Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`desc-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
          >
            <H6 className="text-gray-50/90 max-w-5xl">
              {currentBanner?.sub_title ||
                "Crafted with the freshest ingredients and served with warmth, every meal is a celebration of flavor, quality, and unforgettable moments. Our award-winning chefs bring culinary excellence to your table."}
            </H6>
          </motion.div>
        </AnimatePresence>

        {/* CTA Buttons with Framer Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`cta-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
            className="flex flex-col items-start sm:flex-row sm:items-center gap-4 pt-4"
          >
            <Link href="/special">
              <Button
                size="lg"
                className="bg-primary hover:bg-green-600 border-2 border-amber-400/40 text-gray-50 text-base font-semibold rounded-xl transition-all"
              >
                Special Items
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator */}
        {bannerData.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-2 absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            {bannerData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2.5 bg-primary"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
