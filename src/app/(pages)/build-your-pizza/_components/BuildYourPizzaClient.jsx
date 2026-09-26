// src/app/(pages)/build-your-pizza/_components/BuildYourPizzaClient.jsx

"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Plus,
  Minus,
  SlidersHorizontal,
  X,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { baseUriBackend } from "@/redux/url/url";
import { singleAddToCartsList } from "@/redux/features/Slice/CartDrawerSlice";
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

// ==================== OPTION PICKER MODAL (Crust / Sauce / Cheese) ====================
// Compact trigger button + full-screen picker: click the button, pick one
// option (and a light/normal/extra variant if it has any) at the bottom,
// tap Select to confirm.
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
            className="text-gray-500 hover:text-white transition-colors"
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
                  className={`flex flex-col items-center gap-1.5 rounded-lg border-2 p-2 transition-all cursor-pointer ${isSelected
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
                    className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all cursor-pointer ${isSelected
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
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-700 disabled:text-gray-400 text-black font-bold py-3 rounded-lg transition-all cursor-pointer"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== MULTI-SELECT MODAL (Toppings / Addons) ====================
// Compact trigger button + full-screen modal for multi-select sections.
// Selections apply immediately (same handlers as before); "Done" just closes.
const SectionTrigger = ({ icon, label, summary, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-3 bg-zinc-800/80 border border-zinc-700 hover:border-amber-500/50 rounded-lg px-3 py-2.5 transition-all text-left mb-4 cursor-pointer"
  >
    {icon}
    <div className="flex-1 min-w-0">
      <p className="text-white font-medium text-sm">{label}</p>
      {summary && <p className="text-[11px] text-amber-400 mt-0.5">{summary}</p>}
    </div>
    <span className="flex items-center gap-0.5 text-amber-400 text-xs font-semibold flex-shrink-0">
      {summary ? "Edit" : "Add"}
      <ChevronRight size={14} />
    </span>
  </button>
);

const MultiSelectModal = ({ isOpen, onClose, title, children }) => {
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

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
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-4">{children}</div>

        <div className="border-t border-zinc-800 p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== SIZE SELECTOR ====================
const SizeSelector = ({ sizes, selectedSize, onSelect, selectedCrust }) => {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
        Select Size <span className="text-red-500">*</span>
      </h3>
      <div className="flex flex-wrap gap-2">
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
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all min-w-[72px] text-center ${!isSizeAvailable
                ? "bg-zinc-800/30 text-gray-600 cursor-not-allowed border border-zinc-700/50 opacity-40"
                : isSelected
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/30 cursor-pointer"
                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700 cursor-pointer"
                }`}
            >
              <div className="font-bold">{size.name}</div>
              <div className="text-[10px] opacity-80">${size.price}</div>
            </button>
          );
        })}
      </div>
      {selectedCrust && (
        <p className="text-[10px] text-gray-500 mt-1.5">
          Sizes enabled are based on selected crust ({selectedCrust.name})
        </p>
      )}
    </div>
  );
};

// ==================== SEASONING SELECTOR ====================
const SeasoningSelector = ({ seasonings, selectedSeasonings, onSelect }) => {
  if (!seasonings || seasonings.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
        Choose Seasonings
      </h3>
      <div className="grid grid-cols-2 gap-2">
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
              <div className="flex items-center justify-between px-3 py-2.5">
                <h4 className="text-white font-medium text-xs flex-1 mr-2">
                  {seasoning.name}
                </h4>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected
                    ? "border-amber-500 bg-amber-500"
                    : "border-zinc-600"
                    }`}
                >
                  {isSelected && <Check size={10} className="text-black" />}
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
                      (a) => (a._id || a.id) === addonId
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
                      Number(currentVariant?.price) ||
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
                                  · {currentVariant?.name || "normal"} ({currentPlacement})
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
                                  const isVSelected = currentVariant?.name === v.name;
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
    <div className="mb-4">
      <h3 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
        Special Instructions
      </h3>

      {hasCut && (
        <div className="mb-2">
          <h4 className="text-[10px] text-gray-500 mb-1">Cut</h4>
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
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer ${isSelected
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
          <h4 className="text-[10px] text-gray-500 mb-1">Bake</h4>
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
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer ${isSelected
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

        <div className="relative w-full aspect-[4/3] bg-gray-400 overflow-hidden">
          <SafeImage
            src={getImageUrl(item.image)}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            fallbackClassName="bg-gray-400"
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
  const { cartsList } = useSelector((state) => state.cartDrawer);

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

  // Normalized option lists for the Crust / Sauce / Cheese picker modal
  const crustOptions = useMemo(
    () =>
      crusts.map((crust) => ({
        id: crust._id || crust.id,
        name: crust.name,
        image: crust.image,
        variants: null,
        _raw: crust,
      })),
    [crusts],
  );

  const sauceOptions = useMemo(
    () =>
      sauces.map((sauce) => ({
        id: sauce._id || sauce.id,
        name: sauce.name,
        image: sauce.image,
        variants: sauce.variants
          ? Object.keys(sauce.variants).filter((k) => sauce.variants[k] === true)
          : [],
        _raw: sauce,
      })),
    [sauces],
  );

  const cheeseOptions = useMemo(
    () => [
      ...cheeses.map((cheese) => ({
        id: cheese._id || cheese.id,
        name: cheese.name,
        image: cheese.image,
        variants: cheese.variants
          ? Object.keys(cheese.variants).filter((k) => cheese.variants[k] === true)
          : [],
        _raw: cheese,
      })),
      {
        id: "no-cheese",
        name: "No Cheese",
        image: null,
        variants: [],
        _raw: "no-cheese",
      },
    ],
    [cheeses],
  );

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

  // Reset it if the cart gets cleared elsewhere (e.g. "Clear All" in the
  // cart drawer) - otherwise the button stays stuck on "Added to Cart!"
  // until a full page reload.
  useEffect(() => {
    if (cartsList.length === 0) {
      setIsInCart(false);
    }
  }, [cartsList]);

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
    basePrice +
    sauceExtraPrice +
    cheeseExtraPrice +
    addonsExtraPrice;

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

  // Builds the cart-item payload for the custom pizza. Shared by "Add to
  // Cart" (dispatched into the persistent cart) and "Instant Order" (handed
  // straight to the instant-order modal without touching the cart).
  const buildMainCartItem = () => {
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

    return {
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
    };
  };

  // ==================== ADD TO CART ====================
  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // 1. Add custom pizza to cart
    dispatch(singleAddToCartsList(buildMainCartItem()));

    // 2. Add each selected "Addons" item separately
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

  const [isInstantOrderOpen, setIsInstantOrderOpen] = useState(false);
  const [instantOrderItem, setInstantOrderItem] = useState(null);

  const handleInstantOrder = () => {
    const mainItem = buildMainCartItem();
    setInstantOrderItem({
      ...mainItem,
      cartItemId: `instant-${mainItem.productId}-${Date.now()}`,
    });
    setIsInstantOrderOpen(true);
  };

  // Crust / Sauce / Cheese / Toppings picker modal
  const [activeModal, setActiveModal] = useState(null); // null | "crust" | "sauce" | "cheese" | "toppings"

  const handleCrustConfirm = (option) => handleCrustSelect(option._raw);

  const handleSauceConfirm = (option, variant) => {
    handleSauceSelect(option._raw);
    if (variant) setSelectedSauceVariant(variant);
  };

  const handleCheeseConfirm = (option, variant) => {
    handleCheeseSelect(option._raw);
    if (variant) setSelectedCheeseVariant(variant);
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
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden bg-gray-400 flex items-center justify-center">
                  <SafeImage
                    src={getImageUrl(previewImage)}
                    alt="Build Custom Pizza"
                    fill
                    className="object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.2)]"
                    priority
                    fallbackClassName="rounded-full bg-gray-400"
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
                            Addons
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
              {crusts.length > 0 && (
                <OptionTrigger
                  label="Crust"
                  required
                  image={selectedCrust?.image}
                  name={selectedCrust?.name}
                  onClick={() => setActiveModal("crust")}
                />
              )}

              {/* 2. SELECT SIZE */}
              <SizeSelector
                sizes={STATIC_SIZES}
                selectedSize={selectedSize}
                onSelect={handleSizeSelect}
                selectedCrust={selectedCrust}
              />

              {/* 3. SAUCES */}
              {sauces.length > 0 && (
                <OptionTrigger
                  label="Sauce"
                  image={selectedSauce?.image}
                  name={selectedSauce?.name}
                  variant={selectedSauce ? selectedSauceVariant : null}
                  onClick={() => setActiveModal("sauce")}
                />
              )}

              {/* 4. CHEESES */}
              {cheeses.length > 0 && (
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

              {/* 5. CHOOSE SEASONINGS */}
              <SeasoningSelector
                seasonings={STATIC_SEASONINGS}
                selectedSeasonings={selectedSeasonings}
                onSelect={handleSeasoningSelect}
              />

              {/* 6. TOPPINGS (MODAL TRIGGER) */}
              {Object.keys(groupedAddons).length > 0 && (
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
                        const v = addon._selectedVariant?.name || "normal";
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

              {/* 7. SPECIAL INSTRUCTIONS */}
              <SpecialInstructions
                instructions={STATIC_INSTRUCTIONS}
                selectedInstructions={selectedInstructions}
                onSelect={handleInstructionSelect}
              />

              {/* 8. YOU MAY ALSO LIKE */}
              {relatedItems && relatedItems.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-amber-500 rounded-full" />
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Addons
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
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

              {/* 9. STICKY ADD TO CART / INSTANT ORDER BUTTONS */}
              <div className="sticky bottom-0 z-20 -mx-6 md:-mx-10 -mb-6 md:-mb-10 p-3 bg-black/80 backdrop-blur-md border-t border-zinc-800/80 mt-8 rounded-t-xl">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className={`flex-1 font-bold lg:py-3.5 p-2 lg:px-6 rounded-lg transition-all duration-300 shadow-lg cursor-pointer ${isInCart
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-amber-500 text-black hover:bg-amber-600 active:scale-[0.99]"
                      }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isInCart ? (
                        <>
                          <span>Added to Cart (${mainProductPrice.toFixed(2)})</span>
                        </>
                      ) : (
                        <span>
                          Add to Cart - ${mainProductPrice.toFixed(2)}
                        </span>
                      )}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleInstantOrder}
                    disabled={isAddingToCart}
                    className="flex-1 font-bold lg:py-3.5 p-2 lg:px-6 rounded-lg transition-all duration-300 shadow-lg border border-amber-500 text-amber-400 hover:bg-amber-500/10 active:scale-[0.99] cursor-pointer"
                  >
                    Instant Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

      <ToppingsModal
        isOpen={activeModal === "toppings"}
        onClose={() => setActiveModal(null)}
        groupedAddons={groupedAddons}
        selectedAddons={selectedAddons}
        onSelectAddon={handleAddonSelect}
        onVariantChange={handleAddonVariantChange}
        onClearAll={() => setSelectedAddons([])}
        totalAddonsPrice={addonsExtraPrice}
      />
    </section>
  );
}
