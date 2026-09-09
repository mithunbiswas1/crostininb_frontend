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
  Minus,
} from "lucide-react";
import { baseUriBackend } from "@/redux/url/url";
import {
  singleAddToCartsList,
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

  // If only one size and no crusts, hide the size name
  const showSizeName = sizes.length > 1;

  return (
    <div className="mb-6">
      {showSizeName && (
        <h3 className="text-sm font-semibold text-gray-400 mb-3">
          Select Size <span className="text-red-500">*</span>
          {isDisabled && (
            <span className="text-xs text-amber-400 ml-2">
              (Select crust first)
            </span>
          )}
        </h3>
      )}

      <div className="flex flex-wrap gap-3">
        {sizes.map((size, index) => {
          // Check if this size is available for selected crust
          const isSizeAvailable =
            !hasCrusts ||
            (hasCrusts &&
              isCrustSelected &&
              selectedCrust?.size?.[size.name.toLowerCase()] === true);

          const isSelected = selectedSize?.name === size.name;

          // If only one size, make it visually different
          const isSingleSize = sizes.length === 1 && !hasCrusts;

          return (
            <button
              key={index}
              onClick={() => isSizeAvailable && onSelect(size)}
              disabled={!isSizeAvailable}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all min-w-[100px] text-center ${!isSizeAvailable
                ? "bg-zinc-800/30 text-gray-600 cursor-not-allowed border border-zinc-700/50"
                : isSelected
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-105"
                  : isSingleSize
                    ? "bg-amber-500/10 text-white border border-amber-500/30"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700"
                }`}
            >
              {showSizeName && <div className="font-bold">{size.name}</div>}
              <div
                className={
                  showSizeName ? "text-xs opacity-70" : "font-bold text-lg"
                }
              >
                ${size.price}
              </div>
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
              className={`bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all text-left ${isSelected
                ? "border-amber-500 shadow-lg shadow-amber-500/20"
                : "border-zinc-700 hover:border-zinc-500"
                }`}
            >
              <div className="flex flex-col">
                {/* Top section: Name (left) and Radio (right) */}
                <div className="flex items-start justify-between p-3">
                  {/* Name */}
                  <h4 className="text-white font-medium text-sm line-clamp-1 flex-1 mr-2">
                    {crust.name}
                  </h4>

                  {/* Selection Indicator - Radio Button */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${isSelected
                      ? "border-amber-500 bg-amber-500"
                      : "border-zinc-600"
                      }`}
                  >
                    {isSelected && <Check size={12} className="text-black" />}
                  </div>
                </div>

                {/* Bottom section: Image */}
                <div className="relative w-full aspect-[4/3] bg-zinc-700">
                  <Image
                    src={getImageUrl(crust.image)}
                    alt={crust.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ==================== SAUCE SELECTOR (Single Select - Default First) ====================
const SauceSelector = ({
  sauces,
  selectedSauce,
  onSelect,
  setSelectedSauceVariant,
}) => {
  if (!sauces || sauces.length === 0) return null;

  const [selectedVariant, setSelectedVariant] = useState(null);

  // Auto-select first sauce and its first variant
  useEffect(() => {
    if (sauces.length > 0 && !selectedSauce) {
      const firstSauce = sauces[0];
      onSelect(firstSauce);

      // Auto-select first variant for the sauce
      if (firstSauce.variants) {
        const variantKeys = Object.keys(firstSauce.variants).filter(
          (key) => firstSauce.variants[key] === true,
        );
        if (variantKeys.length > 0) {
          const firstVariant = variantKeys[0];
          setSelectedVariant(firstVariant);
          // Set the selected variant in parent
          setSelectedSauceVariant(
            firstSauce._id || firstSauce.id,
            firstVariant,
          );
        }
      }
    }
  }, [sauces]);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    // Update parent with selected variant
    if (selectedSauce) {
      setSelectedSauceVariant(selectedSauce._id || selectedSauce.id, variant);
    }
  };

  // Get variant price
  const getVariantPrice = (sauce, variant) => {
    if (sauce.variant_prices && sauce.variant_prices[variant] !== undefined) {
      return sauce.variant_prices[variant];
    }
    return 0;
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Sauces</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sauces.map((sauce) => {
          const sauceId = sauce._id || sauce.id;
          const isSelected =
            (selectedSauce?._id || selectedSauce?.id) === sauceId;
          const variantKeys = sauce.variants
            ? Object.keys(sauce.variants).filter(
              (key) => sauce.variants[key] === true,
            )
            : [];
          const currentVariant = isSelected ? selectedVariant : null;
          const selectedVariantPrice =
            isSelected && currentVariant
              ? getVariantPrice(sauce, currentVariant)
              : 0;

          return (
            <div
              key={sauceId}
              onClick={() => onSelect(sauce)}
              className={`bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${isSelected
                ? "border-amber-500 shadow-lg shadow-amber-500/20"
                : "border-zinc-700 hover:border-zinc-500"
                }`}
            >
              <div className="flex items-center gap-3 p-3">
                {/* Image */}
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-700">
                  <Image
                    src={getImageUrl(sauce.image)}
                    alt={sauce.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Name & Price */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm line-clamp-1">
                    {sauce.name}
                  </h4>
                </div>

                {/* Selection Indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected
                    ? "border-amber-500 bg-amber-500"
                    : "border-zinc-600"
                    }`}
                >
                  {isSelected && <Check size={12} className="text-black" />}
                </div>
              </div>

              {/* Variants - Bottom Row */}
              {isSelected && variantKeys.length > 0 && (
                <div className="px-3 pb-3 pt-0 border-t border-zinc-700/50">
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {variantKeys.map((variant) => {
                      const isVariantSelected = selectedVariant === variant;
                      const variantPrice = getVariantPrice(sauce, variant);
                      return (
                        <button
                          key={variant}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVariantSelect(variant);
                          }}
                          className={`px-2.5 py-1 rounded text-xs transition-all ${isVariantSelected
                            ? "bg-amber-500 text-black font-medium"
                            : "bg-zinc-700/50 text-gray-400 hover:bg-zinc-700 hover:text-white"
                            }`}
                        >
                          {variant}
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

// ==================== CHEESE SELECTOR (Single Select - Default First) ====================
const CheeseSelector = ({
  cheeses,
  selectedCheese,
  onSelect,
  setSelectedCheeseVariant,
}) => {
  if (!cheeses || cheeses.length === 0) return null;

  const [selectedVariant, setSelectedVariant] = useState(null);

  // Auto-select first cheese and its first variant
  useEffect(() => {
    if (cheeses.length > 0 && !selectedCheese) {
      const firstCheese = cheeses[0];
      onSelect(firstCheese);

      // Auto-select first variant for the cheese
      if (firstCheese.variants) {
        const variantKeys = Object.keys(firstCheese.variants).filter(
          (key) => firstCheese.variants[key] === true,
        );
        if (variantKeys.length > 0) {
          const firstVariant = variantKeys[0];
          setSelectedVariant(firstVariant);
          // Set the selected variant in parent
          setSelectedCheeseVariant(
            firstCheese._id || firstCheese.id,
            firstVariant,
          );
        }
      }
    }
  }, [cheeses]);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    // Update parent with selected variant
    if (selectedCheese) {
      setSelectedCheeseVariant(
        selectedCheese._id || selectedCheese.id,
        variant,
      );
    }
  };

  // Get variant price
  const getVariantPrice = (cheese, variant) => {
    if (cheese.variant_prices && cheese.variant_prices[variant] !== undefined) {
      return cheese.variant_prices[variant];
    }
    return 0;
  };

  // No Cheese option
  const noCheeseOption = {
    id: 'no-cheese',
    name: 'No Cheese',
    image: null,
    isNoCheese: true
  };

  // Combine options
  const allOptions = [...cheeses, noCheeseOption];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Cheeses</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {allOptions.map((cheese) => {
          const isNoCheese = cheese.isNoCheese;
          const cheeseId = isNoCheese ? 'no-cheese' : (cheese._id || cheese.id);
          const isSelected = isNoCheese
            ? selectedCheese === 'no-cheese'
            : (selectedCheese?._id || selectedCheese?.id) === cheeseId;

          const variantKeys = !isNoCheese && cheese.variants
            ? Object.keys(cheese.variants).filter(
              (key) => cheese.variants[key] === true,
            )
            : [];
          const currentVariant = isSelected && !isNoCheese ? selectedVariant : null;
          const selectedVariantPrice =
            isSelected && !isNoCheese && currentVariant
              ? getVariantPrice(cheese, currentVariant)
              : 0;

          return (
            <div
              key={cheeseId}
              onClick={() => {
                if (isNoCheese) {
                  onSelect('no-cheese');
                  setSelectedCheeseVariant('no-cheese', null);
                  setSelectedVariant(null);
                } else {
                  onSelect(cheese);
                  // Auto-select first variant if available
                  if (cheese.variants) {
                    const variantKeys = Object.keys(cheese.variants).filter(
                      (key) => cheese.variants[key] === true,
                    );
                    if (variantKeys.length > 0) {
                      const firstVariant = variantKeys[0];
                      setSelectedVariant(firstVariant);
                      setSelectedCheeseVariant(
                        cheese._id || cheese.id,
                        firstVariant,
                      );
                    }
                  }
                }
              }}
              className={`bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${isSelected
                ? "border-amber-500 shadow-lg shadow-amber-500/20"
                : "border-zinc-700 hover:border-zinc-500"
                } ${isNoCheese ? 'bg-zinc-800/30' : ''}`}
            >
              <div className="flex flex-col">
                {/* Top section: Name (left) and Radio (right) */}
                <div className="flex items-start justify-between p-3">
                  <h4 className={`text-white font-medium text-sm line-clamp-1 flex-1 mr-2 ${isNoCheese ? 'text-gray-400' : ''}`}>
                    {cheese.name}
                  </h4>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${isSelected
                      ? "border-amber-500 bg-amber-500"
                      : "border-zinc-600"
                      }`}
                  >
                    {isSelected && <Check size={12} className="text-black" />}
                  </div>
                </div>

                {/* Bottom section: Image (only if not "No Cheese") */}
                {!isNoCheese && cheese.image && (
                  <div className="relative w-full aspect-[4/3] bg-zinc-700">
                    <Image
                      src={getImageUrl(cheese.image)}
                      alt={cheese.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}

                {/* Show empty placeholder for "No Cheese" option */}
                {isNoCheese && (
                  <div className="w-full aspect-[4/3] bg-zinc-800/30 flex items-center justify-center border-t border-zinc-700/30">
                    <span className="text-zinc-600 text-xs">No cheese selected</span>
                  </div>
                )}
              </div>

              {/* Variants - Bottom Row (only for cheese with variants) */}
              {!isNoCheese && isSelected && variantKeys.length > 0 && (
                <div className="px-3 pb-3 pt-0 border-t border-zinc-700/50">
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {variantKeys.map((variant) => {
                      const isVariantSelected = selectedVariant === variant;
                      const variantPrice = getVariantPrice(cheese, variant);
                      return (
                        <button
                          key={variant}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVariantSelect(variant);
                          }}
                          className={`px-2.5 py-1 rounded text-xs transition-all ${isVariantSelected
                            ? "bg-amber-500 text-black font-medium"
                            : "bg-zinc-700/50 text-gray-400 hover:bg-zinc-700 hover:text-white"
                            }`}
                        >
                          {variant}
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

// ==================== SEASONING SELECTOR (Single Select) ====================
const SeasoningSelector = ({ seasonings, selectedSeasonings, onSelect }) => {
  if (!seasonings || seasonings.length === 0) return null;

  // Auto-select first seasoning
  useEffect(() => {
    if (seasonings.length > 0 && selectedSeasonings.length === 0) {
      onSelect(seasonings[0]);
    }
  }, [seasonings]);

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">
        Choose Seasonings
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {seasonings.map((seasoning, index) => {
          const isSelected = selectedSeasonings.some(
            (s) => s.name === seasoning.name,
          );

          return (
            <button
              key={index}
              onClick={() => {
                // Single select - if already selected, deselect it
                if (isSelected) {
                  onSelect(seasoning); // This will deselect via the handler
                } else {
                  // Deselect all others and select this one
                  onSelect(seasoning);
                }
              }}
              className={`bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all text-left ${isSelected
                ? "border-amber-500 shadow-lg shadow-amber-500/20"
                : "border-zinc-700 hover:border-zinc-500"
                }`}
            >
              <div className="flex items-center justify-between p-4">
                {/* Name */}
                <h4 className="text-white font-medium text-sm flex-1 mr-2">
                  {seasoning.name}
                </h4>

                {/* Selection Indicator - Radio Button */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected
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

// ==================== ADDON CARD (Section Wise - Dynamic Categories) ====================
const AddonSection = ({ category, addons, selectedAddons, onSelect, onVariantChange }) => {
  if (!addons || addons.length === 0) return null;

  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedPlacements, setSelectedPlacements] = useState({});

  // Static pizza placement options
  const pizzaPlacementOptions = [
    { name: 'left', label: 'Left' },
    { name: 'center', label: 'Center' },
    { name: 'right', label: 'Right' },
  ];

  // Auto-select default variant for each addon when selected
  useEffect(() => {
    const defaultVariants = {};
    const defaultPlacements = {};
    addons.forEach((addon) => {
      const addonId = addon._id || addon.id;
      if (addon.variants && addon.variants.length > 0) {
        const lightVariant =
          addon.variants.find((v) => v.name === "light") || addon.variants[0];
        if (!selectedVariants[addonId]) {
          defaultVariants[addonId] = lightVariant;
          defaultPlacements[addonId] = 'center';
        }
      }
    });
    if (Object.keys(defaultVariants).length > 0) {
      setSelectedVariants((prev) => ({
        ...prev,
        ...defaultVariants,
      }));
      setSelectedPlacements((prev) => ({
        ...prev,
        ...defaultPlacements,
      }));
    }
  }, [addons]);

  const handleVariantSelect = (addonId, variant, e) => {
    e.stopPropagation();
    setSelectedVariants((prev) => ({
      ...prev,
      [addonId]: variant,
    }));
    // Notify parent about variant change
    if (onVariantChange) {
      onVariantChange(addonId, 'variant', variant);
    }
  };

  const handlePlacementSelect = (addonId, placement, e) => {
    e.stopPropagation();
    setSelectedPlacements((prev) => ({
      ...prev,
      [addonId]: placement,
    }));
    // Notify parent about placement change
    if (onVariantChange) {
      onVariantChange(addonId, 'placement', placement);
    }
  };

  // Format category name
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
          const selectedPlacement = selectedPlacements[addonId] || 'center';

          return (
            <div
              key={addonId}
              onClick={() => onSelect(addon)}
              className={`bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${isSelected
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

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm line-clamp-1">
                    {addon.name}
                  </h4>
                </div>

                {/* Selection Indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected
                    ? "border-amber-500 bg-amber-500"
                    : "border-zinc-600"
                    }`}
                >
                  {isSelected && <Check size={12} className="text-black" />}
                </div>
              </div>

              {/* Variants - Bottom Row with Left, Center, Right */}
              {isSelected && addon.variants && addon.variants.length > 0 && (
                <div className="px-3 pb-3 pt-0 border-t border-zinc-700/50">
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {/* Variant buttons (Light, Normal, Extra) */}
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {addon.variants.map((variant, vIndex) => {
                        const isVariantSelected = selectedVariant?.name === variant.name;
                        const variantPrice = variant.price || 0;
                        return (
                          <button
                            key={vIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVariantSelect(addonId, variant, e);
                            }}
                            className={`px-2.5 py-1 rounded text-xs transition-all ${isVariantSelected
                              ? "bg-amber-500 text-black font-medium"
                              : "bg-zinc-700/50 text-gray-400 hover:bg-zinc-700 hover:text-white"
                              }`}
                          >
                            {variant.name}

                          </button>
                        );
                      })}
                    </div>

                    {/* Placement buttons (Left, Center, Right)  Right side */}
                    <div className="flex gap-1.5 flex-shrink-0">
                      {pizzaPlacementOptions.map((option) => {
                        const isPlacementSelected = selectedPlacement === option.name;
                        return (
                          <button
                            key={option.name}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlacementSelect(addonId, option.name, e);
                            }}
                            className={`px-2.5 py-1 rounded text-xs transition-all ${isPlacementSelected
                              ? "bg-amber-500 text-black font-medium"
                              : "bg-zinc-700/50 text-gray-400 hover:bg-zinc-700 hover:text-white"
                              }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
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
              const isSelected =
                selectedInstructions.cut &&
                selectedInstructions.cut.some((s) => s.name === item.name);
              return (
                <button
                  key={index}
                  onClick={() => onSelect("cut", item)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${isSelected
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
              const isSelected =
                selectedInstructions.bake &&
                selectedInstructions.bake.some((s) => s.name === item.name);
              return (
                <button
                  key={index}
                  onClick={() => onSelect("bake", item)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${isSelected
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

// ==================== RELATED ITEM CARD (Crusts Card Style) ====================
const RelatedItemCard = ({
  item,
  quantity = 0,
  onAdd,
  onIncrement,
  onDecrement,
}) => {
  const itemId = item.id || item._id;
  const price =
    item.size?.price ||
    (Array.isArray(item.size) ? item.size[0]?.price : null) ||
    item.price ||
    item.min_price ||
    item.variation?.offer_price ||
    item.variation?.regular_price ||
    0;

  // Available unless explicitly false (getCardItems already filters is_available: true)
  const isAvailable = item.is_available !== false && item.is_active !== false;
  const isSelected = quantity > 0;

  return (
    <div
      onClick={!isSelected && isAvailable ? () => onAdd(item) : undefined}
      className={`group relative bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all text-left flex flex-col ${isSelected
        ? "border-amber-500 shadow-lg shadow-amber-500/20"
        : "border-zinc-700 hover:border-zinc-500 cursor-pointer"
        } ${!isAvailable ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <div className="flex flex-col">
        {/* Top section: Name & Price (left) and Action / - 1 + (right) */}
        <div className="flex items-center justify-between p-3 gap-2 bg-zinc-900/40">
          <div className="flex-1 min-w-0">
            <Link
              href={`/items/${item.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="block"
            >
              <h4 className="text-white font-medium text-xs sm:text-sm line-clamp-1 hover:text-amber-400 transition-colors">
                {item.name}
              </h4>
            </Link>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-amber-400 font-bold text-xs sm:text-sm">
                ${price}
              </span>
              {item.is_addon && (
                <span className="bg-purple-600/80 text-white text-[8px] px-1.5 py-0.2 rounded font-medium">
                  Addon
                </span>
              )}
            </div>
          </div>

          {/* Right Action: When selected, show "- count +", else show circle Add */}
          <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            {isSelected ? (
              <div className="flex items-center gap-1 bg-amber-500 text-black rounded-md px-1.5 py-1 font-bold text-xs shadow-md">
                <button
                  type="button"
                  onClick={() => onDecrement(item)}
                  aria-label="Decrease quantity"
                  className="w-5 h-5 flex items-center justify-center hover:bg-black/15 rounded active:scale-90 transition-all cursor-pointer"
                >
                  <Minus size={12} strokeWidth={2.5} />
                </button>
                <span className="w-4 text-center font-bold select-none text-xs">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onIncrement(item)}
                  aria-label="Increase quantity"
                  className="w-5 h-5 flex items-center justify-center hover:bg-black/15 rounded active:scale-90 transition-all cursor-pointer"
                >
                  <Plus size={12} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onAdd(item)}
                disabled={!isAvailable}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isAvailable
                  ? "border-zinc-600 hover:border-amber-500 hover:bg-amber-500 hover:text-black text-gray-300 cursor-pointer"
                  : "border-zinc-700 text-zinc-600 cursor-not-allowed"
                  }`}
              >
                <Plus size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Bottom section: Image (exact Crusts card style) */}
        <div className="relative w-full aspect-[4/3] bg-zinc-700 overflow-hidden">
          <Image
            src={getImageUrl(item.image)}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />

          {!isAvailable && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="text-[10px] font-semibold text-white px-2 py-0.5 bg-red-600/80 rounded">
                Unavailable
              </span>
            </div>
          )}
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
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedSeasonings, setSelectedSeasonings] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedRelatedItems, setSelectedRelatedItems] = useState({});
  const [selectedInstructions, setSelectedInstructions] = useState({
    cut: [],
    bake: [],
  });

  // Track selected variants for sauce and cheese
  const [selectedSauceVariant, setSelectedSauceVariant] = useState(null);
  const [selectedCheeseVariant, setSelectedCheeseVariant] = useState(null);

  const [isCrustSelected, setIsCrustSelected] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Reset isInCart whenever any ingredient or option is changed
  useEffect(() => {
    setIsInCart(false);
  }, [
    selectedSize,
    selectedCrust,
    selectedSauce,
    selectedSauceVariant,
    selectedCheese,
    selectedCheeseVariant,
    selectedSeasonings,
    selectedAddons,
    selectedRelatedItems,
    selectedInstructions,
  ]);

  const hasCrusts = item.crusts && item.crusts.length > 0;
  const hasSauces = item.sauces && item.sauces.length > 0;
  const hasCheeses = item.cheeses && item.cheeses.length > 0;
  const hasGroupedAddons =
    item.grouped_addons && Object.keys(item.grouped_addons).length > 0;

  // Check if single size (no size name needed)
  const hasSingleSize = item.size && item.size.length === 1 && !hasCrusts;

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

  // Auto-select first size if only one and no crusts
  useEffect(() => {
    if (hasSingleSize && !selectedSize) {
      setSelectedSize(item.size[0]);
    }
  }, [hasSingleSize, item.size, selectedSize]);

  // Auto-select first sauce if available
  useEffect(() => {
    if (hasSauces && item.sauces.length > 0 && !selectedSauce) {
      setSelectedSauce(item.sauces[0]);
    }
  }, [hasSauces, item.sauces, selectedSauce]);

  // Auto-select first cheese if available
  useEffect(() => {
    if (hasCheeses && item.cheeses.length > 0 && !selectedCheese) {
      setSelectedCheese(item.cheeses[0]);
    }
  }, [hasCheeses, item.cheeses, selectedCheese]);

  // Auto-select first cut instruction if available
  useEffect(() => {
    if (
      item.special_instructions?.cut &&
      item.special_instructions.cut.length > 0 &&
      selectedInstructions.cut.length === 0
    ) {
      setSelectedInstructions((prev) => ({
        ...prev,
        cut: [item.special_instructions.cut[0]],
      }));
    }
  }, [item.special_instructions]);

  // Auto-select first bake instruction if available
  useEffect(() => {
    if (
      item.special_instructions?.bake &&
      item.special_instructions.bake.length > 0 &&
      selectedInstructions.bake.length === 0
    ) {
      setSelectedInstructions((prev) => ({
        ...prev,
        bake: [item.special_instructions.bake[0]],
      }));
    }
  }, [item.special_instructions]);


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

  const handleSauceSelect = (sauce) => {
    const sauceId = sauce._id || sauce.id;
    const selectedId = selectedSauce?._id || selectedSauce?.id;

    if (sauceId === selectedId) {
      setSelectedSauce(null);
      setSelectedSauceVariant(null);
    } else {
      setSelectedSauce(sauce);
      setSelectedSauceVariant(null);
    }
  };

  const handleCheeseSelect = (cheese) => {
    const cheeseId = cheese._id || cheese.id;
    const selectedId = selectedCheese?._id || selectedCheese?.id;

    if (cheeseId === selectedId) {
      setSelectedCheese(null);
      setSelectedCheeseVariant(null);
    } else if (cheese === 'no-cheese') {
      setSelectedCheese('no-cheese');
      setSelectedCheeseVariant(null);
    } else {
      setSelectedCheese(cheese);
      setSelectedCheeseVariant(null);
    }
  };

  const handleSetSauceVariant = (sauceId, variant) => {
    setSelectedSauceVariant(variant);
  };

  const handleSetCheeseVariant = (cheeseId, variant) => {
    setSelectedCheeseVariant(variant);
  };

  const handleSeasoningSelect = (seasoning) => {
    const isSelected = selectedSeasonings.some((s) => s.name === seasoning.name);

    if (isSelected) {
      setSelectedSeasonings([]);
    } else {
      setSelectedSeasonings([seasoning]);
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
      // Add with default variant and placement
      const defaultVariant = addon.variants?.[0]?.name || 'normal';
      const addonWithDetails = {
        ...addon,
        _selectedVariant: defaultVariant,
        _selectedPlacement: 'center'
      };
      setSelectedAddons([...selectedAddons, addonWithDetails]);
    }
  };

  // Handle variant/placement change from AddonSection
  const handleAddonVariantChange = (addonId, type, value) => {
    setSelectedAddons((prev) =>
      prev.map((a) => {
        const id = a._id || a.id;
        if (id === addonId) {
          if (type === 'variant') {
            return { ...a, _selectedVariant: value.name };
          } else if (type === 'placement') {
            return { ...a, _selectedPlacement: value };
          }
        }
        return a;
      })
    );
  };

  const handleInstructionSelect = (type, instruction) => {
    setSelectedInstructions((prev) => {
      const current = prev[type] || [];
      const exists = current.some((s) => s.name === instruction.name);
      if (exists) {
        return {
          ...prev,
          [type]: current.filter((s) => s.name !== instruction.name),
        };
      } else {
        return {
          ...prev,
          [type]: [instruction],
        };
      }
    });
  };

  // Related items (You May Also Like) handlers
  const handleRelatedItemAdd = (relItem) => {
    const relId = relItem._id || relItem.id;
    const p =
      relItem.size?.price ||
      (Array.isArray(relItem.size) ? relItem.size[0]?.price : null) ||
      relItem.price ||
      relItem.min_price ||
      relItem.variation?.offer_price ||
      relItem.variation?.regular_price ||
      0;

    setSelectedRelatedItems((prev) => ({
      ...prev,
      [relId]: {
        item: relItem,
        quantity: (prev[relId]?.quantity || 0) + 1,
        price: p,
      },
    }));
  };

  const handleRelatedItemIncrement = (relItem) => {
    const relId = relItem._id || relItem.id;
    const p =
      relItem.size?.price ||
      (Array.isArray(relItem.size) ? relItem.size[0]?.price : null) ||
      relItem.price ||
      relItem.min_price ||
      relItem.variation?.offer_price ||
      relItem.variation?.regular_price ||
      0;

    setSelectedRelatedItems((prev) => ({
      ...prev,
      [relId]: {
        item: relItem,
        quantity: (prev[relId]?.quantity || 0) + 1,
        price: p,
      },
    }));
  };

  const handleRelatedItemDecrement = (relItem) => {
    const relId = relItem._id || relItem.id;
    setSelectedRelatedItems((prev) => {
      const currentQty = prev[relId]?.quantity || 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[relId];
        return updated;
      }
      return {
        ...prev,
        [relId]: {
          ...prev[relId],
          quantity: currentQty - 1,
        },
      };
    });
  };

  const getMainProductPrice = () => {
    // Base price from size
    let total = 0;
    if (selectedSize) {
      total += Number(selectedSize.price) || 0;
    } else if (item.min_price) {
      total += Number(item.min_price) || 0;
    }

    // Sauce variant price
    if (selectedSauce) {
      const variant = selectedSauceVariant || "light";
      total += Number(getSauceVariantPrice(selectedSauce, variant)) || 0;
    }

    // Cheese variant price
    if (selectedCheese && selectedCheese !== "no-cheese") {
      const variant = selectedCheeseVariant || "light";
      total += Number(getCheeseVariantPrice(selectedCheese, variant)) || 0;
    }

    // Addon variant prices
    selectedAddons.forEach((a) => {
      const variant = a._selectedVariant || a.variants?.[0]?.name || "normal";
      const addonPrice = a.variants?.find((v) => v.name === variant)?.price || 0;
      total += Number(addonPrice) || 0;
    });

    return total;
  };

  const getRelatedItemsTotalPrice = () => {
    let total = 0;
    Object.values(selectedRelatedItems).forEach((entry) => {
      if (entry.quantity > 0) {
        total += (Number(entry.price) || 0) * entry.quantity;
      }
    });
    return total;
  };

  const getCurrentPrice = () => {
    return getMainProductPrice() + getRelatedItemsTotalPrice();
  };

  // Format price display (remove trailing .00 if integer)
  const formatPrice = (price) => {
    const num = Number(price);
    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
  };

  // Get variant price for sauce
  const getSauceVariantPrice = (sauce, variant) => {
    if (sauce?.variant_prices && sauce.variant_prices[variant] !== undefined) {
      return sauce.variant_prices[variant];
    }
    return 0;
  };

  // Get variant price for cheese
  const getCheeseVariantPrice = (cheese, variant) => {
    if (
      cheese?.variant_prices &&
      cheese.variant_prices[variant] !== undefined
    ) {
      return cheese.variant_prices[variant];
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

    const { basics, sauce, cheese, addonsList } = getSelectionDisplay();
    const mainProductPrice = getMainProductPrice();

    const yourSelectionParts = [];
    if (basics.length > 0) yourSelectionParts.push(basics.join(", "));
    if (sauce) yourSelectionParts.push(sauce);
    if (cheese) yourSelectionParts.push(cheese);
    const yourSelectionText =
      yourSelectionParts.length > 0 ? yourSelectionParts.join(" | ") : null;

    const allAddonsData = addonsList.length > 0 ? addonsList : null;

    const sauceText = selectedSauce
      ? `${selectedSauce.name}${selectedSauceVariant ? ` (${selectedSauceVariant})` : ""}`
      : null;
    const cheeseText =
      selectedCheese === "no-cheese"
        ? "No Cheese"
        : selectedCheese
          ? `${selectedCheese.name}${selectedCheeseVariant ? ` (${selectedCheeseVariant})` : ""}`
          : null;

    // 1. Add main customized product to cart (NO extra field)
    dispatch(
      singleAddToCartsList({
        productId: item.id || item._id,
        name: item.name,
        image: item.image,
        price: mainProductPrice,
        quantity: 1,
        // Match user's exact requirements for local storage:
        "Your Selection": yourSelectionText,
        yourSelection: yourSelectionText,
        "Addons": allAddonsData,
        addons: allAddonsData,
        size: selectedSize?.name || null,
        crust: selectedCrust?.name || null,
        sauce: sauceText,
        cheese: cheeseText,
        seasonings: selectedSeasonings.map((s) => s.name).sort(),
        instructions: {
          cut:
            selectedInstructions.cut.length > 0
              ? selectedInstructions.cut.map((s) => s.name).join(", ")
              : null,
          bake:
            selectedInstructions.bake.length > 0
              ? selectedInstructions.bake.map((s) => s.name).join(", ")
              : null,
        },
      }),
    );

    // 2. Add each selected "You May Also Like" item separately into cart
    Object.values(selectedRelatedItems).forEach((entry) => {
      if (entry.quantity > 0) {
        dispatch(
          singleAddToCartsList({
            productId: entry.item._id || entry.item.id,
            name: entry.item.name,
            image: entry.item.image,
            price: Number(entry.price) || 0,
            quantity: entry.quantity,
          }),
        );
      }
    });

    setTimeout(() => {
      setIsAddingToCart(false);
      setIsInCart(true);
      setTimeout(() => {
        setIsInCart(false);
      }, 2500);
    }, 400);
  };

  const getButtonText = () => {
    if (isAddingToCart) return "Adding...";
    if (isInCart) return `Added to Cart! ($${formatPrice(getCurrentPrice())})`;
    if (!item.is_available) return "Unavailable";
    if (hasCrusts && !isCrustSelected) return "Select Crust First";
    if (isSizeRequired && !isSizeSelected && !hasSingleSize)
      return "Select Size";
    return `Add to Cart - $${formatPrice(getCurrentPrice())}`;
  };

  // Get selected item names for bottom display - Column Wise
  const getSelectedItems = () => {
    const items = [];

    if (selectedSize) {
      if ((item.size && item.size.length > 1) || hasCrusts) {
        items.push(`Size - ${selectedSize.name}`);
      } else {
        items.push(`Size - $${selectedSize.price}`);
      }
    }

    if (selectedCrust) {
      items.push(`Crust - ${selectedCrust.name}`);
    }

    if (selectedSauce) {
      const variant = selectedSauceVariant || "light";
      const price = getSauceVariantPrice(selectedSauce, variant);
      const priceText = price > 0 ? `+$${price}` : "Included";
      items.push(`Sauce - ${selectedSauce.name} (${variant})  ${priceText}`);
    }

    if (selectedCheese) {
      if (selectedCheese === 'no-cheese') {
        items.push(`Cheese - No Cheese`);
      } else {
        const variant = selectedCheeseVariant || "light";
        const price = getCheeseVariantPrice(selectedCheese, variant);
        const priceText = price > 0 ? `+$${price}` : "Included";
        items.push(`Cheese - ${selectedCheese.name} (${variant})  ${priceText}`);
      }
    }

    if (selectedSeasonings.length > 0) {
      const seasoningNames = selectedSeasonings.map((s) => s.name).join(", ");
      items.push(`Seasonings - ${seasoningNames}`);
    }

    if (selectedInstructions.cut.length > 0) {
      const cutNames = selectedInstructions.cut.map((s) => s.name).join(", ");
      items.push(`Cut - ${cutNames}`);
    }
    if (selectedInstructions.bake.length > 0) {
      const bakeNames = selectedInstructions.bake.map((s) => s.name).join(", ");
      items.push(`Bake - ${bakeNames}`);
    }

    // Add selected addons with variants and placement
    if (selectedAddons.length > 0) {
      const addonDetails = selectedAddons.map((a) => {
        const variant = a._selectedVariant || a.variants?.[0]?.name || 'normal';
        const placement = a._selectedPlacement || 'center';
        const price = a.variants?.find((v) => v.name === variant)?.price || 0;
        const priceText = price > 0 ? `+$${price}` : "Included";
        const displayVariant = variant.charAt(0).toUpperCase() + variant.slice(1);
        const displayPlacement = placement.charAt(0).toUpperCase() + placement.slice(1);
        return `${a.name} (${displayVariant} - ${displayPlacement})  ${priceText}`;
      });
      items.push(`Addons - ${addonDetails.join(", ")}`);
    }

    return items;
  };

  const selectedItems = getSelectedItems();

  // Get structured display data for Your Selection section
  const getSelectionDisplay = () => {
    const basics = [];

    if (selectedSize) {
      if ((item.size && item.size.length > 1) || hasCrusts) {
        basics.push(selectedSize.name);
      } else {
        basics.push(`$${selectedSize.price}`);
      }
    }
    if (selectedCrust) basics.push(selectedCrust.name);
    if (selectedSeasonings.length > 0) basics.push(selectedSeasonings.map((s) => s.name).join(", "));
    if (selectedInstructions.cut.length > 0) basics.push(selectedInstructions.cut.map((s) => s.name).join(", "));
    if (selectedInstructions.bake.length > 0) basics.push(selectedInstructions.bake.map((s) => s.name).join(", "));

    let sauce = null;
    if (selectedSauce) {
      const variant = selectedSauceVariant || "light";
      const price = getSauceVariantPrice(selectedSauce, variant);
      sauce = `${selectedSauce.name} (${variant})  ${price > 0 ? `+$${price}` : "Included"}`;
    }

    let cheese = null;
    if (selectedCheese) {
      if (selectedCheese === "no-cheese") {
        cheese = "No Cheese";
      } else {
        const variant = selectedCheeseVariant || "light";
        const price = getCheeseVariantPrice(selectedCheese, variant);
        cheese = `${selectedCheese.name} (${variant})  ${price > 0 ? `+$${price}` : "Included"}`;
      }
    }

    const addonsList = selectedAddons.map((a) => {
      const variant = a._selectedVariant || a.variants?.[0]?.name || "normal";
      const placement = a._selectedPlacement || "center";
      const price = a.variants?.find((v) => v.name === variant)?.price || 0;
      const priceText = price > 0 ? `+$${price}` : "Included";
      const displayVariant = variant.charAt(0).toUpperCase() + variant.slice(1);
      const displayPlacement = placement.charAt(0).toUpperCase() + placement.slice(1);
      return `${a.name} (${displayVariant} - ${displayPlacement})  ${priceText}`;
    });

    const extraList = Object.values(selectedRelatedItems)
      .filter((entry) => entry.quantity > 0)
      .map((entry) => {
        const p = (Number(entry.price) || 0) * entry.quantity;
        return `${entry.item.name} x${entry.quantity}  ${p > 0 ? `+$${p % 1 === 0 ? p : p.toFixed(2)}` : "Included"}`;
      });

    return { basics, sauce, cheese, addonsList, extraList };
  };

  const { basics, sauce, cheese, addonsList, extraList } = getSelectionDisplay();
  const hasSelection =
    basics.length > 0 ||
    sauce ||
    cheese ||
    addonsList.length > 0 ||
    extraList.length > 0;

  return (
    <section className="bg-black min-h-screen pt-30 pb-20">
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
        <div className="bg-[#111] border border-zinc-800 rounded-2xl">
          {/* grid: both cols equal height by default (items-stretch). Left col has no overflow so sticky works */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* ===== IMAGE SECTION (left col, sticky container) ===== */}
            <div className="bg-zinc-900 rounded-tl-2xl rounded-bl-2xl">
              <div className="relative h-80 md:h-[500px] overflow-hidden rounded-tl-2xl">
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
                      className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index
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

              {/* Selected Items Display Below Images - Desktop Only */}
              {hasSelection && (
                <div className="hidden md:block sticky top-20 z-10 p-4 bg-gradient-to-b from-zinc-900/95 to-zinc-900/80 border-t border-zinc-800/60 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                    <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Your Selection
                    </h4>
                  </div>
                  <div className="space-y-1.5">
                    {basics.length > 0 && (
                      <p className="text-xs text-gray-300 leading-relaxed">{basics.join(", ")}</p>
                    )}
                    {sauce && <p className="text-xs text-gray-400">{sauce}</p>}
                    {cheese && <p className="text-xs text-gray-400">{cheese}</p>}
                    {addonsList.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mt-6 mb-2">
                          <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                            Addons
                          </h4>
                        </div>
                        {addonsList.map((addon, i) => (
                          <p key={i} className="text-xs text-gray-400">{addon}</p>
                        ))}
                      </div>
                    )}
                    {extraList.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mt-6 mb-2">
                          <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                            You May Also Like
                          </h4>
                        </div>
                        {extraList.map((extra, i) => (
                          <p key={i} className="text-xs text-gray-400">{extra}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ===== CONTENT SECTION ===== */}
            <div className="p-6 md:p-10">
              {/* Your Selection - Mobile Only */}
              {hasSelection && (
                <div className="block md:hidden sticky top-16 z-10 -mx-6 px-4 py-3 mb-4 bg-gradient-to-b from-zinc-900/95 to-zinc-900/80 border-b border-zinc-800/60 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                    <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Your Selection
                    </h4>
                  </div>
                  <div className="space-y-1">
                    {basics.length > 0 && (
                      <p className="text-xs text-gray-300 leading-relaxed">{basics.join(", ")}</p>
                    )}
                    {sauce && <p className="text-xs text-gray-400">{sauce}</p>}
                    {cheese && <p className="text-xs text-gray-400">{cheese}</p>}
                    {addonsList.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mt-6 mb-2">
                          <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                            Addons
                          </h4>
                        </div>
                        {addonsList.map((addon, i) => (
                          <p key={i} className="text-xs text-gray-400 pl-2">{addon}</p>
                        ))}
                      </div>
                    )}
                    {extraList.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mt-6 mb-2">
                          <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                            You May Also Like
                          </h4>
                        </div>
                        {extraList.map((extra, i) => (
                          <p key={i} className="text-xs text-gray-400 pl-2">{extra}</p>
                        ))}
                      </div>
                    )}
                  </div>
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
              {hasCrusts && (
                <CrustSelector
                  crusts={item.crusts}
                  selectedCrust={selectedCrust}
                  onSelect={handleCrustSelect}
                />
              )}

              {/* ===== SIZE ===== */}
              <SizeSelector
                sizes={item.size}
                selectedSize={selectedSize}
                onSelect={handleSizeSelect}
                hasCrusts={hasCrusts}
                isCrustSelected={isCrustSelected}
                selectedCrust={selectedCrust}
              />

              {/* ===== SAUCES ===== */}
              {hasSauces && (
                <SauceSelector
                  sauces={item.sauces}
                  selectedSauce={selectedSauce}
                  onSelect={handleSauceSelect}
                  setSelectedSauceVariant={handleSetSauceVariant}
                />
              )}

              {/* ===== CHEESES ===== */}
              {hasCheeses && (
                <CheeseSelector
                  cheeses={item.cheeses}
                  selectedCheese={selectedCheese}
                  onSelect={handleCheeseSelect}
                  setSelectedCheeseVariant={handleSetCheeseVariant}
                />
              )}

              {/* ===== SEASONING ===== */}
              <SeasoningSelector
                seasonings={item.seasoning}
                selectedSeasonings={selectedSeasonings}
                onSelect={handleSeasoningSelect}
              />

              {/* ===== ADDONS ===== */}
              {hasGroupedAddons && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-100 mb-3 bg-gray-800 p-4 rounded-lg">
                    Add-ons
                  </h3>
                  {Object.keys(item.grouped_addons).map((category) => (
                    <AddonSection
                      key={category}
                      category={category}
                      addons={item.grouped_addons[category]}
                      selectedAddons={selectedAddons}
                      onSelect={handleAddonSelect}
                      onVariantChange={handleAddonVariantChange}
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

              {/* ===== YOU MAY ALSO LIKE (After SKU row) ===== */}
              {addonItems && addonItems.length > 0 && (
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      You May Also Like
                      <span className="text-xs font-normal text-gray-500 ml-2">
                        ({addonItems.length})
                      </span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addonItems.map((addon, idx) => {
                      const addonId = addon._id || addon.id;
                      return (
                        <RelatedItemCard
                          key={addonId || idx}
                          item={addon}
                          quantity={selectedRelatedItems[addonId]?.quantity || 0}
                          onAdd={handleRelatedItemAdd}
                          onIncrement={handleRelatedItemIncrement}
                          onDecrement={handleRelatedItemDecrement}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ===== ADD TO CART (Sticky Bottom) ===== */}
              <div className="sticky bottom-0 z-20 -mx-6 md:-mx-10 -mb-6 md:-mb-10 p-2 bg-white/20 backdrop-blur-xs border-zinc-800/80 backdrop-blur-md mt-6 rounded-t-xl">
                <div className="flex gap-3">
                  <button
                    disabled={isAddToCartDisabled}
                    onClick={handleAddToCart}
                    className={`flex-1 font-bold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-lg ${isInCart
                      ? "bg-green-600 text-white cursor-pointer hover:bg-green-700"
                      : isAddingToCart
                        ? "bg-green-600 text-white"
                        : !isAddToCartDisabled
                          ? "bg-amber-500 text-black hover:bg-amber-600 active:scale-[0.99] cursor-pointer"
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