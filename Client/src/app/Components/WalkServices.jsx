"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import WalkServiceDetail from '../Components/WalkServiceDetail'
import "tailwindcss/tailwind.css";
import styles from '../Styles/Services.module.css'


async function getWalkTypes() {

  const api = process.env.NEXT_PUBLIC_APIURL;

  try {
    const response = await axios.get(`${api}/walkType`);
    const data = response.data;
    return data.walkTypeData || [];
  } catch (error) {
    console.error('Error fetching walk types:', error);
    return [];
  }
}

const WalkTypes = () => {

  const getImageBasedOnTitle = (title) => {
    if (title.toLowerCase().includes('premium')) {
      return '/ServicePremium.avif';
    } else if (title.toLowerCase().includes('small')) {
      return '/ServiceSmall.jpeg';
    } else if (title.toLowerCase().includes('big')) {
      return '/AboutWalker.jpeg';
    } 
  }

  const [walkTypes, setWalkTypes] = useState([]);

  useEffect(() => {
    async function fetchWalkTypes() {
      try {
        const data = await getWalkTypes();
        setWalkTypes(data);
      } catch (error) {
        console.error('Error fetching walk types:', error);
      }
    }

    fetchWalkTypes();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center relative">
       <div className="fixed top-0 left-0 right-0 z-10 bg-[#F39200] bg-opacity-100">
        <div className="container mx-auto lg:py-4 flex items-center justify-between px-2 py-2">
          <Link href={"/"}>
            <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
              <Image src="/LOGOWoofer.png" alt="logo" width={30} height={30} />
            </div>
          </Link>
        </div>
      </div>
       <div className={styles.DetailContainer}>
      <h1 className="text-3xl text-[#29235C] font-bold mb-4 w-full text-center mt-12" style={{ fontFamily: "LikeEat" }}>Dog Walk Services</h1>
      {walkTypes.length > 0 ? (
        walkTypes.map(({ id, title, price, description }) => (
          <div className={styles.cardWrap} key={id} >
            <Link href={`/services/${id}`} passHref>
              <div className={styles.card}>
                <div className={styles.cardFront}>
                  {/* Your card front content here */}
                  <h2 className={styles.cardName} style={{ fontFamily: "LikeEat" }}>{title}</h2>
                 
                </div>
                <div className={styles.cardBack}>
                <div className={styles.imageContainer}>
                   
                      {title && (
                        
                        <Image
                          src={getImageBasedOnTitle(title)}
                          alt={title}
                          width={300}
                          height={200}
                          className={styles.circularImage}
                        />
                      
                       
                      )}
                    </div>
                  <p>{description}</p>
                  <h1 className='font-bold text-2xl'>${price}</h1>
                  {/* Other content related to the card back */}
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>No walk types available</p>
      )}
    </div>
    </div>
   
  );
};

export async function getServerSideProps() {
  let walkTypes = [];

  try {
    const data = await getWalkTypes();
    walkTypes = data;
  } catch (error) {
    console.error('Error fetching walk types:', error);
  }

  return {
    props: {
      walkTypes,
    },
  };
}

export default WalkTypes;
