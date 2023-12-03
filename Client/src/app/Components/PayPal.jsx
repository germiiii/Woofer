"use client";
import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'
import "tailwindcss/tailwind.css";

const PayPal = () => {

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET;
  
  const router = useRouter()
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Check if the access token exists in localStorage
    const storedAccessToken = localStorage.getItem('accessToken');
  
    if (!storedAccessToken) {
      // Fetch a new access token if not stored
      async function fetchAccessToken() {
        try {
          const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
            },
            body: 'grant_type=client_credentials',
          });
          const data = await response.json();
  
          // Store access token in localStorage
          localStorage.setItem('accessToken', data.access_token);
  
          console.log('Access token fetched and stored:', data.access_token);
        } catch (error) {
          console.error('Error fetching access token:', error);
        }
      }
  
      fetchAccessToken();
    } else {
      // Use the existing token on refresh
      console.log('Access token exists:', storedAccessToken);
    }
  }, []);
  
  
  

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
              style={{ layout: "vertical", color: "gold" }}
              
              createOrder={async (data, actions) => {
                try {
                  const res = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      //PayPal access token  after Bearer
                      "Authorization": `Bearer A21AAI1HPNYh2QtbKqXwumBxrR-n1Q72BZ47G1aKe4Wauy70fITLsHkDc67PVEKCNeLPKfjDynnMAYuPM3WduRev044wxzxjw`,
                    },
                    body: JSON.stringify({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: "30.00",
                          },
                        },
                      ],
                    }),
                  });
                  
                  const order = await res.json();
                  console.log(order);
                  return order.id; 
                } catch (error) {
                  console.error("Error creating PayPal order:", error);
    
              }
            }}
            onCancel={(data) => {
              console.log("Cancelled:", data);
            }}
            onApprove={(data, actions) => {
              console.log("Approved:", data);
               actions.order.capture();
              alert('Payment successful')
              setTimeout(() => {
                router.push('/home');
              }, 3000); 
             
            }}
          />

        </PayPalScriptProvider>
      </div>
    </div>
  </div>  
  )  
};

export default PayPal;
