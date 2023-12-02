"use client";
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'
import "tailwindcss/tailwind.css";

const PayPal = () => {

  const router = useRouter()

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
          // Include your PayPal access token here in the Authorization header
          "Authorization": `Bearer A21AALvQ1csm1T6QDImeYcQKhCo4bpIRyRPZBb0rwXcOoGKskk1mIMAJqbKUwGYCtaXesvggLHtZ1-yYh-_SMAyErHmkc7PDw`,
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
      return order.id; // Make sure the order ID is returned correctly
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      // Handle errors here
    }
  }}
  onCancel={(data) => {
    console.log("Cancelled:", data);
  }}
  onApprove={(data, actions) => {
    console.log("Approved:", data);
    alert('Payment successful')
    router.push('/home')
    actions.order.capture();
  }}
/>

        </PayPalScriptProvider>
      </div>
    </div>
  </div>  
  )  
};

export default PayPal;
// "use client"
// import { useEffect } from 'react';

// const PayPal = () => {
//   useEffect(() => {
//     const loadPayPalScript = () => {
//       const script = document.createElement('script');
//       script.src = 'https://www.paypal.com/sdk/js?client-id=AahLJYwOxpB8rxP5MCqopNDEgLYJFoaNOxwA0BmVEEzeJCj9yYml78eYMLTpAjVAjYS4svveNkYIXGeF';
//       script.async = true;
//       script.onload = initializePayPalButtons;
//       document.body.appendChild(script);
//     };

//     const initializePayPalButtons = () => {
//       const createOrder = async () => {
//         try {
//           const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${accessToken}`, // Replace with your actual access token
//             },
//             body: JSON.stringify({
//               intent: 'CAPTURE',
//               purchase_units: [
//                 {
//                   amount: {
//                     currency_code: 'USD',
//                     value: '100.00', // Replace with the total amount of the order
//                   },
//                 },
//               ],
//             }),
//           });
      
//           const orderData = await response.json();
//           console.log('Order Data:', orderData); // Check the structure and contents

//           if (orderData.id) {
//             return orderData.id;
//           } else {
//             // Handle error cases when creating the order
//           }
//         } catch (error) {
//           console.error('Error creating order:', error);
//           // Handle errors here
//         }
//       };
      
      
//       const onApprove = async (data, actions) => {
//         try {
//           // Logic for processing the approved payment
//           console.log(data);
//         } catch (error) {
//           console.error('Error on approve:', error);
//           // Handle errors in the approval process
//         }
//       };

//       const PayPalButtonContainer = window.paypal.Buttons({
//         createOrder: createOrder,
//         onApprove: onApprove,
//       });

//       PayPalButtonContainer.render('#paypal-button-container');

//       const resultMessage = (message) => {
//         const container = document.querySelector('#result-message');
//         container.innerHTML = message;
//       };
//     };

//     loadPayPalScript();
//   }, []);

//   return (
//     <div>
//       <div id="paypal-button-container"></div>
//       <div id="result-message"></div>
//     </div>
//   );
// };

// export default PayPal;
