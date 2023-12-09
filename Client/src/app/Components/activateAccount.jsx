"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";

const ActivateAccount = () => {
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_APIURL;
  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const token = pathArray[pathArray.length - 1];

    if (token) {
      activateAccount(token);
    }
  }, []);

  const activateAccount = async (token) => {
    try {
      const response = await fetch(`${api}/${token}`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Error al activar la cuenta:", response.status);
      }
    } catch (error) {
      console.error("Error al activar la cuenta:", error);
    }
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="w-full h-full bg-[#29235c] flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <p className="text-[#F39200] text-3xl ">Account activated.</p>
        <button
          onClick={redirectToLogin}
          className="px-10 py-2 mb-20 mt-5 rounded-full bg-white text-[#29235c] font-extrabold transition-all duration-300 ease-in-out hover:bg-[#F39200] hover:text-white"
        >
          go to sign in
        </button>
      </div>
    </div>
  );
};

export default ActivateAccount;
