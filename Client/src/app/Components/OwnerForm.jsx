import axios from "axios";
import React, { useState, useRef } from "react";

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

    // Convert the data to the required format
    const postData = {
      username: "your_username", // Replace with actual username
      dogs: listOfDogs.map((dog) => ({
        name: dog.name,
        age: dog.age,
        breed: dog.breed,
        size: dog.size,
        img: dog.image,
      })),
    };

    console.log("Posting the following data:", postData);

    // Post the formatted data to localhost/ownerform
    axios.post("http://localhost:3001/ownerform", postData)
      .then(response => {
        console.log("Dogs posted successfully:", response.data);
      })
      .catch(error => {
        console.error("Error posting dogs:", error);
      });
  };

  const handleAddDog = (e) => {
    e.preventDefault();
    const updatedListOfDogs = [...listOfDogs, dogData];
    setListOfDogs(updatedListOfDogs);
    setDogData({ name: "", age: "", breed: "", size: "", image: null });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderDogs = listOfDogs.map((dog) => (
    <div key={dog.name}>
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
    <div style={formContainerStyle}>
      <div style={formStyle}>
        <form onSubmit={handleSubmit}>
          <h1>Add your dogs!</h1>
          <label style={labelStyle}>
            Name of your dog{" "}
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={dogData.name}
            />
          </label>
          <br />
          <label style={labelStyle}>
            Age of your dog{" "}
            <input
              type="text"
              name="age"
              onChange={handleChange}
              value={dogData.age}
            />
          </label>
          <br />
          <label style={labelStyle}>
            Breed of your dog{" "}
            <input
              type="text"
              name="breed"
              onChange={handleChange}
              value={dogData.breed}
            />
          </label>
          <br />
          <label style={labelStyle}>
            Size of your dog
            <select name="size" onChange={handleChange} value={dogData.size}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </label>
          <br />
          <label style={labelStyle}>
            Image of your dog
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              ref={fileInputRef}
            />
          </label>
          <br />
          <button onClick={handleAddDog} style={buttonStyle}>
            Add more dogs
          </button>
          <button type="submit" style={buttonStyle}>
            Confirm
          </button>
          <div>{renderDogs}</div>
        </form>
      </div>
    </div>
  );
}
