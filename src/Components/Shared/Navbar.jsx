import React, { useContext, useState } from "react";
import Logo from "./Logo";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Auth/AuthContext";
import toast from "react-hot-toast";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
motion;

const Navbar = () => {
  const { user, setUser, loading, userSignOut } = useContext(AuthContext);
  const [show, setShow] = useState(false);

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
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="navbar my-4 flex justify-between items-center py-3 px-4 rounded-lg bg-white"
      >
        <Logo />
        <div className="flex gap-8 xl:gap-16 items-center">
          <nav className="hidden lg:flex gap-2 text-sm">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/requests"}>Requests</NavLink>
            <NavLink to={"/search"}>Search Donors</NavLink>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </nav>

          {user ? (
            <div onClick={() => setShow(!show)} className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 aspect-square object-cover rounded-full p-0.5 border-2 border-[#f87898]"
              />
              <FaBars
                size={14}
                color="white"
                className="bg-[#f87898] p-[3px] rounded-full absolute bottom-0 left-0"
              />

              {/* mobile Nav */}
              <div
                className={`absolute flex flex-col text-nowrap bg-[#f87898] p-6 lg:p-2 transition-all rounded-xl
                  ${
                    show
                      ? "top-8 right-8"
                      : "top-6 right-6 opacity-0 pointer-events-none"
                  }
                  `}
              >
                <div className="flex flex-col gap-4 text-white pb-8 mb-8 border-b border-white/20 lg:hidden">
                  <Link to={"/"}>Home</Link>
                  <Link to={"/requests"}>Requests</Link>
                  <Link to={"/search"}>Search Donors</Link>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </div>

                <button
                  onClick={handleSignOut}
                  className="bg-white text-[#f87898] rounded-sm px-2 py-1 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            </div>
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
      </motion.div>
    </Container>
  );
};

export default Navbar;
