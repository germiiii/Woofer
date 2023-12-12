"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";

const NavbarHomeOwner = () => {
  const currentPath = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("paypal_accessToken");
    localStorage.removeItem("__paypal_storage__");
    localStorage.removeItem("provinceInput");
    localStorage.removeItem("userProvince");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("addressInput");
    localStorage.removeItem("selectedType");
    localStorage.removeItem("userId");
    localStorage.removeItem("selectedWalker");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("isOwner");
    localStorage.removeItem("isWalker");
    localStorage.removeItem("token");
  };

  return (
    <div className="bg-[#F39200] py-6 flex items-center justify-center px-2">
      <div className="flex  items-center justify-center">
        <Link href={"/ownerHome"}>
          <button
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] ${
              currentPath === "/home" ? "text-[#F39200]" : "text-white"
            } mt-3 lg:mt-0 mr-7  transition transition-colors duration-300`}
          >
            home
          </button>
        </Link>
        <Link href={"/add-dogs"}>
          <button
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] ${
              currentPath === "/add-dogs" ? "text-[#F39200]" : "text-white"
            } mt-3 lg:mt-0 mr-7  transition transition-colors duration-300`}
          >
            add dogs
          </button>
        </Link>
        {/* <Link href={"/settings"}>
          <button
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] ${
              currentPath === "/settings" ? "text-[#F39200]" : "text-white"
            } mt-3 lg:mt-0 mr-7 transition transition-colors duration-300`}
          >
            settings
          </button>
        </Link> */}
        <Link href={"/safety"}>
          <button
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] ${
              currentPath === "/safety" ? "text-[#F39200]" : "text-white"
            } mt-3 lg:mt-0 mr-7  transition transition-colors duration-300`}
          >
            safety
          </button>
        </Link>
        <Link href={"/"}>
          <button
            onClick={handleLogout}
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] text-white mt-3 lg:mt-0 mr-7 transition transition-colors duration-300`}
          >
            log out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarHomeOwner;
