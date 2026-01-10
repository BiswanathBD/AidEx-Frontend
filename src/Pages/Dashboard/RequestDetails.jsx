import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { AuthContext } from "../../Auth/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
motion;
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
      <div>
        <motion.p
          onClick={() => navigate(location.state || "/requests")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-1 text-[#f87898] px-2 font-semibold cursor-pointer hover:underline w-fit"
        >
          <HiOutlineArrowLongLeft size={28} />
          <span>Go back</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-xl mt-4 p-5 transition-colors duration-300 ${
            isDark
              ? "bg-linear-to-t from-black to-white/10"
              : "bg-white"
          }`}
        >
          <div className="lg:flex lg:gap-10">
            <div
              className={`flex justify-center p-8 rounded-lg transition-colors duration-300 ${
                isDark ? "bg-white/5" : "bg-gray-50"
              }`}
            >
              <div className="w-40 aspect-square rounded-full bg-[#f87898]/20 flex items-center justify-center">
                <span className="text-6xl font-extrabold text-[#f87898]">
                  {request.bloodGroup}
                </span>
              </div>
            </div>

            <div className="lg:flex-1">
              <h2
                className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                <span className={isDark ? "text-white" : "text-black"}>
                  Donation Request
                </span>{" "}
                <span className="text-[#f87898]">Details</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div
                  className={`p-3 rounded-lg transition-colors duration-300 ${
                    isDark ? "bg-white/5" : "bg-gray-50"
                  }`}
                >
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Requester Name
                  </span>
                  <p
                    className={`transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {request.requesterName}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg transition-colors duration-300 ${
                    isDark ? "bg-white/5" : "bg-gray-50"
                  }`}
                >
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Requester Email
                  </span>
                  <p
                    className={`transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {request.requesterEmail}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg transition-colors duration-300 ${
                    isDark ? "bg-white/5" : "bg-gray-50"
                  }`}
                >
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Recipient Name
                  </span>
                  <p
                    className={`transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {request.recipientName}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg transition-colors duration-300 ${
                    isDark ? "bg-white/5" : "bg-gray-50"
                  }`}
                >
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Status
                  </span>
                  <span
                    className={`block mt-1 px-3 py-1 w-fit rounded-full text-sm font-semibold capitalize ${
                      statusColor[request.status.toLowerCase()]
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-6">
            <div
              className={`p-3 rounded-lg transition-colors duration-300 ${
                isDark ? "bg-white/5" : "bg-gray-50"
              }`}
            >
              <span
                className={`text-sm transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Hospital
              </span>
              <p
                className={`transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {request.hospital}
              </p>
            </div>

            <div
              className={`p-3 rounded-lg transition-colors duration-300 ${
                isDark ? "bg-white/5" : "bg-gray-50"
              }`}
            >
              <span
                className={`text-sm transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Address
              </span>
              <p
                className={`transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {request.address}
              </p>
            </div>

            <div
              className={`p-3 rounded-lg transition-colors duration-300 ${
                isDark ? "bg-white/5" : "bg-gray-50"
              }`}
            >
              <span
                className={`text-sm transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                District
              </span>
              <p
                className={`transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {request.district}
              </p>
            </div>

            <div
              className={`p-3 rounded-lg transition-colors duration-300 ${
                isDark ? "bg-white/5" : "bg-gray-50"
              }`}
            >
              <span
                className={`text-sm transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Upazila
              </span>
              <p
                className={`transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {request.upazila}
              </p>
            </div>

            <div
              className={`p-3 rounded-lg transition-colors duration-300 ${
                isDark ? "bg-white/5" : "bg-gray-50"
              }`}
            >
              <span
                className={`text-sm transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Donation Date
              </span>
              <p
                className={`transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {request.donationDate}
              </p>
            </div>

            <div
              className={`p-3 rounded-lg transition-colors duration-300 ${
                isDark ? "bg-white/5" : "bg-gray-50"
              }`}
            >
              <span
                className={`text-sm transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Donation Time
              </span>
              <p
                className={`transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {formatTime(request.donationTime)}
              </p>
            </div>

            {/* donor info if have */}
            {request.donorName && (
              <div
                className={`px-4 py-3 rounded-lg overflow-hidden transition-colors duration-300 ${
                  isDark
                    ? "bg-[#f87898]/10 border border-[#f87898]/20"
                    : "bg-[#f87898]/20"
                }`}
              >
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Donor Name
                </span>
                <p
                  className={`font-medium mt-1 transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {request.donorName}
                </p>
              </div>
            )}

            {request.donorEmail && (
              <div
                className={`px-4 py-3 rounded-lg overflow-hidden transition-colors duration-300 ${
                  isDark
                    ? "bg-[#f87898]/10 border border-[#f87898]/20"
                    : "bg-[#f87898]/20"
                }`}
              >
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Donor Email
                </span>
                <p
                  className={`font-medium mt-1 transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {request.donorEmail}
                </p>
              </div>
            )}
          </div>

          {request.status === "Pending" &&
            user.role === "Donor" &&
            user.email !== request.requesterEmail && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 w-full py-3 bg-[#f87898] text-white font-semibold rounded-lg"
              >
                Accept Donation Request
              </button>
            )}
        </motion.div>

        {/* modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 24 }}
              transition={{ duration: 0.5 }}
              className={`p-6 rounded-xl h-fit w-full max-w-md m-4 overflow-hidden transition-colors duration-300 ${
                isDark
                  ? "bg-linear-to-t from-black to-white/20 border border-[#f87898]/20"
                  : "bg-white"
              }`}
            >
              <h3 className="text-xl font-bold text-[#f87898] mb-4">
                Confirm Donation
              </h3>

              {/* donor info */}
              <div>
                <p
                  className={`flex items-center gap-2 transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  <FaUser color="#f87898" />
                  <span className="text-lg font-semibold">{user.name}</span>
                </p>
                <p
                  className={`flex items-center gap-2 transition-colors duration-300 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <MdEmail color="#f87898" />
                  <span>{user.email}</span>
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleAcceptDonate();
                    setIsModalOpen(false);
                  }}
                  className="btn-primary"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    )
  );
};

export default RequestDetails;
