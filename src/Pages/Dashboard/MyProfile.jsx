import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../Components/Shared/Loader";
import { motion } from "framer-motion";
motion

const MyProfile = () => {
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
    },
  });

  const watchDistrict = watch("district");

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
      });
    }
  }, [user, districtData, upazilaData, reset]);

  const onSubmit = async (data) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-4 sm:p-6 mt-4 bg-white rounded-xl relative"
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold md:mb-6 md:px-4 text-[#f87898]">
          <span className="text-black">My</span> Profile
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-[#f87898] text-white rounded-lg shadow-sm hover:bg-[#f66086]"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg shadow-sm hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <img
            src={watch("avatar")}
            alt="avatar"
            className="w-24 sm:w-32 lg:w-48 aspect-square rounded-full object-cover"
          />
          <div className="flex-1 w-full space-y-2">
            <input
              {...register("name")}
              disabled={!isEditing}
              className={`w-full text-xl sm:text-2xl font-semibold bg-gray-50 py-2 px-3 rounded-lg border transition ${
                isEditing
                  ? "border-gray-300 focus:ring-1 focus:ring-[#f87898]"
                  : "border-transparent"
              }`}
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
              <input
                {...register("email")}
                disabled
                className="flex-1 py-2 px-3 bg-gray-100 rounded-lg border border-transparent"
              />
            </div>

            <p className="flex gap-2 flex-wrap items-center mt-6 text-sm font-semibold">
              <span
                className={`px-4 py-1 bg-[#f87898] rounded-full text-white`}
              >
                Role: {user.role}
              </span>
              <span
                className={`px-4 py-1 ${
                  user.status === "Active" ? "bg-green-500" : "bg-red-500"
                } rounded-full text-white`}
              >
                Status: {user.status}
              </span>
            </p>
            <div className="h-0.5 rounded-full mt-6 bg-gray-100"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {isEditing && (
            <input
              {...register("avatar")}
              disabled={!isEditing}
              placeholder="Avatar URL"
              className={`sm:col-span-3 lg:col-span-3 py-2 px-3 rounded-lg border bg-gray-50 transition ${
                isEditing
                  ? "border-gray-300 focus:ring-1 focus:ring-[#f87898]"
                  : "border-transparent"
              }`}
            />
          )}

          <select
            {...register("bloodGroup")}
            disabled={!isEditing}
            className={`w-full py-2 px-3 rounded-lg border bg-gray-50 transition ${
              isEditing
                ? "border-gray-300 focus:ring-1 focus:ring-[#f87898]"
                : "border-transparent"
            }`}
          >
            <option value="">Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
          <select
            {...register("district")}
            disabled={!isEditing}
            className={`w-full py-2 px-3 rounded-lg border bg-gray-50 transition ${
              isEditing
                ? "border-gray-300 focus:ring-1 focus:ring-[#f87898]"
                : "border-transparent"
            }`}
          >
            <option value="">Select District</option>
            {districtData.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          <select
            {...register("upazila")}
            disabled={!isEditing || !watchDistrict}
            className={`w-full py-2 px-3 rounded-lg border bg-gray-50 transition ${
              isEditing
                ? "border-gray-300 focus:ring-1 focus:ring-[#f87898]"
                : "border-transparent"
            }`}
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {isEditing && (
          <div className="flex justify-center sm:justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#f87898] text-white rounded-lg shadow hover:bg-[#f66086]"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default MyProfile;
