// src/components/shared/CartIcon.jsx

"use client";

import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { toggleCart } from "@/redux/features/Slice/CartDrawerSlice";

export default function CartIcon() {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cartDrawer);

  return (
    <button
      onClick={() => dispatch(toggleCart())}
      className="relative p-2 hover:bg-zinc-800 rounded-lg transition-colors"
    >
      <ShoppingCart className="text-white" size={24} />
      {carts > 0 && (
        <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {carts}
        </span>
      )}
    </button>
  );
}
