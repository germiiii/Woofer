"use client";
import React from "react";
import ChangePassword from "../../Components/ChangePassword";
import Navbar from "../../Components/NavBar.jsx";
import Link from "next/link.js";
import Image from "next/image";

const ChangePasswordPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-grow">
        <div
          style={{ backgroundColor: "#E4E2ED" }}
          className="w-1/2 flex items-center justify-center"
        >
          <div
            className="flex items-center justify-center "
            style={{ marginTop: "-100px" }}
          >
            <Link href={"/"}>
              <Image src="/ISOWoofer.png" width="600" height="0" />
            </Link>
          </div>
        </div>

        <div className="w-1/2 h-full">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
