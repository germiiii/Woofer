"use client";
import React, { useState } from "react";
import AddDogs from "../Components/AddDog";
import NavBarHome from "../Components/NavBarHome"

export default function AddDogsPage() {
  return (
    <div>
        <NavBarHome/>
        <div>
        <AddDogs />
        </div>
    </div>
  );
}