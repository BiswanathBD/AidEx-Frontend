import React from "react";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import HowItWorks from "../Components/HowItWorks";
import BloodCompatibility from "../Components/BloodCompatibility";
import Statistics from "../Components/Statistics";
import CommunityImpact from "../Components/CommunityImpact";
import Testimonials from "../Components/Testimonials";
import TrustSafety from "../Components/TrustSafety";
import FAQ from "../Components/FAQ";
import ContactUs from "../Components/ContactUs";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <BloodCompatibility />
      <Statistics />
      <CommunityImpact />
      <Testimonials />
      <TrustSafety />
      <FAQ />
      <ContactUs />
    </div>
  );
};

export default Homepage;
