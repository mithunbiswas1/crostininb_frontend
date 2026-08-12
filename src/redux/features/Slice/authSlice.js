// src/redux/features/Slice/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Load auth state from localStorage
const loadAuthFromStorage = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        return {
          isLoggedIn: true,
          user: user,
          token: token,
        };
      } catch (e) {
        return {
          isLoggedIn: false,
          user: null,
          token: null,
        };
      }
    }
  }
  return {
    isLoggedIn: false,
    user: null,
    token: null,
  };
};

const initialState = loadAuthFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { user, token } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
      state.token = token;

      // Save to localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;

      // Remove from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      if (state.user) {
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { setLogin, setLogout, updateUser } = authSlice.actions;
export default authSlice.reducer;
