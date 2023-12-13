"use client";
import "tailwindcss/tailwind.css";
import axios from "axios";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    address: "",
    username: "",
    email: "",
    password: "",
    selectedType:
      type === "walker" ? "walker" : type === "owner" ? "owner" : "",
    image: "",
    googleImage: "",
    province: "",
  });
  const [formSent, setFormSent] = useState(false);
  const [image, setImage] = useState("");
  const [buttonText, setButtonText] = useState("select your profile picture");
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};

    if (!userData.name.trim()) {
      errors.name = "name cannot be empty";
    } else if (userData.name.length > 40) {
      errors.name = "name cannot exceed 40 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(userData.name)) {
      errors.name = "name must contain only letters";
    }

    if (!userData.lastName.trim()) {
      errors.lastName = "last name cannot be empty";
    } else if (userData.lastName.length > 40) {
      errors.lastName = "last name cannot exceed 40 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(userData.lastName)) {
      errors.lastName = "last name must contain only letters";
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!userData.username.trim()) {
      errors.username = "username cannot be empty";
    } else if (userData.username.length > 40) {
      errors.username = "username cannot exceed 40 characters";
    } else if (!usernameRegex.test(userData.username)) {
      errors.username = "username must be alphanumeric";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim()) {
      errors.email = "email cannot be empty";
    } else if (userData.email.length > 40) {
      errors.email = "email cannot exceed 40 characters";
    } else if (!emailRegex.test(userData.email)) {
      errors.email = "invalid email format";
    }

    if (!userData.selectedType) {
      errors.selectedType = "select your woofer type";
    }

    if (!userData.province) {
      errors.province = "select your province";
    }

    if (!userData.address.trim()) {
      errors.address = "address cannot be empty";
    } else if (userData.address.length > 40) {
      errors.address = "address cannot exceed 40 characters";
    } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s]+$/.test(userData.address)) {
      errors.address = "address must contain only alphanumeric characters";
    }

    if (userData.password.length > 40) {
      errors.password = "password cannot exceed 40 characters";
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
      console.log(user);

      const [name, lastName] = user.displayName.split(" ");

      updateUser({ name, lastName, email: user.email, googleImage: user.photoURL });
      router.push("/aditionalForm");
    } catch (error) {
      console.error(error);
      alert("Error registering. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const selectedFile = e.target.files[0];

      if (
        selectedFile &&
        !["image/jpeg", "image/png"].includes(selectedFile.type)
      ) {
        window.alert("Please select a valid image file (JPG or PNG).");
        fileInputRef.current.value = null;
        setImage("");
        setButtonText("select your profile picture");
        return;
      }

      const maxSizeInBytes = 15 * 1024 * 1024;
      if (selectedFile && selectedFile.size > maxSizeInBytes) {
        window.alert("Please select an image file smaller than 15MB.");

        fileInputRef.current.value = null;
        setImage("");
        setButtonText("select your profile picture");
        return;
      }

      setImage(selectedFile);

      const maxFileNameLength = 20;
      const fileName = selectedFile
        ? selectedFile.name.length > maxFileNameLength
          ? selectedFile.name.substring(0, maxFileNameLength - 3) + "..."
          : selectedFile.name
        : "select your profile picture";
      setButtonText(fileName);
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
    userFormData.append("selectedType", userData.selectedType);
    userFormData.append("image", image);
    userFormData.append("province", userData.province);
    userFormData.append("googleImage", userData.googleImage);

    try {
      const response = await axios.post(`${api}/register`, userFormData);
      console.log(axios.defaults.baseURL);
      setFormSent(true);
    } catch (e) {
      window.alert("Registration failed. Please try again.");
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
          <div className="flex justify-center mb-10">
            <h1
              className="text-7xl text-[#F39200] font-extrabold"
              style={{ fontFamily: "LikeEat" }}
            >
              Sign up
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center mr-6 mb-5">
            {" "}
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
            <div className="mt-5">
              <h1 className="text-white">or</h1>{" "}
            </div>
          </div>

          <form
            onSubmit={handleRegister}
            method="post"
            className="flex items-center justify-center w-full mt-1"
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
                  className={`rounded-full px-3 py-2 bg-white w-full hover:text-[#F39200] text-[#29235c] transition-all duration-300 ease-in-out ${
                    validationErrors.image ? "border-[#F39200]" : ""
                  }`}
                >
                  {buttonText}
                </button>
              </label>
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
              <label className="" style={{ height: "64px" }}>
                <select
                  name="selectedType"
                  onChange={handleChange}
                  value={userData.selectedType}
                  className={`rounded-full px-3 py-2 w-full text-[#29235c] ${
                    validationErrors.selectedType ? "border-[#F39200]" : ""
                  }`}
                >
                  <option value="">select your woofer type</option>
                  <option value="owner">Owner</option>
                  <option value="walker">Walker</option>
                </select>
                {validationErrors.selectedType && (
                  <p className="text-[#F39200] text-sm mt-1">
                    {validationErrors.selectedType}
                  </p>
                )}
              </label>
            </div>

            <div className="flex flex-col">
              <label className=" mb-16" style={{ height: "64px" }}>
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
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                    className={`rounded-full px-2 py-2 w-full mr-2 ${
                      validationErrors.password ? "border-[#F39200]" : ""
                    }`}
                  />
                  <div className="flex">
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="bg-white text-[#29235c] px-4 w-20 py-2 rounded-full flex items-center justify-center focus:outline-none transition-all duration-300 ease-in-out hover:text-[#F39200] text-[#29235c]"
                    >
                      {showPassword ? "hide" : "show"}
                    </button>
                  </div>
                </div>
                {validationErrors.password && (
                  <p className="text-[#F39200] text-sm mt-1">
                    {validationErrors.password}
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
              <div className="flex items-center justify-center mb-6">
                <button
                  type="submit"
                  className="w-full py-2 rounded-full bg-white text-[#29235c] font-extrabold transition-all duration-300 ease-in-out hover:bg-[#F39200] hover:text-white"
                >
                  Sign up
                </button>
                {/* <div className="flex items-center justify-center ml-5 mr-5">
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
                </button> */}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
