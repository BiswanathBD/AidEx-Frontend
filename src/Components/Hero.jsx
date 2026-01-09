import React, { useContext } from "react";
import bannerImg from "../assets/banner.svg";
import bgImg from "../assets/hero-bg.png";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../Auth/AuthContext";
motion;

const Hero = () => {
  const { user } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white dark:bg-[#1f1017] rounded-lg overflow-hidden transition-colors duration-300"
    >
      <div className="grid lg:grid-cols-3 items-center p-8">
        <img
          src={bannerImg}
          alt="banner"
          className="col-span-2 w-5/6 mx-auto"
        />
        <div className="w-5/6">
          <h1 className="text-4xl xl:text-6xl font-bold mx-auto text-neutral-600 dark:text-neutral-300 md:mt-8">
            <span className="text-[#f87898]">Blood</span> Donation
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 my-4">
            A small act of kindness can save someone's life. Donating blood not
            only helps those in urgent need but also brings hope to families.
            Your contribution today can create a brighter tomorrow.
          </p>

          <div className="flex flex-wrap gap-4">
            {user ? (
              <Link to={"/requests"}>
                <button className="btn-primary mt-4">Donate Now</button>
              </Link>
            ) : (
              <Link to={"/register"}>
                <button className="btn-primary mt-4">Join as a donor</button>
              </Link>
            )}
            <Link to={"/search"} className="btn-secondary mt-4">
              Search Donors
            </Link>
          </div>
        </div>
      </div>
      <img className="w-full" src={bgImg} alt="" />
    </motion.div>
  );
};

export default Hero;
