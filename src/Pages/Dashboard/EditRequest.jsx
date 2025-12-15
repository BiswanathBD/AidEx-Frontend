import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Auth/AuthContext";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [requestData, setRequestData] = useState(null);
  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictID, setSelectedDistrictID] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/districts/districts.json"
    )
      .then((res) => res.json())
      .then((data) => setDistrictData(data[2].data));

    fetch(
      "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/upazilas/upazilas.json"
    )
      .then((res) => res.json())
      .then((data) => setUpazilaData(data[2].data));
  }, []);

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
      ];
      fields.forEach((field) => setValue(field, res.data[field]));
    });
  }, [id, axiosInstance, navigate, setValue]);

  useEffect(() => {
    if (requestData && districtData.length > 0 && upazilaData.length > 0) {
      const districtObj = districtData.find(
        (d) => d.name === requestData.district
      );
      if (districtObj) {
        setSelectedDistrictID(districtObj.id);
        setValue("district", districtObj.name);

        const matchedUpazilas = upazilaData.filter(
          (u) => u.district_id === districtObj.id
        );
        setFilteredUpazilas(matchedUpazilas);
        setValue("upazila", requestData.upazila);
      }
    }
  }, [requestData, districtData, upazilaData, setValue]);

  useEffect(() => {
    if (!selectedDistrictID) return;
    const matched = upazilaData.filter(
      (u) => u.district_id === selectedDistrictID
    );
    setFilteredUpazilas(matched);
    setValue("upazila", "");
  }, [selectedDistrictID, upazilaData, setValue]);

  const onSubmit = (data) => {
    toast
      .promise(axiosInstance.put(`/edit-donation-request/${id}`, data), {
        loading: "Updating request...",
        success: "Request updated successfully!",
        error: "Failed to update request",
      })
      .then(() => {
        if (user.role === "Donor") {
          navigate("/dashboard/my-donation-requests");
        } else {
          navigate("/dashboard/all-blood-donation-request");
        }
      });
  };

  if (!requestData || districtData.length === 0 || upazilaData.length === 0)
    return null;

  return (
    <div className="bg-white p-4 mt-4 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 px-4 text-[#f87898]">
        Edit <span className="text-black">Donation Request</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Enter recipient name"
              {...register("recipientName", {
                required: "Recipient name is required",
              })}
              className="input"
            />
            {errors.recipientName && (
              <span className="text-red-500 text-sm">
                {errors.recipientName.message}
              </span>
            )}
          </div>

          {/* district */}
          <div className="flex flex-col">
            <select
              {...register("district", { required: "District is required" })}
              className="input"
              value={watch("district")}
              onChange={(e) => {
                const districtObj = districtData.find(
                  (d) => d.name === e.target.value
                );
                setSelectedDistrictID(districtObj?.id);
                setValue("district", e.target.value);
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
              <span className="text-red-500 text-sm">
                {errors.district.message}
              </span>
            )}
          </div>

          {/* upazila */}
          <div className="flex flex-col">
            <select
              {...register("upazila", { required: "Upazila is required" })}
              className="input"
              value={watch("upazila")}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
            {errors.upazila && (
              <span className="text-red-500 text-sm">
                {errors.upazila.message}
              </span>
            )}
          </div>

          {/* hospital */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Enter hospital name"
              {...register("hospital", {
                required: "Hospital name is required",
              })}
              className="input"
            />
            {errors.hospital && (
              <span className="text-red-500 text-sm">
                {errors.hospital.message}
              </span>
            )}
          </div>

          <div className="flex flex-col md:col-span-2">
            <input
              type="text"
              placeholder="Enter full address"
              {...register("address", { required: "Address is required" })}
              className="input"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <select
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
              className="input"
              value={watch("bloodGroup")}
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            {errors.bloodGroup && (
              <span className="text-red-500 text-sm">
                {errors.bloodGroup.message}
              </span>
            )}
          </div>

          {/* date */}
          <div className="flex flex-col">
            <input
              type="date"
              placeholder="Select donation date"
              {...register("donationDate", {
                required: "Donation date is required",
                validate: (value) =>
                  value >= today || "Cannot select past date",
              })}
              className="input"
            />
            {errors.donationDate && (
              <span className="text-red-500 text-sm">
                {errors.donationDate.message}
              </span>
            )}
          </div>

          {/* time */}
          <div className="flex flex-col">
            <input
              type="time"
              placeholder="Select donation time"
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
              className="input"
            />
            {errors.donationTime && (
              <span className="text-red-500 text-sm">
                {errors.donationTime.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Write request message..."
            rows="3"
            className="input w-full"
          ></textarea>
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </div>

        {/* submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#f87898] text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 w-full md:w-auto"
          >
            Update Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonationRequest;
