// src/components/CartDrawer.jsx

"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { baseUriBackend } from "@/redux/url/url";
import {
  closeCart,
  updateQuantity,
  removeFromCartsList,
  clearCartsList,
} from "@/redux/features/Slice/CartDrawerSlice";
import { useEffect } from "react";

const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUriBackend}${cleanPath}`;
};

export default function CartDrawer() {
  const dispatch = useDispatch();
  const { open, cartsList } = useSelector((state) => state.cartDrawer);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [open]);

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleRemove = (productId, variationName) => {
    dispatch(removeFromCartsList({ productId, variationName }));
  };

  const handleUpdateQuantity = (productId, variationName, quantity) => {
    dispatch(updateQuantity({ productId, variationName, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCartsList());
  };

  // Calculate totals with discount
  const totalQuantity = cartsList.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal (without discount)
  const subtotal = cartsList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Total discount amount
  const totalDiscount = cartsList.reduce((sum, item) => {
    if (item.discountedPrice && item.discountedPrice < item.price) {
      return sum + (item.price - item.discountedPrice) * item.quantity;
    }
    return sum;
  }, 0);

  // Net total (after discount)
  const netTotal = cartsList.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity,
    0,
  );

  return (
    <>
      {/* Backdrop with fade transition */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Drawer with slide transition */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-[#111] border-l border-zinc-800 z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div>
            <h2 className="text-white text-xl font-bold">Your Cart</h2>
            <p className="text-gray-400 text-sm">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {cartsList.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-400 hover:text-red-300 text-sm transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={handleClose}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="text-white" size={24} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-white text-xl font-semibold mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-400 text-sm">
                Start adding some delicious items!
              </p>
              <button
                onClick={handleClose}
                className="mt-4 bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartsList.map((item, index) => {
              const hasDiscount =
                item.discountedPrice && item.discountedPrice < item.price;
              const displayPrice = hasDiscount
                ? item.discountedPrice
                : item.price;

              return (
                <div
                  key={index}
                  className="flex gap-3 bg-zinc-900/50 rounded-lg p-3 border border-zinc-800"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-white text-sm font-medium truncate">
                          {item.name}
                        </h4>
                        {item.variationName && (
                          <span className="text-xs text-gray-400">
                            {item.variationName}
                          </span>
                        )}
                        {hasDiscount && (
                          <span className="text-xs text-green-400 ml-1">
                            -
                            {Math.round(
                              (1 - item.discountedPrice / item.price) * 100,
                            )}
                            %
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() =>
                          handleRemove(item.productId, item.variationName)
                        }
                        className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-zinc-800 rounded-lg">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.variationName,
                              item.quantity - 1,
                            )
                          }
                          className="p-1.5 hover:bg-zinc-700 rounded-l-lg transition-colors text-gray-400 hover:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white text-sm w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.variationName,
                              item.quantity + 1,
                            )
                          }
                          className="p-1.5 hover:bg-zinc-700 rounded-r-lg transition-colors text-gray-400 hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-amber-400 font-semibold text-sm">
                          ${(displayPrice * item.quantity).toFixed(2)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-gray-500 line-through ml-2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartsList.length > 0 && (
          <div className="border-t border-zinc-800 p-4 space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white font-semibold">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Discount */}
            {totalDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Discount</span>
                <span className="text-green-400 font-semibold">
                  -${totalDiscount.toFixed(2)}
                </span>
              </div>
            )}

            {/* Delivery Fee */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Delivery Fee</span>
              <span className="text-white font-semibold">$0.00</span>
            </div>

            {/* Net Total */}
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-zinc-800">
              <span className="text-white">Net Total</span>
              <span className="text-amber-400">${netTotal.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              onClick={handleClose}
              className="block w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-lg text-center transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
