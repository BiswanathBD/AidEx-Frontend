import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import useAxios from "../Hooks/useAxios";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import { GoTrash } from "react-icons/go";

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    axiosInstance.get(`/donation-request?email=${user.email}`).then((res) => {
      setRequests(res.data.slice(0, 3));
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

  if (!user) return null;

  return (
    <div className="p-4 mt-4 bg-white rounded-xl">
      <h2 className="text-2xl font-bold md:mb-6 md:px-4 text-[#f87898]">
        Welcome, {user.name} ❤️
      </h2>

      {requests.length > 0 && (
        <div className="overflow-x-auto">
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
              {requests.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="p-4 border-b border-gray-100">
                    {r.recipientName}
                  </td>
                  <td className="p-4 border-b border-gray-100">{r.district}</td>
                  <td className="p-4 border-b border-gray-100">{r.upazila}</td>
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
                      r.status.toLowerCase() === "pending"
                        ? "text-yellow-600"
                        : r.status.toLowerCase() === "inprogress"
                        ? "text-green-600"
                        : r.status.toLowerCase() === "done"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </td>

                  <td className="p-4 border-b border-gray-100 flex justify-end gap-2 flex-wrap font-semibold">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/donation-request/view/${r._id}`)
                      }
                      className="px-2 py-1 bg-gray-400 text-white rounded text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/donation-request/edit/${r._id}`)
                      }
                      disabled={r.status.toLowerCase() !== "pending"}
                      className={`px-2 py-1 rounded text-xs ${
                        r.status.toLowerCase() === "pending"
                          ? "bg-blue-400 text-white cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      disabled={r.status.toLowerCase() !== "pending"}
                      className={`px-2 py-1 rounded text-xs ${
                        r.status.toLowerCase() === "pending"
                          ? "bg-red-400 text-white cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <GoTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {requests.length > 0 && (
        <div className="text-center mt-4 flex justify-end">
          <Link
            to="/dashboard/my-donation-requests"
            className="px-4 py-2 m-4 bg-[#f87898] text-white rounded-lg font-semibold"
          >
            View All
          </Link>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
