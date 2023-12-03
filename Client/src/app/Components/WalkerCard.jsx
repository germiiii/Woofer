"use client";
import Image from "next/image";
import checkoutImage from "../../../public/checkout.png";

const WalkerCard = (props) => {
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
  };

  const nameStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
  };

  const addressStyle = {
    fontSize: "1.2em",
    color: "#555",
  };

  const dogCapacityStyle = {
    fontSize: "1.0em",
    color: "darkblue",
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

  return (
    <div style={cardStyle}>
      <Image style={imageStyle} src={props.image} width={100} height={100} />
      <div style={textStyle}>
        <h2 style={nameStyle}>{props.name + " " + props.lastName}</h2>
        <h3 style={addressStyle}>{props.address}</h3>
        <h4 style={dogCapacityStyle}>
          Ready to walk {props.dogCapacity} {props.dogSize} dogs for{" "}
          {props.walkDuration} minutes
        </h4>
      </div>
      <Image
        alt="Checkout"
        src={checkoutImage}
        style={checkoutStyle}
        width={40}
        height={40}
      />
    </div>
  );
};

export default WalkerCard;
