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

  return (
    <div className="navbar bg-white">
      <Container>
        <div className=" flex justify-between items-center py-3 px-4">
          <div className="m-2">
            <Logo />
          </div>

          {!loading && (
            <motion.div
              className="flex gap-8 xl:gap-16 items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.nav
                className="hidden lg:flex gap-2 text-sm"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
              >
                {[
                  "Home",
                  "Donation Requests",
                  "Search Donors",
                  user ? "Funding" : null,
                ].map(
                  (item, i) =>
                    item && (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <NavLink
                          to={
                            item === "Home"
                              ? "/"
                              : item === "Donation Requests"
                              ? "/requests"
                              : item === "Search Donors"
                              ? "/search"
                              : "/funding"
                          }
                        >
                          {item}
                        </NavLink>
                      </motion.div>
                    )
                )}
              </motion.nav>
              {user ? (
                <motion.div
                  onClick={() => setShow(!show)}
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                >
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

                  <div
                    className={`absolute flex flex-col text-nowrap bg-[#f87898] p-6 lg:p-2 transition-all rounded-xl
            ${
              show
                ? "top-8 right-8"
                : "top-6 right-6 opacity-0 pointer-events-none"
            }`}
                  >
                    <div className="flex flex-col gap-4 text-white pb-8 mb-8 border-b border-white/20 lg:hidden">
                      <Link to={"/"}>Home</Link>
                      <Link to={"/requests"}>Requests</Link>
                      <Link to={"/search"}>Search Donors</Link>
                      <Link to={"/dashboard"}>Dashboard</Link>
                      <Link to={"/funding"}>Funding</Link>
                    </div>

                    <Link
                      className="hidden lg:block text-white border-b border-white/20 px-2 pb-2 font-semibold mb-4"
                      to={"/dashboard"}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="bg-white text-[#f87898] rounded-sm px-2 py-1 font-semibold"
                    >
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="flex gap-2 items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                >
                  <Link to={"/login"}>
                    <button className="btn-primary">Login</button>
                  </Link>
                  <Link to={"/register"}>
                    <button className="btn-secondary">Register</button>
                  </Link>

                  <div
                    onClick={() => setShow(!show)}
                    className="relative lg:hidden"
                  >
                    <FaBars color="#f87898" />
                    <div
                      className={`absolute flex flex-col text-nowrap bg-[#f87898] p-6 lg:p-2 transition-all rounded-xl
              ${
                show
                  ? "top-8 right-8"
                  : "top-6 right-6 opacity-0 pointer-events-none"
              }`}
                    >
                      <div className="flex flex-col gap-4 text-white">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/requests"}>Requests</Link>
                        <Link to={"/search"}>Search Donors</Link>
                        <Link to={"/funding"}>Funding</Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
