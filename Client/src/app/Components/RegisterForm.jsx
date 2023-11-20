"use client";
import "tailwindcss/tailwind.css";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";	

export default function RegisterForm() {

  const router = useRouter();

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

  const [registrationStatus, setRegistrationStatus] = useState(null);

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

      setRegistrationStatus({
        success: true,
        message: "Registration successful",
      });

      console.log("register con exito");

      // Check the value of isWalker before redirecting
    if (userData.isWalker) {
      router.push("/walkerform");
    } else {
      router.push("/ownerform");
    }

    } catch (error) {
      setRegistrationStatus({
        success: false,
        message: "Registration failed",
      });
    }
  };

  return (
    <div className="bg-white text-black p-6 max-w-md mx-auto mt-10 rounded-md shadow-md">
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
      {registrationStatus && (
        <div className={registrationStatus.success ? "text-green-500" : "text-red-500"}>
          {registrationStatus.message}
        </div>
      )}
    </div>
  );
}
