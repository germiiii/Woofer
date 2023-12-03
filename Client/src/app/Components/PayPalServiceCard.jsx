"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const PayPalServiceCard = ({ service }) => {
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      // Perform any necessary data handling before redirecting to checkout
      // For instance, you can pass the service ID or any necessary details to the checkout page
      router.push(`/checkout/${service.id}`); // Redirect to the checkout page with service ID
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="service-card">
      <h2>{service.title}</h2>
      <p>{service.description}</p>
      <p>Price: ${service.price}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default PayPalServiceCard;
