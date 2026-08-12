// src/redux/features/Slice/CartDrawerSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cartsList");
    if (stored) {
      try {
        return JSON.parse(stored);
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

    // Add single item to cart with discount support
    singleAddToCartsList: (state, action) => {
      const {
        productId,
        variationName,
        name,
        image,
        price,
        variationPrice,
        variationOfferPrice,
      } = action.payload;

      // Determine discounted price
      const discountedPrice = variationOfferPrice || null;
      const actualPrice = variationPrice || price;

      const existingItem = state.cartsList.find(
        (item) =>
          item.productId === productId &&
          item.variationName === (variationName || null),
      );

      if (existingItem) {
        existingItem.quantity += 1;
        // Update price if it changed (in case of variation change)
        existingItem.price = actualPrice;
        existingItem.discountedPrice = discountedPrice;
      } else {
        state.cartsList.push({
          productId,
          name,
          image,
          price: actualPrice,
          discountedPrice: discountedPrice,
          variationName: variationName || null,
          quantity: 1,
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

    // Update quantity
    updateQuantity: (state, action) => {
      const { productId, quantity, variationName } = action.payload;
      const index = state.cartsList.findIndex(
        (item) =>
          item.productId === productId &&
          item.variationName === (variationName || null),
      );

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

    // Remove item from cart
    removeFromCartsList: (state, action) => {
      const { productId, variationName } = action.payload;
      state.cartsList = state.cartsList.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.variationName === (variationName || null)
          ),
      );
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
