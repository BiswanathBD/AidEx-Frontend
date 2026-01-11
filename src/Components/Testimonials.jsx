import { useTheme } from "../Context/ThemeContext";
import {
  FaQuoteLeft,
  FaStar,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonialsData = [
  {
    name: "Sarah Ahmed",
    role: "Blood Recipient",
    location: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial:
      "AidEx saved my life during a critical surgery. Within 30 minutes, I found a compatible donor.",
    bloodType: "O-",
  },
  {
    name: "Dr. Rahman Khan",
    role: "Emergency Physician",
    location: "Chittagong Medical College",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial:
      "As a doctor, I've seen how AidEx transforms emergency care. The quick response time is invaluable.",
    bloodType: "A+",
  },
  {
    name: "Fatima Begum",
    role: "Regular Donor",
    location: "Sylhet",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial:
      "I've donated blood 15 times through AidEx. The platform makes it so easy to help others.",
    bloodType: "B+",
  },
  {
    name: "Mohammad Hassan",
    role: "Patient's Father",
    location: "Rajshahi",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial:
      "When my son needed emergency blood transfusion, AidEx connected us with donors immediately.",
    bloodType: "AB+",
  },
  {
    name: "Dr. Nasreen Akter",
    role: "Hematologist",
    location: "DMCH",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial:
      "AidEx has revolutionized how we handle blood shortages. The platform's reliability ensures safe transfusions.",
    bloodType: "O+",
  },
  {
    name: "Karim Uddin",
    role: "Volunteer Donor",
    location: "Khulna",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial:
      "Being part of the AidEx community means being part of something bigger. Every donation saves a life.",
    bloodType: "A-",
  },
];

const Testimonials = () => {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(1); // Start with middle card featured
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      let index = currentIndex + i;
      if (index < 0) index = testimonialsData.length - 1;
      if (index >= testimonialsData.length) index = 0;
      visible.push({ ...testimonialsData[index], position: i });
    }
    return visible;
  };

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
              <FaHeart className="text-[#f87898] text-2xl sm:text-3xl" />
            </div>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Stories of <span className="text-[#f87898]">Hope</span> & Healing
          </h2>
          <p
            className={`max-w-3xl mx-auto text-sm sm:text-base ${
              isDark ? "text-white/70" : "text-black/70"
            }`}
          >
            Real stories from donors, patients, and medical professionals who
            have experienced the life-saving impact of our community.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-7xl mx-auto px-4"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Cards Container */}
          <div className="flex items-center justify-center gap-4 lg:gap-8 min-h-[400px]">
            {getVisibleTestimonials().map((testimonial, index) => {
              const isFeatured = testimonial.position === 0;
              const isLeft = testimonial.position === -1;
              const isRight = testimonial.position === 1;

              return (
                <motion.div
                  key={`${testimonial.name}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isFeatured ? 1 : 0.6,
                    scale: isFeatured ? 1 : 0.85,
                    zIndex: isFeatured ? 10 : 1,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`relative rounded-2xl p-6 lg:p-8 w-80 lg:w-96 ${
                    isFeatured
                      ? isDark
                        ? "bg-black border-2 border-[#f87898]/50 shadow-2xl shadow-[#f87898]/20"
                        : "bg-white border-2 border-[#f87898]/30 shadow-2xl shadow-[#f87898]/10"
                      : isDark
                      ? "bg-black/50 border border-white/20"
                      : "bg-white/50 border border-black/20"
                  } ${isLeft ? "lg:-mr-8" : ""} ${isRight ? "lg:-ml-8" : ""}`}
                >
                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#f87898] text-white px-4 py-1 rounded-full text-xs font-semibold">
                        Featured Story
                      </div>
                    </div>
                  )}

                  {/* Quote Icon */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-3 rounded-full ${
                        isFeatured
                          ? "bg-[#f87898]/20"
                          : isDark
                          ? "bg-white/10"
                          : "bg-black/10"
                      }`}
                    >
                      <FaQuoteLeft
                        className={`text-xl ${
                          isFeatured
                            ? "text-[#f87898]"
                            : isDark
                            ? "text-white/60"
                            : "text-black/60"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p
                    className={`text-center text-sm lg:text-base leading-relaxed mb-6 ${
                      isFeatured
                        ? isDark
                          ? "text-white"
                          : "text-black"
                        : isDark
                        ? "text-white/70"
                        : "text-black/70"
                    }`}
                  >
                    "{testimonial.testimonial}"
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          isFeatured
                            ? "text-[#f87898]"
                            : isDark
                            ? "text-white/50"
                            : "text-black/50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* User Info */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover ${
                          isFeatured
                            ? "border-3 border-[#f87898]/50"
                            : "border-2 border-white/30"
                        }`}
                        onError={(e) => {
                          e.target.src = "/src/assets/default-profile.png";
                        }}
                      />
                      {isFeatured && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-black"></div>
                      )}
                    </div>

                    <div className="text-center">
                      <h4
                        className={`text-sm lg:text-base font-bold mb-1 ${
                          isFeatured
                            ? isDark
                              ? "text-white"
                              : "text-black"
                            : isDark
                            ? "text-white/80"
                            : "text-black/80"
                        }`}
                      >
                        {testimonial.name}
                      </h4>
                      <p
                        className={`text-xs lg:text-sm mb-1 ${
                          isFeatured
                            ? isDark
                              ? "text-white/70"
                              : "text-black/70"
                            : isDark
                            ? "text-white/60"
                            : "text-black/60"
                        }`}
                      >
                        {testimonial.role}
                      </p>
                      <p
                        className={`text-xs ${
                          isFeatured
                            ? isDark
                              ? "text-white/60"
                              : "text-black/60"
                            : isDark
                            ? "text-white/50"
                            : "text-black/50"
                        }`}
                      >
                        {testimonial.location}
                      </p>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isFeatured
                          ? "bg-[#f87898]/20 text-[#f87898] border border-[#f87898]/30"
                          : isDark
                          ? "bg-white/10 text-white/80"
                          : "bg-black/10 text-black/80"
                      }`}
                    >
                      {testimonial.bloodType}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 ${
              isDark
                ? "bg-black/80 hover:bg-black text-white/80 hover:text-white"
                : "bg-white hover:bg-white/90 text-black/80 hover:text-black shadow-lg"
            }`}
          >
            <FaChevronLeft className="text-lg" />
          </button>

          <button
            onClick={nextTestimonial}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 ${
              isDark
                ? "bg-black/80 hover:bg-black text-white/80 hover:text-white"
                : "bg-white hover:bg-white/90 text-black/80 hover:text-black shadow-lg"
            }`}
          >
            <FaChevronRight className="text-lg" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#f87898] scale-125"
                    : isDark
                    ? "bg-white/40 hover:bg-white/60"
                    : "bg-black/40 hover:bg-black/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
