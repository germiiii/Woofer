// import { createContext, useState, useContext } from 'react';
// import Link from 'next/link';
// import styles from '../login/LoginStyles.module.scss'

// const FormContext = createContext();

// export function LoginForm({ title, children, onSubmit, description }) {
//   const [formValues, setFormValues] = useState({});

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSubmit(formValues);
//   };

//   return (
//     <FormContext.Provider value={{ formValues, setFormValues }}>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <h2>{title}</h2>
//           {description && <p>{description}</p>}
//         </div>
//         {children}
//       </form>
//     </FormContext.Provider>
//   );
// }

// export function Input({ label, name, placeholder, type }) {
//   const { formValues, setFormValues } = useContext(FormContext);

//   const handleChange = (event) => {
//     const { value } = event.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className={styles.inputContainer}>
//       <label className={styles.label} htmlFor={name}>{label}</label>
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={formValues[name] || ''}
//         onChange={handleChange}
//         placeholder={placeholder}
//       />
//     </div>
//   );
// }

// export function LoginFooter({ description, link, textLink }) {
//   return (
//     <div className='w-full flex justify-center mt-3'>
//       <span className='text-lg lg:text-xl'>
//         {description}{' '}
//         <Link href={link}>
//           <p className='font-bold'>{textLink}</p>
//         </Link>
//       </span>
//     </div>
//   );
// }

// LoginForm.Input = Input;
// LoginForm.Footer = LoginFooter;


"use client";
import "tailwindcss/tailwind.css";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'

function RegisterFooter() {
  return (
    <div className='w-full flex justify-center mt-3'>
      <span className='text-lg lg:text-xl'>
        Don't have an account yet?{' '}
        <Link href='/register'>
          <p className='font-bold'>Sign up</p>
        </Link>
      </span>
    </div>
  );
}

function PasswordRecoveryFooter() {
  return (
    <div className='w-full flex justify-center mt-3'>
      <span className='text-lg lg:text-xl'>
        Forgot your password?{' '}
        <Link href='/forgot-password'>
          <p className='font-bold'>Recover password</p>
        </Link>
      </span>
    </div>
  );
}


export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      console.log("Sign in successful");
      console.log("Token:", response.data.token);
      router.push("/home");
    } catch (error) {
      console.log("Failed to sign in:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} method="post">
        <h1>SIGN IN</h1>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" >Sign In</button>
        <div>
          
        </div>

        <RegisterFooter />
      <PasswordRecoveryFooter />
      </form>
    </div>
  );
}
