import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import Swal from "sweetalert2";

const MyRequest = () => {
  const { user } = useContext(AuthContext);
  const [userRequests, setUserRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!user?.email) return;
    const fetchRequests = async () => {
      const res = await axiosInstance.get(
        `/donation-request?email=${user.email}`
      );
      setUserRequests(res.data);
    };
    fetchRequests();
  }, [user, axiosInstance]);

  const filteredRequests =
    filter === "all"
      ? userRequests
      : userRequests.filter((r) => r.status.toLowerCase() === filter);

  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
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
      try {
        const res = await axiosInstance.delete(`/donation-request/${id}`);
        if (res.status === 200) {
          setUserRequests((prev) => prev.filter((req) => req._id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Request has been deleted.",
            timer: 1500,
            showConfirmButton: false,
            width: "fit-content",
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to delete request!",
          width: "fit-content",
        });
      }
    }
  };

  return (
    <div className="p-4 mt-4 bg-white rounded-xl shadow-sm">
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
                  colSpan={8}
                  className="p-4 text-center text-gray-500 border-b border-gray-200"
                >
                  No donation requests found.
                </td>
              </tr>
            ) : (
              currentRequests.map((req, i) => (
                <tr key={i} className="hover:bg-gray-50 text-sm text-gray-700">
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
                    {req.donationTime}
                  </td>
                  <td
                    className={`p-4 border-b border-gray-100 text-center
                    ${
                      (req.status === "Pending" && "text-yellow-600") ||
                      (req.status === "Inprogress" && "text-green-600") ||
                      (req.status === "Done" && "text-blue-600") ||
                      (req.status === "Canceled" && "text-red-600")
                    }
                    `}
                  >
                    {req.status}
                  </td>
                  <td className="p-4 border-b border-gray-100">
                    <button className="w-full cursor-default!">
                      <GoTrash
                        onClick={() => handleDelete(req._id)}
                        size={20}
                        color="red"
                        className="mx-auto cursor-pointer!"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
