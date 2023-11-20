"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";


const AboutDog = () => {
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
  <div className="relative rounded-full overflow-hidden bg-violet-100 p-4">
    <Image 
      src="/AboutDog.avif" 
      alt="aboutImage"
      width={500} 
      height={500}
      className="rounded-full" 
    />
  </div>
  <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
    <h2 className="text-4xl font-bold mb-4">Let's take your dog outside</h2>
    <p className="text-white lg:text-lg">
      We know you love your dog. We know you want him to be happy and in shape. So why not give him the chance to exercise when your busy? Ease back and relax, Woofer walkers can do the work for you.
    </p>
    <div className="flex items-center justify-center mt-6">
    <button className='px-1 py-1 rounded-full w-full sm:w-fit bg-gradient-to-r  from-blue-400 via-blue-600 to-blue-900  hover:bg-slate-800 text-black border mt-3 lg:mt-0'>
              <span className='block bg-white hover:bg-slate-800 rounded-full px-5 py-2'>Register your dog</span>
            </button>
    </div>
  </div>


</div>

    </section>
  );
};

export default AboutDog;