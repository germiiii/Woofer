"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewsCards from './ReviewsCards';

let idCounter = 1;  // Cambia const por let

const Reviews = ({ userId }) => {
    const [walkerReviews, setWalkerReviews] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`http://localhost:3001/review/742b7054-549a-463d-b7f8-d122b7939a6b`);
                    setWalkerReviews(response.data.reviews);

                    // Mapea a través de las revisiones y extrae las propiedades "score" y "description"
                    const acum = response.data.reviews.reduce((accumulated, review) => {
                        const walkerReview = review.walkerReviews[0].walker.walks;
                        walkerReview.forEach(walk => {
                            walk.reviews.forEach(walkReview => {
                                accumulated.push({
                                    id: idCounter++,  // Asigna un ID único y aumenta el contador
                                    score: walkReview.score,
                                    description: walkReview.description
                                });
                            });
                        });
                    return accumulated;
                    }, []);

                    // Setea el array acumulado en el estado de reviewData
                    setReviewData(acum);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchData();
    }, [userId]);
    // Lógica de paginación
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviewData.slice(indexOfFirstReview, indexOfLastReview);
    console.log(currentReviews);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h2>Reviews List</h2>
            <ReviewsCards reviewData={currentReviews} />
            <div style={{ marginTop: '20px' }}>
                {Array.from({ length: Math.ceil(reviewData.length / reviewsPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
