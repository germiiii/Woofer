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

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Add your dogs!</h1>
          <label>
            Name of your dog{" "}
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={dogData.name}
            />
          </label>
          <br />
          <label>
            Age of your dog{" "}
            <input
              type="text"
              name="age"
              onChange={handleChange}
              value={dogData.age}
            />
          </label>
          <br />
          <label>
            Breed of your dog{" "}
            <input
              type="text"
              name="breed"
              onChange={handleChange}
              value={dogData.breed}
            />
          </label>
          <br />
          <label>
            Size of your dog
            <select name="size" onChange={handleChange} value={dogData.size}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </label>
          <br />
          <label>
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
          <button onClick={handleAddDog}>Add more dogs</button>
          <button type="submit">Confirm</button>
        </form>
      </div>
      <div>{renderDogs}</div>
    </div>
  );
}
