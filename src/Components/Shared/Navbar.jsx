import React from "react";
import Logo from "./Logo";
import Container from "./Container";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <Container>
    <div className="my-4 flex justify-between items-center py-3 px-4 rounded-lg bg-white">
      <Logo />
      <div className="flex gap-12 lg:gap-24 items-center">
        <nav className="flex gap-2">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/requests"}>Donation Requests</NavLink>
          <NavLink to={"/search"}>Search Donors</NavLink>
        </nav>
        <div className="flex gap-2 items-center">
          <Link to={"/login"}>
            <button className="btn-primary">Login</button>
          </Link>
          <Link to={"/register"}>
            <button className="btn-secondary">Register</button>
          </Link>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default Navbar;
