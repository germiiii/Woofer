"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import checkoutImage from "../../../public/checkout.png";
import Checkout from '../checkout/page'
import axios from "axios";


const WalkerCard = (props) => {

  const api = process.env.NEXT_PUBLIC_APIURL;

  const router = useRouter()

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "900px",
    height: "150px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    backgroundColor: "white",
  };

  const nameStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "#29235c",
  };

  const addressStyle = {
    fontSize: "1.2em",
    color: "black",
  };

  const dogCapacityStyle = {
    fontSize: "1.0em",
    color: "#29235c",
  };

  const walkDurationStyle = {
    fontSize: "1.0em",
    color: "darkblue",
  };

  const imageStyle = {
    borderRadius: "8px",
  };

  const textStyle = {
    display: "flex",
    flexDirection: "column",
    marginLeft: "30px",
    width: "700px",
  };

  const checkoutStyle = {
    marginRight: "50px",
  };

  const handleClick = async () => {
    console.log("Walker ID:", props.id);
    try {
      const response = await axios.get(`${api}/walker/${props.id}`);
      if (response.status === 200) {
        const walkerData = response.data;
        console.log('Walker details:', response.data);

        // Store only necessary walker details in localStorage
        const selectedWalker = {
          walker: walkerData, // Assuming walkerData has the necessary structure
        };
        localStorage.setItem('selectedWalker', JSON.stringify(selectedWalker));
        
        router.push('/checkout');
      } else {
        console.error('Failed to fetch walker data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching walker data:', error);
    }
  };
  


  return (
    <div>
      <div style={cardStyle}>
      <Image style={imageStyle} src={props.image} width={100} height={100} alt="profile" />
      <div style={textStyle}>
        <h2 style={nameStyle}>{props.name + " " + props.lastName}</h2>
      </div>
      <div style={checkoutStyle} >
        <Image
          alt="Checkout"
          src={checkoutImage}
          width={40}
          height={40}
          onClick={() => handleClick(props.id)}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>

    </div>
    
   
  );
};

export default WalkerCard;
