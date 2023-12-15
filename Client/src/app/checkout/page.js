"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Nav from "../Components/NavBarOwner";
import PayPal from "../../api/checkout";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "tailwindcss/tailwind.css";
import local from "next/font/local";
import { browserLocalPersistence } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const CheckoutComponent = () => {
  const router = useRouter();
  const [walkerDetails, setWalkerDetails] = useState(null);
  const [walkerId, setWalkerId] = useState("");
  const [selectedWalkType, setSelectedWalkType] = useState(null);
  const [extras, setExtras] = useState([]);
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [orderCount, setOrderCount] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [isTotalAmountValid, setIsTotalAmountValid] = useState(false);
  const [walkTypeQuantity, setWalkTypeQuantity] = useState(1);
  const [showReviews, setShowReviews] = useState(false);
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
      setWalkerId(id);
      const walkerID = localStorage.setItem("walkerId", id);
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

    const toggleReviews = () => {
      setShowReviews(!showReviews);
    };

    const toggleWalkerDetails = () => {
      setShowReviews(false);
    };

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
        <span key={index} className="text-white text-3xl rounded-full">
          &#9733;
        </span>
      )
    );
    const emptyStars = Array.from(
      { length: 5 - Math.round(median) },
      (_, index) => (
        <span key={index} className="text-white text-3xl rounded-full">
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

  // Assuming you have the scores and median score calculation logic in place
  const scores =
    walkerDetails?.walker?.reviewsData.map((review) => review.score) || [];
  const medianScore = calculateMedian(scores);
  const starsForMedian = renderStarsFromMedian(medianScore);

  //!Stars for individual reviews
  const renderStars = (score) => {
    const totalStars = 5;
    const fullStars = Math.floor(score);
    const halfStars = Math.ceil(score - fullStars);

    const starArray = [];
    for (let i = 0; i < fullStars; i++) {
      starArray.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: '#FFF' }} />);
    }
    if (halfStars === 1) {
      starArray.push(
        <FontAwesomeIcon key={starArray.length} icon={faStar} half style={{ color: '#FFF' }} />
      );
    }
    const emptyStars = totalStars - (fullStars + halfStars);
    for (let i = 0; i < emptyStars; i++) {
      starArray.push(<FontAwesomeIcon key={starArray.length} icon={faStar} regular style={{ color: '#FFF' }} />);
    }

    return starArray;
  };

  //!WalkType Selection
  const handleWalkTypeSelection = (walkTypeTitle) => {
    const selectedType = walkerData.walker.walkTypes.find(
      (walkType) => walkType.title === walkTypeTitle
    );

    if (selectedType) {
      setSelectedWalkType(selectedType);
      localStorage.setItem("walkId", selectedType.id);
      localStorage.setItem("walkDuration", selectedType.walk_duration);
    } else {
      setSelectedWalkType(null);
      setTotalAmount("0.00");
      setWalkTypeQuantity(1);
      setExtraQuantities({
        Leash: "0",
        GarbageBag: "0",
        WaterBowl: "0",
      });
    }
  };

  //!Quantity

  const isWalkTypeSelected = selectedWalkType !== null;

  const handleQuantityChange = (e, item) => {
    if (!isWalkTypeSelected) {
      alert("Please select a walk type first");
      return;
    }
    let value = parseInt(e.target.value);

    value = Math.min(Math.max(value, 0), 15);

    setExtraQuantities((prevExtraQuantities) => ({
      ...prevExtraQuantities,
      [item]: value,
    }));
  };

  const incrementQuantity = (item) => {
    if (!isWalkTypeSelected) {
      alert("Please select a walk type first");
      return;
    }
    setExtraQuantities((prevExtraQuantities) => ({
      ...prevExtraQuantities,
      [item]: Math.min(parseInt(prevExtraQuantities[item]) + 1, 15),
    }));
  };

  const decrementQuantity = (item) => {
    if (!isWalkTypeSelected) {
      alert("Please select a walk type first");
      return;
    }
    setExtraQuantities((prevExtraQuantities) => ({
      ...prevExtraQuantities,
      [item]: Math.max(parseInt(prevExtraQuantities[item]) - 1, 0),
    }));
  };

  const handleWalkTypeQuantityChange = (value) => {
    if (!isWalkTypeSelected || value === 0) {
      alert("Please select a valid quantity for the walk type");
      return;
    }
    value = Math.min(Math.max(value, 0), 15);
    setWalkTypeQuantity(value);
  };

  const incrementWalkTypeQuantity = () => {
    if (!isWalkTypeSelected || walkTypeQuantity === 0) {
      alert("Please select a walk type first");
      return;
    }
    setWalkTypeQuantity((prevQuantity) => Math.min(prevQuantity + 1, 15));
  };

  const decrementWalkTypeQuantity = () => {
    if (!isWalkTypeSelected || walkTypeQuantity === 0) {
      alert("Please select a walk type first");
      return;
    }
    setWalkTypeQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Set a minimum of 1 instead of 0
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
    return formattedTotalAmount;
  };

  useEffect(() => {
    const calculatedTotalAmount = calculateTotalAmount();
    setTotalAmount(calculatedTotalAmount);
  }, [selectedWalkType, extraQuantities, walkTypeQuantity]);

  // //! PayPal
  // //!Access Token Fetching
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
      const accessToken = localStorage.getItem("paypal_accessToken");
      console.log("Access Token", accessToken);
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

      const userId = localStorage.getItem("userId");
      const walkerId = localStorage.getItem("walkerId");
      const walkDuration = localStorage.getItem("walkDuration");
      const totalAmount = localStorage.getItem("totalAmount");
      const dogCount = localStorage.getItem("dog_count");
      const walkType = localStorage.getItem("walkId");

      const paymentDetails = {
        ownerId: userId,
        walkerId: walkerId,
        duration: walkDuration,
        totalPrice: totalAmount,
        paymentMethod: "paypal",
        dogs: parseInt(dogCount),
        walkTypes: [walkType],
      };
      console.log("payment details", paymentDetails);

      const response = await axios.post(`${api}/walk`, paymentDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("POST request response:", response.data);

      setTimeout(() => {
        router.push("/ownerHome");
      }, 3000);
    } catch (error) {
      console.error("Error capturing payment:", error);
    }
  };

  const paymentFake = async (data, actions) => {
    const storedTotalAmount = localStorage.getItem("totalAmount");
    if (!storedTotalAmount || storedTotalAmount === "0.00") {
      window.alert("Please select a type of walk");
      return;
    }

    try {
      alert("Payment successful");

      const userId = localStorage.getItem("userId");
      const walkerId = localStorage.getItem("walkerId");
      const walkDuration = localStorage.getItem("walkDuration");
      const totalAmount = localStorage.getItem("totalAmount");
      const dogCount = localStorage.getItem("dog_count");
      const walkType = localStorage.getItem("walkId");

      const paymentDetails = {
        ownerId: userId,
        walkerId: walkerId,
        duration: walkDuration,
        totalPrice: totalAmount,
        paymentMethod: "alternative",
        dogs: parseInt(dogCount),
        walkTypes: [walkType],
      };

      const response = await axios.post(`${api}/walk`, paymentDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/ownerHome");
    } catch (error) {
      console.error("Error capturing payment:", error);
    }
  };

  //! Handle Cancel
  const handleCancel = (data) => {
    console.log("Cancelled:", data);
  };

  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex flex-grow h-screen">
        <div className="bg-[#29235c] w-1/2 flex flex-col justify-center items-center">
          {walkerDetails && walkerData ? (
            <div className="flex flex-col h-full items-center">
              <div className="mt-5 mb-5">
                <h1
                  className="text-4xl text-[#F39200] font-bold "
                  style={{ fontFamily: "LikeEat" }}
                >
                  {walkerData.name + " " + walkerData.lastName}
                </h1>
              </div>
              {showReviews ? (
                <div className="flex flex-col items-center">
                  <h2 className="text-white text-bold text-3xl" style={{ fontFamily: "LikeEat" }}>Reviews</h2>
                  <div className="rounded-lg bg-[#29235c] p-4 mt-4 w-[450px]">
                  {sortedReviews.length > 0 ? (
                    
                    sortedReviews.slice(0, 3).map((review, index) => (
                      <div key={index} className="bg-[#F39200] text-white rounded-lg p-3 my-3">
                        <p><i>{review.description}</i></p>
                        <p>{renderStarsFromMedian(review.score)}</p>
                      </div>
                    ))
                  ) : (
                    
                    <p className="bg-[#F39200] text-white rounded-lg p-3 my-3">
                      {walkerData.name} has not received any reviews yet. Be the first one to comment on her services!
                    </p>
                  )}
                  <button onClick={toggleWalkerDetails} className="w-30 px-5 py-2 rounded-full bg-white hover:text-[#F39200] mt-4" style={{marginLeft: '100px'}}>
                    Back to {walkerData.name}'s details
                  </button>
                </div>
                </div>
              ) : (
                          
                      
                          
              <div className="flex flex-col items-center h-[650px] w-[450px] rounded-lg bg-[#F39200]">
               
                <Image
                  src={walkerData.image}
                  width={300}
                  height={0}
                  className="mt-5 rounded-lg"
                  alt=""
                />
                <div className="mt-2"> {starsForMedian} </div>
                <div className="mt-2">
                  <h3
                    className="text-[#29235c] text-3xl text-center"
                    style={{ fontFamily: "LikeEat" }}
                  >
                    About {walkerData.name}
                  </h3>
                  <p className="text-[#29235c] text-center ml-3 mr-3 mt-2">{walkerData.walker.sale_details}</p>
                </div>
                <button onClick={toggleReviews} className="w-30 px-5 py-2 rounded-full bg-white hover:text-[#F39200] mt-10">
                  View {walkerData.name}'s reviews
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
             
        <div className="w-1/2 bg-[#E4E2ED] flex flex-col items-center">
          <div className="mt-2">
            {walkerDetails && walkerData ? (
              <div>
                <h2
                  className="text-3xl text-[#29235C] font-bold mb-2 mt-4"
                  style={{ fontFamily: "LikeEat" }}
                >
                  Walk Services by{" "}
                  <span style={{ color: "#F39200" }}>{walkerData.name}</span>
                </h2>

                {walkerData.walker?.walkTypes &&
                walkerData.walker.walkTypes.length > 0 ? (
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <select
                              id="walkTypeSelect"
                              onChange={(e) =>
                                handleWalkTypeSelection(e.target.value)
                              }
                              className="p-1 "
                            >
                              <option value="">select a Walk Type</option>
                              {walkerData.walker.walkTypes.map((walkType) => (
                                <option
                                  key={walkType.id}
                                  value={walkType.title}
                                >
                                  {walkType.title} - ${walkType.price}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => decrementWalkTypeQuantity()}
                                className=" text-[#29235C] border rounded-md py-2 px-4 font-bold"
                              >
                                -
                              </button>
                              <span className="text-center font-bold text-[#29235C] w-8">
                                {walkTypeQuantity}
                              </span>
                              <button
                                onClick={() => incrementWalkTypeQuantity()}
                                className="text-[#29235C] border rounded-md py-2 px-4 font-bold"
                              >
                                +
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {selectedWalkType && (
                      <div className="mt-4 relative">
                        <div
                          className="bg-[#F39200] rounded-lg p-4"
                          style={{ maxWidth: "400px", overflow: "hidden" }}
                        >
                          <p
                            className="text-sm text-bold text-white"
                            style={{ lineHeight: "1.2em" }}
                          >
                            {selectedWalkType.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>No walk types available</p>
                )}

                <div className="mt-8">
                  <h3
                    className="mb-4 font-bold text-3xl text-[#29235C]"
                    style={{ fontFamily: "LikeEat" }}
                  >
                    Add Extras:
                  </h3>
                  <table>
                    <tbody>
                      <tr>
                        <td className="py-4 text-end">
                          <label
                            htmlFor="leash"
                            className="block text-[#29235C] font-bold"
                          >
                            Leash
                          </label>
                          <span className="text-md text-[#29235C] ml-2 font-bold">
                            $5
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="ml-10 flex items-center">
                            <button
                              onClick={() => decrementQuantity("Leash")}
                              className="border rounded-md py-2 px-4 mr-2 text-[#29235C] font-bold"
                            >
                              -
                            </button>
                            <span className="text-center w-8 text-[#29235C] font-bold">
                              {extraQuantities["Leash"]}
                            </span>
                            <button
                              onClick={() => incrementQuantity("Leash")}
                              className="border rounded-md py-2 px-4 ml-2 text-[#29235C] font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-end">
                          <label
                            htmlFor="garbagebag"
                            className="block text-[#29235C] font-bold"
                          >
                            Garbage bag
                          </label>
                          <span className="text-md text-[#29235C] ml-2 font-bold">
                            $2
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="ml-10 flex items-center">
                            <button
                              onClick={() => decrementQuantity("GarbageBag")}
                              className="border rounded-md py-2 px-4 mr-2 text-[#29235C] font-bold"
                            >
                              -
                            </button>
                            <span className="text-center w-8 text-[#29235C] font-bold">
                              {extraQuantities["GarbageBag"]}
                            </span>
                            <button
                              onClick={() => incrementQuantity("GarbageBag")}
                              className="border rounded-md py-2 px-4 ml-2 text-[#29235C] font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-end">
                          <label
                            htmlFor="waterBowl"
                            className="block text-[#29235C] font-bold"
                          >
                            Water bowl
                          </label>
                          <span className="text-md text-[#29235C] ml-2 font-bold">
                            $3
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="ml-10 flex items-center">
                            <button
                              onClick={() => decrementQuantity("WaterBowl")}
                              className="border rounded-md py-2 px-4 mr-2 text-[#29235C] font-bold"
                            >
                              -
                            </button>
                            <span className="text-center w-8 text-[#29235C] font-bold">
                              {extraQuantities["WaterBowl"]}
                            </span>
                            <button
                              onClick={() => incrementQuantity("WaterBowl")}
                              className="border rounded-md py-2 px-4 ml-2 text-[#29235C] font-bold"
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

            <div className="">
              <div className="flex justify-between">
                <h1
                  className="text-3xl text-[#29235C] font-bold "
                  style={{ fontFamily: "LikeEat" }}
                >
                  Summary
                </h1>
                <h2 className="text-[#29235C] text-2xl">
                  Total: ${totalAmount}
                </h2>
              </div>
              <div className="flex flex-col justify-center items-center mt-5 mb-5">
                <button
                  onClick={() => {
                    paymentFake();
                  }}
                  className="w-30 px-6 py-1 rounded-full bg-[#F39200] text-white font-bold"
                >
                  alternative payment methods
                </button>
              </div>

              <PayPalScriptProvider
                options={{
                  clientId: clientId,
                }}
              >
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "white",
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
  );
};

export default CheckoutComponent;
