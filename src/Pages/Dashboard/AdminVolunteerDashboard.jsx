import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";

// Icons
import { FaUsers, FaHandHoldingHeart } from "react-icons/fa";
import { IoWaterSharp } from "react-icons/io5";
import Loader from "../../Components/Shared/Loader";

const AdminVolunteerDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunds: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    axiosInstance.get("/statics").then((res) => {
      setStats(res.data);
      setLoading(false);
    });
  }, [axiosInstance]);

  if (!user) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 mt-4 bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-6 px-4 text-[#f87898]">
        Welcome, {user.name} ❤️
      </h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid xl:grid-cols-3 gap-5 sm:gap-8 mt-6">
          {/* Total Donors */}
          <div className="p-4 sm:p-6 lg:p-10 rounded-lg bg-linear-to-br from-blue-50/50 to-blue-100 flex items-center gap-4 sm:gap-8 hover:scale-[1.01] transition">
            <div className="text-gray-500 shrink-0">
              <FaUsers className="text-4xl sm:text-5xl lg:text-6xl" />
            </div>

            <div className="flex flex-col">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
                {stats.totalUsers}
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 font-semibold">
                Total Donors
              </p>
            </div>
          </div>

          {/* Total Funding */}
          <div className="p-4 sm:p-6 lg:p-10 rounded-lg bg-linear-to-br from-green-50/50 to-green-100 flex items-center gap-4 sm:gap-8 hover:scale-[1.01] transition">
            <div className="text-gray-500 shrink-0">
              <FaHandHoldingHeart className="text-4xl sm:text-5xl lg:text-6xl" />
            </div>

            <div className="flex flex-col">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
                ${stats.totalFunds}
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 font-semibold">
                Total Funding
              </p>
            </div>
          </div>

          {/* Total Requests */}
          <div className="p-4 sm:p-6 lg:p-10 rounded-lg bg-linear-to-br from-red-50/50 to-red-100 flex items-center gap-4 sm:gap-8 hover:scale-[1.01] transition">
            <div className="text-gray-500 shrink-0">
              <IoWaterSharp className="text-4xl sm:text-5xl lg:text-6xl" />
            </div>

            <div className="flex flex-col">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
                {stats.totalRequests}
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 font-semibold">
                Total Requests
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVolunteerDashboard;
