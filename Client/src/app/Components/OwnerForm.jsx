import axios from "axios";
import React from "react";
import { useState, useRef } from "react";

export default function OwnerForm(props) {
  const fileInputRef = useRef(null);
  const [dogData, setDogData] = useState({
    name: "",
    age: "",
    breed: "",
    size: "",
    image: null,
  });

  const [listOfDogs, setListOfDogs] = useState([]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setDogData((prevDogData) => ({
          ...prevDogData,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    } else {
      setDogData((prevDogData) => ({ ...prevDogData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  };

  const handleAddDog = (e) => {
    e.preventDefault();
    setDogData({ name: "", age: "", breed: "", size: "", image: null });
    setListOfDogs((prevListOfDogs) => [...prevListOfDogs, dogData]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderDogs = listOfDogs.map((dog) => (
    <div>
      <h2>{dog.name}</h2>
      {dog.image && (
        <img src={dog.image} alt="Dog Preview" height="100px" width="100px" />
      )}
    </div>
  ));

  const formContainerStyle = {
    textAlign: "center",
    margin: "20px",
  };

  const formStyle = {
    display: "inline-block",
    textAlign: "left",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  };

  const labelStyle = {
    marginBottom: "8px",
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const selectStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    background: "black",
    color: "#fff",
    cursor: "pointer",
    marginRight: "8px",
  };

  return (
    <div className="bg-indigo-200 text-black p-6 max-w-md mx-auto mt-10 rounded-md shadow-md">
       <div className="flex justify-center">
        <Image
          src="/ISOWoofer.png"
          alt="logo"
          width={200}
          height={90}
          className="mx-auto"
        />
      </div>
      <div className="bg-white rounded-md p-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4">Add your dogs!</h1>
          <label className="block mb-2">
            Name of your dog{" "}
            <input
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              type="text"
              name="name"
              onChange={handleChange}
              value={dogData.name}
            />
          </label>
          <br />
          <label className="block mb-2">
            Age of your dog{" "}
            <input
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              type="text"
              name="age"
              onChange={handleChange}
              value={dogData.age}
            />
          </label>
          <br />
          <label className="block mb-2">
            Breed of your dog{" "}
            <input
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              type="text"
              name="breed"
              onChange={handleChange}
              value={dogData.breed}
            />
          </label>
          <br />
          <label className="block mb-2">
            Size of your dog
            <select
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              name="size"
              onChange={handleChange}
              value={dogData.size}
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </label>
          <br />
          <label className="block mb-2">
            Image of your dog
            <input
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              ref={fileInputRef}
            />
          </label>
          <br />
          <button
            onClick={handleAddDog}
            className="bg-indigo-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 mr-2"
          >
            Add more dogs
          </button>
          <button
            type="submit"
            className="bg-indigo-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Confirm
          </button>
          <div>{renderDogs}</div>
        </form>
      </div>
    </div>
  );
  
}
