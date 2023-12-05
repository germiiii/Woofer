"use client"
import React from 'react';

const ServiceDetail = ({ id, title, price, description }) => {
  return (
    <div className="p-6 border border-gray-300 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="mb-1"><strong>Description:</strong> {description}</p>
      <p className="mb-1"><strong>Price:</strong> ${price}</p>
    </div>
  );
};

export default ServiceDetail;
