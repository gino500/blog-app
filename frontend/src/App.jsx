import React from "react";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Footing from "./components/Footer";

const App = () => {
  return (
    <div className="h-screen w-screen bg-[#181818] overflow-scroll">
      <Header />
      <ToastContainer />
      <Outlet />
      <Footing />
    </div>
  );
};

export default App;
