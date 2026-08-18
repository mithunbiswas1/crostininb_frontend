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

    getOrdersByUser: builder.query({
      query: () => ({
        url: endpoints.order.getOrdersByUser,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `${endpoints.order.cancelOrder}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),

    getOrderById: builder.query({
      query: (id) => ({
        url: `${endpoints.order.getOrderById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersByUserQuery,
  useCancelOrderMutation,
  useGetOrderByIdQuery,
} = orderApi;
