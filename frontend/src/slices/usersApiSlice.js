import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    getUsers: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/details`,
        method: "GET",
      }),
    }),
    getUser: builder.mutation({
      query: id => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUsersMutation,
  useGetUserMutation,
} = userApiSlice;
