// src/app/(home)/_components/FlatDiscount.jsx

import Image from "next/image";
import Link from "next/link";
import { H2, H4, H5 } from "@/components/ui/Typography";

const discountItems = [
  {
    title: "Weekend Special Lunch",
    image: "/home/flat-discount/1.webp",
    discount: "20% OFF",
  },
  {
    title: "Family Feast Dinner",
    image: "/home/flat-discount/3.webp",
    discount: "25% OFF",
  },
  {
    title: "Early Bird Breakfast",
    image: "/home/flat-discount/2.webp",
    discount: "15% OFF",
  },
];

export default function FlatDiscount() {
  return (
    <section className="py-15 bg-linear-to-br from-[#111] via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {discountItems.map((item, index) => (
            <Link
              key={index}
              href="#"
              className="group relative aspect-4/4 overflow-hidden rounded-sm"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent group-hover:from-black/90 transition-all" />

              {/* Discount Badge - Top Right */}
              <div className="absolute top-3 right-3 backdrop-blur-2xl bg-gray-100 text-primary text-xl sm:text-sm font-bold px-3 py-1.5 rounded-sm shadow-lg">
                {item.discount}
              </div>

              {/* Title - Bottom Left */}
              <div className="absolute bottom-4 left-4 right-4">
                <H5 className="text-gray-50 text-sm sm:text-base md:text-lg font-bold leading-tight">
                  {item.title}
                </H5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
