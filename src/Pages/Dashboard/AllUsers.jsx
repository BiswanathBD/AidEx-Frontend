import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { Navigate } from "react-router";
import { FiMoreVertical } from "react-icons/fi";
import toast from "react-hot-toast";
import Loader from "../../Components/Shared/Loader";
import { motion } from "framer-motion";

const AllUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [loader, setLoader] = useState(true);

  const [allUsers, setAllUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    axiosInstance.get("/allUsers").then((res) => {
      setAllUsers(res.data);
      setLoader(false);
    });
  }, [axiosInstance]);

  if (loading) return null;
  if (user.role !== "Admin") return <Navigate to={"/dashboard"} />;

  const filteredUsers =
    filter === "all"
      ? allUsers
      : allUsers.filter((u) => u.status.toLowerCase() === filter);

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (n) => setCurrentPage(n);

  const handleUserAction = async (id, action, user) => {
    let updateData = { user };

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
      setOpenMenu(null);
      toast.success("User updated successfully!", { id: t });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-4 mt-4 bg-white rounded-xl"
    >
      <h2 className="text-2xl font-bold mb-6 px-4 text-[#f87898]">
        <span className="text-black">All</span> Users
      </h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "active", "blocked"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilter(status);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-sm border ${
              filter === status
                ? "bg-[#f87898] text-white border-[#f87898]"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto overflow-y-hidden">
        <table className="border-collapse w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="p-4 rounded-l-2xl">Avatar</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4 text-center">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 rounded-r-2xl">Actions</th>
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
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="p-4 border-b border-gray-100">
                    <img
                      src={u.avatar}
                      alt="avatar"
                      className="w-12 aspect-square border-2 border-[#f43f5e] p-0.5 rounded-full object-cover"
                    />
                  </td>

                  <td className="p-4 border-b border-gray-100">{u.name}</td>
                  <td className="p-4 border-b border-gray-100">{u.email}</td>

                  <td className="p-4 border-b border-gray-100 text-center">
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
                    className={`p-4 border-b border-gray-100 font-semibold ${
                      u.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {u.status}
                  </td>

                  <td className="p-4 border-b border-gray-100 relative">
                    <button
                      onClick={() =>
                        setOpenMenu((prev) =>
                          prev === u._id ? null : u._id
                        )
                      }
                      className="p-2 hover:bg-gray-200 rounded-full"
                    >
                      <FiMoreVertical size={18} />
                    </button>

                    {openMenu === u._id && (
                      <div className="absolute right-4 mt-1 bg-white border rounded-lg shadow-lg/10 text-sm font-semibold z-10 p-2">
                        {u.status === "Active" ? (
                          <button
                            onClick={() =>
                              handleUserAction(u._id, "block", u)
                            }
                            className="w-full mb-2 px-4 py-2 bg-red-600 text-white rounded"
                          >
                            Block User
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleUserAction(u._id, "unblock")
                            }
                            className="w-full mb-2 px-4 py-2 bg-green-600 text-white rounded"
                          >
                            Unblock User
                          </button>
                        )}

                        {u.role !== "Volunteer" && (
                          <button
                            onClick={() =>
                              handleUserAction(u._id, "make-volunteer")
                            }
                            className="w-full mb-2 px-4 py-2 bg-yellow-600 text-white rounded"
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

      {totalPages > 1 && (
        <div className="flex justify-end mr-4 mt-4 gap-4 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-3 py-1 rounded-full text-sm border ${
                currentPage === num
                  ? "bg-[#f87898] text-white border-[#f87898]"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AllUsers;