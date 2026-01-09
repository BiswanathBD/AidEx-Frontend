import React from "react";
import { Link } from "react-router";
import { AiTwotoneHome } from "react-icons/ai";
import { PiDropDuotone } from "react-icons/pi";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Logo from "./Logo";
import Container from "./Container";
import { LuLayoutDashboard } from "react-icons/lu";

const Footer = () => {
  return (
    <div className="bg-black mt-24 py-10 text-gray-300">
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          {/* logo */}
          <div>
            <Logo />
            <p className="text-sm mt-3 text-gray-400 max-w-xs">
              A platform to manage blood donation requests and help save lives.
            </p>
          </div>

          {/* quick links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 hover:text-[#f87898]"
                >
                  <AiTwotoneHome size={18} /> Home
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 hover:text-[#f87898]"
                >
                  <LuLayoutDashboard size={18} /> Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/requests"
                  className="flex items-center gap-2 hover:text-[#f87898]"
                >
                  <PiDropDuotone size={18} /> Donation Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* social links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex gap-4">
              {/* facebook */}
              <a
                className="social"
                href="https://www.facebook.com/Biswanath.Sarker.BD"
                target="blank"
              >
                <FaFacebookF size={16} />
              </a>

              {/* twitter */}
              <a
                className="social"
                href="https://x.com/Biswanath08BD"
                target="blank"
              >
                <RiTwitterXLine size={16} />
              </a>

              {/* github */}
              <a
                className="social"
                href="https://github.com/BiswanathBD"
                target="blank"
              >
                <FaGithub size={16} />
              </a>

              {/* linkedin */}
              <a
                className="social"
                href="https://www.linkedin.com/in/biswanath-sarker-bd/"
                target="blank"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} aidEx. All rights reserved.
        </div>
      </Container>
    </div>
  );
};

export default Footer;
