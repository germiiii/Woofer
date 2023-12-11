"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DogWalkOption from "../Components/DogWalkOption";
import Reviews from "../Components/Reviews";
import "tailwindcss/tailwind.css";
import Map from "../Components/Map";
import jwt from 'jsonwebtoken';
import { useRouter } from "next/navigation";

const WalkerHome = () => {
  const [comments, setComments] = useState([]);
  const [clientHiring, setClientHiring] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [user, setUser] = useState("");
  const [userWalker, setUserWalker] = useState({});
  const [optionChosen, setOptionChosen] = useState([]);
  const [userProvince, setUserProvince] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userId, setUserId] = useState('');
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = jwt.decode(token);
        console.log(decodedToken.userId);

        try {
          const API = process.env.NEXT_PUBLIC_APIURL;
          const response = await axios.get(`${API}/users/${decodedToken.userId}`);
          setUser(response.data);
          setUserProvince(response.data.province);
          setUserAddress(response.data.address);
          setUserId(decodedToken.userId);
          console.log(decodedToken.userId);
        } catch (error) {
          console.error('Error fetching data from the server', error);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchWalkerTypes = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_APIURL;
        const response = await axios.get(`${API}/walkType`);
        setPriceList(response.data.walkTypeData);
      } catch (error) {
        console.error("Error fetching walker types:", error);
      }
    };
    fetchWalkerTypes();
  }, []);

  useEffect(() => {
    const fetchWalkerData = async () => {
      const token = localStorage.getItem('token');
  
      if (token) {
        const decodedToken = jwt.decode(token);
  
        try {
          const API = process.env.NEXT_PUBLIC_APIURL;
          const response = await axios.get(`${API}/walker/${decodedToken.userId}`);
          setUserWalker(response.data);
        } catch (error) {
          console.error('Error fetching walker data from the server', error);
        }
      }
    };
    fetchWalkerData();
  }, []);
  

  const handleOptionClick = (card) => {
    const updatedOptions = [...optionChosen];

    const index = updatedOptions.findIndex((selectedCard) => selectedCard.id === card.id);
    if (index !== -1) {
      updatedOptions.splice(index, 1);
    } else {
      updatedOptions.push(card);
    }
    setOptionChosen(updatedOptions);
  };

  const renderList = userWalker?.walkerData?.walker?.walkTypes?.map((walkerType) => {
  const matchedCard = priceList.find((card) => card.id === walkerType.id);
  
    return (
      <DogWalkOption
        key={matchedCard?.id}
        option={matchedCard}
        onClick={() => handleOptionClick(matchedCard)}
        selected={optionChosen.some((selectedCard) => selectedCard.id === matchedCard.id)}
      />
    );
  });

  const handleRespondComment = (index, response) => {
    const updatedComments = [...comments];
    updatedComments[index].response = response;
    setComments(updatedComments);
  };

  const handleActiveClick = async () => {
    try {
      if (user.id) {
        const API = process.env.NEXT_PUBLIC_APIURL;
        await axios.put(`${API}/walker/${user.id}`, {
          is_available: true,
        });
      }
      alert('You are ready for a walk a dog! Enjoy!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const testFunction = () => {
    toast.success(`¡${clientHiring.join(', ')} have hired your service! (Test)`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className="text-center m-20">
      <ToastContainer />
      <Map userProvince={userProvince} userAddress={userAddress} />

      <button onClick={testFunction} className="bg-black text-white px-4 py-2">
        Test for when a walk request arrives
      </button>
      <br />
      <div>{renderList}</div>
      <div>
        <h2>Sale Details</h2>
        <p>{userWalker?.walkerData?.walker?.sale_details}</p>
      </div>
      <button
        onClick={handleActiveClick}
        className="bg-black text-white px-4 py-2"
      >
        Active
      </button>
      <br />
      <button onClick= {() => router.push('/walkerHome/TestWalkerRegister')} className="bg-black text-white px-4 py-2">Chage your sell details</button>
      <div>
        <h2>Client Comments</h2>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
            {comment.response && <p>Response: {comment.response}</p>}
            {!comment.response && (
              <input
                type="text"
                placeholder="Respond..."
                value={comment.response || ''}
                onChange={(e) => handleRespondComment(index, e.target.value)}
                className="border p-2 rounded"
              />
            )}
          </div>
        ))}
      </div>
      <Reviews userId={userId} />
    </div>
  );
};

export default WalkerHome;
