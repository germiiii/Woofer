"use client"
import React, { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css";

async function getWalkTypes() {
  const res = await fetch('http://localhost:3001/walkType');
  const data = await res.json();
  return data.walkTypeData || []; // Ensure data is an array or default to an empty array
}

export default function WalkTypes() {
  const [walkTypes, setWalkTypes] = useState([]);

  useEffect(() => {
    // Fetch walk types on component mount
    async function fetchWalkTypes() {
      try {
        const data = await getWalkTypes();
        setWalkTypes(data);
      } catch (error) {
        console.error('Error fetching walk types:', error);
      }
    }

    fetchWalkTypes();
  }, []);

  return (
    <div className="p-6 border border-gray-300 rounded-lg">
    <h1 className="text-3xl font-bold mb-4">Dog Walk Services</h1>
    {walkTypes.length > 0 ? (
      walkTypes.map(({ id, title, price, description }) => (
        <div className="mb-4" key={id}>
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="mb-1"><strong>Description:</strong> {description}</p>
          <p className="mb-1"><strong>Price:</strong> ${price}</p>
          <hr className="my-2 border-t border-gray-400" />
        </div>
      ))
    ) : (
      <p>No walk types available</p>
    )}
  </div>
  
  );
}
