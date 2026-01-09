import React from "react";
import { useTheme } from "../Context/ThemeContext";
import {
  FaUserPlus,
  FaSearch,
  FaPhoneAlt,
  FaHandHoldingHeart,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { MdBloodtype, MdLocationOn, MdNotifications } from "react-icons/md";

const stepsData = [
  {
    step: 1,
    icon: <FaUserPlus />,
    title: "Register & Verify",
    description:
      "Create your account, complete profile with blood type, and verify your identity through our secure process.",
    details: [
      "Personal information",
      "Blood type confirmation",
      "Identity verification",
      "Medical screening",
    ],
  },
  {
    step: 2,
    icon: <MdBloodtype />,
    title: "Create or Find Request",
    description:
      "Post a blood donation request for emergency needs or search for existing requests in your area.",
    details: [
      "Emergency details",
      "Blood type needed",
      "Location & hospital",
      "Urgency level",
    ],
  },
  {
    step: 3,
    icon: <FaSearch />,
    title: "Smart Matching",
    description:
      "Our system automatically matches compatible donors with patients based on blood type and location.",
    details: [
      "Blood compatibility",
      "Geographic proximity",
      "Donor availability",
      "Response time",
    ],
  },
  {
    step: 4,
    icon: <MdNotifications />,
    title: "Instant Notifications",
    description:
      "Donors receive immediate alerts about nearby requests, and patients get notified of available donors.",
    details: [
      "Push notifications",
      "SMS alerts",
      "Email updates",
      "Real-time status",
    ],
  },
  {
    step: 5,
    icon: <FaPhoneAlt />,
    title: "Direct Communication",
    description:
      "Connect directly with donors or patients through secure in-app messaging and calling features.",
    details: [
      "Secure messaging",
      "Voice calls",
      "Location sharing",
      "Appointment scheduling",
    ],
  },
  {
    step: 6,
    icon: <FaHandHoldingHeart />,
    title: "Safe Donation",
    description:
      "Complete the donation at certified medical centers with professional supervision and safety protocols.",
    details: [
      "Certified hospitals",
      "Medical supervision",
      "Safety protocols",
      "Post-donation care",
    ],
  },
];

const HowItWorks = () => {
  const { isDark } = useTheme();

  return (
    <section className="py-16">
      <div>
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            How <span className="text-[#f87898]">AidEx</span> Works
          </h2>
          <p
            className={`max-w-3xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Our streamlined process makes blood donation simple, safe, and
            efficient. From registration to donation, every step is designed to
            save lives quickly.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {stepsData.map((stepData, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < stepsData.length - 1 && (
                <div
                  className={`absolute left-8 top-20 w-0.5 h-16 ${
                    isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/20"
                  } hidden md:block`}
                />
              )}

              <div
                className={`flex flex-col md:flex-row gap-6 p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                  isDark
                    ? "bg-black border-[#f87898] hover:border-[#f87898]"
                    : "bg-white border-[#f87898]/5 hover:shadow-lg hover:border-[#f87898]/10"
                }`}
              >
                {/* Step Number & Icon */}
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2">
                  <div
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center ${
                      isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                    }`}
                  >
                    <div className="text-[#f87898] text-2xl">
                      {stepData.icon}
                    </div>
                    <div
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#f87898] text-white text-xs font-bold flex items-center justify-center`}
                    >
                      {stepData.step}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {stepData.title}
                  </h3>
                  <p
                    className={`mb-4 leading-relaxed ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {stepData.description}
                  </p>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2">
                    {stepData.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FaCheckCircle className="text-[#f87898] text-sm shrink-0" />
                        <span
                          className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow for larger screens */}
                {index < stepsData.length - 1 && (
                  <div className="hidden lg:flex items-center">
                    <FaArrowRight
                      className={`text-2xl ${
                        isDark ? "text-[#f87898]/30" : "text-[#f87898]/30"
                      }`}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <h3
            className={`text-2xl font-bold mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Ready to Get Started?
          </h3>
          <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Join thousands of heroes making a difference in their communities
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
