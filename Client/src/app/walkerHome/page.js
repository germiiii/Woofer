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
    <div className="flex flex-col">
      <>
        {selectedType === "walker" ? (
          <div>
            <Nav />
            <WalkerHome />
          </div>
        ) : (
          <YouAreNotAWalker />
        )}
      </>
    </div>
  );
};

export default HomeWalker;
