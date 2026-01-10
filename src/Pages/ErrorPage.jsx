import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion"; //eslint 
import { useTheme } from "../Context/ThemeContext";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  const { isDark } = useTheme();

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row justify-center items-center max-w-4xl w-full gap-8 lg:gap-16 p-8"
      >
        {/* 404 Section */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`text-6xl lg:text-[10rem] font-extrabold ${
            isDark
              ? "text-[#f87898] drop-shadow-[0_0_30px_rgba(248,120,152,0.3)]"
              : "text-[#f87898]"
          }`}
        >
          404
        </motion.div>

        {/* Content Section */}
        <div className="text-center lg:text-left max-w-lg lg:border-l border-[#f87898] lg:pl-16 lg:py-8 ">
          <h2
            className={`text-2xl sm:text-3xl font-bold mt-4 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Page Not Found
          </h2>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </p>
          <Link to="/" className="mt-6 btn-primary flex! w-fit items-center justify-center gap-2">
            <FaHome /> <span>Back to Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
