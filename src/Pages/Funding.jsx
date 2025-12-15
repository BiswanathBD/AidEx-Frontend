import React, { useContext, useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Shared/Loader";
import { AuthContext } from "../Auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
motion;

const Funding = () => {
  const { user } = useContext(AuthContext);
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

  // handle stripe payment
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

  return (
    <div>
      <div className="flex justify-between items-center px-4 mb-8">
        <h2 className="text-2xl font-bold text-[#f87898]">
          <span className="text-black">Funding</span> History
        </h2>

        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Give Fund
        </button>
      </div>

      {loader ? (
        <Loader />
      ) : (
        funds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="bg-white p-2 rounded-xl mt-4 overflow-x-auto overflow-y-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#f87898]/20">
                    <th className="p-4 text-left text-gray-600 font-semibold">
                      Donor
                    </th>
                    <th className="p-4 text-center text-gray-600 font-semibold">
                      Date
                    </th>
                    <th className="p-4 text-center text-gray-600 font-semibold">
                      Amount
                    </th>
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
                        delay: index * 0.2,
                        ease: "easeOut",
                      }}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <td className="p-2 m-1">
                        <div className="flex gap-3 items-center">
                          <img
                            className="w-8 border border-[#f87898] p-px aspect-square object-cover rounded-full"
                            src={fund.avatar}
                            alt={fund.donorName}
                          />
                          <span className="font-medium text-gray-800">
                            {fund.donorName}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-center text-gray-600">
                        {fund.fundingDate.split("T")[0]}
                      </td>

                      <td className="p-4 text-center">
                        <span className="text-xl font-bold text-[#f87898]">
                          {fund.amount}
                          <sup className="text-sm text-gray-400 mr-1">$</sup>
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            {totalPages > 1 && (
              <div className="flex justify-end gap-2 mt-6 flex-wrap px-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
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
                  )
                )}
              </div>
            )}
          </motion.div>
        )
      )}

      {/* modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 right-1/2 translate-x-1/2 flex justify-center items-start z-50"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#f87898] p-6 rounded-2xl shadow-lg w-80"
            >
              <h2 className="text-2xl font-bold text-white">Give Fund</h2>
              <p className="text-white mb-2">
                By: <span className="font-medium">{user.name}</span>
              </p>

              <form onSubmit={handleContinue}>
                <input
                  name="amount"
                  type="number"
                  min={1}
                  placeholder="Enter Amount"
                  required
                  className="rounded px-4 py-3 text-2xl font-bold w-full mt-1 bg-white placeholder:text-[#f87898]/50 text-[#f87898] focus:outline-none"
                />

                <div className="flex justify-between gap-4 font-semibold">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full border border-white text-white py-2 rounded mt-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-white text-[#f87898] py-2 rounded mt-4"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Funding;
