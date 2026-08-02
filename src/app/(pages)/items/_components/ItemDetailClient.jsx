// src/app/(pages)/items/_components/ItemDetailClient.jsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { baseUriBackend } from "@/redux/url/url";

// Helper function to get image URL
const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUriBackend}${cleanPath}`;
};

export default function ItemDetailClient({ item }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Create image array: main image + gallery
  const images = [item.image, ...(item.gallery || [])].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="bg-black min-h-screen py-10 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 lg:px-20">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Menu</span>
        </Link>

        {/* Item Details */}
        <div className="bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Section with Slider */}
            <div className="md:w-1/2 relative bg-zinc-900">
              {/* Main Image */}
              <div className="relative h-80 md:h-[500px]">
                <Image
                  src={getImageUrl(images[currentImageIndex])}
                  alt={item.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Discount Badge */}
                {item.discount_percent > 0 && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded z-10">
                    {item.discount_percent}% OFF
                  </div>
                )}

                {/* Unavailable Overlay */}
                {!item.is_available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <span className="text-white text-xl font-bold px-6 py-3 border-2 border-white rounded-lg">
                      Currently Unavailable
                    </span>
                  </div>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-zinc-900/50">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-amber-400"
                          : "border-transparent hover:border-zinc-600"
                      }`}
                    >
                      <Image
                        src={getImageUrl(img)}
                        alt={`${item.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-6 md:p-10">
              {/* Category */}
              {item.category?.name && (
                <span className="inline-block text-sm text-amber-400 font-medium mb-2">
                  {item.category.name}
                </span>
              )}

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {item.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-amber-400">
                  ${item.price}
                </span>
                {item.offer_price && (
                  <span className="text-lg text-gray-500 line-through">
                    ${item.offer_price}
                  </span>
                )}
              </div>

              {/* Short Description */}
              {item.short_description && (
                <p className="text-gray-300 leading-relaxed mb-4">
                  {item.short_description}
                </p>
              )}

              {/* Full Description */}
              {item.description && (
                <div className="border-t border-zinc-800 pt-4 mb-4">
                  <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
                    Description
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Variations */}
              {item.variations && item.variations.length > 0 && (
                <div className="border-t border-zinc-800 pt-4 mb-4">
                  <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
                    Variations
                  </h3>
                  <div className="space-y-2">
                    {item.variations.map((variation, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-zinc-800/50 px-4 py-3 rounded-lg"
                      >
                        <span className="text-gray-300 text-sm">
                          {variation.variation_name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-amber-400 font-semibold">
                            ${variation.variation_regular_price}
                          </span>
                          {variation.variation_offer_price && (
                            <span className="text-xs text-gray-500 line-through">
                              ${variation.variation_offer_price}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {item.features && item.features.length > 0 && (
                <div className="border-t border-zinc-800 pt-4 mb-4">
                  <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-zinc-800/50 text-gray-300 text-sm px-3 py-1.5 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta Info */}
              <div className="border-t border-zinc-800 pt-4 flex flex-wrap gap-4 text-xs text-gray-500">
                {item.sku && <span>SKU: {item.sku}</span>}
                {item.preparation_time && (
                  <span>⏱️ {item.preparation_time} min</span>
                )}
                <span>
                  {item.is_veg ? "🌿 Vegetarian" : "🍖 Non-Vegetarian"}
                </span>
                {item.is_spicy && <span>🌶️ Spicy</span>}
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={!item.is_available}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-200 mt-6 ${
                  item.is_available
                    ? "bg-amber-500 hover:bg-amber-600 text-black"
                    : "bg-zinc-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                {item.is_available
                  ? `Add to Cart - $${item.price}`
                  : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
