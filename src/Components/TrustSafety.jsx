import React from "react";
import { useTheme } from "../Context/ThemeContext";
import {
  FaShieldAlt,
  FaUserCheck,
  FaHospital,
  FaLock,
  FaCertificate,
  FaHeartbeat,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";
import { MdVerifiedUser, MdSecurity } from "react-icons/md";

const trustFeatures = [
  {
    icon: <FaUserCheck />,
    title: "Verified Donors",
    description:
      "All donors go through a comprehensive verification process including identity confirmation and medical screening.",
    features: [
      "Identity Verification",
      "Medical History Check",
      "Blood Type Confirmation",
      "Regular Health Updates",
    ],
  },
  {
    icon: <FaHospital />,
    title: "Hospital Partnerships",
    description:
      "We work directly with certified hospitals and medical centers to ensure safe and professional blood collection.",
    features: [
      "Licensed Medical Centers",
      "Certified Blood Banks",
      "Professional Staff",
      "Quality Standards",
    ],
  },
  {
    icon: <FaLock />,
    title: "Data Security",
    description:
      "Your personal information is protected with enterprise-grade security and strict privacy protocols.",
    features: [
      "End-to-End Encryption",
      "GDPR Compliant",
      "Secure Payment Processing",
      "Privacy Protection",
    ],
  },
  {
    icon: <FaHeartbeat />,
    title: "Medical Standards",
    description:
      "We follow international blood donation guidelines and maintain the highest medical safety standards.",
    features: [
      "WHO Guidelines",
      "Safety Protocols",
      "Quality Assurance",
      "Medical Supervision",
    ],
  },
];

const certifications = [
  { name: "ISO 27001", description: "Information Security Management" },
  { name: "HIPAA", description: "Health Information Privacy" },
  { name: "SOC 2", description: "Security & Availability" },
  { name: "FDA Guidelines", description: "Blood Safety Standards" },
];

const TrustSafety = () => {
  const { isDark } = useTheme();

  return (
    <section className="py-16">
      <div>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div
              className={`p-4 rounded-2xl ${
                isDark ? "bg-[#f87898]/10" : "bg-[#f87898]/5"
              }`}
            >
              <FaShieldAlt className="text-[#f87898] text-3xl" />
            </div>
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Your Safety is Our <span className="text-[#f87898]">Priority</span>
          </h2>
          <p
            className={`max-w-3xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We maintain the highest standards of safety, security, and trust to
            ensure every blood donation is safe, secure, and saves lives.
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-black border-[#f87898] hover:border-[#f87898]"
                  : "bg-white border-[#f87898]/5 hover:shadow-lg hover:border-[#f87898]/10"
              }`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`p-3 rounded-xl ${
                    isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                  }`}
                >
                  <div className="text-[#f87898] text-xl">{feature.icon}</div>
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-xl font-bold mb-2 ${
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
              </div>

              <div className="space-y-2">
                {feature.features.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FaCheckCircle className="text-[#f87898] text-sm shrink-0" />
                    <span
                      className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Security Stats */}
        <div
          className={`p-8 rounded-2xl border mb-16 ${
            isDark ? "bg-black border-[#f87898]" : "bg-white border-[#f87898]/5"
          }`}
        >
          <div className="text-center mb-8">
            <h3
              className={`text-2xl font-bold mb-2 ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Security by the Numbers
            </h3>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Our commitment to safety and security in measurable terms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className={`text-3xl font-bold text-[#f87898] mb-2`}>
                99.9%
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Uptime Guarantee
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold text-[#f87898] mb-2`}>
                256-bit
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                SSL Encryption
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold text-[#f87898] mb-2`}>
                24/7
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Security Monitoring
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold text-[#f87898] mb-2`}>
                100%
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                GDPR Compliant
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center">
          <h3
            className={`text-2xl font-bold mb-8 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Trusted & Certified
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className="flex justify-center mb-3">
                  <FaCertificate className="text-[#f87898] text-2xl" />
                </div>
                <h4
                  className={`font-bold text-sm mb-1 ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {cert.name}
                </h4>
                <p
                  className={`text-xs ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div
          className={`mt-16 p-8 rounded-2xl border text-center ${
            isDark
              ? "bg-[#f87898]/5 border-[#f87898]/10"
              : "bg-[#f87898]/5 border-[#f87898]/10"
          }`}
        >
          <div className="flex justify-center mb-4">
            <MdSecurity className="text-[#f87898] text-3xl" />
          </div>
          <h3
            className={`text-xl font-bold mb-2 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Emergency Support Available 24/7
          </h3>
          <p className={`mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Our dedicated support team is always ready to help with urgent
            requests and safety concerns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+8801628284848" className="btn-primary">
              Emergency Hotline
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=biswanath.sarker.bd@gmail.com&su=Security%20Report%20-%20AidEx"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Security Report
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSafety;
