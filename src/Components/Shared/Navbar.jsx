import React, { useContext, useState } from "react";
import Logo from "./Logo";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Auth/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import toast from "react-hot-toast";
import {
  FaBars,
  FaHome,
  FaSearch,
  FaDonate,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
motion;

const Navbar = () => {
  const { user, setUser, loading, userSignOut } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [show, setShow] = useState(false);

  const getNavLinkClasses = (isActive) => {
    const baseClasses =
      "flex items-center gap-2 px-3 py-3 transition-all duration-300 font-medium group";
    if (isActive) {
      return `${baseClasses} text-[#f87898]`;
    }
    return `${baseClasses} ${
      isDark
        ? "text-gray-300 hover:text-white"
        : "text-gray-600 hover:text-black"
    }`;
  };

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
    <div className="navbar bg-white dark:bg-linear-to-r dark:from-[#110909] dark:to-[#1f1017] transition-colors duration-300">
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
                className="hidden lg:flex items-center gap-1 text-sm"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <NavLink
                    to="/"
                    className={({ isActive }) => getNavLinkClasses(isActive)}
                  >
                    <FaHome
                      size={16}
                      className="transition-all duration-300 group-hover:scale-110 group-hover:text-[#f87898]"
                    />
                    <span>Home</span>
                  </NavLink>
                </motion.div>

                <div className="w-px h-6 bg-[#f87898]/20"></div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <NavLink
                    to="/requests"
                    className={({ isActive }) => getNavLinkClasses(isActive)}
                  >
                    <MdBloodtype
                      size={16}
                      className="transition-all duration-300 group-hover:scale-110 group-hover:text-[#f87898]"
                    />
                    <span>Requests</span>
                  </NavLink>
                </motion.div>

                <div className="w-px h-6 bg-[#f87898]/20"></div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <NavLink
                    to="/search"
                    className={({ isActive }) => getNavLinkClasses(isActive)}
                  >
                    <FaSearch
                      size={16}
                      className="transition-all duration-300 group-hover:scale-110 group-hover:text-[#f87898]"
                    />
                    <span>Find Donor</span>
                  </NavLink>
                </motion.div>

                {user && (
                  <>
                    <div className="w-px h-6 bg-[#f87898]/20"></div>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <NavLink
                        to="/funding"
                        className={({ isActive }) =>
                          getNavLinkClasses(isActive)
                        }
                      >
                        <FaMoneyBillWave
                          size={16}
                          className="transition-all duration-300 group-hover:scale-110 group-hover:text-[#f87898]"
                        />
                        <span>Funding</span>
                      </NavLink>
                    </motion.div>
                  </>
                )}
              </motion.nav>
              {user ? (
                <motion.div className="flex items-center gap-4">
                  <ThemeToggle />
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
                      className={`absolute flex flex-col text-nowrap p-6 lg:p-2 transition-all rounded-xl ${
                        isDark
                          ? "bg-linear-to-br from-[#2e1919] to-[#3c222e]"
                          : "bg-[#f87898]"
                      } ${
                        show
                          ? "top-8 right-8"
                          : "top-6 right-6 opacity-0 pointer-events-none"
                      }`}
                    >
                      <div
                        className={`flex flex-col gap-4 pb-8 mb-8 border-b lg:hidden ${
                          isDark
                            ? "text-gray-300 border-gray-600"
                            : "text-white border-white/20"
                        }`}
                      >
                        <Link
                          to={"/"}
                          className="flex items-center gap-3 hover:text-gray-200 transition-colors"
                        >
                          <FaHome size={16} />
                          <span>Home</span>
                        </Link>
                        <Link
                          to={"/requests"}
                          className="flex items-center gap-3 hover:text-gray-200 transition-colors"
                        >
                          <MdBloodtype size={16} />
                          <span>Requests</span>
                        </Link>
                        <Link
                          to={"/search"}
                          className="flex items-center gap-3 hover:text-gray-200 transition-colors"
                        >
                          <FaSearch size={16} />
                          <span>Find Donor</span>
                        </Link>
                        <Link
                          to={"/dashboard"}
                          className="flex items-center gap-3 hover:text-gray-200 transition-colors"
                        >
                          <FaDonate size={16} />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to={"/funding"}
                          className="flex items-center gap-3 hover:text-gray-200 transition-colors"
                        >
                          <FaMoneyBillWave size={16} />
                          <span>Funding</span>
                        </Link>
                      </div>

                      <Link
                        className={`hidden lg:block border-b px-2 pb-2 font-semibold mb-4 ${
                          isDark
                            ? "text-gray-300 border-gray-600"
                            : "text-white border-white/20"
                        }`}
                        to={"/dashboard"}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className={`rounded-sm px-2 py-1 font-semibold ${
                          isDark
                            ? "bg-gray-200 text-gray-800 hover:bg-white"
                            : "bg-white text-[#f87898]"
                        }`}
                      >
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className="flex gap-2 items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                >
                  <ThemeToggle />
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
                    <FaBars color={isDark ? "#f87898" : "#f87898"} />
                    <div
                      className={`absolute flex flex-col text-nowrap p-6 lg:p-2 transition-all rounded-xl ${
                        isDark
                          ? "bg-linear-to-br from-[#110909] to-[#1f1017]"
                          : "bg-[#f87898]"
                      } ${
                        show
                          ? "top-8 right-8"
                          : "top-6 right-6 opacity-0 pointer-events-none"
                      }`}
                    >
                      <div
                        className={`flex flex-col gap-4 ${
                          isDark ? "text-gray-300" : "text-white"
                        }`}
                      >
                        <Link
                          to={"/"}
                          className="flex items-center gap-3 hover:text-gray-200 transition-colors"
                        >
                          <FaHome size={16} />
                          <span>Home</span>
                        </Link>
                        <Link
                          to={"/requests"}
                          className="flex items-center gap-3 hover:text-gray-200 transition-colors"
                        >
                          <MdBloodtype size={16} />
                          <span>Requests</span>
                        </Link>
                        <Link
                          to={"/search"}
                          className="flex items-center gap-3 hover:text-gray-200 transition-colors"
                        >
                          <FaSearch size={16} />
                          <span>Find Donor</span>
                        </Link>
                        <Link
                          to={"/funding"}
                          className="flex items-center gap-3 hover:text-gray-200 transition-colors"
                        >
                          <FaMoneyBillWave size={16} />
                          <span>Funding</span>
                        </Link>
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
