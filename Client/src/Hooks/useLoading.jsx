"use client"
import { useState } from 'react';

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const finishLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    startLoading,
    finishLoading,
  };
}
