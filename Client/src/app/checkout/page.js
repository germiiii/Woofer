"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PayPal from "../Components/PayPal";
import Image from "next/image";
import Nav from "../Components/NavBarHome";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutComponent = () => {
  const [walkerDetails, setWalkerDetails] = useState(null);
  const [selectedWalkType, setSelectedWalkType] = useState(null);
  const [extras, setExtras] = useState([]);
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [orderCount, setOrderCount] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [isTotalAmountValid, setIsTotalAmountValid] = useState(false);

  const [walkTypeQuantity, setWalkTypeQuantity] = useState(1);
  const [extraQuantities, setExtraQuantities] = useState({
    Leash: "0.00",
    GarbageBag: "0.00",
    WaterBowl: "0.00",
  });

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET;

  useEffect(() => {
    const selectedWalker = localStorage.getItem("selectedWalker");
    //console.log('Selected Walker:', selectedWalker)
    if (selectedWalker) {
      const parsedWalker = JSON.parse(selectedWalker);
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

  // Calculate median from scores
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
        <span key={index} className="text-yellow-500">
          &#9733;
        </span> // Yellow filled star
      )
    );
    const emptyStars = Array.from(
      { length: 5 - Math.round(median) },
      (_, index) => (
        <span key={index} className="text-gray-300">
          &#9734;
        </span> // Empty star in gray
      )
    );
    return (
      <div className="flex items-center">
        {yellowStars}
        {emptyStars}
      </div>
    );
  };

  // Calculate median and render stars
  const scores =
    walkerDetails?.walker?.reviewsData.map((review) => review.score) || [];
  const medianScore = calculateMedian(scores);
  const starsForMedian = renderStarsFromMedian(medianScore);

  //!WalkType Selection
  const handleWalkTypeSelection = (walkTypeTitle) => {
    // Find the selected walkType object based on the title
    const selectedType = walkerData.walker.walkTypes.find(
      (walkType) => walkType.title === walkTypeTitle
    );
    setSelectedWalkType(selectedType);
    console.log("Selected Walk:", selectedType);
  };

  //!Quantity
  const handleQuantityChange = (e, item) => {
  let value = parseInt(e.target.value);

  // Validate and limit the value between 0 and 15
  value = Math.min(Math.max(value, 0), 15);

  setExtraQuantities((prevExtraQuantities) => ({
    ...prevExtraQuantities,
    [item]: value,
  }));
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
        // Add more extras with their corresponding prices
      }[extra];
      if (extraPrice) {
        extrasTotal += extraPrice * parseInt(extraQuantities[extra]);
      }
    }

    // Calculate the total amount by adding walkTypePrice and extrasTotal
    const totalAmountInCents = walkTypePrice + extrasTotal;

    // Convert total amount to a string with the correct format (e.g., "100.00")
    const formattedTotalAmount = String(totalAmountInCents.toFixed(2));

    setTotalAmount(formattedTotalAmount); // Set the total amount using state
    localStorage.setItem('totalAmount', formattedTotalAmount);
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
      const storedTotalAmount = localStorage.getItem('totalAmount');
  
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
        return order.id; // Return the order ID
      } else {
        throw new Error("Order ID not received");
      }
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      // Implement your error handling here
    }
  };
  

  // const handleApprove = (data, actions) => {
  //   console.log("Approved:", data);
  //   actions.order.capture();
  //   alert("Payment successful");
  //   setTimeout(() => {
  //     router.push("/home");
  //   }, 3000);
  // };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      alert("Payment successful");
    });
  };

  const handleCancel = (data) => {
    console.log("Cancelled:", data);
  };

  return (
    <div className="">
      <>
      <Nav/>
      </>
    <div className="flex">
   
      {/* Left Column: Walker Details */}
      <div className="w-1/2 pr-8">
        <h2 className="mb-4 font-bold text-2xl">Walker Details</h2>
        {walkerDetails && walkerData ? (
          <div>
            <p className="font-bold text-2xl">
              {walkerData.name + " " + walkerData.lastName}
            </p>
            <Image
              src={walkerData.image}
              alt="profile"
              width={400}
              height={400}
              className="rounded-lg"
            />

            <p>{starsForMedian}</p>

            <h3>Reviews</h3>
            {topTwoReviews.length > 0 ? (
              <div>
                {topTwoReviews.map((description, index) => (
                  <div key={index}>
                    <p>
                      <i>{index === 0 ? `"${description}"` : description}</i>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews available</p>
            )}
          </div>
        ) : (
          <p>Loading walker details...</p>
        )}
      </div>

      {/* Right Column: Walk Types, Extras, and PayPal Button */}
      <div className="w-1/2 pl-8">
        {walkerDetails && walkerData ? (
          <div>
            <h2 className="mb-4 font-bold text-2xl">
              Walk Services by {walkerData.name}:
            </h2>
            {walkerData.walker?.walkTypes &&
            walkerData.walker.walkTypes.length > 0 ? (
              <div>
                <label htmlFor="walkTypeSelect">Select Walk Type:</label>
                <select
                  id="walkTypeSelect"
                  onChange={(e) => handleWalkTypeSelection(e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="">Select a Walk Type</option>
                  {walkerData.walker.walkTypes.map((walkType) => (
                    <option key={walkType.id} value={walkType.title}>
                      {walkType.title} - ${walkType.price}
                    </option>
                  ))}
                </select>
                 {/* Display walk type description */}
              {selectedWalkType && (
                <div className="mt-4">
                  <p className="text-sm text-bold">{selectedWalkType.description}</p>
                </div>
              )}
              </div>
            ) : (
              <p>No walk types available</p>
            )}

            {/* Walk Type Quantity */}
            <div className="mt-4">
              <label htmlFor="walkTypeQuantity">Quantity for Walk Type:</label>
              <input
                type="number"
                id="walkTypeQuantity"
                value={walkTypeQuantity}
                onChange={(e) => setWalkTypeQuantity(parseInt(e.target.value))}
                className="border p-1 rounded"
              />
            </div>

            {/* Add Extras Section */}
            <div className="mt-8">
  <h3 className="mb-4">Add Extras:</h3>
  <div>
    <label htmlFor="leash" className="block">Leash - $5</label>
    <span className="border p-1 rounded w-12">
      <input
        type="number"
        id="leash"
        value={extraQuantities["Leash"]}
        onFocus={(e) => e.target.setAttribute('type', 'number')}
        onBlur={(e) => e.target.setAttribute('type', 'text')}
        onChange={(e) => handleQuantityChange(e, "Leash")}
        className="border-none w-sm"
        min="0"
        max="15"
      />
    </span>

    <label htmlFor="garbagebag" className="block mt-2">Garbage Bag - $2</label>
    <span className="border p-1 rounded w-12">
      <input
        type="number"
        id="garbagebag"
        value={extraQuantities["Garbage Bag"]}
        onFocus={(e) => e.target.setAttribute('type', 'number')}
        onBlur={(e) => e.target.setAttribute('type', 'text')}
        onChange={(e) => handleQuantityChange(e, "Bag")}
        className="border-none w-sm"
        min="0"
        max="15"
      />
    </span>

    <label htmlFor="waterBowl" className="block mt-2">Water Bowl - $3</label>
    <span className="border p-1 rounded w-12">
      <input
        type="number"
        id="waterBowl"
        value={extraQuantities["Water Bowl"]}
        onFocus={(e) => e.target.setAttribute('type', 'number')}
        onBlur={(e) => e.target.setAttribute('type', 'text')}
        onChange={(e) => handleQuantityChange(e, "Water")}
        className="border-none w-sm"
        min="0"
        max="15"
      />
    </span>
  </div>
</div>
          </div>
        ) : (
          <p>Loading walker details...</p>
        )}

        {/* Summary and PayPal Button */}
        <div>
          <h1 className="font-bold text-2xl">Summary</h1>
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
  );
};

export default CheckoutComponent;
