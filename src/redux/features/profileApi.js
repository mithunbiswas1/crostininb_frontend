import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const profileApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET profile
    getProfile: builder.query({
      query: () => ({
        url: endpoints.profile.profile,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    // UPDATE profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: endpoints.profile.profile,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
