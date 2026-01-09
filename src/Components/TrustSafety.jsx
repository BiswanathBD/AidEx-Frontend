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
import useScrollAnimation from "../Hooks/useScrollAnimation";
import { motion } from "framer-motion"; // eslint-disable-line

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
  const trustCardsRef = useScrollAnimation("scroll-animate-card");
  const certCardsRef = useScrollAnimation("scroll-animate-card");

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
              <FaShieldAlt className="text-[#f87898] text-2xl sm:text-3xl" />
            </div>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Your Safety is Our <span className="text-[#f87898]">Priority</span>
          </h2>
          <p
            className={`max-w-3xl mx-auto text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We maintain the highest standards of safety, security, and trust to
            ensure every blood donation is safe, secure, and saves lives.
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (trustCardsRef.current[index] = el)}
              className={`scroll-animate-card p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl group hover:scale-101 transition-all duration-300 ${
                isDark
                  ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                  : "bg-white hover:shadow-lg"
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div
                  className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 group-hover:scale-110 ${
                    isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                  }`}
                >
                  <div className="text-[#f87898] text-lg sm:text-xl">
                    {feature.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-2 ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
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
                    <FaCheckCircle className="text-[#f87898] text-xs sm:text-sm shrink-0" />
                    <span
                      className={`text-xs sm:text-sm ${
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl mb-12 sm:mb-16 ${
            isDark
              ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
              : "bg-white hover:shadow-lg"
          } transition-all duration-300`}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3
              className={`text-xl sm:text-2xl font-bold mb-2 ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Security by the Numbers
            </h3>
            <p
              className={`text-sm sm:text-base ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Our commitment to safety and security in measurable terms
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div
                className={`text-2xl sm:text-3xl font-bold text-[#f87898] mb-2`}
              >
                99.9%
              </div>
              <div
                className={`text-xs sm:text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Uptime Guarantee
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl sm:text-3xl font-bold text-[#f87898] mb-2`}
              >
                256-bit
              </div>
              <div
                className={`text-xs sm:text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                SSL Encryption
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl sm:text-3xl font-bold text-[#f87898] mb-2`}
              >
                24/7
              </div>
              <div
                className={`text-xs sm:text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Security Monitoring
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl sm:text-3xl font-bold text-[#f87898] mb-2`}
              >
                100%
              </div>
              <div
                className={`text-xs sm:text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                GDPR Compliant
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h3
            className={`text-xl sm:text-2xl font-bold mb-6 sm:mb-8 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Trusted & Certified
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                ref={(el) => (certCardsRef.current[index] = el)}
                className="scroll-animate-card p-4 sm:p-6 rounded-lg sm:rounded-xl group hover:scale-101 transition-all duration-300 bg-[#f87898] hover:bg-[#f87898]/90 hover:shadow-md"
              >
                <div className="flex justify-center mb-3">
                  <FaCertificate className="text-white text-xl sm:text-2xl" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm mb-1 text-white">
                  {cert.name}
                </h4>
                <p className="text-xs text-white/80">{cert.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`mt-12 sm:mt-16 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl text-center ${
            isDark
              ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
              : "bg-[#f87898]/5 hover:bg-[#f87898]/10"
          } transition-all duration-300`}
        >
          <div className="flex justify-center mb-4">
            <MdSecurity className="text-[#f87898] text-2xl sm:text-3xl" />
          </div>
          <h3
            className={`text-lg sm:text-xl font-bold mb-2 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Emergency Support Available 24/7
          </h3>
          <p
            className={`mb-4 sm:mb-6 text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Our dedicated support team is always ready to help with urgent
            requests and safety concerns.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="tel:+8801628284848"
              className="btn-primary w-full sm:w-auto"
            >
              Emergency Hotline
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=biswanath.sarker.bd@gmail.com&su=Security%20Report%20-%20AidEx"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
            >
              Security Report
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSafety;
