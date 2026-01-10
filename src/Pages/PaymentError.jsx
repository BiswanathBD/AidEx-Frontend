import React from "react";
import { motion } from "framer-motion";
import { FaSackXmark } from "react-icons/fa6";
import { Link } from "react-router";
motion;

const PaymentError = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex justify-center mt-8"
    >
      <div className="py-6 px-10 rounded-2xl text-center">
        <div className="flex justify-center mb-6">
          <FaSackXmark size={128} color="#e91e63" />
        </div>
        <h2 className="text-3xl font-bold">Payment Failed</h2>

        <div className="mt-8 mb-2 flex gap-4 justify-center">
          <Link to={"/funding"} className="btn-secondary">
            Funding
          </Link>
          <Link to={"/"} className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentError;
