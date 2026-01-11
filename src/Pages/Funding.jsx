import React, { useContext, useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Shared/Loader";
import { AuthContext } from "../Auth/AuthContext";
import { motion } from "framer-motion";
import { FaDollarSign } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";
motion;

const Funding = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const axiosInstance = useAxios();
  const [funds, setFunds] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axiosInstance
      .get("/funds")
      .then((res) => {
        setFunds(res.data);
        setLoader(false);
      })
      .catch(() => setLoader(false));
  }, [axiosInstance]);

  const totalPages = Math.ceil(funds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFunds = funds.slice(startIndex, startIndex + itemsPerPage);

  const handleContinue = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/payment-checkout-session", {
        amount: Number(e.target.amount.value),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      })
      .then((res) => (window.location.href = res.data.url));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`${isDark ? "text-gray-200" : "text-gray-800"} min-h-screen`}
    >
      {/* Title Section */}
      <div className="text-center mb-4 sm:mb-8">
        <div className="flex justify-center mb-4">
          <div
            className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
              isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/5"
            }`}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl sm:text-3xl text-[#f87898]"
            >
              <FaDollarSign />
            </motion.div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          <span className={isDark ? "text-white" : "text-black/80"}>
            Funding
          </span>{" "}
          <span className="text-[#f87898]">History</span>
        </h2>
        <p
          className={`max-w-2xl mx-auto text-sm sm:text-base ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Review all your past funding contributions and manage donations
          easily.
        </p>
      </div>

      {/* Give Fund Button */}
      <div className="flex justify-end">
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Give Fund
        </button>
      </div>

      {/* Loader / Table */}
      {loader ? (
        <Loader />
      ) : funds.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className={`rounded-xl mt-6 pb-2 overflow-x-auto overflow-y-hidden ${
              isDark ? "bg-black" : "bg-white"
            }`}
          >
            <table className="w-full border-collapse">
              <thead className="bg-[#f87898] text-white text-lg">
                <tr>
                  <th className="p-4 text-left font-semibold px-8">Donor</th>
                  <th className="p-4 text-center font-semibold">Date</th>
                  <th className="p-4 text-center font-semibold">Amount</th>
                </tr>
              </thead>

              <tbody>
                {currentFunds.map((fund, index) => (
                  <motion.tr
                    key={fund._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className={`border-b last:border-b-0 ${
                      isDark ? "border-white/10" : "border-gray-100"
                    }`}
                  >
                    <td className="p-2 m-1">
                      <div className="flex gap-3 items-center px-4">
                        <img
                          className="w-8 border border-[#f87898] p-px aspect-square object-cover rounded-full"
                          src={fund.avatar}
                          alt={fund.donorName}
                        />
                        <span
                          className={isDark ? "text-gray-200" : "text-gray-800"}
                        >
                          {fund.donorName}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`p-4 text-center ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {fund.fundingDate.split("T")[0]}
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-xl font-bold text-[#f87898]">
                        {fund.amount}
                        <sup
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-400"
                          } mr-1`}
                        >
                          $
                        </sup>
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination with < and > */}
          {/* Pagination with < and > */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap px-4">
              {/* Previous */}
              <motion.button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                className={`w-10 h-10 rounded-lg text-lg font-bold flex items-center justify-center transition-all duration-300 ${
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

              {/* Page Numbers (max 5) */}
              {(() => {
                const visiblePages = 5;
                let startPage = Math.max(currentPage - 2, 1);
                let endPage = startPage + visiblePages - 1;

                if (endPage > totalPages) {
                  endPage = totalPages;
                  startPage = Math.max(endPage - visiblePages + 1, 1);
                }

                return Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i
                ).map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold flex items-center justify-center transition-all duration-300 ${
                      currentPage === page
                        ? "bg-linear-to-r from-[#f87898] to-[#f45f7b] text-white shadow-lg shadow-[#f87898]/30"
                        : isDark
                        ? "bg-black text-gray-300 hover:bg-[#f87898]/10 hover:text-white"
                        : "bg-white text-gray-600 hover:bg-[#f87898]/5 hover:text-[#f87898]"
                    }`}
                  >
                    {page}
                  </motion.button>
                ));
              })()}

              {/* Next */}
              <motion.button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                className={`w-10 h-10 rounded-lg text-lg font-bold flex items-center justify-center transition-all duration-300 ${
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
        </motion.div>
      ) : (
        <div
          className={`text-center py-12 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          No funding history found.
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed flex justify-center items-start z-50"
          >
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 24, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl shadow-xl w-full max-w-md sm:w-md m-4 bg-[#f87898] text-white"
            >
              <h2 className="text-2xl font-bold mb-2">Give Fund</h2>
              <p className="mb-4">
                By: <span className="font-medium">{user.name}</span>
              </p>

              <form onSubmit={handleContinue}>
                <input
                  name="amount"
                  type="number"
                  min={1}
                  placeholder="Enter Amount"
                  required
                  className="rounded px-4 py-3 text-xl font-bold mt-1 w-full bg-white! placeholder:text-[#f87898]/50! text-[#f87898]! focus:outline-none"
                />

                <div className="flex justify-between gap-4 font-semibold mt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full px-3 py-2 rounded border border-white text-white hover:bg-white/5 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full px-3 py-2 rounded bg-white text-[#f87898] hover:bg-white/90 text-center"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Funding;
