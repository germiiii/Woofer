"use client";
import React from "react";
import Image from "next/image";
import "../stylesLanding.css";

const Safety = () => {
  return (
    <div className="bg-[#29235c] h-screen">
      <div className="flex items-center flex-col justify-center">
        <h1
          className="text-6xl text-[#E4E2ED] mt-10 mb-10"
          style={{ fontFamily: "LikeEat" }}
        >
          Woofer Commitment to Safety
        </h1>
        <div className="flex items-center justify-center mt-20 ml-20 mr-20">
          <Image
            src="/Safety.avif"
            alt="safety"
            width={800}
            height={0}
            className="rounded-full border border-[#F39200] border-2"
          />
          <div className="flex flex-col justify-center items-center ml-20">
            <h1
              className="text-[#F39200] text-5xl mb-5"
              style={{ fontFamily: "LikeEat" }}
            >
              Love Dogs and Feel Safe
            </h1>
            <p className="text-[#E4E2ED] text-2xl text-center">
              We want you to move safely and be connected to other dog lovers
              and places that matter most to you. Hence, we are devoted to
              safety standards so that you and your furry companion can freely
              enjoy the development of the advancements in technology that
              bridges us together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
