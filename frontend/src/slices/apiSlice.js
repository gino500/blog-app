import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "include",
  mode: "cors",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Blog", "Comment"],
  endpoints: builder => ({}),
});
