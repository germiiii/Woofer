"use client"
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';




const MainLanding = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className='mt-0'>
        <h1 className='text-white mb-2 text-5xl lg:text-9xl font-extrabold mt-0'>
          <div className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900'>
            WOOFER
          </div>
        </h1>
        <div className='text-white font-bold lg:text-5xl justify-center items-center'>
          <TypeAnimation
            sequence={[
              'Get up',
              1000,
              'Get outside',
              1000,
              'Walk it off',
              1000,
            ]}
            wrapper="h2"
            speed={30}
            repeat={Infinity}
          />
        </div>

        <div className='flex flex-col lg:flex-row mt-20'>
            <button className='px-12 py-5 rounded-full w-full sm:w-fit mr-40 ml-10 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900  hover:bg-slate-800 text-white border mt-3 lg:mt-0 '>
            <Image 
              src="/dog.png" 
              alt="Dog"
              width={50} 
              height={50}
              className=" position-fixed" />
            </button>

            <button className='px-12 y-5 rounded-full w-full sm:w-fit bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 hover:bg-slate-800 text-white border mt-3 lg:mt-0'>
            <Image 
              src="/walker.png" 
              alt="Dog"
              width={50} 
              height={50}
              className="position-fixed" />
            </button>
        </div>
      </div>
    </section>
  );
};

export default MainLanding;
