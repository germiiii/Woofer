"use client";
import React from "react";
import AddDogs from "../Components/AddDog";
import NavBarHome from "../Components/NavBarOwner";
import Link from "next/link.js";

export default function AddDogsPage() {
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
            <AddDogs />
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
}
