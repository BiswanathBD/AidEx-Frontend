import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Container from "../Components/Shared/Container";
import Logo from "../Components/Shared/Logo";
import ThemeToggle from "../Components/Shared/ThemeToggle";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import loginImg from "../assets/login-banner.png";
import { AuthContext } from "../Auth/AuthContext";
import { Link, Navigate, useLocation } from "react-router";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";
import { useTheme } from "../Context/ThemeContext";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
  const { isDark } = useTheme();
  const { user, setUser, passwordSignUp, googleSignIn, loading } =
    useContext(AuthContext);
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
    data.registrationDate = new Date().toISOString();

    const { password, ...userData } = data;

    const registerPromise = passwordSignUp(data.email, password).then((res) => {
      if (res.user.accessToken) {
        const accessToken = res.user.accessToken;

        axiosInstance.post("/user", userData).then((res) => {
          if (res.data.insertedId) {
            fetch(`${import.meta.env.VITE_DOMAIN}/user?email=${data.email}`)
              .then((res) => res.json())
              .then((data) => {
                data.accessToken = accessToken;
                setUser(data);
              });
          }
        });
      }
    });

    toast.promise(registerPromise, {
      loading: "Processing...",
      success: "Register successfully!",
      error: "Failed to register.",
    });
  };

  const handleGoogleRegister = () => {
    const googleRegisterPromise = googleSignIn().then(async (result) => {
      const firebaseUser = result.user;

      try {
        // First, try to get existing user
        const userResponse = await fetch(
          `${import.meta.env.VITE_DOMAIN}/user?email=${firebaseUser.email}`
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          if (userData && userData.email) {
            // User exists, set user data
            userData.accessToken = firebaseUser.accessToken;
            setUser(userData);
            return;
          }
        }

        // User doesn't exist, create new user
        const newUserData = {
          name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL || avatarUrl,
          role: "Donor",
          status: "Active",
          bloodGroup: "",
          district: "",
          upazila: "",
          registrationDate: new Date().toISOString(),
        };

        const createResponse = await axiosInstance.post("/user", newUserData);

        if (createResponse.data.insertedId) {
          // Get the newly created user
          const newUserResponse = await fetch(
            `${import.meta.env.VITE_DOMAIN}/user?email=${firebaseUser.email}`
          );
          const newUser = await newUserResponse.json();
          newUser.accessToken = firebaseUser.accessToken;
          setUser(newUser);
        }
      } catch (error) {
        console.error("Google registration error:", error);
        throw error;
      }
    });

    toast.promise(googleRegisterPromise, {
      loading: "Registering with Google...",
      success: "Google Registration Successful!",
      error: "Google Registration Failed",
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

  if (user) return <Navigate to={location?.state || "/"} />;

  return (
    <Container>
      <div className={`min-h-screen transition-colors duration-300 `}>
        <div className="py-8">
          <div className="flex items-center justify-between">
            <Logo />
            <ThemeToggle />
          </div>

          <div
            className={`grid lg:grid-cols-2 items-center mt-8 rounded-2xl overflow-hidden transition-all duration-300 ${
              isDark ? "bg-black" : "bg-white"
            }`}
          >
            {/* Banner */}
            <div className="hidden lg:block">
              <img
                src={loginImg}
                alt="Register"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Form */}
            <div className="p-8 lg:p-12">
              <h2
                className={`text-4xl font-bold text-center mb-6 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Create <span className="text-[#f87898]">Account</span>
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div className="flex flex-col">
                  <label
                    className={`mb-2 font-medium transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label
                    className={`mb-2 font-medium transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="flex flex-col relative">
                  <label
                    className={`mb-2 font-medium transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Avatar
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
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
                  <label
                    className={`mb-2 font-medium transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Blood Group
                  </label>
                  <select
                    {...register("bloodGroup", {
                      required: "Blood group is required",
                    })}
                  >
                    <option value="">Select Blood Group</option>
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

                <div className="grid md:grid-cols-2 gap-4">
                  {/* District */}
                  <div className="flex flex-col">
                    <label
                      className={`mb-2 font-medium transition-colors duration-300 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      District
                    </label>
                    <select
                      {...register("district", {
                        required: "District is required",
                      })}
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

                  {/* Upazila */}
                  <div className="flex flex-col">
                    <label
                      className={`mb-2 font-medium transition-colors duration-300 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Upazila
                    </label>
                    <select
                      {...register("upazila", {
                        required: "Upazila is required",
                      })}
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
                </div>

                {/* Password */}
                <div className="flex flex-col relative">
                  <label
                    className={`mb-2 font-medium transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: 6,
                    })}
                    className="pr-12"
                    placeholder="Enter password"
                  />

                  <span
                    className={`absolute right-4 top-11 cursor-pointer transition-colors duration-300 hover:text-[#f87898] ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col relative">
                  <label
                    className={`mb-2 font-medium transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className="pr-12"
                    placeholder="Confirm password"
                  />

                  <span
                    className={`absolute right-4 top-11 cursor-pointer transition-colors duration-300 hover:text-[#f87898] ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button type="submit" className="w-full btn-primary mt-6">
                  Register
                </button>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div
                    className={`flex-1 h-px ${
                      isDark ? "bg-white/20" : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`px-4 text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    or
                  </span>
                  <div
                    className={`flex-1 h-px ${
                      isDark ? "bg-white/20" : "bg-gray-300"
                    }`}
                  ></div>
                </div>

                {/* Google Register Button */}
                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${
                    isDark
                      ? "border-white/20 bg-black text-white hover:border-white/30 hover:bg-white/5"
                      : "border-gray-300 bg-white text-gray-900 hover:border-gray-400 hover:shadow-md"
                  }`}
                >
                  <FcGoogle size={24} />
                  <span className="font-medium">Continue with Google</span>
                </button>

                <p
                  className={`text-center transition-colors duration-300 mt-4 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    state={location.state}
                    className="text-[#f87898] font-medium hover:underline transition-colors duration-300"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
