
"use client";
import React from 'react';

const DogWalkOption = ({ option, onClick, selected }) => {
  const cardStyle = {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "10px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  
  };

  return (
    <div style={cardStyle}>
      <h2>{option?.title}</h2>
      <p>Price: ${option?.price}</p>
      <p>Walk Duration: {option?.walk_duration} minutes</p>
      <p>Walk Type: {option?.walk_type}</p>
      <p>Dog Capacity: {option?.dog_capacity}</p>
    </div>
  );
};

export default DogWalkOption;
