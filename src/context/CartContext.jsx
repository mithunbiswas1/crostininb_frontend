// src/context/CartContext.jsx

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCart, getCartCount, getCartSubtotal } from "@/lib/cart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);

  const updateCartData = () => {
    setCartItems(getCart());
    setCartCount(getCartCount());
    setCartSubtotal(getCartSubtotal());
  };

  useEffect(() => {
    updateCartData();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCartData);

    return () => {
      window.removeEventListener("cartUpdated", updateCartData);
    };
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, cartSubtotal, updateCartData }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
