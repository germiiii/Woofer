"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import styles from "../Styles/About.module.css";

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
      <div>
        <div>
          <Image
            src="/DogLovers.avif"
            alt="aboutImage"
            width={0}
            height={0}
            className="rounded-full"
          />
        </div>
        <div>
          <h2>About Us</h2>
          <p>
            Rooted in a dog lover community, Woofer brings us together. Fueled
            by a shared commitment to health, fresh air, and exercise, Woofer
            seamlessly connects us, forging a powerful bond within a singular
            community of dog enthusiasts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutWoofer;
