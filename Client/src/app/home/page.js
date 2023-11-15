"use client";
import React, { useState, useEffect } from "react";
import NavBarHome from "../Components/NavBarHome";
import OwnerForm from "../Components/OwnerForm";
import Map from "../Components/Map";

const Home = () => {
  const [formCompleted, setFormCompleted] = useState(false);

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
          <Map />
        </>
      )}
    </div>
  );
};

export default Home;
