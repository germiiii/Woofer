"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

const WalkerRegister = () => {
  const [priceList, setPriceList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [saleDetails, setSaleDetails] = useState("");
  const [formSubmissionError, setFormSubmissionError] = useState(null);

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

    try {
      // Validar que al menos una opción esté seleccionada
      if (selectedOptions.length === 0) {
        setFormSubmissionError("Please select at least one walk type.");

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
      console.log(requestBody);
      const response = await axios.post(`${API}/walker`, requestBody);
      console.log("Form submitted successfully:", response.data);
      router.push("/walkerHome");
    } catch (error) {
      setFormSubmissionError("Error submitting the form");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <div
        style={{
          display: "inline-block",
          textAlign: "left",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h2>Walker Registration</h2>
          <label>Select walk types:</label>
          {priceList.map((option) => (
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
          ))}
          <div>
            <h3>Offer Details</h3>
            <label htmlFor="saleDetails">Maximum 100 characters:</label>
            <textarea
              id="saleDetails"
              value={saleDetails}
              onChange={(e) => setSaleDetails(e.target.value)}
              maxLength={100}
              style={{
                width: "100%",
                padding: "8px",
                height: "calc(8 * 16px)", // Ajusta el valor según tus necesidades
                marginBottom: "16px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                resize: "none", // Desactiva la capacidad de redimensionar
                fontSize: "1,5em", // Duplica el tamaño de la letra
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "black",
              color: "#fff",
              cursor: "pointer",
              marginRight: "8px",
            }}
          >
            Submit
          </button>
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
            background-color: gray;
          }
        `}</style>
      </div>
    </div>
  );
};

export default WalkerRegister;
