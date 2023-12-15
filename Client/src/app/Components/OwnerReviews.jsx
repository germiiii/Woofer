"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import "tailwindcss/tailwind.css";
import NavBarOwner from "../Components/NavBarOwner";
import Image from "next/image";
import { useRouter } from "next/navigation";

const OwnerReviewForm = ({ onReviewSubmit, id }) => {
  const router = useRouter();
  const [userReview, setUserReview] = useState({
    score: 0,
    description: "",
  });
  const [walkData, setWalkData] = useState();
  const [walkerData, setWalkerData] = useState();
  const [error, setError] = useState("");
  const walkId = id.id;
  useEffect(() => {
    const fetchWalkData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwt.decode(token);
          const API = process.env.NEXT_PUBLIC_APIURL;
          const walkUrl = `${API}/walk`;
          const response = await axios.get(walkUrl);
          const matchingWalk = response.data.allWalks.find(
            (walk) => walk.id === walkId
          );

          if (matchingWalk) {
            setWalkData(matchingWalk);
          } else {
            console.warn(`No se encontró ninguna caminata con el ID ${walkId}`);
          }
        } catch (error) {
          console.error("Error fetching walk data:", error);
        }
      }
    };

    fetchWalkData();
  }, [walkId]);

  useEffect(() => {
    const fetchWalkerData = async () => {
      const API = process.env.NEXT_PUBLIC_APIURL;
      const walkerUrl = `${API}/walker/${walkData?.walker.id}`;

      try {
        const response = await axios.get(walkerUrl);
        setWalkerData(response.data);
      } catch (error) {
        console.error("Error fetching walker data:", error);
      }
    };

    // Verifica si walkData existe antes de hacer la solicitud
    if (walkData?.walker?.id) {
      fetchWalkerData();
    }
  }, [walkData]);

  const walkerImage = walkerData?.walkerData.image;

  const handleScoreChange = (newScore) => {
    setUserReview({ ...userReview, score: newScore });
  };

  const handleDescriptionChange = (event) => {
    const inputValue = event.target.value;
    const truncatedInput = inputValue.slice(0, 100);

    setUserReview({ ...userReview, description: truncatedInput });
  };

  const submitReview = async () => {
    if (walkData.hasWalkerReview) {
      window.alert("You have already written a review for this walk");
      router.push("/ownerHome");
      return;
    }

    try {
      const API = process.env.NEXT_PUBLIC_APIURL;
      const reviewUrl = `${API}/review`;
      const reviewData = {
        idWalk: walkId,
        type: "walker",
        score: userReview.score,
        description: userReview.description,
      };

      const response = await axios.post(reviewUrl, reviewData);
      setUserReview({
        score: 1,
        description: "",
      });
      window.alert("Review sent successfully");
      router.push("/ownerHome");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBarOwner />
      <div className="flex flex-grow h-screen">
        <div className="bg-[#29235c] w-1/2 flex-col flex justify-center items-center">
          <h3
            className="text-5xl text-white  mb-5"
            style={{ fontFamily: "LikeEat" }}
          >
            Leave a Review to{" "}
          </h3>
          <div>
            <h3
              className="text-[#F39200] text-5xl"
              style={{ fontFamily: "LikeEat" }}
            >
              {walkData?.walker.name}
            </h3>
          </div>

          <div className="mt-10 mb-10">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`cursor-pointer text-3xl ${
                    value <= userReview.score
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleScoreChange(value)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-2xl"
              style={{ fontFamily: "LikeEat" }}
            >
              Comment
            </label>
            <textarea
              value={userReview.description}
              onChange={handleDescriptionChange}
              className={`p-4 rounded border border-gray-300 resize-none ${
                error ? "border-red-500" : ""
              }`}
              style={{ height: "100px", width: "500px" }}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            onClick={submitReview}
            className="w-30 px-5 py-2 rounded-full bg-[#F39200] font-bold transition transition-colors duration-300 hover:text-[#29235c] text-white"
          >
            submit Review
          </button>
        </div>
        <div className="w-1/2 bg-[#E4E2ED] flex flex-col justify-center items-center">
          <div className="mt-12">
            <Image
              src={walkerImage}
              width={400}
              height={0}
              className="mt-5 rounded-full border-[5px] border-[#29235c] border-solid"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerReviewForm;
