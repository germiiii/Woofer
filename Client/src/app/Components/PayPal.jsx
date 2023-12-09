// "use client";
// import { useParams, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import axios from "axios";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import "tailwindcss/tailwind.css";


// const PayPal = ({totalAmount}) => {
//   const router = useRouter();
//   const { id } = useParams();
//   const [service, setService] = useState({});
//   const [orderCount, setOrderCount] = useState(0);
//   const [accessToken, setAccessToken] = useState("");
//   const [isTotalAmountValid, setIsTotalAmountValid] = useState(false);
  

//   const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
//   const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET;

//   // useEffect(() => {
//   //   const fetchServiceDetail = async () => {
//   //     try {
//   //       const api = process.env.NEXT_PUBLIC_APIURL;
//   //       const response = await axios.get(`${api}/walkType/${id}`);
//   //       const data = response.data;

//   //       if (data) {
//   //         setService(data); // Assuming response data is the service object
//   //       } else {
//   //         window.alert("No hay información para ese ID");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching service details:", error);
//   //       window.alert("Error al obtener detalles del servicio");
//   //     }
//   //   };

//   //   if (id) {
//   //     fetchServiceDetail();
//   //   }

//   //   return () => {
//   //     setService({});
//   //   };
//   // }, [id]);

//   //! PayPal

//   useEffect(() => {
//     async function fetchAccessToken() {
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
//         localStorage.setItem("paypal_accessToken", data.access_token);
//         console.log('Paypal Access Token:', data.access_token)
//       } catch (error) {
//         console.error("Error fetching/accessing token:", error);
//       }
//     }

//     fetchAccessToken();

//     if (!accessToken) {
//       const token = localStorage.getItem("paypal_accessToken");
//       setAccessToken(token);
//     }
//   }, []);

//   useEffect(() => {
//     setIsTotalAmountValid(totalAmount > 0);
//   }, [totalAmount]);
  
//   const createOrder = async (data, actions) => {
//     try {
//       if (totalAmount === 0) {
//         setTimeout(() => createOrder(data, actions), 1000); // Retry after 1 second if totalAmount is 0
//         return;
//       }
//       console.log('Creating order....')
//       const res = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//           intent: 'CAPTURE',
//           purchase_units: [
//             {
//               amount: {
//                 currency_code: 'USD',
//                 value: totalAmount,
//               },
//             },
//           ],
//         }),
//       });
  
//       if (!res.ok) {
//         const errorResponse = await res.json();
//         console.error('Failed to create order:', errorResponse);
//         throw new Error('Failed to create order');
//       }
  
//       const order = await res.json();
  
//       if (order.id) {
//         console.log('Order ID:', order.id);
//         setOrderCount(orderCount + 1); // Increment order count for the next order
//         return order.id; // Return the order ID
//       } else {
//         throw new Error('Order ID not received');
//       }
//     } catch (error) {
//       console.error('Error creating PayPal order:', error);
//       // Implement your error handling here
//     }
//   };
  

//   // const handleApprove = (data, actions) => {
//   //   console.log("Approved:", data);
//   //   actions.order.capture();
//   //   alert("Payment successful");
//   //   setTimeout(() => {
//   //     router.push("/home");
//   //   }, 3000);
//   // };

//   const handleApprove = (data, actions) => {
//     return actions.order.capture().then(function (details) {
//       // Handle successful capture here
//       // For example: show success message, redirect, etc.
//     });
//   };

//   const handleCancel = (data) => {
//     console.log("Cancelled:", data);
//   };

//   return (
//     <div>
      
//                 <PayPalScriptProvider
//                   options={{
//                     clientId: clientId,
//                   }}
//                 >
//                   <PayPalButtons
//                     style={{
//                       layout: "horizontal",
//                       color: "gold",
//                       label: "pay",
//                       shape: "pill",
//                     }}
//                     createOrder={createOrder}
//                     onCancel={handleCancel}
//                     onApprove={handleApprove}
//                   />
//                 </PayPalScriptProvider>
             
//     </div>
//   )
// };

// export default PayPal;
