'use client'
import axios from "axios";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic from "next/dynamic"
import NavBarHome from "../Components/NavBarHome";
import OwnerForm from "../Components/OwnerForm";
import Map from "../Components/Map";
// Import useRouter conditionally
const useRouter = dynamic(() => import("next/navigation").then((mod) => mod.useRouter), {
  ssr: false, // Set ssr to false to load the module only on the client side
});
import SelectWalkers from "../Components/SelectWalkers";
import SwitchType from "../Components/SwitchType";

const Home = () => {
  const router = useRouter();
  const [formCompleted, setFormCompleted] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        console.log(response.data);
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
          <NavBarHome />
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
            <Map />
            <SelectWalkers />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
