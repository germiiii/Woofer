import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import jwt from "jsonwebtoken";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";

const LoginForm = () => {
  const api = process.env.NEXT_PUBLIC_APIURL;

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const googleAuth = new GoogleAuthProvider();
  const [user] = useAuthState(auth);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "email cannot be empty";
    }

    if (!password.trim()) {
      errors.password = "password cannot be empty";
    }
    console.log("Validation Errors:", errors);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const loginGoogle = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, googleAuth);
      const { user } = result;

      const email = user.email;

      const response = await axios.post(`${api}/googleLogin`, {
        email,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      if (response.status === 201) {
        router.push("/home");
      } else {
        console.error("Authentication failed");
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error(error);
      alert("Authentication error. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(`${api}/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      if (token) {
        if (email === "admin@admin.com" && password === "123") {
          router.push("/admin");
        } else {
          router.push("/home");
        }
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Authentication error. Please try again.");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="w-full h-full bg-[#29235c] flex flex-col items-center justify-center ">
        <p className="text-[#F39200]">redirecting...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#29235c] flex flex-col items-center justify-center  ">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col items-center justify-center w-full"
      >
        <h1
          className="text-6xl text-[#F39200] font-extrabold mb-12"
          style={{ fontFamily: "LikeEat" }}
        >
          Sign in
        </h1>
        <label className="mb-10" style={{ height: "64px" }}>
          <input
            className={`rounded-full px-10 py-2 w-full ${
              validationErrors.email ? "border-[#F39200]" : ""
            }`}
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
          />
          {validationErrors.email && (
            <p className="text-[#F39200] text-sm mt-1">
              {validationErrors.email}
            </p>
          )}
        </label>
        <br />
        <label className="mb-10" style={{ height: "64px" }}>
          <input
            className={`rounded-full px-10 py-2 w-full ${
              validationErrors.password ? "border-[#F39200]" : ""
            }`}
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
          {validationErrors.password && (
            <p className="text-[#F39200] text-sm mt-1">
              {validationErrors.password}
            </p>
          )}
        </label>
        <br />
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="px-8 py-2 rounded-full bg-white text-[#29235c] font-extrabold transition-all duration-300 ease-in-out hover:bg-[#F39200] hover:text-white"
          >
            sign in
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
      </form>

      <div className="mt-10">
        <p className="text-sm text-white">
          Don&rsquo;t have an account yet? Create it{" "}
          <a href="/register" className="text-[#F39200]">
            here.
          </a>
        </p>
      </div>
      <div className="mt-2">
        <p className="text-sm text-white">
          Don&rsquo;t remember your password? Recover your password {""}
          <a href="/forget-password" className="text-[#F39200]">
            here.
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
