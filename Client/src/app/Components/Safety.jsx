"use client"
import React from 'react'
import Image from 'next/image'

const Safety = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <h1 className="text-center font-extrabold text-xxl">WOOFER COMMITMENT TO SAFETY</h1>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Image
        src='/Safety.avif'
        alt='safety'
        width={800}
        height={400}
        className="mx-auto"
      />
    </div>
    <section style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h2 className='font-extrabold'>Love Dogs and Feel Safe</h2>
      <p>We want you to move safely and be connected to other dog lovers and places that matter most to you. Hence, we are devoted to safety standards so that you and your furry companion can freely enjoy the development of the advancements in technology that bridges us together.</p>
    </section>
  </div>
  
  )
}

export default Safety