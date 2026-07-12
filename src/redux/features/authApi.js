// src/redux/features/authApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Registration API
    registration: builder.mutation({
      query: (data) => ({
        url: endpoints.auth.registration,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),

    // Login API
    login: builder.mutation({
      query: (data) => ({
        url: endpoints.auth.login,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),

    // Send OTP
    sendOtp: builder.mutation({
      query: (data) => ({
        url: endpoints.auth.sendOtp,
        method: "POST",
        body: data, 
      }),
    }),

    // Verify OTP
    otpVerifyLogin: builder.mutation({
      query: (data) => ({
        url: endpoints.auth.otpVerifyLogin,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useSendOtpMutation,
  useOtpVerifyLoginMutation,
} = authApi;