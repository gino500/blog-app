import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Home from "./components/Home.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import Blog from "./components/Blog.jsx";
import MyBlog from "./components/MyBlog.jsx";
import CreateBlog from "./components/CreateBlog.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Perform Home Logic, pass data to HomeScreen */}
      <Route index={true} path="/" element={<Home />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>
      {/* Perform Blog Logic, pass data to BlogScreen */}
      <Route path="/blog" element={<Blog />}></Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/my-blogs" element={<MyBlog />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
