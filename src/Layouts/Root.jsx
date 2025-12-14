import React from "react";
import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer";
import Container from "../Components/Shared/Container";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed w-full z-100">
        <Navbar />
      </div>
      <div className="grow mt-24">
        <Container>
          <Outlet />
        </Container>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Root;
