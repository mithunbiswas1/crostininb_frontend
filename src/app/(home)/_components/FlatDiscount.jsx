// src/app/(home)/_components/FlatDiscount.jsx

import Image from "next/image";
import Link from "next/link";
import { H2, H4, H5, P } from "@/components/ui/Typography";

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
    <section className="py-10 lg:py-20 bg-linear-to-br from-black via-gray-[112] to-[#111]">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-8 lg:mb-12">
          <H2 className="text-gray-50 font-bold">
            Exclusive Discounts & Offers
          </H2>

          <P className="mt-3 max-w-2xl mx-auto text-gray-300">
            Enjoy amazing deals on our signature dishes. Limited time offers
            available for a truly memorable dining experience.
          </P>
        </div>

        {/* Discount Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {discountItems.map((item, index) => (
            <Link
              key={index}
              href="#"
              className="group relative aspect-4/4 overflow-hidden rounded-sm bg-[#111] border border-zinc-800 hover:border-amber-500/30 transition-colors duration-300"
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
              <div className="absolute top-3 right-3 bg-amber-500 text-black text-sm font-bold px-4 py-2 rounded-sm shadow-lg">
                {item.discount}
              </div>

              {/* Title - Bottom Left */}
              <div className="absolute bottom-4 left-4 right-4">
                <H5 className="text-gray-50 font-bold leading-tight">
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
