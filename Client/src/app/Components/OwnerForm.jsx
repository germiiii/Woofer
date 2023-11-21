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
  const [username, setUsername] = useState("");
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
      if (name === "username") {
        setUsername(value);
      } else {
        setDogData((prevDogData) => ({ ...prevDogData, [name]: value }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedListOfDogs = [...listOfDogs, { ...dogData }];
    setListOfDogs(updatedListOfDogs);
    setDogData({ name: "", age: "", breed: "", size: "", image: null });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddDog = (e) => {
    e.preventDefault();
    const postData = {
      username: username,
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
    axios
      .post("http://localhost:3001/owner", postData)
      .then((response) => {
        console.log("Dogs posted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error posting dogs:", error);
      });
  };

  const renderDogs = listOfDogs.map((dog, index) => (
    <div key={index}>
      <h2>{dog.name}</h2>
      {dog.image && (
        <img src={dog.image} alt={`Dog Preview ${index + 1}`} height="100px" width="100px" />
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
            Your username{" "}
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={username}
            />
          </label>
          <br />
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
          Image of your dog (Upload a photo or provide a link)
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              ref={fileInputRef}
              style={inputStyle}
            />
            <input
              type="text"
              name="image"
              placeholder="Or provide a link to the photo"
              onChange={handleChange}
              value={dogData.image}

            />
          </label>
          <br />
          <button onClick={handleAddDog} style={buttonStyle}>
            Send
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

