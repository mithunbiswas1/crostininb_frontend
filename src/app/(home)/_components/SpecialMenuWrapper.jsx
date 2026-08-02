"use client";

import { useState } from "react";
import Image from "next/image";
import { baseUriBackend } from "@/redux/url/url";
import { FoodModal } from "@/components/shared/FoodModal";

// Helper function to get image URL
const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUriBackend}${cleanPath}`;
};

export default function SpecialMenuWrapper({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "unset";
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No items available</p>
      </div>
    );
  }

  return (
    <>
      {/* Menu Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#111] border border-zinc-800 p-4 text-center cursor-pointer group hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5"
            onClick={() => handleCardClick(item)}
          >
            {/* Image */}
            <div className="relative h-44 w-full transition-transform duration-300">
              <Image
                src={getImageUrl(item.image)}
                alt={item.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Content */}
            <div className="mt-4">
              <h3 className="text-gray-50 text-sm font-medium group-hover:text-amber-400 transition-colors line-clamp-1">
                {item.name}
              </h3>

              <div className="mt-2">
                <span className="text-amber-400 font-semibold">
                  ${item.price}
                </span>
                {item.offer_price && (
                  <span className="ml-2 text-xs text-gray-400 line-through">
                    ${item.offer_price}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <FoodModal item={selectedItem} onClose={handleCloseModal} />
    </>
  );
}
