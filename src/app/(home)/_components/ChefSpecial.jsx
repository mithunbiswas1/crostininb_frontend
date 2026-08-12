// src/app/(home)/_components/ChefSpecial.jsx

import Image from "next/image";
import Link from "next/link";
import { H2, H5, P } from "@/components/ui/Typography";
import { baseUriBackend } from "@/redux/url/url";

const Card = ({ item }) => (
  <Link
    href={`/items/${item.slug}`}
    className="bg-[#111] border border-zinc-800 rounded-sm overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 flex cursor-pointer group"
  >
    <div className="relative w-20 md:w-24 lg:w-24 aspect-square">
      <Image
        src={`${baseUriBackend}${item.image}`}
        alt={item.name}
        fill
        className="object-cover"
        unoptimized={true}
      />
    </div>
    <div className="flex-1 p-3 flex items-center justify-between gap-8">
      <div>
        <H5 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-amber-400 transition-colors">
          {item.name}
        </H5>
        <P className="text-gray-400 text-xs mt-1 line-clamp-2">
          {item.short_description || item.description?.substring(0, 60) || ""}
        </P>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        {item.variation?.offer_price ? (
          <>
            <span className="text-amber-400 font-semibold text-sm">
              ${item.variation.offer_price}
            </span>
            <span className="text-gray-500 text-xs line-through">
              ${item.variation.regular_price}
            </span>
          </>
        ) : (
          <span className="text-white font-semibold text-sm">
            ${item.variation?.regular_price || 0}
          </span>
        )}
      </div>
    </div>
  </Link>
);

export default function ChefSpecial({ items }) {
  return (
    <section className="py-10 lg:py-20 bg-linear-to-br from-[#111] via-gray-[112] to-black">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        <div className="text-center mb-8 lg:mb-12">
          <H2 className="text-gray-50 font-bold">Chef Special</H2>
          <P className="mt-3 max-w-2xl mx-auto text-gray-300">
            Enjoy amazing deals on our signature dishes. Limited time offers
            available for a truly memorable dining experience.
          </P>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
