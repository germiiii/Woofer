"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "../Components/NavBarHome.jsx";
import OwnerForm from "../Components/OwnerForm.jsx";
import Map from "../Components/Map.jsx";
import SelectWalkers from "../Components/SelectWalkers.jsx";
import provinces from "../register/provinces.js";
import jwt from "jsonwebtoken";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";

const OwnerHome = () => {
  const api = process.env.NEXT_PUBLIC_APIURL;
  const userId = localStorage.getItem("userId");
  const [addressInput, setAddressInput] = useState(
    localStorage.getItem("userAddress")
  );
  const [provinceInput, setProvinceInput] = useState(
    localStorage.getItem("userProvince")
  );
  const [userProvince, setUserProvince] = useState(
    localStorage.getItem("userProvince")
  );
  const [userAddress, setUserAddress] = useState(
    localStorage.getItem("userAddress")
  );

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
      userID: userId,
      province: provinceInput,
      address: addressInput,
    });
  };

  const inputStyle = "border p-4 rounded-lg mr-2";
  const buttonStyle = "border p-3 rounded-lg mr-2 bg-black text-white";

  return (
    <div className="">
      <Nav />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "1400px",
        }}
      >
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <select
            name="province"
            onChange={handleProvinceInputChange}
            value={provinceInput}
            className={inputStyle}
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
            className={inputStyle}
          />
        </div>
        <button onClick={handleInputSubmit} className={buttonStyle}>
          Set Your Location
        </button>
        <Map userProvince={userProvince} userAddress={userAddress} />
        <SelectWalkers userProvince={userProvince} />
      </div>
    </div>
  );
};

export default OwnerHome;
