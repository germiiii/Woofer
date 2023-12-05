"use client";
import Link from "next/link.js";
import LoginForm from "../Components/LoginForm.jsx";
import MainLanding from "../Components/MainLanding.jsx";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10 bg-[#F39200] bg-opacity-100">
        <div className="container mx-auto lg:py-4 flex items-center justify-between px-2 py-2">
          <Link href={"/"}>
            <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
              <Image src="/LOGOWoofer.png" alt="logo" width={30} height={30} />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex min-h-screen absolute w-full">
        <div
          className="w-full md:w-1/2 flex flex-col relative"
          style={{
            marginTop: "5rem",
            height: "calc(100vh - 4rem)",
            overflowY: "auto",
          }}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
