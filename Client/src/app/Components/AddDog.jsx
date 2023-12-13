import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import jwt from "jsonwebtoken";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const [imagePreview, setImagePreview] = useState(null);
  const [buttonText, setButtonText] = useState(
    "select your dog picture (max 10MB)"
  );

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
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Validation
    switch (name) {
      case "size":
        setDogData((prevDogData) => ({ ...prevDogData, [name]: value }));
        break;
      case "name":
        if (/^[a-zA-Z0-9 ]{0,20}$/.test(value)) {
          setDogData((prevDogData) => ({ ...prevDogData, [name]: value }));
        }
        break;
      case "age":
        if (
          value === "" ||
          (/^\d{0,2}$/.test(value) &&
            parseInt(value, 10) >= 0 &&
            parseInt(value, 10) <= 25)
        ) {
          setDogData((prevDogData) => ({ ...prevDogData, [name]: value }));
        }
        break;

      case "breed":
        if (/^[a-zA-Z0-9 ]{0,20}$/.test(value)) {
          setDogData((prevDogData) => ({ ...prevDogData, [name]: value }));
        }
        break;
      case "image":
        const file = e.target.files[0];
        if (file) {
          if (file.size <= 10 * 1024 * 1024) {
            // Valid file size, proceed with handling the file
            const allowedFormats = ["image/jpeg", "image/png"];
            if (allowedFormats.includes(file.type)) {
              const reader = new FileReader();
              reader.onloadend = async () => {
                // Compress the image
                const compressedImage = await compressImage(reader.result);

                setDogData((prevDogData) => ({
                  ...prevDogData,
                  [name]: file, // Update this line
                }));

                // Set the image preview
                setImagePreview(compressedImage);
              };
              reader.readAsDataURL(file);
            } else {
              e.target.value = null;
              alert("Only JPG and PNG formats are allowed.");
              setButtonText("select your dog picture");
            }
          } else {
            // File size exceeds the limit, show alert and clear the input
            e.target.value = null;
            alert("Please select an image file smaller than 10MB.");
            setButtonText("select your dog picture");
          }
        } else {
          // No image selected, clear the existing image in dogData and preview
          setDogData((prevDogData) => ({ ...prevDogData, [name]: null }));
          setImagePreview(null);
          setButtonText("select your dog picture");
        }
        break;
    }
  };
  const compressImage = async (imageDataUrl) => {
    // Check if the code is running in a browser environment
    if (typeof window !== "undefined") {
      // Create an offscreen image element
      const img = document.createElement("img");

      // Set the source of the image
      img.src = imageDataUrl;

      // Wait for the image to load
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Create a canvas element to draw the compressed image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set the canvas dimensions to the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas with reduced quality (e.g., 0.7)
      ctx.drawImage(img, 0, 0, img.width, img.height);
      return canvas.toDataURL("image/jpeg", 0.1);
    } else {
      // Handle the case where the code is running in a non-browser environment
      console.error(
        "compressImage function is running in a non-browser environment."
      );
      return imageDataUrl;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form data before validation:", dogData);

      // Check if the form is completed
      if (dogData.name && dogData.age && dogData.breed && dogData.size) {
        // Create FormData and append dog data
        const formData = new FormData();
        formData.append("userID", user);
        formData.append("name", dogData.name);
        formData.append("age", dogData.age);
        formData.append("breed", dogData.breed);
        formData.append("size", dogData.size);
        formData.append("image", dogData.image);

        // Send the data to the server using Axios
        console.log("current dog", dogData);

        const response = await axios.post(`${api}/owner`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        localStorage.setItem("isOwner", response.data.UserWithNewOwner.isOwner);
        console.log("Server response:", response.data);
        alert("Dog added successfully!");
        router.push("/ownerHome");

        // Additional logic for handling the form submission, if needed
      } else {
        console.error("Please complete the form before submitting.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
  };
  const handleFillFormAgain = (e) => {
    e.preventDefault();
    setDogData({ name: "", age: "", breed: "", size: "", image: null });
    setImagePreview(null);
    setButtonText("select your dog picture");
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
    <div className="h-full w-full flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-20">
          <h1
            className="text-5xl text-[#F39200]"
            style={{ fontFamily: "LikeEat" }}
          >
            Add dogs for walking
          </h1>
        </div>

        <div className="mb-10">
          <input
            id="name"
            placeholder="name of your dog"
            type="text"
            name="name"
            onChange={handleChange}
            value={dogData.name}
            className="w-full p-3  border border-gray-300 focus:border-black"
          />
        </div>
        <div className="mb-10">
          <input
            id="age"
            placeholder="age of your dog"
            type="text"
            name="age"
            onChange={handleChange}
            value={dogData.age}
            className="w-full p-3  border border-gray-300 focus:border-black"
          />
        </div>
        <div className="mb-10">
          <input
            id="breed"
            placeholder="breed of your dog"
            type="text"
            name="breed"
            onChange={handleChange}
            value={dogData.breed}
            className="w-full p-3 border border-gray-300 focus:border-black"
          />
        </div>
        <div className="mb-10">
          <select
            id="size"
            placeholder="size of your dog"
            name="size"
            onChange={handleChange}
            value={dogData.size}
            className="w-full p-3 border border-gray-300 focus:border-black"
          >
            <option value=""> size of your dog</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="mb-10 flex flex-col items-center ">
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className={`rounded-full px-3 py-2 bg-white w-full hover:text-[#F39200] text-[#29235c] transition-all duration-300 ease-in-out`}
          >
            {buttonText}
          </button>
        </div>
        {imagePreview && (
          <div className="mb-4 flex flex-col items-center">
            <label className="text-lg block mb-2">Image Preview</label>
            <Image
              src={imagePreview}
              alt="Image Preview"
              height={100}
              width={100}
            />
          </div>
        )}

        <div className="flex items-center justify-center">
          <button
            onClick={handleFillFormAgain}
            className="px-5 mr-2  py-2 rounded-full bg-white text-[#29235c] font-extrabold transition-all duration-300 ease-in-out hover:bg-[#F39200] hover:text-white"
          >
            clean
          </button>
          {dogData.name &&
          dogData.age &&
          dogData.breed &&
          dogData.size &&
          dogData.image ? (
            <button
              type="submit"
              className="px-5 ml-2 py-2 rounded-full bg-white text-[#29235c] font-extrabold transition-all duration-300 ease-in-out hover:bg-[#F39200] hover:text-white"
            >
              submit
            </button>
          ) : null}
        </div>
        {renderDogs}
      </form>
    </div>
  );
}
