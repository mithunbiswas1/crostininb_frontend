// src/components/shared/FoodCard.jsx

import Image from "next/image";
import Link from "next/link";
import { baseUriBackend } from "@/redux/url/url";

const FoodCard = ({ item }) => {
  // Calculate discount
  const hasDiscount =
    item.variation?.offer_price &&
    item.variation.offer_price < item.variation.regular_price;

  const discountAmount = hasDiscount
    ? item.variation.regular_price - item.variation.offer_price
    : 0;

  // Get display price
  const displayPrice =
    item.variation?.offer_price || item.variation?.regular_price || 0;
  const originalPrice = item.variation?.regular_price || 0;

  return (
    <Link
      href={`/items/${item.slug}`}
      className="bg-[#111] border border-zinc-800 p-4 text-center group hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 block relative"
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          ${discountAmount} OFF
        </div>
      )}

      {/* Image */}
      <div className="relative h-44 w-full">
        <Image
          src={`${baseUriBackend}${item.image}`}
          alt={item.name}
          fill
          className="object-cover"
          unoptimized={true}
        />
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-gray-50 text-sm font-medium group-hover:text-amber-400 transition-colors line-clamp-1">
          {item.name}
        </h3>

        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-amber-400 font-semibold">${displayPrice}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
