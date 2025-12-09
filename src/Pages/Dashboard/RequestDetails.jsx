import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";

const RequestDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/donation-request/${id}`).then((res) => setRequest(res.data));
  }, [id, axiosInstance]);

  if (!request) return null;

  const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    inprogress: "bg-blue-100 text-blue-700",
    done: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-5 bg-white rounded-xl mt-6">
      <div className="lg:flex lg:gap-10 lg:items-start">
        {/* left side blood group */}
        <div className="flex justify-center lg:block bg-gray-50 p-4 lg:p-8 rounded-lg">
          <div className="w-32 lg:w-48 aspect-square rounded-full bg-[#f87898]/20 shadow-[0_0_35px_#f8789833] flex items-center justify-center">
            <span className="text-5xl lg:text-7xl font-extrabold text-[#f87898] ml-1 mb-1">
              {request.bloodGroup}
            </span>
          </div>
        </div>

        <div className="lg:flex-1">

          <h2 className="text-3xl font-bold text-[#f87898] mb-8">
            Donation Request Details
          </h2>

          {/* right side info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

            <div className="bg-gray-50 rounded-lg px-4 py-3 overflow-hidden">
              <span className="text-gray-500 text-sm">Requester Name</span>
              <p className="font-medium text-gray-800 mt-1">{request.requesterName}</p>
            </div>

            <div className="bg-gray-50 rounded-lg px-4 py-3 overflow-hidden">
              <span className="text-gray-500 text-sm">Requester Email</span>
              <p className="font-medium mt-1">{request.requesterEmail}</p>
            </div>

            <div className="bg-gray-50 rounded-lg px-4 py-3 overflow-hidden">
              <span className="text-gray-500 text-sm">Recipient Name</span>
              <p className="font-medium mt-1">{request.recipientName}</p>
            </div>

            <div className="bg-gray-50 rounded-lg px-4 py-3 overflow-hidden">
              <span className="text-gray-500 text-sm">Recipient Email</span>
              <p className="font-medium mt-1">{request.requesterEmail}</p>
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <div className="bg-gray-50 px-4 py-3 rounded-lg overflow-hidden">
          <span className="text-gray-500 text-sm">Hospital</span>
          <p className="font-medium mt-1">{request.hospital}</p>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg overflow-hidden">
          <span className="text-gray-500 text-sm">Address</span>
          <p className="font-medium mt-1">{request.address}</p>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg overflow-hidden">
          <span className="text-gray-500 text-sm">District</span>
          <p className="font-medium mt-1">{request.district}</p>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg overflow-hidden">
          <span className="text-gray-500 text-sm">Upazila</span>
          <p className="font-medium mt-1">{request.upazila}</p>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg overflow-hidden">
          <span className="text-gray-500 text-sm">Donation Date</span>
          <p className="font-medium mt-1">{request.donationDate}</p>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg overflow-hidden">
          <span className="text-gray-500 text-sm">Donation Time</span>
          <p className="font-medium mt-1">{formatTime(request.donationTime)}</p>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg overflow-hidden">
          <span className="text-gray-500 text-sm">Message</span>
          <p className="font-medium mt-1">{request.message}</p>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg grid overflow-hidden">
          <span className="text-gray-500 text-sm">Status</span>
          <span
            className={`mt-1 w-fit inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${
              statusColor[request.status.toLowerCase()]
            }`}
          >
            {request.status}
          </span>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg overflow-hidden">
          <span className="text-gray-500 text-sm">Requested At</span>
          <p className="font-medium mt-1">
            {new Date(request.requested_at).toLocaleString()}
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-8 w-full py-3 bg-[#f87898] text-white font-semibold rounded-lg hover:bg-[#f66086] transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default RequestDetails;
