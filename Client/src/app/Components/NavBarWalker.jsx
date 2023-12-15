"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";
import UserDetailButton from "./UserDetailButton";

const NavbarHomeWalker = () => {
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
    <div className="bg-[#F39200] py-6 flex items-center justify-center justify-around">
      <div className="flex items-center mr-20">
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image src="/LOGOWoofer.png" alt='' width={40} height={40} />
      </div>

      </div>
      <div className="flex items-center ml-40 mr-40">
        <Link href={"/walkerHome"}>
          <button
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] ${
              currentPath === "/walkerHome" ? "text-[#F39200]" : "text-white"
            } mt-3 lg:mt-0 mr-7  transition transition-colors duration-300`}
          >
            Home
          </button>
        </Link>
        {/* Add UserDetailButton component here */}
        <Link href={"/walkerHome/WalkerRegister"}>
          <button
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] ${
              currentPath === "/walkerHome/TestWalkerRegister"
                ? "text-[#F39200]"
                : "text-white"
            } mt-3 lg:mt-0 mr-7  transition transition-colors duration-300`}
          >
            Walker form
          </button>
        </Link>
        <UserDetailButton />
      </div>
      <div className="ml-20">
        <Link href={"/"}>
          <button
            onClick={handleLogout}
            className={`w-30 px-5 py-2 rounded-full text-[#29235c] hover:bg-[#29235c] hover:text-[#F39200] bg-white font-bold mt-3 lg:mt-0 mr-7 transition transition-colors duration-300`}
          >
            Log out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarHomeWalker;
