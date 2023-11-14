"use client"
import React, { useState } from "react";

const RegisterForm = () => {
  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-8 md:py-16 gap-8 md:gap-16 relative"
    >
      <div className="rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 text-transparent bg-clip-text my-2">
          Register Form
        </h2>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          Register to be part of Woofer. You can choose to be an owner or walker. You may change profiles at any time.
        </p>
      </div>

      <div>
        <form className="flex flex-col">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="text-black block mb-2 text-sm font-medium"
            >
              Name
            </label>
            <input
              name="name "
              type="text"
              id="name"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Name..."
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="last name"
              className="text-black block text-sm mb-2 font-medium"
            >
              Last Name
            </label>
            <input
              name="lastname "
              type="text"
              id="lastname"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Last Name..."
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-black block text-sm mb-2 font-medium"
            >
              Email address
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="jacob@google.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-black block mb-2 text-sm font-medium"
            >
              Password
            </label>
            <input
              name="password "
              type="text"
              id="password"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter a password..."
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profile"
              className="text-black block text-sm font-medium"
            >
              Select a profile
            </label>
            <select
              name="profile"
              id="profile"
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="owner">Owner</option>
              <option value="walker">Walker</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
