import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://blog-app-production-0294.up.railway.app",
  credentials: "include",
  mode: "cors",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Blog", "Comment"],
  endpoints: builder => ({}),
});
