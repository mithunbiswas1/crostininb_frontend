// src/redux/features/profileApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const profileApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Get Profile
    getProfile: builder.query({
      query: () => ({
        url: endpoints.profile.getProfile,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    // Update Profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: endpoints.profile.updateProfile,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    // Update Password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: endpoints.profile.updatePassword,
        method: "PATCH",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: endpoints.profile.logout,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useLogoutMutation,
} = profileApi;
