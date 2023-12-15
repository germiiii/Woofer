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
  const [isWalker, setIsWalker] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      setIsWalker(localStorage.getItem("isWalker"));
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
          setIsAvailable(response.data.walker.is_available);
        } catch (error) {
          console.error("Error fetching data from the server", error);
        }
      }
    };
    fetchData();
  }, [isAvailable]);

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

  const handleActiveClick = async () => {
    try {
      if (user.id) {
        const API = process.env.NEXT_PUBLIC_APIURL;
        await axios.put(`${API}/walker/${user.id}`, {
          is_available: !isAvailable,
        });
      }
      setIsAvailable(!isAvailable);
      if (!isAvailable) {
        alert("You are ready for a walk a dog! Enjoy!");
      } else {
        alert("Everyone needs a break, take your time!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex flex-grow h-screen">
      <div className="bg-[#29235c] w-1/2 flex flex-col items-center">
        <div className="flex flex-col items-center mt-10">
          <h1
            className=" text-5xl text-[#F39200]"
            style={{ fontFamily: "LikeEat" }}
          >
            My walks
          </h1>
        </div>
        <WalkList userId={userId} />
      </div>
      <div className="w-1/2 bg-[#E4E2ED]">
        <div className="flex flex-col items-center mt-10">
          <h1
            className=" text-5xl text-[#29235c]"
            style={{ fontFamily: "LikeEat" }}
          >
            About me
          </h1>
          <p className="text-[#29235c] text-center mb-5 mt-5 ml-10 mr-10">
            {userWalker?.walkerData?.walker?.sale_details ||
              "No description yet."}
          </p>
        </div>
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={handleActiveClick}
            className={`bg-black text-white px-6 py-1 rounded-full font-bold ml-10 hover:text-[#29235c] transition transition-colors duration-300 ${
              !isAvailable ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {!isAvailable ? "set to available" : "set to unavailable"}
          </button>
          <div className="flex">
            <h1 className=" text-2xl text-[#29235c] font-bold">Walking in </h1>
            <h1 className="ml-2 text-2xl text-[#F39200] font-bold">
              {userProvince}
            </h1>
          </div>
          <button
            onClick={() => router.push("/walkerHome/WalkerRegister")}
            className="px-6 py-1 rounded-full bg-[#F39200] text-white font-bold mr-10 hover:text-[#29235c] transition transition-colors duration-300"
          >
            edit this section
          </button>
        </div>
        <div className="flex flex-col items-center">{renderList}</div>
      </div>
    </div>
  );
};

export default WalkerHome;
