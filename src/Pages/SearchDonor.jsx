import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Shared/Loader";
import { motion } from "framer-motion";
import { FaRegSadTear, FaSearch  } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonor = () => {
  const { register, handleSubmit } = useForm();
  const axiosInstance = useAxios();
  const { isDark } = useTheme();

  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictID, setSelectedDistrictID] = useState("");
  const [donors, setDonors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchDonors, setSearchDonor] = useState(false);

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
    setSearchDonor(false);

    axiosInstance
      .get("/search-donor", { params: data })
      .then((res) => {
        setDonors(res.data || []);
        setSearchDonor(true);
        setLoader(false);
      })
      .catch(() => {
        setDonors([]);
        setSearchDonor(true);
        setLoader(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
    >
      {/* Title Section */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex justify-center mb-4">
          <div
            className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
              isDark ? "bg-[#f87898]/10" : "bg-[#f87898]/5"
            }`}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl sm:text-3xl"
            >
              <FaSearch color="#f87898" />
            </motion.div>
          </div>
        </div>
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4`}
        >
          <span className={isDark ? "text-gray-200" : "text-black/90"}>
            Find
          </span>{" "}
          <span className="text-[#f87898]">Donor</span>
        </h2>
        <p
          className={`max-w-2xl mx-auto text-sm sm:text-base ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Find available blood donors in your area and help save lives.
        </p>
      </div>

      {/* Search Form */}
      <div
        className={`p-4 rounded-xl ${
          isDark ? "bg-black text-gray-200" : "bg-white text-gray-800"
        }`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <select
            {...register("bloodGroup")}
            className={`input w-full px-4 py-2 rounded border focus:ring-1 focus:ring-[#f87898] outline-none ${
              isDark
                ? "bg-black border-[#f87898]/20 text-gray-200"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          >
            <option value="">Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <select
            {...register("district")}
            className={`input w-full px-4 py-2 rounded border focus:ring-1 focus:ring-[#f87898] outline-none ${
              isDark
                ? "bg-black border-[#f87898]/20 text-gray-200"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            required
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

          <select
            {...register("upazila")}
            className={`input w-full px-4 py-2 rounded border focus:ring-1 focus:ring-[#f87898] outline-none ${
              isDark
                ? "bg-black border-[#f87898]/20 text-gray-200"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-[#f87898] text-white font-semibold rounded px-4 py-2 hover:bg-[#f45f7b]"
          >
            Find Donors
          </button>
        </form>
      </div>

      {/* Loader / Results */}
      {loader ? (
        <Loader />
      ) : searchDonors && donors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {donors.map((donor, index) => (
            <motion.div
              key={donor._id}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              className={`feature-card p-5 flex gap-4 items-center rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 ${
                isDark
                  ? "bg-linear-to-tl from-black to-black hover:from-[#f87898]/10 text-neutral-200"
                  : "bg-white text-neutral-800"
              }`}
            >
              <div className="relative">
                <img
                  src={donor.avatar || "https://i.ibb.co/4f8hJQy/user.png"}
                  alt={donor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#f87898]"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    donor.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold">{donor.name}</h3>
                <p className="text-sm mb-1 text-gray-400">
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
            </motion.div>
          ))}
        </div>
      ) : (
        searchDonors && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`flex flex-col items-center justify-center py-10 rounded-2xl mt-6 ${
              isDark ? "bg-black text-gray-200" : "bg-white text-gray-800"
            }`}
          >
            <FaRegSadTear className="text-5xl text-[#f87898] mb-4" />
            <h3 className="text-xl font-semibold mb-1">No Donor Found</h3>
            <p className="text-sm text-center text-gray-400 max-w-60">
              We couldn’t find any donor matching your search criteria.
            </p>
          </motion.div>
        )
      )}
    </motion.div>
  );
};

export default SearchDonor;
