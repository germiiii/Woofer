"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";
import Image from "next/image";

const NavbarHomeOwner = () => {
  const currentPath = usePathname();
  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

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
    localStorage.removeItem("ownerId");
    localStorage.removeItem("walkId");
    localStorage.removeItem("walkerId");
    // localStorage.removeItem("dog_count");
    localStorage.removeItem('walkDuration')
  };

  return (
    <div className="bg-[#F39200] py-6 flex items-center justify-center justify-around">
      <div className="flex items-center mr-20">
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image src="/LOGOWoofer.png" alt='' width={40} height={40} />
      </div>

      </div>
      <div className="flex items-center ml-40 mr-40">
        <Link href={"/ownerHome"}>
          <button
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] ${
              currentPath === "/ownerHome" ? "text-[#F39200]" : "text-white"
            } mt-3 lg:mt-0 mr-7  transition transition-colors duration-300`}
          >
            Home
          </button>
        </Link>
        <Link href={"/add-dogs"}>
          <button
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] ${
              currentPath === "/add-dogs" ? "text-[#F39200]" : "text-white"
            } mt-3 lg:mt-0 mr-7  transition transition-colors duration-300`}
          >
            Add dogs
          </button>
        </Link>
        <Link href={`/users/${userId}`}>
          <button
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] ${
              currentPath.startsWith("/users") ? "text-[#F39200]" : "text-white"
            } mt-3 lg:mt-0 mr-7  transition transition-colors duration-300`}
          >
            My Woofer
          </button>
        </Link>

        <Link href={"/safety"}>
          <button
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] ${
              currentPath === "/safety" ? "text-[#F39200]" : "text-white"
            } mt-3 lg:mt-0 mr-7  transition transition-colors duration-300`}
          >
            Safety
          </button>
        </Link>
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

export default NavbarHomeOwner;
