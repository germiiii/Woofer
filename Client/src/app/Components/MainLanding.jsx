"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MainLanding = () => {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="mt-0">
        <h1 className="text-white mb-2 text-5xl lg:text-9xl font-extrabold mt-0">
          <div className="text-transparent bg-clip-text bg-gradient-to-r">
          <Image
            src='/ISOWoofer.png'
            alt="logo"
            width={300}
            height={200}
          />
          </div>
        </h1>
        <div className="text-black font-bold lg:text-5xl justify-center items-center">
          <TypeAnimation
            sequence={[
              "Get up",
              1000,
              "Get outside",
              1000,
              "Walk it off",
              1000,
            ]}
            wrapper="h2"
            speed={30}
            repeat={Infinity}
          />
        </div>
      </div>
    </section>
  );
};

export default MainLanding;