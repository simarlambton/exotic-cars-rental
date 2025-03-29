import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="text-white fs-6">&copy; {new Date().getFullYear()} Exotic Cars Rental. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
