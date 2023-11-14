"use client"
import React, { useState, useEffect } from 'react';

const ViewersSection = () => {
  const [viewingCount, setViewingCount] = useState(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      // Retrieve the count from localStorage on component mount
      const storedCount = localStorage.getItem('viewingCount');
      return parseInt(storedCount) || 0;
    } else {
      // Fallback if localStorage is not available (e.g., during SSR)
      return 0;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('viewingCount', viewingCount.toString());
      setViewingCount((prevCount) => prevCount + 1);
    }
  }, [viewingCount]);
  

  // Dynamic import for client-side rendering
  const AnimatedNumber = React.lazy(() => import('react-animated-numbers'));

  return (
    <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
      <React.Suspense fallback={<div>Loading...</div>}>
        <AnimatedNumber
          value={viewingCount}
          formatValue={(value) => value.toFixed(0)}
          animate
        />
      </React.Suspense>
      <h2 className='text-white text-4xl font-bold flex flex-col items-center justify-center mx-4 my-4 sm:my-0'>Views</h2>
    </div>
  );
};

export default ViewersSection;
