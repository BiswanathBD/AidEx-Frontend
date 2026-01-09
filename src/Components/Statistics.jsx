import React from "react";
import { useTheme } from "../Context/ThemeContext";
import {
  FaHeartbeat,
  FaUsers,
  FaHospital,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { MdBloodtype, MdLocationOn } from "react-icons/md";

const statisticsData = [
  {
    icon: <FaUsers />,
    number: "25,000+",
    label: "Registered Donors",
    description: "Active blood donors ready to help",
  },
  {
    icon: <FaHeartbeat />,
    number: "15,000+",
    label: "Lives Saved",
    description: "Through successful blood donations",
  },
  {
    icon: <MdBloodtype />,
    number: "8,500+",
    label: "Blood Units Donated",
    description: "Total blood units collected",
  },
  {
    icon: <FaHospital />,
    number: "150+",
    label: "Partner Hospitals",
    description: "Certified medical centers",
  },
  {
    icon: <MdLocationOn />,
    number: "64",
    label: "Districts Covered",
    description: "Across Bangladesh",
  },
  {
    icon: <FaHandHoldingHeart />,
    number: "98%",
    label: "Success Rate",
    description: "Successful donor matches",
  },
];

const Statistics = () => {
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
            Our <span className="text-[#f87898]">Impact</span> in Numbers
          </h2>
          <p
            className={`max-w-3xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Every donation counts. See how our community is making a difference
            in saving lives across Bangladesh.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statisticsData.map((stat, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border text-center transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-black border-[#f87898] hover:border-[#f87898]"
                  : "bg-white border-[#f87898]/5 hover:shadow-lg hover:border-[#f87898]/10"
              }`}
            >
              <div className="flex justify-center mb-4">
                <div
                  className={`p-4 rounded-2xl ${
                    isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                  }`}
                >
                  <div className="text-[#f87898] text-3xl">{stat.icon}</div>
                </div>
              </div>

              <div className="text-4xl font-bold text-[#f87898] mb-2">
                {stat.number}
              </div>

              <h3
                className={`text-xl font-semibold mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {stat.label}
              </h3>

              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3
            className={`text-2xl font-bold mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Be Part of This <span className="text-[#f87898]">Amazing</span>{" "}
            Journey
          </h3>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Join thousands of heroes who are saving lives every day
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
