// src/components/shared/FoodModal.jsx

import Image from "next/image";
import { X } from "lucide-react";

export const FoodModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a1a] border border-zinc-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              {item.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
                  {item.discount}% OFF
                </div>
              )}
            </div>

            <div className="md:w-1/2 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {item.title}
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-amber-400">
                  ${item.price}
                </span>
                {item.discount > 0 && (
                  <span className="text-lg text-gray-500 line-through">
                    ${Math.round(item.price / (1 - item.discount / 100))}
                  </span>
                )}
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                {item.fullDescription || item.description}
              </p>

              <div className="border-t border-zinc-700 pt-4 mb-6">
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
                  Details
                </h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Premium quality ingredients</li>
                  <li>• Prepared fresh to order</li>
                  <li>• Serves 1-2 people</li>
                </ul>
              </div>

              <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                Add to Cart - ${item.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
