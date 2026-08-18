// src/app/(home)/_components/OurFeatures.jsx
"use client";

import Image from "next/image";
import { H2 } from "@/components/ui/Typography";
import { baseUriBackend } from "@/redux/url/url";

export default function OurFeatures({ companies = [] }) {
  // If no companies, don't render the section
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#0b0f10] py-10 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <H2 className="text-gray-50 font-bold">Why Choose Us</H2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Experience the perfect blend of delicious flavors, premium
            ingredients, and exceptional service that keeps our customers coming
            back.
          </p>
        </div>

        {/* Cards - Static Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {companies.map((company) => (
            <div
              key={company.id}
              className="border border-[#8f7452] h-[280px] flex items-center justify-center group"
            >
              <div className="text-center">
                <Image
                  src={`${baseUriBackend}${company.image}`}
                  alt={company.title || "Company"}
                  width={150}
                  height={150}
                  className="mx-auto group-hover:scale-105 duration-300 object-contain"
                  unoptimized
                />

                <h3 className="text-white mt-5 text-lg font-semibold">
                  {company.title || "Company"}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
