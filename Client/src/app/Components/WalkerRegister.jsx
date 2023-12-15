"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

const WalkerRegister = () => {
  const [priceList, setPriceList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [saleDetails, setSaleDetails] = useState("");
  const [walkDurationFilter, setWalkDurationFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [dogCapacityFilter, setDogCapacityFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [formSubmissionError, setFormSubmissionError] = useState(null);
  const [walkerData, setWalkerData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_APIURL;
        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token);
        const response = await axios.get(
          `${API}/walker/${decodedToken.userId}`
        );
        console.log(decodedToken.userId);
        console.log(response.data.walkerData);
        setWalkerData(response.data.walkerData);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    };

    fetchData();
  }, []);
  console.log("is_walker", walkerData.isWalker);

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
  const router = useRouter();
  const handleCheckboxChange = (option) => {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleCardClick = (option) => {
    handleCheckboxChange(option);
  };

  const isSelected = (option) => selectedOptions.includes(option);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (walkerData.isWalker) {
      try {
        if (selectedOptions.length === 0) {
          alert("Please select at least one option.");
          return;
        }

        const API = process.env.NEXT_PUBLIC_APIURL;
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const decodedToken = jwt.decode(token);
        const walkerId = decodedToken.userId;
        const dogCapacityOptions = selectedOptions.map(
          (option) => option.dog_capacity
        );

        let dogCapacity;

        if (dogCapacityOptions.includes("high")) {
          dogCapacity = "5";
        } else if (dogCapacityOptions.includes("medium")) {
          dogCapacity = "3";
        } else if (dogCapacityOptions.includes("low")) {
          dogCapacity = "1";
        } else {
          dogCapacity = "1";
        }

        const walkDurations = Array.from(
          new Set(selectedOptions.flatMap((option) => option.walk_duration))
        );

        const requestBody = {
          dog_capacity: dogCapacity,
          walk_duration: walkDurations,
          sale_details: saleDetails,
          walkTypes: selectedOptions.map((option) => option.id),
        };

        const response = await axios.put(
          `${API}/walker/${walkerId}`,
          requestBody
        );
        window.alert("Information submitted successfully");
        return;
      } catch (error) {
        setFormSubmissionError("Error submitting the form");
        console.error("Error submitting form:", error);
      }
    }
    try {
      if (selectedOptions.length === 0) {
        alert("Please select at least one option.");
        return;
      }

      const API = process.env.NEXT_PUBLIC_APIURL;
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const decodedToken = jwt.decode(token);
      const walkerId = decodedToken.userId;
      const dogCapacityOptions = selectedOptions.map(
        (option) => option.dog_capacity
      );

      let dogCapacity;

      if (dogCapacityOptions.includes("high")) {
        dogCapacity = "5";
      } else if (dogCapacityOptions.includes("medium")) {
        dogCapacity = "3";
      } else if (dogCapacityOptions.includes("low")) {
        dogCapacity = "1";
      } else {
        dogCapacity = "1";
      }

      const walkDurations = Array.from(
        new Set(selectedOptions.flatMap((option) => option.walk_duration))
      );

      const requestBody = {
        id: walkerId,
        dog_capacity: dogCapacity,
        dog_size: null,
        walk_duration: walkDurations,
        sale_details: saleDetails,
        is_available: "false",
        walkTypes: selectedOptions.map((option) => option.id),
      };

      const response = await axios.post(`${API}/walker`, requestBody);

      localStorage.setItem("isWalker", "true");
      router.push("/walkerHome");
    } catch (error) {
      setFormSubmissionError("Error submitting the form");
      console.error("Error submitting form:", error);
    }
  };
  const handleWalkDurationFilterChange = (event) => {
    setWalkDurationFilter(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleDogCapacityFilterChange = (event) => {
    setDogCapacityFilter(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };
  const handleRefreshFilters = () => {
    setWalkDurationFilter(null);
    setPriceFilter(null);
    setDogCapacityFilter(null);
    setTypeFilter(null);
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <h1
          className="mt-10 mb-5 text-5xl text-[#29235c]"
          style={{ fontFamily: "LikeEat" }}
        >
          Select walk types
        </h1>

        {/* Filtros */}
        <div className="mb-3">
          <select
            value={walkDurationFilter}
            onChange={handleWalkDurationFilterChange}
            className="mx-2"
          >
            <option value="">Walk Duration</option>
            {[...new Set(priceList.map((option) => option.walk_duration))].map(
              (walkDuration) => (
                <option key={walkDuration} value={walkDuration}>
                  {walkDuration} minutes
                </option>
              )
            )}
          </select>
          <select
            value={priceFilter}
            onChange={handlePriceFilterChange}
            className="mx-2"
          >
            <option value="">Price</option>
            {[...new Set(priceList.map((option) => option.price))]
              .filter((price) => price !== "1.00") // Excluye el valor "1.00"
              .map((filteredPrice) => (
                <option key={filteredPrice} value={filteredPrice}>
                  ${filteredPrice}
                </option>
              ))}
          </select>
          <select
            value={dogCapacityFilter}
            onChange={handleDogCapacityFilterChange}
            className="mx-2"
          >
            <option value="">Dog Capacity</option>
            {[...new Set(priceList.map((option) => option.dog_capacity))].map(
              (dogCapacity) => (
                <option key={dogCapacity} value={dogCapacity}>
                  {dogCapacity}
                </option>
              )
            )}
          </select>
          <select
            value={typeFilter}
            onChange={handleTypeFilterChange}
            className="mx-2"
          >
            <option value="">Type</option>
            {[...new Set(priceList.map((option) => option.walk_type))].map(
              (walkType) => (
                <option key={walkType} value={walkType}>
                  {walkType}
                </option>
              )
            )}
          </select>
          <button type="button" onClick={handleRefreshFilters} className="mx-2">
            Refresh
          </button>
        </div>

        <div>
          {priceList
            .filter(
              (option) =>
                (!walkDurationFilter ||
                  option.walk_duration === walkDurationFilter) &&
                (!priceFilter || option.price === priceFilter) &&
                (!dogCapacityFilter ||
                  option.dog_capacity === dogCapacityFilter) &&
                (!typeFilter || option.walk_type === typeFilter)
            )
            .map(
              (option) =>
                // Agrega la condición para evitar renderizar la card con price="1.00"
                option.price !== "1.00" && (
                  <div
                    key={option.id}
                    className={`card ${
                      isSelected(option) ? "selected-card" : ""
                    }`}
                    onClick={() => handleCardClick(option)}
                  >
                    <input
                      type="checkbox"
                      id={option.id}
                      value={option.title}
                      checked={isSelected(option)}
                      onChange={() => handleCheckboxChange(option)}
                      style={{ display: "none" }}
                    />
                    {option.title} - Price: {option.price}, Walk Duration:{" "}
                    {option.walk_duration}, Walk Type: {option.walk_type}, Dog
                    Capacity: {option.dog_capacity}
                  </div>
                )
            )}
        </div>

        <div className="mt-5 flex flex-col items-center justify-center">
          <input
            placeholder="say something about yourself..."
            type="text"
            id="saleDetails"
            value={saleDetails}
            onChange={(e) => setSaleDetails(e.target.value)}
            maxLength={100}
            className="border rounded-md border-black border-5 p-9 mt-1 w-1/2 break-all"
          />
          <p className="mb-3 mt-3">{saleDetails.length} / 100 characters</p>
          <button
            type="submit"
            className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] text-white mt-3 lg:mt-0 mr-7 transition transition-colors duration-300`}
          >
            submit
          </button>
        </div>
      </form>

      {formSubmissionError && (
        <p style={{ color: "red" }}>{formSubmissionError}</p>
      )}

      <style jsx>{`
        .card {
          border: 1px solid #ccc;
          border-radius: 8px;
          margin: 5px;
          padding: 10px;
          display: block;
          cursor: pointer;
        }

        .selected-card {
          background-color: #29235c;
          color: #f39200;
        }
      `}</style>
    </div>
  );
};

export default WalkerRegister;
