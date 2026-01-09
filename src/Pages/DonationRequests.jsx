import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import useAxios from "../Hooks/useAxios";
import { BsClockFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import Loader from "../Components/Shared/Loader";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";
motion;

const DonationRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loader, setLoader] = useState(true);
  const location = useLocation();
  const { isDark } = useTheme();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 8;

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
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex justify-center mb-4">
          <div
            className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
              isDark ? "bg-[#f87898]/10" : "bg-[#f87898]/5"
            }`}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl sm:text-3xl"
            >
              🩸
            </motion.div>
          </div>
        </div>
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${
            isDark ? "text-white" : "text-white/90"
          }`}
        >
          <span className={isDark ? "text-white" : "text-white/90"}>
            Blood Donation
          </span>{" "}
          <span className="text-[#f87898]">Requests</span>
        </h2>
        <p
          className={`max-w-2xl mx-auto text-sm sm:text-base ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Help save lives by responding to urgent blood donation requests in
          your area
        </p>
      </div>

      {loader && <Loader />}

      {!loader && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 mt-20">
          {currentRequests.length === 0 ? (
            <div
              className={`col-span-full text-center py-12 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="mb-4 text-4xl">🩸</div>
              <p className="text-lg font-semibold mb-2">
                No pending donation requests
              </p>
              <p className="text-sm">
                Check back later for new requests in your area
              </p>
            </div>
          ) : (
            currentRequests.map((req, index) => (
              <motion.div
                key={req._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className={`relative rounded-3xl p-8 transition-all duration-300 group text-center my-12 hover:scale-105 hover:-translate-y-2 ${
                  isDark
                    ? "bg-linear-to-t from-black to-[#f87898]/5 shadow-2xl shadow-black/50"
                    : "bg-white shadow-2xl shadow-gray-200/50"
                }`}
              >
                {/* Large circular blood group - positioned outside card */}
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-42 h-42 rounded-full flex items-center justify-center text-5xl font-black transition-all duration-300 group-hover:scale-105 ${
                      isDark
                        ? "bg-gradient-to-br from-[#f87898] via-[#f45f7b] to-[#e91e63] text-white shadow-2xl shadow-[#f87898]/30"
                        : "bg-gradient-to-br from-[#f87898] via-[#f45f7b] to-[#e91e63] text-white shadow-2xl shadow-[#f87898]/30"
                    }`}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-[#f87898] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <span className="relative z-10">{req.bloodGroup}</span>
                  </div>
                </div>

                {/* Content with top padding to account for circle */}
                <div className="pt-20">
                  {/* Recipient name */}
                  <h3
                    className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                      isDark ? "text-white" : "text-black/90"
                    }`}
                  >
                    {req.recipientName}
                  </h3>

                  {/* Details section */}
                  <div className="space-y-3 mb-8">
                    {/* Location */}
                    <div
                      className={`flex items-center justify-center gap-2 text-sm ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#f87898]/10">
                        <FaLocationDot className="text-[#f87898] text-xs" />
                      </div>
                      <span className="font-medium">
                        {req.upazila}, {req.district}
                      </span>
                    </div>

                    {/* Time */}
                    <div
                      className={`flex items-center justify-center gap-2 text-sm ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#f87898]/10">
                        <BsClockFill className="text-[#f87898] text-xs" />
                      </div>
                      <span className="font-medium">
                        {req.donationTime ? formatTime(req.donationTime) : "-"},{" "}
                        {req.donationDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main CTA button */}
                <Link
                  to={`/request/view/${req._id}`}
                  state={location.pathname}
                  className="block w-full"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary w-full"
                  >
                    View Details
                  </motion.button>
                </Link>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-[#f87898] rounded-full opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-[#f87898] rounded-full opacity-40"></div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Enhanced pagination with prev/next buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap px-4">
          {/* Previous button */}
          <motion.button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
            className={`w-10 h-10 rounded-lg text-lg font-bold transition-all duration-300 flex items-center justify-center ${
              currentPage === 1
                ? isDark
                  ? "bg-black/50 text-gray-600 border border-gray-700 cursor-not-allowed"
                  : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                : isDark
                ? "bg-black text-gray-300 border border-[#f87898]/20 hover:bg-[#f87898]/10 hover:border-[#f87898]/40 hover:text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-[#f87898]/5 hover:border-[#f87898]/30 hover:text-[#f87898] shadow-sm hover:shadow-md"
            }`}
          >
            ‹
          </motion.button>

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
              <motion.button
                key={page}
                onClick={() => handlePageChange(page)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-300 overflow-hidden flex items-center justify-center ${
                  currentPage === page
                    ? "bg-linear-to-r from-[#f87898] to-[#f45f7b] text-white shadow-lg shadow-[#f87898]/30"
                    : isDark
                    ? "bg-black text-gray-300 border border-[#f87898]/20 hover:bg-[#f87898]/10 hover:border-[#f87898]/40 hover:text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-[#f87898]/5 hover:border-[#f87898]/30 hover:text-[#f87898] shadow-sm hover:shadow-md"
                }`}
              >
                {currentPage === page && (
                  <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent"></div>
                )}
                <span className="relative z-10">{page}</span>
              </motion.button>
            ));
          })()}

          {/* Next button */}
          <motion.button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
            className={`w-10 h-10 rounded-lg text-lg font-bold transition-all duration-300 flex items-center justify-center ${
              currentPage === totalPages
                ? isDark
                  ? "bg-black/50 text-gray-600 border border-gray-700 cursor-not-allowed"
                  : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                : isDark
                ? "bg-black text-gray-300 border border-[#f87898]/20 hover:bg-[#f87898]/10 hover:border-[#f87898]/40 hover:text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-[#f87898]/5 hover:border-[#f87898]/30 hover:text-[#f87898] shadow-sm hover:shadow-md"
            }`}
          >
            ›
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
