"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "../Components/NavBarHome.jsx";
import OwnerForm from "../Components/OwnerForm.jsx";
import Map from "../Components/Map.jsx";
import SelectWalkers from "../Components/SelectWalkers.jsx";
import SwitchType from "../Components/SwitchType.jsx";
import provinces from "../register/provinces.js";

const Home = () => {
  const [formCompleted, setFormCompleted] = useState(true);
  const [addressInput, setAddressInput] = useState("");
  const [provinceInput, setProvinceInput] = useState("");
  const [userProvince, setUserProvince] = useState("");
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = () => {
    setFormCompleted(true);
  };

  const handleAddMoreDogs = () => {
    setFormCompleted(false);
  };

  const handleAddressInputChange = (event) => {
    setAddressInput(event.target.value);
  };

  const handleProvinceInputChange = (event) => {
    setProvinceInput(event.target.value);
  };

  const handleInputSubmit = () => {
    setUserProvince(provinceInput);
    setUserAddress(addressInput);
  };

  const paginationButtonStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px 15px",
    margin: "0 5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const switchContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const titleStyle = {
    fontSize: "2em",
    marginBottom: "16px",
  };

  const inputStyle = "border p-4 rounded-lg mr-2";
  const buttonStyle = "border p-3 rounded-lg mr-2 bg-black text-white";

  return (
    <div>
      {!formCompleted && <OwnerForm onSubmit={handleFormSubmit} />}
      {formCompleted && (
        <>
          <Nav />
          {/* <div style={switchContainerStyle}>
            <SwitchType />
          </div> */}
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
        </>
      )}
    </div>
  );
};

export default Home;
