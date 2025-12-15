import React from "react";
import { AuthContext } from "../Auth/AuthContext";

const MakePayment = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
  };
  return (
    <div className="w-fit p-4 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold text-[#f87898]">Give Fund</h2>

      <form onSubmit={handleSubmit}></form>
    </div>
  );
};

export default MakePayment;
