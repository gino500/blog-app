import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: sessionStorage.getItem("comments")
    ? JSON.parse(sessionStorage.getItem("comments"))
    : null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
      sessionStorage.setItem("comments", JSON.stringify(action.payload));
    },
    clearComments: (state, action) => {
      state.comments = null;
      sessionStorage.removeItem("comments");
    },
  },
});

export const { setComments, clearComments } = commentSlice.actions;

export default commentSlice.reducer;
