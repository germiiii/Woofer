"use client"
import React, { useTransition, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from '../Styles/About.module.css'

const AboutWalker = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section id="about">
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Want to wuff some air?</h2>
        <p className={styles.paragraph}>
          Want to add more clients to your combo walk? Register to offer dog owners around your location the possibility to walk their dogs on-the-spot. Just activate your account and start receiving walk requests!
        </p>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => {
              router.push("/register");
            }}
          >
            <span>Register as walker</span>
          </button>
        </div>
      </div>

      <div className="relative rounded-full overflow-hidden bg-violet-100 p-4">
        <Image
          src="/AboutWalker.jpeg"
          alt="aboutImage"
          width={250}
          height={250}
          className="rounded-full"
        />
      </div>
    </div>
  </section>
  );
};

export default AboutWalker;