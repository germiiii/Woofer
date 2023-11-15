import Image from 'next/image'
import Navbar from './Components/NavBar'
import AboutDog from './Components/AboutDog'
import AboutWalker from './Components/AboutWalker'
import Footer from './Components/Footer'
import MainLanding from './Components/MainLanding'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4 bg-[#121212]">
        <MainLanding />
      </div>
      <div className="container mx-auto px-12 py-4 bg-white">
        <AboutDog />
      </div>
      <div className="container mx-auto px-12 py-4 bg-[#121212]">
        <AboutWalker />
      </div>
      <div className="container mx-auto px-12 py-4 bg-[#121212]">
        <Footer />
      </div>
    </main>
  )
}
