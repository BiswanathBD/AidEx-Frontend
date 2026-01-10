import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { GoTrash } from "react-icons/go";
import Swal from "sweetalert2";
import { Link, Navigate, useLocation } from "react-router";
import Loader from "../../Components/Shared/Loader";
import { motion } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";

const AllRequests = () => {
  const { isDark } = useTheme();
  const { user, loading } = useContext(AuthContext);
  const [userRequests, setUserRequests] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 12;
  const axiosInstance = useAxios();
  const location = useLocation();
  const [loader, setLoader] = useState(true);

  const fetchRequests = useCallback(async () => {
    try {
      setLoader(true);
      const res = await axiosInstance.get("/allRequest");
      setUserRequests(res.data || []);
    } catch {
      setUserRequests([]);
    } finally {
      setLoader(false);
    }
  }, [axiosInstance]);

  useEffect(() => {
    if (user?.email) fetchRequests();
  }, [user, axiosInstance, fetchRequests]);

  const filteredRequests =
    filter === "All"
      ? userRequests
      : userRequests.filter((r) => r.status === filter);

  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes",
      width: "fit-content",
    });

    if (!result.isConfirmed) return;

    await axiosInstance.delete(`/donation-request/${id}`);
    fetchRequests();

    Swal.fire({
      icon: "success",
      title: "Deleted",
      timer: 1200,
      showConfirmButton: false,
      width: "fit-content",
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    const confirm = await Swal.fire({
      title: `Mark as ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus === "Done" ? "#22c55e" : "#f43f5e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes",
      width: "fit-content",
    });

    if (!confirm.isConfirmed) return;

    await axiosInstance.put(`/update-request-status/${id}`, {
      status: newStatus,
    });

    fetchRequests();

    Swal.fire({
      icon: "success",
      title: newStatus,
      timer: 1200,
      showConfirmButton: false,
      width: "fit-content",
    });
  };

  if (loading) return null;
  if (!user) return null;
  if (user.role !== "Admin" && user.role !== "Volunteer")
    return <Navigate to="/dashboard" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className={`p-4 sm:p-6 lg:p-8 mt-4 rounded-xl ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 px-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <span className="text-[#f87898]">All</span> Donation Requests
      </h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        {["All", "Pending", "Inprogress", "Done", "Canceled"].map((s) => (
          <button
            key={s}
            onClick={() => {
              setFilter(s);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-sm border transition-all duration-300 ${
              filter === s
                ? "bg-[#f87898] text-white border-[#f87898]"
                : isDark
                ? "bg-black text-white/80 border-white/20 hover:border-white/30"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
            }`}
          >
            {s}
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
              <th className="p-4 rounded-l-2xl">Recipient</th>
              <th className="p-4">District</th>
              <th className="p-4">Upazila</th>
              <th className="p-4">Blood</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right rounded-r-2xl">Actions</th>
            </tr>
          </thead>

          {loader && (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <Loader />
                </td>
              </tr>
            </tbody>
          )}

          <tbody>
            {currentRequests.map((req, index) => (
              <motion.tr
                key={req._id}
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
                <td className="p-4">{req.recipientName}</td>
                <td className="p-4">{req.district}</td>
                <td className="p-4">{req.upazila}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-[#f87898]/20 text-[#f87898] rounded-full text-xs font-medium">
                    {req.bloodGroup}
                  </span>
                </td>
                <td className="p-4">{req.donationDate}</td>
                <td className="p-4">{formatTime(req.donationTime)}</td>

                <td className="p-4 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : req.status === "Inprogress"
                        ? "bg-green-100 text-green-700"
                        : req.status === "Done"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                <td className="p-4 flex justify-end gap-2">
                  <Link
                    to={`/dashboard/donation-request/view/${req._id}`}
                    state={location.pathname}
                    className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs transition-colors duration-300"
                  >
                    View
                  </Link>

                  {req.status === "Pending" && user.role !== "Volunteer" && (
                    <Link
                      to={`/dashboard/donation-request/edit/${req._id}`}
                      state={location.pathname}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs transition-colors duration-300"
                    >
                      Edit
                    </Link>
                  )}

                  {req.status === "Inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(req._id, "Done")}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs transition-colors duration-300"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleStatusChange(req._id, "Canceled")}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {user.role === "Admin" && (
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition-colors duration-300"
                    >
                      <GoTrash size={16} />
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end mr-4 mt-6 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded-full text-sm border transition-all duration-300 ${
                currentPage === num
                  ? "bg-[#f87898] text-white border-[#f87898]"
                  : isDark
                  ? "bg-black text-white/80 border-white/20 hover:border-white/30"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
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

export default AllRequests;
