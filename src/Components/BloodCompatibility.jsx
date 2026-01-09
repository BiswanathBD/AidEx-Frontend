import React, { useState, useContext } from "react";
import { useTheme } from "../Context/ThemeContext";
import { AuthContext } from "../Auth/AuthContext";
import { Link } from "react-router";
import { FaHeart, FaInfoCircle, FaUsers, FaStar } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

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

  const getCompatibilityStatus = (fromType, toType) => {
    if (viewMode === "donate") {
      return compatibilityData[selectedBloodType]?.canDonateTo.includes(toType);
    } else {
      return compatibilityData[toType]?.canDonateTo.includes(selectedBloodType);
    }
  };

  return (
    <section className="py-16">
      <div>
        {/* Header */}
        <div className="text-center mb-12">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(bloodTypeInfo).map(([type, info]) => (
            <div
              key={type}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-black border-[#f87898]"
                  : "bg-white border-[#f87898]/5 hover:shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MdBloodtype className="text-[#f87898] text-xl" />
                  <span
                    className={`font-bold text-lg ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {type}
                  </span>
                </div>
                {info.icon}
              </div>
              <h3
                className={`font-semibold mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {info.title}
              </h3>
              <p
                className={`text-sm mb-2 ${
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
        <div
          className={`p-8 rounded-2xl border ${
            isDark ? "bg-black border-[#f87898]" : "bg-white border-[#f87898]/5"
          }`}
        >
          <div className="text-center mb-8">
            <h3
              className={`text-2xl font-bold mb-2 ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Interactive Compatibility Chart
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Select a blood type to see compatibility
            </p>
          </div>

          {/* Minimal Blood Type Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {bloodTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedBloodType(type)}
                className={`w-12 h-12 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 ${
                  selectedBloodType === type
                    ? "bg-[#f87898] text-white shadow-lg shadow-[#f87898]/25"
                    : isDark
                    ? "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Minimal View Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div
              className={`inline-flex p-1 rounded-xl ${
                isDark ? "bg-white/5" : "bg-gray-100"
              }`}
            >
              <button
                onClick={() => setViewMode("donate")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === "donate"
                    ? "bg-[#f87898] text-white shadow-sm"
                    : isDark
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Can Donate To
              </button>
              <button
                onClick={() => setViewMode("receive")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === "receive"
                    ? "bg-[#f87898] text-white shadow-sm"
                    : isDark
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Can Receive From
              </button>
            </div>
          </div>

          {/* Stylish Compatibility Grid */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3 max-w-2xl">
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
                  <div
                    key={type}
                    className={`relative w-16 h-16 flex items-center justify-center rounded-2xl font-bold text-sm transition-all duration-300 ${
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
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#f87898] rounded-full"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Minimal Legend */}
          <div className="flex justify-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#f87898] rounded-full"></div>
              <span
                className={`text-xs font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full border-2 ${
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
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
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
            </div>
          </div>

          {/* Elegant Selection Info */}
          <div
            className={`text-center p-4 rounded-xl ${
              isDark
                ? "bg-[#f87898]/5 border border-[#f87898]/10"
                : "bg-[#f87898]/5 border border-[#f87898]/10"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <MdBloodtype className="text-[#f87898] text-lg" />
              <span
                className={`font-semibold ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {selectedBloodType}
              </span>
            </div>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {viewMode === "donate"
                ? `Can donate to ${compatibilityData[selectedBloodType]?.canDonateTo.length} blood types`
                : `Can receive from ${compatibilityData[selectedBloodType]?.canReceiveFrom.length} blood types`}
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3
            className={`text-2xl font-bold mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Ready to Save Lives?
          </h3>
          <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Every blood type is needed. Join our community of life-savers today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link to={"/requests"}>
                <button className="btn-primary">Find Blood Requests</button>
              </Link>
            ) : (
              <Link to={"/register"}>
                <button className="btn-primary">Register as Donor</button>
              </Link>
            )}
            <Link to={"/search"}>
              <button className="btn-secondary">Find Blood Donors</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodCompatibility;
