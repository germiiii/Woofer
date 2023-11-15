"use client";
import React, { useState } from "react";
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
          <Map />
          <div>
            <button onClick={handleAddMoreDogs}>Add more dogs</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
