import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { GoTrash } from "react-icons/go";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router";
import Loader from "../../Components/Shared/Loader";

const MyRequest = () => {
  const { user, loading } = useContext(AuthContext);
  const [userRequests, setUserRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 6;
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const fetchRequests = () => {
    if (!user?.email) return;
    axiosInstance
      .get(`/donation-request?email=${user.email}`)
      .then((res) => {
        setUserRequests(res.data);
        setLoader(false);
      })
      .catch(() => setUserRequests([]));
  };

  useEffect(() => {
    fetchRequests();
  }, [user, axiosInstance]);

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
  if (user.role !== "Donor") return <Navigate to="/dashboard" />;

  return (
    <div className="p-4 mt-4 bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-6 px-4 text-[#f87898]">
        My Donation Request
      </h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        {["All", "Pending", "Inprogress", "Done", "Canceled"].map((s) => (
          <button
            key={s}
            onClick={() => {
              setFilter(s);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-sm border ${
              filter === s
                ? "bg-[#f87898] text-white border-[#f87898]"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-600">
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

          <tbody>
            {loader ? (
              <tr>
                <td colSpan={8}>
                  <Loader />
                </td>
              </tr>
            ) : currentRequests.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-500">
                  No donation requests found.
                </td>
              </tr>
            ) : (
              currentRequests.map((req) => (
                <tr key={req._id} className="text-sm text-gray-700">
                  <td className="p-4">{req.recipientName}</td>
                  <td className="p-4">{req.district}</td>
                  <td className="p-4">{req.upazila}</td>
                  <td className="p-4">{req.bloodGroup}</td>
                  <td className="p-4">{req.donationDate}</td>
                  <td className="p-4">{formatTime(req.donationTime)}</td>

                  <td
                    className={`p-4 border-b border-gray-100 text-center ${
                      req.status === "Pending"
                        ? "text-yellow-600"
                        : req.status === "Inprogress"
                        ? "text-green-600"
                        : req.status === "Done"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {req.status}
                  </td>

                  <td className="p-4 flex justify-end gap-2">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/donation-request/view/${req._id}`)
                      }
                      className="px-2 py-1 bg-gray-400 text-white rounded text-xs"
                    >
                      View
                    </button>

                    {req.status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/donation-request/edit/${req._id}`
                            )
                          }
                          className="px-2 py-1 bg-blue-400 text-white rounded text-xs"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(req._id)}
                          className="px-2 py-1 bg-red-400 text-white rounded text-xs"
                        >
                          <GoTrash size={16} />
                        </button>
                      </>
                    )}

                    {req.status === "Inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(req._id, "Done")}
                          className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "Canceled")
                          }
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-end mt-6 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  currentPage === page
                    ? "bg-[#f87898] text-white border-[#f87898]"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequest;
