"use client";
import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import "tailwindcss/tailwind.css";

const PayPal = () => {

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET;
  
  const router = useRouter()
  const [accessToken, setAccessToken] = useState('');

  
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
  
    async function fetchAccessToken() {
      try {
        const { data } = await axios.post(
          'https://api-m.sandbox.paypal.com/v1/oauth2/token',
          'grant_type=client_credentials',
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
            },
          }
        );
        const expiresIn = data.expires_in; // Get expiration time from the response
        const expirationTime = Date.now() + expiresIn * 1000; // Convert expiresIn to milliseconds and calculate expiration time
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('tokenExpiration', expirationTime); // Store token expiration time
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    }
  
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (!storedAccessToken || !tokenExpiration || Date.now() > tokenExpiration) {
      fetchAccessToken(); // Fetch a new token if none exists or if the token is expired
    } else {
      setAccessToken(storedAccessToken); // Use the existing token if it's valid and not expired
    }
  }, [clientId, clientSecret, setAccessToken]);
  
  console.log(accessToken)
  
  

  return (
    <div className="flex justify-center items-center h-screen " >
    
    
   
        <PayPalScriptProvider
        options={{
          clientId: 'AahLJYwOxpB8rxP5MCqopNDEgLYJFoaNOxwA0BmVEEzeJCj9yYml78eYMLTpAjVAjYS4svveNkYIXGeF'
        }}
        >
          <PayPalButtons className='paypal-button-container'
              style={{ 
                layout: "vertical", 
                color: "gold", 
                label: "pay",
                shape: "pill",
               
               }}
              
              createOrder={async (data, actions) => {
                try {
                  const res = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      //PayPal access token  after Bearer
                      "Authorization": `Bearer ${accessToken}`,
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

  )  
};

export default PayPal;

