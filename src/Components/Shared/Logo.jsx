import React from "react";
import LogoImg from "../../assets/logo.png";
import { Link } from "react-router";
import { useTheme } from "../../Context/ThemeContext";

const Logo = () => {
  const { isDark } = useTheme();

  return (
    <Link to={"/"}>
      <div className="flex items-center">
        <img src={LogoImg} alt="logo" className="w-8 object-contain" />
        <h3
          className={`text-2xl font-bold transition-colors duration-300 ${
            isDark ? "text-neutral-300" : "text-neutral-600"
          }`}
        >
          aid
          <span
            className={`font-light transition-colors duration-300 text-[#f87898]`}
          >
            Ex
          </span>
          .
        </h3>
      </div>
    </Link>
  );
};

export default Logo;
