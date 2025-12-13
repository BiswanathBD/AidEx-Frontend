import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../Hooks/useAxios";
import { BsClockFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import Loader from "../Components/Shared/Loader";

const DonationRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loader, setLoader] = useState(true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 12;

  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/pendingRequests")
      .then((res) => {
        setPendingRequests(res.data);
        setLoader(false);
      })
      .catch(() => setLoader(false));
  }, [axiosInstance]);

  const totalPages = Math.ceil(pendingRequests.length / requestsPerPage);
  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = pendingRequests.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 px-4 text-[#f87898]">
        Blood Donation Requests
      </h2>

      {loader && <Loader />}

      {!loader && (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 text-nowrap">
          {currentRequests.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 font-semibold">
              No pending donation requests.
            </p>
          ) : (
            currentRequests.map((req) => (
              <div
                key={req._id}
                className="flex flex-col sm:flex-row rounded-xl p-4 bg-white overflow-hidden"
              >
                {/* blood group */}
                <div className="h-full aspect-square flex items-center justify-center rounded-lg bg-[#f87898]/20 text-[#f87898] font-extrabold text-4xl mb-4 sm:mb-0 sm:mr-4">
                  {req.bloodGroup}
                </div>

                {/* content */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {req.recipientName}
                    </h3>

                    <p className="text-gray-600 mb-1 flex items-center gap-1 text-sm sm:text-base">
                      <FaLocationDot color="#f87898" />
                      <span>
                        {req.upazila}, {req.district}
                      </span>
                    </p>

                    <p className="text-gray-600 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <BsClockFill color="#f87898" />
                      <span>
                        {req.donationTime ? formatTime(req.donationTime) : "-"},{" "}
                        {req.donationDate}
                      </span>
                    </p>
                  </div>

                  <Link
                    to={`/request/view/${req._id}`}
                    className="px-3 py-1.5 text-white font-semibold rounded bg-[#f87898] hover:bg-[#f45f7b] transition duration-200 text-center mt-2 mb-0.5"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-6 flex-wrap px-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
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
  );
};

export default DonationRequests;
