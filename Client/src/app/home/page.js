"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBarHome from "../Components/NavBarHome";
import OwnerForm from "../Components/OwnerForm";
import Map from "../Components/Map";
import SelectWalkers from "../Components/SelectWalkers";

const Home = () => {
  const router = useRouter();
  const [formCompleted, setFormCompleted] = useState(true);

  const handleFormSubmit = () => {
    setFormCompleted(true);
  };

  const handleAddMoreDogs = () => {
    setFormCompleted(false);
  };

  return (
    <div>
      {!formCompleted && <OwnerForm onSubmit={handleFormSubmit} />}
      {formCompleted && (
        <>
          <NavBarHome />
          <div>
            <button onClick={handleAddMoreDogs}>Add more dogs</button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
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
