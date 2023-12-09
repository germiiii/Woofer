"use client";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";
import axios from "axios";

const ForgotPassword = () => {
  const api = process.env.NEXT_PUBLIC_APIURL;

  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("email cannot be empty");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    try {
      const response = await fetch(`${api}/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setFormSubmitted(true);
      } else {
        window.alert(
          "Error: Unable to send the password recovery email. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert(
        "Error: Unable to send the password recovery email. Please try again."
      );
    }
  };

  return (
    <div className="w-full h-full bg-[#29235c] flex flex-col justify-center">
      {formSubmitted ? (
        <div className="flex flex-col justify-center items-center text-center">
          <p className="text-[#F39200] text-3xl ">
            Password recovery email sent successfully. <br /> Check your inbox.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <div className="mb-20">
            <h1
              className="text-6xl text-[#F39200] font-extrabold"
              style={{ fontFamily: "LikeEat" }}
            >
              Recover your account
            </h1>
          </div>
          <label className="h-20">
            <input
              type="email"
              value={email}
              placeholder="email"
              onChange={handleEmailChange}
              onBlur={validateEmail}
              className="rounded-full px-10 py-2 "
            />
            {emailError && (
              <p className="text-[#F39200] text-center mt-1">{emailError}</p>
            )}
          </label>

          <button
            type="submit"
            className="px-8 py-2 mb-20 mt-5 rounded-full bg-white text-[#29235c] font-extrabold transition-all duration-300 ease-in-out hover:bg-[#F39200] hover:text-white"
          >
            send recovery email
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
