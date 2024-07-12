import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogUser: sessionStorage.getItem("blogUser")
    ? JSON.parse(sessionStorage.getItem("blogUser"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.blogUser = action.payload;
      sessionStorage.setItem("blogUser", JSON.stringify(action.payload));
    },
    clearUser: (state, action) => {
      state.blogUser = null;
      sessionStorage.removeItem("blogUser");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
