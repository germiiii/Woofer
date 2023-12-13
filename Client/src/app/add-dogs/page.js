"use client";
import React from "react";
import AddDogs from "../Components/AddDog";
import NavBarHome from "../Components/NavBarOwner";
import Link from "next/link.js";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";
import Image from "next/image";
import YouAreNotAnOwner from "../Components/YouAreNotAnOwner.jsx";

export default function AddDogsPage() {
  const [selectedType, setSelectedType] = React.useState("");

  React.useEffect(() => {
    setSelectedType(localStorage.getItem("selectedType") || "");
  }, []);

  return (
    <div className="flex flex-col">
      {selectedType === "owner" ? (
        <div>
          <NavBarHome />
          <div className="flex flex-grow">
            <div className="bg-[#29235c] w-1/2 flex flex-col items-center">
              <div className="mt-20">
                <div className="flex items-center justify-center mt-20">
                  <h2 className="text-[#F39200] text-2xl text-center">
                    Please fill out the following information to add your dogs
                    for walking services. Ensure that you provide accurate
                    details to facilitate a smooth and enjoyable experience for
                    your pets.
                  </h2>
                </div>
                <div className="flex items-center justify-center mt-10">
                  <Image
                    src="/AboutDog.jpeg"
                    width={700}
                    height={0}
                    className="rounded-full border border-[#F39200] border-2"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-[#E4E2ED] h-screen">
              <AddDogs />
            </div>
          </div>
        </div>
      ) : (
        <YouAreNotAnOwner />
      )}
    </div>
  );
}
