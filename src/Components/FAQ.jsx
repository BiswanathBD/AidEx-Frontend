import { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import { MdBloodtype, MdSecurity, MdPhone } from "react-icons/md";

const faqData = [
  {
    category: "General",
    icon: <FaQuestionCircle />,
    questions: [
      {
        question: "What is AidEx and how does it work?",
        answer:
          "AidEx is a blood donation and emergency funding platform that connects donors with patients in need. Users can create donation requests, find compatible donors, and provide financial support for medical emergencies through our secure platform.",
      },
      {
        question: "Is AidEx free to use?",
        answer:
          "Yes, AidEx is completely free for donors and patients. We don't charge any fees for creating requests, finding donors, or using our platform. Our funding system uses secure payment processing with transparent fees.",
      },
      {
        question: "How do I get started with AidEx?",
        answer:
          "Simply register an account, complete your profile with basic information and blood type, and you can immediately start helping others by donating blood or providing financial support for medical emergencies.",
      },
    ],
  },
  {
    category: "Blood Donation",
    icon: <MdBloodtype />,
    questions: [
      {
        question: "Who can donate blood through AidEx?",
        answer:
          "Anyone aged 18-65, weighing at least 50kg, and in good health can donate blood. You must not have donated blood in the last 3 months and meet standard medical eligibility criteria.",
      },
      {
        question: "How often can I donate blood?",
        answer:
          "You can donate whole blood every 3 months (12 weeks). Our system automatically tracks your donation history and will notify you when you're eligible to donate again.",
      },
      {
        question: "Is blood donation safe?",
        answer:
          "Yes, blood donation is completely safe. We work only with certified medical centers that follow WHO guidelines. All equipment is sterile and single-use, and trained medical professionals oversee the process.",
      },
      {
        question: "What should I do before and after donating blood?",
        answer:
          "Before: Eat a healthy meal, stay hydrated, get adequate sleep, and avoid alcohol. After: Rest for 15 minutes, drink plenty of fluids, avoid heavy lifting for 24 hours, and eat iron-rich foods.",
      },
    ],
  },
  {
    category: "Safety & Security",
    icon: <MdSecurity />,
    questions: [
      {
        question: "How do you verify donors and patients?",
        answer:
          "All users go through identity verification including government ID confirmation, phone number verification, and medical history screening. Donors also undergo blood type confirmation at certified medical centers.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Yes, we use enterprise-grade security including 256-bit SSL encryption, secure servers, and strict privacy protocols. We're GDPR compliant and never share your personal information without consent.",
      },
      {
        question: "How do you ensure blood safety?",
        answer:
          "We partner only with licensed medical centers that follow international blood safety standards. All donated blood is tested for infectious diseases and processed according to WHO guidelines.",
      },
    ],
  },
  {
    category: "Emergency Support",
    icon: <MdPhone />,
    questions: [
      {
        question: "What constitutes a medical emergency on AidEx?",
        answer:
          "Medical emergencies include urgent blood needs for surgeries, accidents, childbirth complications, cancer treatments, and other life-threatening conditions requiring immediate blood transfusion.",
      },
      {
        question: "How quickly can I get help in an emergency?",
        answer:
          "Emergency requests are prioritized and sent to nearby donors immediately. Our average response time is under 30 minutes, with many donors responding within 15 minutes of receiving an alert.",
      },
      {
        question: "Is there 24/7 support available?",
        answer:
          "Yes, our emergency hotline operates 24/7 for urgent blood requests and critical support. You can also reach our support team through the app or website at any time.",
      },
      {
        question: "What if I can't find a compatible donor?",
        answer:
          "Our system automatically expands the search radius and notifies additional donors. We also coordinate with partner blood banks and hospitals to help locate compatible blood when direct donors aren't available.",
      },
    ],
  },
];

const FAQ = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState("General");
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const questionId = `${categoryIndex}-${questionIndex}`;
    setOpenQuestion(openQuestion === questionId ? null : questionId);
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
              <FaQuestionCircle className="text-[#f87898] text-2xl sm:text-3xl" />
            </div>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Frequently Asked <span className="text-[#f87898]">Questions</span>
          </h2>
          <p
            className={`max-w-3xl mx-auto text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Find answers to common questions about blood donation, safety, and
            using AidEx. Can't find what you're looking for? Contact our support
            team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div
              className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl sticky top-8 ${
                isDark
                  ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                  : "bg-white hover:shadow-lg"
              } transition-all duration-300`}
            >
              <h3
                className={`font-bold mb-4 text-sm sm:text-base ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Categories
              </h3>
              <div className="space-y-2">
                {faqData.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(category.category)}
                    className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg text-left transition-all duration-200 ${
                      activeCategory === category.category
                        ? "bg-[#f87898] text-white shadow-md"
                        : isDark
                        ? "text-gray-300 hover:bg-white/5"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`text-sm sm:text-lg ${
                        activeCategory === category.category
                          ? "text-white"
                          : "text-[#f87898]"
                      }`}
                    >
                      {category.icon}
                    </div>
                    <span className="font-medium text-xs sm:text-sm">
                      {category.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {faqData.map(
              (category, categoryIndex) =>
                activeCategory === category.category && (
                  <div key={categoryIndex} className="space-y-4">
                    {category.questions.map((faq, questionIndex) => {
                      const questionId = `${categoryIndex}-${questionIndex}`;
                      const isOpen = openQuestion === questionId;

                      return (
                        <div
                          key={questionIndex}
                          className={`rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                            isDark
                              ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                              : "bg-white hover:shadow-lg"
                          } ${isOpen ? "shadow-lg" : ""}`}
                        >
                          <button
                            onClick={() =>
                              toggleQuestion(categoryIndex, questionIndex)
                            }
                            className={`w-full p-4 sm:p-6 text-left flex items-center justify-between transition-all duration-200 ${
                              isOpen
                                ? isDark
                                  ? "bg-[#f87898]/10"
                                  : "bg-[#f87898]/5"
                                : "hover:bg-opacity-50"
                            }`}
                          >
                            <h3
                              className={`font-semibold pr-4 text-sm sm:text-base ${
                                isDark ? "text-gray-200" : "text-gray-800"
                              }`}
                            >
                              {faq.question}
                            </h3>
                            <div
                              className={`shrink-0 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            >
                              <FaChevronDown
                                className={`text-[#f87898] text-sm sm:text-base ${
                                  isOpen ? "hidden" : "block"
                                }`}
                              />
                              <FaChevronUp
                                className={`text-[#f87898] text-sm sm:text-base ${
                                  isOpen ? "block" : "hidden"
                                }`}
                              />
                            </div>
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              isOpen
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="p-4 sm:p-6 pt-0">
                              <p
                                className={`leading-relaxed text-xs sm:text-sm ${
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div
          className={`mt-12 sm:mt-16 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl text-center ${
            isDark
              ? "bg-[#f87898]/5 hover:bg-[#f87898]/10"
              : "bg-[#f87898]/5 hover:bg-[#f87898]/10"
          } transition-all duration-300`}
        >
          <h3
            className={`text-lg sm:text-xl font-bold mb-2 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Still Have Questions?
          </h3>
          <p
            className={`mb-4 sm:mb-6 text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Our support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=biswanath.sarker.bd@gmail.com&su=Support%20Request%20-%20AidEx"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              Contact Support
            </a>
            <a
              href="tel:+8801628284848"
              className="btn-secondary w-full sm:w-auto"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
