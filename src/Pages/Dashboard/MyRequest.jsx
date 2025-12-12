import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import Swal from "sweetalert2";
import { Navigate, Link } from "react-router";

const MyRequest = () => {
  const { user, loading } = useContext(AuthContext);
  const [userRequests, setUserRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(6);
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!user?.email) return;
    axiosInstance
      .get(`/donation-request?email=${user.email}`)
      .then((res) => setUserRequests(res.data || []))
      .catch(() => setUserRequests([]));
  }, [user, axiosInstance]);

  const filteredRequests =
    filter === "all"
      ? userRequests
      : userRequests.filter((r) => r.status.toLowerCase() === filter);

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

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

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

    if (!result.isConfirmed) return;

    const toastId = toast.loading("Deleting...");
    axiosInstance
      .delete(`/donation-request/${id}`)
      .then(() => {
        setUserRequests((prev) => prev.filter((req) => req._id !== id));
        toast.success("Deleted successfully", { id: toastId });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Request has been deleted.",
          timer: 1400,
          showConfirmButton: false,
          width: "fit-content",
        });

        const newFiltered = filteredRequests.filter((r) => r._id !== id);
        const newTotalPages =
          Math.ceil(newFiltered.length / requestsPerPage) || 1;
        if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
      })
      .catch(() => {
        toast.error("Delete failed", { id: toastId });
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to delete request!",
          width: "fit-content",
        });
      });
  };

  if (loading) return null;
  if (!user) return null;
  if (user.role !== "Donor") return <Navigate to={"/dashboard"} />;

  return (
    <div className="p-4 mt-4 bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-6 px-4 text-[#f87898]">
        My Donation Request
      </h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
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

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="p-4 rounded-l-2xl">Recipient</th>
              <th className="p-4">District</th>
              <th className="p-4">Upazila</th>
              <th className="p-4">Hospital</th>
              <th className="p-4">Blood Group</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 rounded-r-2xl">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentRequests.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="p-4 text-center text-gray-500 border-b border-gray-200"
                >
                  No donation requests found.
                </td>
              </tr>
            ) : (
              currentRequests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="p-4 border-b border-gray-100">
                    {req.recipientName}
                  </td>
                  <td className="p-4 border-b border-gray-100">
                    {req.district}
                  </td>
                  <td className="p-4 border-b border-gray-100">
                    {req.upazila}
                  </td>
                  <td className="p-4 border-b border-gray-100">
                    {req.hospital}
                  </td>
                  <td className="p-4 border-b border-gray-100">
                    {req.bloodGroup}
                  </td>
                  <td className="p-4 border-b border-gray-100">
                    {req.donationDate}
                  </td>
                  <td className="p-4 border-b border-gray-100">
                    {formatTime(req.donationTime)}
                  </td>

                  <td
                    className={`p-4 border-b border-gray-100 text-center ${
                      req.status.toLowerCase() === "pending"
                        ? "text-yellow-600"
                        : req.status.toLowerCase() === "inprogress"
                        ? "text-green-600"
                        : req.status.toLowerCase() === "done"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {req.status}
                  </td>

                  <td className="p-4 border-b border-gray-100">
                    <div className="flex gap-2 justify-end">
                      <Link
                        to={`/dashboard/donation-request/view/${req._id}`}
                        className="px-2 py-1 bg-gray-400 text-white rounded text-xs"
                      >
                        View
                      </Link>

                      <Link
                        to={`/dashboard/donation-request/edit/${req._id}`}
                        className={`px-2 py-1 rounded text-xs ${
                          req.status.toLowerCase() === "pending"
                            ? "bg-blue-400 text-white cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                        }`}
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(req._id)}
                        disabled={req.status.toLowerCase() !== "pending"}
                        className={`px-2 py-1 rounded text-xs ${
                          req.status.toLowerCase() === "pending"
                            ? "bg-red-400 text-white cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <GoTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
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
    </div>
  );
};

export default MyRequest;
