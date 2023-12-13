"use client";
import React from "react";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";
import Link from "next/link";

const YouAreNotAWalker = () => {
  return (
    <div className="flex h-screen items-center justify-center flex-col bg-[#F39200]">
      <h1 className="text-[#29235c] text-3xl">You are not a walker.</h1>
      <Link href={"/ownerHome"}>
        <button className="w-30 mt-10 px-6 py-1 rounded-full bg-[#29235c] hover:text-[#F39200] text-white font-bold">
          back to owner home
        </button>
      </Link>
    </div>
  );
};

export default YouAreNotAWalker;
