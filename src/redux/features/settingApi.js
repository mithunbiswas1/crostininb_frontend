// src/redux/features/settingApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const settingApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Get Settings
    getSettingApi: builder.query({
      query: () => ({
        url: endpoints.setting.getSetting,
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),
  }),
});

export const { useGetSettingApiQuery } = settingApi;
