"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewsCards from './ReviewsCards';

const Reviews = () => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            userName: 'User1',
            rating: 4,
            comment: 'I loved the product! Would definitely recommend.',
          },
          {
            id: 2,
            userName: 'User2',
            rating: 5,
            comment: 'Incredible customer service and fast delivery.',
          },
          {
            id: 3,
            userName: 'User3',
            rating: 3,
            comment: 'Good product, but the delivery was a bit slow.',
          },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Update 'YOUR_API_ROUTE' with your actual API route
                const response = await axios.get('YOUR_API_ROUTE');
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        // Uncomment the line below to fetch data from the API
        // fetchData();
    }, []);

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h2>Reviews List</h2>
            <ReviewsCards reviews={currentReviews} />
            <div style={{ marginTop: '20px' }}>
                {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
