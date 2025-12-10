import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { Navigate } from "react-router";

const AllUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const axiosInstance = useAxios();
  console.log(allUsers);

  useEffect(() => {
    axiosInstance.get("/allUsers").then((res) => setAllUsers(res.data));
  }, [axiosInstance]);

  if (loading) return null;
  if (user.role !== "Admin") return <Navigate to={'/dashboard'}/>;

  return <div>All users</div>;
};

export default AllUsers;
