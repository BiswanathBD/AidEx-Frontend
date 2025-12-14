import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section>
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Contact <span className="text-[#f87898]">Us</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Have questions, need urgent help, or want to support AidEx? <br />
            Reach out to us anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 px-4 text-[#f87898]">
              Get in Touch
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#f87898]/10 text-[#f87898]">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">+880 1628 284 848</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#f87898]/10 text-[#f87898]">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">biswanath.sarker.bd@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#f87898]/10 text-[#f87898]">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">Dhaka, Bangladesh 1203</p>
                </div>
              </div>
            </div>
          </div>

          {/* send massage */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 px-4 text-[#f87898]">
              Send a Message
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="input"
              />

              <input
                type="email"
                placeholder="Your Email"
                required
                className="input"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                required
                className="input"
              />

              <button
                type="submit"
                className="w-full bg-[#f87898] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
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
