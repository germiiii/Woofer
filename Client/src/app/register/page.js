"use client";
import React from "react";
import RegisterForm from "../Components/RegisterForm.jsx";
import { useRouter } from "next/router"; // Corrected import statement

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div>
      <RegisterForm />
    </div>
  );
}
