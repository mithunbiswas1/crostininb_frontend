// src/redux/features/couponApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const couponApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    validateCoupon: builder.mutation({
      query: (data) => ({
        url: endpoints.coupon.validateCoupon,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useValidateCouponMutation } = couponApi;
