"use client";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";
import { useState } from "react";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

  useEffect(() => {
    // token desde la URL
    const pathArray = window.location.pathname.split("/");
    const tokenFromUrl = pathArray[pathArray.length - 1];
    setToken(tokenFromUrl);
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      if (!token || !password) {
        console.error("Token o nueva contraseña están vacíos");
        return;
      }

      const response = await fetch(`${api}/changePassword/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setChangePasswordSuccess(true);
      } else {
        window.alert("Error: Unable to change the password. Please try again.");
      }
    } catch (error) {
      window.alert("Error: Unable to change the password. Please try again.");
    }
  };

  return (
    <div className="w-full h-full bg-[#29235c] flex flex-col justify-center">
      {changePasswordSuccess ? (
        <div className="flex flex-col justify-center items-center text-center">
          <p className="text-[#F39200] text-3xl ">
            Password changed successfully.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleChangePassword}
          className="flex flex-col justify-center items-center"
        >
          <div className="mb-20">
            <h1
              className="text-6xl text-[#F39200] font-extrabold"
              style={{ fontFamily: "LikeEat" }}
            >
              Change your password
            </h1>
          </div>
          <label htmlFor="newPassword" className="h-15"></label>
          <input
            type="password"
            id="password"
            placeholder="new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-full px-10 py-2 "
          />

          <button
            type="submit"
            className="px-8 py-2 mb-20 mt-16 rounded-full bg-white text-[#29235c] font-extrabold transition-all duration-300 ease-in-out hover:bg-[#F39200] hover:text-white"
          >
            change password
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
