import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { AuthContext } from "../../Auth/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loader from "../../Components/Shared/Loader";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const RequestDetails = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const { id } = useParams();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const [request, setRequest] = useState(null);
  const [loader, setLoader] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/donation-request/${id}`).then((res) => {
      setRequest(res.data);
      setLoader(false);
    });
  }, [id, axiosInstance]);

  if (loader) return <Loader />;

  const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const statusColor = {
    pending: isDark
      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      : "bg-yellow-100 text-yellow-700",
    inprogress: isDark
      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      : "bg-blue-100 text-blue-700",
    done: isDark
      ? "bg-green-500/20 text-green-400 border border-green-500/30"
      : "bg-green-100 text-green-700",
    canceled: isDark
      ? "bg-red-500/20 text-red-400 border border-red-500/30"
      : "bg-red-100 text-red-700",
  };

  const handleAcceptDonate = async () => {
    const updatedRequest = {
      ...request,
      status: "Inprogress",
      donorName: user.name,
      donorEmail: user.email,
    };

    const toastId = toast.loading("Accepting donation...");

    try {
      const res = await axiosInstance.put(
        `/donation-request/${request._id}`,
        updatedRequest
      );

      if (res.data) {
        toast.success("Donation accepted successfully!", { id: toastId });
        setRequest(updatedRequest);
      }
    } catch (error) {
      toast.error("Failed to accept donation!", { id: toastId });
      console.error(error);
    }
  };

  return (
    request && (
      <div className="min-h-screen">
        {/* Header with back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.button
            onClick={() => navigate(location.state || "/requests")}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl font-semibold transition-all duration-300 group ${
              isDark
                ? "text-[#f87898] hover:bg-black"
                : "text-[#f87898] hover:bg-[#f87898]/5"
            }`}
          >
            <HiOutlineArrowLongLeft
              size={24}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back to Requests</span>
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 lg:items-start">
          {/* Left Column - Blood Group & Status */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 flex flex-col h-full"
          >
            {/* Blood Group Card */}
            <div
              className={`relative overflow-hidden rounded-3xl p-8 text-center transition-all duration-300 grow flex flex-col justify-center ${
                isDark
                  ? "bg-gradient-to-b from-[#f87898]/10 to-[#f87898]/5 border border-[#f87898]/20"
                  : "bg-gradient-to-b from-[#f87898]/5 to-white border border-[#f87898]/10"
              }`}
            >
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#f87898] via-[#f45f7b] to-[#e91e63] flex items-center justify-center shadow-2xl shadow-[#f87898]/30 mb-4">
                    <span className="text-5xl font-black text-white">
                      {request.bloodGroup}
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-bold transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Blood Type Required
                  </h3>
                </div>

                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                      statusColor[request.status.toLowerCase()]
                    }`}
                  >
                    <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></div>
                    {request.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {request.status === "Pending" &&
              user.role === "Donor" &&
              user.email !== request.requesterEmail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-6"
                >
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3! btn-primary rounded-xl! sm:text-xl!"
                  >
                    Accept Donation Request
                  </motion.button>
                </motion.div>
              )}

            {/* Donor Info Card */}
            {(request.donorName || request.donorEmail) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`mt-6 p-6 rounded-2xl transition-all duration-300 ${
                  isDark ? "bg-black" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f87898]/20 flex items-center justify-center">
                    <FaUser className="text-[#f87898]" size={16} />
                  </div>
                  <h4
                    className={`font-semibold transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Donor Information
                  </h4>
                </div>

                {request.donorName && (
                  <div className="mb-3">
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Name
                    </span>
                    <p
                      className={`font-medium transition-colors duration-300 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {request.donorName}
                    </p>
                  </div>
                )}

                {request.donorEmail && (
                  <div>
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Email
                    </span>
                    <p
                      className={`font-medium transition-colors duration-300 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {request.donorEmail}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col h-full"
          >
            <div className="mb-8">
              <h1
                className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Donation <span className="text-[#f87898]">Request</span>
              </h1>
              <p
                className={`text-lg transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Complete details for this blood donation request
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 grow">
              {/* Left Side - Personal Information and Schedule Information */}
              <div className="flex-1 space-y-6 flex flex-col">
                {/* Personal Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={`p-4 rounded-xl transition-all duration-300 grow ${
                    isDark ? "bg-black" : "bg-white"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <FaUser className="text-[#f87898]" size={16} />
                    Personal Information
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Requester Name
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors duration-300 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {request.requesterName}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Requester Email
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors duration-300 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {request.requesterEmail}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Recipient Name
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors duration-300 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {request.recipientName}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Schedule Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    isDark ? "bg-black" : "bg-white"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-[#f87898]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Schedule Information
                  </h3>

                  <div className="grid grid-cols-2 gap-4 justify-between">
                    <div className="space-y-2">
                      <label
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Donation Date
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors duration-300 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {request.donationDate}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Donation Time
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors duration-300 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {formatTime(request.donationTime)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Location Information */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`p-4 rounded-xl transition-all duration-300 h-full flex flex-col ${
                    isDark ? "bg-black" : "bg-white"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-[#f87898]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Location Details
                  </h3>

                  <div className="space-y-4 grow flex flex-col">
                    <div className="space-y-2">
                      <label
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Hospital
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors duration-300 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {request.hospital}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Full Address
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors duration-300 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {request.address}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          className={`text-sm font-medium transition-colors duration-300 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          District
                        </label>
                        <p
                          className={`text-lg font-medium transition-colors duration-300 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {request.district}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label
                          className={`text-sm font-medium transition-colors duration-300 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Upazila
                        </label>
                        <p
                          className={`text-lg font-medium transition-colors duration-300 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {request.upazila}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 grow flex flex-col">
                      <label
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Message
                      </label>
                      <div
                        className={`grow p-4 rounded-lg transition-all duration-300 min-h-[120px] overflow-y-auto ${
                          isDark
                            ? "bg-white/10  text-gray-300"
                            : "bg-black/5 text-gray-600"
                        }`}
                      >
                        {request.message ? (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {request.message}
                          </p>
                        ) : (
                          <p className="text-sm italic opacity-60">
                            No additional message provided for this donation
                            request.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`p-8 rounded-3xl h-fit w-full max-w-md overflow-hidden transition-all duration-300 ${
                isDark
                  ? "bg-linear-to-t from-black to-white/20 border border-[#f87898]/20"
                  : "bg-white shadow-2xl"
              }`}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f87898]/20 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#f87898]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#f87898] mb-2">
                  Confirm Donation
                </h3>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  You're about to accept this donation request
                </p>
              </div>

              {/* Donor info */}
              <div
                className={`p-4 rounded-2xl mb-6 transition-colors duration-300 ${
                  isDark ? "bg-black" : "bg-white"
                }`}
              >
                <div
                  className={`flex items-center gap-3 mb-3 transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  <FaUser className="text-[#f87898]" />
                  <span className="font-semibold">{user.name}</span>
                </div>
                <div
                  className={`flex items-center gap-3 transition-colors duration-300 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <MdEmail className="text-[#f87898]" />
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={() => setIsModalOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isDark
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => {
                    handleAcceptDonate();
                    setIsModalOpen(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-gradient-to-r from-[#f87898] to-[#f45f7b] text-white font-semibold rounded-xl shadow-lg shadow-[#f87898]/30 hover:shadow-xl hover:shadow-[#f87898]/40 transition-all duration-300"
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    )
  );
};

export default RequestDetails;
