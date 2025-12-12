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
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, setUser, userSignOut, loading } = useContext(AuthContext);
  if (loading) return;

  const handleSignOut = () => {
    const signOutPromise = userSignOut();

    toast.promise(signOutPromise, {
      loading: "Signing out...",
      success: () => {
        setUser(null);
        return "Signed out successfully!";
      },
      error: "Failed to sign out.",
    });
  };

  return (
    <div className="dashboard flex">
      {/* side ber */}
      <div className="bg-white w-fit min-h-screen px-6 py-4 text-nowrap">
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

          {user.role === "Donor" && (
            <>
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
                className={`items-center gap-2 ${
                  user.status !== "Active" ? "hidden" : "flex"
                }`}
              >
                <PiPlusCircleDuotone size={24} />{" "}
                <span className="hidden md:block">Create Request</span>
              </NavLink>
            </>
          )}

          {/* all users */}
          {user.role === "Admin" && (
            <NavLink
              to={"/dashboard/all-users"}
              className="flex items-center gap-2"
            >
              <PiUserDuotone size={24} />{" "}
              <span className="hidden md:block">All Users</span>
            </NavLink>
          )}

          {/* all request */}
          {(user.role === "Admin" || user.role === "Volunteer") && (
            <NavLink
              to={"/dashboard/all-blood-donation-request"}
              className="flex items-center gap-2"
            >
              <PiDropDuotone size={24} />
              <span className="hidden md:block">All Request</span>
            </NavLink>
          )}
        </div>
      </div>

      {/* header */}
      <div className="p-3  w-full">
        <div className="font-semibold text-neutral-500 pb-3 border-b border-white flex items-center gap-2 justify-end">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 aspect-square object-cover rounded-full p-0.5 border-2 border-[#f87898]"
          />
          <button
            onClick={handleSignOut}
            title="Sign Out"
            className="text-gray-500 hover:text-[#f87898] mr-4"
          >
            <FiLogOut size={20} />
          </button>
        </div>

        {/* dashboard content */}
        <div className="md:p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
