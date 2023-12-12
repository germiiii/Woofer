"use client";
import axios from "axios";
import React from "react";
import { useState, useRef, useEffect } from "react";
import jwt from "jsonwebtoken";
import Image from "next/image";

export default function OwnerForm() {
  const api = process.env.NEXT_PUBLIC_APIURL;
  const fileInputRef = useRef(null);
  const [dogData, setDogData] = useState({
    name: "",
    age: "",
    breed: "",
    size: "",
    image: null,
  });

  const [listOfDogs, setListOfDogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to get user information
      const decodedToken = jwt.decode(token);
      setUser(decodedToken.userId);
    }
  }, []); // Run this effect only once on component mount
  console.log("user", user);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Validation
    switch (name) {
      case "name":
        if (/^[a-zA-Z0-9 ]{0,20}$/.test(value)) {
          setDogData((prevDogData) => ({ ...prevDogData, [name]: value }));
        }
        break;
      case "age":
        if (/^\d{0,2}$/.test(value) && parseInt(value, 10) <= 25) {
          setDogData((prevDogData) => ({ ...prevDogData, [name]: value }));
        }
        break;
      case "breed":
        if (/^[a-zA-Z0-9 ]{0,20}$/.test(value)) {
          setDogData((prevDogData) => ({ ...prevDogData, [name]: value }));
        }
        break;
      case "image":
        // Additional check for file size and format
        const file = e.target.files[0];
        const allowedFormats = ["image/jpeg", "image/png"];
        if (allowedFormats.includes(file.type)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setDogData((prevDogData) => ({
              ...prevDogData,
              [name]: reader.result,
            }));
          };
          reader.readAsDataURL(file);
        } else {
          e.target.value = null;
          alert("Only JPG and PNG formats are allowed.");
        }

        break;
      default:
        setDogData((prevDogData) => ({ ...prevDogData, [name]: value }));
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the form is completed
      if (
        dogData.name &&
        dogData.age &&
        dogData.breed &&
        dogData.size &&
        dogData.image
      ) {
        // Create an array of dogs with the current dog data
        const currentDog = {
          userID: user,
          name: dogData.name,
          age: dogData.age,
          breed: dogData.breed,
          size: dogData.size,
          image: dogData.image,
        };

        // Send the data to the server using Axios
        console.log("current dog", currentDog);

        const response = await axios.post(`${api}/owner`, {
          userID: user,
          name: currentDog.name,
          size: currentDog.size,
          age: currentDog.age,
          breed: currentDog.breed,
          image: currentDog.image,
        });
        localStorage.setItem("isOwner", response.data.UserWithNewOwner.isOwner);
        localStorage.setItem("Owner ID", response.data.UserWithNewOwner.id);
        localStorage.setItem('Dog Count', response.data.UserWithNewOwner.owner.dog_count)
        console.log("Server response:", response.data);
        window.alert("Dog added successfully");

        // Additional logic for handling the form submission, if needed
      } else {
        console.error("Please complete the form before submitting.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
  };

  const handleAddDog = (e) => {
    e.preventDefault();
    setDogData({ name: "", age: "", breed: "", size: "", image: null });
    setListOfDogs((prevListOfDogs) => [...prevListOfDogs, dogData]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFillFormAgain = (e) => {
    e.preventDefault();
    setDogData({ name: "", age: "", breed: "", size: "", image: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderDogs = listOfDogs.map((dog, index) => (
    <div key={index}>
      <h2>{dog.name}</h2>
      {dog.image && (
        <Image
          src={dog.image}
          alt={`Dog Preview ${index}`}
          height={100}
          width={100}
        />
      )}
    </div>
  ));

  return (
    <div className="h-screen">
      <div className="flex justify-center mt-20 ">
        <div className="bg-white shadow-md rounded-md p-8 w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-8">Add your dogs!</h1>
            <div className="mb-4">
              <label htmlFor="name" className="text-lg block mb-2">
                Name of your dog
              </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={dogData.name}
                className="w-full p-3 rounded-md border border-gray-300 focus:border-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="text-lg block mb-2">
                Age of your dog
              </label>
              <input
                id="age"
                type="text"
                name="age"
                onChange={handleChange}
                value={dogData.age}
                className="w-full p-3 rounded-md border border-gray-300 focus:border-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="breed" className="text-lg block mb-2">
                Breed of your dog
              </label>
              <input
                id="breed"
                type="text"
                name="breed"
                onChange={handleChange}
                value={dogData.breed}
                className="w-full p-3 rounded-md border border-gray-300 focus:border-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="size" className="text-lg block mb-2">
                Size of your dog
              </label>
              <select
                id="size"
                name="size"
                onChange={handleChange}
                value={dogData.size}
                className="w-full p-3 rounded-md border border-gray-300 focus:border-black"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="text-lg block mb-2">
                Image of your dog (Max 15MB)
              </label>
              <input
                id="image"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                ref={fileInputRef}
                className="w-full p-3 rounded-md border border-gray-300 focus:border-black"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleFillFormAgain}
                className="mr-4 p-3 rounded-md bg-black text-white cursor-pointer"
              >
                Clean
              </button>
              {/* Conditionally render the submit button */}
              {dogData.name &&
              dogData.age &&
              dogData.breed &&
              dogData.size &&
              dogData.image ? (
                <button
                  type="submit"
                  className="p-3 rounded-md bg-black text-white cursor-pointer"
                >
                  Submit
                </button>
              ) : null}
            </div>
            {renderDogs}
          </form>
        </div>
      </div>
    </div>
  );
}
