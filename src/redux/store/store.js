// src/redux/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/redux/apiSlice/apiSlice";
import CartDrawerSlice from "@/redux/features/Slice/CartDrawerSlice";
import authReducer from "@/redux/features/Slice/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cartDrawer: CartDrawerSlice,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(apiSlice.middleware),
});
