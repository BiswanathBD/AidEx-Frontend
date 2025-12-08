import React from "react";
import { GiWaterRecycling } from "react-icons/gi";
import LogoImg from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center">
        <img src={LogoImg} alt="logo" className="w-8 object-contain" />
        <h3 className="text-2xl font-bold text-neutral-600">
          aid<span className="font-light text-red-600">Ex</span>.
        </h3>
      </div>
    </Link>
  );
};

export default Logo;
