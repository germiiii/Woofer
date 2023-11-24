"use client";
import "tailwindcss/tailwind.css";
import axios from "axios";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
//npm i react-firebase-hooks

export default function RegisterForm() {
  const googleAuth = new GoogleAuthProvider()
  const [ user ] = useAuthState(auth)

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

  /* const loginGoogle = async (e) => {
  e.preventDefault(); // Prevenir la acción predeterminada del formulario
  try {
    console.log('Antes de signInWithPopup');
    const result = await signInWithPopup(auth, googleAuth);
    console.log('Después de signInWithPopup');

    const { user } = result;

    // Dividir displayName en name y lastName
    const [name, lastName] = user.displayName.split(' ');

    console.log('Antes de router.push');
    // Redirigir a la página de formulario con los datos de usuario
    router.push({
      pathname: '/aditionalForm',
      query: { name, lastName, email: user.email, photoURL: user.photoURL },
    });
    console.log('Después de router.push');
  } catch (error) {
    // Imprimir el error exacto en la consola
    console.error(error);
  }
} */

const loginGoogle = async (e) => {
  e.preventDefault(); // Prevenir la acción predeterminada del formulario
  try {
    const result = await signInWithPopup(auth, googleAuth);
    console.log(result)
    const { user } = result;

    // Dividir displayName en name y lastName
    const [name, lastName] = user.displayName.split(' ');

    // Redirigir a la página de formulario con los datos de usuario
    router.push('/aditionalForm', undefined, {
      shallow: true,
      query: { name, lastName, email: user.email},
    });
  } catch (error) {
    // Imprimir el error exacto en la consola
    console.error(error);
  }
};

  /* useEffect(() =>{
    console.log(user)
  }, [user]) */

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
              Your last name
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name..."
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              />
            </label>
            <br />
            <label className="block mb-2">
              Your username
              <input
                type="text"
                name="username"
                placeholder="Enter your username..."
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
              <img
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
            <button
              type="submit"
              className="bg-indigo-900 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600"
            >
              Sign Up
            </button>
            <button onClick={loginGoogle}>Sign up with Google</button>
          </form>
        )}
      </div>
    </div>
  );
}
