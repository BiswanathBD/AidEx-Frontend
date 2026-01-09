import React, { useContext } from "react";
import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer";
import Container from "../Components/Shared/Container";
import { AuthContext } from "../Auth/AuthContext";
import Loader from "../Components/Shared/Loader";

const Root = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>

      <div className="grow mt-24">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        ) : (
          <Container>
            <Outlet />
          </Container>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Root;
