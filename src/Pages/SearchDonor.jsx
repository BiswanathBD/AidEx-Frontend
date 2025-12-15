import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Shared/Loader";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonor = () => {
  const { register, handleSubmit } = useForm();
  const axiosInstance = useAxios();

  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictID, setSelectedDistrictID] = useState("");
  const [donors, setDonors] = useState([]);
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
    axiosInstance
      .get("/search-donor", { params: data })
      .then((res) => {
        setDonors(res.data || []);
        setLoader(false);
      })
      .catch(() => {
        setDonors([]);
        setLoader(false);
      });
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 px-4 text-[#f87898]">
          <span className="text-black">Search</span> Donor
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {/* blood group */}
          <select {...register("bloodGroup")} className="input">
            <option value="">Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          {/* district */}
          <select
            {...register("district")}
            className="input"
            onChange={(e) => {
              const selectedName = e.target.value;
              const districtObj = districtData.find(
                (d) => d.name === selectedName
              );
              setSelectedDistrictID(districtObj?.id || "");
            }}
          >
            <option value="">Select District</option>
            {districtData.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          {/* upazila */}
          <select {...register("upazila")} className="input">
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          {/* search button */}
          <button
            type="submit"
            className="bg-[#f87898] text-white font-semibold rounded px-4 py-2 hover:bg-[#f45f7b]"
          >
            Search
          </button>
        </form>
      </div>

      {loader ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {donors.map((donor) => (
            <div
              key={donor._id}
              className="bg-white rounded-2xl p-5 flex gap-4 items-center"
            >
              <div className="relative">
                <img
                  src={donor.avatar || "https://i.ibb.co/4f8hJQy/user.png"}
                  alt={donor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#f87898]"
                />
                <span
                  className={`absolute -bottom-1 -right-1 ${
                    donor.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }  w-3 h-3 rounded-full border-2 border-white`}
                ></span>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">
                  {donor.name}
                </h3>

                <p className="text-sm text-gray-500 mb-1">
                  {donor.upazila}, {donor.district}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <span className="px-3 py-1 text-sm font-semibold rounded-full bg-[#f87898]/15 text-[#f87898]">
                    {donor.bloodGroup}
                  </span>

                  <span
                    className={`text-xs font-medium ${
                      donor.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Donor {donor.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDonor;
