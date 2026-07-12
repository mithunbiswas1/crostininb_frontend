"use client";

import Image from "next/image";
import { H1, H3, P } from "@/components/ui/Typography";

const offices = [
  {
    city: "Florida",
    address:
      "560 Village Blvd., Suite 120 #3, West Palm Beach, FL-33409, United States",
    image: "/contact/locations_1.webp",
  },
  {
    city: "Manchester",
    address:
      "73 Meadow, Bramhall Stockport, Manchester - SK7 1LX, United Kingdom",
    image: "/contact/locations_2.webp",
  },
  {
    city: "Dubai",
    address:
      "IFZA Properties, DSO-IFZA, Dubai Silicon Oasis, DXB-75900, United Arab Emirates",
    image: "/contact/locations_3.webp",
  },
  {
    city: "Karachi",
    address:
      "54C, Kashmir Road, Block 2, PECHS, Karachi, Sindh - 75400, Pakistan",
    image: "/contact/locations_4.webp",
  },
];

export default function OfficeLocationsSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl">
          <H1>Our global office locations</H1>

          <P className="mt-6 text-lg text-gray-600 leading-relaxed">
            Find your team among specialists across multiple offices around the
            world.
          </P>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office, index) => (
            <div key={index} className="group">
              {/* Image */}
              <div className="relative aspect-3/4 overflow-hidden rounded-3xl">
                <Image
                  src={office.image}
                  alt={office.city}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="mt-5">
                <H3 className="font-semibold text-black">{office.city}</H3>

                <P className="mt-2 text-gray-600 leading-relaxed">
                  {office.address}
                </P>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
