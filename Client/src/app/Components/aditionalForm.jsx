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
      const response = await axios.post(`${api}/register`, formData);

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
            <label className="mb-10">
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
            <label className="mb-10">
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
            <label className=" mb-10">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="rounded-full px-10 py-2  w-full"
              />
            </label>
            <label className=" mb-10">
              <select
                name="province"
                onChange={handleChange}
                value={formData.province}
                className="rounded-full px-3 py-2 text-[#29235c]"
                style={{ width: "300px", height: "38px" }}
              >
                <option value="">select your province</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex flex-col">
            <label className=" mb-10">
              <input
                type="text"
                name="address"
                placeholder="address"
                onChange={handleChange}
                className="rounded-full px-10 py-2  w-full"
              />
            </label>
            <label className=" mb-10">
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={handleChange}
                className="rounded-full px-10 py-2  w-full"
              />
            </label>
            <label className=" mb-10">
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                className="rounded-full px-10 py-2  w-full"
              />
            </label>
            <label className="mb-10">
              <select
                name="isWalker"
                onChange={handleChange}
                value={formData.isWalker}
                className="rounded-full px-3 py-2 w-full text-[#29235c]"
              >
                <option value="">select your woofer type</option>
                <option value="false">Owner</option>
                <option value="true">Walker</option>
              </select>
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
