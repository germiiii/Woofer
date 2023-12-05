"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";

const navLinks = [
  {
    title: "Sign In",
    path: "login",
  },
  {
    title: "Sign Up",
    path: "register",
  },
];

const Navbar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    <div className="bg-[#F39200] py-6 flex justify-end px-2">
      <div className="flex mr-10">
        <Link href={"/login"}>
          <button
            className={`w-30 px-10 py-2 rounded-full bg-[#29235c] text-white ${
              currentPath === "/login"
                ? "text-[#F39200]"
                : "hover:text-[#F39200]"
            } mt-3 lg:mt-0 mr-7 transition transition-colors duration-300`}
          >
            sign in
          </button>
        </Link>

        <Link href={"/register"}>
          <button
            className={`w-30 px-10 py-2 rounded-full bg-[#29235c] text-white ${
              currentPath === "/register"
                ? "text-[#F39200]"
                : "hover:text-[#F39200]"
            } mt-3 lg:mt-0 transition transition-colors duration-300`}
          >
            sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
