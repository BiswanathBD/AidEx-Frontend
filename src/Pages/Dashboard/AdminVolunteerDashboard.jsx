import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";

import { FaUsers, FaHandHoldingHeart } from "react-icons/fa";
import { IoWaterSharp } from "react-icons/io5";
import Loader from "../../Components/Shared/Loader";
import { motion } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";

const AdminVolunteerDashboard = () => {
  const { isDark } = useTheme();
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className={`p-4 sm:p-6 lg:p-8 mt-4 rounded-xl ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <h2 className="text-2xl font-bold md:mb-6 md:px-4">
        <span className="text-[#f87898]">Welcome🌸</span> {user.name}
      </h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid xl:grid-cols-3 gap-5 sm:gap-8 mt-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
            className="p-4 sm:p-6 lg:p-10 rounded-lg bg-linear-to-br from-blue-300/10 to-blue-500/20 flex items-center gap-4 sm:gap-8"
          >
            <div className="text-gray-500 shrink-0">
              <FaUsers className="text-4xl sm:text-5xl lg:text-6xl" />
            </div>
            <div className="flex flex-col">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                {stats.totalUsers}
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 font-semibold">
                Total Donors
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
            className="p-4 sm:p-6 lg:p-10 rounded-lg bg-linear-to-br from-green-300/10 to-green-500/20 flex items-center gap-4 sm:gap-8"
          >
            <div className="text-gray-500 shrink-0">
              <FaHandHoldingHeart className="text-4xl sm:text-5xl lg:text-6xl" />
            </div>
            <div className="flex flex-col">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                ${stats.totalFunds}
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 font-semibold">
                Total Funding
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
            className="p-4 sm:p-6 lg:p-10 rounded-lg bg-linear-to-br from-red-300/10 to-red-500/20 flex items-center gap-4 sm:gap-8"
          >
            <div className="text-gray-500 shrink-0">
              <IoWaterSharp className="text-4xl sm:text-5xl lg:text-6xl" />
            </div>
            <div className="flex flex-col">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                {stats.totalRequests}
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 font-semibold">
                Total Requests
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminVolunteerDashboard;
