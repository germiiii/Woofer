"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";

import { faGlobe } from "@fortawesome/free-solid-svg-icons";

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
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed mx-auto border  top-0 left-0 right-0 z-10 bg-indigo-200 bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-3xl font-semibold"
        >
          <Image
            src='/LOGOWoofer.png'
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
        <div className="flex space-x-6">
          <Link href={'/login'}>
            <h3 className='text-[#1e1b4b] font-extrabold'>Sign In</h3>
          </Link>
          <Link href={'/register'}>
            <h3 className='text-[#1e1b4b] font-extrabold'>Sign Up</h3>
          </Link>
        </div>
        </div>
    </nav>
  );
};

export default Navbar;
