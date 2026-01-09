import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";

const ContactUs = () => {
  const { isDark } = useTheme();

  return (
    <section className="py-16">
      <div>
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <div
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                isDark ? "bg-[#f87898]/10" : "bg-[#f87898]/5"
              }`}
            >
              <FaEnvelope className="text-[#f87898] text-2xl sm:text-3xl" />
            </div>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Contact <span className="text-[#f87898]">Us</span>
          </h2>
          <p
            className={`max-w-2xl mx-auto text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Have questions, need urgent help, or want to support AidEx?{" "}
            <br className="hidden sm:block" />
            Reach out to us anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          <div
            className={`p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl ${
              isDark
                ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                : "bg-white hover:shadow-lg"
            } transition-all duration-300`}
          >
            <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-[#f87898]">
              Get in Touch
            </h3>

            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl text-[#f87898] ${
                    isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                  }`}
                >
                  <FaPhoneAlt className="text-sm sm:text-base" />
                </div>
                <div>
                  <p
                    className={`text-xs sm:text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Phone
                  </p>
                  <p
                    className={`font-medium text-sm sm:text-base ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    +880 1628 284 848
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl text-[#f87898] ${
                    isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                  }`}
                >
                  <FaEnvelope className="text-sm sm:text-base" />
                </div>
                <div>
                  <p
                    className={`text-xs sm:text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Email
                  </p>
                  <p
                    className={`font-medium text-sm sm:text-base ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    biswanath.sarker.bd@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl text-[#f87898] ${
                    isDark ? "bg-[#f87898]/20" : "bg-[#f87898]/10"
                  }`}
                >
                  <FaMapMarkerAlt className="text-sm sm:text-base" />
                </div>
                <div>
                  <p
                    className={`text-xs sm:text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Location
                  </p>
                  <p
                    className={`font-medium text-sm sm:text-base ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Dhaka, Bangladesh 1203
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* send message */}
          <div
            className={`p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl ${
              isDark
                ? "bg-black hover:bg-linear-to-tl from-[#f87898]/10"
                : "bg-white hover:shadow-lg"
            } transition-all duration-300`}
          >
            <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-[#f87898]">
              Send a Message
            </h3>

            <form className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="input w-full"
              />

              <input
                type="email"
                placeholder="Your Email"
                required
                className="input w-full"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                required
                className="input w-full resize-none"
              />

              <button
                type="submit"
                className="w-full bg-[#f87898] text-white py-2 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
