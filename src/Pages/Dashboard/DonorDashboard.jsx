import { useContext, useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router";
import Swal from "sweetalert2";
import { GoTrash } from "react-icons/go";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { motion } from "framer-motion";
import Loader from "../../Components/Shared/Loader";
import { useTheme } from "../../Context/ThemeContext";
import { FaHome, FaClipboardList } from "react-icons/fa";

const DonorDashboard = () => {
  const { isDark } = useTheme();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchRequests = useCallback(() => {
    if (!user?.email) return;
    axiosInstance.get(`/donation-request?email=${user.email}`).then((res) => {
      setRequests(res.data.slice(0, 3));
      setLoader(false);
    });
  }, [user, axiosInstance]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

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
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      width: "fit-content",
    });

    if (result.isConfirmed) {
      await axiosInstance.delete(`/donation-request/${id}`);
      fetchRequests();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Request has been deleted.",
        timer: 1500,
        showConfirmButton: false,
        width: "fit-content",
      });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const confirm = await Swal.fire({
      title: `Change status to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus === "done" ? "#22c55e" : "#f43f5e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes",
      width: "fit-content",
    });

    if (confirm.isConfirmed) {
      await axiosInstance.put(`/update-request-status/${id}`, {
        status: newStatus,
      });
      fetchRequests();
      Swal.fire({
        icon: "success",
        title: `Request marked as ${newStatus}`,
        timer: 1500,
        showConfirmButton: false,
        width: "fit-content",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
          <FaHome className="text-[#f87898]" />
          <span className="text-[#f87898]">Welcome</span> {user.name}
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Your recent donation requests and activity
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
        {loader ? (
          <Loader />
        ) : requests.length > 0 ? (
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr
                  className={`text-left text-sm ${
                    isDark
                      ? "bg-white/5 text-white/80"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <th className="p-4 rounded-l-2xl">Recipient</th>
                  <th className="p-4">District</th>
                  <th className="p-4">Upazila</th>
                  <th className="p-4 text-center">Blood Group</th>
                  <th className="p-4 text-center">Date</th>
                  <th className="p-4 text-center">Time</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 rounded-r-2xl text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((r, index) => (
                  <motion.tr
                    key={r._id}
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
                    <td className="p-4">{r.recipientName}</td>
                    <td className="p-4">{r.district}</td>
                    <td className="p-4">{r.upazila}</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-[#f87898]/20 text-[#f87898] rounded-full text-xs font-medium">
                        {r.bloodGroup}
                      </span>
                    </td>
                    <td className="p-4 text-center">{r.donationDate}</td>
                    <td className="p-4 text-center">
                      {formatTime(r.donationTime)}
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          r.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : r.status === "Inprogress"
                            ? "bg-green-100 text-green-700"
                            : r.status === "Done"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="p-4 flex justify-end gap-2 flex-wrap">
                      <Link
                        to={`/dashboard/donation-request/view/${r._id}`}
                        state={location.pathname}
                        className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs transition-colors duration-300"
                      >
                        View
                      </Link>

                      {r.status === "Pending" && (
                        <Link
                          to={`/dashboard/donation-request/edit/${r._id}`}
                          state={location.pathname}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs transition-colors duration-300"
                        >
                          Edit
                        </Link>
                      )}

                      {r.status === "Pending" && (
                        <button
                          onClick={() => handleDelete(r._id)}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition-colors duration-300"
                        >
                          <GoTrash size={16} />
                        </button>
                      )}

                      {r.status === "Inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(r._id, "Done")}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs transition-colors duration-300"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(r._id, "Canceled")
                            }
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition-colors duration-300"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-[#f87898]/10 flex items-center justify-center mb-4">
              <FaClipboardList className="text-3xl text-[#f87898]" />
            </div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              No Donation Requests Yet
            </h3>
            <p
              className={`text-center mb-6 max-w-md ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              You haven't created any donation requests yet. Start by creating
              your first request to help save lives.
            </p>
            <Link
              to="/dashboard/create-donation-request"
              className="btn-primary flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Create Your First Request
            </Link>
          </motion.div>
        )}

        {requests.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="text-center mt-6 flex justify-end"
          >
            <Link to="/dashboard/my-donation-requests" className="btn-primary">
              View All
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DonorDashboard;
