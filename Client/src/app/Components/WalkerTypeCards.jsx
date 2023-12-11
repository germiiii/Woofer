"use client";
import React, { useState, useEffect } from "react";
import DogWalkOption from "./DogWalkOption";

const WalkerTypeCards = () => {
    const [walkerTypes, setWalkerTypes] = useState([]);
    const [selectedWalkerTypes, setSelectedWalkerTypes] = useState([]);
  
    useEffect(() => {
      console.log("Renderizando el componente");
      const fetchData = async () => {
        try {
          const API = process.env.NEXT_PUBLIC_APIURL;
          const response = await fetch(`${API}/walkType`);
          const data = await response.json();
          setWalkerTypes(data.walkTypeData);
        } catch (error) {
          console.error("Error fetching walker types:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleSelectButtonClick = (walkerTypeId) => {
        const isSelected = selectedWalkerTypes.includes(walkerTypeId);
      
        if (isSelected) {
          setSelectedWalkerTypes((prevSelected) =>
            prevSelected.filter((id) => id !== walkerTypeId)
          );
        } else {
          setSelectedWalkerTypes((prevSelected) => [...prevSelected, walkerTypeId]);
        }
      };
      

      
  return (
    <div>
      <h2>Walker Type Cards</h2>
      {walkerTypes.map((walkerType) => (
        <div key={walkerType.id}>
          <DogWalkOption option={walkerType} />
          <button
            onClick={() => handleSelectButtonClick(walkerType.id)}
          >
            {selectedWalkerTypes.includes(walkerType.id)
              ? "Quitar selección"
              : "Seleccionar"}
          </button>
        </div>
      ))}
      <div>
        <h3>Walker Types Seleccionados:</h3>
        <ul>
          {selectedWalkerTypes.map((id) => (
            <li key={id}>Walker Type {id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WalkerTypeCards;
