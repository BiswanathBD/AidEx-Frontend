import React from "react";
import { useTheme } from "../../Context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full p-1 transition-all duration-500 shadow-lg hover:shadow-xl ${
        isDark
          ? "bg-linear-to-r from-white/30 to-white/10"
          : "bg-linear-to-r from-orange-400/20 to-orange-400/30"
      }`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Toggle Circle */}
      <div
        className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-500 flex items-center justify-center ${
          theme === "light"
            ? "left-1 transform rotate-0"
            : "left-8 transform rotate-180"
        }`}
      >
        {theme === "light" ? (
          <BsSun className="w-3 h-3 text-yellow-600" />
        ) : (
          <BsMoon className="w-3 h-3 text-[#110909]" />
        )}
      </div>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <BsSun
          className={`w-3 h-3 transition-opacity duration-300 ${
            theme === "light" ? "text-white/30" : "text-white/70"
          }`}
        />
        <BsMoon
          className={`w-3 h-3 transition-opacity duration-300 ${
            theme === "light" ? "text-white/70" : "text-white/30"
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
