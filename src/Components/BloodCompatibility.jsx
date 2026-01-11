import { useState, useContext } from "react";
import { useTheme } from "../Context/ThemeContext";
import { AuthContext } from "../Auth/AuthContext";
import { Link } from "react-router";
import { FaHeart, FaUsers, FaStar } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import useScrollAnimation from "../Hooks/useScrollAnimation";
import { motion } from "framer-motion"; // eslint-disable-line

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const compatibilityData = {
  "A+": {
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"],
  },
  "A-": {
    canDonateTo: ["A+", "A-", "AB+", "AB-"],
    canReceiveFrom: ["A-", "O-"],
  },
  "B+": {
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"],
  },
  "B-": {
    canDonateTo: ["B+", "B-", "AB+", "AB-"],
    canReceiveFrom: ["B-", "O-"],
  },
  "AB+": {
    canDonateTo: ["AB+"],
    canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  "AB-": {
    canDonateTo: ["AB+", "AB-"],
    canReceiveFrom: ["A-", "B-", "AB-", "O-"],
  },
  "O+": {
    canDonateTo: ["A+", "B+", "AB+", "O+"],
    canReceiveFrom: ["O+", "O-"],
  },
  "O-": {
    canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    canReceiveFrom: ["O-"],
  },
};

const bloodTypeInfo = {
  "O-": {
    title: "Universal Donor",
    description: "Can donate to all blood types",
    percentage: "6.6%",
    icon: <FaStar className="text-yellow-500" />,
  },
  "AB+": {
    title: "Universal Recipient",
    description: "Can receive from all blood types",
    percentage: "3.4%",
    icon: <FaHeart className="text-red-500" />,
  },
  "O+": {
    title: "Most Common",
    description: "Most frequent blood type",
    percentage: "37.4%",
    icon: <FaUsers className="text-blue-500" />,
  },
  "AB-": {
    title: "Rarest Type",
    description: "Least common blood type",
    percentage: "0.6%",
    icon: <FaStar className="text-purple-500" />,
  },
};

const BloodCompatibility = () => {
  const { isDark } = useTheme();
  const { user } = useContext(AuthContext);
  const [selectedBloodType, setSelectedBloodType] = useState("O-");
  const [viewMode, setViewMode] = useState("donate"); // "donate" or "receive"
  const cardsRef = useScrollAnimation("scroll-animate-card");

  // Animation variants for the chart
  const chartVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const selectorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  const bloodTypeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <section className="py-16">
      <div>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                isDark ? "bg-[#f87898]/10" : "bg-[#f87898]/5"
              }`}
            >
              <MdBloodtype className="text-[#f87898] text-2xl sm:text-3xl" />
            </div>
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Blood Types & <span className="text-[#f87898]">Compatibility</span>
          </h2>
          <p
            className={`max-w-3xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Understanding blood type compatibility is crucial for safe
            donations. Learn about different blood types and who can donate to
            whom.
          </p>
        </div>

        {/* Special Blood Types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {Object.entries(bloodTypeInfo).map(([type, info], index) => (
            <div
              key={type}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`scroll-animate-card p-4 sm:p-6 rounded-xl sm:rounded-2xl group hover:scale-101 transition-all duration-300 ${
                isDark
                  ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl transition-all duration-300 ${
                      isDark
                        ? "bg-[#f87898]/20 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
                        : "bg-[#f87898]/10 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
                    }`}
                  >
                    <MdBloodtype className="text-sm sm:text-lg" />
                  </div>
                  <span
                    className={`font-bold text-base sm:text-lg ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {type}
                  </span>
                </div>
                <div className="text-lg sm:text-xl">{info.icon}</div>
              </div>
              <h3
                className={`font-semibold mb-2 text-sm sm:text-base ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {info.title}
              </h3>
              <p
                className={`text-xs sm:text-sm mb-2 leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {info.description}
              </p>
              <div
                className={`text-xs px-2 py-1 rounded-full inline-block ${
                  isDark
                    ? "bg-[#f87898]/20 text-[#f87898]"
                    : "bg-[#f87898]/10 text-[#f87898]"
                }`}
              >
                {info.percentage} of population
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Compatibility Chart */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.3 }}
          variants={chartVariants}
          className={`p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl ${
            isDark
              ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
              : "bg-white"
          } transition-all duration-300`}
        >
          <motion.div
            variants={selectorVariants}
            className="text-center mb-6 sm:mb-8"
          >
            <motion.h3
              variants={bloodTypeVariants}
              className={`text-xl sm:text-2xl font-bold mb-2 ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Interactive Compatibility Chart
            </motion.h3>
            <motion.p
              variants={bloodTypeVariants}
              className={`text-xs sm:text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Select a blood type to see compatibility
            </motion.p>
          </motion.div>

          {/* Responsive Blood Type Selector */}
          <motion.div
            variants={selectorVariants}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            {bloodTypes.map((type) => (
              <motion.button
                key={type}
                variants={bloodTypeVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedBloodType(type)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                  selectedBloodType === type
                    ? "bg-[#f87898] text-white shadow-lg shadow-[#f87898]/25"
                    : isDark
                    ? "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {type}
              </motion.button>
            ))}
          </motion.div>

          {/* Responsive View Mode Toggle */}
          <motion.div
            variants={selectorVariants}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <div
              className={`inline-flex p-1 rounded-lg sm:rounded-xl ${
                isDark ? "bg-white/5" : "bg-gray-100"
              }`}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setViewMode("donate")}
                className={`px-3 sm:px-6 py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  viewMode === "donate"
                    ? "bg-[#f87898] text-white shadow-sm"
                    : isDark
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="hidden sm:inline">Can Donate To</span>
                <span className="sm:hidden">Donate</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setViewMode("receive")}
                className={`px-3 sm:px-6 py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  viewMode === "receive"
                    ? "bg-[#f87898] text-white shadow-sm"
                    : isDark
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="hidden sm:inline">Can Receive From</span>
                <span className="sm:hidden">Receive</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Responsive Compatibility Grid */}
          <motion.div
            variants={selectorVariants}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <motion.div
              variants={gridVariants}
              className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3 max-w-xs sm:max-w-2xl"
            >
              {bloodTypes.map((type) => {
                const isCompatible =
                  viewMode === "donate"
                    ? compatibilityData[
                        selectedBloodType
                      ]?.canDonateTo.includes(type)
                    : compatibilityData[type]?.canDonateTo.includes(
                        selectedBloodType
                      );

                return (
                  <motion.div
                    key={type}
                    variants={gridItemVariants}
                    whileHover={{ scale: 1.1 }}
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                      type === selectedBloodType
                        ? "bg-[#f87898] text-white shadow-lg shadow-[#f87898]/25 scale-110 z-10"
                        : isCompatible
                        ? isDark
                          ? "bg-[#f87898]/10 text-[#f87898] border border-[#f87898]/20 hover:bg-[#f87898]/20"
                          : "bg-[#f87898]/5 text-[#f87898] border border-[#f87898]/15 hover:bg-[#f87898]/10"
                        : isDark
                        ? "bg-white/5 text-gray-500 border border-white/10"
                        : "bg-gray-50 text-gray-400 border border-gray-200"
                    }`}
                  >
                    {type}
                    {type === selectedBloodType && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full flex items-center justify-center"
                      >
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#f87898] rounded-full"></div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Responsive Legend */}
          <motion.div
            variants={selectorVariants}
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-4 sm:mb-6"
          >
            <motion.div
              variants={bloodTypeVariants}
              className="flex items-center gap-2"
            >
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#f87898] rounded-full"></div>
              <span
                className={`text-xs font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Selected
              </span>
            </motion.div>
            <motion.div
              variants={bloodTypeVariants}
              className="flex items-center gap-2"
            >
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 ${
                  isDark
                    ? "border-[#f87898]/20 bg-[#f87898]/10"
                    : "border-[#f87898]/15 bg-[#f87898]/5"
                }`}
              ></div>
              <span
                className={`text-xs font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Compatible
              </span>
            </motion.div>
            <motion.div
              variants={bloodTypeVariants}
              className="flex items-center gap-2"
            >
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                }`}
              ></div>
              <span
                className={`text-xs font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Not Compatible
              </span>
            </motion.div>
          </motion.div>

          {/* Responsive Selection Info */}
          <motion.div
            variants={selectorVariants}
            className="text-center p-3 sm:p-4 rounded-lg bg-[#f87898]"
          >
            <motion.div
              variants={bloodTypeVariants}
              className="flex items-center justify-center gap-2 mb-1"
            >
              <MdBloodtype className="text-white text-base sm:text-lg" />
              <span className="font-semibold text-white text-sm sm:text-base">
                {selectedBloodType}
              </span>
            </motion.div>
            <motion.p
              variants={bloodTypeVariants}
              className="text-xs sm:text-sm text-white/90"
            >
              {viewMode === "donate"
                ? `Can donate to ${compatibilityData[selectedBloodType]?.canDonateTo.length} blood types`
                : `Can receive from ${compatibilityData[selectedBloodType]?.canReceiveFrom.length} blood types`}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.4 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.2,
              },
            },
            exit: {
              opacity: 0,
              y: -20,
              transition: { duration: 0.4, ease: "easeIn" },
            },
          }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.h3
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut" },
              },
              exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
            }}
            className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Ready to Save Lives?
          </motion.h3>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
              exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
            }}
            className={`mb-4 sm:mb-6 text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Every blood type is needed. Join our community of life-savers today.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                  staggerChildren: 0.1,
                },
              },
              exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
            }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
          >
            {user ? (
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                  exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
                }}
              >
                <Link to={"/requests"}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary w-full sm:w-auto"
                  >
                    Find Blood Requests
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                  exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
                }}
              >
                <Link to={"/register"}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary w-full sm:w-auto"
                  >
                    Register as Donor
                  </motion.button>
                </Link>
              </motion.div>
            )}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.4, ease: "easeOut" },
                },
                exit: { opacity: 0, x: 10, transition: { duration: 0.2 } },
              }}
            >
              <Link to={"/search"}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary w-full sm:w-auto"
                >
                  Find Blood Donors
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BloodCompatibility;
