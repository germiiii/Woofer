"use client";
import Link from "next/link";
import React from "react";
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
            <Image src="/LOGOWoofer.png" alt="logo" width={50} height={50} />
          </Link>
        </div>

        <div className="flex items-center">
          <Link href={"/login"}>
            <button className="px-4 py-3 rounded-full bg-[#29235c] text-white hover:bg-amber-400 hover:text-black border mt-3 lg:mt-0 mr-5">
              SIGN IN
            </button>
          </Link>

          <Link href={"/register"}>
            <button className="px-4 py-3 rounded-full bg-[#29235c] text-white hover:bg-amber-400 hover:text-black border mt-3 lg:mt-0 mr-5">
              SIGN UP
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
