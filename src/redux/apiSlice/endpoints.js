// src/redux/apiSlice/endpoints.js

export const endpoints = {
  //Auth API
  auth: {
    registration: "register",
    login: "login",
    sendOtp: "new-otp",
    otpVerifyLogin: "otp-verify",
  },

  // Order endpoints
  order: {
    createOrder: "create-order",
  },

  //Product API
  product: {
    product: "product",
    search: "search",
  },

  //Product Review
  productReview: {
    productReview: "product-review",
  },

  //Profile API
  profile: {
    profile: "profile",
  },

  //Pages API
  pages: {
    contact: "contact",
  },

  //Setting API
  setting: {
    getSetting: "setting",
  },
  //Tracking API
  tracking: {
    getTracking: "track",
  },
};
