// src/redux/features/pagesApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const pagesApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Contact Form POST Mutation
    sendContactMessage: builder.mutation({
      query: (data) => ({
        url: endpoints.pages.contact,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendContactMessageMutation } = pagesApi;
