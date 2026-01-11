import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import useAxios from "../../Hooks/useAxios";
import { Navigate } from "react-router";
import { FiMoreVertical } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "../../Components/Shared/Loader";
import { motion } from "framer-motion";

const AllUsers = () => {
  const { isDark } = useTheme();
  const { user, loading } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [loader, setLoader] = useState(true);

  const [allUsers, setAllUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState({ id: null, index: null });

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

  useEffect(() => {
    axiosInstance.get("/allUsers").then((res) => {
      setAllUsers(res.data);
      setLoader(false);
    });
  }, [axiosInstance]);

  const filteredUsers =
    filter === "all"
      ? allUsers
      : allUsers.filter((u) => u.status.toLowerCase() === filter);

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (n) => setCurrentPage(n);

  const handleUserAction = async (id, action) => {
    let updateData = {};

    if (id === user._id) {
      setOpenMenu({ id: null, index: null });
      return toast.error("Self update not allowed");
    }

    if (action === "block") updateData = { status: "Blocked" };
    else if (action === "unblock") updateData = { status: "Active" };
    else if (action === "make-volunteer") updateData = { role: "Volunteer" };
    else if (action === "make-admin") updateData = { role: "Admin" };

    const t = toast.loading("Updating user...");
    const res = await axiosInstance.put(`/update-user/${id}`, updateData);

    if (res.data.modifiedCount) {
      setAllUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, ...updateData } : u))
      );
      setOpenMenu({ id: null, index: null });
      toast.success("User updated successfully!", { id: t });
    }
  };

  if (loading) return <Loader />;
  if (user.role !== "Admin") return <Navigate to={"/dashboard"} />;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
          <FaUsers className="text-[#f87898]" />
          <span className="text-[#f87898]">All</span> Users
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Manage user accounts and permissions
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className={`p-4 sm:p-6 lg:p-8 rounded-xl group hover:scale-101 transition-all duration-300 ${
          isDark
            ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
            : "bg-white"
        }`}
      >
        <div className="flex gap-2 mb-4 flex-wrap">
          {["all", "active", "blocked"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilter(status);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full text-sm border transition-all duration-300 ${
                filter === status
                  ? "bg-[#f87898] text-white border-[#f87898]"
                  : isDark
                  ? "bg-black text-white/80 border-white/20 hover:border-white/30"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr
                className={`text-sm text-left ${
                  isDark
                    ? "bg-white/5 text-white/80"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <th className="p-4 rounded-l-2xl">Avatar</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4 text-center">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 rounded-r-2xl text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loader ? (
                <tr>
                  <td colSpan={6}>
                    <Loader />
                  </td>
                </tr>
              ) : currentUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                currentUsers.map((u, index) => (
                  <motion.tr
                    key={u._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className={`text-sm border-b transition-colors duration-300 ${
                      isDark
                        ? "text-white/90 border-white/10 hover:bg-white/5"
                        : "text-gray-700 border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-4">
                      <img
                        src={u.avatar}
                        alt="avatar"
                        className="w-12 aspect-square border-2 border-[#f43f5e] p-0.5 rounded-full object-cover"
                      />
                    </td>

                    <td className="p-4">{u.name}</td>
                    <td className="p-4">{u.email}</td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-sm text-white font-semibold ${
                          u.role === "Admin"
                            ? "bg-blue-600"
                            : u.role === "Volunteer"
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td
                      className={`p-4 font-semibold ${
                        u.status === "Active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {u.status}
                    </td>

                    <td className="p-4 relative flex justify-center">
                      <button
                        onClick={() =>
                          setOpenMenu((prev) =>
                            prev.id === u._id
                              ? { id: null, index: null }
                              : { id: u._id, index }
                          )
                        }
                        className={`p-2 rounded-full transition-colors duration-300 ${
                          isDark ? "hover:bg-white/10" : "hover:bg-gray-200"
                        }`}
                      >
                        <FiMoreVertical size={18} />
                      </button>

                      {openMenu.id === u._id && (
                        <div
                          className={`absolute right-4 z-50 p-2 rounded-xl shadow-lg text-sm font-semibold text-nowrap flex flex-col gap-2 ${
                            isDark
                              ? "bg-gray-800 border border-white/20"
                              : "bg-white"
                          } ${
                            index >= currentUsers.length - 2
                              ? "bottom-full -mb-4"
                              : "top-full -mt-4"
                          }`}
                        >
                          {u.status === "Active" ? (
                            <button
                              onClick={() =>
                                handleUserAction(u._id, "block", u)
                              }
                              className="w-full px-4 py-2 bg-red-600 text-white rounded"
                            >
                              Block User
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUserAction(u._id, "unblock")}
                              className="w-full px-4 py-2 bg-green-600 text-white rounded"
                            >
                              Unblock User
                            </button>
                          )}

                          {u.role !== "Volunteer" && (
                            <button
                              onClick={() =>
                                handleUserAction(u._id, "make-volunteer")
                              }
                              className="w-full px-4 py-2 bg-yellow-600 text-white rounded"
                            >
                              Make Volunteer
                            </button>
                          )}

                          {u.role !== "Admin" && (
                            <button
                              onClick={() =>
                                handleUserAction(u._id, "make-admin")
                              }
                              className="w-full px-4 py-2 bg-blue-600 text-white rounded"
                            >
                              Make Admin
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced pagination with prev/next buttons */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap px-4">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-lg text-lg font-bold transition-all duration-300 flex items-center justify-center ${
                currentPage === 1
                  ? isDark
                    ? "bg-black/50 text-gray-600 border border-gray-700 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                  : isDark
                  ? "bg-black text-gray-300 border border-[#f87898]/20 hover:bg-[#f87898]/10 hover:border-[#f87898]/40 hover:text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-[#f87898]/5 hover:border-[#f87898]/30 hover:text-[#f87898]"
              }`}
            >
              ‹
            </button>

            {/* Page numbers (show 3-5 pages) */}
            {(() => {
              const getVisiblePages = () => {
                const maxVisible = 5;
                const sidePages = Math.floor(maxVisible / 2);

                let startPage = Math.max(1, currentPage - sidePages);
                let endPage = Math.min(totalPages, currentPage + sidePages);

                // Adjust if we're near the beginning or end
                if (endPage - startPage + 1 < maxVisible) {
                  if (startPage === 1) {
                    endPage = Math.min(totalPages, startPage + maxVisible - 1);
                  } else if (endPage === totalPages) {
                    startPage = Math.max(1, endPage - maxVisible + 1);
                  }
                }

                return Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i
                );
              };

              return getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`relative w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-300 overflow-hidden flex items-center justify-center ${
                    currentPage === page
                      ? "bg-linear-to-r from-[#f87898] to-[#f45f7b] text-white shadow-lg shadow-[#f87898]/30"
                      : isDark
                      ? "bg-black text-gray-300 border border-[#f87898]/20 hover:bg-[#f87898]/10 hover:border-[#f87898]/40 hover:text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-[#f87898]/5 hover:border-[#f87898]/30 hover:text-[#f87898]"
                  }`}
                >
                  {currentPage === page && (
                    <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent"></div>
                  )}
                  <span className="relative z-10">{page}</span>
                </button>
              ));
            })()}

            {/* Next button */}
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-lg text-lg font-bold transition-all duration-300 flex items-center justify-center ${
                currentPage === totalPages
                  ? isDark
                    ? "bg-black/50 text-gray-600 border border-gray-700 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                  : isDark
                  ? "bg-black text-gray-300 border border-[#f87898]/20 hover:bg-[#f87898]/10 hover:border-[#f87898]/40 hover:text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-[#f87898]/5 hover:border-[#f87898]/30 hover:text-[#f87898]"
              }`}
            >
              ›
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllUsers;
