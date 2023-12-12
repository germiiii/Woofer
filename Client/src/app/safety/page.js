"use client";
import Safety from "../Components/Safety";
import NavBarHome from "../Components/NavBarOwner";
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
        <div>
          <h1>You are not an owner.</h1>
          <Link href={"/walkerHome"}>
            <button>back to walker home</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SafetyPage;
