"use client";
import "tailwindcss/tailwind.css";
import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    adress: "",
    username: "",
    email: "",
    password: "",
    isWalker: false,
    image: null,
  });
  const [formSent, setFormSent] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevUserData) => ({
          ...prevUserData,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    } else {
      setUserData((prevUserData) => {
        const updatedUserData = { ...prevUserData, [name]: value };
        return updatedUserData;
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        userData
      );
      setFormSent(true);
    } catch (e) {
      console.log("register sin exito");
    }
  };

  return (
    <div className="bg-white text-black p-6 max-w-md mx-auto mt-10 rounded-md shadow-md">
      {formSent ? (
        <div className="text-green-500 mb-4">
          Registro exitoso, compruebe su casilla de mensajes para validar su
          cuenta.
          <button
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
            onClick={() => {
              router.push("/login");
            }}
          >
            LogIn
          </button>
        </div>
      ) : (
        <form onSubmit={handleRegister} method="post">
          <h1 className="text-2xl mb-4">REGISTER</h1>
          <label>
            Your name
            <input type="text" name="name" onChange={handleChange} />
          </label>
          <br />
          <label>
            Your last name
            <input type="text" name="lastName" onChange={handleChange} />
          </label>
          <br />
          <label>
            Your username
            <input type="text" name="username" onChange={handleChange} />
          </label>
          <br />
          <label>
            Your email
            <input type="email" name="email" onChange={handleChange} />
          </label>
          <br />
          <label>
            Your adress
            <input type="text" name="adress" onChange={handleChange} />
          </label>
          <br />
          <label>
            Your password
            <input type="password" name="password" onChange={handleChange} />
          </label>
          <br />
          <label>
            Profile Picture
            <img src={userData.image} alt="" height="100px" width="100px" />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              ref={fileInputRef}
            />
          </label>
          <br />
          <label>
            Type of Woofer
            <select
              name="isWalker"
              onChange={handleChange}
              value={userData.isWalker}
            >
              <option value="false">Owner</option>
              <option value="true">Walker</option>
            </select>
          </label>
          <br />
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}
