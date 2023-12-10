"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WalkerHome from "../Components/WalkerHome";
import jwt from 'jsonwebtoken';

const HomeWalker = () => {
  const [walkerPass, setWalkerPass] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = jwt.decode(token);

        try {
          const API = process.env.NEXT_PUBLIC_APIURL;
          const response = await axios.get(`${API}/walker/${decodedToken}`);
          const data = response.data;
          setWalkerPass(data?.walkerData?.isWalker || false);
        } catch (error) {
          console.error('Error fetching data from the server', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {walkerPass ? <WalkerHome /> : <p>You are not a walker.</p>}
    </div>
  );
};

export default HomeWalker;
