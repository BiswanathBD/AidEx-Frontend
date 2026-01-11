import { useContext, useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Auth/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import useAxios from "../../Hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../Components/Shared/Loader";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaTint,
  FaMapMarkerAlt,
  FaCamera,
} from "react-icons/fa";

const MyProfile = () => {
  const { isDark } = useTheme();
  const { user, setUser, loading } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      accessToken: user?.accessToken,
      name: user?.name || "",
      email: user?.email || "",
      bloodGroup: user?.bloodGroup || "",
      district: user?.district || "",
      upazila: user?.upazila || "",
      role: user?.role || "",
      status: user?.status || "",
      avatar: user?.avatar || "",
      registrationDate: user?.registrationDate || null,
    },
  });

  const watchDistrict = watch("district");

  const fetchDistrictData = useCallback(async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/districts/districts.json"
      );
      const data = await res.json();
      setDistrictData(data[2].data);
    } catch (error) {
      console.error("Failed to fetch district data:", error);
    }
  }, []);

  const fetchUpazilaData = useCallback(async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/upazilas/upazilas.json"
      );
      const data = await res.json();
      setUpazilaData(data[2].data);
    } catch (error) {
      console.error("Failed to fetch upazila data:", error);
    }
  }, []);

  useEffect(() => {
    fetchDistrictData();
  }, [fetchDistrictData]);

  useEffect(() => {
    fetchUpazilaData();
  }, [fetchUpazilaData]);

  useEffect(() => {
    if (!watchDistrict || districtData.length === 0 || upazilaData.length === 0)
      return;

    const districtObj = districtData.find((d) => d.name === watchDistrict);
    if (!districtObj) return;

    const matched = upazilaData.filter((u) => u.district_id === districtObj.id);
    setFilteredUpazilas(matched);

    if (user.upazila && matched.some((u) => u.name === user.upazila)) {
      setValue("upazila", user.upazila);
    } else {
      setValue("upazila", "");
    }
  }, [watchDistrict, districtData, upazilaData, user.upazila, setValue]);

  useEffect(() => {
    if (user && districtData.length > 0 && upazilaData.length > 0) {
      reset({
        accessToken: user.accessToken,
        name: user.name,
        email: user.email,
        bloodGroup: user.bloodGroup,
        district: user.district,
        upazila: user.upazila,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
        registrationDate: user.registrationDate,
      });
    }
  }, [user, districtData, upazilaData, reset]);

  const onSubmit = async (data) => {
    if (
      user.email === "demo.user@gmail.com" ||
      user.email === "demo.volunteer@gmail.com" ||
      user.email === "demo.admin@gmail.com"
    ) {
      setIsEditing(false);
      return toast.error("Action not allowed for demo account");
    }

    const toastId = toast.loading("Updating profile...");
    try {
      const res = await axiosInstance.put(`/user/${user.email}`, data);
      if (res.status === 200) {
        setIsEditing(false);
        setUser({ ...data, accessToken: user.accessToken });
        toast.success("Profile updated!", { id: toastId });
      } else {
        toast.error("Update failed!", { id: toastId });
      }
    } catch {
      toast.error("Update failed! Try again.", { id: toastId });
    }
  };

  return loading || !user ? (
    <Loader />
  ) : (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
          <FaUser className="text-[#f87898]" />
          <span className="text-[#f87898]">My</span> Profile
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Manage your personal information and preferences
        </p>
      </div>

      {/* Main Profile Card */}
      <div
        className={`relative overflow-hidden rounded-2xl group hover:scale-101 transition-all duration-300 ${
          isDark
            ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
            : "bg-white"
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-linear-to-br from-[#f87898] to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f87898] rounded-full blur-3xl opacity-10 transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f87898] rounded-full blur-3xl opacity-10 transform -translate-x-24 translate-y-24"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-12">
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-12">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="relative">
                <img
                  src={watch("avatar")}
                  alt="Profile Avatar"
                  className="w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-xl object-cover border-2 p-0.5 border-[#f87898] shadow-xl"
                />
              </div>

              {/* Status Indicators */}
              <div className="absolute -bottom-1 -right-1">
                <div
                  className={`w-6 h-6 rounded-full ${
                    user.status === "Active" ? "bg-green-500" : "bg-red-500"
                  } shadow-lg border-2 ${
                    isDark ? "border-black" : "border-white"
                  } flex items-center justify-center`}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div>
                {isEditing ? (
                  <input
                    {...register("name")}
                    className="text-3xl sm:text-4xl font-bold mb-2 bg-transparent border-b-2 border-[#f87898] focus:outline-none text-center lg:text-left"
                  />
                ) : (
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                    {user.name}
                  </h2>
                )}

                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <FaEnvelope className="text-[#f87898]" />
                  <span
                    className={`text-lg ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {user.email}
                  </span>
                </div>

                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 text-white rounded-full font-semibold shadow-lg ${
                    user.role === "Admin"
                      ? "bg-blue-600"
                      : user.role === "Volunteer"
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                >
                  <FaUser className="text-sm" />
                  {user.role}
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Personal Information + Info Cards */}
              <div className="space-y-6">
                {/* Personal Information Card */}
                <div
                  className={`p-6 rounded-xl group hover:scale-101 transition-all duration-300 ${
                    isDark
                      ? "bg-white/5 hover:bg-linear-to-tl from-[#f87898]/10"
                      : "bg-gray-50 hover:bg-gray-100"
                  } backdrop-blur-sm`}
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <FaUser className="text-[#f87898]" />
                    Personal Information
                  </h3>

                  <div className="space-y-6">
                    {/* Avatar URL Input (only when editing) */}
                    {isEditing && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <FaCamera className="inline mr-2 text-[#f87898]" />
                          Avatar URL
                        </label>
                        <input
                          {...register("avatar")}
                          placeholder="Enter avatar image URL"
                          className="w-full"
                        />
                      </div>
                    )}

                    {/* Blood Group */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <FaTint className="inline mr-2 text-[#f87898]" />
                        Blood Group
                      </label>
                      <select
                        {...register("bloodGroup")}
                        disabled={!isEditing}
                        className={!isEditing ? "cursor-not-allowed" : ""}
                      >
                        <option value="">Select Blood Group</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Activity Status Card */}
                  <div
                    className={`p-4 rounded-xl group hover:scale-101 transition-all duration-300 cursor-pointer ${
                      isDark
                        ? "bg-white/5 hover:bg-linear-to-tl from-[#f87898]/10"
                        : "bg-gray-50 hover:bg-gray-100"
                    } backdrop-blur-sm`}
                  >
                    <div className="text-center">
                      <div
                        className={`w-12 h-12 ${
                          user.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } rounded-full flex items-center justify-center mx-auto mb-3`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      <h4 className="font-semibold mb-1 text-sm">
                        Activity Status
                      </h4>
                      <div
                        className={`text-sm font-bold ${
                          user.status === "Active"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {user.status}
                      </div>
                    </div>
                  </div>

                  {/* Member Since Card */}
                  <div
                    className={`p-4 rounded-xl group hover:scale-101 transition-all duration-300 cursor-pointer ${
                      isDark
                        ? "bg-white/5 hover:bg-linear-to-tl from-[#f87898]/10"
                        : "bg-gray-50 hover:bg-gray-100"
                    } backdrop-blur-sm`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <h4 className="font-semibold mb-1 text-sm">
                        Member Since
                      </h4>
                      <div className="text-sm font-bold text-blue-500">
                        {user.registrationDate
                          ? new Date(user.registrationDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                              }
                            )
                          : "January 2025"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Location Information */}
              <div className="space-y-6">
                <div
                  className={`p-6 rounded-xl h-full group hover:scale-101 transition-all duration-300 ${
                    isDark
                      ? "bg-white/5 hover:bg-linear-to-tl from-[#f87898]/10"
                      : "bg-gray-50 hover:bg-gray-100"
                  } backdrop-blur-sm`}
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#f87898]" />
                    Location Information
                  </h3>

                  <div className="space-y-6">
                    {/* District */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        District
                      </label>
                      <select
                        {...register("district")}
                        disabled={!isEditing}
                        className={!isEditing ? "cursor-not-allowed" : ""}
                      >
                        <option value="">Select District</option>
                        {districtData.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Upazila */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Upazila
                      </label>
                      <select
                        {...register("upazila")}
                        disabled={!isEditing || !watchDistrict}
                        className={
                          !isEditing || !watchDistrict
                            ? "cursor-not-allowed"
                            : ""
                        }
                      >
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map((u) => (
                          <option key={u.id} value={u.name}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-3"
                >
                  <FaSave />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
