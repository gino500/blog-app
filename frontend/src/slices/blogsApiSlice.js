import { apiSlice } from "./apiSlice";
const BLOGS_URL = "/api/blogs";

export const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    allBlogs: builder.mutation({
      query: () => ({
        url: `${BLOGS_URL}/`,
        method: "GET",
      }),
    }),
    getComment: builder.mutation({
      query: id => ({
        url: `${BLOGS_URL}/${id}/comments`,
        method: "GET",
      }),
    }),
    createBlog: builder.mutation({
      query: body => ({
        url: `${BLOGS_URL}/create`,
        method: "POST",
        body: body,
      }),
    }),
    updateBlog: builder.mutation({
      query: data => {
        const { id, ...body } = data;
        return {
          url: `${BLOGS_URL}/update/${id}`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    deleteBlog: builder.mutation({
      query: id => ({
        url: `${BLOGS_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAllBlogsMutation,
  useGetCommentMutation,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApiSlice;
