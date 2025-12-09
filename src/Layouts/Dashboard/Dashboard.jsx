import React from "react";
import { Link, NavLink } from "react-router";
import {
  PiDropDuotone,
  PiPlusCircleDuotone,
  PiUserDuotone,
} from "react-icons/pi";
import { AiTwotoneHome } from "react-icons/ai";
import LogoImg from "../../assets/logo.png";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="dashboard flex">
      {/* side ber */}
      <div className="bg-white w-fit h-screen px-6 py-4 text-nowrap">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center w-fit mx-auto">
            <img src={LogoImg} alt="logo" className="w-8 object-contain" />
            <h3 className="hidden md:block text-2xl font-bold text-neutral-600">
              aid<span className="font-light text-red-600">Ex</span>.
            </h3>
          </div>
        </Link>

        <div className="dash-nav mt-4 pt-4 border-t border-gray-200 text-neutral-500 space-y-4">
          <NavLink to={"/dashboard"} className="flex items-center gap-2">
            <AiTwotoneHome size={24} />{" "}
            <span className="hidden md:block">Home</span>
          </NavLink>

          <NavLink
            to={"/dashboard/profile"}
            className="flex items-center gap-2"
          >
            <PiUserDuotone size={24} />{" "}
            <span className="hidden md:block">My Profile</span>
          </NavLink>

          <NavLink
            to={" /dashboard/my-donation-requests"}
            className="flex items-center gap-2"
          >
            <PiDropDuotone size={24} />{" "}
            <span className="hidden md:block">My Requests</span>
          </NavLink>

          <NavLink
            to={"/dashboard/create-donation-request"}
            className="flex items-center gap-2"
          >
            <PiPlusCircleDuotone size={24} />{" "}
            <span className="hidden md:block">Create Request</span>
          </NavLink>
          <NavLink
            to={"/dashboard/create-donation-request"}
            className="flex items-center gap-2"
          >
            <PiUserDuotone size={24} />{" "}
            <span className="hidden md:block">All Users</span>
          </NavLink>
          <NavLink
            to={"/dashboard/create-donation-request"}
            className="flex items-center gap-2"
          >
            <PiDropDuotone size={24} />{" "}
            <span className="hidden md:block">All Request</span>
          </NavLink>
        </div>
      </div>

      {/* pages */}
      <div className="p-8 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
