import React from "react";

const Container = ({ children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      {children}
    </div>
  );
};

export default Container;
