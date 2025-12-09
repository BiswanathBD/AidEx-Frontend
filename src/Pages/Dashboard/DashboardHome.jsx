import React, { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="">
      <h2 className="text-2xl font-bold justify-center flex items-center gap-3">
        <span>Welcome -</span>{" "}
        <span className="text-[#f87898] text-4xl">{user.name}</span>
      </h2>
    </div>
  );
};

export default DashboardHome;
