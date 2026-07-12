// src/redux/features/settingApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const trackingApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Get Tracking
    getTrackingApi: builder.query({
      query: (id) => ({
        url: `${endpoints.tracking.getTracking}/${id}`,
        method: "GET",
      }),
      providesTags: ["Tracking"],
    }),
  }),


});

export const { useGetTrackingApiQuery } = trackingApi;