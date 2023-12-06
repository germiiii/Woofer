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

  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!userData.name.trim()) {
      errors.name = "name cannot be empty";
    } else if (userData.name.length > 255) {
      errors.name = "name cannot exceed 255 characters";
    }

    if (!userData.lastName.trim()) {
      errors.lastName = "last name cannot be empty";
    } else if (userData.lastName.length > 255) {
      errors.lastName = "last name cannot exceed 255 characters";
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!userData.username.trim()) {
      errors.username = "username cannot be empty";
    } else if (userData.username.length > 255) {
      errors.username = "username cannot exceed 255 characters";
    } else if (!usernameRegex.test(userData.username)) {
      errors.username =
        "username can only contain alphanumeric characters and underscores";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim()) {
      errors.email = "email cannot be empty";
    } else if (userData.email.length > 255) {
      errors.email = "email cannot exceed 255 characters";
    } else if (!emailRegex.test(userData.email)) {
      errors.email = "invalid email format";
    }

    if (!userData.isWalker) {
      errors.isWalker = "select your woofer type";
    }

    if (!userData.province) {
      errors.province = "select your province";
    }

    if (!userData.address.trim()) {
      errors.address = "address cannot be empty";
    } else if (userData.address.length > 255) {
      errors.address = "address cannot exceed 255 characters";
    }

    if (userData.password.length > 255) {
      errors.password = "password cannot exceed 255 characters";
    } else if (!userData.password.trim()) {
      errors.password = "password cannot be empty";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const loginGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleAuth);
      const { user } = result;
      console.log(user)

      const [name, lastName] = user.displayName.split(" ");

      updateUser({ name, lastName, email: user.email });
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

    if (!validateForm()) {
      return;
    }

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
              <label className="mb-16" style={{ height: "64px" }}>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  onChange={handleChange}
                  className={`rounded-full px-10 py-2  w-full ${
                    validationErrors.name ? "border-[#F39200]" : ""
                  }`}
                />
                {validationErrors.name && (
                  <p className="text-[#F39200] text-sm mt-1">
                    {validationErrors.name}
                  </p>
                )}
              </label>
              <label className="mb-16" style={{ height: "64px" }}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="last name"
                  onChange={handleChange}
                  className={`rounded-full px-3 py-2  w-full ${
                    validationErrors.lastName ? "border-[#F39200]" : ""
                  }`}
                />
                {validationErrors.lastName && (
                  <p className="text-[#F39200] text-sm mt-1">
                    {validationErrors.lastName}
                  </p>
                )}
              </label>
              <label className=" mb-16" style={{ height: "64px" }}>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={handleChange}
                  className={`rounded-full px-3 py-2  w-full ${
                    validationErrors.username ? "border-[#F39200]" : ""
                  }`}
                />
                {validationErrors.username && (
                  <p className="text-[#F39200] text-sm mt-1">
                    {validationErrors.username}
                  </p>
                )}
              </label>
              <label className=" mb-16" style={{ height: "64px" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                  className={`rounded-full px-3 py-2  w-full ${
                    validationErrors.email ? "border-[#F39200]" : ""
                  }`}
                />
                {validationErrors.email && (
                  <p className="text-[#F39200] text-sm mt-1">
                    {validationErrors.email}
                  </p>
                )}
              </label>
              <label className="" style={{ height: "64px" }}>
                <select
                  name="isWalker"
                  onChange={handleChange}
                  value={userData.isWalker}
                  className={`rounded-full px-3 py-2 w-full text-[#29235c] ${
                    validationErrors.isWalker ? "border-[#F39200]" : ""
                  }`}
                >
                  <option value="">select your woofer type</option>
                  <option value="false">Owner</option>
                  <option value="true">Walker</option>
                </select>
                {validationErrors.isWalker && (
                  <p className="text-[#F39200] text-sm mt-1">
                    {validationErrors.isWalker}
                  </p>
                )}
              </label>
            </div>

            <div className="flex flex-col">
              <label className=" mb-16" style={{ height: "64px" }}>
                <select
                  name="province"
                  onChange={handleChange}
                  value={userData.province}
                  className={`rounded-full px-3 py-2 text-[#29235c] ${
                    validationErrors.province ? "border-[#F39200]" : ""
                  }`}
                  style={{ width: "300px", height: "40px" }}
                >
                  <option value="">select your province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                {validationErrors.province && (
                  <p className="text-[#F39200] text-sm mt-1">
                    {validationErrors.province}
                  </p>
                )}
              </label>
              <label className=" mb-16" style={{ height: "64px" }}>
                <input
                  type="text"
                  name="address"
                  placeholder="address"
                  onChange={handleChange}
                  className={`rounded-full px-10 py-2 w-full ${
                    validationErrors.address ? "border-[#F39200]" : ""
                  }`}
                />
                {validationErrors.address && (
                  <p className="text-[#F39200] text-sm mt-1">
                    {validationErrors.address}
                  </p>
                )}
              </label>
              <label className=" mb-16" style={{ height: "64px" }}>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  className={`rounded-full px-3 py-2 w-full ${
                    validationErrors.password ? "border-[#F39200]" : ""
                  }`}
                />
                {validationErrors.password && (
                  <p className="text-[#F39200] text-sm mt-1">
                    {validationErrors.password}
                  </p>
                )}
              </label>
              <label className=" mb-16" style={{ height: "64px" }}>
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
                  className={`rounded-full px-3 py-2 bg-white w-full hover:text-[#F39200] text-[#29235c] ${
                    validationErrors.image ? "border-[#F39200]" : ""
                  }`}
                >
                  select your profile picture
                </button>
              </label>
              <div className="flex items-center justify-center mb-6">
                <button
                  type="submit"
                  className="px-8 py-2 rounded-full bg-white text-[#29235c] font-extrabold transition-all duration-300 ease-in-out hover:bg-[#F39200] hover:text-white"
                >
                  Sign up
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
