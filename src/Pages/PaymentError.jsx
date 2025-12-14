import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Link } from "react-router";

const PaymentError = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white py-6 px-10 rounded-2xl text-center">
        <div className="flex justify-center mb-6">
          <FaRegCircleXmark size={128} color="red" />
        </div>
        <h2 className="text-3xl font-bold">Payment Failed</h2>

        <div className="mt-8 mb-2 flex gap-4 justify-center">
          <Link
            to={"/funding"}
            className="btn-primary bg-white! text-[#f87898]! border border-[#f87898]!"
          >
            Funding
          </Link>
          <Link to={"/"} className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;
