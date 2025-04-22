import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://blog-app-production-40c0.up.railway.app",
  mode: "cors",
  credentials: "omit",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Blog", "Comment"],
  endpoints: builder => ({}),
});
