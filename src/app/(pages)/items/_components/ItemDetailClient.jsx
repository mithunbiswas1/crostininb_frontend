// src/app/items/_components/ItemDetailClient.jsx

"use client";

import { useState, useEffect, useMemo } from "react";
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
  SlidersHorizontal,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { baseUriBackend } from "@/redux/url/url";
import {
  singleAddToCartsList,
} from "@/redux/features/Slice/CartDrawerSlice";
import InstantOrderModal from "@/components/checkout/InstantOrderModal";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import SafeImage from "@/components/shared/SafeImage";

// Helper function to get image URL
const getImageUrl = (path) => {
  if (!path) return null;
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

// ==================== OPTION PICKER MODAL (Crust / Sauce / Cheese) ====================
const OptionTrigger = ({ label, required, image, name, variant, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-3 bg-zinc-800/50 border border-zinc-700 hover:border-amber-500/50 rounded-lg p-2.5 transition-all text-left mb-4 cursor-pointer"
  >
    <div className="relative w-11 h-11 rounded-md overflow-hidden bg-gray-400 flex-shrink-0">
      <SafeImage
        src={getImageUrl(image)}
        alt={name || label}
        fill
        className="object-cover"
        fallbackClassName="bg-gray-400"
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-gray-400 uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <p className="text-white font-medium text-sm truncate">
        {name || "Select"}
        {variant ? ` (${variant})` : ""}
      </p>
    </div>
    <span className="flex items-center gap-0.5 text-amber-400 text-xs font-semibold flex-shrink-0">
      Change
      <ChevronRight size={14} />
    </span>
  </button>
);

const PizzaOptionModal = ({
  isOpen,
  onClose,
  title,
  options,
  selectedId,
  selectedVariant,
  onConfirm,
}) => {
  const [draftId, setDraftId] = useState(selectedId);
  const [draftVariant, setDraftVariant] = useState(selectedVariant);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setDraftId(selectedId);
      setDraftVariant(selectedVariant);
    }
  }, [isOpen, selectedId, selectedVariant]);

  if (!isOpen) return null;

  const draftOption = options.find((o) => o.id === draftId);
  const variants = draftOption?.variants || [];

  const handlePick = (option) => {
    setDraftId(option.id);
    if (option.variants && option.variants.length > 0) {
      const firstV =
        typeof option.variants[0] === "object"
          ? option.variants[0].name
          : option.variants[0];
      const match = option.variants.find(
        (v) => (typeof v === "object" ? v.name : v) === draftVariant,
      );
      setDraftVariant(
        match ? (typeof match === "object" ? match.name : match) : firstV,
      );
    } else {
      setDraftVariant(null);
    }
  };

  const handleConfirm = () => {
    if (!draftOption) return;
    onConfirm(draftOption, draftVariant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-70 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#111] border border-zinc-800 sm:rounded-2xl rounded-t-2xl w-full sm:max-w-lg max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h3 className="text-white font-semibold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {options.map((option) => {
              const isSelected = option.id === draftId;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handlePick(option)}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border-2 p-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-md overflow-hidden bg-gray-400">
                    <SafeImage
                      src={getImageUrl(option.image)}
                      alt={option.name}
                      fill
                      className="object-cover"
                      fallbackClassName="bg-gray-400"
                    />
                    {isSelected && (
                      <div className="absolute top-0.5 right-0.5 bg-amber-500 rounded-full p-0.5">
                        <Check size={10} className="text-black" />
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-300 text-center line-clamp-2">
                    {option.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-zinc-800 p-4 space-y-3">
          {variants.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => {
                const vName = typeof v === "object" ? v.name : v;
                const vPrice =
                  typeof v === "object"
                    ? v.price
                    : draftOption?.variantPrices?.[v] || 0;
                const isSelected = draftVariant === vName;
                return (
                  <button
                    key={vName}
                    type="button"
                    onClick={() => setDraftVariant(vName)}
                    className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-500 text-black font-medium"
                        : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                    }`}
                  >
                    {vName} {vPrice > 0 ? `(+$${vPrice})` : ""}
                  </button>
                );
              })}
            </div>
          )}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!draftOption}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-sm transition-all cursor-pointer"
          >
            Select
          </button>
        </div>
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

// ==================== PLACEMENT & TOPPINGS MODAL ====================
const PIZZA_PLACEMENT_OPTIONS = [
  { name: "left", label: "Left" },
  { name: "whole", label: "Whole" },
  { name: "right", label: "Right" },
];

const PlacementCircle = ({ placement, isSelected }) => {
  const fillColor = isSelected ? "#f59e0b" : "#9ca3af";
  const strokeColor = isSelected ? "#f59e0b" : "#6b7280";

  if (placement === "left") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8.5" fill="none" stroke={strokeColor} strokeWidth="2" />
        <path d="M10 1.5 A 8.5 8.5 0 0 0 10 18.5 Z" fill={fillColor} />
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
        <path d="M10 1.5 A 8.5 8.5 0 0 1 10 18.5 Z" fill={fillColor} />
      </svg>
    );
  }

  return null;
};

const formatCategoryName = (cat) => {
  if (!cat) return "Other Toppings";
  return cat
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const ToppingsModal = ({
  isOpen,
  onClose,
  groupedAddons = {},
  selectedAddons = [],
  onSelectAddon,
  onVariantChange,
  onClearAll,
  totalAddonsPrice = 0,
}) => {
  useBodyScrollLock(isOpen);

  const categories = useMemo(() => Object.keys(groupedAddons || {}), [groupedAddons]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="mx-5 md:mx-10 relative bg-[#111] border border-zinc-800 sm:rounded-2xl rounded-t-2xl w-full sm:max-w-2xl md:max-w-3xl max-h-[95vh] sm:max-h-[95vh] flex flex-col shadow-2xl overflow-hidden z-10">
        {/* Narrow Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold text-sm">
              Choose Toppings
            </h3>
            {selectedAddons.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-black">
                {selectedAddons.length}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Toppings List */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-5 flex-1 min-h-0">
          {categories.map((category) => {
            const matchingAddons = groupedAddons[category] || [];
            if (matchingAddons.length === 0) return null;

            return (
              <div key={category} className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3 bg-amber-500 rounded-full" />
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    {formatCategoryName(category)} ({matchingAddons.length})
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {matchingAddons.map((addon) => {
                    const addonId = addon._id || addon.id;
                    const selected = selectedAddons.find(
                      (a) => (a._id || a.id) === addonId,
                    );
                    const isSelected = !!selected;
                    const currentVariant =
                      selected?._selectedVariant ||
                      addon.variants?.find((v) => v.name?.toLowerCase() === "normal") ||
                      addon.variants?.[0];
                    const currentPlacement = selected?._selectedPlacement || "whole";
                    const hasVariants =
                      addon.variants &&
                      Array.isArray(addon.variants) &&
                      addon.variants.length > 0;

                    const displayPrice =
                      Number(
                        typeof currentVariant === "object"
                          ? currentVariant?.price
                          : addon.variants?.find((v) => v.name === currentVariant)?.price
                      ) ||
                      Number(addon.price) ||
                      Number(addon.variants?.[0]?.price) ||
                      0;

                    return (
                      <div
                        key={addonId}
                        className={`rounded-xl border-2 transition-all p-2.5 flex flex-col justify-between gap-2 select-none ${isSelected
                          ? "bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/10"
                          : "bg-zinc-800/40 border-zinc-800 hover:border-zinc-700"
                          }`}
                      >
                        {/* Card header / trigger */}
                        <div
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => onSelectAddon(addon)}
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-400 border border-zinc-700/50 flex-shrink-0">
                            <SafeImage
                              src={getImageUrl(addon.image)}
                              alt={addon.name}
                              fill
                              className="object-cover"
                              fallbackClassName="bg-gray-400"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-white font-medium text-xs sm:text-sm line-clamp-1">
                              {addon.name}
                            </h5>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-amber-400 font-bold text-xs">
                                {displayPrice > 0 ? `+$${displayPrice}` : "Included"}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] text-zinc-400 capitalize">
                                  · {typeof currentVariant === "object" ? currentVariant?.name : currentVariant || "normal"} ({currentPlacement})
                                </span>
                              )}
                            </div>
                          </div>

                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected
                              ? "border-amber-500 bg-amber-500 text-black"
                              : "border-zinc-600 hover:border-zinc-500"
                              }`}
                          >
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                        </div>

                        {/* Controls when selected */}
                        {isSelected && (
                          <div className="pt-2 border-t border-zinc-700/50 flex flex-wrap items-center justify-between gap-2">
                            {/* Variants (Normal, Extra, etc.) */}
                            {hasVariants ? (
                              <div className="flex flex-wrap gap-1">
                                {addon.variants.map((v, vIdx) => {
                                  const vName =
                                    typeof currentVariant === "object"
                                      ? currentVariant?.name
                                      : currentVariant;
                                  const isVSelected = vName === v.name;
                                  const vPrice = Number(v.price) || 0;
                                  return (
                                    <button
                                      key={vIdx}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onVariantChange(addonId, "variant", v);
                                      }}
                                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${isVSelected
                                        ? "bg-amber-500 text-black shadow-sm"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                                        }`}
                                    >
                                      <span className="capitalize">{v.name}</span>
                                      {vPrice > 0 && (
                                        <span className="ml-1 text-[10px] opacity-80">
                                          +${vPrice}
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : <div />}

                            {/* Placement (Left, Whole, Right) */}
                            <div className="flex items-center gap-1 bg-zinc-950/70 p-0.5 rounded-lg border border-zinc-800 ml-auto">
                              {PIZZA_PLACEMENT_OPTIONS.map((opt) => {
                                const isPSelected = currentPlacement === opt.name;
                                return (
                                  <button
                                    key={opt.name}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onVariantChange(addonId, "placement", opt.name);
                                    }}
                                    className={`p-1 rounded transition-all cursor-pointer flex items-center justify-center ${isPSelected
                                      ? "bg-amber-500/20 border border-amber-500/50"
                                      : "bg-transparent border border-transparent hover:bg-zinc-800"
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
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {categories.length === 0 && (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No toppings available.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-4 bg-zinc-900/95 backdrop-blur-sm flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Selected Toppings
            </p>
            <p className="text-sm font-bold text-white">
              {selectedAddons.length} item{selectedAddons.length === 1 ? "" : "s"}
              {totalAddonsPrice > 0 && (
                <span className="text-amber-400 font-bold ml-1.5">
                  (+${totalAddonsPrice.toFixed(2)})
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedAddons.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-zinc-800/80 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== SIDE SALADS MODAL (MULTI-SELECT) ====================
const SideSaladsModal = ({
  isOpen,
  onClose,
  sideSalads = [],
  selectedSideSalads = [],
  onSelectSalad,
  onVariantChange,
  onClearAll,
  totalSaladsPrice = 0,
}) => {
  useBodyScrollLock(isOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="mx-5 md:mx-10 relative bg-[#111] border border-zinc-800 sm:rounded-2xl rounded-t-2xl w-full sm:max-w-2xl md:max-w-3xl max-h-[95vh] sm:max-h-[95vh] flex flex-col shadow-2xl overflow-hidden z-10">
        {/* Narrow Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold text-sm">
              Choose Side Salads
            </h3>
            {selectedSideSalads.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-black">
                {selectedSideSalads.length}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Salad Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sideSalads.map((salad) => {
              const saladId = salad._id || salad.id;
              const selected = selectedSideSalads.find(
                (s) => (s._id || s.id) === saladId
              );
              const isSelected = Boolean(selected);
              const currentVariant =
                selected?._selectedVariant ||
                salad.variants?.[0];
              const hasVariants =
                salad.variants &&
                Array.isArray(salad.variants) &&
                salad.variants.length > 0;

              const displayPrice =
                Number(
                  typeof currentVariant === "object"
                    ? currentVariant?.price
                    : salad.variants?.find((v) => v.name === currentVariant)?.price
                ) ||
                Number(salad.variants?.[0]?.price) ||
                0;

              return (
                <div
                  key={saladId}
                  className={`rounded-xl border-2 transition-all p-2.5 flex flex-col justify-between gap-2 select-none ${isSelected
                    ? "bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/10"
                    : "bg-zinc-800/40 border-zinc-800 hover:border-zinc-700"
                    }`}
                >
                  {/* Card header / trigger */}
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => onSelectSalad(salad)}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-400 border border-zinc-700/50 flex-shrink-0">
                      <SafeImage
                        src={getImageUrl(salad.image)}
                        alt={salad.name}
                        fill
                        className="object-cover"
                        fallbackClassName="bg-gray-400"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-white font-medium text-xs sm:text-sm line-clamp-1">
                        {salad.name}
                      </h5>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-amber-400 font-bold text-xs">
                          {displayPrice > 0 ? `+$${displayPrice}` : "Included"}
                        </span>
                        {isSelected && currentVariant && (
                          <span className="text-[10px] text-zinc-400 capitalize">
                            · {typeof currentVariant === "object" ? currentVariant?.name : currentVariant}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected
                        ? "border-amber-500 bg-amber-500 text-black"
                        : "border-zinc-600 hover:border-zinc-500"
                        }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>

                  {/* Variants controls when selected */}
                  {isSelected && hasVariants && salad.variants.length > 1 && (
                    <div className="pt-2 border-t border-zinc-700/50 flex flex-wrap items-center gap-1">
                      {salad.variants.map((v, vIdx) => {
                        const vName =
                          typeof currentVariant === "object"
                            ? currentVariant?.name
                            : currentVariant;
                        const isVSelected = vName === v.name;
                        const vPrice = Number(v.price) || 0;
                        return (
                          <button
                            key={vIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onVariantChange(saladId, v);
                            }}
                            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${isVSelected
                              ? "bg-amber-500 text-black shadow-sm"
                              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                              }`}
                          >
                            <span className="capitalize">{v.name}</span>
                            {vPrice > 0 && (
                              <span className="ml-1 text-[10px] opacity-80">
                                +${vPrice}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {sideSalads.length === 0 && (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No side salads available.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-4 bg-zinc-900/95 backdrop-blur-sm flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Selected Salads
            </p>
            <p className="text-sm font-bold text-white">
              {selectedSideSalads.length} item{selectedSideSalads.length === 1 ? "" : "s"}
              {totalSaladsPrice > 0 && (
                <span className="text-amber-400 font-bold ml-1.5">
                  (+${totalSaladsPrice.toFixed(2)})
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedSideSalads.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-zinc-800/80 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Done
            </button>
          </div>
        </div>
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
        <div className="relative w-full aspect-[4/3] bg-gray-400 overflow-hidden">
          <SafeImage
            src={getImageUrl(item.image)}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            fallbackClassName="bg-gray-400"
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
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTypeVariant, setSelectedTypeVariant] = useState(null);
  const [selectedDressing, setSelectedDressing] = useState(null);
  const [selectedDressingVariant, setSelectedDressingVariant] = useState(null);
  const [selectedSaladAddon, setSelectedSaladAddon] = useState(null);
  const [selectedSaladAddonVariant, setSelectedSaladAddonVariant] = useState(null);
  const [selectedSaladMod, setSelectedSaladMod] = useState(null);
  const [selectedSaladModVariant, setSelectedSaladModVariant] = useState(null);
  const [selectedModify, setSelectedModify] = useState(null);
  const [selectedModifyVariant, setSelectedModifyVariant] = useState(null);
  const [selectedFlavour, setSelectedFlavour] = useState(null);
  const [selectedFlavourVariant, setSelectedFlavourVariant] = useState(null);
  const [selectedMakeItWith, setSelectedMakeItWith] = useState(null);
  const [selectedMakeItWithVariant, setSelectedMakeItWithVariant] = useState(null);
  const [selectedSideSalads, setSelectedSideSalads] = useState([]);

  const [isCrustSelected, setIsCrustSelected] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // null | "crust" | "sauce" | "cheese" | "type" | "dressing" | "saladAddon" | "saladMod" | "modify" | "flavour" | "makeItWith" | "sideSalad" | "toppings"

  // Normalized option lists for the Crust / Sauce / Cheese picker modal
  const crustOptions = useMemo(
    () =>
      (item.crusts || []).map((crust) => ({
        id: crust._id || crust.id,
        name: crust.name,
        image: crust.image,
        variants: null,
        _raw: crust,
      })),
    [item.crusts],
  );

  const sauceOptions = useMemo(
    () =>
      (item.sauces || []).map((sauce) => {
        const variants = sauce.variants
          ? Array.isArray(sauce.variants)
            ? sauce.variants.map((v) => v.name || v)
            : Object.keys(sauce.variants).filter((k) => sauce.variants[k] === true)
          : [];
        return {
          id: sauce._id || sauce.id,
          name: sauce.name,
          image: sauce.image,
          variants,
          _raw: sauce,
        };
      }),
    [item.sauces],
  );

  const cheeseOptions = useMemo(() => {
    const list = (item.cheeses || []).map((cheese) => {
      const variants = cheese.variants
        ? Array.isArray(cheese.variants)
          ? cheese.variants.map((v) => v.name || v)
          : Object.keys(cheese.variants).filter((k) => cheese.variants[k] === true)
        : [];
      return {
        id: cheese._id || cheese.id,
        name: cheese.name,
        image: cheese.image,
        variants,
        _raw: cheese,
      };
    });
    return [
      ...list,
      {
        id: "no-cheese",
        name: "No Cheese",
        image: null,
        variants: [],
        _raw: "no-cheese",
      },
    ];
  }, [item.cheeses]);

  const typeOptions = useMemo(
    () =>
      (item.types || []).map((type) => ({
        id: type._id || type.id,
        name: type.name,
        image: type.image,
        variants: type.variants || [],
        variantPrices: (type.variants || []).reduce((acc, v) => {
          acc[v.name] = v.price;
          return acc;
        }, {}),
        _raw: type,
      })),
    [item.types],
  );

  const dressingOptions = useMemo(
    () =>
      (item.dressings || []).map((dressing) => ({
        id: dressing._id || dressing.id,
        name: dressing.name,
        image: dressing.image,
        variants: dressing.variants || [],
        variantPrices: (dressing.variants || []).reduce((acc, v) => {
          acc[v.name] = v.price;
          return acc;
        }, {}),
        _raw: dressing,
      })),
    [item.dressings],
  );

  const saladAddonOptions = useMemo(
    () =>
      (item.salad_addons || []).map((addon) => ({
        id: addon._id || addon.id,
        name: addon.name,
        image: addon.image,
        variants: addon.variants || [],
        variantPrices: (addon.variants || []).reduce((acc, v) => {
          acc[v.name] = v.price;
          return acc;
        }, {}),
        _raw: addon,
      })),
    [item.salad_addons],
  );

  const saladModsOptions = useMemo(
    () =>
      (item.salad_mods || []).map((mod) => ({
        id: mod._id || mod.id,
        name: mod.name,
        image: mod.image,
        variants: mod.variants || [],
        variantPrices: (mod.variants || []).reduce((acc, v) => {
          acc[v.name] = v.price;
          return acc;
        }, {}),
        _raw: mod,
      })),
    [item.salad_mods],
  );

  const modifyOptions = useMemo(
    () =>
      (item.modifies || []).map((mod) => ({
        id: mod._id || mod.id,
        name: mod.name,
        image: mod.image,
        variants: mod.variants || [],
        variantPrices: (mod.variants || []).reduce((acc, v) => {
          acc[v.name] = v.price;
          return acc;
        }, {}),
        _raw: mod,
      })),
    [item.modifies],
  );

  const flavourOptions = useMemo(
    () =>
      (item.flavours || []).map((flavour) => ({
        id: flavour._id || flavour.id,
        name: flavour.name,
        image: flavour.image,
        variants: flavour.variants || [],
        variantPrices: (flavour.variants || []).reduce((acc, v) => {
          acc[v.name] = v.price;
          return acc;
        }, {}),
        _raw: flavour,
      })),
    [item.flavours],
  );

  const makeItWithOptions = useMemo(
    () =>
      (item.make_it_with || []).map((m) => ({
        id: m._id || m.id,
        name: m.name,
        image: m.image,
        variants: m.variants || [],
        variantPrices: (m.variants || []).reduce((acc, v) => {
          acc[v.name] = v.price;
          return acc;
        }, {}),
        _raw: m,
      })),
    [item.make_it_with],
  );

  const handleCrustConfirm = (option) => {
    if (option._raw) {
      handleCrustSelect(option._raw);
    }
  };

  const handleSauceConfirm = (option, variant) => {
    if (option._raw) {
      setSelectedSauce(option._raw);
      setSelectedSauceVariant(variant || null);
    }
  };

  const handleCheeseConfirm = (option, variant) => {
    if (option._raw === "no-cheese" || option.id === "no-cheese") {
      setSelectedCheese("no-cheese");
      setSelectedCheeseVariant(null);
    } else if (option._raw) {
      setSelectedCheese(option._raw);
      setSelectedCheeseVariant(variant || null);
    }
  };

  const handleTypeConfirm = (option, variant) => {
    if (option._raw) {
      setSelectedType(option._raw);
      setSelectedTypeVariant(variant || null);
    }
  };

  const handleDressingConfirm = (option, variant) => {
    if (option._raw) {
      setSelectedDressing(option._raw);
      setSelectedDressingVariant(variant || null);
    }
  };

  const handleSaladAddonConfirm = (option, variant) => {
    if (option._raw) {
      setSelectedSaladAddon(option._raw);
      setSelectedSaladAddonVariant(variant || null);
    }
  };

  const handleSaladModConfirm = (option, variant) => {
    if (option._raw) {
      setSelectedSaladMod(option._raw);
      setSelectedSaladModVariant(variant || null);
    }
  };

  const handleModifyConfirm = (option, variant) => {
    if (option._raw) {
      setSelectedModify(option._raw);
      setSelectedModifyVariant(variant || null);
    }
  };

  const handleFlavourConfirm = (option, variant) => {
    if (option._raw) {
      setSelectedFlavour(option._raw);
      setSelectedFlavourVariant(variant || null);
    }
  };

  const handleMakeItWithConfirm = (option, variant) => {
    if (option._raw) {
      setSelectedMakeItWith(option._raw);
      setSelectedMakeItWithVariant(variant || null);
    }
  };

  const handleSideSaladSelect = (salad) => {
    setSelectedSideSalads((prev) => {
      const saladId = salad._id || salad.id;
      const exists = prev.some((s) => (s._id || s.id) === saladId);
      if (exists) {
        return prev.filter((s) => (s._id || s.id) !== saladId);
      }
      const defaultVariant =
        salad.variants?.[0] || { name: "Regular", price: 0 };
      return [
        ...prev,
        {
          ...salad,
          _selectedVariant: defaultVariant,
        },
      ];
    });
  };

  const handleSideSaladVariantChange = (saladId, variant) => {
    setSelectedSideSalads((prev) =>
      prev.map((s) => {
        if ((s._id || s.id) === saladId) {
          return { ...s, _selectedVariant: variant };
        }
        return s;
      }),
    );
  };

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
    selectedType,
    selectedTypeVariant,
    selectedDressing,
    selectedDressingVariant,
    selectedSaladAddon,
    selectedSaladAddonVariant,
    selectedSaladMod,
    selectedSaladModVariant,
    selectedModify,
    selectedModifyVariant,
    selectedFlavour,
    selectedFlavourVariant,
    selectedMakeItWith,
    selectedMakeItWithVariant,
    selectedSideSalads,
    selectedSeasonings,
    selectedAddons,
    selectedRelatedItems,
    selectedInstructions,
  ]);

  // Also reset it if the cart gets cleared elsewhere (e.g. "Clear All" in
  // the cart drawer) - otherwise the button stays stuck on "Added to Cart!"
  // until a full page reload.
  useEffect(() => {
    if (cartsList.length === 0) {
      setIsInCart(false);
    }
  }, [cartsList]);

  const hasCrusts = item.crusts && item.crusts.length > 0;
  const hasSauces = item.sauces && item.sauces.length > 0;
  const hasCheeses = item.cheeses && item.cheeses.length > 0;
  const hasTypes = item.types && item.types.length > 0;
  const hasDressings = item.dressings && item.dressings.length > 0;
  const hasSaladAddons = item.salad_addons && item.salad_addons.length > 0;
  const hasSaladMods = item.salad_mods && item.salad_mods.length > 0;
  const hasModifies = item.modifies && item.modifies.length > 0;
  const hasFlavours = item.flavours && item.flavours.length > 0;
  const hasMakeItWith = item.make_it_with && item.make_it_with.length > 0;
  const hasSideSalads = item.side_salads && item.side_salads.length > 0;
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

  // Auto-select first type if available
  useEffect(() => {
    if (hasTypes && item.types.length > 0 && !selectedType) {
      const firstType = item.types[0];
      setSelectedType(firstType);
      if (firstType.variants && firstType.variants.length > 0) {
        setSelectedTypeVariant(firstType.variants[0].name);
      }
    }
  }, [hasTypes, item.types, selectedType]);

  // Auto-select first dressing if available
  useEffect(() => {
    if (hasDressings && item.dressings.length > 0 && !selectedDressing) {
      const first = item.dressings[0];
      setSelectedDressing(first);
      if (first.variants && first.variants.length > 0) {
        setSelectedDressingVariant(first.variants[0].name);
      }
    }
  }, [hasDressings, item.dressings, selectedDressing]);

  // Auto-select first salad addon if available
  useEffect(() => {
    if (hasSaladAddons && item.salad_addons.length > 0 && !selectedSaladAddon) {
      const first = item.salad_addons[0];
      setSelectedSaladAddon(first);
      if (first.variants && first.variants.length > 0) {
        setSelectedSaladAddonVariant(first.variants[0].name);
      }
    }
  }, [hasSaladAddons, item.salad_addons, selectedSaladAddon]);

  // Auto-select first salad mod if available
  useEffect(() => {
    if (hasSaladMods && item.salad_mods.length > 0 && !selectedSaladMod) {
      const first = item.salad_mods[0];
      setSelectedSaladMod(first);
      if (first.variants && first.variants.length > 0) {
        setSelectedSaladModVariant(first.variants[0].name);
      }
    }
  }, [hasSaladMods, item.salad_mods, selectedSaladMod]);

  // Auto-select first modify if available
  useEffect(() => {
    if (hasModifies && item.modifies.length > 0 && !selectedModify) {
      const first = item.modifies[0];
      setSelectedModify(first);
      if (first.variants && first.variants.length > 0) {
        setSelectedModifyVariant(first.variants[0].name);
      }
    }
  }, [hasModifies, item.modifies, selectedModify]);

  // Auto-select first flavour if available
  useEffect(() => {
    if (hasFlavours && item.flavours.length > 0 && !selectedFlavour) {
      const first = item.flavours[0];
      setSelectedFlavour(first);
      if (first.variants && first.variants.length > 0) {
        setSelectedFlavourVariant(first.variants[0].name);
      }
    }
  }, [hasFlavours, item.flavours, selectedFlavour]);

  // Auto-select first make it with if available
  useEffect(() => {
    if (hasMakeItWith && item.make_it_with.length > 0 && !selectedMakeItWith) {
      const first = item.make_it_with[0];
      setSelectedMakeItWith(first);
      if (first.variants && first.variants.length > 0) {
        setSelectedMakeItWithVariant(first.variants[0].name);
      }
    }
  }, [hasMakeItWith, item.make_it_with, selectedMakeItWith]);

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

  // Handle variant/placement change from ToppingsModal
  const handleAddonVariantChange = (addonId, type, value) => {
    setSelectedAddons((prev) =>
      prev.map((a) => {
        const id = a._id || a.id;
        if (id === addonId) {
          if (type === "variant") {
            return { ...a, _selectedVariant: value };
          } else if (type === "placement") {
            return { ...a, _selectedPlacement: value };
          }
        }
        return a;
      }),
    );
  };

  const getAddonsTotalPrice = () => {
    return selectedAddons.reduce((sum, a) => {
      const v =
        typeof a._selectedVariant === "object"
          ? a._selectedVariant
          : a.variants?.find((x) => x.name === a._selectedVariant) ||
            a.variants?.[0];
      const p = Number(v?.price) || 0;
      return sum + p;
    }, 0);
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

    // Type variant price
    if (selectedType && selectedTypeVariant) {
      const v = selectedType.variants?.find(
        (varItem) =>
          varItem.name?.toLowerCase() === selectedTypeVariant?.toLowerCase(),
      );
      total += Number(v?.price) || 0;
    }

    // Dressing variant price
    if (selectedDressing && selectedDressingVariant) {
      const v = selectedDressing.variants?.find(
        (varItem) =>
          varItem.name?.toLowerCase() === selectedDressingVariant?.toLowerCase(),
      );
      total += Number(v?.price) || 0;
    }

    // Salad addon variant price
    if (selectedSaladAddon && selectedSaladAddonVariant) {
      const v = selectedSaladAddon.variants?.find(
        (varItem) =>
          varItem.name?.toLowerCase() === selectedSaladAddonVariant?.toLowerCase(),
      );
      total += Number(v?.price) || 0;
    }

    // Salad mod variant price
    if (selectedSaladMod && selectedSaladModVariant) {
      const v = selectedSaladMod.variants?.find(
        (varItem) =>
          varItem.name?.toLowerCase() === selectedSaladModVariant?.toLowerCase(),
      );
      total += Number(v?.price) || 0;
    }

    // Modify variant price
    if (selectedModify && selectedModifyVariant) {
      const v = selectedModify.variants?.find(
        (varItem) =>
          varItem.name?.toLowerCase() === selectedModifyVariant?.toLowerCase(),
      );
      total += Number(v?.price) || 0;
    }

    // Flavour variant price
    if (selectedFlavour && selectedFlavourVariant) {
      const v = selectedFlavour.variants?.find(
        (varItem) =>
          varItem.name?.toLowerCase() === selectedFlavourVariant?.toLowerCase(),
      );
      total += Number(v?.price) || 0;
    }

    // Make It With variant price
    if (selectedMakeItWith && selectedMakeItWithVariant) {
      const v = selectedMakeItWith.variants?.find(
        (varItem) =>
          varItem.name?.toLowerCase() === selectedMakeItWithVariant?.toLowerCase(),
      );
      total += Number(v?.price) || 0;
    }

    // Side salad variant prices
    total += selectedSideSalads.reduce((sum, s) => {
      const v = s._selectedVariant || s.variants?.[0];
      return sum + (Number(v?.price) || 0);
    }, 0);

    // Addon variant prices
    total += getAddonsTotalPrice();

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

  // Builds the cart-item payload for the main customized product. Shared by
  // "Add to Cart" (dispatched into the persistent cart) and "Instant Order"
  // (handed straight to the instant-order modal without touching the cart).
  const buildMainCartItem = () => {
    const { basics, sauce, cheese, addonsList } = getSelectionDisplay();
    const mainProductPrice = getMainProductPrice();

    const yourSelectionParts = [];
    if (basics.length > 0) yourSelectionParts.push(basics.join(", "));
    if (sauce) yourSelectionParts.push(sauce);
    if (cheese) yourSelectionParts.push(cheese);
    if (selectedType) {
      yourSelectionParts.push(
        `Type: ${selectedType.name} (${selectedTypeVariant || "Regular"})`,
      );
    }
    if (selectedDressing) {
      yourSelectionParts.push(
        `Dressing: ${selectedDressing.name} (${selectedDressingVariant || "Regular"})`,
      );
    }
    if (selectedSaladAddon) {
      yourSelectionParts.push(
        `Salad Addon: ${selectedSaladAddon.name} (${selectedSaladAddonVariant || "Regular"})`,
      );
    }
    if (selectedSaladMod) {
      yourSelectionParts.push(
        `Salad Mod: ${selectedSaladMod.name} (${selectedSaladModVariant || "Regular"})`,
      );
    }
    if (selectedModify) {
      yourSelectionParts.push(
        `Modify: ${selectedModify.name} (${selectedModifyVariant || "Regular"})`,
      );
    }
    if (selectedFlavour) {
      yourSelectionParts.push(
        `Flavour: ${selectedFlavour.name} (${selectedFlavourVariant || "Regular"})`,
      );
    }
    if (selectedMakeItWith) {
      yourSelectionParts.push(
        `Make It With: ${selectedMakeItWith.name} (${selectedMakeItWithVariant || "Regular"})`,
      );
    }
    if (selectedSideSalads.length > 0) {
      const saladsText = selectedSideSalads
        .map((s) => `${s.name} (${s._selectedVariant?.name || "Regular"})`)
        .join(", ");
      yourSelectionParts.push(`Side Salads: ${saladsText}`);
    }
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

    return {
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
      type: selectedType
        ? `${selectedType.name} (${selectedTypeVariant || "Regular"})`
        : null,
      dressing: selectedDressing
        ? `${selectedDressing.name} (${selectedDressingVariant || "Regular"})`
        : null,
      saladAddon: selectedSaladAddon
        ? `${selectedSaladAddon.name} (${selectedSaladAddonVariant || "Regular"})`
        : null,
      saladMod: selectedSaladMod
        ? `${selectedSaladMod.name} (${selectedSaladModVariant || "Regular"})`
        : null,
      modify: selectedModify
        ? `${selectedModify.name} (${selectedModifyVariant || "Regular"})`
        : null,
      flavour: selectedFlavour
        ? `${selectedFlavour.name} (${selectedFlavourVariant || "Regular"})`
        : null,
      makeItWith: selectedMakeItWith
        ? `${selectedMakeItWith.name} (${selectedMakeItWithVariant || "Regular"})`
        : null,
      make_it_with: selectedMakeItWith
        ? `${selectedMakeItWith.name} (${selectedMakeItWithVariant || "Regular"})`
        : null,
      sideSalads: selectedSideSalads.map(
        (s) => `${s.name} (${s._selectedVariant?.name || "Regular"})`
      ),
      side_salads: selectedSideSalads.map(
        (s) => `${s.name} (${s._selectedVariant?.name || "Regular"})`
      ),
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
    };
  };

  const handleAddToCart = () => {
    if (isAddToCartDisabled) return;

    setIsAddingToCart(true);

    // 1. Add main customized product to cart (NO extra field)
    dispatch(singleAddToCartsList(buildMainCartItem()));

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
      toast.success(`${item.name} added to cart!`);
      setTimeout(() => {
        setIsInCart(false);
      }, 2500);
    }, 400);
  };

  const [isInstantOrderOpen, setIsInstantOrderOpen] = useState(false);
  const [instantOrderItem, setInstantOrderItem] = useState(null);

  const handleInstantOrder = () => {
    if (isAddToCartDisabled) return;
    const mainItem = buildMainCartItem();
    setInstantOrderItem({
      ...mainItem,
      cartItemId: `instant-${mainItem.productId}-${Date.now()}`,
    });
    setIsInstantOrderOpen(true);
  };

  const getButtonText = () => {
    if (isAddingToCart) return "Adding...";
    if (isInCart) return `Added to Cart!`;
    if (!item.is_available) return "Unavailable";
    if (hasCrusts && !isCrustSelected) return "Select Crust First";
    if (isSizeRequired && !isSizeSelected && !hasSingleSize)
      return "Select Size";
    return `Add to Cart`;
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
        const variant =
          typeof a._selectedVariant === "object"
            ? a._selectedVariant?.name || "normal"
            : a._selectedVariant || a.variants?.[0]?.name || "normal";
        const placement = a._selectedPlacement || "whole";
        const price =
          Number(
            typeof a._selectedVariant === "object"
              ? a._selectedVariant?.price
              : a.variants?.find((v) => v.name === variant)?.price,
          ) || 0;
        const priceText = price > 0 ? `+$${price}` : "Included";
        const displayVariant =
          variant.charAt(0).toUpperCase() + variant.slice(1);
        const displayPlacement =
          placement.charAt(0).toUpperCase() + placement.slice(1);
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

    let typeDisplay = null;
    if (selectedType) {
      const v = selectedTypeVariant || "Regular";
      const varItem = selectedType.variants?.find(
        (vi) => vi.name?.toLowerCase() === v?.toLowerCase(),
      );
      const price = Number(varItem?.price) || 0;
      typeDisplay = `${selectedType.name} (${v})  ${price > 0 ? `+$${price}` : "Included"}`;
    }

    let dressingDisplay = null;
    if (selectedDressing) {
      const v = selectedDressingVariant || "Regular";
      const varItem = selectedDressing.variants?.find(
        (vi) => vi.name?.toLowerCase() === v?.toLowerCase(),
      );
      const price = Number(varItem?.price) || 0;
      dressingDisplay = `${selectedDressing.name} (${v})  ${price > 0 ? `+$${price}` : "Included"}`;
    }

    let saladAddonDisplay = null;
    if (selectedSaladAddon) {
      const v = selectedSaladAddonVariant || "Regular";
      const varItem = selectedSaladAddon.variants?.find(
        (vi) => vi.name?.toLowerCase() === v?.toLowerCase(),
      );
      const price = Number(varItem?.price) || 0;
      saladAddonDisplay = `${selectedSaladAddon.name} (${v})  ${price > 0 ? `+$${price}` : "Included"}`;
    }

    let saladModDisplay = null;
    if (selectedSaladMod) {
      const v = selectedSaladModVariant || "Regular";
      const varItem = selectedSaladMod.variants?.find(
        (vi) => vi.name?.toLowerCase() === v?.toLowerCase(),
      );
      const price = Number(varItem?.price) || 0;
      saladModDisplay = `${selectedSaladMod.name} (${v})  ${price > 0 ? `+$${price}` : "Included"}`;
    }

    let modifyDisplay = null;
    if (selectedModify) {
      const v = selectedModifyVariant || "Regular";
      const varItem = selectedModify.variants?.find(
        (vi) => vi.name?.toLowerCase() === v?.toLowerCase(),
      );
      const price = Number(varItem?.price) || 0;
      modifyDisplay = `${selectedModify.name} (${v})  ${price > 0 ? `+$${price}` : "Included"}`;
    }

    let flavourDisplay = null;
    if (selectedFlavour) {
      const v = selectedFlavourVariant || "Regular";
      const varItem = selectedFlavour.variants?.find(
        (vi) => vi.name?.toLowerCase() === v?.toLowerCase(),
      );
      const price = Number(varItem?.price) || 0;
      flavourDisplay = `${selectedFlavour.name} (${v})  ${price > 0 ? `+$${price}` : "Included"}`;
    }

    let makeItWithDisplay = null;
    if (selectedMakeItWith) {
      const v = selectedMakeItWithVariant || "Regular";
      const varItem = selectedMakeItWith.variants?.find(
        (vi) => vi.name?.toLowerCase() === v?.toLowerCase(),
      );
      const price = Number(varItem?.price) || 0;
      makeItWithDisplay = `${selectedMakeItWith.name} (${v})  ${price > 0 ? `+$${price}` : "Included"}`;
    }

    const sideSaladsList = selectedSideSalads.map((s) => {
      const v = s._selectedVariant?.name || "Regular";
      const price = Number(s._selectedVariant?.price) || 0;
      const priceText = price > 0 ? `+$${price}` : "Included";
      return `${s.name} (${v})  ${priceText}`;
    });

    const addonsList = selectedAddons.map((a) => {
      const variant =
        typeof a._selectedVariant === "object"
          ? a._selectedVariant?.name || "normal"
          : a._selectedVariant || a.variants?.[0]?.name || "normal";
      const placement = a._selectedPlacement || "whole";
      const price =
        Number(
          typeof a._selectedVariant === "object"
            ? a._selectedVariant?.price
            : a.variants?.find((v) => v.name === variant)?.price,
        ) || 0;
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

    return {
      basics,
      sauce,
      cheese,
      type: typeDisplay,
      dressing: dressingDisplay,
      saladAddon: saladAddonDisplay,
      saladMod: saladModDisplay,
      modify: modifyDisplay,
      flavour: flavourDisplay,
      makeItWith: makeItWithDisplay,
      sideSaladsList,
      addonsList,
      extraList,
    };
  };

  const {
    basics,
    sauce,
    cheese,
    type: typeDisplay,
    dressing: dressingDisplay,
    saladAddon: saladAddonDisplay,
    saladMod: saladModDisplay,
    modify: modifyDisplay,
    flavour: flavourDisplay,
    makeItWith: makeItWithDisplay,
    sideSaladsList,
    addonsList,
    extraList,
  } = getSelectionDisplay();
  const hasSelection =
    basics.length > 0 ||
    sauce ||
    cheese ||
    typeDisplay ||
    dressingDisplay ||
    saladAddonDisplay ||
    saladModDisplay ||
    modifyDisplay ||
    flavourDisplay ||
    makeItWithDisplay ||
    sideSaladsList.length > 0 ||
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
              <div className="relative h-80 md:h-[500px] overflow-hidden rounded-tl-2xl bg-gray-400">
                <SafeImage
                  src={getImageUrl(images[currentImageIndex])}
                  alt={item.name}
                  fill
                  className="object-cover"
                  priority
                  fallbackClassName="bg-gray-400"
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
                      className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-400 border-2 transition-all ${currentImageIndex === index
                        ? "border-amber-400"
                        : "border-transparent hover:border-zinc-600"
                        }`}
                    >
                      <SafeImage
                        src={getImageUrl(img)}
                        alt={`${item.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        fallbackClassName="bg-gray-400"
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
                    {typeDisplay && (
                      <p className="text-xs text-gray-400">{typeDisplay}</p>
                    )}
                    {dressingDisplay && (
                      <p className="text-xs text-gray-400">{dressingDisplay}</p>
                    )}
                    {saladAddonDisplay && (
                      <p className="text-xs text-gray-400">{saladAddonDisplay}</p>
                    )}
                    {saladModDisplay && (
                      <p className="text-xs text-gray-400">{saladModDisplay}</p>
                    )}
                    {modifyDisplay && (
                      <p className="text-xs text-gray-400">{modifyDisplay}</p>
                    )}
                    {flavourDisplay && (
                      <p className="text-xs text-gray-400">{flavourDisplay}</p>
                    )}
                    {makeItWithDisplay && (
                      <p className="text-xs text-gray-400">{makeItWithDisplay}</p>
                    )}
                    {sideSaladsList.length > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mt-2 mb-1.5">
                          <div className="w-1 h-3 bg-amber-500 rounded-full" />
                          <h4 className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                            Side Salads ({sideSaladsList.length})
                          </h4>
                        </div>
                        {sideSaladsList.map((saladStr, i) => (
                          <p key={i} className="text-xs text-gray-400">
                            {saladStr}
                          </p>
                        ))}
                      </div>
                    )}
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
                <OptionTrigger
                  label="Crust"
                  required
                  image={selectedCrust?.image}
                  name={selectedCrust?.name}
                  onClick={() => setActiveModal("crust")}
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
                <OptionTrigger
                  label="Sauce"
                  image={selectedSauce?.image}
                  name={selectedSauce?.name}
                  variant={selectedSauce ? selectedSauceVariant : null}
                  onClick={() => setActiveModal("sauce")}
                />
              )}

              {/* ===== CHEESES ===== */}
              {hasCheeses && (
                <OptionTrigger
                  label="Cheese"
                  image={
                    selectedCheese && selectedCheese !== "no-cheese"
                      ? selectedCheese.image
                      : null
                  }
                  name={
                    selectedCheese === "no-cheese"
                      ? "No Cheese"
                      : selectedCheese?.name
                  }
                  variant={
                    selectedCheese && selectedCheese !== "no-cheese"
                      ? selectedCheeseVariant
                      : null
                  }
                  onClick={() => setActiveModal("cheese")}
                />
              )}

              {/* ===== TYPE ===== */}
              {hasTypes && (
                <OptionTrigger
                  label="Type"
                  image={selectedType?.image}
                  name={selectedType?.name}
                  variant={selectedTypeVariant}
                  onClick={() => setActiveModal("type")}
                />
              )}

              {/* ===== DRESSING ===== */}
              {hasDressings && (
                <OptionTrigger
                  label="Dressing"
                  image={selectedDressing?.image}
                  name={selectedDressing?.name}
                  variant={selectedDressingVariant}
                  onClick={() => setActiveModal("dressing")}
                />
              )}

              {/* ===== SALAD ADDON ===== */}
              {hasSaladAddons && (
                <OptionTrigger
                  label="Salad Addon"
                  image={selectedSaladAddon?.image}
                  name={selectedSaladAddon?.name}
                  variant={selectedSaladAddonVariant}
                  onClick={() => setActiveModal("saladAddon")}
                />
              )}

              {/* ===== SALAD MODS ===== */}
              {hasSaladMods && (
                <OptionTrigger
                  label="Salad Mod"
                  image={selectedSaladMod?.image}
                  name={selectedSaladMod?.name}
                  variant={selectedSaladModVariant}
                  onClick={() => setActiveModal("saladMod")}
                />
              )}

              {/* ===== MODIFY ===== */}
              {hasModifies && (
                <OptionTrigger
                  label="Modify Option"
                  image={selectedModify?.image}
                  name={selectedModify?.name}
                  variant={selectedModifyVariant}
                  onClick={() => setActiveModal("modify")}
                />
              )}

              {/* ===== FLAVOUR ===== */}
              {hasFlavours && (
                <OptionTrigger
                  label="Flavour"
                  image={selectedFlavour?.image}
                  name={selectedFlavour?.name}
                  variant={selectedFlavourVariant}
                  onClick={() => setActiveModal("flavour")}
                />
              )}

              {/* ===== MAKE IT WITH ===== */}
              {hasMakeItWith && (
                <OptionTrigger
                  label="Make It With"
                  image={selectedMakeItWith?.image}
                  name={selectedMakeItWith?.name}
                  variant={selectedMakeItWithVariant}
                  onClick={() => setActiveModal("makeItWith")}
                />
              )}

              {/* ===== SIDE SALAD (MODAL TRIGGER) ===== */}
              {hasSideSalads && (
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => setActiveModal("sideSalad")}
                    className="w-full flex items-center justify-between gap-3 bg-zinc-800/50 hover:bg-zinc-800/80 border border-zinc-700 hover:border-amber-500/50 rounded-xl p-3.5 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                            Side Salad
                          </span>
                          {selectedSideSalads.length > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-black">
                              {selectedSideSalads.length}
                            </span>
                          )}
                        </div>
                        <p className="text-white font-medium text-sm truncate mt-0.5">
                          {selectedSideSalads.length > 0
                            ? selectedSideSalads.map((s) => s.name).join(", ")
                            : "Choose side salads"}
                        </p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold flex-shrink-0">
                      {selectedSideSalads.length > 0 ? "Edit" : "Choose"}
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>

                  {/* Selected side salads chips preview */}
                  {selectedSideSalads.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 px-0.5">
                      {selectedSideSalads.map((salad) => {
                        const saladId = salad._id || salad.id;
                        const v = salad._selectedVariant?.name || "Regular";
                        return (
                          <span
                            key={saladId}
                            className="inline-flex items-center gap-1.5 bg-zinc-800/90 border border-zinc-700/80 text-zinc-200 text-xs px-2.5 py-1 rounded-lg"
                          >
                            <span className="text-white font-medium">{salad.name}</span>
                            {salad._selectedVariant && (
                              <span className="text-[10px] text-amber-400/90 capitalize">
                                ({v})
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSideSaladSelect(salad);
                              }}
                              className="text-zinc-400 hover:text-red-400 ml-0.5 transition-colors cursor-pointer"
                              title="Remove salad"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ===== SEASONING ===== */}
              <SeasoningSelector
                seasonings={item.seasoning}
                selectedSeasonings={selectedSeasonings}
                onSelect={handleSeasoningSelect}
              />

              {/* ===== TOPPINGS (MODAL TRIGGER) ===== */}
              {hasGroupedAddons && (
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => setActiveModal("toppings")}
                    className="w-full flex items-center justify-between gap-3 bg-zinc-800/50 hover:bg-zinc-800/80 border border-zinc-700 hover:border-amber-500/50 rounded-xl p-3.5 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                            Toppings
                          </span>
                          {selectedAddons.length > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-black">
                              {selectedAddons.length}
                            </span>
                          )}
                        </div>
                        <p className="text-white font-medium text-sm truncate mt-0.5">
                          {selectedAddons.length > 0
                            ? selectedAddons.map((a) => a.name).join(", ")
                            : "Choose your toppings"}
                        </p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold flex-shrink-0">
                      {selectedAddons.length > 0 ? "Edit" : "Choose"}
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>

                  {/* Selected toppings chips preview */}
                  {selectedAddons.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 px-0.5">
                      {selectedAddons.map((addon) => {
                        const addonId = addon._id || addon.id;
                        const v =
                          addon._selectedVariant?.name ||
                          addon._selectedVariant ||
                          "normal";
                        const p = addon._selectedPlacement || "whole";
                        return (
                          <span
                            key={addonId}
                            className="inline-flex items-center gap-1.5 bg-zinc-800/90 border border-zinc-700/80 text-zinc-200 text-xs px-2.5 py-1 rounded-lg"
                          >
                            <span className="text-white font-medium">{addon.name}</span>
                            <span className="text-[10px] text-amber-400/90 capitalize">
                              ({v} · {p})
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddonSelect(addon);
                              }}
                              className="text-zinc-400 hover:text-red-400 ml-0.5 transition-colors cursor-pointer"
                              title="Remove topping"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
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
              <div className="sticky bottom-0 z-20 -mx-6 md:-mx-10 -mb-6 md:-mb-10 p-3 bg-black/80 backdrop-blur-md border-t border-zinc-800/80 mt-8 rounded-t-xl">
                <div className="flex gap-3">
                  <button
                    disabled={isAddToCartDisabled}
                    onClick={handleAddToCart}
                    className={`flex-1 font-bold lg:py-3.5 p-2 lg:px-6 rounded-lg transition-all duration-300 shadow-lg ${isInCart
                      ? "bg-green-600 text-white cursor-pointer hover:bg-green-700"
                      : isAddingToCart
                        ? "bg-green-600 text-white"
                        : !isAddToCartDisabled
                          ? "bg-amber-500 text-black hover:bg-amber-600 active:scale-[0.99] cursor-pointer"
                          : "bg-zinc-700 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {getButtonText()}
                    </span>
                  </button>
                  <button
                    disabled={isAddToCartDisabled}
                    onClick={handleInstantOrder}
                    className={`flex-1 font-bold lg:py-3.5 p-2 lg:px-6 rounded-lg transition-all duration-300 shadow-lg border ${!isAddToCartDisabled
                      ? "border-amber-500 text-amber-400 hover:bg-amber-500/10 active:scale-[0.99] cursor-pointer"
                      : "border-zinc-700 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    Instant Order
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

      <InstantOrderModal
        isOpen={isInstantOrderOpen}
        onClose={() => setIsInstantOrderOpen(false)}
        items={instantOrderItem ? [instantOrderItem] : []}
      />

      <PizzaOptionModal
        isOpen={activeModal === "crust"}
        onClose={() => setActiveModal(null)}
        title="Choose Crust"
        options={crustOptions}
        selectedId={selectedCrust?._id || selectedCrust?.id}
        selectedVariant={null}
        onConfirm={handleCrustConfirm}
      />

      <PizzaOptionModal
        isOpen={activeModal === "sauce"}
        onClose={() => setActiveModal(null)}
        title="Choose Sauce"
        options={sauceOptions}
        selectedId={selectedSauce?._id || selectedSauce?.id}
        selectedVariant={selectedSauceVariant}
        onConfirm={handleSauceConfirm}
      />

      <PizzaOptionModal
        isOpen={activeModal === "cheese"}
        onClose={() => setActiveModal(null)}
        title="Choose Cheese"
        options={cheeseOptions}
        selectedId={
          selectedCheese === "no-cheese"
            ? "no-cheese"
            : selectedCheese?._id || selectedCheese?.id
        }
        selectedVariant={selectedCheeseVariant}
        onConfirm={handleCheeseConfirm}
      />

      <PizzaOptionModal
        isOpen={activeModal === "type"}
        onClose={() => setActiveModal(null)}
        title="Choose Type"
        options={typeOptions}
        selectedId={selectedType?._id || selectedType?.id}
        selectedVariant={selectedTypeVariant}
        onConfirm={handleTypeConfirm}
      />

      <PizzaOptionModal
        isOpen={activeModal === "dressing"}
        onClose={() => setActiveModal(null)}
        title="Choose Dressing"
        options={dressingOptions}
        selectedId={selectedDressing?._id || selectedDressing?.id}
        selectedVariant={selectedDressingVariant}
        onConfirm={handleDressingConfirm}
      />

      <PizzaOptionModal
        isOpen={activeModal === "saladAddon"}
        onClose={() => setActiveModal(null)}
        title="Choose Salad Addon"
        options={saladAddonOptions}
        selectedId={selectedSaladAddon?._id || selectedSaladAddon?.id}
        selectedVariant={selectedSaladAddonVariant}
        onConfirm={handleSaladAddonConfirm}
      />

      <PizzaOptionModal
        isOpen={activeModal === "saladMod"}
        onClose={() => setActiveModal(null)}
        title="Choose Salad Mod"
        options={saladModsOptions}
        selectedId={selectedSaladMod?._id || selectedSaladMod?.id}
        selectedVariant={selectedSaladModVariant}
        onConfirm={handleSaladModConfirm}
      />

      <PizzaOptionModal
        isOpen={activeModal === "modify"}
        onClose={() => setActiveModal(null)}
        title="Choose Modify Option"
        options={modifyOptions}
        selectedId={selectedModify?._id || selectedModify?.id}
        selectedVariant={selectedModifyVariant}
        onConfirm={handleModifyConfirm}
      />

      <PizzaOptionModal
        isOpen={activeModal === "flavour"}
        onClose={() => setActiveModal(null)}
        title="Choose Flavour"
        options={flavourOptions}
        selectedId={selectedFlavour?._id || selectedFlavour?.id}
        selectedVariant={selectedFlavourVariant}
        onConfirm={handleFlavourConfirm}
      />

      <PizzaOptionModal
        isOpen={activeModal === "makeItWith"}
        onClose={() => setActiveModal(null)}
        title="Choose Make It With"
        options={makeItWithOptions}
        selectedId={selectedMakeItWith?._id || selectedMakeItWith?.id}
        selectedVariant={selectedMakeItWithVariant}
        onConfirm={handleMakeItWithConfirm}
      />

      <SideSaladsModal
        isOpen={activeModal === "sideSalad"}
        onClose={() => setActiveModal(null)}
        sideSalads={item.side_salads || []}
        selectedSideSalads={selectedSideSalads}
        onSelectSalad={handleSideSaladSelect}
        onVariantChange={handleSideSaladVariantChange}
        onClearAll={() => setSelectedSideSalads([])}
        totalSaladsPrice={selectedSideSalads.reduce((sum, s) => {
          const v = s._selectedVariant || s.variants?.[0];
          return sum + (Number(v?.price) || 0);
        }, 0)}
      />

      <ToppingsModal
        isOpen={activeModal === "toppings"}
        onClose={() => setActiveModal(null)}
        groupedAddons={item.grouped_addons || {}}
        selectedAddons={selectedAddons}
        onSelectAddon={handleAddonSelect}
        onVariantChange={handleAddonVariantChange}
        onClearAll={() => setSelectedAddons([])}
        totalAddonsPrice={getAddonsTotalPrice()}
      />
    </section>
  );
}