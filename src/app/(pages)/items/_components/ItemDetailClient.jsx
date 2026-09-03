// src/app/items/_components/ItemDetailClient.jsx

"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
} from "lucide-react";
import { baseUriBackend } from "@/redux/url/url";
import { singleAddToCartsList } from "@/redux/features/Slice/CartDrawerSlice";

// Helper function to get image URL
const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUriBackend}${cleanPath}`;
};

// ==================== SIZE SELECTOR ====================
const SizeSelector = ({
  sizes,
  selectedSize,
  onSelect,
  hasCrusts,
  isCrustSelected,
  selectedCrust,
}) => {
  if (!sizes || sizes.length === 0) return null;

  const isDisabled = hasCrusts && !isCrustSelected;

  // Get available sizes from selected crust
  const getAvailableSizes = () => {
    if (!selectedCrust || !selectedCrust.size) return [];
    const available = [];
    if (selectedCrust.size.small) available.push("Small");
    if (selectedCrust.size.medium) available.push("Medium");
    if (selectedCrust.size.large) available.push("Large");
    return available;
  };

  const availableSizes = getAvailableSizes();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">
        Select Size <span className="text-red-500">*</span>
        {isDisabled && (
          <span className="text-xs text-amber-400 ml-2">
            (Select crust first)
          </span>
        )}
        {!isDisabled && hasCrusts && availableSizes.length > 0 && (
          <span className="text-xs text-gray-500 ml-2">
            Available: {availableSizes.join(", ")}
          </span>
        )}
      </h3>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size, index) => {
          // Check if this size is available for selected crust
          const isSizeAvailable =
            !hasCrusts ||
            (hasCrusts &&
              isCrustSelected &&
              selectedCrust?.size?.[size.name.toLowerCase()] === true);

          const isSelected = selectedSize?.name === size.name;

          return (
            <button
              key={index}
              onClick={() => isSizeAvailable && onSelect(size)}
              disabled={!isSizeAvailable}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all min-w-[100px] text-center ${
                !isSizeAvailable
                  ? "bg-zinc-800/30 text-gray-600 cursor-not-allowed border border-zinc-700/50"
                  : isSelected
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-105"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700"
              }`}
            >
              <div className="font-bold">{size.name}</div>
              <div className="text-xs opacity-70">${size.price}</div>
              {!isSizeAvailable && hasCrusts && isCrustSelected && (
                <div className="text-[8px] text-gray-500 mt-0.5">
                  Unavailable
                </div>
              )}
            </button>
          );
        })}
      </div>
      {isDisabled && (
        <p className="text-xs text-amber-400/70 mt-2">
          Please select a crust first to see available sizes
        </p>
      )}
      {!isDisabled && hasCrusts && availableSizes.length === 0 && (
        <p className="text-xs text-red-400/70 mt-2">
          This crust has no available sizes. Please select another crust.
        </p>
      )}
    </div>
  );
};

// ==================== CRUST SELECTOR ====================
const CrustSelector = ({ crusts, selectedCrust, onSelect }) => {
  if (!crusts || crusts.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">
        Choose Crust <span className="text-red-500">*</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {crusts.map((crust) => {
          const crustId = crust._id || crust.id;
          const selectedId = selectedCrust?._id || selectedCrust?.id;
          const isSelected = crustId === selectedId;

          return (
            <button
              key={crustId}
              onClick={() => onSelect(crust)}
              className={`bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all text-left ${
                isSelected
                  ? "border-amber-500 shadow-lg shadow-amber-500/20"
                  : "border-zinc-700 hover:border-zinc-500"
              }`}
            >
              <div className="flex items-center gap-3 p-3">
                {/* Image */}
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-700">
                  <Image
                    src={getImageUrl(crust.image)}
                    alt={crust.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm line-clamp-1">
                    {crust.name}
                  </h4>
                </div>

                {/* Selection Indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? "border-amber-500 bg-amber-500"
                      : "border-zinc-600"
                  }`}
                >
                  {isSelected && <Check size={12} className="text-black" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ==================== SEASONING SELECTOR ====================
const SeasoningSelector = ({ seasonings, selectedSeasonings, onSelect }) => {
  if (!seasonings || seasonings.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Seasonings</h3>
      <div className="flex flex-wrap gap-2">
        {seasonings.map((seasoning, index) => {
          const isSelected = selectedSeasonings.some(
            (s) => s.name === seasoning.name,
          );
          return (
            <button
              key={index}
              onClick={() => onSelect(seasoning)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                isSelected
                  ? "bg-amber-500 text-black font-semibold"
                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
              }`}
            >
              {seasoning.name}
              {isSelected && <Check size={12} className="inline ml-1" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ==================== ADDON CARD (Section Wise - Dynamic Categories) ====================
const AddonSection = ({ category, addons, selectedAddons, onSelect }) => {
  if (!addons || addons.length === 0) return null;

  // Track selected variant for each addon - default light
  const [selectedVariants, setSelectedVariants] = useState({});

  // Auto-select light variant for each addon when selected
  useEffect(() => {
    const defaultVariants = {};
    addons.forEach((addon) => {
      const addonId = addon._id || addon.id;
      if (addon.variants && addon.variants.length > 0) {
        const lightVariant =
          addon.variants.find((v) => v.name === "light") || addon.variants[0];
        if (!selectedVariants[addonId]) {
          defaultVariants[addonId] = lightVariant;
        }
      }
    });
    if (Object.keys(defaultVariants).length > 0) {
      setSelectedVariants((prev) => ({
        ...prev,
        ...defaultVariants,
      }));
    }
  }, [addons]);

  const handleVariantSelect = (addonId, variant) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [addonId]: variant,
    }));
  };

  // Format category name - capitalize and replace underscores with spaces
  const formatCategoryName = (cat) => {
    if (!cat) return "Other";
    return cat
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3 capitalize">
        {formatCategoryName(category)}
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {addons.map((addon) => {
          const addonId = addon._id || addon.id;
          const isSelected = selectedAddons.some(
            (a) => (a._id || a.id) === addonId,
          );
          const selectedVariant = selectedVariants[addonId];

          return (
            <div
              key={addonId}
              onClick={() => onSelect(addon)}
              className={`bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-amber-500 shadow-lg shadow-amber-500/20"
                  : "border-zinc-700 hover:border-zinc-500"
              }`}
            >
              {/* Card Content - Top Row */}
              <div className="flex items-center gap-3 p-3">
                {/* Image */}
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-700">
                  <Image
                    src={getImageUrl(addon.image)}
                    alt={addon.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Name & Price */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm line-clamp-1">
                    {addon.name}
                  </h4>
                </div>

                {/* Selection Indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? "border-amber-500 bg-amber-500"
                      : "border-zinc-600"
                  }`}
                >
                  {isSelected && <Check size={12} className="text-black" />}
                </div>
              </div>

              {/* Variants - Bottom Row (Only show when card is selected) */}
              {isSelected && addon.variants && addon.variants.length > 0 && (
                <div className="px-3 pb-3 pt-0 border-t border-zinc-700/50">
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {addon.variants.map((variant, vIndex) => {
                      const isVariantSelected =
                        selectedVariant?.name === variant.name;
                      return (
                        <button
                          key={vIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVariantSelect(addonId, variant);
                          }}
                          className={`px-2.5 py-1 rounded text-xs transition-all ${
                            isVariantSelected
                              ? "bg-amber-500 text-black font-medium"
                              : "bg-zinc-700/50 text-gray-400 hover:bg-zinc-700 hover:text-white"
                          }`}
                        >
                          {variant.name} - ${variant.price}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==================== SPECIAL INSTRUCTIONS ====================
const SpecialInstructions = ({
  instructions,
  selectedInstructions,
  onSelect,
}) => {
  if (!instructions) return null;

  const hasCut = instructions.cut && instructions.cut.length > 0;
  const hasBake = instructions.bake && instructions.bake.length > 0;

  if (!hasCut && !hasBake) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">
        Special Instructions
      </h3>

      {hasCut && (
        <div className="mb-2">
          <h4 className="text-xs text-gray-500 mb-1.5">Cut</h4>
          <div className="flex flex-wrap gap-1.5">
            {instructions.cut.map((item, index) => {
              const isSelected = selectedInstructions.cut.some(
                (s) => s.name === item.name,
              );
              return (
                <button
                  key={index}
                  onClick={() => onSelect("cut", item)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    isSelected
                      ? "bg-amber-500 text-black font-medium"
                      : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hasBake && (
        <div>
          <h4 className="text-xs text-gray-500 mb-1.5">Bake</h4>
          <div className="flex flex-wrap gap-1.5">
            {instructions.bake.map((item, index) => {
              const isSelected = selectedInstructions.bake.some(
                (s) => s.name === item.name,
              );
              return (
                <button
                  key={index}
                  onClick={() => onSelect("bake", item)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    isSelected
                      ? "bg-amber-500 text-black font-medium"
                      : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== RELATED ITEM CARD ====================
const RelatedItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const { cartsList } = useSelector((state) => state.cartDrawer);
  const [isAdding, setIsAdding] = useState(false);

  const price = item.min_price || item.size?.[0]?.price || 0;
  const isInCart = cartsList.some((cartItem) => cartItem.productId === item.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(
      singleAddToCartsList({
        productId: item.id,
        name: item.name,
        image: item.image,
        price: price,
        variationName: null,
        variationPrice: null,
        variationOfferPrice: null,
      }),
    );
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="bg-[#111] border border-zinc-800 rounded-lg overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 flex group">
      <Link
        href={`/items/${item.slug}`}
        className="relative w-24 md:w-28 aspect-square flex-shrink-0"
      >
        <Image
          src={getImageUrl(item.image)}
          alt={item.name}
          fill
          className="object-cover"
          unoptimized
        />
        {item.is_addon && (
          <span className="absolute top-1 left-1 bg-purple-600 text-white text-[8px] px-1.5 py-0.5 rounded">
            Addon
          </span>
        )}
      </Link>
      <div className="flex-1 p-3 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <Link href={`/items/${item.slug}`}>
            <h4 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-amber-400 transition-colors">
              {item.name}
            </h4>
          </Link>
          <p className="text-gray-400 text-xs line-clamp-2 mt-0.5">
            {item.short_description || item.description?.substring(0, 60) || ""}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <div className="text-right">
            <span className="text-white font-semibold text-sm">${price}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isInCart || !item.is_available}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isInCart
                ? "bg-green-600 text-white"
                : isAdding
                  ? "bg-green-600 text-white"
                  : item.is_available
                    ? "bg-amber-500 text-black hover:bg-amber-600"
                    : "bg-zinc-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isInCart ? (
              <Check size={16} />
            ) : isAdding ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Plus size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
export default function ItemDetailClient({ item, addonItems = [] }) {
  const dispatch = useDispatch();
  const { cartsList } = useSelector((state) => state.cartDrawer);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCrust, setSelectedCrust] = useState(null);
  const [selectedSeasonings, setSelectedSeasonings] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedInstructions, setSelectedInstructions] = useState({
    cut: [],
    bake: [],
  });

  const [isCrustSelected, setIsCrustSelected] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const hasCrusts = item.crusts && item.crusts.length > 0;

  // Auto-select first crust (index 0) if available
  useEffect(() => {
    if (hasCrusts && item.crusts.length > 0 && !selectedCrust) {
      const firstCrust = item.crusts[0];
      setSelectedCrust(firstCrust);
      setIsCrustSelected(true);
    }
  }, [hasCrusts, item.crusts, selectedCrust]);

  // Auto-select first available size based on crust
  useEffect(() => {
    if (item.size && item.size.length > 0 && selectedCrust) {
      const availableSizes = [];
      if (selectedCrust.size?.small) availableSizes.push("Small");
      if (selectedCrust.size?.medium) availableSizes.push("Medium");
      if (selectedCrust.size?.large) availableSizes.push("Large");

      if (availableSizes.length > 0) {
        const firstAvailable = item.size.find(
          (s) => s.name === availableSizes[0],
        );
        if (firstAvailable && !selectedSize) {
          setSelectedSize(firstAvailable);
        }
      }
    }
  }, [selectedCrust, item.size]);

  // Check if product already in cart
  useEffect(() => {
    const exists = cartsList.some((cartItem) => cartItem.productId === item.id);
    setIsInCart(exists);
  }, [cartsList, item.id]);

  // Create image array
  const images = [item.image, ...(item.gallery_image || [])].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Handler functions
  const handleCrustSelect = (crust) => {
    const crustId = crust._id || crust.id;
    const selectedId = selectedCrust?._id || selectedCrust?.id;

    if (crustId === selectedId) {
      setSelectedCrust(null);
      setIsCrustSelected(false);
      setSelectedSize(null);
    } else {
      setSelectedCrust(crust);
      setIsCrustSelected(true);
      setSelectedSize(null);
    }
  };

  const handleSizeSelect = (size) => {
    if (selectedSize?.name === size.name) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };

  const handleSeasoningSelect = (seasoning) => {
    const exists = selectedSeasonings.some((s) => s.name === seasoning.name);
    if (exists) {
      setSelectedSeasonings(
        selectedSeasonings.filter((s) => s.name !== seasoning.name),
      );
    } else {
      setSelectedSeasonings([...selectedSeasonings, seasoning]);
    }
  };

  const handleAddonSelect = (addon) => {
    const addonId = addon._id || addon.id;
    const exists = selectedAddons.some((a) => (a._id || a.id) === addonId);
    if (exists) {
      setSelectedAddons(
        selectedAddons.filter((a) => (a._id || a.id) !== addonId),
      );
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleInstructionSelect = (type, instruction) => {
    const exists = selectedInstructions[type].some(
      (s) => s.name === instruction.name,
    );
    if (exists) {
      setSelectedInstructions({
        ...selectedInstructions,
        [type]: selectedInstructions[type].filter(
          (s) => s.name !== instruction.name,
        ),
      });
    } else {
      setSelectedInstructions({
        ...selectedInstructions,
        [type]: [...selectedInstructions[type], instruction],
      });
    }
  };

  const getCurrentPrice = () => {
    if (selectedSize) {
      return selectedSize.price;
    }
    if (item.min_price) {
      return item.min_price;
    }
    return 0;
  };

  const isSizeRequired = item.size && item.size.length > 0;
  const isSizeSelected = selectedSize !== null;

  const isAddToCartDisabled =
    !item.is_available ||
    isAddingToCart ||
    (isSizeRequired && !isSizeSelected) ||
    (hasCrusts && !isCrustSelected);

  const handleAddToCart = () => {
    if (isAddToCartDisabled) return;

    setIsAddingToCart(true);
    dispatch(
      singleAddToCartsList({
        productId: item.id,
        name: item.name,
        image: item.image,
        price: getCurrentPrice(),
        size: selectedSize?.name || null,
        crust: selectedCrust?.name || null,
        seasonings: selectedSeasonings.map((s) => s.name),
        addons: selectedAddons.map((a) => a.name),
        instructions: {
          cut: selectedInstructions.cut.map((s) => s.name),
          bake: selectedInstructions.bake.map((s) => s.name),
        },
      }),
    );

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  const getButtonText = () => {
    if (isInCart) return "In Cart";
    if (isAddingToCart) return "Adding...";
    if (!item.is_available) return "Unavailable";
    if (hasCrusts && !isCrustSelected) return "Select Crust First";
    if (isSizeRequired && !isSizeSelected) return "Select Size";
    return `Add to Cart - $${getCurrentPrice()}`;
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
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* ===== IMAGE SECTION ===== */}
            <div className="relative bg-zinc-900">
              <div className="relative h-80 md:h-[500px]">
                <Image
                  src={getImageUrl(images[currentImageIndex])}
                  alt={item.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />

                {!item.is_available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <span className="text-white text-xl font-bold px-6 py-3 border-2 border-white rounded-lg">
                      Currently Unavailable
                    </span>
                  </div>
                )}

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
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ===== CONTENT SECTION ===== */}
            <div className="p-6 md:p-10 overflow-y-auto max-h-[800px] custom-scrollbar">
              {/* Category */}
              {item.categories && item.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.categories.map((cat, index) => (
                    <span
                      key={index}
                      className="inline-block text-xs text-amber-400 font-medium"
                    >
                      {cat?.name || cat}
                      {index < item.categories.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {item.name}
              </h1>

              {/* Flags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.is_veg && (
                  <span className="inline-block bg-green-600/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                    🌿 Vegetarian
                  </span>
                )}
                {item.is_spicy && (
                  <span className="inline-block bg-red-600/20 text-red-400 text-xs font-semibold px-3 py-1 rounded-full">
                    🌶️ Spicy
                  </span>
                )}
                {item.is_gluten_free && (
                  <span className="inline-block bg-blue-600/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
                    Gluten Free
                  </span>
                )}
              </div>

              {/* Short Description */}
              {item.short_description && (
                <p className="text-gray-300 leading-relaxed mb-4">
                  {item.short_description}
                </p>
              )}

              {/* ===== CRUST ===== */}
              <CrustSelector
                crusts={item.crusts}
                selectedCrust={selectedCrust}
                onSelect={handleCrustSelect}
              />

              {/* ===== SIZE ===== */}
              <SizeSelector
                sizes={item.size}
                selectedSize={selectedSize}
                onSelect={handleSizeSelect}
                hasCrusts={hasCrusts}
                isCrustSelected={isCrustSelected}
                selectedCrust={selectedCrust}
              />

              {/* ===== SEASONING ===== */}
              <SeasoningSelector
                seasonings={item.seasoning}
                selectedSeasonings={selectedSeasonings}
                onSelect={handleSeasoningSelect}
              />

              {/* ===== ADDONS ===== */}
              {item.grouped_addons &&
                Object.keys(item.grouped_addons).length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">
                      Add-ons
                    </h3>
                    {Object.keys(item.grouped_addons).map((category) => (
                      <AddonSection
                        key={category}
                        category={category}
                        addons={item.grouped_addons[category]}
                        selectedAddons={selectedAddons}
                        onSelect={handleAddonSelect}
                      />
                    ))}
                  </div>
                )}

              {/* ===== SPECIAL INSTRUCTIONS ===== */}
              <SpecialInstructions
                instructions={item.special_instructions}
                selectedInstructions={selectedInstructions}
                onSelect={handleInstructionSelect}
              />

              {/* ===== FEATURES ===== */}
              {item.features && item.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
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

              {/* ===== META INFO ===== */}
              <div className="border-t border-zinc-800 pt-4 flex flex-wrap gap-4 text-xs text-gray-500">
                {item.sku && <span>SKU: {item.sku}</span>}
                {item.preparation_time && (
                  <span>⏱️ {item.preparation_time} min</span>
                )}
              </div>

              {/* ===== ADD TO CART ===== */}
              <div className="flex gap-3 mt-6">
                <button
                  disabled={isAddToCartDisabled}
                  onClick={handleAddToCart}
                  className={`flex-1 font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                    isInCart
                      ? "bg-green-600 text-white cursor-pointer hover:bg-green-700"
                      : isAddingToCart
                        ? "bg-green-600 text-white"
                        : !isAddToCartDisabled
                          ? "bg-amber-500 text-black hover:bg-amber-600"
                          : "bg-zinc-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isInCart && <Check size={18} />}
                    {getButtonText()}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ===== FULL DESCRIPTION ===== */}
          {item.description && (
            <div className="border-t border-zinc-800 p-6 md:p-10">
              <h2 className="text-xl font-bold text-white mb-4">Description</h2>
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>
          )}
        </div>

        {/* ===== YOU MAY ALSO LIKE ===== */}
        {addonItems && addonItems.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              You May Also Like
              <span className="text-sm font-normal text-gray-400 ml-2">
                ({addonItems.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {addonItems.map((addon) => (
                <RelatedItemCard key={addon.id} item={addon} />
              ))}
            </div>
          </div>
        )}

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1a1a1a;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #f59e0b;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #d97706;
          }
        `}</style>
      </div>
    </section>
  );
}
