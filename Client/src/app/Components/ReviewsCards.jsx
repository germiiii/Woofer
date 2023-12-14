"use client";

import React from "react";

const ReviewsCards = ({ reviewData }) => {
  if (reviewData.length === 0) {
    return <p className="text-[#29235c] text-2xl">No reviews yet</p>;
  }

  return (
    <ul className="mt-20">
      {reviewData.map((review) => (
        <li
          key={review.id}
          className="h-[150px] rounded-md mt-5 mb-5 flex flex-col items-center  bg-[#29235c]"
        >
          <h1 className="mt-5 mb-2 text-2xl text-[#F39200] font-bold">
            Rating: {review.score}/5
          </h1>
          <h2 className="ml-10 mr-10 text-[#F39200]">"{review.description}"</h2>
        </li>
      ))}
    </ul>
  );
};

export default ReviewsCards;
