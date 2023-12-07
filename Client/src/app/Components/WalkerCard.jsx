"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import checkoutImage from "../../../public/checkout.png";

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
    console.log("Walk Duration:", props.walkDuration);
    console.log("Dog Capacity:", props.dogCapacity);
    let serviceId = "";

    if (props.walkDuration.includes("15") && props.dogCapacity === 1) {
      serviceId = "1";
    } else if (props.walkDuration.includes("30") && props.dogCapacity === 1) {
      serviceId = "2";
    } else if (props.walkDuration.includes("60") && props.dogCapacity === 1) {
      serviceId = "3";
    } else if (
      props.walkDuration.includes("15") &&
      props.dogCapacity > 2 &&
      props.dogCapacity < 5
    ) {
      serviceId = "4";
    } else if (
      props.walkDuration.includes("30") &&
      props.dogCapacity > 2 &&
      props.dogCapacity < 5
    ) {
      serviceId = "5";
    } else if (
      props.walkDuration.includes("60") &&
      props.dogCapacity > 2 &&
      props.dogCapacity < 5
    ) {
      serviceId = "6";
    } else if (props.walkDuration.includes("15") && props.dogCapacity > 5) {
      serviceId = "7";
    } else if (props.walkDuration.includes("30") && props.dogCapacity > 5) {
      serviceId = "8";
    } else if (props.walkDuration.includes("60") && props.dogCapacity > 5) {
      serviceId = "9";
    }

    if (serviceId) {
      router.push(`/services/${serviceId}`);
    } else {
      alert("Please, select a duration and a number of dogs before checkout");
    }
  };

  return (
    <div>
      <div style={cardStyle}>
        <Image
          style={imageStyle}
          src={props.image}
          width={100}
          height={100}
          alt="profile"
        />
        <div style={textStyle}>
          <h2 style={nameStyle}>{props.name + " " + props.lastName}</h2>
          <h3 style={addressStyle}>{props.address}</h3>
          <h4 style={dogCapacityStyle}>
            Ready to walk {props.dogCapacity} {props.dogSize} dogs for{" "}
            {props.walkDuration} minutes
          </h4>
        </div>
        <div style={checkoutStyle}>
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
