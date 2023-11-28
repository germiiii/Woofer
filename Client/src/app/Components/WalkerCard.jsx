import { Image } from "next/image";
export default function WalkerCard(props) {
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
    height: "100px",
    width: "100px",
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
    width: "40px",
    height: "40px",
  };

  return (
    <div style={cardStyle}>
      <Image src={props.image} style={imageStyle} alter="Profile" />
      <div style={textStyle}>
        <h2 style={nameStyle}>{props.name + " " + props.lastName}</h2>
        <h3 style={addressStyle}>{props.address}</h3>
        <h4 style={dogCapacityStyle}>
          Ready to walk {props.dogCapacity} {props.dogSize} dogs for{" "}
          {props.walkDuration} minutes
        </h4>
      </div>
      <Image
        style={checkoutStyle}
        src="https://cdn-icons-png.flaticon.com/512/5952/5952829.png"
      />
    </div>
  );
}
