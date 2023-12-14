"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewsCards from "./ReviewsCards";

let idCounter = 1;

const Reviews = ({ userId }) => {
  const [walkerReviews, setWalkerReviews] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const API = process.env.NEXT_PUBLIC_APIURL;
          const response = await axios.get(`${API}/review/${userId}`);
          setWalkerReviews(response.data.reviews);

          // Actualiza reviewData con la información necesaria
          const accumulatedData = response.data.reviews.reduce(
            (accumulated, review) => {
              const walkerReview = review.walkerReviews[0]?.walker?.walks;

              walkerReview.forEach((walk) => {
                walk.reviews.forEach((walkReview) => {
                  accumulated.push({
                    id: idCounter++,
                    score: walkReview.score,
                    description: walkReview.description,
                  });
                });
              });
              return accumulated;
            },
            []
          );

          setReviewData(accumulatedData);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchData();
  }, [userId]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviewData.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center justify-center h-[550px]">
      <ReviewsCards reviewData={currentReviews} />
      <div style={{ marginTop: "20px" }}>
        {Array.from({
          length: Math.ceil(reviewData.length / reviewsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mr-2 cursor-pointer font-bold ${
              index + 1 === currentPage ? "text-[#29235c]" : "text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
