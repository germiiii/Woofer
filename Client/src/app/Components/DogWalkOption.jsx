"use client";

import React from "react";

const DogWalkOption = ({ option }) => {
  const cardStyle = {
    border: "1px solid #ddd", // Definir un borde de 1 píxel con un color gris claro
    padding: "15px", // Añadir un espacio interno de 15 píxeles
    margin: "10px", // Añadir un espacio externo de 10 píxeles
    borderRadius: "5px", // Añadir esquinas redondeadas
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Añadir sombra ligera
  };

  return (
    <div style={cardStyle}>
      <h2>{option.title}</h2>
      <p>{option.description}</p>
      <p>Price: ${option.price}</p>
      <p>Walk Duration: {option.walk_duration} minutes</p>
      <p>Walk Type: {option.walk_type}</p>
      <p>Dog Capacity: {option.dog_capacity}</p>
    </div>
  );
};

export default DogWalkOption;
