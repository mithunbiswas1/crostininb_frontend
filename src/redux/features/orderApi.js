// src/redux/features/orderApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const orderApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Order GET Query (List)
    getOrders: builder.query({
      query: ({ q, limit = 10, order = "desc" } = {}) => ({
        url: endpoints.order.order,
        params: { q, limit, order },
      }),
      providesTags: ["Orders"],
    }),

    // Order GET Query by ID
    getOrderById: builder.query({
      query: (id) => ({
        url: `${endpoints.order.order}/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),

    // Order POST Mutation
    orderPost: builder.mutation({
      query: (data) => ({
        url: endpoints.order.order,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),

    // Coupon Check Mutation
    checkCoupon: builder.mutation({
      query: (data) => ({
        url: endpoints.order.coupon,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useOrderPostMutation,
  useCheckCouponMutation,
} = orderApi;
