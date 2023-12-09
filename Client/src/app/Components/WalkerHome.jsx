"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DogWalkOption from "../Components/DogWalkOption";
import Reviews from "../Components/Reviews";
import "tailwindcss/tailwind.css";
import Map from "../Components/Map";
import jwt from 'jsonwebtoken';

const WalkerHome = () => {
  const [comments, setComments] = useState([]);
  const [clientHiring, setClientHiring] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [user, setUser] = useState("");
  const [dogCapacityFilter, setDogCapacityFilter] = useState('');
  const [walkDurationFilter, setWalkDurationFilter] = useState('');
  const [optionChosen, setOptionChosen] = useState([]);
  const [userProvince, setUserProvince] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [isFilterResetVisible, setFilterResetVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = jwt.decode(token);
        console.log(decodedToken.userId);
        try {
          const response = await fetch(`http://localhost:3001/users/${decodedToken.userId}`);
          const data = await response.json();
          setUser(data);
          setUserProvince(data.province);
          setUserAddress(data.address);
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
        const response = await fetch(`http://localhost:3001/walkType`);
        const data = await response.json();
        setPriceList(data.walkTypeData);
      } catch (error) {
        console.error("Error fetching walker types:", error);
      }
    };
    fetchWalkerTypes();
  }, []);

  const handleFilterReset = () => {
    setDogCapacityFilter('');
    setWalkDurationFilter('');
    setFilterResetVisible(false);
  };
  const handleDogCapacityFilterChange = (event) => {
    setDogCapacityFilter(event.target.value);
    setFilterResetVisible(true);
  };

  const handleWalkDurationFilterChange = (event) => {
    setWalkDurationFilter(event.target.value);
    setFilterResetVisible(true);
  };

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

  const renderList = priceList
    .filter((card) => {
      const dogCapacityFilterCondition =
        !dogCapacityFilter ||
        (dogCapacityFilter === "low" && card.dog_capacity === "low") ||
        (dogCapacityFilter === "medium" && card.dog_capacity === "medium") ||
        (dogCapacityFilter === "high" && card.dog_capacity === "high");

      const walkDurationFilterCondition =
        !walkDurationFilter ||
        (walkDurationFilter === "15" && card.walk_duration.includes("15")) ||
        (walkDurationFilter === "30" && card.walk_duration.includes("30")) ||
        (walkDurationFilter === "60" && card.walk_duration.includes("60"));

      return dogCapacityFilterCondition && walkDurationFilterCondition;
    })
    .map((card) => (
      <DogWalkOption
        key={card.id}
        option={card}
        onClick={() => handleOptionClick(card)}
        selected={optionChosen.some((selectedCard) => selectedCard.id === card.id)}
      />
    ));

  const handleRespondComment = (index, response) => {
    const updatedComments = [...comments];
    updatedComments[index].response = response;
    setComments(updatedComments);
  };

  const handleActiveClick = async () => {
    try {
      if (user.id) {
        await axios.put(`http://localhost:3001/walker/${user.id}`, {
          is_available: true,
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleChooseOptions = async () => {
    try {
      const response = await axios.put('http://your-url', optionChosen);
      console.log('Response from the PUT request:', response.data);
    } catch (error) {
      console.error('Error making PUT request:', error);
    }
  };

  const testFunction = () => {
    toast.success(`¡${clientHiring.join(', ')} have hired your service! (Test)`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  console.log("optionChosen", optionChosen);

  return (
    <div className="text-center m-20">
      <ToastContainer />
      <Map userProvince={userProvince} userAddress={userAddress} />

      <button onClick={testFunction} className="bg-black text-white px-4 py-2">
        Test for when a walk request arrives
      </button>
      <br />
      <select
        value={walkDurationFilter}
        onChange={handleWalkDurationFilterChange}
        className="border p-2 rounded mr-2"
      >
        <option value="">Filter by Time</option>
        <option value="15">15 minutes</option>
        <option value="30">30 minutes</option>
        <option value="60">60 minutes</option>
      </select>
      <br />
      {walkDurationFilter && (
        <select
          value={dogCapacityFilter}
          onChange={handleDogCapacityFilterChange}
          className="border p-2 rounded mr-2"
        >
          <option value="">Filter by dog capacity</option>
          <option value="low">1</option>
          <option value="medium">2</option>
          <option value="medium">3</option>
          <option value="medium">4</option>
          <option value="high">5</option>
          <option value="high">6 or more</option>
        </select>
      )}
      <br />
      {isFilterResetVisible && (
        <button onClick={handleFilterReset} className="bg-gray-500 text-white px-4 py-2 mt-2">
          Filter Reset
        </button>
      )}
      
      <div>{renderList}</div>
      <div>
        <h2>Selected Options</h2>
        {optionChosen.length > 0 ? (
          <ul>
            {optionChosen.map((selectedOption) => (
              <li key={selectedOption.id}>
                {selectedOption.title} - {selectedOption.walk_duration} minutes
              </li>
            ))}
          </ul>
        ) : (
          <p>No options selected</p>
        )}
        <button onClick={handleChooseOptions}>Choose options</button>
      </div>
      <button
        onClick={handleActiveClick}
        disabled={renderList.length === 0}
        className={`bg-black text-white px-4 py-2 ${
          optionChosen && optionChosen.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Active
      </button>
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
      <Reviews />
    </div>
  );
};

export default WalkerHome;
