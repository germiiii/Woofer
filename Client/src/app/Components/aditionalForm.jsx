"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import provinces from "../../app/register/provinces";

const AditionalForm = () => {

  const api = process.env.NEXT_PUBLIC_APIURL;

  const router = useRouter();
  const { userData } = useUser();

  const [formData, setFormData] = useState({
    name: userData.name || "",
    lastName: userData.lastName || "",
    email: userData.email || "",
    address: "",
    username: "",
    password: "",
    isWalker: false,
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
      isWalker: false,
      image: "",
      province: "",
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${api}/register`,
        formData
      );

      if (response.status === 201) {
        const loginConfirmed = window.confirm(
          "¡Registro exitoso! ¿Quieres iniciar sesión ahora?"
        );

        if (loginConfirmed) {
          router.push("/login");
        }
      } else {
        alert("Error al registrar. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Error al registrar. Inténtalo de nuevo.");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-indigo-200 rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <Image
            src="/ISOWoofer.png"
            alt="logo"
            width={200}
            height={90}
            className="mx-auto"
          />
        </div>
        <label className="block mb-2">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </label>
        <br />
        <label className="block mb-2">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </label>
        <br />
        <label className="block mb-2">
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </label>
        <br />
        <label className="block mb-2">
          Your province
          <select
            name="province"
            onChange={handleChange}
            value={formData.province}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
          >
            <option value="">Select your province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-2">
          Address:
          <input
            type="text"
            name="address"
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </label>
        <br />
        <label className="block mb-2">
          Username:
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </label>
        <br />
        <label className="block mb-2">
          Password:
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </label>
        <label className="block mb-2">
          Type of Woofer
          <select
            name="isWalker"
            onChange={handleChange}
            value={formData.isWalker}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
          >
            <option value="false">Owner</option>
            <option value="true">Walker</option>
          </select>
        </label>
        <button
          type="submit"
          className="px-4 py-3 rounded-full bg-[#29235c] text-white hover:bg-amber-400 hover:text-black border mt-3 lg:mt-0 mr-5"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default AditionalForm;
