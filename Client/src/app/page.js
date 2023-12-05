"use client"
import React, { useState} from 'react'
import Navbar from './Components/NavBar'
import AboutDog from './Components/AboutDog'
import AboutWalker from './Components/AboutWalker'
import Footer from './Components/Footer'
import MainLanding from './Components/MainLanding'
import AboutWoofer from './Components/AboutWoofer'
import "tailwindcss/tailwind.css";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col absolute">
    <Navbar />
    <div className="flex flex-col md:flex-row h-971 overflow-y-auto">
      {/* Left Column */}
      <div className="w-full md:w-1/2 px-6 py-4 bg-white h-971 overflow-y-auto">
        <MainLanding />
      </div>
  
      {/* Right Column */}
      <div className="w-full md:w-1/2 flex flex-col relative">
        <div className="flex-1 p-6 bg-white hover:bg-[#29235C]  hover:text-white transition-colors duration-300 " style={{ maxHeight: '400px', marginTop: '3rem' }} >
          <AboutWoofer />
        </div>
        <div className="flex-1 p-6 bg-white hover:bg-[#29235C]  hover:text-white transition-colors duration-300" style={{ maxHeight: '290px' }} >
          <AboutWalker />
        </div>
        <div className="flex-1 p-6 bg-white hover:bg-[#29235C] hover:text-white transition-colors duration-300" style={{ maxHeight: '290px' }}>
          <AboutDog />
        </div>
      </div>
    </div>
   
  </main>
  
  );
  
}