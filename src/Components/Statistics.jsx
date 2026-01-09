import { useTheme } from "../Context/ThemeContext";
import {
  FaHeartbeat,
  FaUsers,
  FaHospital,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { MdBloodtype, MdLocationOn } from "react-icons/md";
import useScrollAnimation from "../Hooks/useScrollAnimation";

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
  const cardsRef = useScrollAnimation("scroll-animate-card");

  return (
    <section className="py-16">
      <div>
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <div
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                isDark ? "bg-[#f87898]/10" : "bg-[#f87898]/5"
              }`}
            >
              <FaHeartbeat className="text-[#f87898] text-2xl sm:text-3xl" />
            </div>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Our <span className="text-[#f87898]">Impact</span> in Numbers
          </h2>
          <p
            className={`max-w-3xl mx-auto text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Every donation counts. See how our community is making a difference
            in saving lives across Bangladesh.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {statisticsData.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`scroll-animate-card p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center group hover:scale-101 transition-all duration-300 ${
                isDark
                  ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                  : "bg-white hover:shadow-lg"
              }`}
            >
              <div className="flex justify-center mb-4">
                <div
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                    isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                  }`}
                >
                  <div className="text-[#f87898] text-2xl sm:text-3xl transition-all duration-300 group-hover:scale-110">
                    {stat.icon}
                  </div>
                </div>
              </div>

              <div className="text-3xl sm:text-4xl font-bold text-[#f87898] mb-2">
                {stat.number}
              </div>

              <h3
                className={`text-lg sm:text-xl font-semibold mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {stat.label}
              </h3>

              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
