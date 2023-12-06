"use client";
import React from "react";
import AditionalForm from "../Components/aditionalForm";
import Link from "next/link.js";
import Image from "next/image";
import Navbar from "../Components/NavBar.jsx";

const RegisterPage = () => {
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
          <AditionalForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
