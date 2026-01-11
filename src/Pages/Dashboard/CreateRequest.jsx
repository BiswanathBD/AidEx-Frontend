import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Auth/AuthContext";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { motion } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";
import { FaPlus } from "react-icons/fa";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonationRequest = () => {
  const { isDark } = useTheme();
  const { user } = useContext(AuthContext);
  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictID, setSelectedDistrictID] = useState("");
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/districts/districts.json"
    )
      .then((res) => res.json())
      .then((data) => setDistrictData(data[2].data));
  }, []);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/upazilas/upazilas.json"
    )
      .then((res) => res.json())
      .then((data) => setUpazilaData(data[2].data));
  }, []);

  useEffect(() => {
    if (selectedDistrictID) {
      const matched = upazilaData.filter(
        (u) => u.district_id === selectedDistrictID
      );
      setFilteredUpazilas(matched);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictID, upazilaData]);

  const onSubmit = (data) => {
    const request = {
      requesterName: user?.name,
      requesterEmail: user?.email,
      ...data,
      status: "Pending",
      requested_at: new Date().toISOString(),
      donorName: "",
      donorEmail: "",
    };

    toast.promise(axiosInstance.post("/donation-request", request), {
      loading: "Submitting request...",
      success: () => {
        navigate("/dashboard/my-donation-requests");
        return "Request submitted!";
      },
      error: "Failed to submit request.",
    });
  };

  if (user.role !== "Donor" && user.role !== "Volunteer")
    return <Navigate to={"/dashboard"} />;

  if (user.status === "Block") return <Navigate to={"/dashboard"} />;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
          <FaPlus className="text-[#f87898]" />
          <span className="text-[#f87898]">Create</span> Donation Request
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Submit a new blood donation request
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className={`p-4 sm:p-6 lg:p-8 rounded-xl group hover:scale-101 transition-all duration-300 ${
          isDark
            ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
            : "bg-white"
        }`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* requester name */}
            <input
              type="text"
              defaultValue={user?.name}
              readOnly
              placeholder="Requester Name"
            />

            {/* requester email */}
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              placeholder="Requester Email"
            />

            {/* recipient name */}
            <div className="flex flex-col">
              <input
                type="text"
                {...register("recipientName", {
                  required: "Recipient name is required",
                })}
                placeholder="Recipient Name"
              />
              {errors.recipientName && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.recipientName.message}
                </span>
              )}
            </div>

            {/* district */}
            <div className="flex flex-col">
              <select
                {...register("district", { required: "District is required" })}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  const districtObj = districtData.find(
                    (d) => d.name === selectedName
                  );
                  setSelectedDistrictID(districtObj?.id);
                }}
              >
                <option value="">Select District</option>
                {districtData.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.district.message}
                </span>
              )}
            </div>

            {/* upazila */}
            <div className="flex flex-col">
              <select
                {...register("upazila", { required: "Upazila is required" })}
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
              {errors.upazila && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.upazila.message}
                </span>
              )}
            </div>

            {/* hospital */}
            <div className="flex flex-col">
              <input
                type="text"
                {...register("hospital", {
                  required: "Hospital name is required",
                })}
                placeholder="Hospital Name"
              />
              {errors.hospital && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.hospital.message}
                </span>
              )}
            </div>

            {/* address */}
            <div className="flex flex-col md:col-span-2 lg:col-span-3">
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                placeholder="Full Address"
              />
              {errors.address && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/* blood group */}
            <div className="flex flex-col">
              <select
                {...register("bloodGroup", {
                  required: "Blood group is required",
                })}
              >
                <option value="">Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.bloodGroup.message}
                </span>
              )}
            </div>

            {/* date */}
            <div className="flex flex-col">
              <input
                type="date"
                {...register("donationDate", {
                  required: "Donation date is required",
                  validate: (value) =>
                    value >= today || "Cannot select past date",
                })}
                style={{ colorScheme: isDark ? "dark" : "light" }}
              />
              {errors.donationDate && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.donationDate.message}
                </span>
              )}
            </div>

            {/* time */}
            <div className="flex flex-col">
              <input
                type="time"
                {...register("donationTime", {
                  required: "Donation time is required",
                  validate: (value) => {
                    const selectedDate = watch("donationDate");
                    if (selectedDate === today) {
                      const now = new Date();
                      const timeStr = now.toTimeString().slice(0, 5);
                      return value >= timeStr || "Cannot select past time";
                    }
                    return true;
                  },
                })}
                style={{ colorScheme: isDark ? "dark" : "light" }}
              />
              {errors.donationTime && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.donationTime.message}
                </span>
              )}
            </div>
          </div>

          {/* request message */}
          <div className="flex flex-col">
            <textarea
              {...register("message", { required: "Message is required" })}
              rows="3"
              placeholder="Write request message..."
            ></textarea>
            {errors.message && (
              <span className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </span>
            )}
          </div>

          {/* submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#f87898] hover:bg-[#f87898]/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] w-full md:w-auto"
            >
              Submit Request
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateDonationRequest;
