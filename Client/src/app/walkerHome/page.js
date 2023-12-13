"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Components/NavBarWalker.jsx";
import WalkerHome from "../Components/WalkerHome";
import YouAreNotAWalker from "../Components/YouAreNotAWalker.jsx";
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
        <YouAreNotAWalker />
      )}
    </>
  );
};

export default HomeWalker;
