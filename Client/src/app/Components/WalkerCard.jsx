export default function WalkerCard(props) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "900px",
  };

  const nameStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const addressStyle = {
    fontSize: "1.2em",
    color: "#555",
  };

  return (
    <div style={cardStyle}>
      <h2 style={nameStyle}>{props.name + " " + props.lastName}</h2>
      <h4 style={addressStyle}>{props.address}</h4>
    </div>
  );
}
