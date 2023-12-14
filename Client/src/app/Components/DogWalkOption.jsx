"use client";
import React from "react";

const DogWalkOption = ({ option, onClick, selected }) => {
  const cardStyle = {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "10px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div
      className={`flex items-center justify-around border border-[#29235c] border-solid border-2 mt-5 h-[70px] w-[700px] bg-white hover:shadow-lg`}
    >
      <div className="flex items-center justify-center ">
        <p className="text-[#29235c] font-bold">Price: </p>
        <p className="ml-1 font-bold italic text-[#F39200]">${option?.price}</p>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-[#29235c] font-bold">Walk Duration: </p>
        <p className="ml-1 font-bold italic text-[#F39200]">
          {option?.walk_duration} minutes
        </p>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-[#29235c] font-bold">Walk Type:</p>
        <p className="ml-1  font-bold italic text-[#F39200]">
          {option?.walk_type}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-[#29235c] font-bold">Dog Capacity:</p>
        <p className="ml-1 font-bold italic text-[#F39200]">
          {option?.dog_capacity}
        </p>
      </div>
    </div>
  );
};

export default DogWalkOption;
