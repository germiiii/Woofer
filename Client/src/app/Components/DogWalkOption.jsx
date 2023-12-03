"use client";

import React from "react";

const DogWalkOption = ({ option }) => {
    return (
    <div>
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

