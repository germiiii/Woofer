// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const PayPal = () => {
//   const [totalAmount, setTotalAmount] = useState('0.00');
//   const [orderCount, setOrderCount] = useState(0);
//   const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
//   const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET;
//   const api = process.env.NEXT_PUBLIC_APIURL;
//   const [accessToken, setAccessToken] = useState("");

//   useEffect(() => {
//     const fetchAccessToken = async () => {
//       try {
//         const { data } = await axios.post(
//           "https://api-m.sandbox.paypal.com/v1/oauth2/token",
//           "grant_type=client_credentials",
//           {
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//               Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
//             },
//           }
//         );
//         if (typeof window !== 'undefined') {
//           localStorage.setItem("paypal_accessToken", data.access_token);
//         }
//         console.log("Paypal Access Token:", data.access_token);
//       } catch (error) {
//         console.error("Error fetching/accessing token:", error);
//       }
//     };

//     fetchAccessToken();

//     if (!accessToken) {
//       const token = typeof window !== 'undefined' ? localStorage.getItem("paypal_accessToken") : null;
//       setAccessToken(token);
//     }
//   }, [accessToken, clientId, clientSecret]);

//   useEffect(() => {
//     const storedTotalAmount = typeof window !== 'undefined' ? localStorage.getItem('totalAmount') : null;
//     if (storedTotalAmount && storedTotalAmount !== "0.00") {
//       setTotalAmount(storedTotalAmount);
//     }
//   }, []);

//   const createOrder = async (data, actions) => {
//     try {
//       const storedTotalAmount = typeof window !== 'undefined' ? localStorage.getItem('totalAmount') : null;

//       if (!storedTotalAmount || storedTotalAmount === "0.00") {
//         setTimeout(() => createOrder(data, actions), 1000);
//         return;
//       }

//       console.log("Creating order....");
//       const res = await fetch(
//         "https://api-m.sandbox.paypal.com/v2/checkout/orders",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify({
//             intent: "CAPTURE",
//             purchase_units: [
//               {
//                 amount: {
//                   currency_code: "USD",
//                   value: storedTotalAmount, 
//                 },
//                 description: "Woofer Dog Walk",
//                 reference_id: `order-${orderCount}`,
//               },
//             ],
//           }),
//         }
//       );

//       if (!res.ok) {
//         const errorResponse = await res.json();
//         console.error("Failed to create order:", errorResponse);
//         throw new Error("Failed to create order");
//       }

//       const order = await res.json();

//       if (order.id) {
//         console.log("Order ID:", order.id);
//         //setOrderCount(orderCount + 1); // Increment order count for the next order
//         return order.id; 
//       } else {
//         throw new Error("Order ID not received");
//       }
//     } catch (error) {
//       console.error("Error creating PayPal order:", error);
     
//     }
//   };

//   //! Handle Approval and POST to /walk
//   const handleApprove = async (data, actions) => {
//     try {
//       await actions.order.capture();
//       alert("Payment successful");
    
   
//     const userId = localStorage.getItem('userId')
//     const walkerId = localStorage.getItem('walkerId')
//     const walkDuration = localStorage.getItem('walkDuration')
//     const totalAmount = localStorage.getItem("totalAmount");
//     const dogCount = localStorage.getItem('dog_count');
//     const walkType = localStorage.getItem('walkId')
    


//       const paymentDetails = {
//         ownerId: userId,
//         walkerId: walkerId,
//         duration: walkDuration, 
//         totalPrice: totalAmount,
//         paymentMethod: "paypal",
//         dogs: parseInt(dogCount),
//         walkTypes: [walkType],
//       };
//       console.log('payment details', paymentDetails)

//       const response = await axios.post(`${api}/walk`, paymentDetails, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("POST request response:", response.data);

//       // setTimeout(() => {
//       //   router.push("/ownerHome");
//       // }, 3000);
//     } catch (error) {
//       console.error("Error capturing payment:", error);
//     }
//   };

//   //! Handle Cancel
//   const handleCancel = (data) => {
//     console.log("Cancelled:", data);
//   };

//   return (
//     <div className="border-t border-gray-300 pt-4 mt-8">
//       <h1 className="text-3xl text-[#29235C] font-bold mb-2 mt-4" style={{ fontFamily: "LikeEat" }}>Summary</h1>
//       {/* Other components and content */}
//       <h2 className="font-bold text-2xl">Total: ${totalAmount}</h2>
//       <PayPalScriptProvider
//         options={{
//           clientId: clientId,
//         }}
//       >
//         <PayPalButtons
//           style={{
//             layout: "vertical",
//             color: "white",
//             label: "pay",
//             shape: "pill",
//           }}
//           createOrder={createOrder}
//           onCancel={handleCancel}
//           onApprove={handleApprove}
//         />
//       </PayPalScriptProvider>
//     </div>
//   )
// }

// export default PayPal;