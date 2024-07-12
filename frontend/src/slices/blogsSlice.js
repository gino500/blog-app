import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogData: sessionStorage.getItem("blogData")
    ? JSON.parse(sessionStorage.getItem("blogData"))
    : null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogData = action.payload;
      sessionStorage.setItem("blogData", JSON.stringify(action.payload));
    },
    clearBlogs: (state, action) => {
      state.blogData = null;
      sessionStorage.removeItem("blogData");
    },
  },
});

export const { setBlogs, clearBlogs } = blogSlice.actions;

export default blogSlice.reducer;
