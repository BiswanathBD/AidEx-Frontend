import React, { useContext } from "react";
import Logo from "./Logo";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Auth/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser, loading, userSignOut } = useContext(AuthContext);

  const handleSignOut = () => {
    const signOutPromise = userSignOut();

    toast.promise(signOutPromise, {
      loading: "Signing out...",
      success: () => {
        setUser(null);
        return "Signed out successfully!";
      },
      error: "Failed to sign out.",
    });
  };

  if (loading) return;

  return (
    <Container>
      <div className="navbar my-4 flex justify-between items-center py-3 px-4 rounded-lg bg-white">
        <Logo />
        <div className="flex gap-12 xl:gap-24 items-center">
          <nav className="hidden lg:flex gap-2">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/requests"}>Donation Requests</NavLink>
            <NavLink to={"/search"}>Search Donors</NavLink>
          </nav>

          {user ? (
            <button onClick={handleSignOut} className="btn-primary">
              Sign Out
            </button>
          ) : (
            <div className="flex gap-2 items-center">
              <Link to={"/login"}>
                <button className="btn-primary">Login</button>
              </Link>
              <Link to={"/register"}>
                <button className="btn-secondary">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
