"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import { useRouter } from "next/navigation";


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
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-indigo-200 bg-opacity-100">
    <div className="container mx-auto lg:py-4 flex items-center justify-between px-4 py-2">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image
            src='/LOGOWoofer.png'
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
      </div>
  
      <div className="flex items-center">
        <button
          className="px-4 py-3 rounded-full bg-gradient-to-r from-violet-200 via-blue-600 to-[#29235c] hover:bg-slate-800 text-white border mt-3 lg:mt-0 mr-5"
          onClick={() => {
            router.push("/login");
          }}
        >
          SIGN IN
        </button>
  
        <button
          className="px-4 py-3 rounded-full bg-gradient-to-r from-violet-200 via-blue-600 to-[#29235c] hover:bg-slate-800 text-white border mt-3 lg:mt-0"
          onClick={() => {
            router.push("/register");
          }}
        >
          SIGN UP
        </button>
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;
