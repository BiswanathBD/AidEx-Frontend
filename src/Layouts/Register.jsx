import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Container from "../Components/Shared/Container";
import Logo from "../Components/Shared/Logo";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import loginImg from "../assets/login-banner.jpg";
import { AuthContext } from "../Auth/AuthContext";
import { Link, Navigate, useLocation } from "react-router";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
  const { user, setUser, passwordSignUp, loading } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const location = useLocation();

  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);

  const [avatarUrl, setAvatarUrl] = useState(
    "https://i.ibb.co.com/7JCHTwfV/default-profile.png"
  );
  const [selectedDistrictID, setSelectedDistrictID] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (loading) return;

  // Submit form
  const onSubmit = (data) => {
    data.status = "Active";
    data.role = "Donor";
    data.avatar = avatarUrl;

    const { password, confirmPassword, ...userData } = data;

    const registerPromise = passwordSignUp(data.email, password).then((res) => {
      if (res.user) {
        axiosInstance.post("/user", userData).then((res) => setUser(res.data));
      }
    });

    toast.promise(registerPromise, {
      loading: "Processing...",
      success: "Register successfully!",
      error: "Failed to register.",
    });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await res.json();

    if (result.success) {
      setAvatarUrl(result.data.url);
    }
  };

  return (
    <Container>
      {user ? (
        <Navigate to={location.state || "/"} />
      ) : (
        <div className="my-8">
          <Logo />

          <div className="grid lg:grid-cols-2 items-center mt-8 bg-white rounded-lg shadow-lg">
            {/* Banner */}
            <div className="hidden lg:block">
              <img src={loginImg} alt="Register" className="w-full" />
            </div>

            {/* Form */}
            <div className="p-2 sm:p-8">
              <h2 className="text-4xl font-bold text-center text-neutral-700 mb-6">
                Create Account
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-neutral-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="border rounded px-4 py-2 focus:ring-2 focus:ring-pink-600"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-neutral-600">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="border rounded px-4 py-2 focus:ring-2 focus:ring-pink-600"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="flex flex-col relative">
                  <label className="mb-2 font-medium text-neutral-600">
                    Avatar
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="border rounded px-4 py-2 focus:ring-2 focus:ring-pink-600"
                  />

                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt="profile"
                      className="absolute h-1/2 bottom-0.5 right-0.5 p-0.5 rounded-sm"
                    />
                  )}
                </div>

                {/* Blood Group */}
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-neutral-600">
                    Blood Group
                  </label>
                  <select
                    {...register("bloodGroup", {
                      required: "Blood group is required",
                    })}
                    className="border rounded px-4 py-2 focus:ring-2 focus:ring-pink-600"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* District */}
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-neutral-600">
                      District
                    </label>
                    <select
                      {...register("district", {
                        required: "District is required",
                      })}
                      className="border rounded px-4 py-2 focus:ring-2 focus:ring-pink-600"
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
                  </div>

                  {/* Upazila */}
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-neutral-600">
                      Upazila
                    </label>
                    <select
                      {...register("upazila", {
                        required: "Upazila is required",
                      })}
                      className="border rounded px-4 py-2 focus:ring-2 focus:ring-pink-600"
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

                {/* Password */}
                <div className="flex flex-col relative">
                  <label className="mb-2 font-medium text-neutral-600">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: 6,
                    })}
                    className="border rounded px-4 py-2 pr-10 focus:ring-2 focus:ring-pink-600"
                    placeholder="Enter password"
                  />

                  <span
                    className="absolute right-3 top-10 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col relative">
                  <label className="mb-2 font-medium text-neutral-600">
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className="border rounded px-4 py-2 pr-10 focus:ring-2 focus:ring-pink-600"
                    placeholder="Confirm password"
                  />

                  <span
                    className="absolute right-3 top-10 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </div>

                {/* Submit */}
                <button type="submit" className="w-full btn-primary mt-4">
                  Register
                </button>

                <p className="text-center text-gray-500 mt-3">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    state={location.state}
                    className="text-pink-600 font-medium hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Register;
