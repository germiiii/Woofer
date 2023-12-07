"use client";
import React, { useState } from "react";
import Settings from "../Components/Settings";
import NavBarHome from '../Components/NavBarHome'

export default function SettingsPage() {
  return (
    <div>
      <NavBarHome />
      <Settings />
    </div>
  );
}

