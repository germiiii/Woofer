"use client";
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import UserDetail from '../Components/UserDetail'

import styles from "../Styles/Checkout.module.css";


const PayPal = () => {
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col lg:flex-row lg:justify-between lg:max-w-3xl">
      <div className="lg:w-1/2">
        <h1 className="text-3xl font-bold mb-4">15 minute Premium Woofer Walk</h1>
        <h3 className="text-lg mb-4">
          Woofers will devote their full attention to walk your furry companion privately for 15 minutes.
        </h3>
        <h3 className="text-lg">Price: USD 30</h3>
      </div>
      <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
        <PayPalScriptProvider
        options={{
          clientId: 'AahLJYwOxpB8rxP5MCqopNDEgLYJFoaNOxwA0BmVEEzeJCj9yYml78eYMLTpAjVAjYS4svveNkYIXGeF'
        }}
        >
          <PayPalButtons
              style={{
                layout: 'vertical',
                color: 'gold',
                shape: 'pill',
                label: 'pay'
              }}
              createOrder={async (data, actions) => {
                try {
                  const res = await fetch('/api/checkout', {
                    method: 'POST'
                  });

                  if (!res.ok) {
                    throw new Error('Network response was not ok.');
                  }

                  const order = await res.json();
                  console.log(order);

                  return order.id;
                } catch (error) {
                  console.error('Error creating order:', error);
                  // Handle error accordingly, such as displaying an error message to the user
                  return '';
                }
              }}
              onApprove={(data, actions) => {
                console.log(data)
              }}
            />
        
        </PayPalScriptProvider>
      </div>
    </div>
  </div>  
  )  
};

export default PayPal;