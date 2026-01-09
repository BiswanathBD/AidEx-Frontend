import { useEffect, useRef } from "react";
import {
  FaHeartbeat,
  FaHandHoldingHeart,
  FaUsers,
  FaShieldAlt,
  FaBolt,
  FaDonate,
} from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";
import useScrollAnimation from "../Hooks/useScrollAnimation";

const features = [
  {
    icon: <FaHeartbeat />,
    title: "Emergency Blood Requests",
    description:
      "Create and respond to urgent blood donation requests quickly to save lives when it matters most.",
  },
  {
    icon: <FaUsers />,
    title: "Verified Donor Network",
    description:
      "Connect with verified donors based on blood group and location for safe and trusted donations.",
  },
  {
    icon: <FaDonate />,
    title: "Secure Funding System",
    description:
      "Support patients financially through a secure and transparent donation system powered by Stripe.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure & Protected Data",
    description:
      "Your personal data and activities are protected using Firebase authentication and role-based access.",
  },
  {
    icon: <FaBolt />,
    title: "Fast & Easy Process",
    description:
      "Simple forms, quick actions, and smooth navigation ensure a hassle-free user experience.",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Community Driven Impact",
    description:
      "AidEx brings donors, volunteers, and patients together to build a life-saving community.",
  },
];

const Features = () => {
  const { isDark } = useTheme();
  const cardsRef = useScrollAnimation("scroll-animate-card");

  return (
    <section className="py-16">
      <div>
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                isDark ? "bg-[#f87898]/10" : "bg-[#f87898]/5"
              }`}
            >
              <FaBolt className="text-[#f87898] text-2xl sm:text-3xl" />
            </div>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Why Choose <span className="text-[#f87898]">AidEx</span>?
          </h2>
          <p
            className={`text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            AidEx is built to make blood donation and emergency funding{" "}
            <br className="hidden sm:block" /> simple, secure, and impactful for
            everyone.
          </p>
        </div>

        {/* features*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`scroll-animate-card p-6 rounded-2xl group hover:scale-101 transition-all duration-300 ${
                isDark
                  ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                  : "bg-white hover:shadow-lg"
              }`}
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-xl text-2xl mb-4 transition-all duration-300 ${
                  isDark
                    ? "bg-[#f87898]/20 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
                    : "bg-[#f87898]/10 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
                }`}
              >
                {feature.icon}
              </div>

              <h3
                className={`text-xl font-semibold mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {feature.title}
              </h3>

              <p
                className={`text-sm leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
