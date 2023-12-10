"use client";
import Link from "next/link.js";
import React, { useState } from "react";
import Navbar from "./Components/NavBar";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import "./stylesLanding.css";

export default function Home() {
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
            <Image
              src="/ISOWoofer.png"
              width="600"
              height="0"
              alt="woofer logo"
            />
          </div>
        </div>

        <div className="w-1/2 flex flex-col h-full">
          <div className="group flex-grow h-[33%] bg-gray-100 p-4 flex text-[#29235c] bg-white hover:bg-[#29235c] hover:text-white border-b border-[#29235c] shadow-md transition-all duration-300">
            <div className="w-1/2 pr-2 rounded-full overflow-hidden p-2 flex items-center justify-center transition-all duration-300">
              <Image
                src="/AboutWalker.jpeg"
                alt="aboutImage"
                width={250}
                height={250}
                className="rounded-full border border-[#29235c] border-2 transition-all duration-300"
              />
            </div>
            <div className="w-1/2 mr-10 mt-6">
              <h1
                className="font-bold text-[#29235c] group-hover:text-[#F39200] mb-3 text-3xl transition-all duration-300"
                style={{ fontFamily: "LikeEat" }}
              >
                Want to wuff some air?
              </h1>
              <p className="text-[#29235c] group-hover:text-white transition-all duration-300">
                Want to add more clients to your combo walk? Register to offer
                dog owners around your location the possibility to walk their
                dogs on-the-spot. Just activate your account and start receiving
                walk requests!
              </p>
              <Link href={"/register"}>
                <button className="w-30 px-6 py-2 md:mb-12 rounded-full bg-[#29235c] text-white mt-7 group-hover:bg-[#F39200] transition-all duration-300">
                  <span className="font-bold">register as a walker</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="group flex-grow h-[33%] bg-gray-200 p-4 flex text-[#29235c] bg-white hover:bg-[#29235c] hover:text-white border-b border-[#29235c] shadow-md transition-all duration-300">
            <div className="w-1/2 ml-5 mt-6">
              <h1
                className="font-bold text-[#29235c] group-hover:text-[#F39200] mb-3 text-3xl transition-all duration-300"
                style={{ fontFamily: "LikeEat" }}
              >
                Let&apos;s take your dog outside
              </h1>
              <p className="text-[#29235c] group-hover:text-white transition-all duration-300">
                We know you love your dog. We know you want him to be happy and
                in shape. So why not give him the chance to exercise when
                you&apos;re busy? Ease back and relax, Woofer walkers can do the
                work for you.
              </p>
              <Link href={"/register"}>
                <button className="w-30 px-6 py-2 rounded-full bg-[#29235c] text-white mt-7 group-hover:bg-[#F39200] transition-all duration-300">
                  <span className="font-bold">register your dog</span>
                </button>
              </Link>
            </div>
            <div className="w-1/2 pr-2 rounded-full overflow-hidden p-2 flex items-center justify-center transition-all duration-300">
              <Image
                src="/AboutDog.avif"
                alt="aboutImage"
                width={270}
                height={250}
                className="rounded-full border border-[#29235c] border-2"
              />
            </div>
          </div>

          <div className="group flex-grow h-[33%] bg-gray-300 p-4 flex text-[#29235c] bg-white hover:bg-[#29235c] hover:text-white shadow-md transition-all duration-300">
            <div className="w-1/2 pr-2 rounded-full overflow-hidden p-2 flex items-center justify-center transition-all duration-300">
              <Image
                src="/DogLovers.avif"
                alt="aboutImage"
                width={350}
                height={400}
                className="rounded-full border border-[#29235c] border-2"
              />
            </div>
            <div className="w-1/2 mr-10 mt-5">
              <h1
                className="font-bold text-[#29235c] group-hover:text-[#F39200] mb-3 text-3xl transition-all duration-300"
                style={{ fontFamily: "LikeEat" }}
              >
                About Us
              </h1>
              <p className="text-[#29235c] group-hover:text-white transition-all duration-300">
                Rooted in a dog lover community, Woofer brings us together.
                Fueled by a shared commitment to health, fresh air, and
                exercise, whether devoted to your own furry companion or eager
                to support others, Woofer seamlessly connects us, forging a
                powerful bond within a singular community of dog enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
