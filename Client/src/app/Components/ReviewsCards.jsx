"use client";

import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewsCards = ({ reviewData }) => {
  if (reviewData.length === 0) {
    return <p className="text-[#29235c] text-2xl">No reviews yet</p>;
  }

  const [walkerDetails, setWalkerDetails] = useState(null);
  const [walkerId, setWalkerId] = useState("");
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
  walkerDetails?.walker?.reviewsData?.map((review) => review.score) || [];
const medianScore = calculateMedian(scores);
const starsForMedian = renderStarsFromMedian(medianScore);
//!Stars for individual reviews
const renderStars = (score) => {
  const totalStars = 5;
  const fullStars = Math.floor(score);
  const halfStars = Math.ceil(score - fullStars);

  const starArray = [];

  // Render full stars
  for (let i = 0; i < fullStars; i++) {
    starArray.push(
      <FontAwesomeIcon key={i} icon={faStar} style={{ color: "#F39200" }} />
    );
  }

  // Render half star if applicable
  if (halfStars === 1) {
    starArray.push(
      <FontAwesomeIcon
        key={starArray.length}
        icon={faStar}
        style={{ color: "#F39200" }}
      />
    );
  }

  // Render empty stars
  const emptyStars = totalStars - (fullStars + halfStars);
  for (let i = 0; i < emptyStars; i++) {
    starArray.push(
      <FontAwesomeIcon
        key={starArray.length}
        icon={faStar}
        style={{ color: "#FFF" }}
      />
    );
  }

  console.log(score);
  return starArray;
};
      
      return (
        <ul className="mt-20">
    {reviewData.map((review) => (
      <li
      key={review.id}
      className="h-[200px] w-[500px] rounded-md mt-5 mb-5 flex flex-col items-center  bg-[#29235c] hover:shadow-lg"
      >
        <h1 className="mt-5 mb-2 text-2xl text-[#F39200] font-bold">
          <div>
          {renderStars(review.score)}
          </div>
        </h1>
        <h2 className="ml-10 mr-10 text-white">&quot;{review.description}&quot;</h2>
      </li>
    ))}
  </ul>
);
};

export default ReviewsCards;
