import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Get Products
    getProducts: builder.query({
      query: ({ q = "", limit = 10, order = "desc" } = {}) => ({
        url: endpoints.product.product,
        params: {
          q,
          limit,
          order,
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApi;