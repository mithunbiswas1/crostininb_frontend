// src/redux/features/productReviewApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const productReviewApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Create Product Review
    createReview: builder.mutation({
      query: (formData) => ({
        url: endpoints.productReview.productReview,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ProductReviews"],
    }),

    // Product Review GET Query (List)
    getProductReviews: builder.query({
      query: ({ q, limit = 10, order = "desc" } = {}) => ({
        url: endpoints.productReview.productReview,
        params: { q, limit, order },
      }),
      providesTags: ["ProductReviews"],
    }),
  }),
});

export const { useGetProductReviewsQuery, useCreateReviewMutation } =
  productReviewApi;
