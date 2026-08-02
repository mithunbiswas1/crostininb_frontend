import Image from "next/image";
import { X } from "lucide-react";
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

export const FoodModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a1a] border border-zinc-700 rounded-lg max-w-4xl w-full max-h-[80vh] lg:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto md:min-h-50 bg-zinc-900">
              <Image
                src={getImageUrl(item.image)}
                alt={item.name || item.title}
                fill
                className="object-cover"
              />
              {item.discount_percent > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
                  {item.discount_percent}% OFF
                </div>
              )}
            </div>

            <div className="md:w-1/2 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {item.name || item.title}
              </h2>

              {/* Category */}
              {item.category?.name && (
                <span className="inline-block text-sm text-amber-400 mb-2">
                  {item.category.name}
                </span>
              )}

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
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              )}

              {/* Variations */}
              {item.variations && item.variations.length > 0 && (
                <div className="border-t border-zinc-700 pt-4 mb-4">
                  <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
                    Variations
                  </h3>
                  <div className="space-y-2">
                    {item.variations.map((variation, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-zinc-800/50 px-3 py-2 rounded-lg"
                      >
                        <span className="text-gray-300 text-sm">
                          {variation.variation_name}
                        </span>
                        <span className="text-amber-400 font-semibold text-sm">
                          ${variation.variation_regular_price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {item.features && item.features.length > 0 && (
                <div className="border-t border-zinc-700 pt-4 mb-4">
                  <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-zinc-800/50 text-gray-300 text-xs px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SKU */}
              {item.sku && (
                <div className="text-xs text-gray-500 mt-2">
                  SKU: {item.sku}
                </div>
              )}

              <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200 mt-4">
                Add to Cart - ${item.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
