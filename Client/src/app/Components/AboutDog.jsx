/* @jsxImportSource client */
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const AboutDog = () => {
  const [tab, setTab] = useState("skills");
  const router = useRouter();

  const handleTabChange = (id) => {
    setTab(id);
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div className="relative rounded-full overflow-hidden bg-violet-100 p-2">
          <Image 
            src="/AboutDog.avif" 
            alt="aboutImage"
            width={500} 
            height={500}
            className="rounded-full p-4" 
          />
        </div>
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl text-[#fcd34d] font-bold mb-4">Let's take your dog outside</h2>
          <p className="text-white lg:text-lg">
            We know you love your dog. We know you want him to be happy and in shape. So why not give him the chance to exercise when you're busy? Ease back and relax, Woofer walkers can do the work for you.
          </p>
          <div className="flex items-center justify-center mt-6">
            <button  
              className="px-4 py-3 rounded-full bg-[#29235c] text-white hover:bg-amber-400 hover:text-black border mt-3 lg:mt-0 mr-5"
              onClick={() => {
                router.push("/register");
              }}
            >
              <span>Register your dog</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDog;
