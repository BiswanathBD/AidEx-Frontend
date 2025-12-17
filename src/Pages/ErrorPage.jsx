import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
motion;

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-2xl text-center max-w-md w-full"
      >
        <h1 className="text-6xl font-extrabold text-[#f87898]">404</h1>

        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-2">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link to="/" className="inline-block mt-6 btn-primary">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
