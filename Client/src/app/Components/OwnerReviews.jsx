"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from "jsonwebtoken";

const ReviewForm = ({ onReviewSubmit, id }) => {
  const [userReview, setUserReview] = useState({
    score: 1,
    description: ""
  });
  const [walkData, setWalkData] = useState(null); 
  const walkId = id.id;

  useEffect(() => {
    const fetchWalkData = async () => {
      const token = localStorage.getItem('token');
  
      if (token) {
        try {
          const decodedToken = jwt.decode(token);
          const API = process.env.NEXT_PUBLIC_APIURL;
          const walkUrl = `${API}/walk`;
          const response = await axios.get(walkUrl);
  
          // Filtrar el array para obtener solo el objeto con el ID correspondiente
          const matchingWalk = response.data.allWalks.find(walk => walk.id === walkId);
          console.log(matchingWalk)
          if (matchingWalk) {
            setWalkData(matchingWalk);
          } else {
            console.warn(`No se encontró ninguna caminata con el ID ${walkId}`);
          }
        } catch (error) {
          console.error('Error fetching walk data:', error);
        }
      }
    };
  
    fetchWalkData();
  }, [walkId]);

  const handleScoreChange = (newScore) => {
    setUserReview({ ...userReview, score: newScore });
  };

  const handleDescriptionChange = (event) => {
    setUserReview({ ...userReview, description: event.target.value });
  };

  const submitReview = async () => {
    try {
      const API = process.env.NEXT_PUBLIC_APIURL;
      const reviewUrl = `${API}/review`;
      const reviewData = {
        idWalk: walkId,
        type: 'walker',
        score: userReview.score,
        description: userReview.description
      };
      console.log(reviewData);
      const response = await axios.post(reviewUrl, reviewData);
      setUserReview({
        score: 1,
        description: ""
      });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Leave a Review from {walkData?.walker.name}</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>Score:</label>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              style={{
                cursor: 'pointer',
                fontSize: '24px',
                color: value <= userReview.score ? 'gold' : 'gray'
              }}
              onClick={() => handleScoreChange(value)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Comment:</label>
        <textarea
          value={userReview.description}
          onChange={handleDescriptionChange}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'none'
          }}
        />
      </div>
      <button onClick={submitReview} style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
        Submit Review
      </button>
    </div>
  );
};

export default ReviewForm;
