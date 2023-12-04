"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from '../Styles/About.module.css'

const AboutDog = () => {
  const [tab, setTab] = useState("skills");
  const router = useRouter();

  const handleTabChange = (id) => {
    setTab(id);
  };

  return (
    <section  id="about">
     <div className={styles.container}>
        <div className="relative rounded-full overflow-hidden bg-violet-100 p-2">
          <Image 
            src="/AboutDog.avif" 
            alt="aboutImage"
            width={500} 
            height={500}
            className="rounded-full" 
          />
        </div>
       
          <div className={styles.textContainer}>
          <h2 className={styles.title}>Let&apos;s take your dog outside</h2>
          <p className={styles.paragraph}>
            We know you love your dog. We know you want him to be happy and in shape. So why not give him the chance to exercise when you&apos;re busy? Ease back and relax, Woofer walkers can do the work for you.
          </p>
          <div className={styles.buttonContainer}>
            <button  
              className={styles.button}
              onClick={() => {
                router.push("/register").catch((err) => console.error("Error navigating:", err));
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
