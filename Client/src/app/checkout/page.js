"use client";
import React from 'react';
import NavBarHome from '../Components/NavBarHome'
import PayPal from '../Components/PayPal'
// import MercadoPago from '../Components/MercadoPago'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const CheckoutPage = () => {
  // return (
  //   <div>
  //     <NavBarHome />
  //     <MercadoPago />
  //   </div>
  // );

  return (
    <div>
      <NavBarHome/>
     <PayPal/>
    </div>
  )
};

export default CheckoutPage;