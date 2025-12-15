import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Container from "../Components/Shared/Container";
import Logo from "../Components/Shared/Logo";
import loginImg from "../assets/login-banner.jpg";
import { AuthContext } from "../Auth/AuthContext";
3541;
import { Link, Navigate, useLocation } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const { user, loading, passwordSignin } = useContext(AuthContext);
  const location = useLocation();

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

  if (user || loading) return <Navigate to={location?.state || "/"} />;

  return (
    <Container>
      <div className="my-8">
        <Logo />

        <div className="grid lg:grid-cols-2 mt-8 bg-white items-center rounded-lg overflow-hidden">
          <div className="hidden lg:block">
            <img
              src={loginImg}
              alt="Login Banner"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <h2 className="text-4xl font-bold text-center text-[#f87898] mb-6">
              Welcome <span className="text-black">Back</span>
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-neutral-500">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col relative">
                <label className="mb-2 font-medium text-neutral-500">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                />
                <div
                  className="absolute right-3 top-11 cursor-pointer text-gray-500"
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

              <button type="submit" className="w-full btn-primary mt-4">
                Login
              </button>

              <p className="text-center text-gray-500">
                Don’t have an account?{" "}
                <Link
                  to={"/register"}
                  state={location.state}
                  className="text-pink-600 font-medium hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
