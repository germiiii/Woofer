"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Components/NavBarWalker.jsx";
import WalkerHome from "../Components/WalkerHome";
import Link from "next/link.js";
import jwt from "jsonwebtoken";

const HomeWalker = () => {
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    setSelectedType(localStorage.getItem("selectedType") || "");
  }, []);

  return (
    <>
      {selectedType === "walker" ? (
        <>
          <Nav />
          <WalkerHome />
        </>
      ) : (
        <div>
          <h1>You are not a walker.</h1>
          <Link href={"/ownerHome"}>
            <button>back to owner home</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default HomeWalker;
