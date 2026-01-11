import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import useAxios from "../Hooks/useAxios";
import { BsClockFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import DonationRequestSkeleton from "../Components/Shared/DonationRequestSkeleton";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";
motion;

const DonationRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loader, setLoader] = useState(true);
  const location = useLocation();
  const { isDark } = useTheme();

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Applied filter states (only updated when buttons are clicked)
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [appliedBloodGroup, setAppliedBloodGroup] = useState("");
  const [appliedDistrict, setAppliedDistrict] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 12;

  const axiosInstance = useAxios();

  // Get unique values for filter options
  const bloodGroups = [...new Set(pendingRequests.map((req) => req.bloodGroup))]
    .filter(Boolean)
    .sort();
  const districts = [...new Set(pendingRequests.map((req) => req.district))]
    .filter(Boolean)
    .sort();

  useEffect(() => {
    axiosInstance
      .get("/pendingRequests")
      .then((res) => {
        setPendingRequests(res.data);
        setLoader(false);
      })
      .catch(() => setLoader(false));
  }, [axiosInstance]);

  // Filter and search functionality using useMemo for better performance
  const filteredRequests = React.useMemo(() => {
    let filtered = [...pendingRequests];

    // Search by recipient name only (using applied search term)
    if (appliedSearchTerm) {
      filtered = filtered.filter((req) =>
        req.recipientName
          ?.toLowerCase()
          .includes(appliedSearchTerm.toLowerCase())
      );
    }

    // Filter by blood group (using applied blood group)
    if (appliedBloodGroup) {
      filtered = filtered.filter((req) => req.bloodGroup === appliedBloodGroup);
    }

    // Filter by district (using applied district)
    if (appliedDistrict) {
      filtered = filtered.filter((req) => req.district === appliedDistrict);
    }

    // Sort functionality
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.donationDate) - new Date(a.donationDate)
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) => new Date(a.donationDate) - new Date(b.donationDate)
        );
        break;
      case "bloodGroup":
        filtered.sort((a, b) =>
          (a.bloodGroup || "").localeCompare(b.bloodGroup || "")
        );
        break;
      case "location":
        filtered.sort((a, b) =>
          (a.district || "").localeCompare(b.district || "")
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [
    pendingRequests,
    appliedSearchTerm,
    appliedBloodGroup,
    appliedDistrict,
    sortBy,
  ]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [appliedSearchTerm, appliedBloodGroup, appliedDistrict, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBloodGroup("");
    setSelectedDistrict("");
    setSortBy("newest");
    setAppliedSearchTerm("");
    setAppliedBloodGroup("");
    setAppliedDistrict("");
  };

  // Handle search button click
  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm);
  };

  // Handle filter button click
  const handleFilter = () => {
    setAppliedBloodGroup(selectedBloodGroup);
    setAppliedDistrict(selectedDistrict);
  };

  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);
  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);

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
          <span className={isDark ? "text-white" : "text-black/80"}>
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

      {/* Search, Filter, and Sort Section */}
      <div className="mb-8 space-y-6">
        {/* Clear Filters - Top Right */}
        {(appliedSearchTerm ||
          appliedBloodGroup ||
          appliedDistrict ||
          sortBy !== "newest") && (
          <div className="flex justify-end">
            <button
              onClick={clearFilters}
              className={`text-xs font-semibold px-3 py-1 rounded-md transition-all duration-300 bg-[#e91e63] hover:bg-[#e91e63]/80 mx-2 -mb-2`}
            >
              ✕ Clear All
            </button>
          </div>
        )}
        {/* Large screens: All in one line */}
        <div className="hidden xl:block">
          <div className="grid grid-cols-5 gap-6">
            {/* Search Card - 2 columns */}
            <div
              className={`col-span-2 p-6 rounded-2xl ${
                isDark ? "bg-black" : "bg-white"
              }`}
            >
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <FaSearch
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Enter recipient name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12!"
                  />
                </div>
                <button className="btn-primary" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>

            {/* Filter Card - 2 columns */}
            <div
              className={`col-span-2 p-6 rounded-2xl ${
                isDark ? "bg-black" : "bg-white"
              }`}
            >
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <select
                    value={selectedBloodGroup}
                    onChange={(e) => setSelectedBloodGroup(e.target.value)}
                  >
                    <option value="">All Blood Groups</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                  >
                    <option value="">All Districts</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn-primary" onClick={handleFilter}>
                  Filter
                </button>
              </div>
            </div>

            {/* Sort Card - 1 column */}
            <div
              className={`col-span-1 p-6 rounded-2xl ${
                isDark ? "bg-black" : "bg-white"
              }`}
            >
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="bloodGroup">Blood Group</option>
                  <option value="location">Location</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Medium and small screens: Search + Sort on top, Filter below */}
        <div className="xl:hidden space-y-6">
          {/* Search and Sort Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Search Card */}
            <div
              className={`p-6 rounded-2xl ${isDark ? "bg-black" : "bg-white"}`}
            >
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <FaSearch
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Enter recipient name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12!"
                  />
                </div>
                <button className="btn-primary" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>

            {/* Sort Card */}
            <div
              className={`p-6 rounded-2xl ${isDark ? "bg-black" : "bg-white"}`}
            >
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="bloodGroup">Blood Group</option>
                  <option value="location">Location</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Row */}
          <div>
            <div
              className={`p-6 rounded-2xl ${isDark ? "bg-black" : "bg-white"}`}
            >
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <select
                    value={selectedBloodGroup}
                    onChange={(e) => setSelectedBloodGroup(e.target.value)}
                  >
                    <option value="">All Blood Groups</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                  >
                    <option value="">All Districts</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn-primary" onClick={handleFilter}>
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loader && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 mt-20">
          {/* Show 8 skeleton loaders */}
          {Array.from({ length: 8 }).map((_, index) => (
            <DonationRequestSkeleton key={index} />
          ))}
        </div>
      )}

      {!loader && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 mt-20">
          {currentRequests.length === 0 ? (
            <div
              className={`col-span-full text-center py-12 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="mb-4 text-4xl">🩸</div>
              {filteredRequests.length === 0 && pendingRequests.length > 0 ? (
                <>
                  <p className="text-lg font-semibold mb-2">
                    No requests match your filters
                  </p>
                  <p className="text-sm">Try adjusting your search criteria</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold mb-2">
                    No pending donation requests
                  </p>
                  <p className="text-sm">
                    Check back later for new requests in your area
                  </p>
                </>
              )}
            </div>
          ) : (
            currentRequests.map((req) => (
              <motion.div
                key={req._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                className={`relative rounded-3xl p-8 transition-all duration-300 group text-center my-12 hover:scale-105 hover:-translate-y-2 ${
                  isDark
                    ? "bg-linear-to-t from-black to-[#f87898]/5"
                    : "bg-white"
                }`}
              >
                {/* Large circular blood group - positioned outside card */}
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-42 h-42 rounded-full flex items-center justify-center text-5xl font-black transition-all duration-300 group-hover:scale-105 ${
                      isDark
                        ? "bg-linear-to-br from-[#f87898] via-[#f45f7b] to-[#e91e63] text-white shadow-2xl shadow-[#f87898]/30"
                        : "bg-linear-to-br from-[#f87898] via-[#f45f7b] to-[#e91e63] text-white shadow-2xl shadow-[#f87898]/30"
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
                  ? "bg-black/50 text-gray-600 cursor-not-allowed"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isDark
                ? "bg-black text-gray-300 hover:bg-[#f87898]/10 hover:text-white"
                : "bg-white text-gray-600 hover:bg-[#f87898]/5 hover:text-[#f87898]"
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
                    ? "bg-black text-gray-300 hover:bg-[#f87898]/10 hover:text-white"
                    : "bg-white text-gray-600 hover:bg-[#f87898]/5 hover:text-[#f87898]"
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
                  ? "bg-black/50 text-gray-600 cursor-not-allowed"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isDark
                ? "bg-black text-gray-300 hover:bg-[#f87898]/10 hover:text-white"
                : "bg-white text-gray-600 hover:bg-[#f87898]/5 hover:text-[#f87898]"
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
