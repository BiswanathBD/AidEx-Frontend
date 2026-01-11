import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Container from "../Components/Shared/Container";
import Logo from "../Components/Shared/Logo";
import ThemeToggle from "../Components/Shared/ThemeToggle";
import loginImg from "../assets/login-banner.png";
import { AuthContext } from "../Auth/AuthContext";
import { Link, Navigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { useTheme } from "../Context/ThemeContext";
import useAxios from "../Hooks/useAxios";

const Login = () => {
  const { isDark } = useTheme();
  const { user, loading, passwordSignin, googleSignIn, setUser } =
    useContext(AuthContext);
  const location = useLocation();
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    const { email, password } = data;

    toast.promise(passwordSignin(email, password), {
      loading: "Signing in...",
      success: () => {
        return "Login Successful!";
      },
      error: () => {
        return "Invalid Credentials";
      },
    });
  };

  const handleGoogleLogin = () => {
    const googleLoginPromise = googleSignIn().then(async (result) => {
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
          avatar:
            firebaseUser.photoURL ||
            "https://i.ibb.co.com/7JCHTwfV/default-profile.png",
          role: "Donor",
          status: "Active",
          bloodGroup: "",
          district: "",
          upazila: "",
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
        console.error("Google login error:", error);
        throw error;
      }
    });

    toast.promise(googleLoginPromise, {
      loading: "Signing in with Google...",
      success: "Google Login Successful!",
      error: "Google Login Failed",
    });
  };

  const handleDemoLogin = (email, password) => {
    toast.promise(passwordSignin(email, password), {
      loading: "Signing in...",
      success: () => {
        return "Demo Login Successful!";
      },
      error: () => {
        return "Demo Login Failed";
      },
    });
  };

  if (user || loading) return <Navigate to={location?.state || "/"} />;

  return (
    <Container>
      <div className={`min-h-screen transition-colors duration-300`}>
        <div className="py-8">
          <div className="flex items-center justify-between">
            <Logo />
            <ThemeToggle />
          </div>
          <div
            className={`grid lg:grid-cols-2 mt-8 items-center rounded-2xl overflow-hidden transition-all duration-300 ${
              isDark ? "bg-black" : "bg-white"
            }`}
          >
            <div className="hidden lg:block">
              <img
                src={loginImg}
                alt="Login Banner"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 lg:p-12">
              <h2
                className={`text-4xl font-bold text-center mb-6 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Welcome <span className="text-[#f87898]">Back</span>
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    placeholder="Enter your email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </span>
                  )}
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
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="pr-12"
                  />
                  <div
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
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="w-full btn-primary mt-6">
                  Login
                </button>

                {/* Demo Login Buttons */}
                <div
                  className={`mt-8 pt-6 border-t transition-colors duration-300 ${
                    isDark ? "border-white/20" : "border-gray-200"
                  }`}
                >
                  <h3
                    className={`text-2xl font-bold text-center mb-6 transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Demo <span className="text-[#f87898]">Login</span>
                  </h3>
                  <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleDemoLogin("demo.user@gmail.com", "user@gmail.com")
                      }
                      className="w-full btn-secondary"
                    >
                      User
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDemoLogin(
                          "demo.volunteer@gmail.com",
                          "volunteer@gmail.com"
                        )
                      }
                      className="w-full btn-secondary"
                    >
                      Volunteer
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDemoLogin(
                          "demo.admin@gmail.com",
                          "admin@gmail.com"
                        )
                      }
                      className="w-full btn-secondary"
                    >
                      Admin
                    </button>
                  </div>
                </div>

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

                {/* Google Login Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
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
                  className={`text-center transition-colors duration-300 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Don't have an account?{" "}
                  <Link
                    to={"/register"}
                    state={location.state}
                    className="text-[#f87898] font-medium hover:underline transition-colors duration-300"
                  >
                    Register
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

export default Login;
