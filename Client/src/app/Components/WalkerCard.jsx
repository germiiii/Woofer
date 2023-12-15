"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import checkoutImage from "../../../public/checkout.png";
import Checkout from "../checkout/page";
import axios from "axios";

const WalkerCard = (props) => {
  const api = process.env.NEXT_PUBLIC_APIURL;
  const isOwner = localStorage.getItem("isOwner");
  const router = useRouter();

  const handleClick = async () => {
    if (isOwner === "false") {
      router.push("/add-dogs");
      window.alert("You must add a dog first");
      return;
    }
    try {
      const response = await axios.get(`${api}/walker/${props.id}`);
      if (response.status === 200) {
        const walkerData = response.data;
        // console.log("Walker details:", response.data);

        // Store only necessary walker details in localStorage
        const selectedWalker = {
          walker: walkerData, // Assuming walkerData has the necessary structure
        };
        localStorage.setItem("selectedWalker", JSON.stringify(selectedWalker));

        router.push("/checkout");
      } else {
        console.error("Failed to fetch walker data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching walker data:", error);
    }
  };

  return (
    <div
      className={`flex border border-[#29235c] border-solid border-2 mt-5 w-[700px] bg-white hover:shadow-lg`}
    >
      <div className="flex items-center mr-10">
        <Image
          src={props.image}
          width={100}
          height={100}
          alt="profile"
          className="border-r-2  border-solid border-[#29235c]"
        />
      </div>
      <div className="flex flex-col justify-center items-start w-[450px]">
        <h2 className="text-[#29235c] font-bold text-2xl">
          {props.name + " " + props.lastName}
        </h2>
        <h2 className="text-[#F39200] font-bold">{props.address}</h2>
      </div>
      <div className="flex items-center justify-center mr-10">
        <Image
          alt="Checkout"
          src={checkoutImage}
          width={40}
          height={40}
          onClick={() => handleClick(props.id)}
          style={{ cursor: "pointer" }}
          className="mr-5 ml-5 transition-transform transform-gpu hover:scale-110"
        />
      </div>
    </div>
  );
};

export default WalkerCard;
