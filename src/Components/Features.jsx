import React from "react";
import {
  FaHeartbeat,
  FaHandHoldingHeart,
  FaUsers,
  FaShieldAlt,
  FaBolt,
  FaDonate,
} from "react-icons/fa";

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
  return (
    <section className="py-16">
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Choose <span className="text-[#f87898]">AidEx</span>?
          </h2>
          <p className="mt-3 text-gray-600">
            AidEx is built to make blood donation and emergency funding <br /> simple,
            secure, and impactful for everyone.
          </p>
        </div>

        {/* features*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl group hover:scale-101 transition-all"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#f87898]/10 text-[#f87898] text-2xl mb-4 group-hover:bg-[#f87898] group-hover:text-white transition-all">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
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
