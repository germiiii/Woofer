"use client"
import React, { useTransition, useState } from "react";
import Image from "next/image";
import styles from '../Styles/About.module.css'

const AboutWoofer = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section id="about">
  <div className={styles.container}>
    <div className="relative rounded-full overflow-hidden bg-violet-100 p-4">
      <Image 
        src="/DogLovers.avif" 
        alt="aboutImage"
        width={500} 
        height={500}
        className="rounded-full" 
      />
    </div>
    <div className={styles.textContainer}>
      <h2 className={styles.title}>About Us</h2>
      <p  className={styles.paragraph}>
        Rooted in a dog lover community, Woofer brings us together. Fueled by a shared commitment to health, fresh air, and exercise, Woofer seamlessly connects us, forging a powerful bond within a singular community of dog enthusiasts.
      </p>
    </div>
  </div>
</section>

  );
};

export default AboutWoofer;