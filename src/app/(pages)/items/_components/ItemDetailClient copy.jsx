// src/app/items/_components/ItemDetailClient.jsx

"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { baseUriBackend } from "@/redux/url/url";
import {
  singleAddToCartsList,
  clearCartsList,
  setBuyNowItem,
} from "@/redux/features/Slice/CartDrawerSlice";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartsList } = useSelector((state) => state.cartDrawer);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Auto-select first variation if there's exactly 1 variation
  useEffect(() => {
    if (item.variations && item.variations.length === 1) {
      setSelectedVariation(item.variations[0]);
    } else {
      setSelectedVariation(null);
    }
  }, [item.variations]);

  // Check if product already in cart
  useEffect(() => {
    const exists = cartsList.some(
      (cartItem) =>
        cartItem.productId === item.id &&
        cartItem.variationName === (selectedVariation?.variation_name || null),
    );
    setIsInCart(exists);
  }, [cartsList, item.id, selectedVariation]);

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

  // Handle variation selection
  const handleVariationSelect = (variation) => {
    // If only 1 variation, don't allow deselection
    if (item.variations.length === 1) {
      return;
    }

    if (selectedVariation?.variation_name === variation.variation_name) {
      // If clicking the same variation, deselect it (only if more than 1 variation)
      if (item.variations.length > 1) {
        setSelectedVariation(null);
      }
    } else {
      setSelectedVariation(variation);
    }
  };

  // Get current price based on selected variation
  const getCurrentPrice = () => {
    if (selectedVariation) {
      return (
        selectedVariation.variation_offer_price ||
        selectedVariation.variation_regular_price
      );
    }
    return 0;
  };

  // Get original price (for strike-through)
  const getOriginalPrice = () => {
    if (selectedVariation && selectedVariation.variation_offer_price) {
      return selectedVariation.variation_regular_price;
    }
    return null;
  };

  // Check if current variation has discount
  const hasDiscount = () => {
    if (selectedVariation && selectedVariation.variation_offer_price) {
      return (
        selectedVariation.variation_offer_price <
        selectedVariation.variation_regular_price
      );
    }
    return false;
  };

  // Get discount percentage
  const getDiscountPercent = () => {
    if (hasDiscount()) {
      return Math.round(
        ((selectedVariation.variation_regular_price -
          selectedVariation.variation_offer_price) /
          selectedVariation.variation_regular_price) *
          100,
      );
    }
    return 0;
  };

  // Get price range display - only if multiple variations
  const getPriceRange = () => {
    if (!item.variations || item.variations.length <= 1) {
      return null;
    }

    const prices = item.variations.map(
      (v) => v.variation_offer_price || v.variation_regular_price,
    );
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    if (minPrice === maxPrice) {
      return `$${minPrice}`;
    }
    return `$${minPrice} - $${maxPrice}`;
  };

  // Handle Add to Cart - No redirect to checkout
  const handleAddToCart = () => {
    // Check if variation is selected (if more than 1 variation)
    if (item.variations && item.variations.length > 1 && !selectedVariation) {
      return;
    }

    setIsAddingToCart(true);
    dispatch(
      singleAddToCartsList({
        productId: item.id,
        name: item.name,
        image: item.image,
        price: getCurrentPrice(),
        variationName: selectedVariation?.variation_name || null,
        variationPrice: selectedVariation?.variation_regular_price || null,
        variationOfferPrice: selectedVariation?.variation_offer_price || null,
      }),
    );

    setTimeout(() => {
      setIsAddingToCart(false);
      // Stay on the same page, don't redirect
    }, 500);
  };

  // Handle Buy Now - Set buy now item and go to checkout
  const handleBuyNow = () => {
    // Check if variation is selected (if more than 1 variation)
    if (item.variations && item.variations.length > 1 && !selectedVariation) {
      return;
    }

    // Create buy now item
    const buyNowItem = {
      productId: item.id,
      name: item.name,
      image: item.image,
      price: getCurrentPrice(),
      variationName: selectedVariation?.variation_name || null,
      variationPrice: selectedVariation?.variation_regular_price || null,
      variationOfferPrice: selectedVariation?.variation_offer_price || null,
      quantity: 1,
    };

    // Set buy now item in Redux and localStorage
    dispatch(setBuyNowItem(buyNowItem));

    // Navigate to checkout with buy now mode
    router.push("/checkout?mode=buynow");
  };

  // Check if variation selection is required (more than 1 variation)
  const isVariationRequired = item.variations && item.variations.length > 1;
  const hasMultipleVariations = item.variations && item.variations.length > 1;
  const isVariationSelected = selectedVariation !== null;
  const hasSingleVariation = item.variations && item.variations.length === 1;

  // Check if add to cart should be disabled
  const isAddToCartDisabled =
    !item.is_available ||
    isAddingToCart ||
    (isVariationRequired && !isVariationSelected);

  const priceRange = getPriceRange();

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
          {/* Main Content - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section with Slider */}
            <div className="relative bg-zinc-900">
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
                {hasDiscount() && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded z-10">
                    {getDiscountPercent()}% OFF
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
            <div className="p-6 md:p-10">
              {/* Category */}
              {item.category?.name && (
                <span className="inline-block text-sm text-amber-400 font-medium mb-2">
                  {item.category.name}
                </span>
              )}

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {item.name}
              </h1>

              {/* Price Range - Only show if multiple variations */}
              {priceRange && (
                <div className="mb-4">
                  <span className="text-sm text-gray-400">Price Range: </span>
                  <span className="text-2xl font-bold text-amber-400">
                    {priceRange}
                  </span>
                </div>
              )}

              {/* Variation Section */}
              {item.variations && item.variations.length > 0 && (
                <div className="mb-4">
                  {hasMultipleVariations ? (
                    <>
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">
                        Select Variation <span className="text-red-500">*</span>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {item.variations.map((variation, index) => {
                          const isSelected =
                            selectedVariation?.variation_name ===
                            variation.variation_name;

                          return (
                            <button
                              key={index}
                              onClick={() => handleVariationSelect(variation)}
                              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                isSelected
                                  ? "bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/25"
                                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                              }`}
                            >
                              {variation.variation_name}
                            </button>
                          );
                        })}
                      </div>

                      {/* Show price below selected variation name */}
                      {selectedVariation && (
                        <div className="mt-3 p-3 bg-zinc-800/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">
                              Selected:
                            </span>
                            <span className="text-sm font-medium text-white">
                              {selectedVariation.variation_name}
                            </span>
                            <span className="text-xl font-bold text-amber-400">
                              ${getCurrentPrice()}
                            </span>
                            {hasDiscount() && (
                              <>
                                <span className="text-sm text-gray-400 line-through">
                                  ${getOriginalPrice()}
                                </span>
                                <span className="text-xs text-green-400 font-semibold bg-green-400/10 px-2 py-0.5 rounded-full">
                                  -{getDiscountPercent()}%
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {!isVariationSelected && (
                        <p className="text-xs text-red-400 mt-2">
                          Please select a variation
                        </p>
                      )}
                    </>
                  ) : hasSingleVariation ? (
                    // Single variation - show only price, no variation name
                    <div className="mt-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">Price:</span>
                        <span className="text-3xl font-bold text-amber-400">
                          ${getCurrentPrice()}
                        </span>
                        {hasDiscount() && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              ${getOriginalPrice()}
                            </span>
                            <span className="text-xs text-green-400 font-semibold bg-green-400/10 px-2 py-0.5 rounded-full">
                              -{getDiscountPercent()}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Short Description */}
              {item.short_description && (
                <p className="text-gray-300 leading-relaxed mb-4">
                  {item.short_description}
                </p>
              )}

              {/* Features */}
              {item.features && item.features.length > 0 && (
                <div className="mb-4">
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

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                {/* Add to Cart Button - No redirect */}
                <button
                  disabled={isAddToCartDisabled}
                  onClick={handleAddToCart}
                  className={`flex-1 font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                    isInCart
                      ? "bg-green-600 text-white cursor-pointer hover:bg-green-700"
                      : isAddingToCart
                        ? "bg-green-600 text-white"
                        : !isAddToCartDisabled
                          ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                          : "bg-zinc-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isInCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check size={18} /> In Cart
                    </span>
                  ) : isAddingToCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Adding...
                    </span>
                  ) : isVariationRequired && !isVariationSelected ? (
                    "Select Variation"
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                {/* Buy Now Button - Direct checkout with buy now mode */}
                <button
                  disabled={isAddToCartDisabled}
                  onClick={handleBuyNow}
                  className={`flex-1 font-bold py-3 px-6 rounded-lg transition-colors duration-200 ${
                    !isAddToCartDisabled
                      ? "bg-amber-500 hover:bg-amber-600 text-black"
                      : "bg-zinc-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isVariationRequired && !isVariationSelected
                    ? "Select Variation"
                    : "Instant Order"}
                </button>
              </div>
            </div>
          </div>

          {/* Description Section - Below the grid */}
          {item.description && (
            <div className="border-t border-zinc-800 p-6 md:p-10">
              <h2 className="text-xl font-bold text-white mb-4">Description</h2>
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
