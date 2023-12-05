"use client";
import "tailwindcss/tailwind.css";
import axios from "axios";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUser } from "../UserContext";
import provinces from "../../app/register/provinces";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";

const RegisterForm = () => {
  const api = process.env.NEXT_PUBLIC_APIURL;

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
    isWalker: "",
    image: "",
    province: "",
  });
  const [formSent, setFormSent] = useState(false);
  const [image, setImage] = useState("");

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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setImage(e.target.files[0]);
    } else {
      setUserData((prevUserData) => {
        const updatedUserData = { ...prevUserData, [name]: value };
        return updatedUserData;
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const userFormData = new FormData();
    userFormData.append("name", userData.name);
    userFormData.append("lastName", userData.lastName);
    userFormData.append("address", userData.address);
    userFormData.append("username", userData.username);
    userFormData.append("email", userData.email);
    userFormData.append("password", userData.password);
    userFormData.append("isWalker", userData.isWalker);
    userFormData.append("image", image);
    userFormData.append("province", userData.province);

    try {
      const response = await axios.post(`${api}/register`, userFormData);
      console.log(axios.defaults.baseURL);
      setFormSent(true);
    } catch (e) {
      window.alert("Registration failed.");
      console.log("register sin exito");
    }
  };

  return (
    <div className="w-full h-full bg-[#29235c] flex items-center justify-center ">
      {formSent ? (
        <div className="text-[#F39200] text-2xl text-center">
          Registration successful!
          <br />
          Check your inbox for a confirmation email.
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center">
          <div className="flex justify-center mb-20">
            <h1
              className="text-6xl text-[#F39200] font-extrabold"
              style={{ fontFamily: "LikeEat" }}
            >
              Sign up
            </h1>
          </div>

          <form
            onSubmit={handleRegister}
            method="post"
            className="flex items-center justify-center w-full"
          >
            <div className="flex flex-col justify-center mr-14 h-full">
              <label className="mb-16">
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  onChange={handleChange}
                  className="rounded-full px-10 py-2  w-full"
                />
              </label>
              <label className=" mb-16">
                <input
                  type="text"
                  name="lastName"
                  placeholder="last name"
                  onChange={handleChange}
                  className="rounded-full px-3  py-2  w-full"
                />
              </label>
              <label className=" mb-16">
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={handleChange}
                  className="rounded-full px-3 py-2  w-full"
                />
              </label>
              <label className=" mb-16">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                  className="rounded-full px-3 py-2  w-full"
                />
              </label>
              <label className="">
                <select
                  name="isWalker"
                  onChange={handleChange}
                  value={userData.isWalker}
                  className="rounded-full px-3 py-2 w-full text-[#29235c]"
                >
                  <option value="">select your woofer type</option>
                  <option value="false">Owner</option>
                  <option value="true">Walker</option>
                </select>
              </label>
            </div>

            <div className="flex flex-col">
              <label className=" mb-16">
                <select
                  name="province"
                  onChange={handleChange}
                  value={userData.province}
                  className="rounded-full px-3 py-2 text-[#29235c]"
                  style={{ width: "300px", height: "40px" }}
                >
                  <option value="">select your province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </label>
              <label className=" mb-16">
                <input
                  type="text"
                  name="address"
                  placeholder="address"
                  onChange={handleChange}
                  className="rounded-full px-10 py-2 w-full"
                />
              </label>
              <label className=" mb-16">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  className="rounded-full px-3 py-2 w-full"
                />
              </label>
              <label className=" mb-16">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="rounded-full px-3 py-2 bg-white w-full hover:text-[#F39200] text-[#29235c]"
                >
                  select your profile picture
                </button>
              </label>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-8 py-2 rounded-full bg-white text-[#29235c] font-extrabold transition-all duration-300 ease-in-out hover:bg-[#F39200] hover:text-white"
                >
                  sign up
                </button>
                <div className="flex items-center justify-center ml-5 mr-5">
                  <h1 className="text-white">or</h1>
                </div>
                <button
                  onClick={loginGoogle}
                  className="bg-white text-[#29235c] px-5 py-2 rounded-full flex items-center justify-center focus:outline-none transition-all duration-300 ease-in-out hover:bg-[#F39200] hover:text-white"
                  type="button"
                >
                  <Image
                    src={"/google.png"}
                    alt="Google Logo"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>Google</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
