"use client"
import React, { useTransition, useState } from "react";
import Image from "next/image";

const AboutWoofer = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section  id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="relative rounded-full overflow-hidden bg-violet-100 p-4">
          <Image 
            src="/DogLovers.avif" 
            alt="aboutImage"
            width={500} 
            height={500}
            className="rounded-full" 
          />
        </div>
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full ">
          <h2 className="text-4xl font-bold text-[#fcd34d] mb-4">About Us</h2>
          <p className="text-white lg:text-lg">
          Rooted in a dog lover community, Woofer brings us together. Fueled by a shared commitment to health, fresh air, and exercise, whether devoted to your own furry companion or eager to support others, Woofer seamlessly connects us, forging a powerful bond within a singular community of dog enthusiasts.
          </p>
         
        </div>

        
      </div>
    </section>
  );
};

export default AboutWoofer;