// src/app/(pages)/build-your-pizza/_components/BuildYourPizzaClient.jsx

"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Plus,
  Minus,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { baseUriBackend } from "@/redux/url/url";
import { singleAddToCartsList } from "@/redux/features/Slice/CartDrawerSlice";

// Helper function to get image URL
const getImageUrl = (path) => {
  if (!path) return "/home/special_menu/pizzas.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUriBackend}${cleanPath}`;
};

// ==================== STATIC DATA ====================
const STATIC_SIZES = [
  { name: "Small", price: 15 },
  { name: "Medium", price: 20 },
  { name: "Large", price: 25 },
];

const STATIC_SEASONINGS = [
  { name: "Garlic Crust" },
  { name: "No Garlic Crust" },
];

const STATIC_INSTRUCTIONS = {
  cut: [
    { name: "Pie Cut" },
    { name: "Square Cut" },
    { name: "Uncut" },
  ],
  bake: [
    { name: "Well Done" },
    { name: "Normal Bake" },
  ],
};

const PIZZA_PLACEMENT_OPTIONS = [
  { name: "left", label: "Left" },
  { name: "whole", label: "Whole" },
  { name: "right", label: "Right" },
];

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
              type="button"
              onClick={() => onSelect(crust)}
              className={`bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all text-left cursor-pointer ${isSelected
                ? "border-amber-500 shadow-lg shadow-amber-500/20"
                : "border-zinc-700 hover:border-zinc-500"
                }`}
            >
              <div className="flex flex-col">
                <div className="flex items-start justify-between p-3">
                  <h4 className="text-white font-medium text-sm line-clamp-1 flex-1 mr-2">
                    {crust.name}
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

// ==================== SIZE SELECTOR ====================
const SizeSelector = ({ sizes, selectedSize, onSelect, selectedCrust }) => {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">
        Select Size <span className="text-red-500">*</span>
      </h3>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size, index) => {
          const sizeKey = size.name.toLowerCase();
          const isSizeAvailable =
            !selectedCrust ||
            !selectedCrust.size ||
            selectedCrust.size[sizeKey] === true;
          const isSelected = selectedSize?.name === size.name;

          return (
            <button
              key={index}
              type="button"
              onClick={() => isSizeAvailable && onSelect(size)}
              disabled={!isSizeAvailable}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all min-w-[100px] text-center ${!isSizeAvailable
                ? "bg-zinc-800/30 text-gray-600 cursor-not-allowed border border-zinc-700/50 opacity-40"
                : isSelected
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-105 cursor-pointer"
                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700 cursor-pointer"
                }`}
            >
              <div className="font-bold">{size.name}</div>
              <div className="text-xs opacity-80">${size.price}</div>
            </button>
          );
        })}
      </div>
      {selectedCrust && (
        <p className="text-xs text-gray-500 mt-2">
          Sizes enabled are based on selected crust ({selectedCrust.name})
        </p>
      )}
    </div>
  );
};

// ==================== SAUCE SELECTOR ====================
const SauceSelector = ({
  sauces,
  selectedSauce,
  onSelect,
  selectedVariant,
  onVariantSelect,
}) => {
  if (!sauces || sauces.length === 0) return null;

  const getVariantPrice = (sauce, variant) => {
    if (sauce?.variant_prices && sauce.variant_prices[variant] !== undefined) {
      return Number(sauce.variant_prices[variant]) || 0;
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
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-700">
                  <Image
                    src={getImageUrl(sauce.image)}
                    alt={sauce.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm line-clamp-1">
                    {sauce.name}
                  </h4>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected
                    ? "border-amber-500 bg-amber-500"
                    : "border-zinc-600"
                    }`}
                >
                  {isSelected && <Check size={12} className="text-black" />}
                </div>
              </div>

              {isSelected && variantKeys.length > 0 && (
                <div className="px-3 pb-3 pt-0 border-t border-zinc-700/50">
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {variantKeys.map((variant) => {
                      const isVariantSelected = selectedVariant === variant;
                      const variantPrice = getVariantPrice(sauce, variant);
                      return (
                        <button
                          key={variant}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onVariantSelect(variant);
                          }}
                          className={`px-2.5 py-1 rounded text-xs transition-all cursor-pointer ${isVariantSelected
                            ? "bg-amber-500 text-black font-medium"
                            : "bg-zinc-700/50 text-gray-400 hover:bg-zinc-700 hover:text-white"
                            }`}
                        >
                          <span className="capitalize">{variant}</span>

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

// ==================== CHEESE SELECTOR ====================
const CheeseSelector = ({
  cheeses,
  selectedCheese,
  onSelect,
  selectedVariant,
  onVariantSelect,
}) => {
  if (!cheeses || cheeses.length === 0) return null;

  const getVariantPrice = (cheese, variant) => {
    if (
      cheese?.variant_prices &&
      cheese.variant_prices[variant] !== undefined
    ) {
      return Number(cheese.variant_prices[variant]) || 0;
    }
    return 0;
  };

  const noCheeseOption = {
    id: "no-cheese",
    name: "No Cheese",
    image: null,
    isNoCheese: true,
  };

  const allOptions = [...cheeses, noCheeseOption];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Cheeses</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {allOptions.map((cheese) => {
          const isNoCheese = cheese.isNoCheese;
          const cheeseId = isNoCheese ? "no-cheese" : cheese._id || cheese.id;
          const isSelected = isNoCheese
            ? selectedCheese === "no-cheese"
            : (selectedCheese?._id || selectedCheese?.id) === cheeseId;

          const variantKeys =
            !isNoCheese && cheese.variants
              ? Object.keys(cheese.variants).filter(
                (key) => cheese.variants[key] === true,
              )
              : [];

          return (
            <div
              key={cheeseId}
              onClick={() => {
                if (isNoCheese) {
                  onSelect("no-cheese");
                  onVariantSelect(null);
                } else {
                  onSelect(cheese);
                  if (cheese.variants) {
                    const keys = Object.keys(cheese.variants).filter(
                      (k) => cheese.variants[k] === true,
                    );
                    if (keys.length > 0) {
                      onVariantSelect(keys[0]);
                    }
                  }
                }
              }}
              className={`bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${isSelected
                ? "border-amber-500 shadow-lg shadow-amber-500/20"
                : "border-zinc-700 hover:border-zinc-500"
                } ${isNoCheese ? "bg-zinc-800/30" : ""}`}
            >
              <div className="flex flex-col">
                <div className="flex items-start justify-between p-3">
                  <h4
                    className={`text-white font-medium text-sm line-clamp-1 flex-1 mr-2 ${isNoCheese ? "text-gray-400" : ""
                      }`}
                  >
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

                {isNoCheese && (
                  <div className="w-full aspect-[4/3] bg-zinc-800/30 flex items-center justify-center border-t border-zinc-700/30">
                    <span className="text-zinc-500 text-xs">
                      No cheese selected
                    </span>
                  </div>
                )}
              </div>

              {!isNoCheese && isSelected && variantKeys.length > 0 && (
                <div className="px-3 pb-3 pt-0 border-t border-zinc-700/50">
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {variantKeys.map((variant) => {
                      const isVariantSelected = selectedVariant === variant;
                      const variantPrice = getVariantPrice(cheese, variant);
                      return (
                        <button
                          key={variant}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onVariantSelect(variant);
                          }}
                          className={`px-2.5 py-1 rounded text-xs transition-all cursor-pointer ${isVariantSelected
                            ? "bg-amber-500 text-black font-medium"
                            : "bg-zinc-700/50 text-gray-400 hover:bg-zinc-700 hover:text-white"
                            }`}
                        >
                          <span className="capitalize">{variant}</span>

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

// ==================== SEASONING SELECTOR ====================
const SeasoningSelector = ({ seasonings, selectedSeasonings, onSelect }) => {
  if (!seasonings || seasonings.length === 0) return null;

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
              type="button"
              onClick={() => onSelect(seasoning)}
              className={`bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all text-left cursor-pointer ${isSelected
                ? "border-amber-500 shadow-lg shadow-amber-500/20"
                : "border-zinc-700 hover:border-zinc-500"
                }`}
            >
              <div className="flex items-center justify-between p-4">
                <h4 className="text-white font-medium text-sm flex-1 mr-2">
                  {seasoning.name}
                </h4>
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

// ==================== ADDON SECTION ====================
const AddonSection = ({
  category,
  addons,
  selectedAddons,
  onSelect,
  onVariantChange,
}) => {
  if (!addons || addons.length === 0) return null;

  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedPlacements, setSelectedPlacements] = useState({});

  useEffect(() => {
    const defaultVariants = {};
    const defaultPlacements = {};
    addons.forEach((addon) => {
      const addonId = addon._id || addon.id;
      if (addon.variants && Array.isArray(addon.variants) && addon.variants.length > 0) {
        const normalVariant =
          addon.variants.find((v) => v.name?.toLowerCase() === "normal") ||
          addon.variants[0];
        if (!selectedVariants[addonId]) {
          defaultVariants[addonId] = normalVariant;
          defaultPlacements[addonId] = "whole";
        }
      }
    });
    if (Object.keys(defaultVariants).length > 0) {
      setSelectedVariants((prev) => ({ ...prev, ...defaultVariants }));
      setSelectedPlacements((prev) => ({ ...prev, ...defaultPlacements }));
    }
  }, [addons]);

  const handleVariantSelect = (addonId, variant, e) => {
    e.stopPropagation();
    setSelectedVariants((prev) => ({ ...prev, [addonId]: variant }));
    if (onVariantChange) {
      onVariantChange(addonId, "variant", variant);
    }
  };

  const handlePlacementSelect = (addonId, placement, e) => {
    e.stopPropagation();
    setSelectedPlacements((prev) => ({ ...prev, [addonId]: placement }));
    if (onVariantChange) {
      onVariantChange(addonId, "placement", placement);
    }
  };

  const formatCategoryName = (cat) => {
    if (!cat) return "Other Toppings";
    return cat
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  // Placement Circle Component
  const PlacementCircle = ({ placement, isSelected }) => {
    const fillColor = isSelected ? "#f59e0b" : "#9ca3af";
    const bgColor = isSelected ? "#f59e0b" : "transparent";
    const strokeColor = isSelected ? "#f59e0b" : "#6b7280";

    if (placement === "left") {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8.5" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path
            d="M10 1.5 A 8.5 8.5 0 0 0 10 18.5 Z"
            fill={fillColor}
          />
        </svg>
      );
    }

    if (placement === "whole") {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8.5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        </svg>
      );
    }

    if (placement === "right") {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8.5" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path
            d="M10 1.5 A 8.5 8.5 0 0 1 10 18.5 Z"
            fill={fillColor}
          />
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="mb-6">
      <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
        {formatCategoryName(category)}
      </h4>
      <div className="grid grid-cols-1 gap-3">
        {addons.map((addon) => {
          const addonId = addon._id || addon.id;
          const isSelected = selectedAddons.some(
            (a) => (a._id || a.id) === addonId,
          );
          const currentVariant = selectedVariants[addonId];
          const currentPlacement = selectedPlacements[addonId] || "whole";
          const hasVariants =
            addon.variants && Array.isArray(addon.variants) && addon.variants.length > 0;

          return (
            <div
              key={addonId}
              onClick={() => onSelect(addon)}
              className={`bg-zinc-800/50 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${isSelected
                ? "border-amber-500 shadow-lg shadow-amber-500/20"
                : "border-zinc-700 hover:border-zinc-500"
                }`}
            >
              <div className="flex items-center gap-3 p-3">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-700">
                  <Image
                    src={getImageUrl(addon.image)}
                    alt={addon.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm line-clamp-1">
                    {addon.name}
                  </h4>
                  {isSelected && (
                    <p className="text-[11px] text-amber-400/90 mt-0.5 capitalize">
                      {currentVariant?.name || "normal"} · {currentPlacement}
                    </p>
                  )}
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected
                    ? "border-amber-500 bg-amber-500"
                    : "border-zinc-600"
                    }`}
                >
                  {isSelected && <Check size={12} className="text-black" />}
                </div>
              </div>

              {isSelected && hasVariants && (
                <div className="px-3 pb-3 pt-0 border-t border-zinc-700/50">
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {addon.variants.map((v, vIdx) => {
                        const isVSelected = currentVariant?.name === v.name;
                        const vPrice = Number(v.price) || 0;
                        return (
                          <button
                            key={vIdx}
                            type="button"
                            onClick={(e) => handleVariantSelect(addonId, v, e)}
                            className={`px-2.5 py-1 rounded text-xs transition-all cursor-pointer ${isVSelected
                              ? "bg-amber-500 text-black font-medium"
                              : "bg-zinc-700/50 text-gray-400 hover:bg-zinc-700 hover:text-white"
                              }`}
                          >
                            <span className="capitalize">{v.name}</span>

                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      {PIZZA_PLACEMENT_OPTIONS.map((opt) => {
                        const isPSelected = currentPlacement === opt.name;
                        return (
                          <button
                            key={opt.name}
                            type="button"
                            onClick={(e) =>
                              handlePlacementSelect(addonId, opt.name, e)
                            }
                            className={`p-1 rounded transition-all cursor-pointer flex items-center justify-center ${isPSelected
                              ? "bg-amber-500/20 border border-amber-500/50"
                              : "bg-zinc-700/50 border border-transparent hover:bg-zinc-700"
                              }`}
                            title={opt.label}
                          >
                            <PlacementCircle
                              placement={opt.name}
                              isSelected={isPSelected}
                            />
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

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">
        Special Instructions
      </h3>

      {hasCut && (
        <div className="mb-3">
          <h4 className="text-xs text-gray-500 mb-1.5">Cut</h4>
          <div className="flex flex-wrap gap-1.5">
            {instructions.cut.map((item, index) => {
              const isSelected =
                selectedInstructions.cut &&
                selectedInstructions.cut.some((s) => s.name === item.name);
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => onSelect("cut", item)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${isSelected
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
                  type="button"
                  onClick={() => onSelect("bake", item)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${isSelected
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
const RelatedItemCard = ({
  item,
  quantity = 0,
  onAdd,
  onIncrement,
  onDecrement,
}) => {
  const price =
    item.size?.price ||
    (Array.isArray(item.size) ? item.size[0]?.price : null) ||
    item.price ||
    item.min_price ||
    0;

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
        <div className="flex items-center justify-between p-3 gap-2 bg-zinc-900/40">
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium text-xs sm:text-sm line-clamp-1">
              {item.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-amber-400 font-bold text-xs sm:text-sm">
                ${price}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            {isSelected ? (
              <div className="flex items-center gap-1 bg-amber-500 text-black rounded-md px-1.5 py-1 font-bold text-xs shadow-md">
                <button
                  type="button"
                  onClick={() => onDecrement(item)}
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
                className="w-6 h-6 rounded-full border-2 border-zinc-600 hover:border-amber-500 hover:bg-amber-500 hover:text-black text-gray-300 flex items-center justify-center transition-all cursor-pointer"
              >
                <Plus size={12} />
              </button>
            )}
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] bg-zinc-700 overflow-hidden">
          <Image
            src={getImageUrl(item.image)}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
export default function BuildYourPizzaClient({
  crustsData,
  cheesesData,
  saucesData,
  addonsData,
  relatedItems = [],
}) {
  const dispatch = useDispatch();

  const crusts = useMemo(
    () => crustsData?.data?.crusts || [],
    [crustsData],
  );
  const cheeses = useMemo(
    () => cheesesData?.data?.cheeses || [],
    [cheesesData],
  );
  const sauces = useMemo(
    () => saucesData?.data?.sauces || [],
    [saucesData],
  );
  const allAddonsList = useMemo(
    () => addonsData?.data?.addons || [],
    [addonsData],
  );

  // Group addons by category
  const groupedAddons = useMemo(() => {
    return allAddonsList.reduce((acc, addon) => {
      const cat = addon.category || "other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(addon);
      return acc;
    }, {});
  }, [allAddonsList]);

  // Selections
  const [selectedCrust, setSelectedCrust] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedSauceVariant, setSelectedSauceVariant] = useState("normal");
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedCheeseVariant, setSelectedCheeseVariant] = useState("normal");
  const [selectedSeasonings, setSelectedSeasonings] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedRelatedItems, setSelectedRelatedItems] = useState({});
  const [selectedInstructions, setSelectedInstructions] = useState({
    cut: [{ name: "Pie Cut" }],
    bake: [{ name: "Normal Bake" }],
  });

  const [isInCart, setIsInCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Auto select first crust
  useEffect(() => {
    if (crusts.length > 0 && !selectedCrust) {
      setSelectedCrust(crusts[0]);
    }
  }, [crusts, selectedCrust]);

  // Auto select size when crust changes
  useEffect(() => {
    if (selectedCrust) {
      const available = STATIC_SIZES.filter((s) => {
        const key = s.name.toLowerCase();
        return !selectedCrust.size || selectedCrust.size[key] === true;
      });

      if (available.length > 0) {
        const stillValid = available.find((s) => s.name === selectedSize?.name);
        if (!stillValid) {
          setSelectedSize(available[0]);
        }
      }
    } else {
      setSelectedSize(STATIC_SIZES[0]);
    }
  }, [selectedCrust]);

  // Auto select first sauce
  useEffect(() => {
    if (sauces.length > 0 && !selectedSauce) {
      const s = sauces[0];
      setSelectedSauce(s);
      if (s.variants) {
        const keys = Object.keys(s.variants).filter((k) => s.variants[k]);
        if (keys.length > 0) setSelectedSauceVariant(keys[0]);
      }
    }
  }, [sauces, selectedSauce]);

  // Auto select first cheese
  useEffect(() => {
    if (cheeses.length > 0 && !selectedCheese) {
      const c = cheeses[0];
      setSelectedCheese(c);
      if (c.variants) {
        const keys = Object.keys(c.variants).filter((k) => c.variants[k]);
        if (keys.length > 0) setSelectedCheeseVariant(keys[0]);
      }
    }
  }, [cheeses, selectedCheese]);

  // Auto select first seasoning
  useEffect(() => {
    if (STATIC_SEASONINGS.length > 0 && selectedSeasonings.length === 0) {
      setSelectedSeasonings([STATIC_SEASONINGS[0]]);
    }
  }, []);

  // Reset cart state when any option changes
  useEffect(() => {
    setIsInCart(false);
  }, [
    selectedCrust,
    selectedSize,
    selectedSauce,
    selectedSauceVariant,
    selectedCheese,
    selectedCheeseVariant,
    selectedSeasonings,
    selectedAddons,
    selectedInstructions,
    selectedRelatedItems,
  ]);

  // ==================== PRICE CALCULATIONS ====================
  const basePrice = selectedSize ? Number(selectedSize.price) : 0;

  const sauceExtraPrice = useMemo(() => {
    if (!selectedSauce || !selectedSauceVariant) return 0;
    return Number(selectedSauce.variant_prices?.[selectedSauceVariant]) || 0;
  }, [selectedSauce, selectedSauceVariant]);

  const cheeseExtraPrice = useMemo(() => {
    if (
      !selectedCheese ||
      selectedCheese === "no-cheese" ||
      !selectedCheeseVariant
    )
      return 0;
    return Number(selectedCheese.variant_prices?.[selectedCheeseVariant]) || 0;
  }, [selectedCheese, selectedCheeseVariant]);

  const addonsExtraPrice = useMemo(() => {
    return selectedAddons.reduce((sum, a) => {
      const v = a._selectedVariant || a.variants?.[0];
      const p = Number(v?.price) || 0;
      return sum + p;
    }, 0);
  }, [selectedAddons]);

  const mainProductPrice =
    basePrice + sauceExtraPrice + cheeseExtraPrice + addonsExtraPrice;

  // Handlers
  const handleCrustSelect = (crust) => setSelectedCrust(crust);
  const handleSizeSelect = (size) => setSelectedSize(size);

  const handleSauceSelect = (sauce) => {
    setSelectedSauce(sauce);
    if (sauce.variants) {
      const keys = Object.keys(sauce.variants).filter((k) => sauce.variants[k]);
      if (keys.length > 0) setSelectedSauceVariant(keys[0]);
    }
  };

  const handleCheeseSelect = (cheese) => {
    setSelectedCheese(cheese);
    if (cheese !== "no-cheese" && cheese.variants) {
      const keys = Object.keys(cheese.variants).filter(
        (k) => cheese.variants[k],
      );
      if (keys.length > 0) setSelectedCheeseVariant(keys[0]);
    }
  };

  const handleSeasoningSelect = (seasoning) => {
    setSelectedSeasonings((prev) => {
      const exists = prev.some((s) => s.name === seasoning.name);
      if (exists) {
        return prev.filter((s) => s.name !== seasoning.name);
      }
      return [seasoning];
    });
  };

  const handleAddonSelect = (addon) => {
    setSelectedAddons((prev) => {
      const addonId = addon._id || addon.id;
      const exists = prev.some((a) => (a._id || a.id) === addonId);
      if (exists) {
        return prev.filter((a) => (a._id || a.id) !== addonId);
      }
      const defaultVariant =
        addon.variants?.find((v) => v.name?.toLowerCase() === "normal") ||
        addon.variants?.[0] || { name: "normal", price: 0 };
      return [
        ...prev,
        {
          ...addon,
          _selectedVariant: defaultVariant,
          _selectedPlacement: "whole",
        },
      ];
    });
  };

  const handleAddonVariantChange = (addonId, type, value) => {
    setSelectedAddons((prev) =>
      prev.map((a) => {
        if ((a._id || a.id) === addonId) {
          if (type === "variant") {
            return { ...a, _selectedVariant: value };
          }
          if (type === "placement") {
            return { ...a, _selectedPlacement: value };
          }
        }
        return a;
      }),
    );
  };

  const handleInstructionSelect = (type, item) => {
    setSelectedInstructions((prev) => {
      const current = prev[type] || [];
      const exists = current.some((s) => s.name === item.name);
      return {
        ...prev,
        [type]: exists ? [] : [item],
      };
    });
  };

  // Related items handlers
  const handleRelatedItemAdd = (item) => {
    const itemId = item._id || item.id;
    const price =
      item.size?.price ||
      (Array.isArray(item.size) ? item.size[0]?.price : null) ||
      item.price ||
      item.min_price ||
      0;
    setSelectedRelatedItems((prev) => ({
      ...prev,
      [itemId]: { item, quantity: 1, price },
    }));
  };

  const handleRelatedItemIncrement = (item) => {
    const itemId = item._id || item.id;
    setSelectedRelatedItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        quantity: (prev[itemId]?.quantity || 0) + 1,
      },
    }));
  };

  const handleRelatedItemDecrement = (item) => {
    const itemId = item._id || item.id;
    setSelectedRelatedItems((prev) => {
      const currentQty = prev[itemId]?.quantity || 0;
      if (currentQty <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          quantity: currentQty - 1,
        },
      };
    });
  };

  // ==================== SELECTION SUMMARY STRINGS ====================
  const getSelectionDisplay = () => {
    const basics = [];
    if (selectedSize) basics.push(selectedSize.name);
    if (selectedCrust) basics.push(selectedCrust.name);
    if (selectedSeasonings.length > 0)
      basics.push(selectedSeasonings.map((s) => s.name).join(", "));
    if (selectedInstructions.cut.length > 0)
      basics.push(selectedInstructions.cut.map((s) => s.name).join(", "));
    if (selectedInstructions.bake.length > 0)
      basics.push(selectedInstructions.bake.map((s) => s.name).join(", "));

    let sauce = null;
    if (selectedSauce) {
      const v = selectedSauceVariant || "normal";
      const p = Number(selectedSauce.variant_prices?.[v]) || 0;
      sauce = `${selectedSauce.name} (${v})  ${p > 0 ? `+$${p}` : "Included"}`;
    }

    let cheese = null;
    if (selectedCheese) {
      if (selectedCheese === "no-cheese") {
        cheese = "No Cheese";
      } else {
        const v = selectedCheeseVariant || "normal";
        const p = Number(selectedCheese.variant_prices?.[v]) || 0;
        cheese = `${selectedCheese.name} (${v})  ${p > 0 ? `+$${p}` : "Included"}`;
      }
    }

    const addonsList = selectedAddons.map((a) => {
      const variant = a._selectedVariant?.name || "normal";
      const placement = a._selectedPlacement || "whole";
      const price = Number(a._selectedVariant?.price) || 0;
      const priceText = price > 0 ? `+$${price}` : "Included";
      const displayVariant =
        variant.charAt(0).toUpperCase() + variant.slice(1);
      const displayPlacement =
        placement.charAt(0).toUpperCase() + placement.slice(1);
      return `${a.name} (${displayVariant} - ${displayPlacement})  ${priceText}`;
    });

    const extraList = Object.values(selectedRelatedItems)
      .filter((entry) => entry.quantity > 0)
      .map((entry) => {
        const p = (Number(entry.price) || 0) * entry.quantity;
        return `${entry.item.name} x${entry.quantity}  ${p > 0 ? `+$${p % 1 === 0 ? p : p.toFixed(2)}` : "Included"
          }`;
      });

    return { basics, sauce, cheese, addonsList, extraList };
  };

  const { basics, sauce, cheese, addonsList, extraList } =
    getSelectionDisplay();

  const hasSelection =
    basics.length > 0 ||
    sauce ||
    cheese ||
    addonsList.length > 0 ||
    extraList.length > 0;

  // ==================== ADD TO CART ====================
  const handleAddToCart = () => {
    setIsAddingToCart(true);

    const yourSelectionParts = [];
    if (selectedSize) yourSelectionParts.push(`Size: ${selectedSize.name}`);
    if (selectedCrust) yourSelectionParts.push(`Crust: ${selectedCrust.name}`);
    if (selectedSauce)
      yourSelectionParts.push(
        `Sauce: ${selectedSauce.name} (${selectedSauceVariant})`,
      );
    if (selectedCheese) {
      yourSelectionParts.push(
        selectedCheese === "no-cheese"
          ? "Cheese: No Cheese"
          : `Cheese: ${selectedCheese.name} (${selectedCheeseVariant})`,
      );
    }
    if (selectedSeasonings.length > 0)
      yourSelectionParts.push(
        `Seasonings: ${selectedSeasonings.map((s) => s.name).join(", ")}`,
      );

    const instr = [];
    if (selectedInstructions.cut.length > 0)
      instr.push(`Cut: ${selectedInstructions.cut.map((s) => s.name).join(", ")}`);
    if (selectedInstructions.bake.length > 0)
      instr.push(`Bake: ${selectedInstructions.bake.map((s) => s.name).join(", ")}`);
    if (instr.length > 0)
      yourSelectionParts.push(`Instructions: (${instr.join(", ")})`);

    const yourSelectionText = yourSelectionParts.join(" | ");

    const allAddonsData = selectedAddons.map((a) => {
      const v = a._selectedVariant?.name || "normal";
      const p = a._selectedPlacement || "whole";
      return `${a.name} (${v} - ${p})`;
    });

    const cheeseText =
      selectedCheese === "no-cheese"
        ? "No Cheese"
        : selectedCheese
          ? `${selectedCheese.name} (${selectedCheeseVariant})`
          : null;

    const sauceText = selectedSauce
      ? `${selectedSauce.name} (${selectedSauceVariant})`
      : null;

    // 1. Add custom pizza to cart
    dispatch(
      singleAddToCartsList({
        productId: "build-custom-pizza",
        name: "Build Custom PIZZA",
        image: selectedCrust?.image || "/home/special_menu/pizzas.png",
        price: mainProductPrice,
        quantity: 1,
        "Your Selection": yourSelectionText,
        yourSelection: yourSelectionText,
        Addons: allAddonsData,
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

    // 2. Add each selected "You May Also Like" item separately
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
      toast.success("Build Custom PIZZA added to cart!");
    }, 400);
  };

  const previewImage = selectedCrust?.image || "/home/special_menu/pizzas.png";

  return (
    <section className="bg-black min-h-screen pt-30 pb-20">
      <div className="max-w-6xl mx-auto px-4 lg:px-20">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Menu</span>
        </Link>

        {/* Card Container */}
        <div className="bg-[#111] border border-zinc-800 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* ===== LEFT COLUMN: PREVIEW & STICKY SELECTION ===== */}
            <div className="bg-zinc-900 rounded-tl-2xl rounded-bl-2xl">
              <div className="relative h-80 md:h-[480px] overflow-hidden rounded-tl-2xl bg-zinc-950 flex items-center justify-center p-6">
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <Image
                    src={getImageUrl(previewImage)}
                    alt="Build Custom Pizza"
                    fill
                    className="object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.2)]"
                    priority
                    unoptimized
                  />
                </div>
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  Custom Creation
                </div>
              </div>

              {/* Selected Items Display (Desktop) */}
              {hasSelection && (
                <div className="hidden md:block sticky top-15 z-10 p-5 bg-gradient-to-b from-zinc-900/95 to-zinc-900/80 border-t border-zinc-800/60 backdrop-blur-sm rounded-bl-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-amber-500 rounded-full" />
                    <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Your Selection
                    </h4>
                  </div>
                  <div className="space-y-1.5">
                    {basics.length > 0 && (
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {basics.join(", ")}
                      </p>
                    )}
                    {sauce && <p className="text-xs text-gray-400">{sauce}</p>}
                    {cheese && (
                      <p className="text-xs text-gray-400">{cheese}</p>
                    )}

                    {addonsList.length > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mt-2 mb-1.5">
                          <div className="w-1 h-3 bg-amber-500 rounded-full" />
                          <h4 className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                            Addons ({addonsList.length})
                          </h4>
                        </div>
                        {addonsList.map((addon, i) => (
                          <p key={i} className="text-xs text-gray-400">
                            {addon}
                          </p>
                        ))}
                      </div>
                    )}

                    {extraList.length > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mt-2 mb-1.5">
                          <div className="w-1 h-3 bg-amber-500 rounded-full" />
                          <h4 className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                            You May Also Like
                          </h4>
                        </div>
                        {extraList.map((extra, i) => (
                          <p key={i} className="text-xs text-gray-400 pl-2">
                            {extra}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ===== RIGHT COLUMN: BUILD CONTROLS ===== */}
            <div className="p-6 md:p-10">
              {/* Mobile Sticky Selection Summary */}
              {hasSelection && (
                <div className="block md:hidden sticky top-16 z-10 -mx-6 px-4 py-3 mb-4 bg-gradient-to-b from-zinc-900/95 to-zinc-900/80 border-b border-zinc-800/60 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-amber-500 rounded-full" />
                    <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Your Selection
                    </h4>
                  </div>
                  <div className="space-y-1 text-xs">
                    {basics.length > 0 && (
                      <p className="text-gray-300">{basics.join(", ")}</p>
                    )}
                    {sauce && <p className="text-gray-400">{sauce}</p>}
                    {cheese && <p className="text-gray-400">{cheese}</p>}
                    {addonsList.length > 0 && (
                      <p className="text-gray-400">
                        Addons: {addonsList.length} items
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Title & Price Header */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Build Custom PIZZA
                </h1>
                <div className="text-2xl font-bold text-amber-400">
                  ${mainProductPrice.toFixed(2)}
                </div>
              </div>

              {/* 1. CHOOSE CRUST */}
              <CrustSelector
                crusts={crusts}
                selectedCrust={selectedCrust}
                onSelect={handleCrustSelect}
              />

              {/* 2. SELECT SIZE */}
              <SizeSelector
                sizes={STATIC_SIZES}
                selectedSize={selectedSize}
                onSelect={handleSizeSelect}
                selectedCrust={selectedCrust}
              />

              {/* 3. SAUCES */}
              <SauceSelector
                sauces={sauces}
                selectedSauce={selectedSauce}
                onSelect={handleSauceSelect}
                selectedVariant={selectedSauceVariant}
                onVariantSelect={setSelectedSauceVariant}
              />

              {/* 4. CHEESES */}
              <CheeseSelector
                cheeses={cheeses}
                selectedCheese={selectedCheese}
                onSelect={handleCheeseSelect}
                selectedVariant={selectedCheeseVariant}
                onVariantSelect={setSelectedCheeseVariant}
              />

              {/* 5. CHOOSE SEASONINGS */}
              <SeasoningSelector
                seasonings={STATIC_SEASONINGS}
                selectedSeasonings={selectedSeasonings}
                onSelect={handleSeasoningSelect}
              />

              {/* 6. ADDONS (Grouped by Category) */}
              {Object.keys(groupedAddons).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-100 mb-3 bg-zinc-800/80 p-4 rounded-lg flex items-center gap-2 border border-zinc-700">
                    <SlidersHorizontal size={16} className="text-amber-400" />
                    <span>Pizza Add-ons & Toppings</span>
                  </h3>
                  {Object.keys(groupedAddons).map((category) => (
                    <AddonSection
                      key={category}
                      category={category}
                      addons={groupedAddons[category]}
                      selectedAddons={selectedAddons}
                      onSelect={handleAddonSelect}
                      onVariantChange={handleAddonVariantChange}
                    />
                  ))}
                </div>
              )}

              {/* 7. SPECIAL INSTRUCTIONS */}
              <SpecialInstructions
                instructions={STATIC_INSTRUCTIONS}
                selectedInstructions={selectedInstructions}
                onSelect={handleInstructionSelect}
              />

              {/* 8. YOU MAY ALSO LIKE */}
              {relatedItems && relatedItems.length > 0 && (
                <div className="mt-8 pt-6 border-t border-zinc-800">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-4 bg-amber-500 rounded-full" />
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      You May Also Like
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedItems.map((item, idx) => {
                      const itemId = item._id || item.id;
                      return (
                        <RelatedItemCard
                          key={itemId || idx}
                          item={item}
                          quantity={
                            selectedRelatedItems[itemId]?.quantity || 0
                          }
                          onAdd={handleRelatedItemAdd}
                          onIncrement={handleRelatedItemIncrement}
                          onDecrement={handleRelatedItemDecrement}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 9. STICKY ADD TO CART BUTTON */}
              <div className="sticky bottom-0 z-20 -mx-6 md:-mx-10 -mb-6 md:-mb-10 p-3 bg-black/80 backdrop-blur-md border-t border-zinc-800/80 mt-8 rounded-t-xl">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`w-full font-bold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-lg cursor-pointer ${isInCart
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-amber-500 text-black hover:bg-amber-600 active:scale-[0.99]"
                    }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isInCart ? (
                      <>
                        <Check size={18} />
                        <span>Added to Cart (${mainProductPrice.toFixed(2)})</span>
                      </>
                    ) : (
                      <span>
                        Add to Cart - ${mainProductPrice.toFixed(2)}
                      </span>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
