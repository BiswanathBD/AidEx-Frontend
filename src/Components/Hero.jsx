import React from "react";
import bannerImg from "../assets/banner.svg";
import bgImg from "../assets/hero-bg.png";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="bg-white rounded-lg mt-4 overflow-hidden">
      <div className="grid lg:grid-cols-3 items-center gap-8 p-8">
        <img
          src={bannerImg}
          alt="banner"
          className="col-span-2 w-4/5 mx-auto"
        />
        <div>
          <h1 className="text-4xl xl:text-6xl font-bold mx-auto text-neutral-600 md:mt-8">
            Blood Donation
          </h1>
          <p className="text-neutral-400 my-4">
            A small act of kindness can save someone's life. Donating blood not
            only helps those in urgent need but also brings hope to families.
            Your contribution today can create a brighter tomorrow.
          </p>
          <Link to={"/request"}>
            <button className="btn-primary mt-4">Donate Now</button>
          </Link>
        </div>
      </div>
      <img className="w-full" src={bgImg} alt="" />
    </div>
  );
};

export default Hero;
