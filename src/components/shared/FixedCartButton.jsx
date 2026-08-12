// src/components/shared/FixedCartButton.jsx

"use client";

import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { toggleCart } from "@/redux/features/Slice/CartDrawerSlice";

export default function FixedCartButton() {
  const dispatch = useDispatch();
  const { cartsList } = useSelector((state) => state.cartDrawer);

  // Calculate total items in cart
  const totalItems = cartsList.reduce((sum, item) => sum + item.quantity, 0);

  // Don't show button if cart is empty
  if (totalItems === 0) return null;

  return (
    <button
      onClick={() => dispatch(toggleCart())}
      className="fixed bottom-8 right-8 z-50 bg-amber-500 hover:bg-amber-600 text-black rounded-full p-4 shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-110 group"
      aria-label="Open cart"
    >
      <div className="relative">
        <ShoppingCart
          size={28}
          className="group-hover:rotate-6 transition-transform"
        />

        {/* Badge */}
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-amber-500">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      </div>
    </button>
  );
}
