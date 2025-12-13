import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth/AuthContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://aidex-backend-by-biswanath.vercel.app",
});

const useAxios = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use((config) => {
      const token = user?.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [user?.accessToken]);

  return axiosInstance;
};

export default useAxios;
