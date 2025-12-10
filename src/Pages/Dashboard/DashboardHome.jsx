import React, { useContext } from "react";
import DonorDashboard from "../../Components/DonorDashboard";
import AdminVolunteerDashboard from "./AdminVolunteerDashboard";
import { AuthContext } from "../../Auth/AuthContext";

const DashboardHome = () => {
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  if (loading) return null;
  return (
    <div className="">
      {user.role === "Donor" && <DonorDashboard />}
      {(user.role === "Volunteer" || user.role === "Admin") && (
        <AdminVolunteerDashboard />
      )}
    </div>
  );
};

export default DashboardHome;
