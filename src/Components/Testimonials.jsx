import React from "react";
import { useTheme } from "../Context/ThemeContext";
import { FaQuoteLeft, FaStar, FaHeart } from "react-icons/fa";

const testimonialsData = [
  {
    name: "Sarah Ahmed",
    role: "Blood Recipient",
    location: "Dhaka",
    image: "/src/assets/default-profile.png",
    rating: 5,
    testimonial:
      "AidEx saved my life during a critical surgery. Within 30 minutes, I found a compatible donor. The platform is incredibly efficient and the donors are true heroes.",
    bloodType: "O-",
  },
  {
    name: "Dr. Rahman Khan",
    role: "Emergency Physician",
    location: "Chittagong Medical College",
    image: "/src/assets/default-profile.png",
    rating: 5,
    testimonial:
      "As a doctor, I've seen how AidEx transforms emergency care. The quick response time and verified donors make it an invaluable resource for our hospital.",
    bloodType: "A+",
  },
  {
    name: "Fatima Begum",
    role: "Regular Donor",
    location: "Sylhet",
    image: "/src/assets/default-profile.png",
    rating: 5,
    testimonial:
      "I've donated blood 15 times through AidEx. The platform makes it so easy to help others, and knowing I've saved lives gives me immense satisfaction.",
    bloodType: "B+",
  },
  {
    name: "Mohammad Hassan",
    role: "Patient's Father",
    location: "Rajshahi",
    image: "/src/assets/default-profile.png",
    rating: 5,
    testimonial:
      "When my son needed emergency blood transfusion, AidEx connected us with donors immediately. The support team was incredibly helpful throughout the process.",
    bloodType: "AB+",
  },
  {
    name: "Dr. Nasreen Akter",
    role: "Hematologist",
    location: "DMCH",
    image: "/src/assets/default-profile.png",
    rating: 5,
    testimonial:
      "AidEx has revolutionized how we handle blood shortages. The platform's reliability and donor verification process ensures safe transfusions for our patients.",
    bloodType: "O+",
  },
  {
    name: "Karim Uddin",
    role: "Volunteer Donor",
    location: "Khulna",
    image: "/src/assets/default-profile.png",
    rating: 5,
    testimonial:
      "Being part of the AidEx community means being part of something bigger. Every donation notification is an opportunity to save a life.",
    bloodType: "A-",
  },
];

const Testimonials = () => {
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
              <FaHeart className="text-[#f87898] text-3xl" />
            </div>
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Stories of <span className="text-[#f87898]">Hope</span> & Healing
          </h2>
          <p
            className={`max-w-3xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Real stories from donors, patients, and medical professionals who
            have experienced the life-saving impact of our community.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-black border-[#f87898] hover:border-[#f87898]"
                  : "bg-white border-[#f87898]/5 hover:shadow-lg hover:border-[#f87898]/10"
              }`}
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-4">
                <FaQuoteLeft className="text-[#f87898] text-2xl opacity-50" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-[#f87898] text-sm" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p
                className={`text-sm leading-relaxed mb-6 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                "{testimonial.testimonial}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#f87898]/20"
                />
                <div className="flex-1">
                  <h4
                    className={`font-semibold ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {testimonial.name}
                  </h4>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {testimonial.role}
                  </p>
                  <p
                    className={`text-xs ${
                      isDark ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    {testimonial.location}
                  </p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    isDark
                      ? "bg-[#f87898]/20 text-[#f87898]"
                      : "bg-[#f87898]/10 text-[#f87898]"
                  }`}
                >
                  {testimonial.bloodType}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 p-8 rounded-2xl border text-center ${
            isDark
              ? "bg-[#f87898]/5 border-[#f87898]/10"
              : "bg-[#f87898]/5 border-[#f87898]/10"
          }`}
        >
          <h3
            className={`text-xl font-bold mb-2 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Ready to Make a Difference?
          </h3>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Join our community of heroes and start saving lives today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
