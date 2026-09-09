// src/redux/features/Slice/CartDrawerSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Helper to check if two cart items have the exact same ingredients/customizations
const areIngredientsEqual = (item1, item2) => {
  if (item1.productId !== item2.productId) return false;
  if ((item1.variationName || null) !== (item2.variationName || null)) return false;
  if ((item1.size || null) !== (item2.size || null)) return false;
  if ((item1.crust || null) !== (item2.crust || null)) return false;
  if ((item1.sauce || null) !== (item2.sauce || null)) return false;
  if ((item1.cheese || null) !== (item2.cheese || null)) return false;

  // Compare Seasonings
  const s1 = Array.isArray(item1.seasonings)
    ? item1.seasonings.slice().sort().join(",")
    : item1.seasonings || "";
  const s2 = Array.isArray(item2.seasonings)
    ? item2.seasonings.slice().sort().join(",")
    : item2.seasonings || "";
  if (s1 !== s2) return false;

  // Compare Addons
  const a1 = Array.isArray(item1.addons || item1["Addons"])
    ? (item1.addons || item1["Addons"]).slice().sort().join(",")
    : item1.addons || item1["Addons"] || "";
  const a2 = Array.isArray(item2.addons || item2["Addons"])
    ? (item2.addons || item2["Addons"]).slice().sort().join(",")
    : item2.addons || item2["Addons"] || "";
  if (a1 !== a2) return false;

  // Compare Instructions
  const cut1 = item1.instructions?.cut || null;
  const cut2 = item2.instructions?.cut || null;
  const bake1 = item1.instructions?.bake || null;
  const bake2 = item2.instructions?.bake || null;
  if (cut1 !== cut2 || bake1 !== bake2) return false;

  // Compare Your Selection
  const sel1 = item1["Your Selection"] || item1.yourSelection || null;
  const sel2 = item2["Your Selection"] || item2.yourSelection || null;
  if (sel1 !== sel2) return false;

  return true;
};

// Load cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cartsList");
    if (stored) {
      try {
        const list = JSON.parse(stored);
        if (Array.isArray(list)) {
          return list.map((item, i) => ({
            ...item,
            cartItemId:
              item.cartItemId ||
              `${item.productId || "item"}-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
          }));
        }
        return [];
      } catch (e) {
        return [];
      }
    }
  }
  return [];
};

// Load buy now item from localStorage
const loadBuyNowFromStorage = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("buyNowItem");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

// Save cart to localStorage
const saveCartToStorage = (cartsList) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartsList", JSON.stringify(cartsList));
  }
};

// Save buy now item to localStorage
const saveBuyNowToStorage = (item) => {
  if (typeof window !== "undefined") {
    if (item) {
      localStorage.setItem("buyNowItem", JSON.stringify(item));
    } else {
      localStorage.removeItem("buyNowItem");
    }
  }
};

const initialState = {
  open: false,
  carts: 0,
  cartsList: loadCartFromStorage(),
  buyNowItem: loadBuyNowFromStorage(),
};

const CartDrawerSlice = createSlice({
  name: "cartDrawer",
  initialState,
  reducers: {
    // Drawer controls
    openCart: (state) => {
      state.open = true;
    },
    closeCart: (state) => {
      state.open = false;
    },
    toggleCart: (state) => {
      state.open = !state.open;
    },

    // Set total carts count
    setCarts: (state, action) => {
      state.carts = action.payload;
    },

    // Add single item to cart with discount and customization support
    singleAddToCartsList: (state, action) => {
      const {
        cartItemId,
        productId,
        variationName,
        name,
        image,
        price,
        variationPrice,
        variationOfferPrice,
        quantity = 1,
        ...rest
      } = action.payload;

      // Determine discounted price
      const discountedPrice = variationOfferPrice || null;
      const actualPrice = variationPrice || price;

      const candidateItem = {
        productId,
        variationName: variationName || null,
        name,
        image,
        price: actualPrice,
        discountedPrice: discountedPrice,
        quantity: quantity,
        ...rest,
      };

      // Check if an item with the EXACT same ingredients/customization already exists
      const existingItem = state.cartsList.find((item) =>
        areIngredientsEqual(item, candidateItem),
      );

      if (existingItem) {
        // Same ingredients: increment quantity
        existingItem.quantity += quantity;
        existingItem.price = actualPrice;
        existingItem.discountedPrice = discountedPrice;
      } else {
        // Different ingredients or new item: add as separate cart item
        const uniqueCartId =
          cartItemId ||
          `${productId}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        state.cartsList.push({
          cartItemId: uniqueCartId,
          ...candidateItem,
        });
      }

      state.carts = state.cartsList.length;
      saveCartToStorage(state.cartsList);
    },

    // Add multiple items to cart
    addToCartsList: (state, action) => {
      state.cartsList = action.payload;
      state.carts = state.cartsList.length;
      saveCartToStorage(state.cartsList);
    },

    // Update quantity (uses unique cartItemId when available)
    updateQuantity: (state, action) => {
      const { cartItemId, productId, quantity, variationName } = action.payload;
      const index = state.cartsList.findIndex((item) => {
        if (cartItemId && item.cartItemId) {
          return item.cartItemId === cartItemId;
        }
        return (
          item.productId === productId &&
          item.variationName === (variationName || null)
        );
      });

      if (index !== -1) {
        if (quantity <= 0) {
          state.cartsList.splice(index, 1);
        } else {
          state.cartsList[index].quantity = quantity;
        }
        state.carts = state.cartsList.length;
        saveCartToStorage(state.cartsList);
      }
    },

    // Remove item from cart (uses unique cartItemId when available)
    removeFromCartsList: (state, action) => {
      const { cartItemId, productId, variationName } = action.payload;
      state.cartsList = state.cartsList.filter((item) => {
        if (cartItemId && item.cartItemId) {
          return item.cartItemId !== cartItemId;
        }
        return !(
          item.productId === productId &&
          item.variationName === (variationName || null)
        );
      });
      state.carts = state.cartsList.length;
      saveCartToStorage(state.cartsList);
    },

    // Clear all cart
    clearCartsList: (state) => {
      state.cartsList = [];
      state.carts = 0;
      saveCartToStorage(state.cartsList);
    },

    // ============ Buy Now Actions ============
    setBuyNowItem: (state, action) => {
      state.buyNowItem = action.payload;
      saveBuyNowToStorage(action.payload);
    },

    clearBuyNowItem: (state) => {
      state.buyNowItem = null;
      saveBuyNowToStorage(null);
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  setCarts,
  singleAddToCartsList,
  addToCartsList,
  updateQuantity,
  removeFromCartsList,
  clearCartsList,
  setBuyNowItem,
  clearBuyNowItem,
} = CartDrawerSlice.actions;

export default CartDrawerSlice.reducer;
