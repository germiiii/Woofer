"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Nav from "../Components/NavBarOwner";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "tailwindcss/tailwind.css";
import local from "next/font/local";
import { browserLocalPersistence } from "firebase/auth";

const CheckoutComponent = () => {
  const [walkerDetails, setWalkerDetails] = useState(null);
  const [walkerId, setWalkerId] = useState('')
  const [selectedWalkType, setSelectedWalkType] = useState(null);
  const [extras, setExtras] = useState([]);
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [orderCount, setOrderCount] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [isTotalAmountValid, setIsTotalAmountValid] = useState(false);
  const [walkTypeQuantity, setWalkTypeQuantity] = useState(1);
  const [extraQuantities, setExtraQuantities] = useState({
    Leash: "0",
    GarbageBag: "0",
    WaterBowl: "0",
  });

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET;

  const api = process.env.NEXT_PUBLIC_APIURL;

  //!Fetch Walker

  useEffect(() => {
    const selectedWalker = localStorage.getItem("selectedWalker");
    if (selectedWalker) {
      const parsedWalker = JSON.parse(selectedWalker);
      const id = parsedWalker?.walker?.walkerData?.id;
      console.log('Walker ID', id);
      setWalkerId(id);
      const walkerID = localStorage.setItem('walkerId', id)
      setWalkerDetails(parsedWalker);
    }
  }, []);

  const walkerData = walkerDetails?.walker?.walkerData || {};  

  //!Reviews

  const sortedReviews =
    walkerDetails && walkerDetails.walker && walkerDetails.walker.reviewsData
      ? walkerDetails.walker.reviewsData.sort((a, b) => b.score - a.score)
      : [];

  const topTwoReviews = sortedReviews
    .slice(0, 2)
    .map((review) => review.description);

  //!Stars

  const calculateMedian = (arr) => {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedArr.length / 2);

    if (sortedArr.length % 2 === 0) {
      return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
    } else {
      return sortedArr[mid];
    }
  };

  // Function to generate stars based on the median score
  const renderStarsFromMedian = (median) => {
    const yellowStars = Array.from(
      { length: Math.round(median) },
      (_, index) => (
        <span key={index} className="text-yellow-500 text-2xl rounded-full">
          &#9733;
        </span> 
      )
    );
    const emptyStars = Array.from(
      { length: 5 - Math.round(median) },
      (_, index) => (
        <span key={index} className="text-gray-300 text-2xl rounded-full">
          &#9734;
        </span> 
      )
    );

    return (
      <div className="flex items-center">
        {yellowStars}
        {emptyStars}
      </div>
    );
  };

  const scores =
    walkerDetails?.walker?.reviewsData.map((review) => review.score) || [];
  const medianScore = calculateMedian(scores);
  const starsForMedian = renderStarsFromMedian(medianScore);

  //!WalkType Selection
  const handleWalkTypeSelection = (walkTypeTitle) => {
    const selectedType = walkerData.walker.walkTypes.find(
      (walkType) => walkType.title === walkTypeTitle
    );
  
    if (selectedType) {
      setSelectedWalkType(selectedType); // Update the selected type
      console.log("Selected Walk ID:", selectedType.id);
      console.log("Walk Duration", selectedType.walk_duration)
      localStorage.setItem('walkId', selectedType.id)
      localStorage.setItem('walkDuration', selectedType.walk_duration)
    } else {
      // Handle the case where the selected walk type is not found
      console.log("Walk type not found");
    }
  };
  
  
  //!Quantity
  const handleQuantityChange = (e, item) => {
    let value = parseInt(e.target.value);

    value = Math.min(Math.max(value, 0), 15);

    setExtraQuantities((prevExtraQuantities) => ({
      ...prevExtraQuantities,
      [item]: value,
    }));
  };

  const incrementQuantity = (item) => {
    setExtraQuantities((prevExtraQuantities) => ({
      ...prevExtraQuantities,
      [item]: Math.min(parseInt(prevExtraQuantities[item]) + 1, 15),
    }));
  };

  const decrementQuantity = (item) => {
    setExtraQuantities((prevExtraQuantities) => ({
      ...prevExtraQuantities,
      [item]: Math.max(parseInt(prevExtraQuantities[item]) - 1, 0),
    }));
  };

  const handleWalkTypeQuantityChange = (value) => {
  
    value = Math.min(Math.max(value, 0), 15);
    setWalkTypeQuantity(value);
  };

  const incrementWalkTypeQuantity = () => {
    setWalkTypeQuantity((prevQuantity) => Math.min(prevQuantity + 1, 15));
  };

  const decrementWalkTypeQuantity = () => {
    setWalkTypeQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };

  //!Total Amount Sum
  const calculateTotalAmount = () => {
    let walkTypePrice = 0;
    if (selectedWalkType) {
      walkTypePrice = selectedWalkType.price * walkTypeQuantity;
    }

    let extrasTotal = 0;
    for (const extra in extraQuantities) {
      const extraPrice = {
        Leash: 5,
        GarbageBag: 2,
        WaterBowl: 3,
        
      }[extra];
      if (extraPrice) {
        extrasTotal += extraPrice * parseInt(extraQuantities[extra]);
      }
    }

    const totalAmountInCents = walkTypePrice + extrasTotal;

    const formattedTotalAmount = String(totalAmountInCents.toFixed(2));

    setTotalAmount(formattedTotalAmount); 
    localStorage.setItem("totalAmount", formattedTotalAmount);
    console.log("Total Amount:", `"${formattedTotalAmount}"`);
    return formattedTotalAmount;
  };

  useEffect(() => {
    const calculatedTotalAmount = calculateTotalAmount();
    setTotalAmount(calculatedTotalAmount);
  }, [selectedWalkType, extraQuantities, walkTypeQuantity]);


  //! PayPal
  //!Access Token Fetching
  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const { data } = await axios.post(
          "https://api-m.sandbox.paypal.com/v1/oauth2/token",
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
            },
          }
        );
        localStorage.setItem("paypal_accessToken", data.access_token);
        console.log("Paypal Access Token:", data.access_token);
      } catch (error) {
        console.error("Error fetching/accessing token:", error);
      }
    }

    fetchAccessToken();

    if (!accessToken) {
      const token = localStorage.getItem("paypal_accessToken");
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    setIsTotalAmountValid(totalAmount > 0);
  }, [totalAmount]);

  //!Create Order
  const createOrder = async (data, actions) => {
    try {
      const storedTotalAmount = localStorage.getItem("totalAmount");

      if (!storedTotalAmount || storedTotalAmount === "0.00") {
        setTimeout(() => createOrder(data, actions), 1000); // Retry after 1 second if totalAmount is 0 or not present
        return;
      }

      console.log("Creating order....");
      const res = await fetch(
        "https://api-m.sandbox.paypal.com/v2/checkout/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: storedTotalAmount, // Pass the retrieved total amount from localStorage here as a string
                },
                description: "Woofer Dog Walk",
                reference_id: `order-${orderCount}`,
              },
            ],
          }),
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        console.error("Failed to create order:", errorResponse);
        throw new Error("Failed to create order");
      }

      const order = await res.json();

      if (order.id) {
        console.log("Order ID:", order.id);
        setOrderCount(orderCount + 1); // Increment order count for the next order
        return order.id; 
      } else {
        throw new Error("Order ID not received");
      }
    } catch (error) {
      console.error("Error creating PayPal order:", error);
     
    }
  };

  //! Handle Approval and POST to /walk
  const handleApprove = async (data, actions) => {
    try {
      await actions.order.capture();
      alert("Payment successful");
    
    const ownerId = localStorage.getItem('Owner ID')
    const userId = localStorage.getItem('userId')
    const walkerId = localStorage.getItem('walkerId')
    const walkDuration = localStorage.getItem('walkDuration')
    const totalAmount = localStorage.getItem("totalAmount");
    const dogCount = localStorage.getItem('dog_count')
    const walkType = localStorage.getItem('walkId')
    


      const paymentDetails = {
        ownerId: ownerId ? ownerId : userId,
        walkerId: walkerId,
        duration: walkDuration, 
        totalPrice: totalAmount,
        paymentMethod: "paypal",
        dogs: dogCount,
        walkTypes: [walkType],
      };
      console.log('Dogs', dogCount)

      const response = await axios.post(`${api}/walk`, paymentDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("POST request response:", response.data);

      // setTimeout(() => {
      //   router.push("/home");
      // }, 3000);
    } catch (error) {
      console.error("Error capturing payment:", error);
    }
  };

  //! Handle Cancel
  const handleCancel = (data) => {
    console.log("Cancelled:", data);
  };

  return (
    <div className="">
      <>
        <Nav />
      </>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center relative">
        <h1
          className="text-4xl text-[#29235C] font-bold mb-2 mt-11"
          style={{ fontFamily: "LikeEat" }}
        >
          Payment Summary
        </h1>
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg flex flex-col items-center relative">
          <div className="flex w-full">
            <div className="w-1/2 p-4 border-r border-gray-300 bg-[#29235C] rounded-lg">
              {/* Left Column: Walker Details */}
              <div className="w-1/2 py-9 relative ">
                {walkerDetails && walkerData ? (
                  <div className="relative ">
                    <p
                      className="text-4xl text-[#F39200] font-bold absolute top-2 right-4 left-8"
                      style={{ fontFamily: "LikeEat" }}
                    >
                      {walkerData.name + " " + walkerData.lastName}
                    </p>

                    <div
                      className="rounded-lg overflow-hidden"
                      style={{
                        backgroundImage: `url(${walkerData.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        paddingBottom: "100%",
                        width: "500px",
                        height: "550px",
                      }}
                    ></div>
                  </div>
                ) : null}

                <p>{starsForMedian}</p>

                <h3 className="text-white text-2xl" style={{ fontFamily: "LikeEat" }}>Reviews</h3>
                {topTwoReviews.length > 0 ? (
                  <div className="text-white">
                    {topTwoReviews.map((description, index) => (
                      <div key={index}>
                        <p>
                          <i>
                            {index === 0 ? `"${description}"` : description}
                          </i>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No reviews available</p>
                )}
              </div>
            </div>
            {/* Right Column: Walk Types, Extras, and PayPal Button */}
            <div className="w-1/2 p-4">
              {walkerDetails && walkerData ? (
                <div>
                  <h2
                    className="text-3xl text-[#29235C] font-bold mb-2 mt-4"
                    style={{ fontFamily: "LikeEat" }}
                  >
                    Walk Services by {walkerData.name}:
                  </h2>
                  {walkerData.walker?.walkTypes &&
                  walkerData.walker.walkTypes.length > 0 ? (
                    <div>
                      <td className="py-4">
                        {/* <label htmlFor="walkTypeSelect">Select Walk Type:</label> */}
                        <select
                          id="walkTypeSelect"
                          onChange={(e) =>
                            handleWalkTypeSelection(e.target.value)
                          }
                          className="border border-[#F39200] p-1 rounded "
                        >
                          <option value="">Select a Walk Type</option>
                          {walkerData.walker.walkTypes.map((walkType) => (
                            <option key={walkType.id} value={walkType.title}>
                              {walkType.title} - ${walkType.price}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => decrementWalkTypeQuantity()}
                            className="border rounded-md py-2 px-4 mr-2"
                          >
                            -
                          </button>
                          <span className="text-center w-8">
                            {walkTypeQuantity}
                          </span>
                          <button
                            onClick={() => incrementWalkTypeQuantity()}
                            className="border rounded-md py-2 px-4 ml-2"
                          >
                            +
                          </button>
                        </div>
                      </td>
                  
                      {selectedWalkType && (
                        <div className="mt-4 relative">
                          <div className="bg-[#F39200] rounded-lg p-4">
                            <p className="text-sm text-bold text-white">
                              {selectedWalkType.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>No walk types available</p>
                  )}

                  {/* Add Extras Section */}
                  <div className="mt-8">
                    <h3 className="mb-4 font-bold text-2xl text-[#29235C]" style={{ fontFamily: "LikeEat" }}>Add Extras:</h3>
                    <table>
                      <tbody>
                        <tr>
                          <td className="py-4">
                            <label htmlFor="leash" className="block">
                              Leash
                            </label>
                            <span className="text-sm text-gray-500 ml-2">
                              $5
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => decrementQuantity("Leash")}
                                className="border rounded-md py-2 px-4 mr-2"
                              >
                                -
                              </button>
                              <span className="text-center w-8">
                                {extraQuantities["Leash"]}
                              </span>
                              <button
                                onClick={() => incrementQuantity("Leash")}
                                className="border rounded-md py-2 px-4 ml-2"
                              >
                                +
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4">
                            <label htmlFor="garbagebag" className="block">
                              Garbage Bag
                            </label>
                            <span className="text-sm text-gray-500 ml-2">
                              $2
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => decrementQuantity("GarbageBag")}
                                className="border rounded-md py-2 px-4 mr-2"
                              >
                                -
                              </button>
                              <span className="text-center w-8">
                                {extraQuantities["GarbageBag"]}
                              </span>
                              <button
                                onClick={() => incrementQuantity("GarbageBag")}
                                className="border rounded-md py-2 px-4 ml-2"
                              >
                                +
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4">
                            <label htmlFor="waterBowl" className="block">
                              Water Bowl
                            </label>
                            <span className="text-sm text-gray-500 ml-2">
                              $3
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => decrementQuantity("WaterBowl")}
                                className="border rounded-md py-2 px-4 mr-2"
                              >
                                -
                              </button>
                              <span className="text-center w-8">
                                {extraQuantities["WaterBowl"]}
                              </span>
                              <button
                                onClick={() => incrementQuantity("WaterBowl")}
                                className="border rounded-md py-2 px-4 ml-2"
                              >
                                +
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p>Loading walker details...</p>
              )}

              {/* Summary and PayPal Button */}
              <div className="border-t border-gray-300 pt-4 mt-8">
                <h1 className="text-3xl text-[#29235C] font-bold mb-2 mt-4"
                    style={{ fontFamily: "LikeEat" }}>Summary</h1>
                <h2 className="font-bold text-2xl">Total: ${totalAmount}</h2>
                <PayPalScriptProvider
                  options={{
                    clientId: clientId,
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      color: "gold",
                      label: "pay",
                      shape: "pill",
                    }}
                    createOrder={createOrder}
                    onCancel={handleCancel}
                    onApprove={handleApprove}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
