"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DogWalkOption from "../Components/DogWalkOption";
import Reviews from "../Components/Reviews";
import WalkList from "./WalkWalkers";
import "tailwindcss/tailwind.css";
import Map from "../Components/Map";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

const WalkerHome = () => {
  const [comments, setComments] = useState([]);
  const [clientHiring, setClientHiring] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [user, setUser] = useState("");
  const [userWalker, setUserWalker] = useState({});
  const [optionChosen, setOptionChosen] = useState([]);
  const [userProvince, setUserProvince] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const isWalker = localStorage.getItem("isWalker");
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwt.decode(token);
        try {
          const API = process.env.NEXT_PUBLIC_APIURL;
          const response = await axios.get(
            `${API}/users/${decodedToken.userId}`
          );
          setUser(response.data);
          setUserProvince(response.data.province);
          setUserAddress(response.data.address);
          setUserId(decodedToken.userId);
        } catch (error) {
          console.error("Error fetching data from the server", error);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchWalkerTypes = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_APIURL;
        const response = await axios.get(`${API}/walkType`);
        setPriceList(response.data.walkTypeData);
      } catch (error) {
        console.error("Error fetching walker types:", error);
      }
    };
    fetchWalkerTypes();
  }, []);

  useEffect(() => {
    const fetchWalkerData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwt.decode(token);

        try {
          const API = process.env.NEXT_PUBLIC_APIURL;
          const response = await axios.get(
            `${API}/walker/${decodedToken.userId}`
          );
          setUserWalker(response.data);
        } catch (error) {
          console.error("Error fetching walker data from the server", error);
        }
      }
    };
    fetchWalkerData();
  }, []);

  const handleOptionClick = (card) => {
    const updatedOptions = [...optionChosen];

    const index = updatedOptions.findIndex(
      (selectedCard) => selectedCard.id === card.id
    );
    if (index !== -1) {
      updatedOptions.splice(index, 1);
    } else {
      updatedOptions.push(card);
    }
    setOptionChosen(updatedOptions);
  };

  const renderList = userWalker?.walkerData?.walker?.walkTypes?.map(
    (walkerType) => {
      const matchedCard = priceList.find((card) => card.id === walkerType.id);

      return (
        <DogWalkOption
          key={matchedCard?.id}
          option={matchedCard}
          onClick={() => handleOptionClick(matchedCard)}
          selected={optionChosen.some(
            (selectedCard) => selectedCard.id === matchedCard.id
          )}
        />
      );
    }
  );

  const handleRespondComment = (index, response) => {
    const updatedComments = [...comments];
    updatedComments[index].response = response;
    setComments(updatedComments);
  };

  const handleActiveClick = async () => {
    const toggleAvailability = !isAvailable;

    try {
      if (user.id) {
        const API = process.env.NEXT_PUBLIC_APIURL;
        await axios.put(`${API}/walker/${user.id}`, {
          is_available: toggleAvailability,
        });
      }
      if (toggleAvailability) {
        alert("You are ready for a walk a dog! Enjoy!");
      } else {
        alert("Everyone needs a break, take your time!");
      }
      setIsAvailable(toggleAvailability);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="text-center m-20">
      {/* <ToastContainer />
      <Map userProvince={userProvince} userAddress={userAddress} />
      <br /> */}
      <WalkList userId={userId} />
      <br />
      <div className="mb-8">{renderList}</div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Sale Details</h2>
        <p className="text-base">
          {userWalker?.walkerData?.walker?.sale_details ||
            "Woofer offers you dog walking services"}
        </p>
      </div>
      <button
        onClick={handleActiveClick}
        className={`bg-black text-white px-4 py-2 ${
          isAvailable ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isAvailable ? "Active" : "Inactive"}
      </button>
      <br />
      <button
        onClick={() => router.push("/walkerHome/WalkerRegister")}
        className="bg-black text-white px-4 py-2"
      >
        Chage your sell details
      </button>
      <div>
        <h2>Client Comments</h2>
        {comments.map((comment, index) => (
          <div key={index} className="mb-4">
            <p className="text-base">{comment.text}</p>
            {comment.response && (
              <p className="text-base">Response: {comment.response}</p>
            )}
            {!comment.response && (
              <input
                type="text"
                placeholder="Respond..."
                value={comment.response || ""}
                onChange={(e) => handleRespondComment(index, e.target.value)}
                className="border p-2 rounded"
              />
            )}
          </div>
        ))}
      </div>
      <Reviews />
    </div>
  );
};

export default WalkerHome;
