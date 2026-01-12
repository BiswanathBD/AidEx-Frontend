import { useEffect, useRef } from "react";
import { useTheme } from "../Context/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaUserPlus,
  FaSearch,
  FaPhoneAlt,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const stepsData = [
  {
    step: 1,
    icon: <FaUserPlus />,
    title: "Register & Verify",
    description:
      "Create your account, complete profile with blood type, and verify your identity through our secure process.",
    details: [
      "Personal information",
      "Blood type confirmation",
      "Identity verification",
      "Medical screening",
    ],
  },
  {
    step: 2,
    icon: <MdBloodtype />,
    title: "Create or Find Request",
    description:
      "Post a blood donation request for emergency needs or search for existing requests in your area.",
    details: [
      "Emergency details",
      "Blood type needed",
      "Location & hospital",
      "Urgency level",
    ],
  },
  {
    step: 3,
    icon: <FaSearch />,
    title: "Smart Matching",
    description:
      "Our system automatically matches compatible donors with patients based on blood type and location.",
    details: [
      "Blood compatibility",
      "Geographic proximity",
      "Donor availability",
      "Response time",
    ],
  },
  {
    step: 4,
    icon: <FaPhoneAlt />,
    title: "Direct Communication",
    description:
      "Connect directly with donors or patients through secure in-app messaging and calling features.",
    details: [
      "Secure messaging",
      "Voice calls",
      "Location sharing",
      "Appointment scheduling",
    ],
  },
  {
    step: 5,
    icon: <FaHandHoldingHeart />,
    title: "Safe Donation",
    description:
      "Complete the donation at certified medical centers with professional supervision and safety protocols.",
    details: [
      "Certified hospitals",
      "Medical supervision",
      "Safety protocols",
      "Post-donation care",
    ],
  },
];

const HowItWorks = () => {
  const { isDark } = useTheme();
  const timelineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const timeline = timelineRef.current;
    const items = itemsRef.current;

    if (!timeline || items.length === 0) return;

    // Clear previous animations
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Animate each timeline item
    items.forEach((item) => {
      if (!item) return;

      // All items animate from right to left
      const direction = 100; // Always from right

      // Set initial state
      gsap.set(item, {
        x: direction,
        opacity: 0,
        scale: 0.9,
      });

      // Create scroll-triggered animation
      gsap.to(item, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
          scrub: false,
        },
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isDark]); // Re-run when theme changes

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
              <FaHandHoldingHeart className="text-[#f87898] text-2xl sm:text-3xl" />
            </div>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            How <span className="text-[#f87898]">AidEx</span> Works
          </h2>
          <p
            className={`max-w-3xl mx-auto text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Our streamlined process makes blood donation simple, safe, and
            efficient. From registration to donation, every step is designed to
            save lives quickly.
          </p>
        </div>

        {/* Steps Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto space-y-8">
          {stepsData.map((stepData, stepIndex) => (
            <div
              key={stepIndex}
              ref={(el) => (itemsRef.current[stepIndex] = el)}
              className="relative flex gap-6 justify-center"
            >
              {/* Timeline Left Side */}
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                  } border-4 border-[#f87898]`}
                >
                  <div className="text-[#f87898] text-xl transition-all duration-300 hover:scale-110">
                    {stepData.icon}
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#f87898] text-white text-sm font-bold flex items-center justify-center transition-all duration-300 hover:scale-125`}
                  >
                    {stepData.step}
                  </div>
                </div>

                {/* Timeline Line */}
                {stepIndex < stepsData.length - 1 && (
                  <div className="w-1 h-16 bg-[#f87898]/30 mt-4" />
                )}
              </div>

              {/* Card Content */}
              <div
                className={`group w-full max-w-3xl p-6 rounded-xl transition-all duration-500 hover:scale-[1.02] ${
                  isDark
                    ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                    : "bg-white"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold mb-2 transition-all duration-300 group-hover:text-[#f87898] ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {stepData.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed transition-all duration-300 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {stepData.description}
                    </p>
                  </div>
                </div>

                {/* Step Details */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {stepData.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f87898] shrink-0 transition-all duration-300 group-hover:scale-150" />
                      <span
                        className={`text-xs transition-all duration-300 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress Indicator */}
                <div className="mt-4 pt-3 border-t border-[#f87898]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div
                        className={`w-full rounded-full h-0.5 ${
                          isDark ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className="bg-[#f87898] h-0.5 rounded-full transition-all duration-1000 group-hover:w-full"
                          style={{
                            width: `${
                              (stepData.step / stepsData.length) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Step {stepData.step} of {stepsData.length}
                      </span>
                      <span className="text-xs text-[#f87898] font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {Math.round((stepData.step / stepsData.length) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
