"use client";
import "tailwindcss/tailwind.css";
import axios from "axios";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUser } from "../UserContext";

export default function RegisterForm() {
  const googleAuth = new GoogleAuthProvider();
  const [user] = useAuthState(auth);
  const { updateUser } = useUser();

  const router = useRouter();
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    address: "",
    username: "",
    email: "",
    password: "",
    isWalker: false,
    image: null,
  });
  const [formSent, setFormSent] = useState(false);

  const loginGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleAuth);
      const { user } = result;

      const [name, lastName] = user.displayName.split(" ");

      // Actualizar el contexto con los datos de usuario
      updateUser({ name, lastName, email: user.email });

      // Redirigir a la página de formulario
      router.push("/aditionalForm");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

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
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
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
      window.alert("Registration failed.");
      console.log("register sin exito");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-indigo-200 rounded shadow-md">
      <div className="flex justify-center">
        {formSent ? (
          <div className="text-green-500 mb-4">
            Registration successful! Check your inbox for a confirmation email.
            <button
              className="px-4 py-3 rounded-full bg-[#29235c] text-white hover:bg-amber-400 hover:text-black border mt-3 lg:mt-0 mr-5"
              onClick={() => {
                router.push("/login");
              }}
            >
              LogIn
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegister} method="post">
            <div className="flex justify-center">
              <Image
                src="/ISOWoofer.png"
                alt="logo"
                width={200}
                height={90}
                className="mx-auto"
              />
            </div>
            <h1 className="text-2xl text-indigo-900 font-extrabold mb-4">
              REGISTER
            </h1>
            <label className="block mb-2">
              Your name
              <input
                type="text"
                name="name"
                placeholder="Enter your name..."
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <br />
            <label className="block mb-2">
              Your email
              <input
                type="email"
                name="email"
                placeholder="Enter your email..."
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <br />
            <label className="block mb-2">
              Your address
              <input
                type="text"
                name="address"
                placeholder="Enter your address..."
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <br />
            <label className="block mb-2">
              Your password
              <input
                type="password"
                name="password"
                placeholder="Enter your password..."
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <br />
            <label className="block mb-2">
              Profile Picture
              <Image
                src={userData.image ? userData.image : "/Profile.jpeg"}
                alt=""
                height="100px"
                width="100px"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                ref={fileInputRef}
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <br />
            <label className="block mb-2">
              Type of Woofer
              <select
                name="isWalker"
                onChange={handleChange}
                value={userData.isWalker}
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              >
                <option value="false">Owner</option>
                <option value="true">Walker</option>
              </select>
            </label>
            <br />
            <div>
              <button
                type="submit"
                className="px-4 py-3 rounded-full bg-[#29235c] text-white hover:bg-amber-400 hover:text-black border mt-3 lg:mt-0 mr-5"
              >
                Sign Up
              </button>
            </div>

            <div>
              <button
                onClick={loginGoogle}
                className="bg-white text-indigo-900 px-4 py-3 rounded flex items-center justify-center focus:outline-none hover:bg-amber-400"
                type="button"
              >
                <Image
                  src={"/google.png"}
                  alt="Google Logo"
                  className="w-6 h-6 mr-2"
                />
                <span>Sign Up with Google</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
