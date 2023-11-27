import Image from 'next/image'
import Navbar from './Components/NavBar'
import AboutDog from './Components/AboutDog'
import AboutWalker from './Components/AboutWalker'
import Footer from './Components/Footer'
import MainLanding from './Components/MainLanding'
import AboutWoofer from './Components/AboutWoofer'
import "tailwindcss/tailwind.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar/>
      <div className="container mt-24 mx-auto px-12 py-4  bg-white ">
        <MainLanding />
      </div>
      <div className="container mx-auto px-12 py-4 bg-indigo-900">
        <AboutWoofer />
      </div>
      <div className="container mx-auto px-12 py-4 bg-white">
        <AboutWalker />
      </div>
      <div className="container mx-auto px-12 py-4 bg-indigo-900">
        <AboutDog />
      </div>
      <div className=" bg-indigo-300">
        <Footer />
      </div>
    </main>
  )
}