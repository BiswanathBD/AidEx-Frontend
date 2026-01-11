import { useTheme } from "../Context/ThemeContext";
import Container from "../Components/Shared/Container";
import { Link } from "react-router";
import { motion } from "framer-motion"; // eslint-disable-line
import {
  FaHeart,
  FaUsers,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaGlobe,
  FaAward,
  FaInfoCircle,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

const About = () => {
  const { isDark } = useTheme();

  const stats = [
    { icon: FaUsers, number: "10,000+", label: "Registered Donors" },
    { icon: MdBloodtype, number: "5,000+", label: "Lives Saved" },
    { icon: FaHandHoldingHeart, number: "15,000+", label: "Donations Made" },
    { icon: FaGlobe, number: "64", label: "Districts Covered" },
  ];

  const features = [
    {
      icon: FaHeart,
      title: "Life-Saving Mission",
      description:
        "Our platform connects blood donors with those in urgent need, creating a network that saves lives every day.",
    },
    {
      icon: FaShieldAlt,
      title: "Safe & Secure",
      description:
        "We prioritize the safety and privacy of our users with secure data handling and verified donor profiles.",
    },
    {
      icon: FaUsers,
      title: "Community Driven",
      description:
        "Built by the community, for the community. Every donation request and response strengthens our network.",
    },
    {
      icon: FaAward,
      title: "Trusted Platform",
      description:
        "Recognized by healthcare professionals and trusted by thousands of donors and recipients nationwide.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Ahmed",
      role: "Medical Director",
      description:
        "Leading hematologist with 15+ years of experience in blood banking and transfusion medicine.",
    },
    {
      name: "Mohammad Rahman",
      role: "Platform Director",
      description:
        "Technology leader passionate about using innovation to solve healthcare challenges.",
    },
    {
      name: "Fatima Khan",
      role: "Community Manager",
      description:
        "Dedicated to building strong relationships between donors and healthcare facilities.",
    },
  ];

  return (
    <div
      className={`${isDark ? "text-gray-200" : "text-gray-800"} min-h-screen`}
    >
      <Container>
        {/* Title Section */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="flex justify-center mb-4">
            <div
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/5"
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-2xl sm:text-3xl text-[#f87898]"
              >
                <FaInfoCircle />
              </motion.div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className={isDark ? "text-white" : "text-black/80"}>
              About
            </span>{" "}
            <span className="text-[#f87898]">AidEx</span>
          </h2>
          <p
            className={`text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Bangladesh's premier blood donation platform, connecting
            <br className="hidden sm:block" />
            donors with those in need through technology and compassion.
          </p>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`rounded-2xl p-8 sm:p-12 mb-16 group hover:scale-101 transition-all duration-300 ${
            isDark
              ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10 border border-white/10"
              : "bg-white hover:shadow-lg shadow-md"
          }`}
        >
          <div className="text-center">
            <div
              className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? "bg-[#f87898]/20 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
                  : "bg-[#f87898]/10 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
              }`}
            >
              <FaHeart className="text-2xl" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Our <span className="text-[#f87898]">Mission</span>
            </h2>
            <p
              className={`text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              To create a seamless, reliable, and accessible blood donation
              network that ensures no one in Bangladesh goes without the
              life-saving blood they need. We believe that every drop counts and
              every donor is a hero.
            </p>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Our <span className="text-[#f87898]">Impact</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className={`text-center p-6 rounded-xl group hover:scale-101 transition-all duration-300 ${
                  isDark
                    ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10 border border-white/10"
                    : "bg-white hover:shadow-lg shadow-md"
                }`}
              >
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDark
                      ? "bg-[#f87898]/20 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
                      : "bg-[#f87898]/10 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
                  }`}
                >
                  <stat.icon className="text-xl" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#f87898] mb-2">
                  {stat.number}
                </div>
                <div
                  className={`text-sm sm:text-base font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-[#f87898]">AidEx</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className={`p-6 sm:p-8 rounded-xl group hover:scale-101 transition-all duration-300 ${
                  isDark
                    ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10 border border-white/10"
                    : "bg-white hover:shadow-lg shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isDark
                        ? "bg-[#f87898]/20 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
                        : "bg-[#f87898]/10 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
                    }`}
                  >
                    <feature.icon className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p
                      className={`leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Meet Our <span className="text-[#f87898]">Team</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className={`text-center p-6 sm:p-8 rounded-xl group hover:scale-101 transition-all duration-300 ${
                  isDark
                    ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10 border border-white/10"
                    : "bg-white hover:shadow-lg shadow-md"
                }`}
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDark
                      ? "bg-[#f87898]/20 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
                      : "bg-[#f87898]/10 text-[#f87898] group-hover:bg-[#f87898] group-hover:text-white"
                  }`}
                >
                  <FaUsers className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <div className="text-[#f87898] font-semibold mb-4">
                  {member.role}
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className={`text-center p-8 sm:p-12 rounded-2xl ${
            isDark
              ? "bg-linear-to-r from-[#f87898]/10 to-[#f87898]/5 border border-[#f87898]/20"
              : "bg-linear-to-r from-[#f87898]/5 to-white border border-[#f87898]/10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to <span className="text-[#f87898]">Save Lives</span>?
          </h2>
          <p
            className={`text-lg sm:text-xl mb-8 max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Join thousands of heroes who are making a difference in their
            communities. Every donation counts, every donor matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="btn-primary text-lg px-8 py-3">
                Become a Donor
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/requests" className="btn-secondary text-lg px-8 py-3">
                Find Blood
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default About;
