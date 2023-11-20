"use client";
import "tailwindcss/tailwind.css";
import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="bg-indigo-200 text-black p-6 max-w-md mx-auto mt-10 rounded-md shadow-md">
      {formSent ? (
        <div className="text-green-500 mb-4">
          Registration successful! Check your inbox for a confirmation email.
          <button
            className="bg-indigo-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
            onClick={() => {
              router.push("/login");
            }}
          >
            LogIn
          </button>
        </div>
      ) : (
        <form onSubmit={handleRegister} method="post">
          <h1 className="text-2xl text-indigo-900 font-extrabold mb-4">REGISTER</h1>
          <div className="space-y-4">
            <label className="block">
              Your name
              <input
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                type="text"
                name="name"
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Your last name
              <input
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                type="text"
                name="lastName"
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Your username
              <input
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Your email
              <input
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                type="text"
                name="email"
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Your address
              <input
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                type="text"
                name="address"
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Your password
              <input
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                type="text"
                name="password"
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Profile Picture
              <Image
                src={'/AvatarProfile.jpeg'}
                alt="profilepic"
                width={80}
                height={90}
              />
              <input
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                ref={fileInputRef}
              />
            </label>
            <label className="block">
              Type of Woofer
              <select
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                name="isWalker"
                onChange={handleChange}
                value={userData.isWalker}
              >
                <option value="false">Owner</option>
                <option value="true">Walker</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="bg-indigo-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 block mt-4"
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}  