"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "../Components/NavBarOwner.jsx";
import OwnerForm from "../Components/OwnerForm.jsx";
import Map from "../Components/Map.jsx";
import SelectWalkers from "../Components/SelectWalkers.jsx";
import provinces from "../register/provinces.js";
import jwt from "jsonwebtoken";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";

const OwnerHome = () => {
  const api = process.env.NEXT_PUBLIC_APIURL;
  const [addressInput, setAddressInput] = useState("");
  const [provinceInput, setProvinceInput] = useState("");
  const [userProvince, setUserProvince] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    setSelectedType(localStorage.getItem("selectedType") || "");
  }, []);

  useEffect(() => {
    setAddressInput(localStorage.getItem("userAddress") || "");
    setProvinceInput(localStorage.getItem("userProvince") || "");
    setUserProvince(localStorage.getItem("userProvince") || "");
    setUserAddress(localStorage.getItem("userAddress") || "");
  }, []);

  const handleAddressInputChange = (event) => {
    setAddressInput(event.target.value);
  };

  const handleProvinceInputChange = (event) => {
    setProvinceInput(event.target.value);
  };

  const handleInputSubmit = async () => {
    setUserProvince(provinceInput);
    setUserAddress(addressInput);
    localStorage.setItem("userProvince", provinceInput);
    localStorage.setItem("userAddress", addressInput);

    const response = await axios.put(`${api}/editUser`, {
      userID: localStorage.getItem("userId"),
      province: provinceInput,
      address: addressInput,
    });
  };

  return (
    <div className="flex flex-col">
      {selectedType === "owner" ? (
        <div>
          <Nav />
          <div className="flex flex-grow h-screen">
            <div className="bg-[#29235c] w-1/2 flex flex-col items-center">
              <div className="flex flex-col mt-15">
                <div className="mt-10 mb-12">
                  <h1
                    className=" text-5xl text-[#F39200]"
                    style={{ fontFamily: "LikeEat" }}
                  >
                    Location
                  </h1>
                </div>
                <div className="flex mt-10 mb-10">
                  <select
                    name="province"
                    onChange={handleProvinceInputChange}
                    value={provinceInput}
                    className="py-2 mr-5"
                  >
                    <option value="">Select your province</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    value={addressInput}
                    onChange={handleAddressInputChange}
                    className="py-2 px-6"
                  />
                </div>
                <div className="flex justify-start">
                  <button
                    onClick={handleInputSubmit}
                    className="w-30 px-6 py-1 rounded-full bg-[#F39200] text-white font-bold"
                  >
                    set your location
                  </button>
                </div>
              </div>
              <Map userProvince={userProvince} userAddress={userAddress} />
            </div>
            <div className="w-1/2 bg-[#E4E2ED]">
              <SelectWalkers userProvince={userProvince} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>You are not an owner.</h1>
          <Link href={"/walkerHome"}>
            <button>back to walker home</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OwnerHome;
