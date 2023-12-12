"use client";
import WalkerRegister from "../../Components/WalkerRegister";
import Nav from "../../Components/NavBarWalker.jsx";
import React from "react";
import Link from "next/link.js";

export default function HomeWalker() {
  const [selectedType, setSelectedType] = React.useState("");

  React.useEffect(() => {
    setSelectedType(localStorage.getItem("selectedType") || "");
  }, []);

  return (
    <div>
      {selectedType === "walker" ? (
        <div>
          <Nav />
          <WalkerRegister />
        </div>
      ) : (
        <div>
          <h1>You are not a walker.</h1>
          <Link href={"/ownerHome"}>
            <button>back to owner home</button>
          </Link>
        </div>
      )}
    </div>
  );
}
