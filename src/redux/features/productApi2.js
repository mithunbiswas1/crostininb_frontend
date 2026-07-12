// src/redux/features/productApi.js
import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const product2Api = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Product
    createProductApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.Product.createProduct,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Update Product by ID
    updateProductByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.Product.updateProductById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Get All Products
    getAllProductsApi: builder.query({
      query: () => ({
        url: endpoints.Product.getAllProducts,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Get List of Products (with pagination & search)
    // getListProductsApi: builder.query({
    //   query: (params = {}) => {
    //     const {
    //       page = 1,
    //       limit = 10,
    //       search = "",
    //       category = "",
    //       subcategory = "",
    //       childsubcategory = "",
    //       grandsubcategory = "",
    //       greatsubcategory = "",
    //       brand = "",
    //       discount = "",
    //       minPrice = "",
    //       maxPrice = "",
    //       is_active = true,
    //       topSelling = "",
    //     } = params;
    //     return {
    //       url: `${endpoints.Product.getListProduct}?page=${page}&limit=${limit}&search=${search}&category=${category}&subcategory=${subcategory}&childSubcategory=${childsubcategory}&grandSubcategory=${grandsubcategory}&grandGreatSubcategory=${greatsubcategory}&brand=${brand}&discount=${discount}&minPrice=${minPrice}&maxPrice=${maxPrice}&is_active=${is_active}&topSelling=${topSelling}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["Product", "Category"],
    // }),

    getListProductsApi: builder.query({
      query: (params = {}) => {
        const {
          page = 1,
          limit = 10,
          search,
          category,
          subcategory,
          childsubcategory,
          grandsubcategory,
          greatsubcategory,
          brand,
          discount,
          minPrice,
          maxPrice,
          is_active = true,
          topSelling,
          in_stock,
          sort,
        } = params;

        // Create query params dynamically
        const queryParams = new URLSearchParams();

        queryParams.append("page", page);
        queryParams.append("limit", limit);
        queryParams.append("is_active", is_active);

        if (in_stock) queryParams.append("in_stock", in_stock);
        if (search) queryParams.append("search", search);
        if (category) queryParams.append("category", category);
        if (subcategory) queryParams.append("subcategory", subcategory);
        if (childsubcategory)
          queryParams.append("childSubcategory", childsubcategory);
        if (grandsubcategory)
          queryParams.append("grandSubcategory", grandsubcategory);
        if (greatsubcategory)
          queryParams.append("grandGreatSubcategory", greatsubcategory);
        if (brand) queryParams.append("brand", brand);
        if (discount) queryParams.append("discount", discount);
        if (minPrice) queryParams.append("minPrice", minPrice);
        if (maxPrice) queryParams.append("maxPrice", maxPrice);
        if (topSelling) queryParams.append("topSelling", topSelling);
        if (sort) queryParams.append("sort", sort);

        return {
          url: `${endpoints.Product.getListProduct}?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Product", "Category"],
    }),

    // Get Product by ID
    getProductByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.Product.getProductById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Get Product by Slug
    getProductBySlugApi: builder.query({
      query: (slug) => ({
        url: `${endpoints.Product.getProductBySlug}/${slug}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Delete Product by ID
    deleteProductByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.Product.deleteProductById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Get Products by Category
    getProductsByCategoryApi: builder.query({
      query: (categoryId) => ({
        url: `${endpoints.Product.getProductsByCategory}/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Toggle Product Status
    toggleProductStatusApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.Product.toggleProductStatus}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Product"],
    }),

    // Params Passing Data collections
    getProductsByTypeSelection: builder.query({
      query: ({
        page = 1,
        limit = 10,
        flashSale,
        trending,
        topSelling,
        newArrival,
        featuredProducts,
        is_active = true,
      } = {}) => ({
        url: `${endpoints.Product.getListProduct}?`,
        method: "GET",
        params: {
          page,
          limit,
          flashSale,
          trending,
          topSelling,
          newArrival,
          featuredProducts,
          is_active,
        },
      }),
      providesTags: ["Product"],
    }),

    // Get Trending Products
    getTrendingProductsApi: builder.query({
      query: ({
        page = 1,
        limit = 10,
        trending = "yes",
        is_active = true,
      } = {}) => ({
        url: `${endpoints.Product.getListProduct}?page=${page}&limit=${limit}&trending=${trending}&is_active=${is_active}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Get Best Selling Products
    getBestSellingProductsApi: builder.query({
      query: ({
        page = 1,
        limit = 10,
        topSelling = "yes",
        is_active = true,
      } = {}) => ({
        url: `${endpoints.Product.getListProduct}?page=${page}&limit=${limit}&topSelling=${topSelling}&is_active=${is_active}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    //  Get Popular Products
    getPopularProductsApi: builder.query({
      query: ({
        page = 1,
        limit = 10,
        flashSale = "yes",
        is_active = true,
      } = {}) => ({
        url: `${endpoints.Product.getListProduct}?page=${page}&limit=${limit}&flashSale=${flashSale}&is_active=${is_active}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // GET Trending Products
    getNewArrivalsProductsApi: builder.query({
      query: ({
        page = 1,
        limit = 10,
        newArrival = "yes",
        is_active = true,
      } = {}) => ({
        url: `${endpoints.Product.getListProduct}?page=${page}&limit=${limit}&newArrival=${newArrival}&is_active=${is_active}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // GET SHOP BY STYLES Products
    getShopByStylesProductsApi: builder.query({
      query: ({
        page = 1,
        limit = 10,
        newArrival = "yes",
        is_active = true,
      } = {}) => ({
        url: `${endpoints.Product.getListProduct}?page=${page}&limit=${limit}&newArrival=${newArrival}&is_active=${is_active}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductApiMutation,
  useUpdateProductByIdApiMutation,
  useGetAllProductsApiQuery,
  useGetListProductsApiQuery,
  useGetProductByIdApiQuery,
  useDeleteProductByIdApiMutation,
  useGetProductBySlugApiQuery,
  useGetProductsByCategoryApiQuery,
  useToggleProductStatusApiMutation,
  useGetTrendingProductsApiQuery,
  useGetBestSellingProductsApiQuery,
  useGetPopularProductsApiQuery,
  useGetShopByStylesProductsApiQuery,
  useGetNewArrivalsProductsApiQuery,
  useGetProductsByTypeSelectionQuery,
} = product2Api;
