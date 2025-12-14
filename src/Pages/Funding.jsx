import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Shared/Loader";

const Funding = () => {
  const axiosInstance = useAxios();
  const [funds, setFunds] = useState([]);
  const [loader, setLoader] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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

  return (
    <div>
      <div className="flex justify-between items-center px-4">
        <h2 className="text-2xl font-bold text-[#f87898]">Funding</h2>
        <button className="btn-primary">Give Fund</button>
      </div>

      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="bg-white p-2 rounded-xl mt-4 overflow-x-auto">
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
                {currentFunds.map((fund) => (
                  <tr
                    key={fund._id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <td className="p-2 m-1">
                      <div className="flex gap-3 items-center">
                        <img
                          className="w-8 aspect-square object-cover rounded-full"
                          src={fund.avatar}
                          alt={fund.name}
                        />
                        <span className="font-medium text-gray-800">
                          {fund.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-center text-gray-600">
                      {fund.fundingDate}
                    </td>

                    <td className="p-4 text-center">
                      <span className="text-xl font-bold text-[#f87898]">
                        {fund.fundAmount}
                        <sup className="text-sm text-gray-400 mr-1">$</sup>
                      </span>
                    </td>
                  </tr>
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
        </>
      )}
    </div>
  );
};

export default Funding;
