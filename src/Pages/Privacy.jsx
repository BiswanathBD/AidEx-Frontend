import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";
import {
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaFileContract,
} from "react-icons/fa";

const Privacy = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <FaShieldAlt className="text-2xl text-[#f87898]" />,
      content: [
        {
          subtitle: "Information We Collect",
          text: "We collect information you provide directly to us, such as when you create an account, make a donation request, or contact us. This includes your name, email address, phone number, blood type, and location information.",
        },
        {
          subtitle: "How We Use Your Information",
          text: "We use the information we collect to provide, maintain, and improve our services, process donation requests, connect donors with recipients, and communicate with you about our services.",
        },
        {
          subtitle: "Information Sharing",
          text: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with verified blood donation organizations and medical facilities.",
        },
        {
          subtitle: "Data Security",
          text: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
        },
      ],
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: <FaFileContract className="text-2xl text-[#f87898]" />,
      content: [
        {
          subtitle: "Acceptance of Terms",
          text: "By accessing and using AidEx, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
        },
        {
          subtitle: "User Responsibilities",
          text: "Users are responsible for providing accurate information, maintaining the confidentiality of their account, and using the platform in accordance with applicable laws and regulations.",
        },
        {
          subtitle: "Prohibited Uses",
          text: "You may not use our service for any illegal or unauthorized purpose, to transmit viruses or malicious code, to violate any laws, or to interfere with the security of the platform.",
        },
        {
          subtitle: "Limitation of Liability",
          text: "AidEx shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
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
              <FaLock />
            </motion.div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          <span className={isDark ? "text-white" : "text-black/80"}>
            Privacy &
          </span>{" "}
          <span className="text-[#f87898]">Terms</span>
        </h2>
        <p
          className={`text-sm sm:text-base ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Your privacy and security are our top priorities.
          <br className="hidden sm:block" />
          Please review our policies and terms of service.
        </p>
      </motion.div>

      {/* Content Sections */}
      <div className="space-y-12">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
            className={`p-6 sm:p-8 lg:p-10 rounded-2xl group hover:scale-101 transition-all duration-300 ${
              isDark
                ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                : "bg-white"
            }`}
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
              {section.icon}
              <h2
                className={`text-2xl sm:text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {section.title}
              </h2>
            </div>

            {/* Section Content */}
            <div className="space-y-8">
              {section.content.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: sectionIndex * 0.2 + itemIndex * 0.1,
                  }}
                  className="space-y-3"
                >
                  <h3
                    className={`text-lg sm:text-xl font-semibold flex items-center gap-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <FaUserShield className="text-[#f87898]" />
                    {item.subtitle}
                  </h3>
                  <p
                    className={`text-base leading-relaxed ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={`mt-12 p-6 sm:p-8 rounded-2xl text-center group hover:scale-101 transition-all duration-300 ${
          isDark
            ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
            : "bg-white"
        }`}
      >
        <h3
          className={`text-xl sm:text-2xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Questions or Concerns?
        </h3>
        <p
          className={`text-base mb-6 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          If you have any questions about our Privacy Policy or Terms of
          Service, please contact us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://github.com/BiswanathBD"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-6 py-3 text-sm font-semibold"
          >
            Contact on GitHub
          </a>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Last updated: January 2025
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
