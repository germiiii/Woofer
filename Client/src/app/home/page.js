"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "../Components/NavBarHome.jsx";
import OwnerForm from "../Components/OwnerForm.jsx";
import Map from "../Components/Map.jsx";
import SelectWalkers from "../Components/SelectWalkers.jsx";
import SwitchType from "../Components/SwitchType.jsx";

const Home = () => {
  const [formCompleted, setFormCompleted] = useState(true);

  const userCity = "Buenos Aires";
  const userAddress = "Sarachaga 4632";

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

  return (
    <div>
      {!formCompleted && <OwnerForm onSubmit={handleFormSubmit} />}
      {formCompleted && (
        <>
          <Nav />
          <div style={switchContainerStyle}>
            <SwitchType />

            {/* <div>
              <button onClick={handleAddMoreDogs} style={paginationButtonStyle}>
                Add more dogs
              </button>
            </div> */}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              height: "1400px",
            }}
          >
            <Map userCity={userCity} userAddress={userAddress} />
            <SelectWalkers />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
