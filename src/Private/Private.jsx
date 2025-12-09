import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { Navigate, useLocation } from "react-router";

const Private = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return <Navigate to={"/login"} state={location.pathname} />;

  return children;
};

export default Private;
