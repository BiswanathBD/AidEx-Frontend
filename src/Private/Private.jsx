import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { Navigate, useLocation } from "react-router";

const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return null;

  if (!user)
    return (
      <Navigate to={"/login"} state={location.pathname} />
    );

  return children;
};

export default Private;
