"use client"
import React, { useTransition, useState } from "react";
import Image from "next/image";

const AboutWalker = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">Want to wuff some air?</h2>
          <p className="text-base lg:text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur sapiente qui animi vitae porro similique, maiores temporibus beatae, odit aperiam nobis accusamus. Rem odit aperiam fugiat pariatur adipisci, harum expedita.
          </p>
          <div className="flex items-center justify-center mt-6">
            <button className='px-1 py-1 rounded-full w-full sm:w-fit bg-gradient-to-r  from-blue-400 via-blue-600 to-blue-900  hover:bg-slate-800 text-white border mt-3 lg:mt-0'>
              <span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2'>Register as walker</span>
            </button>
          </div>
        </div>

        <div className="relative rounded-full overflow-hidden bg-gray-500 p-4">
          <Image 
            src="/Assets/AboutWalker.jpeg" 
            alt="aboutImage"
            width={500} 
            height={500}
            className="rounded-full" 
          />
        </div>
      </div>
    </section>
  );
};

export default AboutWalker;
