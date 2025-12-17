import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import Swal from "sweetalert2";
import { GoTrash } from "react-icons/go";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { motion } from "framer-motion";
import Loader from "../../Components/Shared/Loader";
motion;

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchRequests = () => {
    axiosInstance.get(`/donation-request?email=${user.email}`).then((res) => {
      setRequests(res.data.slice(0, 3));
      setLoader(false);
    });
  };

  useEffect(() => {
    fetchRequests();
  }, [user, axiosInstance]);

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-4 mt-4 bg-white rounded-xl"
    >
      <h2 className="text-2xl font-bold md:mb-6 md:px-4 text-[#f87898]">
        Welcome🌸 <span className="text-black">{user.name}</span>
      </h2>

      {loader ? (
        <Loader />
      ) : (
        requests.length > 0 && (
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600">
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
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                    className="hover:bg-gray-50 text-sm text-gray-700"
                  >
                    <td className="p-4 border-b border-gray-100">
                      {r.recipientName}
                    </td>
                    <td className="p-4 border-b border-gray-100">
                      {r.district}
                    </td>
                    <td className="p-4 border-b border-gray-100">
                      {r.upazila}
                    </td>
                    <td className="p-4 border-b border-gray-100 text-red-600 font-semibold text-center">
                      {r.bloodGroup}
                    </td>
                    <td className="p-4 border-b border-gray-100 text-center">
                      {r.donationDate}
                    </td>
                    <td className="p-4 border-b border-gray-100 text-center">
                      {formatTime(r.donationTime)}
                    </td>

                    <td
                      className={`p-4 border-b border-gray-100 text-center ${
                        r.status === "Pending"
                          ? "text-yellow-600"
                          : r.status === "Inprogress"
                          ? "text-green-600"
                          : r.status === "Done"
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      {r.status}
                    </td>

                    <td className="p-4 border-b border-gray-100 flex justify-end gap-2 flex-wrap font-semibold">
                      <Link
                        to={`/dashboard/donation-request/view/${r._id}`}
                        state={location.pathname}
                        className="px-2 py-1 bg-gray-400 text-white rounded text-xs"
                      >
                        View
                      </Link>

                      {r.status === "Pending" && (
                        <Link
                          to={`/dashboard/donation-request/edit/${r._id}`}
                          state={location.pathname}
                          className="px-2 py-1 bg-blue-400 text-white rounded text-xs"
                        >
                          Edit
                        </Link>
                      )}

                      {r.status === "Pending" && (
                        <button
                          onClick={() => handleDelete(r._id)}
                          className="px-2 py-1 bg-red-400 text-white rounded text-xs"
                        >
                          <GoTrash size={16} />
                        </button>
                      )}

                      {r.status === "Inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(r._id, "Done")}
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(r._id, "Canceled")
                            }
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs"
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
        )
      )}

      {requests.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="text-center mt-4 flex justify-end"
        >
          <Link
            to="/dashboard/my-donation-requests"
            className="px-4 py-2 m-4 bg-[#f87898] text-white rounded-lg font-semibold"
          >
            View All
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DonorDashboard;
