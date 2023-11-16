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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, [name]: value };
      return updatedUserData;
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        userData
      );
      console.log("register con exito");
      const { token } = response.data;
      router.push("/home");
    } catch (e) {
      console.log("register sin exito");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister} method="post">
        <h1>REGISTER</h1>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
