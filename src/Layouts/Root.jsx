import React from "react";
import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="grow">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Root;
