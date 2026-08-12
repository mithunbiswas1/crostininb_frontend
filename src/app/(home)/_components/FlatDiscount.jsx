// src/app/(home)/_components/FlatDiscount.jsx

import Image from "next/image";
import Link from "next/link";
import { H2, H5, P } from "@/components/ui/Typography";
import { baseUriBackend } from "@/redux/url/url";

export default function FlatDiscount({ items }) {
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
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/items/${item.slug}`}
              className="group relative aspect-4/4 overflow-hidden rounded-sm bg-[#111] border border-zinc-800 hover:border-amber-500/30 transition-colors duration-300"
            >
              {/* Background Image */}
              <Image
                src={`${baseUriBackend}${item.image}`}
                alt={item.name}
                fill
                className="object-cover"
                unoptimized={true}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent group-hover:from-black/90 transition-all" />

              {/* Discount Badge - Top Right */}
              {item.variation?.offer_price && (
                <div className="absolute top-3 right-3 bg-amber-500 text-black text-sm font-bold px-4 py-2 rounded-sm shadow-lg">
                  {Math.round(
                    ((item.variation.regular_price -
                      item.variation.offer_price) /
                      item.variation.regular_price) *
                      100,
                  )}
                  % OFF
                </div>
              )}

              {/* Title & Price - Bottom Left */}
              <div className="absolute bottom-4 left-4 right-4">
                <H5 className="text-gray-50 font-bold leading-tight">
                  {item.name}
                </H5>
                {/* <div className="flex items-center gap-2 mt-1">
                  {item.variation?.offer_price ? (
                    <>
                      <span className="text-amber-400 font-bold">
                        ₹{item.variation.offer_price}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        ₹{item.variation.regular_price}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-200 font-bold">
                      ₹{item.variation?.regular_price}
                    </span>
                  )}
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
