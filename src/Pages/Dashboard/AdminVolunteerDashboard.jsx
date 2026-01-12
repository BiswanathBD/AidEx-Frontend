import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";

import { FaUsers, FaHandHoldingHeart, FaHome } from "react-icons/fa";
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

  const [chartData, setChartData] = useState({
    requestsByStatus: [
      { status: "Pending", count: 15, percentage: "30.0" },
      { status: "Done", count: 25, percentage: "50.0" },
      { status: "Inprogress", count: 8, percentage: "16.0" },
      { status: "Canceled", count: 2, percentage: "4.0" },
    ],
    usersByRole: [
      { role: "Donor", count: 45, percentage: "70.3" },
      { role: "Volunteer", count: 12, percentage: "18.8" },
      { role: "Admin", count: 7, percentage: "10.9" },
    ],
    monthlyRequests: [
      { month: "Aug 2024", count: 8 },
      { month: "Sep 2024", count: 12 },
      { month: "Oct 2024", count: 15 },
      { month: "Nov 2024", count: 10 },
      { month: "Dec 2024", count: 18 },
      { month: "Jan 2025", count: 14 },
    ],
    bloodGroupDistribution: [
      { bloodGroup: "A+", count: 12, percentage: "23.1" },
      { bloodGroup: "B+", count: 10, percentage: "19.2" },
      { bloodGroup: "O+", count: 15, percentage: "28.8" },
      { bloodGroup: "AB+", count: 5, percentage: "9.6" },
      { bloodGroup: "A-", count: 3, percentage: "5.8" },
      { bloodGroup: "B-", count: 2, percentage: "3.8" },
      { bloodGroup: "O-", count: 4, percentage: "7.7" },
      { bloodGroup: "AB-", count: 1, percentage: "1.9" },
    ],
  });

  useEffect(() => {
    axiosInstance
      .get("/statics")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        setLoading(false);
      });
  }, [axiosInstance]);

  if (!user) return null;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <FaHome className="text-[#f87898] text-xl sm:text-2xl lg:text-3xl" />
          <span>
            <span className="text-[#f87898]">Welcome</span> {user.name}
          </span>
        </h1>
        <p
          className={`text-base sm:text-lg ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Overview of platform statistics and activity
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-6">
            {/* Statistics Section */}
            <div
              className={`p-4 sm:p-6 lg:p-8 rounded-xl group hover:scale-101 transition-all duration-300 ${
                isDark
                  ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                  : "bg-white"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Platform Statistics
              </h2>
              <div className="grid xl:grid-cols-3 gap-5 sm:gap-8">
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
            </div>

            {/* Charts Section */}
            <div
              className={`p-4 sm:p-6 lg:p-8 rounded-xl group hover:scale-101 transition-all duration-300 ${
                isDark
                  ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                  : "bg-white"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Analytics & Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Request Status Minimal Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className={`p-6 rounded-2xl group hover:scale-101 transition-all duration-300 ${
                    isDark
                      ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                      : "bg-white"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-6 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Request Status
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-4">
                      {chartData.requestsByStatus.map((item, index) => {
                        const colors = [
                          "#f87898",
                          "#10b981",
                          "#3b82f6",
                          "#ef4444",
                        ];
                        const color = colors[index % colors.length];
                        const circumference = 2 * Math.PI * 35;
                        const strokeDasharray = `${
                          (item.percentage / 100) * circumference
                        } ${circumference}`;
                        const rotation = chartData.requestsByStatus
                          .slice(0, index)
                          .reduce(
                            (acc, prev) => acc + (prev.percentage / 100) * 360,
                            0
                          );

                        return (
                          <motion.svg
                            key={item.status}
                            className="absolute inset-0 w-full h-full transform -rotate-90"
                            style={{ transform: `rotate(${rotation - 90}deg)` }}
                            initial={{ strokeDasharray: `0 ${circumference}` }}
                            animate={{ strokeDasharray }}
                            transition={{
                              duration: 1.2,
                              delay: 0.5 + index * 0.1,
                            }}
                          >
                            <circle
                              cx="48"
                              cy="48"
                              r="35"
                              fill="none"
                              stroke={color}
                              strokeWidth="5"
                              strokeDasharray={strokeDasharray}
                              strokeLinecap="round"
                              opacity="0.9"
                            />
                          </motion.svg>
                        );
                      })}
                    </div>
                    <div className="space-y-2 w-full">
                      {chartData.requestsByStatus.map((item, index) => {
                        const colors = [
                          "#f87898",
                          "#10b981",
                          "#3b82f6",
                          "#ef4444",
                        ];
                        const color = colors[index % colors.length];
                        return (
                          <motion.div
                            key={item.status}
                            className="flex items-center justify-between"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.8 + index * 0.1,
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: color }}
                              ></div>
                              <span
                                className={`text-xs ${
                                  isDark ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <span
                              className={`text-xs font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {item.count}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Monthly Requests Minimal Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className={`p-6 rounded-2xl group hover:scale-101 transition-all duration-300 ${
                    isDark
                      ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                      : "bg-white"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-6 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Monthly Trend
                  </h3>
                  <div className="h-20 flex items-end justify-between gap-1">
                    {chartData.monthlyRequests.map((item, index) => {
                      const maxCount = Math.max(
                        ...chartData.monthlyRequests.map((d) => d.count)
                      );
                      const height =
                        maxCount > 0 ? (item.count / maxCount) * 64 : 0;

                      return (
                        <div
                          key={item.month}
                          className="flex flex-col items-center flex-1 group/bar"
                        >
                          <motion.div
                            className="bg-[#f87898] rounded-full w-full min-h-[2px] relative"
                            initial={{ height: 0 }}
                            animate={{ height: `${height}px` }}
                            transition={{
                              duration: 1,
                              delay: 1.2 + index * 0.1,
                            }}
                          >
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                              {item.count}
                            </div>
                          </motion.div>
                          <span
                            className={`text-xs mt-2 ${
                              isDark ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            {item.month.split(" ")[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Blood Group Minimal Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className={`p-6 rounded-2xl group hover:scale-101 transition-all duration-300 ${
                    isDark
                      ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                      : "bg-white"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-6 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Blood Groups
                  </h3>
                  <div className="space-y-3">
                    {chartData.bloodGroupDistribution
                      .slice(0, 4)
                      .map((item, index) => {
                        const maxCount = Math.max(
                          ...chartData.bloodGroupDistribution.map(
                            (d) => d.count
                          )
                        );
                        const width =
                          maxCount > 0 ? (item.count / maxCount) * 100 : 0;

                        return (
                          <motion.div
                            key={item.bloodGroup}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 1.4 + index * 0.1,
                            }}
                          >
                            <div
                              className={`w-6 text-xs font-semibold ${
                                isDark ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {item.bloodGroup}
                            </div>
                            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 relative overflow-hidden">
                              <motion.div
                                className="h-full bg-[#f87898] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${width}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 1.6 + index * 0.1,
                                }}
                              />
                            </div>
                            <div
                              className={`w-4 text-xs font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {item.count}
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </motion.div>

                {/* User Roles Minimal Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className={`p-6 rounded-2xl group hover:scale-101 transition-all duration-300 ${
                    isDark
                      ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                      : "bg-white"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-6 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    User Roles
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-4">
                      {chartData.usersByRole.map((item, index) => {
                        const colors = ["#10b981", "#3b82f6", "#f59e0b"];
                        const color = colors[index % colors.length];
                        const circumference = 2 * Math.PI * 30;
                        const strokeDasharray = `${
                          (item.percentage / 100) * circumference
                        } ${circumference}`;
                        const rotation = chartData.usersByRole
                          .slice(0, index)
                          .reduce(
                            (acc, prev) => acc + (prev.percentage / 100) * 360,
                            0
                          );

                        return (
                          <motion.svg
                            key={item.role}
                            className="absolute inset-0 w-full h-full transform -rotate-90"
                            style={{ transform: `rotate(${rotation - 90}deg)` }}
                            initial={{ strokeDasharray: `0 ${circumference}` }}
                            animate={{ strokeDasharray }}
                            transition={{
                              duration: 1.2,
                              delay: 1.0 + index * 0.1,
                            }}
                          >
                            <circle
                              cx="48"
                              cy="48"
                              r="30"
                              fill="none"
                              stroke={color}
                              strokeWidth="6"
                              strokeDasharray={strokeDasharray}
                              strokeLinecap="round"
                              opacity="0.9"
                            />
                          </motion.svg>
                        );
                      })}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p
                            className={`text-sm font-bold ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {stats.totalUsers}
                          </p>
                          <p
                            className={`text-xs ${
                              isDark ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            Users
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 w-full">
                      {chartData.usersByRole.map((item, index) => {
                        const colors = ["#10b981", "#3b82f6", "#f59e0b"];
                        const color = colors[index % colors.length];
                        return (
                          <motion.div
                            key={item.role}
                            className="flex items-center justify-between"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 1.6 + index * 0.1,
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: color }}
                              ></div>
                              <span
                                className={`text-xs ${
                                  isDark ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {item.role}
                              </span>
                            </div>
                            <span
                              className={`text-xs font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {item.count}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminVolunteerDashboard;
