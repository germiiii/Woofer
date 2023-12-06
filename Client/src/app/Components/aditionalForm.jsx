"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import provinces from "../../app/register/provinces";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";

const AditionalForm = () => {
  const api = process.env.NEXT_PUBLIC_APIURL;

  const router = useRouter();
  const { userData } = useUser();
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    name: userData.name || "",
    lastName: userData.lastName || "",
    email: userData.email || "",
    address: "",
    username: "",
    password: "",
    isWalker: "",
    image: "",
    province: "",
  });

  useEffect(() => {
    setFormData({
      name: userData.name || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      address: "",
      username: "",
      password: "",
      isWalker: "",
      image: "",
      province: "",
    });
  }, [userData]);

  const validateForm = () => {
    const errors = {};

    if (!formData.province) {
      errors.province = "select your province";
    }

    if (!formData.address.trim()) {
      errors.address = "address cannot be empty";
    }

    if (!formData.username.trim()) {
      errors.username = "username cannot be empty";
    }

    if (!formData.password.trim()) {
      errors.password = "password cannot be empty";
    }

    if (!formData.isWalker) {
      errors.isWalker = "select your woofer type";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${api}/register`, formData);

      if (response.status === 201) {
        const loginConfirmed = window.confirm(
          "Registration successful! please, check your inbox to activate your account"
        );

        if (loginConfirmed) {
          router.push("/login");
        }
      } else {
        alert("Error al registrar. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Error registering. Please try again.");
    }
  };

  return (
    <div className="w-full h-full bg-[#29235c] flex items-center justify-center ">
      <div className="w-full h-full flex flex-col justify-center">
        <div className="flex justify-center items-center">
          <h1
            className="text-6xl text-[#F39200] font-extrabold"
            style={{ fontFamily: "LikeEat" }}
          >
            Sign up with Google
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center w-full mt-20"
        >
          <div className="flex flex-col r mr-14 h-full">
            <label className="mb-10" style={{ height: "64px" }}>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleChange}
                className="rounded-full px-10 py-2  w-full"
                disabled
              />
            </label>
            <label className="mb-10" style={{ height: "64px" }}>
              <input
                type="text"
                name="lastName"
                placeholder="last name"
                value={formData.lastName}
                onChange={handleChange}
                className="rounded-full px-10 py-2  w-full"
                disabled
              />
            </label>
            <label className=" mb-10" style={{ height: "64px" }}>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="rounded-full px-10 py-2  w-full"
              />
            </label>
            <label className="mb-10" style={{ height: "64px" }}>
              <select
                name="province"
                onChange={handleChange}
                value={formData.province}
                className={`rounded-full px-3 py-2 text-[#29235c] ${
                  validationErrors.province ? "border-[#F39200]" : ""
                }`}
                style={{ width: "300px", height: "38px" }}
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
          </div>
          <div className="flex flex-col">
            <label className=" mb-10" style={{ height: "64px" }}>
              <input
                type="text"
                name="address"
                placeholder="address"
                onChange={handleChange}
                className={`rounded-full px-10 py-2  w-full ${
                  validationErrors.address ? "border-[#F39200]" : ""
                }`}
              />
              {validationErrors.address && (
                <p className="text-[#F39200] text-sm mt-1">
                  {validationErrors.address}
                </p>
              )}
            </label>
            <label className=" mb-10" style={{ height: "64px" }}>
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={handleChange}
                className={`rounded-full px-10 py-2  w-full ${
                  validationErrors.username ? "border-[#F39200]" : ""
                }`}
              />
              {validationErrors.username && (
                <p className="text-[#F39200] text-sm mt-1">
                  {validationErrors.username}
                </p>
              )}
            </label>
            <label className=" mb-10" style={{ height: "64px" }}>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                className={`rounded-full px-10 py-2  w-full ${
                  validationErrors.password ? "border-[#F39200]" : ""
                }`}
              />
              {validationErrors.password && (
                <p className="text-[#F39200] text-sm mt-1">
                  {validationErrors.password}
                </p>
              )}
            </label>
            <label className="mb-10" style={{ height: "64px" }}>
              <select
                name="isWalker"
                onChange={handleChange}
                value={formData.isWalker}
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
            <div className="flex items-end justify-end">
              <button
                type="submit"
                className="px-8 py-2 rounded-full bg-white text-[#29235c] font-extrabold transition-all duration-300 ease-in-out hover:bg-[#F39200] hover:text-white"
              >
                confirm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AditionalForm;
