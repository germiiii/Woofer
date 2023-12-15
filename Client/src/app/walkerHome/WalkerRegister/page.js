"use client";
import axios from "axios";
import WalkerRegister from "../../Components/WalkerRegister.jsx";
import Nav from "../../Components/NavBarWalker.jsx";
import React from "react";
import Link from "next/link.js";
import Image from "next/image";
import YouAreNotAWalker from "../../Components/YouAreNotAWalker.jsx";
import Map from "../../Components/Map.jsx";
import provinces from "../../register/provinces.js";

export default function HomeWalker() {
  const [selectedType, setSelectedType] = React.useState("");
  const api = process.env.NEXT_PUBLIC_APIURL;

  const [addressInput, setAddressInput] = React.useState("");
  const [provinceInput, setProvinceInput] = React.useState("");
  const [userProvince, setUserProvince] = React.useState("");
  const [userAddress, setUserAddress] = React.useState("");

  React.useEffect(() => {
    setSelectedType(localStorage.getItem("selectedType") || "");
  }, []);

  React.useEffect(() => {
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
      id: localStorage.getItem("userId"),
      province: provinceInput,
      address: addressInput,
    });
  };

  return (
    <div className="flex flex-col">
      {selectedType === "walker" ? (
        <div>
          <Nav />
          <div className="flex flex-grow">
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
                    className="w-30 px-6 py-1 rounded-full bg-[#F39200] text-white font-bold hover:text-[#29235c] transition transition-colors duration-300"
                  >
                    set my location
                  </button>
                </div>
              </div>
              <Map userProvince={userProvince} userAddress={userAddress} />
            </div>
            <div className="w-1/2 bg-[#E4E2ED] h-full">
              <WalkerRegister />
            </div>
          </div>
        </div>
      ) : (
        <YouAreNotAWalker />
      )}
    </div>
  );
}
