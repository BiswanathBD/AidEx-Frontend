import { useContext, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Auth/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import toast from "react-hot-toast";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaSearch,
  FaDonate,
  FaMoneyBillWave,
  FaInfoCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, setUser, loading, userSignOut } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [show, setShow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Refs for click outside detection
  const userDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Handle click outside to close popups
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShow(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setShow(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const getNavLinkClasses = (isActive) => {
    const baseClasses =
      "flex items-center gap-2 px-2 sm:px-3 py-2 sm:py-3 transition-all duration-300 font-medium group text-sm sm:text-base";
    if (isActive) {
      return `${baseClasses} text-[#f87898]`;
    }
    return `${baseClasses} ${
      isDark
        ? "text-gray-300 hover:text-white"
        : "text-gray-600 hover:text-black"
    }`;
  };

  const getMobileNavLinkClasses = (isActive) => {
    const baseClasses =
      "flex items-center gap-3 px-4 py-3 transition-all duration-300 font-medium border-b border-white/10";
    if (isActive) {
      return `${baseClasses} text-white bg-white/10`;
    }
    return `${baseClasses} text-white hover:bg-white/10`;
  };

  const handleSignOut = () => {
    const signOutPromise = userSignOut();
    setMobileMenuOpen(false);
    setShow(false);

    toast.promise(signOutPromise, {
      loading: "Signing out...",
      success: () => {
        setUser(null);
        return "Signed out successfully!";
      },
      error: "Failed to sign out.",
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="navbar bg-white dark:bg-black transition-colors duration-300 sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center py-2 sm:py-3 px-2 sm:px-4">
          {/* Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {!loading && (
            <>
              {/* Desktop Navigation */}
              <motion.div
                className="hidden lg:flex gap-4 xl:gap-8 items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.nav
                  className="flex items-center gap-1 text-sm"
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

                  <div className="w-px h-6 bg-[#f87898]/20"></div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <NavLink
                      to="/about"
                      className={({ isActive }) => getNavLinkClasses(isActive)}
                    >
                      <FaInfoCircle
                        size={16}
                        className="transition-all duration-300 group-hover:scale-110 group-hover:text-[#f87898]"
                      />
                      <span>About Us</span>
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
                      to="/privacy"
                      className={({ isActive }) => getNavLinkClasses(isActive)}
                    >
                      <FaShieldAlt
                        size={16}
                        className="transition-all duration-300 group-hover:scale-110 group-hover:text-[#f87898]"
                      />
                      <span>Privacy</span>
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

                {/* Desktop User Section */}
                {user ? (
                  <motion.div className="flex items-center gap-3 xl:gap-4">
                    <ThemeToggle />
                    <motion.div
                      ref={userDropdownRef}
                      onClick={() => setShow(!show)}
                      className="relative"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full p-0.5 border-2 border-[#f87898] cursor-pointer"
                      />
                      <FaBars
                        size={14}
                        color="white"
                        className="bg-[#f87898] p-[2px] rounded-full absolute bottom-0 right-0 opacity-80"
                      />

                      <AnimatePresence>
                        {show && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-12 right-0 bg-[#f87898] rounded-xl p-4 min-w-[200px] shadow-lg"
                          >
                            <Link
                              className="block border-b px-2 pb-2 font-semibold mb-4 text-white border-white/20 hover:text-gray-200 transition-colors"
                              to="/dashboard"
                              onClick={() => setShow(false)}
                            >
                              Dashboard
                            </Link>
                            <button
                              onClick={handleSignOut}
                              className="w-full rounded-lg px-4 py-2 font-semibold bg-white text-[#f87898] hover:bg-gray-100 transition-colors"
                            >
                              Sign Out
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
                    <Link to="/login">
                      <button className="btn-primary text-sm px-3 py-2">
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="btn-secondary text-sm px-3 py-2">
                        Register
                      </button>
                    </Link>
                  </motion.div>
                )}
              </motion.div>

              {/* Mobile Navigation */}
              <div className="flex lg:hidden items-center gap-2 sm:gap-3">
                <ThemeToggle />
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {mobileMenuOpen ? (
                    <FaTimes size={20} className="text-[#f87898]" />
                  ) : (
                    <FaBars size={20} className="text-[#f87898]" />
                  )}
                </motion.button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-[#f87898] rounded-b-xl mx-2 sm:mx-4 mb-2 overflow-hidden"
            >
              <nav className="py-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    getMobileNavLinkClasses(isActive)
                  }
                  onClick={closeMobileMenu}
                >
                  <FaHome size={18} />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  to="/requests"
                  className={({ isActive }) =>
                    getMobileNavLinkClasses(isActive)
                  }
                  onClick={closeMobileMenu}
                >
                  <MdBloodtype size={18} />
                  <span>Requests</span>
                </NavLink>
                <NavLink
                  to="/search"
                  className={({ isActive }) =>
                    getMobileNavLinkClasses(isActive)
                  }
                  onClick={closeMobileMenu}
                >
                  <FaSearch size={18} />
                  <span>Find Donor</span>
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    getMobileNavLinkClasses(isActive)
                  }
                  onClick={closeMobileMenu}
                >
                  <FaInfoCircle size={18} />
                  <span>About Us</span>
                </NavLink>
                <NavLink
                  to="/privacy"
                  className={({ isActive }) =>
                    getMobileNavLinkClasses(isActive)
                  }
                  onClick={closeMobileMenu}
                >
                  <FaShieldAlt size={18} />
                  <span>Privacy</span>
                </NavLink>
                {user && (
                  <>
                    <NavLink
                      to="/funding"
                      className={({ isActive }) =>
                        getMobileNavLinkClasses(isActive)
                      }
                      onClick={closeMobileMenu}
                    >
                      <FaMoneyBillWave size={18} />
                      <span>Funding</span>
                    </NavLink>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        getMobileNavLinkClasses(isActive)
                      }
                      onClick={closeMobileMenu}
                    >
                      <FaDonate size={18} />
                      <span>Dashboard</span>
                    </NavLink>
                  </>
                )}

                {/* Mobile Auth Section */}
                <div className="px-4 py-3 border-t border-white/10">
                  {user ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 object-cover rounded-full border-2 border-white"
                        />
                        <span className="text-white font-medium text-sm truncate">
                          {user.name}
                        </span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="bg-white text-[#f87898] px-3 py-1 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Link
                        to="/login"
                        className="flex-1"
                        onClick={closeMobileMenu}
                      >
                        <button className="w-full bg-white text-[#f87898] py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                          Login
                        </button>
                      </Link>
                      <Link
                        to="/register"
                        className="flex-1"
                        onClick={closeMobileMenu}
                      >
                        <button className="w-full bg-transparent border border-white text-white py-2 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
                          Register
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default Navbar;
