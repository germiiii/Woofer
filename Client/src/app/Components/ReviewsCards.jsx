"use client";

import React from 'react';

const ReviewsCards = ({ reviewData }) => {
    if (reviewData.length === 0) {
        return <p>No reviews yet.</p>;
    }

    return (
        <ul style={{ listStyle: 'none', padding: 0, border: '2px solid #333', borderRadius: '8px' }}>
            {reviewData.map((review) => (
                <li key={review.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                    <p>Rating: {review.score}</p>
                    <p>{review.description}</p>
                </li>
            ))}
        </ul>
    );
};

export default ReviewsCards;
