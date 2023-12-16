"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";

const UserDetail = ({
  id,
  name,
  lastName,
  email,
  address,
  username,
  noButton = false,
  image,
}) => {
  const [provinceInput, setProvinceInput] = useState("");
  const [userProvince, setUserProvince] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    // Retrieve information from localStorage
    setProvinceInput(localStorage.getItem("provinceInput") || "");
    setUserProvince(localStorage.getItem("userProvince") || "");
    setUserAddress(localStorage.getItem("userAddress") || "");
    setAddressInput(localStorage.getItem("addressInput") || "");
    setSelectedType(localStorage.getItem("selectedType") || "");
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <div className="w-full h-full flex items-start justify-center">
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="">
          <Image
            src={image}
            alt=""
            objectFit="cover"
            width={350}
            height={0}
            className="object-cover rounded-full border border-[#F39200] border-2 h-[350px]"
          />
        </div>
        <h4
          className="text-5xl mt-10 text-[#F39200]"
          style={{ fontFamily: "LikeEat" }}
        >
          {name} {lastName}
        </h4>
        <h2
          className="text-[#F39200] mt-2 text-2xl"
          style={{ fontFamily: "LikeEat" }}
        >
          {selectedType}
        </h2>
        <div className="flex flex-col justify-center mt-10">
          <h2 className="text-white bg-[#29235c] rounded-md p-2 border border-[#F39200] mb-1">
            mail: {email}
          </h2>
          <h2 className="text-white bg-[#29235c] rounded-md p-2 border border-[#F39200] mb-1">
            username: {username}
          </h2>
          <h2 className="text-white bg-[#29235c] rounded-md p-2 border border-[#F39200] mb-1">
            province: {userProvince}
          </h2>
          <h2 className="text-white bg-[#29235c] rounded-md p-2 border border-[#F39200]">
            address: {userAddress}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
