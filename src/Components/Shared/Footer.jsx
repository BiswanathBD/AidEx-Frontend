import React from "react";
import Logo from "./Logo";
import Container from "./Container";

const Footer = () => {
  return (
    <div className="bg-linear-to-br from-[#110909] to-[#1f1017] mt-8 py-8">
      <Container>
        <Logo />
      </Container>
    </div>
  );
};

export default Footer;
