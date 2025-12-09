import React, { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import DonorDashboard from "../../Components/DonorDashboard";

const DashboardHome = () => {
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  if (loading) return null;
  return <div className="">{user.role === "Donor" && <DonorDashboard />}</div>;
};

export default DashboardHome;
