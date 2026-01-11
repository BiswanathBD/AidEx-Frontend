import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Auth/AuthContext";
import Loader from "../../Components/Shared/Loader";
import { motion } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";
import { FaEdit } from "react-icons/fa";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditDonationRequest = () => {
  const { isDark } = useTheme();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [requestData, setRequestData] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const selectedDistrict = watch("district");
  // fetch district and upozila data
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/districts/districts.json"
    )
      .then((res) => res.json())
      .then((data) => setDistricts(data[2].data));

    fetch(
      "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/upazilas/upazilas.json"
    )
      .then((res) => res.json())
      .then((data) => setUpazilas(data[2].data));
  }, []);

  // request data by id
  useEffect(() => {
    axiosInstance.get(`/donation-request/${id}`).then((res) => {
      if (res.data.status !== "Pending") {
        toast.error("Only pending requests can be edited");
        navigate("/dashboard/my-donation-requests");
        return;
      }
      setRequestData(res.data);

      const fields = [
        "recipientName",
        "hospital",
        "address",
        "bloodGroup",
        "donationDate",
        "donationTime",
        "message",
        "district",
      ];

      fields.forEach((field) => setValue(field, res.data[field]));
    });
  }, [id, axiosInstance, navigate, setValue]);

  useEffect(() => {
    if (!selectedDistrict || districts.length === 0) return;

    const district = districts.find((d) => d.name === selectedDistrict);
    if (district) setSelectedDistrictId(district.id);
  }, [selectedDistrict, districts]);

  useEffect(() => {
    if (!selectedDistrictId) return;

    const matched = upazilas.filter(
      (u) => u.district_id === selectedDistrictId
    );
    setFilteredUpazilas(matched);
  }, [selectedDistrictId, upazilas]);

  useEffect(() => {
    if (!requestData || filteredUpazilas.length === 0) return;

    const exists = filteredUpazilas.find((u) => u.name === requestData.upazila);

    if (exists) {
      setValue("upazila", requestData.upazila);
    }
  }, [filteredUpazilas, requestData, setValue]);

  // submit
  const onSubmit = (data) => {
    if (user.email === "demo.admin@gmail.com") {
      return toast.error("Action not allowed for demo account");
    }

    toast
      .promise(axiosInstance.put(`/edit-donation-request/${id}`, data), {
        loading: "Updating request...",
        success: "Request updated successfully!",
        error: "Failed to update request",
      })
      .then(() => {
        navigate(
          user.role === "Donor"
            ? "/dashboard/my-donation-requests"
            : "/dashboard/all-blood-donation-request"
        );
      });
  };

  if (!requestData || districts.length === 0 || upazilas.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
          <FaEdit className="text-[#f87898]" />
          <span className="text-[#f87898]">Edit</span> Donation Request
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Update your blood donation request details
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
            {/* name */}
            <input
              placeholder="Recipient Name"
              {...register("recipientName", { required: true })}
            />

            {/* district */}
            <select {...register("district", { required: true })}>
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* upazila */}
            <select {...register("upazila")}>
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>

            {/* hospital */}
            <input
              placeholder="Hospital Name"
              {...register("hospital", { required: true })}
            />

            {/* address */}
            <input
              className="md:col-span-2"
              placeholder="Full Address"
              {...register("address", { required: true })}
            />

            {/* blood group */}
            <select {...register("bloodGroup", { required: true })}>
              <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg}>{bg}</option>
              ))}
            </select>

            {/* date */}
            <div>
              <input
                type="date"
                style={{ colorScheme: isDark ? "dark" : "light" }}
                {...register("donationDate", {
                  required: "Donation date is required",
                  validate: (value) =>
                    value >= today || "You cannot select a past date",
                })}
              />

              {errors.donationDate && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.donationDate.message}
                </span>
              )}
            </div>

            {/* time */}
            <input
              type="time"
              style={{ colorScheme: isDark ? "dark" : "light" }}
              {...register("donationTime", { required: true })}
            />
          </div>

          {/* msg */}
          <textarea
            rows="3"
            placeholder="Write request message..."
            {...register("message", { required: true })}
          />

          <div className="flex justify-end">
            <button className="bg-[#f87898] hover:bg-[#f87898]/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02]">
              Update Request
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditDonationRequest;
