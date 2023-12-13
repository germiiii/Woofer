"use client";
import Safety from "../Components/Safety";
import NavBarHome from "../Components/NavBarOwner";
import YouAreNotAnOwner from "../Components/YouAreNotAnOwner.jsx";
import React from "react";
import Link from "next/link.js";

const SafetyPage = () => {
  const [selectedType, setSelectedType] = React.useState("");

  React.useEffect(() => {
    setSelectedType(localStorage.getItem("selectedType") || "");
  }, []);

  return (
    <div>
      {selectedType === "owner" ? (
        <div>
          <NavBarHome />
          <div>
            <Safety />
          </div>
        </div>
      ) : (
        <YouAreNotAnOwner />
      )}
    </div>
  );
};

export default SafetyPage;
