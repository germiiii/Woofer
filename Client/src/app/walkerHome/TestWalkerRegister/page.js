"use client";
import WalkerRegister from "../../Components/WalkerRegister";
import Nav from "../../Components/NavBarWalker.jsx";
import React from "react";
import Link from "next/link.js";
import Image from "next/image";
import YouAreNotAWalker from "../../Components/YouAreNotAWalker.jsx";

export default function HomeWalker() {
  const [selectedType, setSelectedType] = React.useState("");

  React.useEffect(() => {
    setSelectedType(localStorage.getItem("selectedType") || "");
  }, []);

  return (
    <div className="flex flex-col">
      {selectedType === "walker" ? (
        <div>
          <Nav />
          <div className="flex flex-grow">
            <div className="bg-[#29235c] w-1/2 flex flex-col items-center">
              <div className="mt-10">
                <div className="flex items-center justify-center mt-5">
                  <h2 className="text-[#F39200] text-2xl text-center">
                    Please select the walking service options you would like to
                    offer for your furry friends. Ensure accurate details to
                    provide a smooth and enjoyable experience for your pets.
                    Your input is crucial for a personalized and tailored
                    walking service. Thank you for providing this information!
                  </h2>
                </div>
                <div className="flex items-center justify-center mt-10">
                  <Image
                    src="/DogLovers.jpeg"
                    width={700}
                    height={0}
                    className="rounded-full border border-[#F39200] border-2"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-[#E4E2ED] h-screen">
              <WalkerRegister />
            </div>
          </div>
        </div>
      ) : (
        <YouAreNotAWalker />
      )}
    </div>
  );
}
