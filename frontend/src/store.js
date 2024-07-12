import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import blogsReducer from "./slices/blogsSlice";
import userReducer from "./slices/userSlice";
import commentsReducer from "./slices/commentSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogsReducer,
    users: userReducer,
    comments: commentsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
