// src/redux/features/orderApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const orderApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Create Order
    createOrder: builder.mutation({
      query: (data) => ({
        url: endpoints.order.createOrder,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
