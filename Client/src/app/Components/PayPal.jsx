"use client";
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

import styles from "../Styles/Checkout.module.css";


const PayPal = () => {
  return (
    <div className='h-screen bg-indigo-900 flex justify-center items-center'>

      <PayPalScriptProvider>
        <PayPalButtons/>
      </PayPalScriptProvider>
     
    </div>
  );
};

export default PayPal;