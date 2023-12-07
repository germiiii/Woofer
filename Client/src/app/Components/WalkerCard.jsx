"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import checkoutImage from "../../../public/checkout.png";
import {
  Popover
} from '@chakra-ui/react'


const WalkerCard = (props) => {

  const router = useRouter();

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

  const handleCheckoutClick = () => {
    console.log('Walk Duration:', props.walkDuration);
    console.log('Dog Capacity:', props.dogCapacity);
    let serviceId = "";
  
    if (props.walkDuration.includes("15") && props.dogCapacity === 1) {
      serviceId = "6562eca1-c96e-490e-98e8-dbac5b73c76f";
    } else if (props.walkDuration.includes("30") && props.dogCapacity === 1) {
      serviceId = "b2b40736-b68c-46a1-9bd4-a7c075bfd0e2";
    } else if (props.walkDuration.includes("60") && props.dogCapacity === 1) {
      serviceId = "6095c3d3-1eff-4346-abb1-94805f809004";
    } else if (props.walkDuration.includes("15") && props.dogCapacity > 3 && props.dogCapacity < 5) {
      serviceId = "80afbb09-a4dd-45ba-a0a1-c991ec8034b6";
    } else if (props.walkDuration.includes("30") && props.dogCapacity > 3 && props.dogCapacity < 5) {
      serviceId = "1ffa747b-12ba-4c8d-905d-73911ed0c6cf";
    } else if (props.walkDuration.includes("60") && props.dogCapacity > 3 && props.dogCapacity < 5) {
      serviceId = "0a2782b4-4abc-40a8-b0c3-3f9dc2d50fa0";
    } else if (props.walkDuration.includes("15") && props.dogCapacity > 5) {
      serviceId = "67647912-27f6-45b7-9c00-2d65209c9ebd";
    } else if (props.walkDuration.includes("30") && props.dogCapacity > 5) {
      serviceId = "5567874b-b873-46a0-8109-c13d93161dcb";
    } else if (props.walkDuration.includes("60") && props.dogCapacity > 5) {
      serviceId = "c311d641-c5ec-45cc-8ba4-19d7d1753d59";
    }
  
    if (serviceId) {
      router.push(`/services/${serviceId}`);
    } else {
    
     alert('Please, select a duration and a number of dogs before checkout')
    }
  };
  
  


  return (
    <div>
      <div style={cardStyle}>
      <Image style={imageStyle} src={props.image} width={100} height={100} alt="profile" />
      <div style={textStyle}>
        <h2 style={nameStyle}>{props.name + " " + props.lastName}</h2>
        <h3 style={addressStyle}>{props.address}</h3>
        <h4 style={dogCapacityStyle}>
          Ready to walk {props.dogCapacity} {props.dogSize} dogs for{" "}
          {props.walkDuration} minutes
        </h4>
      </div>
      <div style={checkoutStyle} >
        <Image
          alt="Checkout"
          src={checkoutImage}
          width={40}
          height={40}
          onClick={handleCheckoutClick}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>

    </div>
    
   
  );
};

export default WalkerCard;
