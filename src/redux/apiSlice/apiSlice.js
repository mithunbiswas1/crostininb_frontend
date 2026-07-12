import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/redux/url/url";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

// CUSTOM BASE QUERY WITH AUTH HANDLING
const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // HANDLE UNAUTHENTICATED ERROR
  if (result?.error) {
    const status = result.error.status;
    const data = result.error.data;

    if (status === 401 || data?.error === "Unauthenticated.") {
      // remove token
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }

      // redirect
      window.location.href = "/sign-in";
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth, // use custom baseQuery
  tagTypes: [
    "Product",
    "Setting",
    "Slider",
    "Category",
    "Auth",
    "Profile",
    "Orders",
    "ProductReviews",
    "Tracking",
  ],
  endpoints: () => ({}),
});
