"use client";

import React from 'react';

const ReviewsCards = ({ reviews }) => {
    return (
        <ul style={{ listStyle: 'none', padding: 0, border: '2px solid #333', borderRadius: '8px' }}>
            {reviews.map((review) => (
                <li key={review.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                    <strong>{review.userName}</strong>
                    <p>Rating: {review.rating}</p>
                    <p>{review.comment}</p>
                </li>
            ))}
        </ul>
    );
};

export default ReviewsCards;

