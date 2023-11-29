import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-l-transparent border-r-transparent text-white w-full">
      <div className="container p-6 mx-auto">
        <div className="flex justify-between items-center">
          <Image src={'/LOGOWoofer.png'} alt="logo" width={50} height={50} />
          <p className="text-white text-extra-bold">Nice to join up for a stroll!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;