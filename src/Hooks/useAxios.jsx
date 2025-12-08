import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";

const useAxios = () => {
  const { user } = useContext(AuthContext);

  const instance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: user?.accessToken ? `Bearer ${user.accessToken}` : "",
    },
  });
  return instance;
};

export default useAxios;
