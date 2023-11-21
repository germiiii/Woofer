"use client";
import "tailwindcss/tailwind.css";
import axios from "axios";
import React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


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
      const response = await axios.post("http://localhost:3001/register", userData );
  
      setRegistrationStatus({
        success: true,
        message: "Registration successful",
      });
      // Check the value of isWalker before redirecting
      console.log("isWalker:", userData.isWalker);
  
      if (userData.isWalker) {
        console.log("Redirecting to walkerform");
        router.push("/walkerform");
      } else {
        console.log("Redirecting to ownerform", router);
        alert("An e-mail was sent to your direction")
      }
    } catch (error) {
      setRegistrationStatus({
        success: false,
        message: "Registration failed",
      });
    }
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
      {formSent ? (
        <div className="text-green-500 mb-4">
          Registration successful! Check your inbox for a confirmation email.

          <button
            className="bg-indigo-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
            onClick={() => {
              router.push("/login");
            }}

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