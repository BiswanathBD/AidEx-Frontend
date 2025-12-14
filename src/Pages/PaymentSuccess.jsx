import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Loader from "../Components/Shared/Loader";
import useAxios from "../Hooks/useAxios";
import { PiSealCheckDuotone } from "react-icons/pi";

const PaymentSuccess = () => {
  const axiosInstance = useAxios();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    axiosInstance
      .get(`/checkout-session?sessionId=${sessionId}`)
      .then(async (res) => {
        const fundingDate = new Date();

        const paymentData = {
          ...res.data,
          fundingDate,
        };
        setPayment(paymentData);

        // save donation to DB
        if (paymentData.transactionId) {
          await axiosInstance.post("/funds", paymentData);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [axiosInstance, sessionId]);

  if (loading) return <Loader />;
  if (!payment) return;

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white py-6 px-10 rounded-2xl text-center">
        <div className="flex justify-center mb-6">
          <PiSealCheckDuotone size={128} color="green" />
        </div>
        <h2 className="text-3xl font-bold">Payment Successful</h2>

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

export default PaymentSuccess;
