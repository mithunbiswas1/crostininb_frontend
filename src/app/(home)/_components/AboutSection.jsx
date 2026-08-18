// src/app/(home)/_components/AboutSection.jsx

import Link from "next/link";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { baseUriBackend } from "@/redux/url/url";

export default function AboutSection({ aboutData }) {
  if (!aboutData) {
    return null;
  }

  return (
    <section className="bg-black py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div>
            <H2 className="text-gray-50 font-bold">About Us</H2>

            {/* Chairman Message - Dynamic */}
            <p className="text-gray-300 mt-4 leading-8 max-w-xl">
              {aboutData?.data?.chairman_message}
            </p>

            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="mt-10 border-2 border-amber-400/40 text-gray-50 hover:bg-gray-50/10 text-base font-semibold rounded-xl backdrop-blur-sm transition-all"
              >
                Discover More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Right Images */}
          <div className="border border-[#8f7452] p-5">
            <div className="relative md:h-95 h-50 border border-[#8f7452] overflow-hidden">
              <Image
                src={`${baseUriBackend}${aboutData?.data?.chairman_image}`}
                alt="food-1"
                fill
                className="object-cover duration-500"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
