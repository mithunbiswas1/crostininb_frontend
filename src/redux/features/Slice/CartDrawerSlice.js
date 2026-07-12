import { createSlice } from "@reduxjs/toolkit";

const CartDrawerSlice = createSlice({
  name: "cartDrawer",
  initialState: {
    open: false,
    carts: 0,
    cartsList: [],
  },
  reducers: {
    openCart: (state) => {
      state.open = true;
    },
    closeCart: (state) => {
      state.open = false;
    },
    toggleCart: (state) => {
      state.open = !state.open;
    },
    setCarts: (state, action) => {
      state.carts = action.payload;
    },

    // Add to carts list
    singleAddToCartsList: (state, action) => {
      state.cartsList.push(action.payload);
    },
    addToCartsList: (state, action) => {
      state.cartsList = action.payload;
    },
    // quantity update
    updateQuantity: (state, action) => {
      const index = state.cartsList.findIndex(
        (item) => item.productId === action.payload.productId
      );
      state.cartsList[index].quantity = action.payload.quantity;
    },
    removeFromCartsList: (state, action) => {
      state.cartsList = state.cartsList.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearCartsList: (state) => {
      state.cartsList = [];
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  setCarts,

  // carts related
  singleAddToCartsList,
  addToCartsList,
  updateQuantity,
  removeFromCartsList,
  clearCartsList,
} = CartDrawerSlice.actions;
export default CartDrawerSlice.reducer;
