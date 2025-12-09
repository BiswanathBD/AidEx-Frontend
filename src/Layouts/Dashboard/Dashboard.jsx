import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import {
  PiDropDuotone,
  PiPlusCircleDuotone,
  PiUserDuotone,
} from "react-icons/pi";
import { AiTwotoneHome } from "react-icons/ai";
import LogoImg from "../../assets/logo.png";
import { Outlet } from "react-router";
import { AuthContext } from "../../Auth/AuthContext";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return;

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
          {/* home */}
          <NavLink to={"/dashboard"} end className="flex items-center gap-2">
            <AiTwotoneHome size={24} />{" "}
            <span className="hidden md:block">Home</span>
          </NavLink>

          {/* profile */}
          <NavLink
            to={"/dashboard/profile"}
            className="flex items-center gap-2"
          >
            <PiUserDuotone size={24} />{" "}
            <span className="hidden md:block">My Profile</span>
          </NavLink>

          {/* donor nav */}
          {/* donation request */}
          <NavLink
            to={"/dashboard/my-donation-requests"}
            className="flex items-center gap-2"
          >
            <PiDropDuotone size={24} />{" "}
            <span className="hidden md:block">My Requests</span>
          </NavLink>

          {/* create donation request */}
          <NavLink
            to={"/dashboard/create-donation-request"}
            className="flex items-center gap-2"
          >
            <PiPlusCircleDuotone size={24} />{" "}
            <span className="hidden md:block">Create Request</span>
          </NavLink>

          {/* admin nav */}
          {/* all users */}
          <NavLink
            to={"/dashboard/all-users"}
            className="flex items-center gap-2"
          >
            <PiUserDuotone size={24} />{" "}
            <span className="hidden md:block">All Users</span>
          </NavLink>

          {/* all request */}
          <NavLink
            to={"/dashboard/all-blood-donation-request"}
            className="flex items-center gap-2"
          >
            <PiDropDuotone size={24} />{" "}
            <span className="hidden md:block">All Request</span>
          </NavLink>
        </div>
      </div>

      {/* welcome note header */}
      <div className="p-4 w-full">
        <div className="font-bold text-neutral-500 pb-4 border-b border-white flex items-center gap-2 justify-end">
          <h2>
            Welcome{" "}
            <span className="text-[#f87898] md:text-xl">{user.name}</span>
          </h2>
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 aspect-square object-cover rounded-full p-0.5 border-2 border-[#f87898] hidden sm:block"
          />
        </div>

        {/* dashboard content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
